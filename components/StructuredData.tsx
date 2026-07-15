const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flowtechapps.com";

// Every string below is copied verbatim from existing on-page copy
// (Founder.tsx, Products.tsx, Faq.tsx, layout.tsx metadata) — no new claims added.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: "FlowTech",
      url: siteUrl,
      description:
        "Business strategy consulting for real estate investment and operations teams. Strategy first. Systems that follow.",
      email: "info@flowtechapps.com",
      founder: { "@id": `${siteUrl}/#founder` },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "DocCreate",
            url: "https://doccreate.io",
            applicationCategory: "BusinessApplication",
            description:
              "Automated document creation with e-signatures, cloud sync, and image capture.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "QR Trax",
            url: "https://qrtrax.io",
            applicationCategory: "BusinessApplication",
            description:
              "QR codes for inventory, vehicle, and service tracking. One scan connects an asset to its history.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "PRISM",
            url: "https://prismpm.ai",
            applicationCategory: "BusinessApplication",
            description: "Property intelligence system: a full operating system for real estate teams.",
            releaseNotes: "Coming soon",
          },
        },
      ],
      sameAs: ["https://www.linkedin.com/company/flowtechapps"],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: "Prashanth Rayapudi",
      jobTitle: "Founder & Principal",
      description:
        "Has spent more than 25 years running real estate operations as both an owner and an operator, across hospitality, multifamily, and single family, overseeing portfolios representing $5 billion in assets.",
      worksFor: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "FlowTech",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does FlowTech specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Business strategy consulting for real estate investment and operations teams. Under one engagement we deliver systems integration, workflow automation, data analytics, inventory and asset management, custom software, and AI, always starting from strategy, not software.",
          },
        },
        {
          "@type": "Question",
          name: "What types of organizations do you work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Owners, operators, developers, property managers, and investment teams, from regional operators to multi-entity enterprises. If your business runs on properties, portfolios, and the people who manage them, we speak your language.",
          },
        },
        {
          "@type": "Question",
          name: "Do we need to replace the systems we already use, like Yardi or AppFolio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We layer onto the platforms you're already paying for, property management, CRM, finance, and work management, enhancing them so information flows between them. No rip-and-replace, no disruption to daily operations.",
          },
        },
        {
          "@type": "Question",
          name: "What types of workflows can you automate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Anything repetitive and rule-based: asset transitions, unit make-ready and turn, approvals, document generation, owner and lender reporting, field inspections, and inventory or vehicle tracking. If your team does it twice a week in a spreadsheet, it's a candidate.",
          },
        },
        {
          "@type": "Question",
          name: "How do you identify which processes to fix first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Through a discovery engagement. We sit with your team to understand the pain points, run an end-to-end forensic analysis, and deliver a phased plan with a few options to remedy each issue, sequenced by impact and priority.",
          },
        },
        {
          "@type": "Question",
          name: "How secure is our data?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Data governance and security are reviewed diligently in every engagement: who owns the data, where it lives, and how it moves. Solutions are built compliance-aware, with resident and financial data handled to GDPR and CCPA standards.",
          },
        },
        {
          "@type": "Question",
          name: "How long does implementation take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Discovery typically runs a few weeks; implementation is phased against your priorities so value lands early and operations never stop. Simple automations can be live in days; full platform integrations roll out in planned phases.",
          },
        },
        {
          "@type": "Question",
          name: "Will our teams need training?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Minimal, by design. Because we build inside the tools your teams already use, the change feels like their software got better, not like new software arrived. Where training helps, we provide it as part of rollout.",
          },
        },
      ],
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
