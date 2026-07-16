import Reveal from "@/components/Reveal";

export const capabilityItems: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Systems Integration",
    body:
      "We enhance the tools you're already paying for, connecting them so information flows and the whole team gains transparency and value.",
  },
  {
    n: "02",
    title: "Data Analytics & Dashboards",
    body:
      "Custom-built dashboards and reporting, showing operational performance against financial outcomes in real time.",
  },
  {
    n: "03",
    title: "Workflow Automation",
    body: "Repetitive administrative work removed, so people carry judgment, not data entry.",
  },
  {
    n: "04",
    title: "Inventory & Asset Management",
    body:
      "QR-driven tracking for inventory, vehicles, and service history, one scan ties an asset to its record.",
  },
  {
    n: "05",
    title: "Software Development",
    body: "Custom platforms and integrations when off-the-shelf runs out of road.",
  },
  {
    n: "06",
    title: "AI Integration",
    body:
      "Applied where it earns its keep, with data governance and security built in from day one.",
  },
  {
    n: "07",
    title: "Process Design & SOPs",
    body:
      "Documented, repeatable processes so operations run on structure, not institutional memory.",
  },
  {
    n: "08",
    title: "Data Governance & Security",
    body:
      "Who owns the data, where it lives, and how it moves, reviewed diligently in every engagement.",
  },
];

export default function Capabilities() {
  return (
    <div id="capabilities" className="scroll-mt-20 px-6 py-[100px] md:px-[60px]">
      <Reveal className="mx-auto max-w-[1140px]">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-8 md:gap-12">
          <h2 className="m-0 max-w-[520px] text-[30px] font-bold leading-[1.12] text-ink md:text-[38px]">
            One engagement. Every capability it calls for.
          </h2>
          <p className="m-0 max-w-[400px] text-[14.5px] leading-[1.65] text-body">
            This isn&#39;t a menu of services; these are the levers we pull most often once we
            understand your operation. The list grows with the challenge.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityItems.map((it) => (
            <div
              key={it.n}
              className="flex flex-col gap-2 rounded-card bg-white p-[26px] shadow-card"
            >
              <div className="font-mono text-[10.5px] text-teal-brand">{it.n}</div>
              <div className="text-[15.5px] font-bold text-ink">{it.title}</div>
              <div className="text-[13px] leading-[1.6] text-body-soft">{it.body}</div>
            </div>
          ))}
          <a
            href="#contact"
            className="flex flex-col gap-2 rounded-card bg-dark-footer p-[26px] text-white transition-colors duration-300 hover:bg-teal-brand"
          >
            <div className="font-mono text-[10.5px] text-teal-bright">+</div>
            <div className="text-[15.5px] font-bold">Don&#39;t see your challenge?</div>
            <div className="text-[13px] leading-[1.6] text-white/65">
              If it slows your operation down, it&#39;s in scope. Bring it to a discovery call.
            </div>
          </a>
        </div>
      </Reveal>
    </div>
  );
}
