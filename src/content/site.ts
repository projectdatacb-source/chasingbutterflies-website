export const site = {
  name: "Chasing Butterflies",
  description:
    "15+ years of crafting commercial films. We craft ad films and CGI stories that spark imagination.",
  tagline:
    "We craft ad films and CGI stories that spark imagination. Creative solutions designed to move people and brands forward.",
  workIntro:
    "From concept to screen, we produce ad films that tell stories with impact — memorable, stylish, and crafted to connect.",
  location: "Based in Mumbai, Maharashtra (India)",
  vimeo: "https://vimeo.com/chasingbutterflies",
  instagram: "https://www.instagram.com/chasing_butterflies.in/",
  about: [
    "We are visual storytellers. Any setting, physical or digital is our canvas. We paint with light and we have the best production support behind us to help tell your story in an entertaining and engaging way.",
    "Once we understand your script and story needs, we work with you to recommend the best directors and production crew to do justice to the idea.",
    "We ensure you get the best post-production and VFX talent to enhance your creative idea and make the visual story even more compelling.",
    "We know how important sound is to elevate the work. We work with established Music Directors as well as upcoming talents to create SFX and music that polishes and completes the story.",
  ],
  team: [
    {
      name: "Aarin Mehta",
      role: "Executive Producer",
      bio: "Starting with feature films and evolving into high end commercials, he brings over 15 years of production expertise.",
      image: "/team/aarin-mehta.jpg",
    },
    {
      name: "Monojit Ray",
      role: "Producer",
      bio: "With the strategic thinking and production excellence, he has collaborated with notable brands and celebrated directors.",
      image: "/team/monojit-ray.jpg",
    },
    {
      name: "Atharv Chodankar",
      role: "Assistant Producer",
      bio: "An advertising graduate with a keen interest in brand communication, backed by hands-on experience in commercial film production.",
      image: "/team/atharv-chodankar.jpg",
      profilePath: "/team/atharv-chodankar",
    },
  ],
} as const;

export const nav = [
  { href: "/#work", label: "Our Work" },
  { href: "/#about", label: "About" },
  { href: "/#team", label: "Team" },
  { href: "/#contact", label: "Contact" },
] as const;
