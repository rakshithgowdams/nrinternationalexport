import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import { business } from "@/data/business";
import { allowIndex, siteUrl } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: business.name,
    template: `%s · ${business.name}`,
  },
  description:
    "Coconuts, copra and agricultural products from the Channarayapatna and Tiptur region of Karnataka for international and domestic trade enquiries.",
  robots: allowIndex ? { index: true, follow: true } : { index: false, follow: false },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: business.name,
  email: business.email,
  telephone: business.phoneTel,
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 31, Thotada Mane, Begur Road, near Bagur Sub Post Office",
    addressLocality: "Chennarayanapatna",
    addressRegion: "Karnataka",
    postalCode: "573111",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-ivory text-ink antialiased">
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <EnquiryProvider>
          <SiteHeader />
          {children}
          <Toaster position="bottom-center" />
        </EnquiryProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
