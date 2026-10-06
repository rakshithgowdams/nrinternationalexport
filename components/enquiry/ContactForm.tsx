"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/schemas";

type Status = "idle" | "sending" | "success" | "error";

const types = [
  ["product", "Product question"],
  ["domestic", "Domestic supply"],
  ["export", "Global export"],
  ["other", "Something else"],
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      enquiryType: "product",
      message: "",
      website: "",
      honeypot: "",
    },
  });

  async function onSubmit(values: ContactInput) {
    if (status === "sending") return;
    setStatus("sending");
    setFormError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        fieldErrors?: Record<string, string>;
      };

      if (response.ok && data.success) {
        setStatus("success");
        form.reset({
          name: "",
          company: "",
          email: "",
          phone: "",
          enquiryType: "product",
          message: "",
          website: "",
          honeypot: "",
        });
        return;
      }

      if (data.fieldErrors) {
        setStatus("idle");
        Object.entries(data.fieldErrors).forEach(([field, msg]) => {
          form.setError(field as keyof ContactInput, { message: msg });
        });
        setFormError(data.message || "Please check the form fields.");
        return;
      }

      setStatus("error");
      setFormError(data.message || null);
    } catch {
      setStatus("error");
      setFormError(null);
    }
  }

  function handleButtonClick() {
    if (status === "success") {
      setStatus("idle");
      setFormError(null);
    }
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {status === "success" && (
        <div
          role="status"
          className="fade-in rounded-md border border-[#c9d1bf] bg-white p-4 text-sm text-ink shadow-xs"
        >
          <p className="font-semibold text-forest">
            Thank you. Your message has been sent successfully. We’ll review your enquiry and respond using the contact details you provided.
          </p>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="fade-in rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-900 shadow-xs"
        >
          <p>
            We couldn’t send your message right now. Please try again, or contact us directly by email at{" "}
            <a
              href="mailto:contact@nrinternationalexport.com"
              className="font-semibold underline hover:text-forest"
            >
              contact@nrinternationalexport.com
            </a>.
          </p>
        </div>
      )}

      {formError && status !== "error" && status !== "success" && (
        <div
          role="alert"
          className="fade-in rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900 shadow-xs"
        >
          <p className="font-semibold">{formError}</p>
        </div>
      )}

      <Field label="Name" error={form.formState.errors.name?.message}>
        <input
          className="field"
          disabled={status === "sending"}
          {...form.register("name")}
        />
      </Field>

      <Field label="Company" error={form.formState.errors.company?.message}>
        <input
          className="field"
          disabled={status === "sending"}
          {...form.register("company")}
        />
      </Field>

      <Field label="Email" error={form.formState.errors.email?.message}>
        <input
          className="field"
          type="email"
          autoComplete="email"
          disabled={status === "sending"}
          {...form.register("email")}
        />
      </Field>

      <Field label="Phone (optional)" error={form.formState.errors.phone?.message}>
        <input
          className="field"
          autoComplete="tel"
          disabled={status === "sending"}
          {...form.register("phone")}
        />
      </Field>

      <Field label="Enquiry type" error={form.formState.errors.enquiryType?.message}>
        <select
          className="field"
          disabled={status === "sending"}
          {...form.register("enquiryType")}
        >
          {types.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={form.formState.errors.message?.message}>
        <textarea
          className="field min-h-32"
          disabled={status === "sending"}
          {...form.register("message")}
        />
      </Field>

      <p className="text-xs leading-5 text-muted">
        Your message is used to reply to this enquiry. Read the{" "}
        <a className="underline" href="/privacy-policy">
          privacy policy
        </a>
        . This site does not keep a database of messages.
      </p>

      {/* Hidden honeypot fields for anti-spam */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0 pointer-events-none"
        aria-hidden="true"
        {...form.register("website")}
      />
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0 pointer-events-none"
        aria-hidden="true"
        {...form.register("honeypot")}
      />

      <button
        type="submit"
        onClick={handleButtonClick}
        disabled={status === "sending"}
        className="inline-flex min-h-11 items-center rounded-md bg-olive px-5 text-sm font-semibold text-white transition-colors hover:bg-forest disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
      >
        {status === "sending"
          ? "Sending..."
          : status === "success"
            ? "Send another message"
            : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <div className="mt-1 font-normal">{children}</div>
      {error ? <span className="mt-1 block font-normal text-red-800 text-xs">{error}</span> : null}
    </label>
  );
}
