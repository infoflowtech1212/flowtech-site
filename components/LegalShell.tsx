import SiteNav from "@/components/SiteNav";
import { CompactFooter } from "@/components/SiteFooter";

/**
 * Light legal page shell (bg #f4f6f7): sticky dark nav, LEGAL eyebrow,
 * 860px column of numbered sections, compact footer.
 *
 * NOTE: legal copy is a draft — the client should have an attorney review
 * before publishing.
 */
export default function LegalShell({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-legal text-ink">
      <SiteNav variant="page" />
      <div className="mx-auto max-w-[860px] px-8 pb-[100px] pt-20">
        <div className="mb-4 font-mono text-[11px] tracking-[.24em] text-teal-brand">LEGAL</div>
        <h1 className="m-0 mb-2.5 text-[34px] font-bold leading-[1.1] md:text-[42px]">{title}</h1>
        <div className="mb-12 text-[13px] text-muted">Effective date: {effectiveDate}</div>
        <div className="flex flex-col gap-9 text-[15px] leading-[1.75] text-[#3c4a50]">
          {children}
        </div>
      </div>
      <CompactFooter />
    </main>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="m-0 mb-2.5 text-[20px] font-bold text-ink">{heading}</h2>
      {children}
    </div>
  );
}
