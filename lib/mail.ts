import nodemailer from "nodemailer";
import { Resend } from "resend";
import { business } from "@/data/business";

export type DeliveryResult =
  | { status: "accepted"; id: string; provider: "resend" | "smtp" }
  | { status: "unavailable"; reason: string }
  | { status: "error"; message: string };

export type MailInput = {
  subject: string;
  text: string;
  html?: string;
  replyTo: string;
  to?: string;
};

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 140);
}

export function getRecipient() {
  return process.env.ENQUIRY_TO_EMAIL || business.enquiryEmail;
}

async function sendWithResend(
  apiKey: string,
  from: string,
  input: MailInput
): Promise<{ success: true; id: string } | { success: false; error: unknown; isDomainUnverified?: boolean }> {
  try {
    const resend = new Resend(apiKey);
    const to = input.to || getRecipient();
    const payload: {
      from: string;
      to: string;
      replyTo: string;
      subject: string;
      text: string;
      html?: string;
    } = {
      from,
      to,
      replyTo: input.replyTo,
      subject: oneLine(input.subject),
      text: input.text,
    };
    if (input.html) {
      payload.html = input.html;
    }

    const { data, error } = await resend.emails.send(payload);
    if (error || !data) {
      const errMsg = error?.message || "Unknown Resend error";
      const isDomainUnverified =
        (error as { statusCode?: number })?.statusCode === 403 ||
        error?.name === "validation_error" ||
        errMsg.toLowerCase().includes("not verified");

      console.warn("[mail] Resend rejected the enquiry email:", {
        from,
        to,
        errorName: error?.name,
        errorMessage: errMsg,
        isDomainUnverified,
      });

      return { success: false, error, isDomainUnverified };
    }
    return { success: true, id: data.id };
  } catch (err: unknown) {
    console.error("[mail] Resend request exception:", err);
    return { success: false, error: err };
  }
}

async function sendWithSmtp(
  host: string,
  from: string,
  input: MailInput
): Promise<{ success: true; id: string } | { success: false; error: unknown }> {
  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
    const to = input.to || getRecipient();
    const info = await transporter.sendMail({
      from,
      to,
      replyTo: input.replyTo,
      subject: oneLine(input.subject),
      text: input.text,
      ...(input.html ? { html: input.html } : {}),
    });
    console.log("[mail] SMTP sent successfully:", info.messageId);
    return { success: true, id: info.messageId || "smtp-accepted" };
  } catch (error: unknown) {
    console.error("[mail] SMTP transport exception:", error);
    return { success: false, error };
  }
}

export async function deliverMail(input: MailInput): Promise<DeliveryResult> {
  const customFrom = process.env.MAIL_FROM?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const smtpHost = process.env.SMTP_HOST?.trim();

  if (!resendKey && !smtpHost) {
    console.error("[mail] Neither RESEND_API_KEY nor SMTP_HOST is configured.");
    return { status: "unavailable", reason: "No email provider configured" };
  }

  // 1. Try Resend if configured
  if (resendKey) {
    const defaultFrom = "NR International Export <onboarding@resend.dev>";
    const from = customFrom || defaultFrom;

    const resendResult = await sendWithResend(resendKey, from, input);
    if (resendResult.success) {
      return { status: "accepted", id: resendResult.id, provider: "resend" };
    }

    // If Resend failed because custom domain is not verified, and we used a custom from:
    // Try fallback with onboarding@resend.dev in case recipient is testing address
    if (resendResult.isDomainUnverified && from !== defaultFrom) {
      console.warn("[mail] Retrying Resend with testing domain (onboarding@resend.dev)...");
      const fallbackResend = await sendWithResend(resendKey, defaultFrom, input);
      if (fallbackResend.success) {
        return { status: "accepted", id: fallbackResend.id, provider: "resend" };
      }
    }

    // If Resend failed and SMTP is configured, automatically fall back to SMTP
    if (smtpHost) {
      console.warn("[mail] Resend failed. Falling back to SMTP transport...");
      const smtpFrom =
        customFrom ||
        process.env.SMTP_USER ||
        "NR International Export <contact@nrinternationalexport.com>";
      const smtpResult = await sendWithSmtp(smtpHost, smtpFrom, input);
      if (smtpResult.success) {
        return { status: "accepted", id: smtpResult.id, provider: "smtp" };
      }
    }

    return {
      status: "error",
      message: "Resend failed to deliver email and no alternate provider succeeded.",
    };
  }

  // 2. Resend not configured, but SMTP is configured
  if (smtpHost) {
    const smtpFrom =
      customFrom ||
      process.env.SMTP_USER ||
      "NR International Export <contact@nrinternationalexport.com>";
    const smtpResult = await sendWithSmtp(smtpHost, smtpFrom, input);
    if (smtpResult.success) {
      return { status: "accepted", id: smtpResult.id, provider: "smtp" };
    }
    return {
      status: "error",
      message: "SMTP failed to deliver email.",
    };
  }

  return { status: "unavailable", reason: "Mail delivery unavailable" };
}

export function mailFooter() {
  return `\n\nSent from the ${business.name} website enquiry form.`;
}
