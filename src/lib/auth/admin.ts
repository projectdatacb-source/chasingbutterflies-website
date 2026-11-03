import { timingSafeEqual } from "node:crypto";

export function hasAdminAccess(request: Request) {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) return false;

  const header = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  const received = Buffer.from(header);
  const target = Buffer.from(expected);

  if (received.length !== target.length) {
    timingSafeEqual(received, received);
    return false;
  }

  return timingSafeEqual(received, target);
}

export function adminSecretConfigured() {
  return Boolean(process.env.ADMIN_API_SECRET);
}
