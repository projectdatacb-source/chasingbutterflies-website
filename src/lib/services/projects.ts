import { revalidateTag } from "next/cache";
import { PROJECTS_CACHE_TAG } from "@/lib/projects/queries";
import { toProject } from "@/lib/projects/rows";
import {
  isCategory,
  sortProjects,
  type Category,
  type Project,
  type ProjectInput,
  type ProjectPatch,
  type ProjectStatus,
} from "@/lib/projects/types";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { parseVideoUrl, resolveThumbnail } from "@/lib/video";
import { parseProjectMessage } from "@/lib/services/whatsapp";

const STATUSES = new Set<ProjectStatus>(["draft", "published", "archived"]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class ProjectServiceError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export async function listAllProjects(): Promise<Project[]> {
  const supabase = admin();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, video_url, video_platform, video_id, category, thumbnail_url, display_order, status, created_at, updated_at",
    )
    .order("display_order", { ascending: true });

  if (error) throw new ProjectServiceError("Could not load projects.", 500);
  return sortProjects(
    (data ?? []).map((row) => toProject(row)).filter((project): project is Project => project !== null),
  );
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const record = await normalizeInput(input);
  const supabase = admin();
  const { data, error } = await supabase.from("projects").insert(record).select("*").single();

  if (error) {
    if (error.code === "23505") {
      throw new ProjectServiceError("That video is already in the catalogue.", 409);
    }
    console.error("Create project failed", error.message);
    throw new ProjectServiceError("Could not save the project.", 500);
  }

  refreshPublicProjects();
  const project = toProject(data);
  if (!project) throw new ProjectServiceError("The project was saved but could not be read back.", 500);
  return project;
}

export async function updateProject(id: string, patch: ProjectPatch): Promise<Project> {
  assertId(id);
  const changes = await normalizePatch(patch);
  if (Object.keys(changes).length === 0) {
    throw new ProjectServiceError("Provide at least one field to update.");
  }

  const supabase = admin();
  const { data, error } = await supabase.from("projects").update(changes).eq("id", id).select("*").maybeSingle();

  if (error) {
    if (error.code === "23505") {
      throw new ProjectServiceError("That video is already in the catalogue.", 409);
    }
    console.error("Update project failed", error.message);
    throw new ProjectServiceError("Could not update the project.", 500);
  }
  if (!data) throw new ProjectServiceError("Project not found.", 404);

  refreshPublicProjects();
  const project = toProject(data);
  if (!project) throw new ProjectServiceError("The project was updated but could not be read back.", 500);
  return project;
}

export async function deleteProject(id: string) {
  assertId(id);
  const supabase = admin();
  const { data, error } = await supabase.from("projects").delete().eq("id", id).select("id").maybeSingle();
  if (error) {
    console.error("Delete project failed", error.message);
    throw new ProjectServiceError("Could not delete the project.", 500);
  }
  if (!data) throw new ProjectServiceError("Project not found.", 404);
  refreshPublicProjects();
}

/**
 * Entry point for a future WhatsApp worker. Validates the message, stores the
 * film, and refreshes the public site cache. It does not talk to WhatsApp.
 */
export async function ingestProjectMessage(message: string) {
  const parsed = parseProjectMessage(message);
  if (!parsed.ok) {
    throw new ProjectServiceError(parsed.errors.join(" "), 400);
  }
  return createProject(parsed.input);
}

function admin() {
  if (!isAdminConfigured()) {
    throw new ProjectServiceError("Admin database credentials are not configured.", 503);
  }
  const supabase = createAdminClient();
  if (!supabase) {
    throw new ProjectServiceError("Admin database credentials are not configured.", 503);
  }
  return supabase;
}

function refreshPublicProjects() {
  revalidateTag(PROJECTS_CACHE_TAG, { expire: 0 });
}

async function normalizeInput(input: ProjectInput) {
  const title = cleanTitle(input.title);
  const video = parseVideoUrl(input.video_url);
  if (!video) throw new ProjectServiceError("Provide a YouTube or Vimeo link.");
  const category = cleanCategories(input.category);
  const status = cleanStatus(input.status ?? "published");
  const displayOrder = cleanOrder(input.display_order);
  const thumbnail = await resolveThumbnail({
    platform: video.platform,
    videoId: video.videoId,
    thumbnailUrl: input.thumbnail_url,
  });

  return {
    title,
    video_url: video.videoUrl,
    video_platform: video.platform,
    video_id: video.videoId,
    category,
    thumbnail_url: thumbnail,
    display_order: displayOrder ?? (await nextDisplayOrder()),
    status,
  };
}

async function normalizePatch(patch: ProjectPatch) {
  const changes: Record<string, unknown> = {};

  if (patch.title !== undefined) changes.title = cleanTitle(patch.title);
  if (patch.category !== undefined) changes.category = cleanCategories(patch.category);
  if (patch.status !== undefined) changes.status = cleanStatus(patch.status);
  if (patch.display_order !== undefined) changes.display_order = cleanOrder(patch.display_order) ?? 0;

  if (patch.video_url !== undefined) {
    const video = parseVideoUrl(patch.video_url);
    if (!video) throw new ProjectServiceError("Provide a YouTube or Vimeo link.");
    changes.video_url = video.videoUrl;
    changes.video_platform = video.platform;
    changes.video_id = video.videoId;
    if (patch.thumbnail_url === undefined) {
      changes.thumbnail_url = await resolveThumbnail({
        platform: video.platform,
        videoId: video.videoId,
      });
    }
  }

  if (patch.thumbnail_url !== undefined) {
    const manual = patch.thumbnail_url?.trim() ?? "";
    if (manual && !isHttpUrl(manual)) throw new ProjectServiceError("Thumbnail must be an http or https URL.");
    changes.thumbnail_url = manual || null;
  }

  return changes;
}

function cleanTitle(title: string) {
  const value = title.trim();
  if (!value) throw new ProjectServiceError("Title is required.");
  if (value.length > 200) throw new ProjectServiceError("Title must be 200 characters or fewer.");
  return value;
}

function cleanCategories(values: Category[]) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new ProjectServiceError("Choose at least one category.");
  }
  const unique = [...new Set(values)];
  if (unique.some((value) => !isCategory(value))) {
    throw new ProjectServiceError("Category must be automobiles, cgi, gadgets, fmcg, or lifestyle.");
  }
  return unique;
}

function cleanStatus(status: ProjectStatus) {
  if (!STATUSES.has(status)) throw new ProjectServiceError("Status must be draft, published, or archived.");
  return status;
}

function cleanOrder(order: number | undefined) {
  if (order === undefined) return undefined;
  if (!Number.isInteger(order) || order < 0 || order > 100000) {
    throw new ProjectServiceError("Order must be a whole number from 0 to 100000.");
  }
  return order;
}

function assertId(id: string) {
  if (!UUID.test(id)) throw new ProjectServiceError("Project id is not valid.", 400);
}

async function nextDisplayOrder() {
  const supabase = admin();
  const { data, error } = await supabase
    .from("projects")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return 1;
  const current = typeof data?.display_order === "number" ? data.display_order : 0;
  return current + 1;
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
