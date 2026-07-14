"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Experience", href: "#top" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Case Studies", href: "#work" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
];

/**
 * Header nav.
 * - variant="home": fixed over the 3D journey (bg rgba(7,14,19,.78))
 * - variant="page": sticky on legal pages (bg rgba(7,14,19,.92)), anchors point back to /
 * Below 900px the link row collapses behind a hamburger toggle placed after
 * "Book a call".
 */
export default function SiteNav({ variant = "home" }: { variant?: "home" | "page" }) {
  const isHome = variant === "home";
  const base = isHome ? "" : "/";
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        (isHome ? "fixed inset-x-0 top-0" : "sticky top-0") +
        " z-50 border-b border-white/[.06] backdrop-blur-[12px]"
      }
      style={{ background: isHome ? "rgba(7,14,19,.78)" : "rgba(7,14,19,.92)" }}
    >
      <div className="flex items-center justify-between px-6 py-3.5 md:px-[60px]">
        <Link href={base || "#top"} className="flex items-center gap-3 text-lightText">
          <Image src="/assets/ft-logo.png" alt="FlowTech" width={96} height={26} className="h-[26px] w-auto" />
          <span className="text-[15px] font-bold tracking-[.08em]">FLOWTECH</span>
        </Link>
        <div className="hidden gap-[26px] text-[13px] font-medium min-[900px]:flex">
          {links.map((l) => (
            <a key={l.label} href={`${base}${l.href}`} className="text-[rgba(238,243,244,.75)] transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`${base}#contact`}
            className="rounded-full border border-[rgba(47,212,230,.5)] px-[22px] py-[9px] text-[12.5px] font-semibold text-teal-bright transition-colors hover:bg-[rgba(47,212,230,.12)]"
          >
            Book a call
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-white/[.14] transition-colors hover:border-teal-bright/60 min-[900px]:hidden"
          >
            <span
              className={
                "block h-[1.5px] w-4 bg-lightText transition-transform duration-200" +
                (open ? " translate-y-[6.5px] rotate-45" : "")
              }
            />
            <span
              className={
                "block h-[1.5px] w-4 bg-lightText transition-opacity duration-200" +
                (open ? " opacity-0" : "")
              }
            />
            <span
              className={
                "block h-[1.5px] w-4 bg-lightText transition-transform duration-200" +
                (open ? " -translate-y-[6.5px] -rotate-45" : "")
              }
            />
          </button>
        </div>
      </div>
      {open && (
        <div
          className="flex flex-col gap-1 border-t border-white/[.06] px-6 py-4 min-[900px]:hidden"
          style={{ background: "rgba(7,14,19,.96)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={`${base}${l.href}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-[14px] font-medium text-[rgba(238,243,244,.8)] transition-colors hover:bg-white/[.06] hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
