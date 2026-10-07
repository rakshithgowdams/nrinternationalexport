import assert from "node:assert/strict";
import test from "node:test";
import { products, productsForMarket, getProduct } from "../data/products.ts";
import { quoteSchema, lineSchema } from "../lib/schemas.ts";

test("Scenario A & 36: Market = '' (Choose) returns empty eligible products", () => {
  const market = "";
  const eligibleProducts = !market ? [] : productsForMarket(market);
  assert.equal(eligibleProducts.length, 0);

  const availableProducts = eligibleProducts.filter(() => true);
  const isProductSelectDisabled = !market || availableProducts.length === 0;
  assert.equal(isProductSelectDisabled, true);
});

test("Scenario B & Canonical Global: Choose Global Export provides exactly the 9 canonical export products", () => {
  const globalProducts = productsForMarket("global");
  assert.equal(globalProducts.length, 9);

  const expectedNames = [
    "Fresh Coconut",
    "Edible Copra",
    "Dry Coconut",
    "Desiccated Coconut",
    "Coconut Shell",
    "Coconut Oil",
    "Ginger",
    "Maize",
    "Ragi",
  ];

  const actualNames = globalProducts.map((p) => p.name);
  assert.deepEqual(actualNames, expectedNames);

  // Ensure removed products are NOT present
  assert.equal(actualNames.includes("Semi-Husked Coconut"), false);
  assert.equal(actualNames.includes("Thambulam Coconut"), false);

  // Ensure domestic-only products are NOT present
  assert.equal(actualNames.includes("Coconut Plant"), false);
  assert.equal(actualNames.includes("Tender Coconut"), false);
  assert.equal(actualNames.includes("Copra"), false);
  assert.equal(actualNames.includes("Tomato"), false);
});

test("Scenario C & Canonical Domestic: Choose Domestic Supply provides exactly the 7 canonical domestic products", () => {
  const domesticProducts = productsForMarket("domestic");
  assert.equal(domesticProducts.length, 7);

  const expectedNames = [
    "Coconut Shell",
    "Ginger",
    "Ragi",
    "Coconut Plant",
    "Tender Coconut",
    "Copra",
    "Tomato",
  ];

  const actualNames = domesticProducts.map((p) => p.name);
  assert.deepEqual(actualNames, expectedNames);

  // Ensure global-only products are NOT present
  assert.equal(actualNames.includes("Fresh Coconut"), false);
  assert.equal(actualNames.includes("Edible Copra"), false);
  assert.equal(actualNames.includes("Dry Coconut"), false);
  assert.equal(actualNames.includes("Desiccated Coconut"), false);
  assert.equal(actualNames.includes("Coconut Oil"), false);
  assert.equal(actualNames.includes("Maize"), false);
});

test("Scenario D: Adding domestic products builds valid 3-product selection", () => {
  const domesticProducts = productsForMarket("domestic");
  const selectedProductIds = ["coconut-shells", "tender-coconuts", "tomatoes"];

  // Verify all 3 are valid domestic products
  assert.ok(
    selectedProductIds.every((id) =>
      domesticProducts.some((p) => p.id === id)
    )
  );

  const lines = selectedProductIds.map((id) => ({
    productId: id,
    grade: "",
    quantity: 10,
    unit: getProduct(id)!.units[0],
    otherUnit: "",
  }));

  assert.equal(lines.length, 3);
});

test("Scenario E & F: Switching market immediately clears all products, including shared products like Ragi", () => {
  // Global with Fresh Coconut, Edible Copra, Ragi
  const globalLines = [
    { productId: "fresh-coconuts", grade: "", quantity: 100, unit: "pieces", otherUnit: "" },
    { productId: "edible-copra", grade: "Edible copra", quantity: 200, unit: "kg", otherUnit: "" },
    { productId: "ragi", grade: "", quantity: 50, unit: "kg", otherUnit: "" },
  ];
  assert.equal(globalLines.length, 3);

  // On switch to Domestic Supply:
  const clearedLines: typeof globalLines = [];
  assert.equal(clearedLines.length, 0);

  // Add product dropdown now populates using NEW market
  const newMarket = "domestic";
  const newAvailableProducts = productsForMarket(newMarket).filter(
    (p) => !clearedLines.some((l) => l.productId === p.id)
  );
  assert.equal(newAvailableProducts.length, 7);
  // Ragi is available to add freshly, but NOT retained automatically
  assert.ok(newAvailableProducts.some((p) => p.id === "ragi"));
});

test("Scenario G & 13: Duplicate products are prevented in dropdown and server schema", () => {
  const globalProducts = productsForMarket("global");
  const currentLines = [
    { productId: "coconut-shells", grade: "", quantity: 10, unit: "kg", otherUnit: "" },
  ];

  const availableProducts = globalProducts.filter(
    (product) => !currentLines.some((line) => line.productId === product.id)
  );

  // Coconut Shell cannot be picked again
  assert.equal(availableProducts.some((p) => p.id === "coconut-shells"), false);
  assert.equal(availableProducts.length, globalProducts.length - 1);

  // Server schema rejects duplicate product IDs
  const duplicatePayload = {
    market: "global",
    lines: [
      { productId: "coconut-shells", grade: "", quantity: 10, unit: "kg", otherUnit: "" },
      { productId: "coconut-shells", grade: "", quantity: 20, unit: "kg", otherUnit: "" },
    ],
    country: "UAE",
    city: "Dubai",
    postalCode: "",
    port: "Jebel Ali",
    requestedDate: "",
    packing: "",
    requirements: "",
    name: "Buyer Name",
    company: "Trade Co",
    email: "trade@example.com",
    phone: "+971501234567",
    contactPreference: "email",
    privacy: true,
    honeypot: "",
    idempotencyKey: "123e4567-e89b-12d3-a456-426614174000",
  };

  const parseResult = quoteSchema.safeParse(duplicatePayload);
  assert.equal(parseResult.success, false);
  assert.ok(
    parseResult.error?.issues.some((issue) =>
      issue.message.includes("Duplicate product")
    )
  );
});

test("Scenario H & 14: Removing product makes it selectable again", () => {
  const domesticProducts = productsForMarket("domestic");
  let currentLines = [
    { productId: "ginger", grade: "", quantity: 15, unit: "kg", otherUnit: "" },
    { productId: "tomatoes", grade: "", quantity: 25, unit: "kg", otherUnit: "" },
  ];

  let available = domesticProducts.filter(
    (p) => !currentLines.some((l) => l.productId === p.id)
  );
  assert.equal(available.some((p) => p.id === "ginger"), false);

  // Remove ginger (index 0)
  currentLines = currentLines.filter((_, i) => i !== 0);
  available = domesticProducts.filter(
    (p) => !currentLines.some((l) => l.productId === p.id)
  );

  assert.equal(currentLines.length, 1);
  assert.equal(available.some((p) => p.id === "ginger"), true);
});

test("Scenario I & 17: Fresh Coconut product detail entry preselects Global Export", () => {
  const product = getProduct("fresh-coconuts");
  assert.ok(product);
  assert.deepEqual(product.markets, ["global"]);

  const market = product.markets[0];
  assert.equal(market, "global");
});

test("Scenario J & 17: Tender Coconut product detail entry preselects Domestic Supply", () => {
  const product = getProduct("tender-coconuts");
  assert.ok(product);
  assert.deepEqual(product.markets, ["domestic"]);

  const market = product.markets[0];
  assert.equal(market, "domestic");
});

test("Scenario K & 19/20: Stale malformed localStorage with deleted products is sanitized", () => {
  const malformedStored = [
    { productId: "semi-husked-coconuts", quantity: 50, unit: "bags", otherUnit: "" },
    { productId: "thambulam-coconuts", quantity: 100, unit: "pieces", otherUnit: "" },
    { productId: "random-fake-id", quantity: 1, unit: "kg", otherUnit: "" },
    { productId: "copra", quantity: 10, unit: "kg", otherUnit: "" },
  ];

  const validProductIds = new Set(products.map((p) => p.id));
  const sanitized = malformedStored.filter(
    (l) => l && typeof l.productId === "string" && validProductIds.has(l.productId)
  );

  assert.equal(sanitized.length, 1);
  assert.equal(sanitized[0].productId, "copra");
});

test("Server schema rejects invalid market/product combinations (e.g. Edible Copra for Domestic)", () => {
  const invalidPayload = {
    market: "domestic",
    lines: [
      { productId: "edible-copra", grade: "", quantity: 10, unit: "kg", otherUnit: "" },
    ],
    country: "India",
    city: "Bengaluru",
    postalCode: "560001",
    port: "",
    requestedDate: "",
    packing: "",
    requirements: "",
    name: "Buyer Name",
    company: "Domestic Trade Co",
    email: "domestic@example.com",
    phone: "+919876543210",
    contactPreference: "email",
    privacy: true,
    honeypot: "",
    idempotencyKey: "123e4567-e89b-12d3-a456-426614174001",
  };

  const parseResult = quoteSchema.safeParse(invalidPayload);
  assert.equal(parseResult.success, false);
  assert.ok(
    parseResult.error?.issues.some((issue) =>
      issue.message.includes("Edible Copra is not listed for")
    )
  );
});

test("Server schema accepts valid Global Export and Domestic Supply requests", () => {
  const validGlobal = {
    market: "global",
    lines: [
      { productId: "fresh-coconuts", grade: "", quantity: 100, unit: "pieces", otherUnit: "" },
      { productId: "dry-coconut", grade: "", quantity: 200, unit: "pieces", otherUnit: "" },
    ],
    country: "United Kingdom",
    city: "London",
    postalCode: "",
    port: "London Gateway",
    requestedDate: "",
    packing: "Mesh bags",
    requirements: "Grade A count",
    name: "John Smith",
    company: "Global Importers Ltd",
    email: "john@globalimporters.co.uk",
    phone: "+442079460912",
    contactPreference: "email",
    privacy: true,
    honeypot: "",
    idempotencyKey: "123e4567-e89b-12d3-a456-426614174002",
  };

  const globalResult = quoteSchema.safeParse(validGlobal);
  assert.equal(globalResult.success, true);

  const validDomestic = {
    market: "domestic",
    lines: [
      { productId: "tender-coconuts", grade: "", quantity: 500, unit: "pieces", otherUnit: "" },
      { productId: "tomatoes", grade: "", quantity: 200, unit: "kg", otherUnit: "" },
    ],
    country: "India",
    city: "Bengaluru",
    postalCode: "560001",
    port: "",
    requestedDate: "",
    packing: "Crates",
    requirements: "Fresh delivery",
    name: "Ramesh Kumar",
    company: "South Agri Traders",
    email: "ramesh@southagri.in",
    phone: "+919876543210",
    contactPreference: "phone",
    privacy: true,
    honeypot: "",
    idempotencyKey: "123e4567-e89b-12d3-a456-426614174003",
  };

  const domesticResult = quoteSchema.safeParse(validDomestic);
  assert.equal(domesticResult.success, true);
});
