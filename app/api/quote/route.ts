import { NextResponse } from "next/server";
import { getProduct, marketLabel } from "@/data/products";
import { fieldErrors, quoteSchema } from "@/lib/schemas";
import { deliverMail } from "@/lib/mail";
import { alreadyAccepted, markAccepted, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`quote:${ip}`).ok) {
    return NextResponse.json(
      { status: "error", message: "Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: "invalid", message: "The form could not be read." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ status: "invalid", fieldErrors: fieldErrors(parsed.error) }, { status: 400 });
  }

  if (alreadyAccepted(parsed.data.idempotencyKey)) {
    return NextResponse.json({ status: "accepted", id: "already-accepted" });
  }

  const lines = parsed.data.lines.map((line) => {
    const product = getProduct(line.productId);
    const unit = line.unit === "other" ? line.otherUnit : line.unit;
    return `- ${product?.name ?? line.productId}: ${line.quantity} ${unit}${line.grade ? ` (${line.grade})` : ""}`;
  });

  const text = [
    `Market: ${marketLabel[parsed.data.market]}`,
    ...lines,
    `Country: ${parsed.data.country || "Not provided"}`,
    `City: ${parsed.data.city}`,
    `Postal code: ${parsed.data.postalCode || "Not provided"}`,
    `Port: ${parsed.data.port || "Not provided"}`,
    `Requested date: ${parsed.data.requestedDate || "Not provided"}`,
    `Packing: ${parsed.data.packing || "Not provided"}`,
    `Requirements: ${parsed.data.requirements || "Not provided"}`,
    `Name: ${parsed.data.name}`,
    `Company: ${parsed.data.company}`,
    `Email: ${parsed.data.email}`,
    `Phone: ${parsed.data.phone}`,
    `Contact preference: ${parsed.data.contactPreference}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Quote Enquiry</title></head>
<body style="margin: 0; padding: 24px; background-color: #f7f5ee; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #20271f;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dde2d6; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="background-color: #20351f; padding: 20px 24px;">
        <p style="margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #efba6a; text-transform: uppercase;">NR International Export</p>
        <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 600; color: #ffffff;">Quote Enquiry — ${parsed.data.company}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 24px;">
        <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #40572b; text-transform: uppercase;">Products Requested</p>
        <ul style="margin: 0 0 20px 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
          ${lines.map((l) => `<li>${l.replace(/^- /, "")}</li>`).join("")}
        </ul>
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #40572b; text-transform: uppercase;">Buyer & Delivery Details</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 1.6;">
          <tr><td style="color: #6b7765; width: 140px; padding: 4px 0;">Market:</td><td>${marketLabel[parsed.data.market]}</td></tr>
          <tr><td style="color: #6b7765; padding: 4px 0;">Buyer Name:</td><td>${parsed.data.name}</td></tr>
          <tr><td style="color: #6b7765; padding: 4px 0;">Company:</td><td>${parsed.data.company}</td></tr>
          <tr><td style="color: #6b7765; padding: 4px 0;">Email:</td><td><a href="mailto:${parsed.data.email}">${parsed.data.email}</a></td></tr>
          <tr><td style="color: #6b7765; padding: 4px 0;">Phone:</td><td>${parsed.data.phone || "Not provided"}</td></tr>
          <tr><td style="color: #6b7765; padding: 4px 0;">Destination City:</td><td>${parsed.data.city}</td></tr>
          <tr><td style="color: #6b7765; padding: 4px 0;">Country:</td><td>${parsed.data.country || "Not provided"}</td></tr>
          <tr><td style="color: #6b7765; padding: 4px 0;">Port:</td><td>${parsed.data.port || "Not provided"}</td></tr>
          <tr><td style="color: #6b7765; padding: 4px 0;">Postal Code:</td><td>${parsed.data.postalCode || "Not provided"}</td></tr>
          <tr><td style="color: #6b7765; padding: 4px 0;">Target Date:</td><td>${parsed.data.requestedDate || "Not provided"}</td></tr>
          <tr><td style="color: #6b7765; padding: 4px 0;">Packing:</td><td>${parsed.data.packing || "Standard"}</td></tr>
          <tr><td style="color: #6b7765; padding: 4px 0;">Preference:</td><td>${parsed.data.contactPreference}</td></tr>
        </table>
        ${
          parsed.data.requirements
            ? `<div style="margin-top: 16px; padding: 12px; background: #faf9f5; border-left: 3px solid #40572b; font-size: 14px;"><strong>Special requirements:</strong><br>${parsed.data.requirements}</div>`
            : ""
        }
      </td>
    </tr>
  </table>
</body>
</html>`;

  const result = await deliverMail({
    subject: `Quote enquiry from ${parsed.data.company}`,
    text,
    html,
    replyTo: parsed.data.email,
  });

  if (result.status === "accepted") {
    markAccepted(parsed.data.idempotencyKey);
    return NextResponse.json({ status: "accepted", id: result.id });
  }
  if (result.status === "unavailable") {
    return NextResponse.json({ status: "unavailable" }, { status: 503 });
  }
  return NextResponse.json({ status: "error", message: "The mail service did not accept the message." }, { status: 502 });
}
