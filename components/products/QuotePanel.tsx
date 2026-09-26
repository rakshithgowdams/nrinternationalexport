"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { marketLabel, type Product } from "@/data/products";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { quoteHref } from "@/lib/catalogue";

export function QuotePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addLine } = useEnquiry();
  const [grade, setGrade] = useState(product.grades?.[0]?.name ?? product.forms?.[0]?.label ?? "");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(product.units[0]);
  const [otherUnit, setOtherUnit] = useState("");
  const [error, setError] = useState("");
  const [hideBar, setHideBar] = useState(false);
  const market = product.markets[0];

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHideBar(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  function submit() {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      setError("Enter a quantity greater than zero.");
      return;
    }
    if (unit === "other" && otherUnit.trim().length < 2) {
      setError("Describe the unit.");
      return;
    }
    addLine({
      productId: product.id,
      grade,
      quantity,
      unit,
      otherUnit: unit === "other" ? otherUnit.trim() : "",
    });
    router.push(quoteHref({ productId: product.id, market }));
  }

  const fields = (
    <div className="space-y-3">
      {product.grades ? (
        <label className="block text-sm font-semibold">
          Grade preference
          <select className="mt-1 h-11 w-full rounded-md border border-line bg-white px-3" value={grade} onChange={(event) => setGrade(event.target.value)}>
            {product.grades.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </label>
      ) : null}
      {product.forms ? (
        <label className="block text-sm font-semibold">
          Form
          <select className="mt-1 h-11 w-full rounded-md border border-line bg-white px-3" value={grade} onChange={(event) => setGrade(event.target.value)}>
            {product.forms.map((item) => (
              <option key={item.id}>{item.label}</option>
            ))}
          </select>
        </label>
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold">
          Quantity
          <input
            className="mt-1 h-11 w-full rounded-md border border-line px-3"
            inputMode="decimal"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
        </label>
        <label className="block text-sm font-semibold">
          Unit
          <select className="mt-1 h-11 w-full rounded-md border border-line bg-white px-3" value={unit} onChange={(event) => setUnit(event.target.value)}>
            {product.units.map((item) => (
              <option key={item}>{item}</option>
            ))}
            <option value="other">other</option>
          </select>
        </label>
      </div>
      {unit === "other" ? (
        <label className="block text-sm font-semibold">
          Describe the unit
          <input className="mt-1 h-11 w-full rounded-md border border-line px-3" value={otherUnit} onChange={(event) => setOtherUnit(event.target.value)} />
        </label>
      ) : null}
      {error ? <p className="fade-in text-sm text-red-800" role="alert">{error}</p> : null}
      <button type="button" onClick={submit} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-olive text-sm font-semibold text-white hover:bg-forest">
        Request a Quote
      </button>
      <p className="text-xs leading-5 text-muted">
        Adds this product to your enquiry for {marketLabel[market]}. Pricing is confirmed only after the quotation.
      </p>
    </div>
  );

  return (
    <>
      <aside data-reveal id="enquire" className="scroll-mt-28 rounded-lg border border-line bg-white p-5 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl">Enquire about {product.name}</h2>
        <div className="mt-4">{fields}</div>
      </aside>
      <div className={`bar-up fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden ${hideBar ? "hidden" : ""}`}>
        <a href="#enquire" className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-olive text-sm font-semibold text-white">
          Request a Quote
        </a>
      </div>
      <div className="h-16 lg:hidden" />
    </>
  );
}
