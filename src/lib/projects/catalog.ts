import catalog from "@/lib/projects/catalog.json";
import { sortProjects, type Project } from "@/lib/projects/types";

/**
 * Verified films from chasingbutterflies.in, used only when Supabase
 * environment variables are not configured. The public UI never imports this
 * list directly. Once Supabase is connected, published rows replace it.
 */
export function catalogProjects(): Project[] {
  return sortProjects(catalog as Project[]);
}
