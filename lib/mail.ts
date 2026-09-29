import nodemailer from "nodemailer";
import { Resend } from "resend";
import { business } from "@/data/business";

export type DeliveryResult =
  | { status: "accepted"; id: string }
  | { status: "unavailable" }
  | { status: "error" };

type MailInput = {
  subject: string;
  text: string;
  replyTo: string;
};

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 140);
}

function recipient() {
  return process.env.ENQUIRY_TO_EMAIL || business.enquiryEmail;
}

async function sendWithResend(apiKey: string, from: string, input: MailInput): Promise<DeliveryResult> {
  try {
    const { data, error } = await new Resend(apiKey).emails.send({
      from,
      to: recipient(),
      replyTo: input.replyTo,
      subject: oneLine(input.subject),
      text: input.text,
    });
    if (error || !data) {
      console.error("Resend rejected the enquiry email", error?.name, error?.message);
      return { status: "error" };
    }
    return { status: "accepted", id: data.id };
  } catch (error) {
    console.error("Resend request failed", error);
    return { status: "error" };
  }
}

async function sendWithSmtp(host: string, from: string, input: MailInput): Promise<DeliveryResult> {
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
      to: recipient(),
      replyTo: input.replyTo,
      subject: oneLine(input.subject),
      text: input.text,
    });
    return { status: "accepted", id: info.messageId || "accepted" };
  } catch {
    return { status: "error" };
  }
}

export async function deliverMail(input: MailInput): Promise<DeliveryResult> {
  const from = process.env.MAIL_FROM;
  if (!from) return { status: "unavailable" };

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) return sendWithResend(resendKey, from, input);

  const smtpHost = process.env.SMTP_HOST;
  if (smtpHost) return sendWithSmtp(smtpHost, from, input);

  return { status: "unavailable" };
}

export function mailFooter() {
  return `\n\nSent from the ${business.name} website enquiry form.`;
}
