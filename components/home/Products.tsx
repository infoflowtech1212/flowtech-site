import Image from "next/image";
import Reveal from "@/components/Reveal";

const products = [
  {
    name: "DocCreate",
    logo: "/assets/doccreate-logo.png",
    badge: "monday.com marketplace",
    badgeMuted: false,
    body: "Automated document creation with e-signatures, cloud sync, and image capture.",
    url: "https://doccreate.io",
    label: "doccreate.io →",
    logoRounded: false,
  },
  {
    name: "QR Trax",
    logo: "/assets/qrtrax-logo.png",
    badge: "platform",
    badgeMuted: false,
    body: "QR codes for inventory, vehicle, and service tracking. One scan connects an asset to its history.",
    url: "https://qrtrax.com",
    label: "qrtrax.com →",
    logoRounded: true,
  },
  {
    name: "PRISM",
    logo: "/assets/prism-logo.png",
    badge: "coming soon",
    badgeMuted: true,
    body: "Property intelligence system: a full operating system for real estate teams.",
    url: "https://prismpm.ai",
    label: "prismpm.ai →",
    logoRounded: true,
  },
];

const platforms = [
  "Yardi",
  "AppFolio",
  "Rent Manager",
  "MRI",
  "Entrata",
  "monday.com",
  "Salesforce",
  "Power Apps",
  "Power BI",
  "Power Automate",
  "Microsoft 365",
  "SharePoint",
  "Google Workspace",
  "Apps Script",
  "Looker Studio",
];

export default function Products() {
  return (
    <div id="products" className="scroll-mt-20 px-6 py-[100px] md:px-[60px]">
      <Reveal className="mx-auto max-w-[1140px]">
        <h2 className="m-0 mb-2 text-[30px] font-bold leading-[1.12] text-ink md:text-[38px]">
          Proprietary software, built by FlowTech
        </h2>
        <p className="m-0 mb-9 max-w-[600px] text-[14.5px] leading-[1.65] text-body">
          A dedicated arm of FlowTech develops its own proprietary software. These systems can be
          added to your operation, or we design and build custom solutions specifically for your
          organization.
        </p>
        <div className="mb-[52px] grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.map((p) => (
            <div key={p.name} className="flex flex-col gap-2.5 rounded-card bg-white p-7 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <Image
                    src={p.logo}
                    alt={`${p.name} logo`}
                    width={36}
                    height={36}
                    className={"h-9 w-9 flex-none object-contain" + (p.logoRounded ? " rounded-lg" : "")}
                  />
                  <span className="text-[17px] font-bold text-ink">{p.name}</span>
                </div>
                <span
                  className={
                    "rounded-full border px-2 py-[3px] font-mono text-[9px] " +
                    (p.badgeMuted
                      ? "border-ink/25 text-body-soft"
                      : "border-[rgba(0,151,169,.45)] text-teal-hover")
                  }
                >
                  {p.badge}
                </span>
              </div>
              <div className="text-[13px] leading-[1.6] text-body-soft">{p.body}</div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener"
                className="mt-auto text-[12.5px] font-semibold text-teal-brand hover:text-teal-hover"
              >
                {p.label}
              </a>
            </div>
          ))}
        </div>
        <div className="border-t border-ink/10 pt-9">
          <div className="mb-[18px] font-mono text-[11px] tracking-[.2em] text-teal-brand">
            PLATFORM FLUENCY · SOME OF THE MANY PLATFORMS WE WORK WITH
          </div>
          <div className="flex flex-wrap gap-2">
            {platforms.map((pl) => (
              <span
                key={pl}
                className="rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-[12.5px] text-[#3c4a50]"
              >
                {pl}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
