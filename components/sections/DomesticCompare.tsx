"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { getProduct } from "@/data/products";

const ids = ["tender-coconuts", "coconut-plants"];

export function DomesticCompare() {
  const items = ids.map((id) => getProduct(id)!);
  return (
    <section className="mt-16">
      <div data-reveal>
        <h2 className="font-display text-4xl">Coconut forms</h2>
        <p className="mt-3 max-w-2xl text-muted">These are different products. A tender nut and a seedling are not interchangeable.</p>
      </div>
      <Tabs.Root defaultValue={items[0].id} className="mt-6 hidden md:block">
        <Tabs.List data-reveal className="flex gap-2 overflow-x-auto" aria-label="Coconut forms">
          {items.map((item) => (
            <Tabs.Trigger key={item.id} value={item.id} className="min-h-11 shrink-0 transition-colors hover:border-olive/50 rounded-md border border-line bg-white px-4 text-sm font-semibold data-[state=active]:border-olive data-[state=active]:text-olive">
              {item.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {items.map((item) => (
          <Tabs.Content key={item.id} value={item.id} className="mt-4 grid items-center gap-6 rounded-lg border border-line bg-white p-4 md:grid-cols-2">
            <img src={item.images[0].src} alt={item.images[0].alt} className="aspect-[4/3] w-full rounded-md object-cover" />
            <div>
              <h3 className="font-display text-3xl">{item.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.overview[0]}</p>
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
      <div data-stagger className="mt-4 space-y-4 md:hidden">
        {items.map((item) => (
          <article key={`${item.id}-row`} className="overflow-hidden rounded-lg border border-line bg-white">
            <img src={item.images[0].src} alt={item.images[0].alt} className="aspect-[4/3] w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-1 text-sm text-muted">{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
