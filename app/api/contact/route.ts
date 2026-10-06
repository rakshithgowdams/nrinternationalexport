import { NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { deliverMail } from "@/lib/mail";

const ENQUIRY_TYPE_LABELS: Record<string, string> = {
  product: "Product question",
  domestic: "Domestic supply",
  export: "Global export",
  other: "Something else",
};

function normalizeEnquiryType(val: unknown): string {
  if (typeof val !== "string") return "product";
  const lower = val.trim().toLowerCase();
  if (lower === "product" || lower === "product question" || lower === "product-question") return "product";
  if (lower === "domestic" || lower === "domestic supply" || lower === "domestic-supply") return "domestic";
  if (lower === "export" || lower === "global export" || lower === "global-export") return "export";
  if (lower === "other" || lower === "something else") return "other";
  return val.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  console.log("[contact] request received");

  // Basic IP-based rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000).ok) {
    return NextResponse.json(
      {
        success: false,
        message: "Please wait a few minutes and try again.",
      },
      { status: 429 }
    );
  }

  // Parse JSON payload
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "The form could not be read.",
      },
      { status: 400 }
    );
  }

  // Server-side validation with Zod
  const rawData = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const normalizedData = {
    ...rawData,
    company: typeof rawData.company === "string" ? rawData.company : "",
    phone: typeof rawData.phone === "string" ? rawData.phone : "",
    enquiryType: normalizeEnquiryType(rawData.enquiryType),
    website: typeof rawData.website === "string" ? rawData.website : "",
    honeypot: typeof rawData.honeypot === "string" ? rawData.honeypot : "",
  };

  const parsed = contactSchema.safeParse(normalizedData);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check the form fields.",
        fieldErrors: fieldErrors(parsed.error),
      },
      { status: 400 }
    );
  }

  console.log("[contact] validation passed");

  const { name, company, email, phone, enquiryType, message, website, honeypot } = parsed.data;

  // Honeypot check: silently accept bot submissions
  if ((website && website.trim().length > 0) || (honeypot && honeypot.trim().length > 0)) {
    return NextResponse.json(
      {
        success: true,
        message: "Thank you. Your message has been sent successfully.",
      },
      { status: 200 }
    );
  }

  const enquiryTypeLabel = ENQUIRY_TYPE_LABELS[enquiryType] || enquiryType;

  // Format subject: New website enquiry — {Enquiry Type} — {Name}
  const subject = `New website enquiry — ${enquiryTypeLabel} — ${name}`;

  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  });

  // Plain-text email fallback
  const text = [
    "NR International Export — New Website Enquiry",
    "============================================",
    `Name: ${name}`,
    `Company: ${company || "Not provided"}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Enquiry Type: ${enquiryTypeLabel}`,
    "",
    "Message:",
    message,
    "",
    "============================================",
    "Submitted from: NR International Export Contact Page",
    `Timestamp: ${submittedAt} (IST)`,
  ].join("\n");

  // Professional HTML email
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Website Enquiry</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f7f5ee; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #20271f;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dde2d6; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <!-- Header -->
    <tr>
      <td style="background-color: #20351f; padding: 24px 28px; text-align: left;">
        <p style="margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #efba6a; text-transform: uppercase;">NR International Export</p>
        <h1 style="margin: 6px 0 0 0; font-size: 22px; font-weight: 600; color: #ffffff; line-height: 1.3;">New Website Enquiry</h1>
      </td>
    </tr>
    <!-- Enquiry Details Table -->
    <tr>
      <td style="padding: 24px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f0f2ed; font-size: 13px; color: #6b7765; width: 130px; font-weight: 600;">Name</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f0f2ed; font-size: 14px; color: #20271f; font-weight: 500;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f0f2ed; font-size: 13px; color: #6b7765; font-weight: 600;">Company</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f0f2ed; font-size: 14px; color: #20271f;">${escapeHtml(company || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f0f2ed; font-size: 13px; color: #6b7765; font-weight: 600;">Email</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f0f2ed; font-size: 14px; color: #20271f;">
              <a href="mailto:${escapeHtml(email)}" style="color: #40572b; text-decoration: underline;">${escapeHtml(email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f0f2ed; font-size: 13px; color: #6b7765; font-weight: 600;">Phone</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f0f2ed; font-size: 14px; color: #20271f;">${escapeHtml(phone || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f0f2ed; font-size: 13px; color: #6b7765; font-weight: 600;">Enquiry Type</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f0f2ed; font-size: 14px; color: #20271f; font-weight: 600;">${escapeHtml(enquiryTypeLabel)}</td>
          </tr>
        </table>

        <!-- Message Box -->
        <div style="margin-top: 20px;">
          <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #6b7765; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
          <div style="background-color: #faf9f5; border: 1px solid #dde2d6; border-left: 4px solid #40572b; border-radius: 4px; padding: 16px; font-size: 14px; line-height: 1.6; color: #20271f; white-space: pre-wrap;">${escapeHtml(message)}</div>
        </div>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="background-color: #f7f5ee; padding: 16px 28px; border-top: 1px solid #dde2d6; text-align: left;">
        <p style="margin: 0; font-size: 12px; color: #6b7765; line-height: 1.4;">
          <strong>Submitted from:</strong> NR International Export Contact Page<br>
          <strong>Timestamp:</strong> ${escapeHtml(submittedAt)} (IST)
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  console.log("[contact] attempting mail delivery");

  try {
    const result = await deliverMail({
      subject,
      text,
      html,
      replyTo: email,
    });

    if (result.status === "accepted") {
      console.log("[contact] mail delivered successfully via", result.provider, result.id);
      return NextResponse.json(
        {
          success: true,
          message: "Thank you. Your message has been sent successfully.",
          id: result.id,
        },
        { status: 200 }
      );
    }

    console.error("[contact] mail delivery rejected:", result);
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn’t send your message right now. Please try again, or contact us directly by email at contact@nrinternationalexport.com.",
      },
      { status: result.status === "unavailable" ? 503 : 502 }
    );
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : "Internal error";
    console.error("[contact] Mail delivery exception:", errMessage);
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn’t send your message right now. Please try again, or contact us directly by email at contact@nrinternationalexport.com.",
      },
      { status: 500 }
    );
  }
}
