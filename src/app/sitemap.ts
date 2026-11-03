import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl(),
      lastModified: new Date("2026-11-03"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${getSiteUrl()}/team/atharv-chodankar`,
      lastModified: new Date("2026-11-03"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
