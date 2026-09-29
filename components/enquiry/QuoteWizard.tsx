"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { business } from "@/data/business";
import { getProduct, marketLabel, products, type Market } from "@/data/products";
import { lineSchema } from "@/lib/schemas";
import { todayInKolkata } from "@/lib/utils";
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
  const [unknown, setUnknown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const key = useRef(crypto.randomUUID());

  useEffect(() => {
    if (!enquiry.ready || started.current) return;
    started.current = true;
    const requested = search.get("product") ?? "";
    const marketParam = search.get("market");
    const market = marketParam === "global" || marketParam === "domestic" ? marketParam : "";
    if (requested && !getProduct(requested)) setUnknown(true);
    const lines = enquiry.lines.map((line) => ({ ...line }));
    const product = getProduct(requested);
    if (product && !lines.some((line) => line.productId === product.id)) {
      lines.push({
        productId: product.id,
        grade: product.grades?.[0]?.name ?? product.forms?.[0]?.label ?? "",
        quantity: 1,
        unit: product.units[0],
        otherUnit: "",
      });
    }
    setValues((current) => ({
      ...current,
      market: market || (product ? product.markets[0] : ""),
      lines,
      country: market === "domestic" ? "India" : "",
    }));
  }, [enquiry.ready, enquiry.lines, search]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function patch(partial: Partial<Values>) {
    setValues((current) => ({ ...current, ...partial }));
  }

  function setLine(index: number, partial: Partial<EnquiryLine>) {
    setValues((current) => {
      const lines = current.lines.map((line, lineIndex) => (lineIndex === index ? { ...line, ...partial } : line));
      enquiry.replaceLines(lines);
      return { ...current, lines };
    });
  }

  function addProduct(productId: string) {
    const product = getProduct(productId);
    if (!product) return;
    const line: EnquiryLine = {
      productId,
      grade: product.grades?.[0]?.name ?? product.forms?.[0]?.label ?? "",
      quantity: 1,
      unit: product.units[0],
      otherUnit: "",
    };
    setValues((current) => {
      const existing = current.lines.findIndex((item) => item.productId === line.productId && item.grade === line.grade && item.unit === line.unit);
      const lines = existing === -1 ? [...current.lines, line] : current.lines.map((item, index) => (index === existing ? line : item));
      enquiry.replaceLines(lines);
      return { ...current, lines };
    });
  }

  function removeLine(index: number) {
    setValues((current) => {
      const lines = current.lines.filter((_, lineIndex) => lineIndex !== index);
      enquiry.replaceLines(lines);
      return { ...current, lines };
    });
  }

  function validate(currentStep: number) {
    const next: Record<string, string> = {};
    if (currentStep === 1) {
      if (values.market !== "global" && values.market !== "domestic") next.market = "Choose global export or domestic supply.";
      if (values.lines.length === 0) next.lines = "Add at least one product.";
      values.lines.forEach((line, index) => {
        const parsed = lineSchema.safeParse(line);
        if (!parsed.success) {
          parsed.error.issues.forEach((issue) => {
            next[`lines.${index}.${String(issue.path[0] ?? "productId")}`] = issue.message;
          });
        }
        const product = getProduct(line.productId);
        if (product && (values.market === "global" || values.market === "domestic") && !product.markets.includes(values.market)) {
          next[`lines.${index}.productId`] = `${product.name} is not listed for ${marketLabel[values.market]}.`;
        }
      });
    }
    if (currentStep === 2) {
      if (values.market === "global" && values.country.trim().length < 2) next.country = "Enter the destination country.";
      if (values.city.trim().length < 2) next.city = "Enter the city or town.";
      if (values.market === "domestic" && values.postalCode.trim().length < 4) next.postalCode = "Enter the postal code.";
      if (values.requestedDate && values.requestedDate < todayInKolkata()) {
        next.requestedDate = "Choose today or a later date in India Standard Time.";
      }
    }
    if (currentStep === 3) {
      if (values.name.trim().length < 2) next.name = "Enter your name.";
      if (values.company.trim().length < 2) next.company = "Enter the company name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email address.";
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
      <div role="status" className="rise-in rounded-lg border border-line bg-white p-6">
        <h2 className="font-display text-4xl">Quotation request accepted</h2>
        <p className="mt-3 max-w-2xl text-muted">
          The server accepted this request for delivery through the configured mail service. That confirms acceptance by the service, not that the message has been read.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div>
        <ol aria-label="Quotation steps" className="grid grid-cols-3 gap-2 text-sm">
          {["Requirement", "Delivery", "Buyer"].map((label, index) => (
            <li key={label}>
              <button
                type="button"
                className={`min-h-11 w-full rounded-md border px-2 transition-colors ${step === index + 1 ? "border-olive bg-white font-semibold" : "border-line"}`}
                aria-current={step === index + 1 ? "step" : undefined}
                onClick={() => {
                  if (index + 1 < step) setStep(index + 1);
                }}
              >
                {index + 1}. {label}
              </button>
            </li>
          ))}
        </ol>
        {unknown ? (
          <p className="mt-4 rounded-md border border-line bg-white p-3 text-sm" role="status">
            That product link was not recognised. Choose a product below.
          </p>
        ) : null}
        {errors.form ? <p role="alert" className="fade-in mt-4 text-sm text-red-800">{errors.form}</p> : null}

        <div key={step} className="rise-in">
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-3xl outline-none">
          {step === 1 ? "What do you need?" : step === 2 ? "Where should it go?" : "How should we reply?"}
        </h2>

        {step === 1 ? (
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-semibold">
              Market
              <select className="field" value={values.market} onChange={(event) => patch({ market: event.target.value as Values["market"], country: event.target.value === "domestic" ? "India" : values.country })}>
                <option value="">Choose</option>
                <option value="global">Global Export</option>
                <option value="domestic">Domestic Supply</option>
              </select>
            </label>
            {errors.market ? <p className="text-sm text-red-800">{errors.market}</p> : null}
            <label className="block text-sm font-semibold">
              Add a product
              <select className="field" value="" onChange={(event) => { if (event.target.value) addProduct(event.target.value); }}>
                <option value="">Select</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </label>
            {errors.lines ? <p className="text-sm text-red-800">{errors.lines}</p> : null}
            <ul className="space-y-3">
              {values.lines.map((line, index) => {
                const product = getProduct(line.productId);
                return (
                  <li key={`${line.productId}-${index}`} className="rounded-lg border border-line bg-white p-4">
                    <div className="flex justify-between gap-3">
                      <p className="font-semibold">{product?.name ?? "Product"}</p>
                      <button type="button" className="text-sm text-olive" onClick={() => removeLine(index)}>Remove</button>
                    </div>
                    {errors[`lines.${index}.productId`] ? <p className="text-sm text-red-800">{errors[`lines.${index}.productId`]}</p> : null}
                    {product?.grades || product?.forms ? (
                      <label className="mt-3 block text-sm">
                        Grade or form
                        <select className="field" value={line.grade} onChange={(event) => setLine(index, { grade: event.target.value })}>
                          {(product.grades?.map((grade) => grade.name) ?? product.forms?.map((form) => form.label) ?? []).map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      </label>
                    ) : null}
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <label className="text-sm">
                        Quantity
                        <input className="field" inputMode="decimal" value={line.quantity} onChange={(event) => setLine(index, { quantity: Number(event.target.value) })} />
                      </label>
                      <label className="text-sm">
                        Unit
                        <select className="field" value={line.unit} onChange={(event) => setLine(index, { unit: event.target.value })}>
                          {product?.units.map((unit) => <option key={unit}>{unit}</option>)}
                          <option value="other">other</option>
                        </select>
                      </label>
                    </div>
                    {line.unit === "other" ? (
                      <label className="mt-3 block text-sm">
                        Describe the unit
                        <input className="field" value={line.otherUnit} onChange={(event) => setLine(index, { otherUnit: event.target.value })} />
                      </label>
                    ) : null}
                    {errors[`lines.${index}.quantity`] ? <p className="text-sm text-red-800">{errors[`lines.${index}.quantity`]}</p> : null}
                    {errors[`lines.${index}.unit`] || errors[`lines.${index}.otherUnit`] ? (
                      <p className="text-sm text-red-800">{errors[`lines.${index}.unit`] || errors[`lines.${index}.otherUnit`]}</p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {values.market === "global" ? (
              <Field label="Destination country" error={errors.country}>
                <input className="field" value={values.country} onChange={(event) => patch({ country: event.target.value })} />
              </Field>
            ) : null}
            <Field label="City or town" error={errors.city}>
              <input className="field" value={values.city} onChange={(event) => patch({ city: event.target.value })} />
            </Field>
            <Field label={values.market === "domestic" ? "Postal code" : "Postal code (optional)"} error={errors.postalCode}>
              <input className="field" value={values.postalCode} onChange={(event) => patch({ postalCode: event.target.value })} />
            </Field>
            {values.market === "global" ? (
              <Field label="Port (optional)" error={errors.port}>
                <input className="field" value={values.port} onChange={(event) => patch({ port: event.target.value })} />
              </Field>
            ) : null}
            <Field label="Requested date (optional)" error={errors.requestedDate}>
              <input className="field" type="date" min={todayInKolkata()} value={values.requestedDate} onChange={(event) => patch({ requestedDate: event.target.value })} />
            </Field>
            <Field label="Packing preference" error={errors.packing} className="sm:col-span-2">
              <input className="field" value={values.packing} onChange={(event) => patch({ packing: event.target.value })} />
            </Field>
            <Field label="Other requirements" error={errors.requirements} className="sm:col-span-2">
              <textarea className="field min-h-28" value={values.requirements} onChange={(event) => patch({ requirements: event.target.value })} />
            </Field>
            <p className="text-sm text-muted sm:col-span-2">A requested date is not a booking.</p>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Name" error={errors.name}><input className="field" value={values.name} onChange={(event) => patch({ name: event.target.value })} /></Field>
            <Field label="Company" error={errors.company}><input className="field" value={values.company} onChange={(event) => patch({ company: event.target.value })} /></Field>
            <Field label="Email" error={errors.email}><input className="field" type="email" value={values.email} onChange={(event) => patch({ email: event.target.value })} /></Field>
            <Field label="Phone" error={errors.phone}><input className="field" value={values.phone} onChange={(event) => patch({ phone: event.target.value })} /></Field>
            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-semibold">Preferred contact</legend>
              <label className="mr-4 text-sm"><input type="radio" name="contact" checked={values.contactPreference === "email"} onChange={() => patch({ contactPreference: "email" })} /> Email</label>
              <label className="text-sm"><input type="radio" name="contact" checked={values.contactPreference === "phone"} onChange={() => patch({ contactPreference: "phone" })} /> Phone</label>
            </fieldset>
            <label className="flex items-start gap-2 text-sm sm:col-span-2">
              <input type="checkbox" className="mt-1" checked={values.privacy} onChange={(event) => patch({ privacy: event.target.checked })} />
              <span>I understand this information is used to reply to the quotation. See the <a className="underline" href="/privacy-policy">privacy policy</a>.</span>
            </label>
            {errors.privacy ? <p className="text-sm text-red-800 sm:col-span-2">{errors.privacy}</p> : null}
          </div>
        ) : null}
        </div>

        {status === "unavailable" ? (
          <div role="status" className="fade-in mt-6 rounded-md border border-line bg-white p-4 text-sm">
            <p>Email delivery is not configured, so this form did not send the quotation.</p>
            {copied ? <p className="mt-2 font-semibold">Enquiry copied.</p> : null}
            <div className="mt-3 flex flex-wrap gap-2">
              <a className="inline-flex min-h-11 items-center rounded-md bg-olive px-4 font-semibold text-white" href={mailto}>Send by email</a>
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
              <button type="button" className="inline-flex min-h-11 items-center px-3 font-semibold" onClick={() => { key.current = crypto.randomUUID(); setStatus("idle"); }}>
                Edit and try again
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          {step > 1 ? (
            <button type="button" className="min-h-11 rounded-md border border-olive px-4 text-sm font-semibold text-olive" onClick={() => setStep((current) => current - 1)}>
              Back
            </button>
          ) : null}
          {step < 3 ? (
            <button type="button" className="min-h-11 rounded-md bg-olive px-4 text-sm font-semibold text-white" onClick={goNext}>
              Continue
            </button>
          ) : (
            <button type="button" disabled={status === "sending"} className="min-h-11 rounded-md bg-olive px-4 text-sm font-semibold text-white disabled:opacity-60" onClick={submit}>
              {status === "sending" ? "Sending…" : "Submit quotation request"}
            </button>
          )}
        </div>
      </div>
      <aside className="lg:sticky lg:top-28">
        <button type="button" className="flex w-full items-center justify-between rounded-lg border border-line bg-white px-4 py-3 text-left lg:hidden" onClick={() => setOpenSummary((open) => !open)}>
          <span className="font-semibold">Enquiry ({values.lines.length})</span>
          <span>{openSummary ? "Hide" : "Show"}</span>
        </button>
        <div className={`${openSummary ? "block" : "hidden"} lg:block rounded-lg border border-line bg-white p-4`}>
          <h2 className="font-display text-2xl">Summary</h2>
          {values.market ? <p className="mt-2 text-sm">{values.market === "global" ? "Global Export" : "Domestic Supply"}</p> : null}
          <ul className="mt-3 space-y-2 text-sm">
            {values.lines.length === 0 ? <li className="text-muted">No products yet.</li> : null}
            {values.lines.map((line, index) => (
              <li key={`${line.productId}-${index}`}>
                <span className="font-semibold">{getProduct(line.productId)?.name}</span>
                <span className="text-muted"> · {line.quantity} {line.unit === "other" ? line.otherUnit : line.unit}</span>
                {line.grade ? <span className="text-muted"> · {line.grade}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block text-sm font-semibold ${className ?? ""}`}>
      {label}
      <div className="mt-1 font-normal">{children}</div>
      {error ? <span className="mt-1 block font-normal text-red-800">{error}</span> : null}
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
    `Market: ${values.market}`,
    ...lines,
    `Country: ${values.country}`,
    `City: ${values.city}`,
    `Postal code: ${values.postalCode}`,
    `Port: ${values.port}`,
    `Requested date: ${values.requestedDate}`,
    `Packing: ${values.packing}`,
    `Requirements: ${values.requirements}`,
    `Name: ${values.name}`,
    `Company: ${values.company}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Contact preference: ${values.contactPreference}`,
  ].join("\n");
}
