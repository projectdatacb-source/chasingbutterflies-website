import { adminSecretConfigured, hasAdminAccess } from "@/lib/auth/admin";
import { ProjectServiceError, deleteProject, updateProject } from "@/lib/services/projects";
import type { Category, ProjectPatch, ProjectStatus } from "@/lib/projects/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const denied = guard(request);
  if (denied) return denied;

  try {
    const { id } = await context.params;
    const body = await readBody(request);
    const project = await updateProject(id, toPatch(body));
    return Response.json({ project });
  } catch (error) {
    return failure(error);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const denied = guard(request);
  if (denied) return denied;

  try {
    const { id } = await context.params;
    await deleteProject(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return failure(error);
  }
}

function guard(request: Request) {
  if (!adminSecretConfigured()) {
    return Response.json({ error: "Admin access is not configured." }, { status: 503 });
  }
  if (!hasAdminAccess(request)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}

async function readBody(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new ProjectServiceError("Send a JSON object.");
    }
    return body as Record<string, unknown>;
  } catch (error) {
    if (error instanceof ProjectServiceError) throw error;
    throw new ProjectServiceError("Send a JSON body.");
  }
}

function toPatch(body: Record<string, unknown>): ProjectPatch {
  const patch: ProjectPatch = {};
  if (typeof body.title === "string") patch.title = body.title;
  if (typeof body.video_url === "string") patch.video_url = body.video_url;
  if (Array.isArray(body.category)) {
    patch.category = body.category.filter((item): item is Category => typeof item === "string") as Category[];
  }
  if (typeof body.thumbnail_url === "string" || body.thumbnail_url === null) {
    patch.thumbnail_url = body.thumbnail_url;
  }
  if (typeof body.display_order === "number") patch.display_order = body.display_order;
  if (typeof body.status === "string") patch.status = body.status as ProjectStatus;
  return patch;
}

function failure(error: unknown) {
  if (error instanceof ProjectServiceError) {
    return Response.json({ error: error.message }, { status: error.status });
  }
  console.error(error);
  return Response.json({ error: "Something went wrong." }, { status: 500 });
}
