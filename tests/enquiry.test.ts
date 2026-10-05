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
