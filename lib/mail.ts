import nodemailer from "nodemailer";
import { business } from "@/data/business";

const RECIPIENT = "nrinternationalexport@gmail.com";

export type DeliveryResult =
  | { status: "accepted"; id: string }
  | { status: "unavailable" }
  | { status: "error" };

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 140);
}

export async function deliverMail(input: {
  subject: string;
  text: string;
  replyTo: string;
}) {
  const host = process.env.SMTP_HOST;
  const from = process.env.MAIL_FROM;
  if (!host || !from) return { status: "unavailable" } as const;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
    const info = await transporter.sendMail({
      from,
      to: RECIPIENT,
      replyTo: input.replyTo,
      subject: oneLine(input.subject),
      text: input.text,
    });
    return { status: "accepted", id: info.messageId || "accepted" } as const;
  } catch {
    return { status: "error" } as const;
  }
}

export function mailFooter() {
  return `\n\nSent from the ${business.name} website enquiry form.`;
}
