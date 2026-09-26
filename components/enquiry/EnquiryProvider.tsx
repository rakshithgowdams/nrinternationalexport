"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type EnquiryLine = {
  productId: string;
  grade: string;
  quantity: number;
  unit: string;
  otherUnit: string;
};

type EnquiryContextValue = {
  lines: EnquiryLine[];
  ready: boolean;
  addLine: (line: EnquiryLine) => void;
  updateLine: (index: number, patch: Partial<EnquiryLine>) => void;
  removeLine: (index: number) => void;
  replaceLines: (lines: EnquiryLine[]) => void;
  clear: () => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);
const STORAGE_KEY = "nr-enquiry-lines";

function sameLine(a: EnquiryLine, b: EnquiryLine) {
  return a.productId === b.productId && a.grade === b.grade && a.unit === b.unit && a.otherUnit === b.otherUnit;
}

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<EnquiryLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as EnquiryLine[];
        if (Array.isArray(parsed)) setLines(parsed.filter((line) => line.productId));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<EnquiryContextValue>(
    () => ({
      lines,
      ready,
      addLine: (line) => {
        setLines((current) => {
          const index = current.findIndex((item) => sameLine(item, line));
          if (index === -1) return [...current, line];
          return current.map((item, itemIndex) =>
            itemIndex === index ? { ...item, quantity: line.quantity } : item,
          );
        });
      },
      updateLine: (index, patch) => {
        setLines((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
      },
      removeLine: (index) => setLines((current) => current.filter((_, itemIndex) => itemIndex !== index)),
      replaceLines: (next) => setLines(next),
      clear: () => setLines([]),
    }),
    [lines, ready],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) throw new Error("useEnquiry must be used within EnquiryProvider");
  return context;
}
