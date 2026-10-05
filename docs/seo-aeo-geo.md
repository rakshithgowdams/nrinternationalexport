# SEO, AEO and GEO

## Research findings (29 Sep 2026)

- NR International Export has no public web presence yet. Searches for the name return unrelated "NR International" businesses (a Delhi garment exporter, a UK research firm), so the brand must be tied to its place: **"NR International Export, Channarayapatna, Hassan"**.
- Competitors in the region (for example SMK Exports, Basaveshwara Traders) rank through B2B directory listings for phrases such as "semi husked Tiptur coconut exporter". Directory listings are the fastest route to both rankings and AI citations.
- The GSTIN can only be confirmed on gst.gov.in; keep it identical everywhere.

## What is on the site

| Area | Where |
| --- | --- |
| Titles, descriptions, keywords, canonical, Open Graph, Twitter | `lib/site.ts` → `pageMetadata`, each `page.tsx` |
| Organization + LocalBusiness + WebSite JSON-LD | `app/layout.tsx` |
| Product JSON-LD per product | `app/products/[slug]/page.tsx` |
| FAQPage JSON-LD (answers rendered in HTML) | `components/sections/FaqList.tsx` |
| BreadcrumbList JSON-LD | `components/sections/Shared.tsx` |
| AI summary | `/llms.txt` (`app/llms.txt/route.ts`) |
| AI crawler rules | `app/robots.ts` |
| Standalone citation page | `citation/index.html` |

## Target keywords

| Page | Primary phrase |
| --- | --- |
| Home | coconut exporter Karnataka, agri exporter Hassan |
| Semi-husked coconut | semi husked coconut supplier Tiptur, Channarayapatna |
| Edible copra / copra | edible copra exporter India, copra supplier Karnataka |
| Coconut shell | coconut shell supplier Karnataka |
| Ragi | ragi / finger millet exporter India |
| Tender coconut | tender coconut supplier Karnataka |

## Before launch

1. Set `NEXT_PUBLIC_SITE_URL=https://nrinternationalexport.com` in hosting. Without it the site stays `noindex`.
2. Verify the domain in Google Search Console and Bing Webmaster Tools, then submit `/sitemap.xml`.
3. Test pages in the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema validator](https://validator.schema.org/).

## Off-site citations (use the exact same name, address, phone)

- **Name:** NR International Export
- **Address:** No. 31, Thotada Mane, Begur Road, near Bagur Sub Post Office, Chennarayanapatna, Bagur, Hassan, Karnataka - 573111, India
- **Phone:** +91 63605 10816
- **Email:** contact@nrinternationalexport.com

1. Google Business Profile (category: Exporter / Coconut supplier), with photos and products.
2. Bing Places and Apple Business Connect.
3. IndiaMART, TradeIndia, ExportersIndia, Alibaba (one listing per main product, linking to its product page).
4. LinkedIn company page and a Wikidata item that link to the website.
5. APEDA / Coconut Development Board member directories, only if registered.
6. Ask buyers for Google reviews that mention the product and the region.
