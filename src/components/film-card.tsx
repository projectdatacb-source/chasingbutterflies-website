"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { categoryLabel, type Project } from "@/lib/projects/types";

export function FilmCard({
  project,
  onPlay,
  priority = false,
}: {
  project: Project;
  onPlay: (project: Project) => void;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const labels = project.category.map((category) => categoryLabel(category)).join(" · ");

  return (
    <article>
      <button
        type="button"
        onClick={() => onPlay(project)}
        className="group block w-full text-left"
        aria-label={`Play ${project.title}`}
      >
        <span className="relative block aspect-video overflow-hidden bg-neutral-950">
          {project.thumbnail_url && !failed ? (
            <Image
              src={project.thumbnail_url}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              priority={priority}
              onError={() => setFailed(true)}
            />
          ) : null}
          <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/35" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition group-hover:bg-accent">
              <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
            </span>
          </span>
        </span>
        <span className="mt-3 block text-[0.68rem] tracking-[0.18em] text-accent uppercase">{labels}</span>
        <span className="mt-1 line-clamp-2 block text-sm leading-5 text-white">{project.title}</span>
      </button>
    </article>
  );
}
