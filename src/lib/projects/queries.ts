import { cacheLife, cacheTag } from "next/cache";
import { catalogProjects } from "@/lib/projects/catalog";
import { toProject } from "@/lib/projects/rows";
import { sortProjects, type Project } from "@/lib/projects/types";
import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/public";
import { resolveThumbnail } from "@/lib/video";

export const PROJECTS_CACHE_TAG = "projects";

export type ProjectSource = "supabase" | "catalog";

export async function getPublishedProjects(): Promise<{
  projects: Project[];
  source: ProjectSource;
}> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 3600 });
  cacheTag(PROJECTS_CACHE_TAG);

  if (!isSupabaseConfigured()) {
    return { projects: catalogProjects(), source: "catalog" };
  }

  const supabase = createPublicClient();
  if (!supabase) {
    return { projects: [], source: "supabase" };
  }

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, video_url, video_platform, video_id, category, thumbnail_url, display_order, status, created_at, updated_at",
    )
    .eq("status", "published")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to load published projects", error.message);
    return { projects: [], source: "supabase" };
  }

  const projects = (data ?? [])
    .map((row) => toProject(row))
    .filter((project): project is Project => project !== null && project.status === "published");

  const withPosters = await Promise.all(projects.map(attachThumbnail));
  return { projects: sortProjects(withPosters), source: "supabase" };
}

async function attachThumbnail(project: Project): Promise<Project> {
  if (project.thumbnail_url) return project;
  const thumbnail = await resolveThumbnail({
    platform: project.video_platform,
    videoId: project.video_id,
  });
  return { ...project, thumbnail_url: thumbnail };
}
