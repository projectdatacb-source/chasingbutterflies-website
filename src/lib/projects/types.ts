export const CATEGORIES = [
  { id: "automobiles", label: "Automobile" },
  { id: "cgi", label: "CGI" },
  { id: "gadgets", label: "Gadgets" },
  { id: "fmcg", label: "FMCG" },
  { id: "lifestyle", label: "Lifestyle" },
] as const;

export const CATEGORY_IDS = CATEGORIES.map((category) => category.id);

export type Category = (typeof CATEGORIES)[number]["id"];
export type VideoPlatform = "youtube" | "vimeo";
export type ProjectStatus = "draft" | "published" | "archived";

export type Project = {
  id: string;
  title: string;
  video_url: string;
  video_platform: VideoPlatform;
  video_id: string;
  category: Category[];
  thumbnail_url: string | null;
  display_order: number;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
};

export type ProjectInput = {
  title: string;
  video_url: string;
  category: Category[];
  thumbnail_url?: string | null;
  display_order?: number;
  status?: ProjectStatus;
};

export type ProjectPatch = Partial<ProjectInput>;

const CATEGORY_ORDER = new Map(CATEGORY_IDS.map((id, index) => [id, index]));

export function isCategory(value: string): value is Category {
  return CATEGORY_ORDER.has(value as Category);
}

export function categoryLabel(id: Category) {
  return CATEGORIES.find((category) => category.id === id)?.label ?? id;
}

export function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    const categoryA = CATEGORY_ORDER.get(a.category[0]) ?? CATEGORY_IDS.length;
    const categoryB = CATEGORY_ORDER.get(b.category[0]) ?? CATEGORY_IDS.length;
    if (categoryA !== categoryB) return categoryA - categoryB;
    if (a.display_order !== b.display_order) return a.display_order - b.display_order;
    return a.title.localeCompare(b.title);
  });
}

export function featuredProjects(projects: Project[]) {
  const seen = new Set<Category>();
  const featured: Project[] = [];

  for (const project of sortProjects(projects)) {
    const primary = project.category.find((category) => !seen.has(category));
    if (!primary) continue;
    seen.add(primary);
    featured.push(project);
    if (seen.size === CATEGORY_IDS.length) break;
  }

  return featured;
}
