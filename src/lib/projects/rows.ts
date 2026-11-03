import {
  isCategory,
  type Category,
  type Project,
  type ProjectStatus,
  type VideoPlatform,
} from "@/lib/projects/types";

const PLATFORMS = new Set<VideoPlatform>(["youtube", "vimeo"]);
const STATUSES = new Set<ProjectStatus>(["draft", "published", "archived"]);

export function toProject(row: unknown): Project | null {
  if (!row || typeof row !== "object") return null;
  const value = row as Record<string, unknown>;

  const platform = value.video_platform;
  const status = value.status;
  const categories = Array.isArray(value.category)
    ? value.category.filter((item): item is Category => typeof item === "string" && isCategory(item))
    : [];

  if (typeof value.id !== "string") return null;
  if (typeof value.title !== "string" || value.title.trim() === "") return null;
  if (typeof value.video_url !== "string") return null;
  if (typeof value.video_id !== "string") return null;
  if (typeof platform !== "string" || !PLATFORMS.has(platform as VideoPlatform)) return null;
  if (typeof status !== "string" || !STATUSES.has(status as ProjectStatus)) return null;
  if (categories.length === 0) return null;
  if (typeof value.display_order !== "number") return null;

  return {
    id: value.id,
    title: value.title,
    video_url: value.video_url,
    video_platform: platform as VideoPlatform,
    video_id: value.video_id,
    category: categories,
    thumbnail_url: typeof value.thumbnail_url === "string" && value.thumbnail_url ? value.thumbnail_url : null,
    display_order: value.display_order,
    status: status as ProjectStatus,
    created_at: typeof value.created_at === "string" ? value.created_at : "",
    updated_at: typeof value.updated_at === "string" ? value.updated_at : "",
  };
}
