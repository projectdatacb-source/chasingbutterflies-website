import { InstagramIcon } from "@/components/instagram-icon";
import { VimeoIcon } from "@/components/vimeo-icon";
import { site } from "@/content/site";

const links = [
  { href: site.vimeo, label: "Vimeo", icon: VimeoIcon },
  { href: site.instagram, label: "Instagram", icon: InstagramIcon },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition duration-200 hover:bg-accent"
          >
            <link.icon className="h-6 w-6" />
          </a>
        </li>
      ))}
    </ul>
  );
}
