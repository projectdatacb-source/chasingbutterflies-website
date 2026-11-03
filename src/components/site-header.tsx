"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-t-4 border-accent bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="/#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo.jpg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full"
            priority
          />
          <span className="font-display text-sm tracking-tight text-accent sm:text-base">{site.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-white transition hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open ? (
        <nav id="mobile-navigation" aria-label="Mobile" className="border-t border-white/10 px-5 py-4 md:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-3 font-display text-2xl text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
