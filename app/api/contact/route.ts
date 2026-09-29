import { NextResponse } from "next/server";
import { business } from "@/data/business";
import { contactSchema, fieldErrors } from "@/lib/schemas";
import { deliverMail } from "@/lib/mail";
import { alreadyAccepted, markAccepted, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`contact:${ip}`).ok) {
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ status: "invalid", fieldErrors: fieldErrors(parsed.error) }, { status: 400 });
  }

  if (alreadyAccepted(parsed.data.idempotencyKey)) {
    return NextResponse.json({ status: "accepted", id: "already-accepted" });
  }

  const text = [
    `Name: ${parsed.data.name}`,
    `Company: ${parsed.data.company}`,
    `Email: ${parsed.data.email}`,
    `Phone: ${parsed.data.phone || "Not provided"}`,
    `Enquiry type: ${parsed.data.enquiryType}`,
    "",
    parsed.data.message,
  ].join("\n");

  const result = await deliverMail({
    subject: `Website enquiry from ${parsed.data.company}`,
    text,
    replyTo: parsed.data.email,
  });

  if (result.status === "accepted") {
    markAccepted(parsed.data.idempotencyKey);
    return NextResponse.json({ status: "accepted", id: result.id });
  }
  if (result.status === "unavailable") {
    return NextResponse.json(
      { status: "unavailable", message: `Email ${business.enquiryEmail} directly. This server has no mail transport configured.` },
      { status: 503 },
    );
  }
  return NextResponse.json({ status: "error", message: "The mail service did not accept the message." }, { status: 502 });
}
