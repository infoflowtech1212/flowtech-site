import Image from "next/image";
import Link from "next/link";

function LegalBar() {
  return (
    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-3 px-6 py-5 text-[12px] text-white/40 md:px-[60px]">
        <span>© 2026 FlowTech. All rights reserved.</span>
        <div className="flex gap-5">
          <Link href="/privacy" className="text-white/45 hover:text-white/70">Privacy Policy</Link>
          <Link href="/terms" className="text-white/45 hover:text-white/70">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}

/** Full 4-column footer + legal bar (homepage). `base=""` on the homepage, `"/"` elsewhere. */
export default function SiteFooter({ base = "" }: { base?: string }) {
  return (
    <div className="bg-dark-footer text-white">
      <div className="mx-auto grid max-w-[1140px] grid-cols-1 gap-12 px-6 pb-12 pt-[72px] sm:grid-cols-2 md:px-[60px] lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[11px]">
            <Image src="/assets/ft-logo.png" alt="FlowTech" width={96} height={26} className="h-[26px] w-auto" />
            <span className="text-[16px] font-bold tracking-[.08em]">FLOWTECH</span>
          </div>
          <div className="max-w-[280px] text-[13.5px] leading-[1.65] text-white/55">
            Business strategy consulting for real estate investment and operations teams. Strategy first. Systems that follow.
          </div>
          <div className="flex flex-col gap-1.5 text-[13px] text-white/55">
            <a href="mailto:info@flowtechapps.com" className="text-white/70 hover:text-white">info@flowtechapps.com</a>
            <a href="https://www.flowtechapps.com" className="text-white/70 hover:text-white">www.flowtechapps.com</a>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-mono text-[10.5px] tracking-[.2em] text-teal-bright">SITE</div>
          <a href={`${base}#top`} className="text-[13.5px] text-white/65 hover:text-white">Experience</a>
          <a href={`${base}#capabilities`} className="text-[13.5px] text-white/65 hover:text-white">Capabilities</a>
          <a href={`${base}#work`} className="text-[13.5px] text-white/65 hover:text-white">Case Studies</a>
          <a href={`${base}#products`} className="text-[13.5px] text-white/65 hover:text-white">Products</a>
          <a href={`${base}#about`} className="text-[13.5px] text-white/65 hover:text-white">About</a>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-mono text-[10.5px] tracking-[.2em] text-teal-bright">PRODUCTS</div>
          <a href="https://doccreate.io" target="_blank" rel="noopener" className="text-[13.5px] text-white/65 hover:text-white">DocCreate · doccreate.io</a>
          <a href="https://qrtrax.com" target="_blank" rel="noopener" className="text-[13.5px] text-white/65 hover:text-white">QR Trax · qrtrax.com</a>
          <a href="https://prismpm.ai" target="_blank" rel="noopener" className="text-[13.5px] text-white/65 hover:text-white">PRISM · prismpm.ai</a>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-mono text-[10.5px] tracking-[.2em] text-teal-bright">COMPANY</div>
          <a href={`${base}#about`} className="text-[13.5px] text-white/65 hover:text-white">About the Founder</a>
          <a href={`${base}#faq`} className="text-[13.5px] text-white/65 hover:text-white">FAQ</a>
          <a href={`${base}#contact`} className="text-[13.5px] text-white/65 hover:text-white">Contact</a>
          <Link href="/case-studies" className="text-[13.5px] text-white/65 hover:text-white">All Case Studies</Link>
        </div>
      </div>
      <LegalBar />
    </div>
  );
}

/** Compact footer used by the legal pages (© line + policy links only). */
export function CompactFooter() {
  return (
    <div className="bg-dark-footer text-white">
      <LegalBar />
    </div>
  );
}
