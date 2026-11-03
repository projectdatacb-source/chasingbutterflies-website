export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chasingbutterflies.in";
  return value.replace(/\/$/, "");
}
