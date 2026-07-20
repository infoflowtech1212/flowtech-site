import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Founder() {
  return (
    <div id="about" className="scroll-mt-20 bg-white px-6 py-[100px] md:px-[60px]">
      <Reveal className="mx-auto grid max-w-[1140px] grid-cols-1 items-start gap-10 md:grid-cols-[300px_1fr] md:gap-16">
        <div className="flex flex-col gap-6">
          <Image
            src="/assets/founder-headshot.jpg"
            alt="FlowTech founder"
            width={300}
            height={360}
            className="block h-[360px] w-[300px] rounded-2xl object-cover object-top"
          />
          <div className="grid w-[300px] grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-[22px] font-extrabold text-teal-brand">25+</div>
              <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[.1em] text-muted">
                Years Operating
              </div>
            </div>
            <div className="text-center">
              <div className="text-[22px] font-extrabold text-teal-brand">$25B</div>
              <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[.1em] text-muted">
                Overseen &amp; Advised
              </div>
            </div>
            <div className="text-center">
              <div className="text-[22px] font-extrabold text-teal-brand">400+</div>
              <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[.1em] text-muted">
                Buildings Scaled
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[18px]">
          <div className="font-mono text-[11px] tracking-[.2em] text-teal-brand">
            FOUNDER &amp; PRINCIPAL · BUILT BY AN OPERATOR, NOT AN AGENCY
          </div>
          <h2 className="m-0 text-[28px] font-bold leading-[1.18] text-ink [text-wrap:pretty] md:text-[34px]">
            The systems he always needed didn&#39;t exist. So he built them.
          </h2>
          <p className="m-0 max-w-[680px] text-[15px] leading-[1.75] text-body [text-wrap:pretty]">
            Prashanth Rayapudi has spent more than 25 years running real estate operations as both
            an owner and an operator, across hospitality, multifamily, and single family:
            overseeing portfolios representing billions in assets, developing teams, and building
            systems that keep businesses performing at their best. Along the way, he discovered
            that technology isn&#39;t just a support tool; it&#39;s a catalyst for transformation.
          </p>
          <p className="m-0 max-w-[680px] text-[15px] leading-[1.75] text-body [text-wrap:pretty]">
            From automating reporting to integrating data platforms, Prashanth has designed and
            executed platforms that bring real visibility into performance metrics and help teams
            connect operational execution to financial outcomes. FlowTech is that experience,
            productized: strategy consulting backed by working systems, removing friction,
            enhancing transparency, and empowering organizations to scale with clarity and
            confidence.
          </p>
          <a href="#contact" className="text-[13.5px] font-bold text-teal-brand hover:text-teal-hover">
            Exploring ways to transform your operations? Let&#39;s connect →
          </a>
        </div>
      </Reveal>
    </div>
  );
}
