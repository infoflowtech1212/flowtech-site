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
 */
export default function SiteNav({ variant = "home" }: { variant?: "home" | "page" }) {
  const isHome = variant === "home";
  const base = isHome ? "" : "/";
  return (
    <div
      className={
        (isHome ? "fixed inset-x-0 top-0" : "sticky top-0") +
        " z-50 flex items-center justify-between border-b border-white/[.06] px-6 py-3.5 backdrop-blur-[12px] md:px-[60px]"
      }
      style={{ background: isHome ? "rgba(7,14,19,.78)" : "rgba(7,14,19,.92)" }}
    >
      <Link href={base || "#top"} className="flex items-center gap-3 text-lightText">
        <Image src="/assets/ft-logo.png" alt="FlowTech" width={96} height={26} className="h-[26px] w-auto" />
        <span className="text-[15px] font-bold tracking-[.08em]">FLOWTECH</span>
      </Link>
      <div className="hidden gap-[26px] text-[13px] font-medium md:flex">
        {links.map((l) => (
          <a key={l.label} href={`${base}${l.href}`} className="text-[rgba(238,243,244,.75)] transition-colors hover:text-white">
            {l.label}
          </a>
        ))}
      </div>
      <a
        href={`${base}#contact`}
        className="rounded-full border border-[rgba(47,212,230,.5)] px-[22px] py-[9px] text-[12.5px] font-semibold text-teal-bright transition-colors hover:bg-[rgba(47,212,230,.12)]"
      >
        Book a call
      </a>
    </div>
  );
}
