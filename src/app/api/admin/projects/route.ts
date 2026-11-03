import { adminSecretConfigured, hasAdminAccess } from "@/lib/auth/admin";
import { ProjectServiceError, createProject, ingestProjectMessage, listAllProjects } from "@/lib/services/projects";
import type { Category, ProjectInput, ProjectStatus } from "@/lib/projects/types";

export async function GET(request: Request) {
  const denied = guard(request);
  if (denied) return denied;

  try {
    const projects = await listAllProjects();
    return Response.json({ projects });
  } catch (error) {
    return failure(error);
  }
}

export async function POST(request: Request) {
  const denied = guard(request);
  if (denied) return denied;

  try {
    const body = await readBody(request);
    if (typeof body.message === "string") {
      const project = await ingestProjectMessage(body.message);
      return Response.json({ project }, { status: 201 });
    }

    const project = await createProject(toInput(body));
    return Response.json({ project }, { status: 201 });
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

function toInput(body: Record<string, unknown>): ProjectInput {
  if (typeof body.title !== "string" || typeof body.video_url !== "string" || !Array.isArray(body.category)) {
    throw new ProjectServiceError("Title, video_url, and category are required.");
  }

  return {
    title: body.title,
    video_url: body.video_url,
    category: body.category.filter((item): item is Category => typeof item === "string") as Category[],
    thumbnail_url: typeof body.thumbnail_url === "string" ? body.thumbnail_url : null,
    display_order: typeof body.display_order === "number" ? body.display_order : undefined,
    status: typeof body.status === "string" ? (body.status as ProjectStatus) : undefined,
  };
}

function failure(error: unknown) {
  if (error instanceof ProjectServiceError) {
    return Response.json({ error: error.message }, { status: error.status });
  }
  console.error(error);
  return Response.json({ error: "Something went wrong." }, { status: 500 });
}
