import { site } from "@/content/site";

const member = site.team.find((person) => person.name === "Atharv Chodankar");
if (!member) {
  throw new Error("Atharv Chodankar team entry is missing from site content.");
}

/** Verified copy only — sourced from the public team section and About Us. */
export const atharvChodankarProfile = {
  slug: "atharv-chodankar",
  path: "/team/atharv-chodankar",
  name: member.name,
  role: member.role,
  image: member.image,
  bio: member.bio,
  personalSite: "https://atharvchodankar.com",
  location: site.location,
  about: [
    member.bio,
    `${member.name} is ${member.role.toLowerCase()} at ${site.name}, ${site.location.replace(/^Based in /, "")}.`,
    site.about[1],
    site.about[2],
  ],
  responsibilities: [
    "Supporting commercial film production at Chasing Butterflies.",
    "Working with clients and the production team on script and story needs.",
    "Contributing to a process that includes director and crew recommendations, post-production, VFX, and sound.",
  ],
  portfolioNote:
    "Commercial films and CGI work published by Chasing Butterflies appear in the studio portfolio. Explore the catalogue on the main site.",
} as const;
