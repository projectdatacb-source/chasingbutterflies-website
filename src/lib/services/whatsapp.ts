import { parseCategories, parseVideoUrl } from "@/lib/video";
import type { ProjectInput, ProjectStatus } from "@/lib/projects/types";

export type ParsedProjectMessage =
  | { ok: true; input: ProjectInput }
  | { ok: false; errors: string[] };

const STATUSES = new Set<ProjectStatus>(["draft", "published", "archived"]);

/**
 * Future WhatsApp intake. A worker can forward the message text here.
 * This file does not call the WhatsApp API.
 *
 * Expected message:
 * title: Film title
 * url: https://vimeo.com/123456789
 * category: automobiles
 *
 * Optional lines: thumbnail, status (draft/published/archived), order.
 * Several categories can be separated with commas.
 */
export function parseProjectMessage(message: string): ParsedProjectMessage {
  const fields = new Map<string, string>();

  for (const line of message.split(/\r?\n/)) {
    const match = line.trim().match(/^([a-zA-Z][a-zA-Z _-]{0,30})\s*:\s*(.+)$/);
    if (!match) continue;
    const key = match[1].trim().toLowerCase().replace(/[\s-]+/g, "_");
    fields.set(key, match[2].trim());
  }

  const errors: string[] = [];
  const title = fields.get("title") ?? "";
  const url = fields.get("url") || fields.get("video_url") || fields.get("link") || "";
  const categoryValue = fields.get("category") || fields.get("categories") || "";
  const thumbnail = fields.get("thumbnail") || fields.get("thumbnail_url") || "";
  const statusValue = (fields.get("status") || "published").toLowerCase();
  const orderValue = fields.get("order") || fields.get("display_order");

  if (!title) errors.push("Add a title line, for example: title: Tata Yodha - Water");
  if (title.length > 200) errors.push("Title must be 200 characters or fewer.");

  const video = url ? parseVideoUrl(url) : null;
  if (!url) errors.push("Add a url line with a YouTube or Vimeo link.");
  else if (!video) errors.push("The url must be a YouTube or Vimeo link.");

  const category = categoryValue ? parseCategories(categoryValue) : null;
  if (!categoryValue) errors.push("Add a category line: automobiles, cgi, gadgets, fmcg, or lifestyle.");
  else if (!category) errors.push("Category must be automobiles, cgi, gadgets, fmcg, or lifestyle.");

  if (thumbnail && !isHttpUrl(thumbnail)) errors.push("Thumbnail must be an http or https URL.");
  if (!STATUSES.has(statusValue as ProjectStatus)) {
    errors.push("Status must be draft, published, or archived.");
  }

  let displayOrder: number | undefined;
  if (orderValue !== undefined) {
    if (!/^\d+$/.test(orderValue)) errors.push("Order must be a whole number.");
    else displayOrder = Number(orderValue);
  }

  if (errors.length > 0 || !video || !category) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    input: {
      title,
      video_url: video.videoUrl,
      category,
      thumbnail_url: thumbnail || null,
      display_order: displayOrder,
      status: statusValue as ProjectStatus,
    },
  };
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
