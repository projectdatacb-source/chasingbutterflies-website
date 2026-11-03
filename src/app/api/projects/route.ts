import { getPublishedProjects } from "@/lib/projects/queries";

export async function GET() {
  const { projects } = await getPublishedProjects();
  return Response.json({ projects });
}
