"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, products } from "@/data/products";

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
        if (Array.isArray(parsed)) {
          const validProductIds = new Set(products.map((p) => p.id));
          const seen = new Set<string>();
          const validLines: EnquiryLine[] = [];
          for (const line of parsed) {
            if (!line || typeof line.productId !== "string") continue;
            const product = getProduct(line.productId);
            if (!product || !validProductIds.has(product.id) || seen.has(product.id)) continue;
            seen.add(product.id);
            const qty =
              typeof line.quantity === "number" && line.quantity > 0 && Number.isFinite(line.quantity)
                ? line.quantity
                : 1;
            const unit =
              typeof line.unit === "string" && (product.units.includes(line.unit) || line.unit === "other")
                ? line.unit
                : product.units[0];
            const otherUnit = typeof line.otherUnit === "string" ? line.otherUnit.slice(0, 60) : "";
            const grade = typeof line.grade === "string" ? line.grade.slice(0, 80) : "";
            validLines.push({
              productId: product.id,
              grade,
              quantity: qty,
              unit,
              otherUnit: unit === "other" ? otherUnit : "",
            });
          }
          queueMicrotask(() => {
            setLines(validLines);
            setReady(true);
          });
          if (validLines.length !== parsed.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validLines));
          }
          return;
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    queueMicrotask(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const addLine = useCallback((line: EnquiryLine) => {
    if (!line?.productId || !getProduct(line.productId)) return;
    setLines((current) => {
      const index = current.findIndex((item) => item.productId === line.productId);
      if (index === -1) return [...current, line];
      return current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...line } : item,
      );
    });
  }, []);

  const updateLine = useCallback((index: number, patch: Partial<EnquiryLine>) => {
    setLines((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }, []);

  const removeLine = useCallback((index: number) => {
    setLines((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }, []);

  const replaceLines = useCallback((next: EnquiryLine[]) => {
    const validProductIds = new Set(products.map((p) => p.id));
    const seen = new Set<string>();
    const validLines: EnquiryLine[] = [];
    for (const line of next) {
      if (
        line &&
        typeof line.productId === "string" &&
        validProductIds.has(line.productId) &&
        !seen.has(line.productId)
      ) {
        seen.add(line.productId);
        validLines.push(line);
      }
    }
    setLines(validLines);
  }, []);

  const clear = useCallback(() => {
    setLines([]);
  }, []);

  const value = useMemo<EnquiryContextValue>(
    () => ({
      lines,
      ready,
      addLine,
      updateLine,
      removeLine,
      replaceLines,
      clear,
    }),
    [lines, ready, addLine, updateLine, removeLine, replaceLines, clear],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) throw new Error("useEnquiry must be used within EnquiryProvider");
  return context;
}
