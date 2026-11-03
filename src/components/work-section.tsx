"use client";

import { ChevronRight } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { FilmCard } from "@/components/film-card";
import { FilmDialog } from "@/components/film-dialog";
import { site } from "@/content/site";
import {
  CATEGORIES,
  featuredProjects,
  type Category,
  type Project,
} from "@/lib/projects/types";

export function WorkSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [active, setActive] = useState<Project | null>(null);
  const featured = useMemo(() => featuredProjects(projects), [projects]);
  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.category.includes(filter))),
    [filter, projects],
  );

  return (
    <section id="work" className="work-surface scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl text-accent sm:text-5xl md:text-6xl">Our Work</h2>
          <p className="mt-6 text-base leading-7 text-white sm:text-lg sm:leading-8">{site.workIntro}</p>
        </div>

        {featured.length > 0 ? (
          <div className="mt-14">
            <h3 className="sr-only">Selected films</h3>
            <ul className="flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
              {featured.map((project, index) => (
                <li key={project.id} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
                  <FilmCard project={project} onPlay={setActive} priority={index < 2} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-14 flex flex-wrap justify-center gap-3" role="toolbar" aria-label="Filter films by category">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </FilterButton>
          {CATEGORIES.map((category) => (
            <FilterButton
              key={category.id}
              active={filter === category.id}
              onClick={() => setFilter(category.id)}
            >
              {category.label}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </FilterButton>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length === 1 ? "1 film" : `${visible.length} films`}
        </p>

        {visible.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {visible.map((project) => (
              <li key={project.id}>
                <FilmCard project={project} onPlay={setActive} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-16 text-center text-white/70">Published films will appear here.</p>
        )}
      </div>

      <FilmDialog project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-medium tracking-[0.16em] uppercase transition duration-200 ${
        active ? "bg-accent text-black" : "border border-accent text-accent hover:bg-accent hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}
