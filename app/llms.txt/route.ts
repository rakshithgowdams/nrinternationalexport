import { business, certifications, indicativeNote } from "@/data/business";
import { marketLabel, products } from "@/data/products";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const productLines = products.map(
    (product) =>
      `- [${product.name}](${absoluteUrl(`/products/${product.slug}`)}): ${product.summary} Markets: ${product.markets
        .map((market) => marketLabel[market])
        .join(", ")}.${product.enquiryNames ? ` Also requested as: ${product.enquiryNames.join(", ")}.` : ""}`,
  );

  const body = `# ${business.name}

> ${business.name} is a partnership registered in Hassan district, Karnataka, India. It trades coconuts, copra, coconut products, grains and fresh produce for international (export) and domestic buyers. Sourcing is focused on the ${business.sourcingRegion}.

## Facts
- Legal name: ${business.name}
- Constitution: ${business.constitution}
- GSTIN: ${business.gstin}
- Registered address: ${business.address}
- Sourcing region: ${business.sourcingRegion}
- Managing Partner: ${business.contactName}
- Phone: ${business.phoneDisplay}
- Email: ${business.email}
- Buyers served: ${business.buyers.join(", ")}
- Tagline: ${business.tagline}

## Products
${productLines.join("\n")}

## How to buy
- Quotations depend on product, grade, quantity, packing and destination. No prices or minimum order quantities are published.
- ${indicativeNote}
- Request a quote: ${absoluteUrl("/request-quote")}
- Contact: ${absoluteUrl("/contact")}

## Pages
- [Home](${absoluteUrl("/")})
- [All products](${absoluteUrl("/products")})
- [Global exports](${absoluteUrl("/global-exports")})
- [Domestic supply](${absoluteUrl("/domestic-supply")})
- [Quality and sourcing](${absoluteUrl("/quality-sourcing")})
- [About](${absoluteUrl("/about")})

## Registrations
${certifications.map((item) => `- ${item.name}: ${item.issuer}`).join("\n")}

## Not claimed
This site does not claim quality or food-safety certifications, a founding year, shipment history, oil percentages or production capacity.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
