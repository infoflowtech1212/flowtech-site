import Reveal from "@/components/Reveal";

/**
 * The five journey chapters. All copy is client-approved verbatim.
 * `overlay` renders them as HTML overlays above the fixed canvas (z-10,
 * pointer-events-none except the finale CTAs). The fallback journey reuses
 * the same blocks as normal scroll sections.
 */
export function ChapterHero({ overlay = true }: { overlay?: boolean }) {
  return (
    <div
      data-chapter="0"
      className={
        "relative z-10 flex items-center " +
        (overlay ? "h-screen pointer-events-none" : "min-h-[90vh] py-24")
      }
    >
      <Reveal hero className="ml-[7vw] flex max-w-[600px] flex-col items-start gap-[26px] px-6 text-left">
        <div className="ch-eyebrow">FlowTech · Real Estate Strategy, Built &amp; Implemented</div>
        <h1 className="ch-title ch-title--hero" style={{ fontSize: 74 }}>
          Step inside your portfolio.
        </h1>
        <p className="ch-body max-w-[540px]">
          Scroll to travel across an operation transformed: markets and properties across the
          country, disconnected today, flowing as one system after FlowTech.
        </p>
        <div className="mt-3 flex flex-col items-start gap-2.5">
          <div className="font-mono text-[10.5px] tracking-[.3em] text-[rgba(238,243,244,.5)]">
            SCROLL TO BEGIN
          </div>
          <div className="ml-[60px] h-11 w-px bg-gradient-to-b from-teal-bright to-transparent" />
        </div>
      </Reveal>
    </div>
  );
}

export function Chapter1({ overlay = true }: { overlay?: boolean }) {
  return (
    <div
      data-chapter="1"
      className={
        "relative z-10 flex items-center " +
        (overlay ? "h-[130vh] pointer-events-none" : "py-24")
      }
    >
      <Reveal className="ch-scrim ml-[8vw] flex max-w-[520px] flex-col gap-5 px-6 py-7">
        <div className="ch-eyebrow">Business Strategy Consulting</div>
        <h2 className="ch-title">We find where your operation loses time and money.</h2>
        <p className="ch-body">
          Properties, teams, and systems spread across the map, each an island. Property management
          here, accounting there, reporting rebuilt by hand. We start by diagnosing exactly where
          the disconnects are.
        </p>
        <div>
          <span className="ch-value">TRANSPARENCY</span>
        </div>
      </Reveal>
    </div>
  );
}

export function Chapter2({ overlay = true }: { overlay?: boolean }) {
  return (
    <div
      data-chapter="2"
      className={
        "relative z-10 flex items-center justify-end " +
        (overlay ? "h-[130vh] pointer-events-none" : "py-24")
      }
    >
      <Reveal className="ch-scrim mr-[8vw] flex max-w-[520px] flex-col items-end gap-5 px-6 py-7 text-right">
        <div className="ch-eyebrow">Discovery &amp; Operational Assessment</div>
        <h2 className="ch-title">Our discovery is led by operators, not software consultants.</h2>
        <p className="ch-body">
          We document your end-to-end operations, identify pain points, expose inefficiencies,
          quantify unnecessary corporate and property-level overhead, and uncover opportunities for
          improvement. Every recommendation is grounded in operational experience and designed to
          improve performance before technology is introduced. Strategy first. Systems follow.
        </p>
        <div>
          <span className="ch-value">VISIBILITY</span>
        </div>
      </Reveal>
    </div>
  );
}

export function Chapter3({ overlay = true }: { overlay?: boolean }) {
  return (
    <div
      data-chapter="3"
      className={
        "relative z-10 flex items-center " +
        (overlay ? "h-[130vh] pointer-events-none" : "py-24")
      }
    >
      <Reveal className="ch-scrim ml-[8vw] flex max-w-[520px] flex-col gap-5 px-6 py-7">
        <div className="ch-eyebrow">Integration &amp; Automation</div>
        <h2 className="ch-title">We connect the tools you already own.</h2>
        <p className="ch-body">
          No rip-and-replace. Discovery tells us where the friction lives; we enhance the platforms
          you already pay for so data flows between every market, property, and system, and
          operational performance finally reads against financial outcomes, in real time.
        </p>
        <div>
          <span className="ch-value">DATA-DRIVEN DECISIONS</span>
        </div>
      </Reveal>
    </div>
  );
}

export function Chapter4({ overlay = true }: { overlay?: boolean }) {
  return (
    <div
      data-chapter="4"
      className={
        "relative z-10 flex items-center justify-center text-center " +
        (overlay ? "h-[140vh]" : "py-24")
      }
    >
      <Reveal
        className="flex max-w-[760px] flex-col items-center gap-[26px] rounded-[28px] px-6 py-11 backdrop-blur-[3px] md:px-12"
        style={{
          background:
            "radial-gradient(ellipse, rgba(4,10,14,.78) 40%, rgba(4,10,14,.35) 75%, transparent)",
        }}
      >
        <div className="ch-eyebrow">The Result</div>
        <h2 className="ch-title ch-title--finale" style={{ fontSize: 60 }}>
          One operation. Efficient, transparent, connected. Ready to scale.
        </h2>
        <p className="ch-body max-w-[540px]">
          This is your business after a FlowTech engagement: every market connected, every decision
          data-driven, leadership freed for strategy. The future of real estate, already running.
        </p>
        <div>
          <span className="ch-value">SCALABILITY WITHOUT DISRUPTION</span>
        </div>
        <div className="mt-2.5 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="pointer-events-auto rounded-full bg-gradient-to-r from-teal-brand to-teal-bright px-[38px] py-4 text-[15px] font-bold text-[#04181b] shadow-ctaGlow transition-transform duration-200 hover:-translate-y-0.5"
          >
            Begin your engagement
          </a>
          <a
            href="#capabilities"
            className="pointer-events-auto rounded-full border border-white/30 px-[34px] py-4 text-[15px] font-semibold text-white transition-colors hover:border-teal-bright"
          >
            Explore what we do
          </a>
        </div>
      </Reveal>
    </div>
  );
}
