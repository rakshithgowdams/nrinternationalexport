"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <h1 className="font-display text-4xl">This page had a problem.</h1>
      <p className="mt-3 text-muted">Try again, or go back to the catalogue.</p>
      <div className="mt-6 flex gap-3">
        <button type="button" onClick={reset} className="min-h-11 rounded-md bg-olive px-4 text-sm font-semibold text-white">
          Try again
        </button>
        <Link href="/" className="inline-flex min-h-11 items-center text-sm font-semibold text-olive">Home</Link>
      </div>
    </div>
  );
}
