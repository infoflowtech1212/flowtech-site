import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/**
 * Contact form backend. Delivers submissions via Resend when RESEND_API_KEY
 * is configured; otherwise logs and accepts (so the form works in preview
 * environments without secrets). Configure in .env — see .env.example.
 */
export async function POST(req: Request) {
  let body: { name?: string; company?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = (body.name ?? "").toString().slice(0, 200).trim();
  const company = (body.company ?? "").toString().slice(0, 200).trim();
  const email = (body.email ?? "").toString().slice(0, 320).trim();
  const message = (body.message ?? "").toString().slice(0, 5000).trim();

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !message) {
    return NextResponse.json({ error: "A valid email and message are required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "info@flowtechapps.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "website@flowtechapps.com";

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — submission accepted but not emailed", {
      name,
      company,
      email,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `FlowTech Website <${from}>`,
      to: [to],
      replyTo: email,
      subject: `Discovery inquiry — ${name || email}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name || "—"}`,
        `Company: ${company || "—"}`,
        `Email: ${email}`,
        "",
        "What are they trying to solve?",
        message,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
