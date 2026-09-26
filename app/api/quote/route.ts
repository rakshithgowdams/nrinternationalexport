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

  const result = await deliverMail({
    subject: `Quote enquiry from ${parsed.data.company}`,
    text,
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
