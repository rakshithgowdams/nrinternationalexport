"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { business } from "@/data/business";
import { marketLabel, productsForMarket } from "@/data/products";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { cn } from "@/lib/utils";

const links = [
  { href: "/quality-sourcing", label: "Quality and Sourcing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/brand/logo-light.webp"
      alt="NR International Export"
      width={180}
      height={110}
      loading="eager"
      fetchPriority="low"
      decoding="async"
      className={cn("w-auto object-contain transition-[height] duration-200", className)}
    />
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prevPathname = useRef(pathname);
  const { lines } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  const active = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur transition-[height,box-shadow] duration-200",
        scrolled ? "h-[72px] shadow-[0_6px_24px_-12px_rgba(32,53,31,0.18)]" : "h-[88px]",
      )}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 rounded-sm" aria-label="NR International Export home">
          <Logo className={scrolled ? "h-12" : "h-14"} />
        </Link>

        <NavigationMenu.Root className="relative hidden lg:block" delayDuration={80}>
          <NavigationMenu.List className="flex items-center gap-1">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ivory data-[state=open]:bg-ivory">
                Products <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="nav-content absolute top-0 left-0 grid w-[680px] grid-cols-2 gap-6 p-5">
                {(["global", "domestic"] as const).map((market) => (
                  <div key={market}>
                    <p className="text-xs font-bold tracking-[0.08em] text-ochre-ink uppercase">
                      {marketLabel[market]}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {productsForMarket(market).map((product) => (
                        <li key={`${market}-${product.id}`}>
                          <NavigationMenu.Link asChild>
                            <Link
                              href={`/products/${product.slug}`}
                              prefetch={false}
                              className="block rounded-md px-2 py-1.5 text-sm text-ink hover:bg-ivory"
                            >
                              {product.name}
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <NavigationMenu.Link asChild>
                  <Link href="/products" prefetch={false} className="col-span-2 text-sm font-semibold text-olive">
                    View all products
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ivory data-[state=open]:bg-ivory">
                Markets <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="nav-content absolute top-0 left-0 w-64 p-3">
                <NavigationMenu.Link asChild>
                  <Link href="/global-exports" prefetch={false} className="block rounded-md px-3 py-2 text-sm hover:bg-ivory">
                    Global Exports
                  </Link>
                </NavigationMenu.Link>
                <NavigationMenu.Link asChild>
                  <Link href="/domestic-supply" prefetch={false} className="block rounded-md px-3 py-2 text-sm hover:bg-ivory">
                    Domestic Supply
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            {links.map((link) => (
              <NavigationMenu.Item key={link.href}>
                <NavigationMenu.Link asChild active={active(link.href)}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-semibold",
                      active(link.href) ? "text-olive" : "text-ink hover:bg-ivory",
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
          <div className="absolute top-full left-0">
            <NavigationMenu.Viewport className="nav-viewport relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] overflow-hidden rounded-lg border border-line bg-white shadow-[0_4px_20px_-2px_rgba(32,53,31,0.06)]" />
          </div>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${business.phoneTel}`}
            className="hidden items-center gap-2 text-sm font-semibold text-ink xl:inline-flex"
          >
            <Phone className="size-4 text-olive" aria-hidden />
            {business.phoneDisplay}
          </a>
          {lines.length > 0 ? (
            <Link href="/request-quote" className="hidden text-sm font-semibold text-olive sm:inline">
              Enquiry ({lines.length})
            </Link>
          ) : null}
          <Link
            href="/request-quote"
            className="inline-flex min-h-11 items-center rounded-md bg-olive px-4 text-sm font-semibold text-white hover:bg-forest"
          >
            Request a Quote
          </Link>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="inline-flex size-11 items-center justify-center rounded-md border border-line lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="overlay fixed inset-0 z-50 bg-forest/40" />
              <Dialog.Content className="sheet fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-ivory shadow-xl">
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <Logo className="h-12" />
                  <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-md" aria-label="Close menu">
                    <X className="size-5" />
                  </Dialog.Close>
                </div>
                <nav className="flex-1 space-y-6 overflow-y-auto px-5 py-6" aria-label="Mobile">
                  <div className="sheet-item">
                    <p className="text-xs font-bold tracking-[0.08em] text-ochre-ink uppercase">Products</p>
                    <ul className="mt-2 space-y-1">
                      {productsForMarket("global").concat(productsForMarket("domestic").filter((item) => item.markets.length === 1)).map((product) => (
                        <li key={product.id}>
                          <Link href={`/products/${product.slug}`} className="block py-1.5 text-sm">
                            {product.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href="/products" className="block py-1.5 text-sm font-semibold text-olive">
                          All products
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="sheet-item space-y-2 text-sm font-semibold">
                    <Link className="block" href="/global-exports">Global Exports</Link>
                    <Link className="block" href="/domestic-supply">Domestic Supply</Link>
                    {links.map((link) => (
                      <Link key={link.href} className="block" href={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </nav>
                <div className="sheet-footer border-t border-line p-4">
                  <a href={`tel:${business.phoneTel}`} className="block text-sm font-semibold">
                    {business.phoneDisplay}
                  </a>
                  <a href={`mailto:${business.email}`} className="mb-3 block text-sm text-muted">
                    {business.email}
                  </a>
                  <Link href="/request-quote" className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-olive text-sm font-semibold text-white">
                    Request a Quote
                  </Link>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
