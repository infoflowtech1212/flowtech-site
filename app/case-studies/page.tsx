import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Engagements with real estate investment and operations teams, from development through management.",
  alternates: {
    canonical: "/case-studies",
  },
};

const studies = [
  {
    index: "01 · CONFIDENTIAL CLIENT",
    title: "Asset transitions: acquisitions & dispositions",
    tags: ["Workflow automation", "Systems integration"],
    challenge:
      "Properties entering and exiting the portfolio moved through dozens of untracked handoffs, legal, accounting, operations, and property management each running their own checklists in their own tools. Transitions stalled, and no one could say where.",
    approach:
      "We built the due diligence checklist into the workflow itself, for both acquisitions and dispositions: automated notifications reach each department and partner as the asset flows through the checklist, every document is captured and easily located in one repository, and a visual timeline shows exactly where the asset stands, creating layers of accountability at every handoff.",
    outcome:
      "Transitions run on a visible, repeatable process instead of institutional memory. Leadership tracks every asset's status in real time, without adding a single new system for teams to learn.",
    alt: false,
  },
  {
    index: "02 · CONFIDENTIAL CLIENT",
    title: "Unit lifecycle workflow",
    tags: ["Workflow automation", "Analytics & dashboards"],
    challenge:
      "Make-ready, move-in, and turn lived across inboxes, spreadsheets, and site-level memory. Unit-level cost and timeline data existed, but nowhere leadership could see it.",
    approach:
      "One workflow tracks every unit through its lifecycle automatically, status, cost, and timeline captured as work happens, not reconstructed at month end. Dashboards roll unit data up to property and portfolio views.",
    outcome:
      "Turn times and make-ready costs became measurable, then improvable. Site teams stopped reporting and started operating; the data reports itself.",
    alt: true,
  },
  {
    index: "03 · CONFIDENTIAL CLIENT",
    title: "Inventory & vendor management: purchasing program",
    tags: ["Inventory management", "Workflow automation"],
    challenge:
      "Purchasing happened property by property: no catalogue of building and unit equipment, no visibility into what brands were being bought where, repeat maintenance requests going unnoticed, and capital improvements blending into operating spend.",
    approach:
      "We built a full purchasing program natively into the organization's structure, not a third-party SaaS platform: end-to-end process and tracking, a reviewable catalogue of building and unit equipment, preferred brands identified, and vendor agreements negotiated on volume purchasing.",
    outcome:
      "Repeat maintenance requests now surface automatically, capital improvements are isolated from operating spend, and volume pricing compounds across the portfolio, savings the organization owns, on rails it controls.",
    alt: false,
  },
  {
    index: "04 · CONFIDENTIAL CLIENT",
    title: "Analytics & dashboards: operations tied to financials",
    tags: ["Analytics & dashboards", "Data-driven decisions"],
    challenge:
      "Reporting restated spreadsheet information without connecting it to how the operation actually ran. Leadership saw numbers at month end, long after the moment to act on them had passed.",
    approach:
      "Dashboards built to connect operational workflows to financial outcomes: operational effectiveness measured in real time against KPIs, OKRs, and other indicators, and tied directly to financial reporting.",
    outcome:
      "Decision making became proactive instead of reactive. Fluctuations surface immediately, and leadership acts on them in time to preserve asset performance.",
    alt: true,
  },
];

function Row({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-[140px_1fr] md:gap-6">
      <div className="pt-0.5 text-[12px] font-semibold uppercase tracking-[.14em] text-[rgba(238,243,244,.45)]">
        {label}
      </div>
      <div className="text-[15px] leading-[1.7] text-[rgba(238,243,244,.75)]">{body}</div>
    </div>
  );
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flowtechapps.com";

const caseStudiesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: `${siteUrl}/case-studies`,
  name: "Case Studies · FlowTech",
  isPartOf: { "@id": `${siteUrl}/#website` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${siteUrl}/case-studies` },
    ],
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="bg-dark-cs text-lightText">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }}
      />
      <SiteNav variant="page" />

      {/* Header with abstract logo motif */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-[-70px] top-10 h-[360px] w-[320px] opacity-[.14]" aria-hidden>
          <div
            className="absolute left-[126px] top-0 h-[58px] w-[230px] bg-gradient-to-r from-teal-brand to-teal-bright"
            style={{ clipPath: "polygon(18% 0,100% 0,100% 100%,0 100%)" }}
          />
          <div className="absolute left-[126px] top-20 h-[260px] w-[58px] bg-teal-brand" />
          <div className="absolute left-0 top-0 h-[58px] w-[156px] rounded-l-[29px] bg-muted opacity-70" />
          <div className="absolute left-[26px] top-20 h-[74px] w-[58px] bg-muted opacity-[.55]" />
          <div className="absolute left-[-14px] top-[174px] h-[54px] w-[114px] bg-muted opacity-60" />
        </div>
        <div id="top" className="relative mx-auto max-w-[1240px] px-6 pb-16 pt-[100px] md:px-[72px]">
          <div className="mb-5 text-[12.5px] font-semibold uppercase tracking-[.18em] text-teal-bright">
            Case Studies
          </div>
          <h1 className="max-w-[820px] text-[36px] font-semibold leading-[1.12] [text-wrap:pretty] md:text-[52px]">
            We ran the operations we now modernize.
          </h1>
          <div className="mt-[22px] max-w-[620px] text-[17px] leading-[1.65] text-[rgba(238,243,244,.6)] [text-wrap:pretty]">
            Engagements with real estate investment and operations teams, from development through
            management. We value our clients&#39; confidentiality; the work speaks for itself. Each
            engagement includes integrated AI for insight, intelligent reporting, and analytics
            visualizations.
          </div>
        </div>
      </div>

      {/* Case study blocks */}
      {studies.map((s) => (
        <div
          key={s.index}
          className={"border-t border-white/[.08]" + (s.alt ? " bg-dark-csAlt" : "")}
        >
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 p-6 py-14 md:grid-cols-[360px_1fr] md:gap-[72px] md:p-[72px]">
            <div className="flex flex-col gap-3.5">
              <div className="font-mono text-[12px] text-teal-bright">{s.index}</div>
              <div className="text-[26px] font-semibold leading-[1.2] md:text-[30px]">{s.title}</div>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/20 px-3 py-[5px] text-[12px] text-[rgba(238,243,244,.6)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-7">
              <Row label="Challenge" body={s.challenge} />
              <Row label="Approach" body={s.approach} />
              <Row label="Outcome" body={s.outcome} />
            </div>
          </div>
        </div>
      ))}

      {/* Teal CTA band */}
      <div className="border-t border-white/[.08] bg-teal-brand">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-8 px-6 py-16 md:gap-12 md:px-[72px]">
          <div className="max-w-[560px] text-[26px] font-semibold leading-[1.2] text-white [text-wrap:pretty] md:text-[34px]">
            Let&#39;s look at your operation together.
          </div>
          <a
            href="/#contact"
            className="flex-none rounded-[2px] bg-dark-cs px-8 py-[15px] text-[14.5px] font-semibold text-white hover:bg-black"
          >
            Book a discovery call
          </a>
        </div>
      </div>

      {/* Compact footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-6 py-6 text-[12.5px] text-[rgba(238,243,244,.4)] md:px-[72px]">
          <div className="flex items-center gap-2.5">
            <Image src="/assets/ft-logo.png" alt="" width={72} height={20} className="h-5 w-auto opacity-70" />
            <span>© 2026 FlowTech</span>
          </div>
          <div className="flex gap-6">
            <a href="/#capabilities" className="text-[rgba(238,243,244,.5)] hover:text-white">Consulting</a>
            <a href="/#products" className="text-[rgba(238,243,244,.5)] hover:text-white">Products</a>
            <a href="/#about" className="text-[rgba(238,243,244,.5)] hover:text-white">About</a>
            <a href="/#contact" className="text-[rgba(238,243,244,.5)] hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </main>
  );
}
