"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { track } from "@/lib/analytics";

const inputClass =
  "rounded-lg border border-white/15 bg-white/[.06] px-4 py-[13px] text-[13px] text-white " +
  "font-sans placeholder:text-white/40 outline-none focus:border-teal-bright/60";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({ name: "", company: "", email: "", message: "" });

  const set = (k: keyof typeof fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFields((f) => ({ ...f, [k]: e.target.value }));

  async function submit() {
    if (status === "sending") return;
    if (!fields.email.trim() || !fields.message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    track("contact_submit");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="contact" className="scroll-mt-20 px-6 pb-[110px] pt-10 md:px-[60px]">
      <Reveal className="mx-auto grid max-w-[1140px] grid-cols-1 gap-10 rounded-scrim bg-dark-panel p-8 shadow-contact md:p-16 lg:grid-cols-[1fr_420px] lg:gap-16">
        <div className="flex flex-col gap-[18px]">
          <h2 className="m-0 text-[32px] font-bold leading-[1.1] text-white [text-wrap:pretty] md:text-[44px]">
            Let&#39;s look at your operation together.
          </h2>
          <p className="m-0 max-w-[440px] text-[15.5px] leading-[1.7] text-white/65">
            A discovery call costs nothing and usually surfaces two or three things worth fixing,
            regardless of who fixes them.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-[13px] text-white/50">
            <div>info@flowtechapps.com</div>
            <div>www.flowtechapps.com</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input placeholder="Name" value={fields.name} onChange={set("name")} className={inputClass} aria-label="Name" />
            <input placeholder="Company" value={fields.company} onChange={set("company")} className={inputClass} aria-label="Company" />
          </div>
          <input
            placeholder="Work email"
            type="email"
            value={fields.email}
            onChange={set("email")}
            className={inputClass}
            aria-label="Work email"
          />
          <textarea
            placeholder="What are you trying to solve?"
            value={fields.message}
            onChange={set("message")}
            className={inputClass + " min-h-[100px] resize-y"}
            aria-label="What are you trying to solve?"
          />
          <button
            type="button"
            onClick={submit}
            disabled={status === "sending" || status === "sent"}
            className="cursor-pointer rounded-full bg-gradient-to-r from-teal-brand to-teal-bright p-3.5 text-center text-[14px] font-bold text-[#04181b] shadow-[0_0_30px_rgba(47,212,230,.3)] transition-transform hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-80 disabled:hover:translate-y-0"
          >
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent — we'll be in touch" : "Send"}
          </button>
          {status === "error" && (
            <div className="text-[12.5px] text-[#ffb0a0]" role="alert">
              Something went wrong. Add a work email and a short note, or email us directly at
              info@flowtechapps.com.
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
