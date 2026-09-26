import { z } from "zod";
import { getProduct, markets } from "@/data/products";
import { todayInKolkata } from "@/lib/utils";

const trimmed = (max: number) => z.string().trim().max(max);

export const lineSchema = z
  .object({
    productId: z.string().trim().min(1, "Choose a product."),
    grade: trimmed(80),
    quantity: z.coerce.number().positive("Enter a quantity greater than zero.").max(1_000_000),
    unit: z.string().trim().min(1, "Choose a unit.").max(40),
    otherUnit: trimmed(60),
  })
  .superRefine((line, ctx) => {
    const product = getProduct(line.productId);
    if (!product) {
      ctx.addIssue({ code: "custom", path: ["productId"], message: "Choose a product from the catalogue." });
      return;
    }
    if (line.unit === "other") {
      if (line.otherUnit.trim().length < 2) {
        ctx.addIssue({ code: "custom", path: ["otherUnit"], message: "Describe the unit." });
      }
      return;
    }
    if (!product.units.includes(line.unit)) {
      ctx.addIssue({ code: "custom", path: ["unit"], message: "Choose a unit that fits this product." });
    }
  });

export const quoteSchema = z
  .object({
    market: z.enum(markets, { message: "Choose global export or domestic supply." }),
    lines: z.array(lineSchema).min(1, "Add at least one product.").max(12),
    country: trimmed(80),
    city: trimmed(80),
    postalCode: trimmed(16),
    port: trimmed(80),
    requestedDate: trimmed(12),
    packing: trimmed(200),
    requirements: trimmed(2000),
    name: z.string().trim().min(2, "Enter your name.").max(80),
    company: z.string().trim().min(2, "Enter the company name.").max(120),
    email: z.string().trim().email("Enter a valid email address.").max(120),
    phone: z.string().trim().min(6, "Enter a phone number.").max(20),
    contactPreference: z.enum(["email", "phone"]),
    privacy: z.literal(true, { message: "Please acknowledge the privacy notice." }),
    honeypot: z.string().max(0),
    idempotencyKey: z.string().uuid(),
  })
  .superRefine((value, ctx) => {
    if (value.market === "global" && value.country.trim().length < 2) {
      ctx.addIssue({ code: "custom", path: ["country"], message: "Enter the destination country." });
    }
    if (value.city.trim().length < 2) {
      ctx.addIssue({ code: "custom", path: ["city"], message: "Enter the city or town." });
    }
    if (value.market === "domestic" && value.postalCode.trim().length < 4) {
      ctx.addIssue({ code: "custom", path: ["postalCode"], message: "Enter the postal code." });
    }
    if (value.requestedDate && value.requestedDate < todayInKolkata()) {
      ctx.addIssue({
        code: "custom",
        path: ["requestedDate"],
        message: "Choose today or a later date in India Standard Time.",
      });
    }
    value.lines.forEach((line, index) => {
      const product = getProduct(line.productId);
      if (product && !product.markets.includes(value.market)) {
        ctx.addIssue({
          code: "custom",
          path: ["lines", index, "productId"],
          message: `${product.name} is not listed for this market.`,
        });
      }
    });
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  company: z.string().trim().min(2, "Enter the company name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(120),
  phone: z.string().trim().max(20),
  enquiryType: z.enum(["product", "domestic", "export", "other"]),
  message: z.string().trim().min(10, "Write a short message.").max(2000),
  honeypot: z.string().max(0),
  idempotencyKey: z.string().uuid(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
