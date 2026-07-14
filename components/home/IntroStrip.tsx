import Reveal from "@/components/Reveal";

export default function IntroStrip() {
  return (
    <div className="bg-white px-6 pb-[90px] pt-[110px] text-center md:px-[60px]">
      <Reveal className="mx-auto flex max-w-[840px] flex-col items-center gap-[22px]">
        <div className="font-mono text-[11.5px] tracking-[.26em] text-teal-brand">
          BACK ON THE GROUND · WHAT WE DO
        </div>
        <h2 className="m-0 text-[36px] font-bold leading-[1.06] tracking-[-.01em] text-ink [text-wrap:pretty] md:text-[50px]">
          Strategy first. Systems that follow.
        </h2>
        <p className="m-0 max-w-[640px] text-[17px] leading-[1.7] text-body [text-wrap:pretty]">
          FlowTech works with real estate investment and operations teams from development through
          management: transparency, visibility, and scalability, without disrupting the systems you
          already trust.
        </p>
      </Reveal>
    </div>
  );
}
