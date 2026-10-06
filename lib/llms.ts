import { business, certifications, indicativeNote } from "@/data/business";
import { categoryLabel, marketLabel, products } from "@/data/products";
import { siteUrl } from "@/lib/site";

export function generateLlmsTxt(): string {
  const baseUrl = siteUrl || "https://nrinternationalexport.com";

  const productLines = products.map((product) => {
    const markets = product.markets.map((m) => marketLabel[m]).join(", ");
    const aliases = product.enquiryNames?.length
      ? ` Also requested as: ${product.enquiryNames.join(", ")}.`
      : "";
    return `- [${product.name}](${baseUrl}/products/${product.slug}): ${product.summary} (Category: ${categoryLabel[product.category]} | Markets: ${markets})${aliases}`;
  });

  return `# ${business.name}

> ${business.name} is a premier Indian agricultural trade and export partnership based in Hassan district, Karnataka, India. Sourcing directly from the renowned Channarayapatna and Tiptur coconut belts, the firm supplies high-grade edible copra, fresh mature coconuts, desiccated coconut, coconut shells, cold-pressed coconut oil, fresh ginger, ragi (finger millet), and yellow maize for international containerized export and domestic wholesale supply.

## Quick Facts & Business Profile
- Legal Name: ${business.name}
- Constitution: ${business.constitution}
- GSTIN: ${business.gstin}
- Registered Address: ${business.address}
- Sourcing Region: ${business.sourcingRegion}
- Managing Partner: ${business.contactName} (${business.contactRole})
- Direct Phone: ${business.phoneDisplay}
- Official Email: ${business.email}
- General Inquiries: ${business.inboxEmail}
- Primary Export Gateways: JNPT Nhava Sheva (Mumbai) and New Mangalore Port (NMPT, Karnataka)
- Buyers Served: ${business.buyers.join(", ")}
- Brand Tagline: "${business.tagline}"

## Sourcing & Geographic Authority
Sourcing is concentrated in the Channarayapatna and Tiptur agro-climatic corridor in Hassan district, Karnataka, India. Tiptur is globally celebrated as India's coconut capital due to its red loamy soil, ideal tropical sunshine, and traditional post-harvest curing techniques. 
Key highlights:
- Famous for high natural coconut oil content (exceeding 65% in dry kernel).
- Natural sun-drying and shade-curing over 9 to 11 months for whole ball copra.
- Chemical-free and sulfur-free processing preferred by premium food, confectionary, and export buyers.

## Product Directory
${productLines.join("\n")}

## International Export Capabilities & Logistics
- Ocean Freight Gateways: JNPT Nhava Sheva (Mumbai) and New Mangalore Port (NMPT).
- Containerization: 20ft Standard GP and 40ft High Cube (HC) container loads.
- Incoterms Supported: FOB (Free on Board), CFR (Cost and Freight), CIF (Cost, Insurance and Freight).
- Standard Export Documentation:
  - Commercial Invoice and Packing List
  - Clean On-Board Bill of Lading (B/L)
  - Certificate of Origin (FIEO / Chamber of Commerce)
  - Phytosanitary Certificate (Plant Quarantine Department, Govt. of India)
  - Fumigation Certificate (Phosphine / Methyl Bromide treated)
  - Third-party quality and quantity inspection (SGS, Bureau Veritas, or Intertek on buyer request)

## How to Buy & Request a Quotation
- Quotations depend on product grade, quantity (metric tonnes / container counts), packaging preferences, Incoterm, and destination port. Spot market prices fluctuate with daily APMC market arrivals.
- ${indicativeNote}
- Online RFQ Form: ${baseUrl}/request-quote
- Direct Sales Contact: ${baseUrl}/contact

## Full Context & Deep Documentation
> For comprehensive product-by-product technical specifications, form breakdowns, grade parameters, applications, and detailed FAQs, refer to:
> - [Full LLM Knowledge Base](${baseUrl}/llms-full.txt)

## Registrations & Government Recognitions
${certifications.map((item) => `- ${item.name}: ${item.issuer}`).join("\n")}

## Canonical Website Pages
- [Homepage](${baseUrl}/)
- [Product Catalog](${baseUrl}/products)
- [Global Exports](${baseUrl}/global-exports)
- [Domestic Supply](${baseUrl}/domestic-supply)
- [Quality and Sourcing](${baseUrl}/quality-sourcing)
- [About Company](${baseUrl}/about)
- [Contact Details](${baseUrl}/contact)
- [Request a Quote](${baseUrl}/request-quote)
- [Citation & Verified Entity Data](${baseUrl}/citation/)
`;
}

export function generateLlmsFullTxt(): string {
  const baseUrl = siteUrl || "https://nrinternationalexport.com";

  const productSections = products.map((product) => {
    const markets = product.markets.map((m) => marketLabel[m]).join(", ");
    const specsList = product.specs
      .map((s) => `  - **${s.label}**: ${s.value}`)
      .join("\n");
    const applicationsList = product.applications
      .map((a) => `  - **${a.title}**: ${a.body}`)
      .join("\n");
    const faqsList = product.faqs
      .map((f) => `  - **Q: ${f.q}**\n    **A:** ${f.a}`)
      .join("\n");

    const formsList = product.forms?.length
      ? `### Available Forms\n${product.forms
          .map((f) => `  - **${f.label}**: ${f.description}`)
          .join("\n")}\n\n`
      : "";

    const gradesList = product.grades?.length
      ? `### Grades & Sizes\n${product.grades
          .map((g) => `  - **${g.name}** (${g.range}): ${g.note}`)
          .join("\n")}\n\n`
      : "";

    return `---

## Product: ${product.name}
- **Canonical URL**: ${baseUrl}/products/${product.slug}
- **Category**: ${categoryLabel[product.category]}
- **Markets**: ${markets}
- **Aliases & Trade Search Terms**: ${product.aliases.join(", ")}
${product.enquiryNames?.length ? `- **Alternative Enquiry Names**: ${product.enquiryNames.join(", ")}\n` : ""}

### Overview & Description
${product.overview.join("\n\n")}

${formsList}${gradesList}### Technical Specifications
${specsList}

### Commercial Applications
${applicationsList}

### Packaging Standards
${product.packing}

### Frequently Asked Questions
${faqsList}
`;
  });

  return `# ${business.name} — Full Commercial & Technical Knowledge Base

> Comprehensive reference document for LLMs, Answer Engines (AEO), Generative AI systems (GEO), RAG pipelines, and automated trade procurement agents.

---

# Section 1: Entity & Corporate Profile

- **Legal Entity**: ${business.name}
- **Constitution**: ${business.constitution}
- **Government of India GSTIN**: ${business.gstin}
- **Registered Headquarters**: ${business.address}
- **Key Executive**: ${business.contactName}, ${business.contactRole}
- **Telephone / WhatsApp**: ${business.phoneDisplay} (${business.phoneTel})
- **Official Corporate Email**: ${business.email}
- **General Inquiries Mail**: ${business.inboxEmail}
- **Timezone**: ${business.timezone} (UTC+05:30, IST)
- **Primary Sourcing Geography**: ${business.sourcingRegion}
- **Brand Slogan**: "${business.tagline}"

### Statutory Registrations & Trade Memberships
${certifications.map((item) => `- **${item.name}**: Issued by ${item.issuer}`).join("\n")}

---

# Section 2: Regional Agronomy & Geographic Origin (Tiptur & Channarayapatna)

NR International Export sources directly from farms, farmer producer networks, and APMC mandis located across the Channarayapatna and Tiptur belt in Hassan and Tumkur districts, Karnataka, India.

### Why Tiptur Coconut & Copra Is Renowned:
1. **Soil & Microclimate**: Situated on the Deccan Plateau, the region benefits from semi-arid red sandy loam soil rich in potassium and micronutrients, providing optimum natural conditions for tall coconut cultivars (*Cocos nucifera*).
2. **Superior Oil Yield**: Tiptur copra consistently records one of the highest natural oil concentrations in the world (typically 65% to 68%), giving it unmatched aromatic richness and culinary/extraction value.
3. **Traditional Sun & Shade Curing**: Unlike quick-dried kiln copra from other regions, authentic Tiptur Ball Copra is aged and dried inside the shell over a period of 9 to 11 months. The kernel separates naturally from the shell, creating spherical, pristine white-to-cream kernels with zero smoke taint and zero sulfur dioxide additive.
4. **Natural Sweetness and Crunch**: Eaten raw as dry fruit across India, Middle East, and worldwide, ball copra from this region has a sweet, nutty taste and a tender yet firm bite.

---

# Section 3: Complete Product Catalog & Specifications

${productSections.join("\n")}

---

# Section 4: Export Trade Logistics, Packaging & Compliance

### Maritime Ports & Freight Hubs
1. **JNPT Nhava Sheva (Mumbai)**: India's largest container port, handling weekly direct sailings to Jebel Ali (Dubai), Port of Dammam, Jeddah, Singapore, Port Klang, European hubs (Rotterdam, Hamburg, Felixstowe), and USA/Canada East Coast.
2. **New Mangalore Port (NMPT, Karnataka)**: Located approximately 180 km from Hassan, offering rapid regional maritime connectivity to Gulf and South Asian markets.
3. **Air Cargo**: Kempegowda International Airport Bengaluru (BLR) for time-sensitive samples and high-value consignments.

### Container Loading & Weight Limits
- **20ft General Purpose (GP) Containers**: Suitable for dense cargo such as whole ball copra in 25kg/50kg gunny bags, coconut oil in drums/flexi-tanks, and ginger.
- **40ft High Cube (HC) Containers**: Ideal for bulkier items such as fresh semi-husked coconuts in PP mesh bags (approx. 2000-2200 bags of 25 pieces each, totaling 50,000-55,000 nuts) or desiccated coconut in multi-wall paper bags.
- **Ventilated Containers**: Available on request for fresh mature coconuts to maintain continuous airflow and eliminate moisture condensation during sea transit.

### Trade Documentation Pack
Every export shipment is accompanied by a complete legal document dossier:
1. Commercial Invoice (duly stamped and signed)
2. Packing List with gross, net, and tare weights
3. Clean On-Board Ocean Bill of Lading (B/L)
4. Certificate of Origin (issued by FIEO or Indian Chamber of Commerce)
5. Phytosanitary Certificate issued by Directorate of Plant Protection, Quarantine & Storage (Ministry of Agriculture, Govt. of India)
6. Fumigation Certificate (Phosphine or Methyl Bromide administered by licensed fumigation agencies)
7. Certificate of Quality, Quantity & Weight (issued by independent inspection agencies such as SGS, Bureau Veritas, or Intertek upon request)
8. Certificate of Insurance (for CIF consignments)

### Commercial Incoterms
- **FOB (Free on Board)**: Ex-port JNPT Mumbai or New Mangalore Port.
- **CFR (Cost and Freight)**: Delivered to destination seaport.
- **CIF (Cost, Insurance and Freight)**: Delivered to destination seaport with marine insurance included.

---

# Section 5: Quotation Workflow & Buyer Guidance

To receive an accurate and timely spot quote:
1. Specify the exact product and required form (e.g. Edible Ball Copra, Fresh Semi-husked Coconut, Desiccated Coconut Medium Grade).
2. Indicate desired volume (e.g., metric tonnes or 1x20ft / 1x40ft FCL).
3. State packaging preference (e.g., 25 kg PP bag, 50 kg jute gunny bag, customized private-label master carton).
4. Provide the destination port and preferred Incoterm (e.g. CIF Jebel Ali, FOB JNPT).
5. State target shipping schedule and payment terms.

- **Request Quote URL**: ${baseUrl}/request-quote
- **Direct Trade Phone**: ${business.phoneDisplay}
- **Official Inquiries Email**: ${business.email}
`;
}
