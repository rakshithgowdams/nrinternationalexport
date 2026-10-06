import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import { business, certifications } from "@/data/business";
import { products } from "@/data/products";
import { absoluteUrl, allowIndex, defaultShareImage, siteUrl } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "https://nrinternationalexport.com"),
  title: {
    default: business.name,
    template: `%s · ${business.name}`,
  },
  robots: allowIndex
    ? {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      }
    : { index: false, follow: false },
  applicationName: business.name,
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_IN",
    images: [
      {
        url: defaultShareImage,
        width: 1024,
        height: 576,
        alt: `${business.name} logistics with container ship and truck`,
        type: "image/webp",
      },
    ],
  },
  formatDetection: { telephone: true, email: true, address: true },
};

const organization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": absoluteUrl("/#organization"),
      name: business.name,
      legalName: business.name,
      slogan: business.tagline,
      description:
        "Partnership registered in Hassan district, Karnataka, India, trading coconuts, copra, coconut products, grains and fresh produce for export and domestic buyers. Sourcing is focused on the Channarayapatna and Tiptur region.",
      url: absoluteUrl("/"),
      logo: absoluteUrl("/icon-512.png"),
      image: absoluteUrl(defaultShareImage),
      email: business.email,
      telephone: business.phoneTel,
      taxID: business.gstin,
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 31, Thotada Mane, Begur Road, near Bagur Sub Post Office, Bagur",
        addressLocality: "Chennarayanapatna",
        addressRegion: "Karnataka",
        postalCode: "573111",
        addressCountry: "IN",
      },
      areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        name: business.contactName,
        telephone: business.phoneTel,
        email: business.email,
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
      employee: { "@type": "Person", name: business.contactName, jobTitle: business.contactRole },
      knowsAbout: [
        "Tiptur coconut",
        "Edible copra",
        "Coconut oil",
        "Coconut shell",
        "Ragi (finger millet)",
        "Maize",
        "Ginger",
        "Agricultural export from India",
      ],
      hasCredential: certifications.map((item) => ({
        "@type": "EducationalOccupationalCredential",
        name: item.name,
        credentialCategory: "Registration",
        image: absoluteUrl(item.image),
        recognizedBy: { "@type": "Organization", name: item.issuer },
      })),
      makesOffer: products.map((product) => ({
        "@type": "Offer",
        itemOffered: { "@id": absoluteUrl(`/products/${product.slug}#product`), name: product.name },
      })),
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: business.name,
      inLanguage: "en-IN",
      publisher: { "@id": absoluteUrl("/#organization") },
      potentialAction: {
        "@type": "SearchAction",
        target: `${absoluteUrl("/products")}?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/nr-global-export-hero-mobile.webp"
          media="(max-width: 768px)"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/nr-global-export-hero.webp"
          media="(min-width: 769px)"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="help" type="text/plain" href="/llms.txt" title="LLM Context & AI Agent Summary" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Full LLM Commercial & Technical Knowledge Base" />
      </head>
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
