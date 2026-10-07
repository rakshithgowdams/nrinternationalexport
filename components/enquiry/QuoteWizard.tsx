"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { business } from "@/data/business";
import {
  getProduct,
  marketLabel,
  productsForMarket,
  type Market,
} from "@/data/products";
import { lineSchema } from "@/lib/schemas";
import { cn, todayInKolkata } from "@/lib/utils";
import { useEnquiry, type EnquiryLine } from "@/components/enquiry/EnquiryProvider";

type Values = {
  market: Market | "";
  lines: EnquiryLine[];
  country: string;
  city: string;
  postalCode: string;
  port: string;
  requestedDate: string;
  packing: string;
  requirements: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  contactPreference: "email" | "phone";
  privacy: boolean;
};

const empty: Values = {
  market: "",
  lines: [],
  country: "",
  city: "",
  postalCode: "",
  port: "",
  requestedDate: "",
  packing: "",
  requirements: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  contactPreference: "email",
  privacy: false,
};

type Status = "idle" | "sending" | "success" | "unavailable" | "error";

export function QuoteWizard() {
  const search = useSearchParams();
  const enquiry = useEnquiry();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const initialized = useRef(false);
  const key = useRef(crypto.randomUUID());

  const { ready: enquiryReady, lines: enquiryLines, replaceLines: enquiryReplaceLines } = enquiry;

  const requestedProductParam = search.get("product") ?? "";
  const unknown = Boolean(requestedProductParam && !getProduct(requestedProductParam));

  useEffect(() => {
    if (!enquiryReady || initialized.current) return;
    initialized.current = true;

    const requested = search.get("product") ?? "";
    const marketParam = search.get("market");
    const validMarketParam =
      marketParam === "global" || marketParam === "domestic" ? (marketParam as Market) : null;

    // Entry with specific product (e.g. from Product Detail page)
    if (requested) {
      const product = getProduct(requested);
      if (product) {
        const targetMarket: Market =
          validMarketParam && product.markets.includes(validMarketParam)
            ? validMarketParam
            : product.markets[0];

        const existingLine = enquiryLines.find((l) => l.productId === product.id);
        const initialLine: EnquiryLine = existingLine ?? {
          productId: product.id,
          grade: product.forms?.[0]?.label ?? product.grades?.[0]?.name ?? "",
          quantity: 1,
          unit: product.units[0],
          otherUnit: "",
        };

        const otherCompatibleLines = enquiryLines.filter((l) => {
          if (l.productId === product.id) return false;
          const p = getProduct(l.productId);
          return p && p.markets.includes(targetMarket);
        });

        const initialLines = [initialLine, ...otherCompatibleLines];

        setValues((current) => ({
          ...current,
          market: targetMarket,
          lines: initialLines,
          country: targetMarket === "domestic" ? "India" : "",
        }));

        enquiryReplaceLines(initialLines);
        return;
      }
    }

    // Entry with explicit market parameter (e.g. from market-specific CTA)
    if (validMarketParam) {
      const compatibleLines = enquiryLines.filter((l) => {
        const p = getProduct(l.productId);
        return p && p.markets.includes(validMarketParam);
      });

      setValues((current) => ({
        ...current,
        market: validMarketParam,
        lines: compatibleLines,
        country: validMarketParam === "domestic" ? "India" : "",
      }));

      enquiryReplaceLines(compatibleLines);
      return;
    }

    // Direct visit to /request-quote:
    // Initial state: market = "", lines = [], summary = "No products yet", continue disabled
    setValues(empty);
    enquiryReplaceLines([]);
  }, [enquiryReady, search, enquiryLines, enquiryReplaceLines]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function patch(partial: Partial<Values>) {
    setValues((current) => ({ ...current, ...partial }));
  }

  function handleMarketChange(nextMarket: Values["market"]) {
    if (nextMarket === values.market) return;

    const hadProducts = values.lines.length > 0;

    // 1. Immediately reset enquiry lines in context and localStorage
    enquiryReplaceLines([]);

    // 2. Clear line-specific and market validation errors
    setErrors((prev) => {
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(prev)) {
        if (!k.startsWith("lines") && k !== "market") {
          next[k] = v;
        }
      }
      return next;
    });

    // 3. Clear market-dependent delivery fields
    let nextCountry = values.country;
    let nextPort = values.port;
    if (nextMarket === "domestic") {
      nextCountry = "India";
      nextPort = "";
    } else if (nextMarket === "global") {
      if (nextCountry === "India") {
        nextCountry = "";
      }
    } else {
      if (nextCountry === "India") {
        nextCountry = "";
      }
      nextPort = "";
    }

    // 4. Update wizard values
    setValues((current) => ({
      ...current,
      market: nextMarket,
      lines: [],
      country: nextCountry,
      port: nextPort,
    }));

    setSelectedProductId("");

    // 5. Notify user if products were cleared
    if (hadProducts && nextMarket) {
      toast("Market changed. Product selections were cleared.");
    }
  }

  function addProduct(productId: string) {
    if (!values.market) return;
    const product = getProduct(productId);
    if (!product || !product.markets.includes(values.market as Market)) return;

    // Prevent duplicate product selection
    if (values.lines.some((l) => l.productId === product.id)) return;

    const line: EnquiryLine = {
      productId: product.id,
      grade: product.forms?.[0]?.label ?? product.grades?.[0]?.name ?? "",
      quantity: 1,
      unit: product.units[0],
      otherUnit: "",
    };

    const nextLines = [...values.lines, line];
    setValues((current) => ({ ...current, lines: nextLines }));
    enquiryReplaceLines(nextLines);

    // Clear line errors
    setErrors((prev) => {
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(prev)) {
        if (!k.startsWith("lines") && k !== "market") {
          next[k] = v;
        }
      }
      return next;
    });
  }

  function removeLine(index: number) {
    const nextLines = values.lines.filter((_, lineIndex) => lineIndex !== index);
    setValues((current) => ({ ...current, lines: nextLines }));
    enquiryReplaceLines(nextLines);

    setErrors((prev) => {
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(prev)) {
        if (!k.startsWith(`lines.${index}`)) {
          next[k] = v;
        }
      }
      return next;
    });
  }

  function setLine(index: number, partial: Partial<EnquiryLine>) {
    const nextLines = values.lines.map((line, lineIndex) =>
      lineIndex === index ? { ...line, ...partial } : line
    );
    setValues((current) => ({ ...current, lines: nextLines }));
    enquiryReplaceLines(nextLines);

    if (partial.quantity && partial.quantity > 0) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[`lines.${index}.quantity`];
        return copy;
      });
    }
    if (partial.otherUnit && partial.otherUnit.trim().length >= 2) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[`lines.${index}.otherUnit`];
        return copy;
      });
    }
  }

  function handleProductChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const productId = event.target.value;
    if (!productId) return;
    addProduct(productId);
    setSelectedProductId("");
  }

  function validate(currentStep: number) {
    const next: Record<string, string> = {};
    if (currentStep === 1) {
      if (values.market !== "global" && values.market !== "domestic") {
        next.market = "Choose global export or domestic supply.";
      }
      if (values.lines.length === 0) {
        next.lines = "Add at least one product.";
      }
      values.lines.forEach((line, index) => {
        const parsed = lineSchema.safeParse(line);
        if (!parsed.success) {
          parsed.error.issues.forEach((issue) => {
            next[`lines.${index}.${String(issue.path[0] ?? "productId")}`] = issue.message;
          });
        }
        const product = getProduct(line.productId);
        if (!product) {
          next[`lines.${index}.productId`] = "Choose a valid product from the catalogue.";
        } else if (
          (values.market === "global" || values.market === "domestic") &&
          !product.markets.includes(values.market as Market)
        ) {
          next[`lines.${index}.productId`] = `${product.name} is not listed for ${marketLabel[values.market as Market]}.`;
        }
      });
    }
    if (currentStep === 2) {
      if (values.market === "global" && values.country.trim().length < 2) {
        next.country = "Enter the destination country.";
      }
      if (values.city.trim().length < 2) {
        next.city = values.market === "domestic" ? "Enter the state, city or town." : "Enter the city or town.";
      }
      if (values.market === "domestic" && values.postalCode.trim().length < 4) {
        next.postalCode = "Enter the postal code.";
      }
      if (values.requestedDate && values.requestedDate < todayInKolkata()) {
        next.requestedDate = "Choose today or a later date in India Standard Time.";
      }
    }
    if (currentStep === 3) {
      if (values.name.trim().length < 2) next.name = "Enter your name.";
      if (values.company.trim().length < 2) next.company = "Enter the company name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        next.email = "Enter a valid email address.";
      }
      if (values.phone.trim().length < 6) next.phone = "Enter a phone number.";
      if (!values.privacy) next.privacy = "Please acknowledge the privacy notice.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (validate(step)) setStep((current) => Math.min(3, current + 1));
  }

  async function submit() {
    if (!validate(1) || !validate(2) || !validate(3)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const payload = {
      ...values,
      honeypot: "",
      idempotencyKey: key.current,
    };
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { status?: string; message?: string };
      if (data.status === "accepted") {
        setStatus("success");
        return;
      }
      if (data.status === "unavailable" || response.status === 503) {
        setStatus("unavailable");
        return;
      }
      setStatus("error");
      if (data.message) setErrors({ form: data.message });
    } catch {
      setStatus("error");
      setErrors({ form: "The request was not sent." });
    }
  }

  const text = enquiryText(values);
  const mailto = `mailto:${business.enquiryEmail}?subject=${encodeURIComponent(`Quote enquiry from ${values.company || "buyer"}`)}&body=${encodeURIComponent(text)}`;

  if (status === "success") {
    return (
      <div role="status" className="rise-in rounded-lg border border-line bg-white p-6 sm:p-8">
        <h2 className="font-display text-3xl sm:text-4xl text-forest font-semibold">
          Quotation request accepted
        </h2>
        <p className="mt-3 max-w-2xl text-muted leading-relaxed">
          The server accepted this request for delivery through the configured mail service. That confirms acceptance by the service, not that the message has been read.
        </p>
      </div>
    );
  }

  // Derived product eligibility based strictly on selected Market
  const eligibleProducts = !values.market
    ? []
    : productsForMarket(values.market as Market);

  const availableProducts = eligibleProducts.filter(
    (product) => !values.lines.some((line) => line.productId === product.id)
  );

  const isProductSelectDisabled = !values.market || availableProducts.length === 0;

  // Real-time prerequisite validation for Step advancement
  const isStep1Valid =
    (values.market === "global" || values.market === "domestic") &&
    values.lines.length > 0 &&
    values.lines.every((line) => {
      const product = getProduct(line.productId);
      return (
        product &&
        product.markets.includes(values.market as Market) &&
        line.quantity > 0 &&
        Number.isFinite(line.quantity) &&
        (line.unit !== "other" || line.otherUnit.trim().length >= 2)
      );
    });

  const isStep2Valid =
    (values.market === "global" ? values.country.trim().length >= 2 : true) &&
    values.city.trim().length >= 2 &&
    (values.market === "domestic" ? values.postalCode.trim().length >= 4 : true) &&
    (!values.requestedDate || values.requestedDate >= todayInKolkata());

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        {/* Step Navigation Bar */}
        <ol aria-label="Quotation steps" className="grid grid-cols-3 gap-2 text-sm">
          {["Requirement", "Delivery", "Buyer"].map((label, index) => {
            const stepNumber = index + 1;
            const isCurrent = step === stepNumber;
            const canNavigate =
              stepNumber < step ||
              (stepNumber === 2 && isStep1Valid) ||
              (stepNumber === 3 && isStep1Valid && isStep2Valid);

            return (
              <li key={label}>
                <button
                  type="button"
                  disabled={!canNavigate && !isCurrent}
                  onClick={() => {
                    if (stepNumber < step) {
                      setStep(stepNumber);
                    } else if (stepNumber === 2 && validate(1)) {
                      setStep(2);
                    } else if (stepNumber === 3 && validate(1) && validate(2)) {
                      setStep(3);
                    }
                  }}
                  className={cn(
                    "min-h-11 w-full rounded-md border px-2 text-center transition-colors text-xs sm:text-sm",
                    isCurrent
                      ? "border-olive bg-white font-semibold text-olive shadow-xs"
                      : canNavigate
                      ? "border-line bg-white/80 hover:bg-white text-ink"
                      : "border-line/40 bg-ivory/50 text-muted/50 cursor-not-allowed"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {stepNumber}. {label}
                </button>
              </li>
            );
          })}
        </ol>

        {unknown ? (
          <p className="mt-4 rounded-md border border-line bg-white p-3 text-sm text-muted" role="status">
            That product link was not recognised. Choose a market and product below.
          </p>
        ) : null}

        {errors.form ? (
          <p role="alert" className="fade-in mt-4 text-sm font-medium text-red-800">
            {errors.form}
          </p>
        ) : null}

        <div key={step} className="rise-in">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mt-6 font-display text-3xl sm:text-4xl text-ink font-medium outline-none"
          >
            {step === 1
              ? "What do you need?"
              : step === 2
              ? "Where should it go?"
              : "How should we reply?"}
          </h2>

          {/* =========================================================================
              STEP 1: REQUIREMENT (MARKET & ELIGIBLE PRODUCTS)
              ========================================================================= */}
          {step === 1 ? (
            <div className="mt-5 space-y-5">
              {/* Market Selection */}
              <div>
                <label className="block text-sm font-semibold text-ink" htmlFor="market-select">
                  Market
                  <select
                    id="market-select"
                    className="field mt-1.5"
                    value={values.market}
                    onChange={(event) =>
                      handleMarketChange(event.target.value as Values["market"])
                    }
                  >
                    <option value="">Choose</option>
                    <option value="global">Global Export</option>
                    <option value="domestic">Domestic Supply</option>
                  </select>
                </label>
                {errors.market ? (
                  <p className="mt-1 text-sm font-medium text-red-800">{errors.market}</p>
                ) : null}
              </div>

              {/* Informational prompt when no market chosen */}
              {!values.market ? (
                <p className="rounded-md border border-line bg-white/60 p-3.5 text-xs sm:text-sm text-muted">
                  Please select <strong className="text-ink">Global Export</strong> for international trade or{" "}
                  <strong className="text-ink">Domestic Supply</strong> for delivery within India to view eligible products.
                </p>
              ) : null}

              {/* Product Selection */}
              <div>
                <label className="block text-sm font-semibold text-ink" htmlFor="product-select">
                  Add a product
                  <select
                    id="product-select"
                    className={cn(
                      "field mt-1.5",
                      isProductSelectDisabled &&
                        "bg-ivory/60 text-muted/60 border-line/60 cursor-not-allowed"
                    )}
                    value={selectedProductId}
                    onChange={handleProductChange}
                    disabled={isProductSelectDisabled}
                  >
                    <option value="">
                      {!values.market
                        ? "Choose a market first"
                        : availableProducts.length === 0
                        ? "All available products added"
                        : "Select a product"}
                    </option>
                    {availableProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>
                {errors.lines ? (
                  <p className="mt-1 text-sm font-medium text-red-800">{errors.lines}</p>
                ) : null}
              </div>

              {/* Selected Product Cards */}
              {values.lines.length > 0 ? (
                <ul className="space-y-3 pt-1">
                  {values.lines.map((line, index) => {
                    const product = getProduct(line.productId);
                    const hasFormsOrGrades = Boolean(
                      (product?.grades && product.grades.length > 0) ||
                      (product?.forms && product.forms.length > 0)
                    );

                    return (
                      <li
                        key={`${line.productId}-${index}`}
                        className="rounded-lg border border-line bg-white p-4 sm:p-5 shadow-xs"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-ink text-base">
                            {product?.name ?? "Product"}
                          </p>
                          <button
                            type="button"
                            className="text-xs sm:text-sm font-semibold text-olive hover:text-forest transition-colors"
                            onClick={() => removeLine(index)}
                          >
                            Remove
                          </button>
                        </div>

                        {errors[`lines.${index}.productId`] ? (
                          <p className="mt-1 text-sm font-medium text-red-800">
                            {errors[`lines.${index}.productId`]}
                          </p>
                        ) : null}

                        {/* Grade or Form Selector (only if product supports it) */}
                        {hasFormsOrGrades ? (
                          <label className="mt-3 block text-sm font-semibold text-ink">
                            Grade or form
                            <select
                              className="field mt-1"
                              value={line.grade}
                              onChange={(event) =>
                                setLine(index, { grade: event.target.value })
                              }
                            >
                              {(
                                product?.grades?.map((grade) => grade.name) ??
                                product?.forms?.map((form) => form.label) ??
                                []
                              ).map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </label>
                        ) : null}

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <label className="text-sm font-semibold text-ink">
                            Quantity
                            <input
                              className={cn(
                                "field mt-1",
                                errors[`lines.${index}.quantity`] &&
                                  "border-red-600 focus:border-red-600"
                              )}
                              type="number"
                              min="1"
                              step="any"
                              inputMode="decimal"
                              value={line.quantity === 0 ? "" : line.quantity}
                              onChange={(event) => {
                                const val = event.target.value;
                                const num = Number(val);
                                setLine(index, {
                                  quantity: val === "" ? 0 : isNaN(num) ? 0 : num,
                                });
                              }}
                            />
                          </label>
                          <label className="text-sm font-semibold text-ink">
                            Unit
                            <select
                              className="field mt-1"
                              value={line.unit}
                              onChange={(event) =>
                                setLine(index, { unit: event.target.value })
                              }
                            >
                              {product?.units.map((unit) => (
                                <option key={unit} value={unit}>
                                  {unit}
                                </option>
                              ))}
                              <option value="other">other</option>
                            </select>
                          </label>
                        </div>

                        {line.unit === "other" ? (
                          <label className="mt-3 block text-sm font-semibold text-ink">
                            Describe the unit
                            <input
                              className={cn(
                                "field mt-1",
                                errors[`lines.${index}.otherUnit`] &&
                                  "border-red-600 focus:border-red-600"
                              )}
                              value={line.otherUnit}
                              onChange={(event) =>
                                setLine(index, { otherUnit: event.target.value })
                              }
                              placeholder="e.g. 50kg bags, crates, boxes"
                            />
                          </label>
                        ) : null}

                        {errors[`lines.${index}.quantity`] ? (
                          <p className="mt-1 text-sm font-medium text-red-800">
                            {errors[`lines.${index}.quantity`]}
                          </p>
                        ) : null}
                        {errors[`lines.${index}.unit`] || errors[`lines.${index}.otherUnit`] ? (
                          <p className="mt-1 text-sm font-medium text-red-800">
                            {errors[`lines.${index}.unit`] || errors[`lines.${index}.otherUnit`]}
                          </p>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              ) : values.market ? (
                <div className="rounded-lg border border-dashed border-line bg-white/40 p-5 text-center text-sm text-muted">
                  No products selected yet. Add a product from the dropdown above.
                </div>
              ) : null}
            </div>
          ) : null}

          {/* =========================================================================
              STEP 2: DELIVERY (MARKET-AWARE)
              ========================================================================= */}
          {step === 2 ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {values.market === "global" ? (
                <Field label="Destination country" error={errors.country}>
                  <input
                    className="field"
                    value={values.country}
                    onChange={(event) => patch({ country: event.target.value })}
                    placeholder="e.g. United Arab Emirates, United Kingdom"
                  />
                </Field>
              ) : null}

              <Field
                label={values.market === "domestic" ? "State, city or town" : "City or town"}
                error={errors.city}
              >
                <input
                  className="field"
                  value={values.city}
                  onChange={(event) => patch({ city: event.target.value })}
                  placeholder={
                    values.market === "domestic"
                      ? "e.g. Bengaluru, Karnataka"
                      : "e.g. Dubai, London"
                  }
                />
              </Field>

              <Field
                label={values.market === "domestic" ? "Postal code (PIN)" : "Postal code (optional)"}
                error={errors.postalCode}
              >
                <input
                  className="field"
                  value={values.postalCode}
                  onChange={(event) => patch({ postalCode: event.target.value })}
                  placeholder={values.market === "domestic" ? "e.g. 560001" : "e.g. SW1A 1AA"}
                />
              </Field>

              {values.market === "global" ? (
                <Field label="Port / seaport / airport (optional)" error={errors.port}>
                  <input
                    className="field"
                    value={values.port}
                    onChange={(event) => patch({ port: event.target.value })}
                    placeholder="e.g. Jebel Ali, Rotterdam, London Gateway"
                  />
                </Field>
              ) : null}

              <Field label="Requested date (optional)" error={errors.requestedDate}>
                <input
                  className="field"
                  type="date"
                  min={todayInKolkata()}
                  value={values.requestedDate}
                  onChange={(event) => patch({ requestedDate: event.target.value })}
                />
              </Field>

              <Field label="Packing preference" error={errors.packing} className="sm:col-span-2">
                <input
                  className="field"
                  value={values.packing}
                  onChange={(event) => patch({ packing: event.target.value })}
                  placeholder="e.g. 25kg PP bags, 50kg jute bags, corrugated boxes"
                />
              </Field>

              <Field label="Other requirements" error={errors.requirements} className="sm:col-span-2">
                <textarea
                  className="field min-h-28"
                  value={values.requirements}
                  onChange={(event) => patch({ requirements: event.target.value })}
                  placeholder="Provide any additional specifications, target delivery schedules or inspection preferences."
                />
              </Field>
              <p className="text-xs text-muted sm:col-span-2">
                A requested date or packing preference is discussed as part of the quotation, not a guaranteed booking.
              </p>
            </div>
          ) : null}

          {/* =========================================================================
              STEP 3: BUYER (MARKET-INDEPENDENT)
              ========================================================================= */}
          {step === 3 ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input
                  className="field"
                  value={values.name}
                  onChange={(event) => patch({ name: event.target.value })}
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Company" error={errors.company}>
                <input
                  className="field"
                  value={values.company}
                  onChange={(event) => patch({ company: event.target.value })}
                  placeholder="Your company or trading enterprise"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  className="field"
                  type="email"
                  value={values.email}
                  onChange={(event) => patch({ email: event.target.value })}
                  placeholder="name@company.com"
                />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input
                  className="field"
                  value={values.phone}
                  onChange={(event) => patch({ phone: event.target.value })}
                  placeholder="+91 98765 43210"
                />
              </Field>
              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-semibold text-ink">Preferred contact</legend>
                <div className="mt-1.5 flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                    <input
                      type="radio"
                      name="contact"
                      checked={values.contactPreference === "email"}
                      onChange={() => patch({ contactPreference: "email" })}
                    />
                    <span>Email</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                    <input
                      type="radio"
                      name="contact"
                      checked={values.contactPreference === "phone"}
                      onChange={() => patch({ contactPreference: "phone" })}
                    />
                    <span>Phone</span>
                  </label>
                </div>
              </fieldset>
              <label className="flex items-start gap-2 text-sm sm:col-span-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={values.privacy}
                  onChange={(event) => patch({ privacy: event.target.checked })}
                />
                <span className="text-muted leading-relaxed">
                  I understand this information is used to reply to the quotation request. See our{" "}
                  <a className="underline text-olive hover:text-forest" href="/privacy-policy">
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a className="underline text-olive hover:text-forest" href="/our-policy">
                    our policy
                  </a>
                  .
                </span>
              </label>
              {errors.privacy ? (
                <p className="text-sm font-medium text-red-800 sm:col-span-2">{errors.privacy}</p>
              ) : null}
            </div>
          ) : null}
        </div>

        {status === "unavailable" ? (
          <div role="status" className="fade-in mt-6 rounded-md border border-line bg-white p-4 text-sm">
            <p>Email delivery is not configured, so this form did not send the quotation.</p>
            {copied ? <p className="mt-2 font-semibold">Enquiry copied.</p> : null}
            <div className="mt-3 flex flex-wrap gap-2">
              <a className="inline-flex min-h-11 items-center rounded-md bg-olive px-4 font-semibold text-white" href={mailto}>
                Send by email
              </a>
              <button
                type="button"
                className="inline-flex min-h-11 items-center rounded-md border border-olive px-4 font-semibold text-olive"
                onClick={async () => {
                  await navigator.clipboard.writeText(text);
                  setCopied(true);
                  toast("Enquiry copied");
                }}
              >
                Copy enquiry
              </button>
              <button
                type="button"
                className="inline-flex min-h-11 items-center px-3 font-semibold text-ink"
                onClick={() => {
                  key.current = crypto.randomUUID();
                  setStatus("idle");
                }}
              >
                Edit and try again
              </button>
            </div>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {step > 1 ? (
            <button
              type="button"
              className="min-h-11 rounded-md border border-olive px-5 text-sm font-semibold text-olive hover:bg-ivory transition-colors"
              onClick={() => setStep((current) => current - 1)}
            >
              Back
            </button>
          ) : null}
          {step < 3 ? (
            <button
              type="button"
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              className="min-h-11 rounded-md bg-olive px-6 text-sm font-semibold text-white transition-colors hover:bg-forest disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={goNext}
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              disabled={status === "sending"}
              className="min-h-11 rounded-md bg-olive px-6 text-sm font-semibold text-white transition-colors hover:bg-forest disabled:opacity-50"
              onClick={submit}
            >
              {status === "sending" ? "Sending…" : "Submit quotation request"}
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          SUMMARY SIDEBAR (ALWAYS SYNCHRONIZED)
          ========================================================================= */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        {/* Mobile toggle button */}
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg border border-line bg-white px-4 py-3 text-left lg:hidden shadow-xs"
          onClick={() => setOpenSummary((open) => !open)}
        >
          <span className="font-semibold text-ink">
            Summary ({values.lines.length} {values.lines.length === 1 ? "product" : "products"})
          </span>
          <span className="text-xs font-semibold text-olive">
            {openSummary ? "Hide" : "Show"}
          </span>
        </button>

        {/* Summary Card */}
        <div
          className={cn(
            "rounded-lg border border-line bg-white p-5 shadow-xs mt-3 lg:mt-0",
            openSummary ? "block" : "hidden lg:block"
          )}
        >
          <h2 className="font-display text-2xl text-ink font-semibold">Summary</h2>
          {values.market ? (
            <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-ochre-ink font-mono">
              {marketLabel[values.market as Market]}
            </p>
          ) : null}

          <div className="mt-3.5 border-t border-line pt-3">
            {values.lines.length === 0 ? (
              <p className="text-sm text-muted">
                {values.market ? "No products selected yet." : "No products yet."}
              </p>
            ) : (
              <ul className="space-y-3 text-sm">
                {values.lines.map((line, index) => {
                  const product = getProduct(line.productId);
                  const unitDisplay = line.unit === "other" ? line.otherUnit || "other" : line.unit;
                  return (
                    <li
                      key={`${line.productId}-${index}`}
                      className="border-b border-line/60 pb-2.5 last:border-b-0 last:pb-0"
                    >
                      <p className="font-semibold text-ink">{product?.name ?? line.productId}</p>
                      <p className="text-xs text-muted mt-0.5">
                        {line.quantity} {unitDisplay}
                        {line.grade ? ` · ${line.grade}` : ""}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block text-sm font-semibold text-ink", className)}>
      {label}
      <div className="mt-1.5 font-normal">{children}</div>
      {error ? <span className="mt-1 block font-normal text-xs text-red-800">{error}</span> : null}
    </label>
  );
}

function enquiryText(values: Values) {
  const lines = values.lines.map((line) => {
    const name = getProduct(line.productId)?.name ?? line.productId;
    const unit = line.unit === "other" ? line.otherUnit : line.unit;
    return `- ${name}: ${line.quantity} ${unit}${line.grade ? ` (${line.grade})` : ""}`;
  });
  return [
    `Market: ${values.market ? marketLabel[values.market as Market] : "Not specified"}`,
    ...lines,
    `Country: ${values.country || "Not provided"}`,
    `City: ${values.city}`,
    `Postal code: ${values.postalCode || "Not provided"}`,
    `Port: ${values.port || "Not provided"}`,
    `Requested date: ${values.requestedDate || "Not provided"}`,
    `Packing: ${values.packing || "Not provided"}`,
    `Requirements: ${values.requirements || "Not provided"}`,
    `Name: ${values.name}`,
    `Company: ${values.company}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Contact preference: ${values.contactPreference}`,
  ].join("\n");
}
