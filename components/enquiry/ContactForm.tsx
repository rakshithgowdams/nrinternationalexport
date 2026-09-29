"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { business } from "@/data/business";
import { contactSchema, type ContactInput } from "@/lib/schemas";

type Status = "idle" | "sending" | "success" | "unavailable" | "error";

const types = [
  ["product", "Product question"],
  ["domestic", "Domestic supply"],
  ["export", "Global export"],
  ["other", "Something else"],
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [summary, setSummary] = useState<string[]>([]);
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      enquiryType: "product",
      message: "",
      honeypot: "",
      idempotencyKey: crypto.randomUUID(),
    },
  });

  async function onSubmit(values: ContactInput) {
    setStatus("sending");
    setSummary([]);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { status?: string; message?: string; fieldErrors?: Record<string, string> };
      if (data.status === "accepted") {
        setStatus("success");
        form.reset({ ...form.getValues(), message: "", idempotencyKey: crypto.randomUUID() });
        return;
      }
      if (data.fieldErrors) {
        setStatus("idle");
        setSummary(Object.values(data.fieldErrors));
        return;
      }
      if (data.status === "unavailable" || response.status === 503) {
        setStatus("unavailable");
        return;
      }
      setStatus("error");
      setSummary([data.message ?? "The message was not sent."]);
    } catch {
      setStatus("error");
      setSummary(["The message was not sent. You can email us directly."]);
    }
  }

  const mailto = `mailto:${business.enquiryEmail}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(draft(form.getValues()))}`;

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {summary.length > 0 ? (
        <div role="alert" className="fade-in rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900">
          <p className="font-semibold">Please correct the form.</p>
          <ul className="mt-1 list-disc pl-5">{summary.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      ) : null}
      {status === "success" ? (
        <p role="status" className="fade-in rounded-md border border-line bg-white p-3 text-sm">
          The request was accepted for delivery by the configured mail service. That does not confirm it has been read.
        </p>
      ) : null}
      {status === "unavailable" ? (
        <div role="status" className="fade-in rounded-md border border-line bg-white p-3 text-sm">
          <p>Email delivery is not configured on this server, so the form did not send the message.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a className="inline-flex min-h-11 items-center rounded-md bg-olive px-4 font-semibold text-white" href={mailto}>Send by email</a>
            <button
              type="button"
              className="inline-flex min-h-11 items-center rounded-md border border-olive px-4 font-semibold text-olive"
              onClick={async () => {
                await navigator.clipboard.writeText(draft(form.getValues()));
                toast("Enquiry copied");
              }}
            >
              Copy enquiry
            </button>
          </div>
        </div>
      ) : null}
      <Field label="Name" error={form.formState.errors.name?.message}>
        <input className="field" {...form.register("name")} />
      </Field>
      <Field label="Company" error={form.formState.errors.company?.message}>
        <input className="field" {...form.register("company")} />
      </Field>
      <Field label="Email" error={form.formState.errors.email?.message}>
        <input className="field" type="email" autoComplete="email" {...form.register("email")} />
      </Field>
      <Field label="Phone (optional)" error={form.formState.errors.phone?.message}>
        <input className="field" autoComplete="tel" {...form.register("phone")} />
      </Field>
      <Field label="Enquiry type" error={form.formState.errors.enquiryType?.message}>
        <select className="field" {...form.register("enquiryType")}>
          {types.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </Field>
      <Field label="Message" error={form.formState.errors.message?.message}>
        <textarea className="field min-h-32" {...form.register("message")} />
      </Field>
      <p className="text-xs leading-5 text-muted">
        Your message is used to reply to this enquiry. Read the <a className="underline" href="/privacy-policy">privacy policy</a>. This draft explains that the site does not keep a database of messages.
      </p>
      <input tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden {...form.register("honeypot")} />
      <button type="submit" disabled={status === "sending"} className="inline-flex min-h-11 items-center rounded-md bg-olive px-5 text-sm font-semibold text-white disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <div className="mt-1 font-normal">{children}</div>
      {error ? <span className="mt-1 block font-normal text-red-800">{error}</span> : null}
    </label>
  );
}

function draft(values: Partial<ContactInput>) {
  return `Name: ${values.name ?? ""}\nCompany: ${values.company ?? ""}\nEmail: ${values.email ?? ""}\nPhone: ${values.phone ?? ""}\nType: ${values.enquiryType ?? ""}\n\n${values.message ?? ""}`;
}
