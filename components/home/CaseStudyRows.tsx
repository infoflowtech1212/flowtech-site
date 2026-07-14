import Link from "next/link";
import Reveal from "@/components/Reveal";

const rows = [
  {
    tag: "TRANSITIONS",
    title: "Asset transitions: acquisitions & dispositions",
    body:
      "A due diligence checklist that drives the deal: automated notifications to departments and partners as the asset flows through each step, every document captured in one repository, a visual timeline of where the asset stands, and layers of accountability at every handoff.",
    date: "Confidential · 2026",
  },
  {
    tag: "LIFECYCLE",
    title: "Unit lifecycle workflow",
    body:
      "Make-ready to move-in to turn: every unit's status, cost, and timeline tracked automatically.",
    date: "Confidential · 2026",
  },
  {
    tag: "PURCHASING",
    title: "Inventory & vendor management: purchasing program",
    body:
      "A full purchasing workflow built natively into the organization's structure, not a third-party SaaS platform: a reviewable catalogue of building and unit equipment, vendor agreements negotiated on volume, preferred brands identified, repeat maintenance requests surfaced, and capital improvements isolated from operating spend.",
    date: "Confidential · ongoing",
  },
  {
    tag: "ANALYTICS",
    title: "Analytics & dashboards: operations tied to financials",
    body:
      "Built to connect operational workflows to financial outcomes, not restate spreadsheets: operational effectiveness measured in real time against KPIs and OKRs, tied to financial reporting so decisions become proactive instead of reactive, and fluctuations surface immediately to preserve asset performance.",
    date: "Confidential · 2026",
  },
];

export default function CaseStudyRows() {
  return (
    <div id="work" className="scroll-mt-20 bg-white px-6 py-[100px] md:px-[60px]">
      <Reveal className="mx-auto max-w-[1140px]">
        <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-6 md:gap-10">
          <h2 className="m-0 text-[30px] font-bold leading-[1.12] text-ink md:text-[38px]">
            We ran the operations we now modernize.
          </h2>
          <Link href="/case-studies" className="flex-none text-[13px] font-bold text-teal-brand hover:text-teal-hover">
            All case studies →
          </Link>
        </div>
        <p className="m-0 mb-9 max-w-[600px] text-[14.5px] leading-[1.65] text-body">
          Recent engagements with real estate investment and operations teams. We value our
          clients&#39; confidentiality; the work speaks for itself. Each engagement includes
          integrated AI for insight, intelligent reporting, and analytics visualizations.
        </p>
        <div className="flex flex-col">
          {rows.map((r, i) => (
            <Link
              key={r.tag}
              href="/case-studies"
              className={
                "grid grid-cols-1 items-baseline gap-2 border-t border-ink/10 px-3 py-6 text-ink transition-colors hover:bg-[#f2f6f7] md:grid-cols-[170px_1fr_170px] md:gap-6" +
                (i === rows.length - 1 ? " border-b" : "")
              }
            >
              <div className="font-mono text-[11px] text-teal-brand">{r.tag}</div>
              <div>
                <div className="mb-1 text-[16px] font-bold">{r.title}</div>
                <div className="text-[13.5px] leading-[1.6] text-body-soft">{r.body}</div>
              </div>
              <div className="text-[11.5px] text-muted md:text-right">{r.date}</div>
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
