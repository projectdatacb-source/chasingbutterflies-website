import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-sm text-accent">{site.name}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-white/50">Mumbai</p>
      </div>
    </footer>
  );
}
