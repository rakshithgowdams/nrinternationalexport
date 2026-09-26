import assert from "node:assert/strict";
import test from "node:test";
import { filterProducts } from "../lib/catalogue.ts";

test("search aliases find tomato, ragi and tender coconut", () => {
  assert.equal(filterProducts({ q: "tamato" }).length, 1);
  assert.equal(filterProducts({ q: "finger millet" })[0]?.id, "ragi");
  assert.equal(filterProducts({ q: "thunder" })[0]?.id, "tender-coconuts");
});

test("market and category filters combine", () => {
  const globalGrains = filterProducts({ market: "global", category: "grains" }).map((item) => item.id);
  assert.deepEqual(globalGrains.sort(), ["maize", "ragi"]);
  const domesticCoconuts = filterProducts({ market: "domestic", category: "coconuts" });
  assert.ok(domesticCoconuts.every((item) => item.markets.includes("domestic")));
  assert.equal(filterProducts({ category: "field" }).some((item) => item.id === "coconut-oil"), false);
});

test("unknown filters are ignored", () => {
  assert.equal(filterProducts({ category: "nope", market: "mars" }).length, 15);
});
