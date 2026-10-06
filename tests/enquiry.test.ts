import assert from "node:assert/strict";
import test from "node:test";
import { products, productsForMarket, getProduct } from "../data/products.ts";
import { lineSchema } from "../lib/schemas.ts";

test("catalogue product IDs are valid and do not contain semi-husked or thambulam", () => {
  const ids = products.map((p) => p.id);
  assert.equal(ids.includes("semi-husked-coconuts"), false);
  assert.equal(getProduct("semi-husked-coconuts"), undefined);
  assert.equal(ids.includes("thambulam-coconuts"), false);
  assert.equal(getProduct("thambulam-coconuts"), undefined);
});

test("stale enquiry items are filtered out generically", () => {
  const validProductIds = new Set(products.map((p) => p.id));
  const rawSavedItems = [
    { productId: "tender-coconuts", grade: "", quantity: 100, unit: "pieces", otherUnit: "" },
    { productId: "semi-husked-coconuts", grade: "Grade A", quantity: 50, unit: "bags", otherUnit: "" },
    { productId: "thambulam-coconuts", grade: "", quantity: 200, unit: "pieces", otherUnit: "" },
    { productId: "tomatoes", grade: "", quantity: 500, unit: "kg", otherUnit: "" },
    { productId: "non-existent-product", grade: "", quantity: 1, unit: "kg", otherUnit: "" },
    { productId: "copra", grade: "Milling Copra", quantity: 2, unit: "metric tons", otherUnit: "" },
  ];

  const sanitized = rawSavedItems.filter(
    (item) => item && typeof item.productId === "string" && validProductIds.has(item.productId),
  );

  assert.equal(sanitized.length, 3);
  assert.deepEqual(
    sanitized.map((item) => item.productId),
    ["tender-coconuts", "tomatoes", "copra"],
  );
});

test("dropdown availableProducts excludes duplicate products already in enquiry", () => {
  const market = "global";
  const marketProducts = productsForMarket(market);
  const existingLines = [
    { productId: "fresh-coconuts", grade: "", quantity: 1, unit: "nuts", otherUnit: "" },
  ];

  const availableProducts = marketProducts.filter(
    (product) => !existingLines.some((line) => line.productId === product.id),
  );

  assert.equal(availableProducts.some((p) => p.id === "fresh-coconuts"), false);
  assert.ok(availableProducts.length > 0);
  assert.ok(availableProducts.every((p) => p.markets.includes("global")));
});

test("lineSchema rejects unknown/deleted product ID", () => {
  const invalidLine = {
    productId: "semi-husked-coconuts",
    grade: "Grade A",
    quantity: 10,
    unit: "bags",
    otherUnit: "",
  };
  const result = lineSchema.safeParse(invalidLine);
  assert.equal(result.success, false);

  const thambulamLine = {
    productId: "thambulam-coconuts",
    grade: "",
    quantity: 100,
    unit: "pieces",
    otherUnit: "",
  };
  const thambulamResult = lineSchema.safeParse(thambulamLine);
  assert.equal(thambulamResult.success, false);
});

test("contactSchema validates valid submission with optional fields", async () => {
  const { contactSchema } = await import("../lib/schemas.ts");
  const valid = {
    name: "Rahul Kumar",
    company: "Agri World Imports",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    enquiryType: "product",
    message: "Enquiry regarding bulk coconut export.",
    website: "",
    honeypot: "",
  };
  const result = contactSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test("contactSchema succeeds without optional company and phone", async () => {
  const { contactSchema } = await import("../lib/schemas.ts");
  const valid = {
    name: "Rahul Kumar",
    company: "",
    email: "rahul@example.com",
    phone: "",
    enquiryType: "export",
    message: "Short question about shipping grades.",
    website: "",
    honeypot: "",
  };
  const result = contactSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test("contactSchema rejects invalid email, short name, and short message", async () => {
  const { contactSchema } = await import("../lib/schemas.ts");
  const invalid = {
    name: "A",
    company: "",
    email: "bad-email",
    phone: "",
    enquiryType: "other",
    message: "too short",
    website: "",
    honeypot: "",
  };
  const result = contactSchema.safeParse(invalid);
  assert.equal(result.success, false);
  if (!result.success) {
    const fields = result.error.issues.map((i) => i.path[0]);
    assert.ok(fields.includes("name"));
    assert.ok(fields.includes("email"));
    assert.ok(fields.includes("message"));
  }
});

