"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects/types";
import { embedUrl } from "@/lib/video";

export function FilmDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog ref={dialogRef} className="film-dialog" aria-label={project?.title ?? "Film"} onClose={onClose}>
      {project ? (
        <div>
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3 className="font-display text-lg leading-snug text-white sm:text-2xl">{project.title}</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close film"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:bg-accent"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="aspect-video bg-black">
            <iframe
              key={`${project.video_platform}-${project.video_id}`}
              src={embedUrl(project.video_platform, project.video_id)}
              title={project.title}
              className="h-full w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
