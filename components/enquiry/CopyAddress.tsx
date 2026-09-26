"use client";

import { useState } from "react";
import { toast } from "sonner";
import { business } from "@/data/business";

export function CopyAddress() {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="inline-flex min-h-11 items-center rounded-md border border-olive px-4 text-sm font-semibold text-olive"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(business.address);
            setCopied(true);
            toast("Address copied");
          } catch {
            setCopied(false);
          }
        }}
      >
        Copy address
      </button>
      {copied ? <p className="fade-in mt-2 text-sm font-semibold" role="status">Address copied.</p> : null}
    </div>
  );
}
