import Reveal from "@/components/Reveal";

const faqs: { q: string; a: string }[] = [
  {
    q: "What does FlowTech specialize in?",
    a: "Business strategy consulting for real estate investment and operations teams. Under one engagement we deliver systems integration, workflow automation, data analytics, inventory and asset management, custom software, and AI, always starting from strategy, not software.",
  },
  {
    q: "What types of organizations do you work with?",
    a: "Owners, operators, developers, property managers, and investment teams, from regional operators to multi-entity enterprises. If your business runs on properties, portfolios, and the people who manage them, we speak your language.",
  },
  {
    q: "Do we need to replace the systems we already use, like Yardi or AppFolio?",
    a: "No. We layer onto the platforms you're already paying for, property management, CRM, finance, and work management, enhancing them so information flows between them. No rip-and-replace, no disruption to daily operations.",
  },
  {
    q: "What types of workflows can you automate?",
    a: "Anything repetitive and rule-based: asset transitions, unit make-ready and turn, approvals, document generation, owner and lender reporting, field inspections, and inventory or vehicle tracking. If your team does it twice a week in a spreadsheet, it's a candidate.",
  },
  {
    q: "How do you identify which processes to fix first?",
    a: "Through a discovery engagement. We sit with your team to understand the pain points, run an end-to-end forensic analysis, and deliver a phased plan with a few options to remedy each issue, sequenced by impact and priority.",
  },
  {
    q: "How secure is our data?",
    a: "Data governance and security are reviewed diligently in every engagement: who owns the data, where it lives, and how it moves. Solutions are built compliance-aware, with resident and financial data handled to GDPR and CCPA standards.",
  },
  {
    q: "How long does implementation take?",
    a: "Discovery typically runs a few weeks; implementation is phased against your priorities so value lands early and operations never stop. Simple automations can be live in days; full platform integrations roll out in planned phases.",
  },
  {
    q: "Will our teams need training?",
    a: "Minimal, by design. Because we build inside the tools your teams already use, the change feels like their software got better, not like new software arrived. Where training helps, we provide it as part of rollout.",
  },
];

export default function Faq() {
  return (
    <div id="faq" className="scroll-mt-20 px-6 py-[100px] md:px-[60px]">
      <Reveal className="mx-auto grid max-w-[1140px] grid-cols-1 items-start gap-10 md:grid-cols-[320px_1fr] md:gap-16">
        <div className="flex flex-col gap-3.5">
          <div className="font-mono text-[11px] tracking-[.2em] text-teal-brand">FAQ</div>
          <h2 className="m-0 text-[28px] font-bold leading-[1.18] text-ink [text-wrap:pretty] md:text-[32px]">
            Quick answers to the questions we hear most
          </h2>
          <p className="m-0 text-[14px] leading-[1.65] text-body">
            Don&#39;t see yours here? Bring it to a discovery call.
          </p>
          <a href="#contact" className="text-[13px] font-bold text-teal-brand hover:text-teal-hover">
            Ask us directly →
          </a>
        </div>
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card">
          {faqs.map((f, i) => (
            <details key={f.q} className={"faq" + (i < faqs.length - 1 ? " border-b border-ink/10" : "")}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-[26px] py-5 text-[15px] font-bold text-ink">
                {f.q}
                <span className="faq-plus flex-none text-[20px] font-normal text-teal-brand">+</span>
              </summary>
              <div className="max-w-[700px] px-[26px] pb-[22px] text-[13.5px] leading-[1.7] text-body">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
