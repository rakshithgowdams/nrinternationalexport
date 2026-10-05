export const markets = ["global", "domestic"] as const;
export type Market = (typeof markets)[number];

export const categories = [
  "coconuts",
  "copra",
  "grains",
  "produce",
  "field",
] as const;
export type CategoryFilter = (typeof categories)[number];
export type Category = Exclude<CategoryFilter, "field">;

export const marketLabel: Record<Market, string> = {
  global: "Global Export",
  domestic: "Domestic Supply",
};

export const categoryLabel: Record<CategoryFilter, string> = {
  coconuts: "Coconuts",
  copra: "Copra and Coconut Products",
  grains: "Grains",
  produce: "Fresh Produce",
  field: "Grains and Fresh Produce",
};

const confirm = "Confirm with supplier";

export type ProductImage = { src: string; alt: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  markets: Market[];
  aliases: string[];
  summary: string;
  overview: string[];
  images: ProductImage[];
  specs: { label: string; value: string }[];
  applications: { title: string; body: string }[];
  packing: string;
  faqs: { q: string; a: string }[];
  units: string[];
  grades?: { name: string; range: string; note: string }[];
  forms?: { id: string; label: string; description: string }[];
  enquiryNames?: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "fresh-coconuts",
    slug: "fresh-coconuts",
    name: "Fresh Coconut",
    category: "coconuts",
    markets: ["global"],
    aliases: ["fresh coconut", "fresh coconuts", "mature coconut"],
    summary:
      "Mature coconuts for international buyers who want to discuss count, grade and husk preparation.",
    overview: [
      "Fresh coconut on this website means mature coconuts offered for export enquiries. It is listed separately from tender and seedling coconuts.",
      "Weight grade, husk finish, packing and destination requirements are agreed in the quotation. A listing here is not a promise of ready stock.",
    ],
    images: [
      {
        src: "/images/coconuts-market.jpg",
        alt: "Pile of mature brown coconuts with their fibre trimmed.",
      },
      {
        src: "/images/coconut-heaps.jpg",
        alt: "Heaps of harvested coconuts gathered under coconut palms.",
      },
      {
        src: "/images/coconut-halves.jpg",
        alt: "Halved mature coconuts showing the white kernel inside the brown husk.",
      },
    ],
    specs: [
      { label: "Product form", value: "Mature coconut" },
      { label: "Market", value: "Global export enquiries" },
      { label: "Husk preparation", value: confirm },
      { label: "Grade and weight", value: confirm },
      { label: "Packing", value: confirm },
    ],
    applications: [
      {
        title: "Import programmes",
        body: "Buyers can request a count, size range and packing style suited to wholesale distribution.",
      },
      {
        title: "Further processing",
        body: "Tell us if the nuts are intended for copra, oil or fresh retail so the preparation can be discussed.",
      },
    ],
    packing:
      "Packing format, piece count and any shelf-life expectation should be stated in the enquiry. Nothing on this page is a container-load or storage guarantee.",
    faqs: [
      {
        q: "Do you publish a minimum order?",
        a: "No fixed minimum is published. Share the quantity you need and we will confirm what can be discussed.",
      },
    ],
    units: ["pieces", "tonnes"],
  },
  {
    id: "edible-copra",
    slug: "edible-copra",
    name: "Edible Copra",
    category: "copra",
    markets: ["global"],
    aliases: ["edible copra", "ball copra", "edible ball copra"],
    summary:
      "Dried coconut kernel for export enquiries, with edible copra and ball copra as separate form options.",
    overview: [
      "Edible copra is dried coconut kernel, not desiccated coconut and not a whole dry nut. The photograph shows the kernel form buyers should expect to discuss.",
      "Ball copra is included as a labelled enquiry option. Whether both forms are offered for a given order is confirmed with the supplier before any quotation is treated as final.",
    ],
    images: [
      {
        src: "/images/copra-cups.jpg",
        alt: "Rows of halved copra cups, the dried white coconut kernel, laid out to dry.",
      },
    ],
    forms: [
      {
        id: "edible",
        label: "Edible copra",
        description: "Dried kernel prepared for edible-use enquiries. Moisture and grade are confirmed per order.",
      },
      {
        id: "ball",
        label: "Ball copra",
        description: "Whole ball form. Availability for your quantity is subject to confirmation.",
      },
    ],
    specs: [
      { label: "Product", value: "Dried coconut kernel" },
      { label: "Forms you can request", value: "Edible copra or ball copra" },
      { label: "Moisture", value: confirm },
      { label: "Grade", value: confirm },
      { label: "Oil content", value: confirm },
      { label: "Packing", value: confirm },
    ],
    applications: [
      {
        title: "Food use",
        body: "Describe the intended food application so the form and grade can be matched to the enquiry. This page does not certify a food-safety standard.",
      },
      {
        title: "Trading lots",
        body: "Share quantity, packing and destination. Commercial terms are quoted only after the specification is agreed.",
      },
    ],
    packing:
      "Ask for the bag type, net weight and any batch-specific moisture limit you need. Those figures are not published here because they were not supplied as fixed stock specifications.",
    faqs: [
      {
        q: "Is this desiccated coconut?",
        a: "No. Desiccated coconut is the shredded or granulated product on its own page. Copra here means dried kernel, including the ball form.",
      },
      {
        q: "Is an oil percentage guaranteed?",
        a: "No oil percentage, lab test or shelf-life figure is published for this product. Ask for the specification you need in the quotation.",
      },
    ],
    units: ["kg", "tonnes"],
    featured: true,
    enquiryNames: ["Edible COPRA"],
  },
  {
    id: "dry-coconut",
    slug: "dry-coconut",
    name: "Dry Coconut",
    category: "copra",
    markets: ["global"],
    aliases: ["dry coconut", "dried coconut"],
    summary:
      "Mature coconuts dried in the shell for buyers who want the whole dry nut rather than loose kernel or flakes.",
    overview: [
      "Dry coconut is listed on its own so it is not treated as edible copra or desiccated coconut. The nut is dried, and the kernel remains inside the shell until opened.",
      "Use this page when the requirement is the dry whole nut. If you need cups, balls or shredded meat, choose the matching product page.",
    ],
    images: [
      {
        src: "/images/ball-copra.jpg",
        alt: "Whole dry coconut kernels (ball copra) with their brown skin.",
      },
    ],
    specs: [
      { label: "Product form", value: "Dry coconut in shell" },
      { label: "Market", value: "Global export enquiries" },
      { label: "Moisture", value: confirm },
      { label: "Count or weight", value: confirm },
      { label: "Packing", value: confirm },
    ],
    applications: [
      {
        title: "Wholesale supply",
        body: "Request the piece count or weight and the dryness level your market expects.",
      },
      {
        title: "Kernel recovery",
        body: "If the nuts will be opened for copra, say so. Yield is not stated on this page.",
      },
    ],
    packing: "Packing and any breakage tolerance are part of the quotation, not a published standard.",
    faqs: [
      {
        q: "How is this different from copra?",
        a: "Dry coconut is the dried nut in its shell. Copra is the dried kernel after the shell is removed.",
      },
    ],
    units: ["pieces", "kg", "tonnes"],
  },
  {
    id: "desiccated-coconut",
    slug: "desiccated-coconut",
    name: "Desiccated Coconut",
    category: "copra",
    markets: ["global"],
    aliases: ["desiccated coconut", "desiccated copra", "shredded coconut"],
    summary:
      "Dried shredded or granulated coconut for bakery, confectionery and food-processing enquiries.",
    overview: [
      "This page presents dried shredded or granulated coconut. The name follows the request for desiccated copra and is pending final confirmation from the business.",
      "Particle size, fat, moisture, quantity and packing on the specification table are buyer preferences. They are not a list of stocked grades.",
    ],
    images: [
      {
        src: "/images/desiccated-coconut-real.jpg",
        alt: "Finely ground dried white coconut.",
      },
    ],
    specs: [
      { label: "Displayed product", value: "Dried shredded or granulated coconut" },
      { label: "Name status", value: "Pending final confirmation" },
      { label: "Particle size or texture", value: "Tell us your preference" },
      { label: "Fat content", value: "Tell us your requirement" },
      { label: "Moisture", value: "Tell us your requirement" },
      { label: "Quantity and packing", value: confirm },
    ],
    applications: [
      {
        title: "Bakery",
        body: "Share the texture you need in doughs, fillings or toppings. The site does not certify a bakery grade.",
      },
      {
        title: "Confectionery",
        body: "Describe sweetness pairings only as your process need. No recipe performance is claimed.",
      },
      {
        title: "Food processing",
        body: "Include packing size and any specification sheet you want the quotation to answer.",
      },
    ],
    packing:
      "Request bag weight and liner type in the enquiry. Published catalogue text does not promise a particular pack.",
    faqs: [
      {
        q: "Why does the name say desiccated coconut?",
        a: "The original list said desiccated copra. Copra and desiccated coconut are different products, so this page shows the shredded coconut form and keeps the final trade name open for confirmation.",
      },
    ],
    units: ["kg", "tonnes"],
    featured: true,
    enquiryNames: ["Desiccated copra"],
  },
  {
    id: "coconut-shells",
    slug: "coconut-shells",
    name: "Coconut Shell",
    category: "copra",
    markets: ["global", "domestic"],
    aliases: ["coconut shell", "coconut shells", "shells"],
    summary:
      "Cleaned coconut shells for buyers in India and for international enquiries.",
    overview: [
      "Coconut shell is one product with two enquiry paths: global export and domestic supply. Choose the market that matches where the goods are needed.",
      "Size, cleanliness, moisture and end use are confirmed per order. The page does not claim a charcoal grade or a calorific value.",
    ],
    images: [
      {
        src: "/images/coconut-shell-halves.jpg",
        alt: "Cleaned coconut shell halves, one showing the inside of the shell.",
      },
    ],
    specs: [
      { label: "Product", value: "Coconut shell" },
      { label: "Markets", value: "Global export and domestic supply" },
      { label: "Cleanliness", value: confirm },
      { label: "Piece size", value: confirm },
      { label: "Packing", value: confirm },
    ],
    applications: [
      {
        title: "Processing",
        body: "Tell us the intended process so packing and cleanliness can be discussed without assuming an industrial specification.",
      },
      {
        title: "Craft and utility uses",
        body: "If you need a particular half-shell shape, describe it. It will be treated as a request.",
      },
    ],
    packing: "Bulk sacks or another pack can be requested. Capacity is not stated as a fixed figure.",
    faqs: [
      {
        q: "Is shell available inside India and for export?",
        a: "Yes. Select Domestic Supply or Global Export in the quotation so the delivery questions match the market.",
      },
    ],
    units: ["kg", "tonnes"],
  },
  {
    id: "coconut-oil",
    slug: "coconut-oil",
    name: "Coconut Oil",
    category: "copra",
    markets: ["global"],
    aliases: ["coconut oil", "oil"],
    summary:
      "Coconut oil for export enquiries. Processing type, volume and packing are requested, not assumed.",
    overview: [
      "This page is for coconut oil as an agricultural product enquiry. It does not describe the oil as virgin, cold-pressed, organic, refined or medicinal, because those process claims were not supplied.",
      "Share the processing type you require, the volume and the packing you want quoted. A preference is a request, not confirmation that the pack is in stock.",
    ],
    images: [
      {
        src: "/images/coconut-oil-bottle.jpg",
        alt: "Bottle of clear coconut oil standing among whole coconuts.",
      },
    ],
    forms: [
      { id: "tins", label: "Tins", description: "Request tins as a packing preference." },
      { id: "jars", label: "Jars", description: "Request jars as a packing preference." },
      { id: "bulk", label: "Bulk", description: "Request a bulk pack and name the volume." },
      { id: "other", label: "Other", description: "Describe another pack in the quotation." },
    ],
    specs: [
      { label: "Product", value: "Coconut oil" },
      { label: "Processing type", value: "Tell us what you require" },
      { label: "Intended use", value: "Tell us what you require" },
      { label: "Volume", value: confirm },
      { label: "Packing", value: "Preference only, until confirmed" },
    ],
    applications: [
      {
        title: "Food processing",
        body: "State the use and any specification you need checked. Food-grade status is not claimed on this page.",
      },
      {
        title: "Other uses",
        body: "Describe the use in plain language so the quotation can say whether that requirement can be discussed.",
      },
    ],
    packing:
      "Choose a packing preference or write your own. The quotation will say what can actually be offered.",
    faqs: [
      {
        q: "Is this virgin or cold-pressed oil?",
        a: "Those words are not used here. Write the processing type you need and it will be handled as a requirement to confirm.",
      },
    ],
    units: ["litres", "kg", "tonnes"],
    featured: true,
  },
  {
    id: "ginger",
    slug: "ginger",
    name: "Ginger",
    category: "produce",
    markets: ["global", "domestic"],
    aliases: ["ginger", "fresh ginger"],
    summary: "Fresh ginger for domestic supply and international enquiries.",
    overview: [
      "Ginger is one catalogue item available for both domestic supply and global export discussions. Quality, size and packing follow the market you select.",
      "No variety name, residue status or shelf-life is published beyond what you ask us to confirm.",
    ],
    images: [
      {
        src: "/images/ginger-fresh.jpg",
        alt: "Fresh ginger rhizomes with round slices showing the pale yellow flesh.",
      },
    ],
    specs: [
      { label: "Product", value: "Fresh ginger" },
      { label: "Markets", value: "Global export and domestic supply" },
      { label: "Size or grade", value: confirm },
      { label: "Packing", value: confirm },
    ],
    applications: [
      {
        title: "Fresh trade",
        body: "Wholesale and retail buyers can request a size range and pack.",
      },
      {
        title: "Processing",
        body: "If ginger will be dried or processed, say so in the enquiry.",
      },
    ],
    packing: "Cartons, mesh or another pack can be requested. Net weight is confirmed per order.",
    faqs: [
      {
        q: "Can I enquire for India and for export?",
        a: "Yes. Use the market selector so the quotation asks for a city or a destination country.",
      },
    ],
    units: ["kg", "tonnes"],
  },
  {
    id: "maize",
    slug: "maize",
    name: "Maize",
    category: "grains",
    markets: ["global"],
    aliases: ["maize", "corn", "yellow maize"],
    summary: "Maize grain for international buyer enquiries.",
    overview: [
      "Maize is listed for global export discussions. The photograph shows dried yellow maize cobs for identification only.",
      "Grade, moisture, broken-grain limits and packing are requested specifications. They are not published as tested lot results.",
    ],
    images: [
      {
        src: "/images/maize-cobs.jpg",
        alt: "Pile of dried yellow maize cobs with the husks removed.",
      },
    ],
    specs: [
      { label: "Product", value: "Maize grain" },
      { label: "Market", value: "Global export enquiries" },
      { label: "Grade", value: confirm },
      { label: "Moisture", value: confirm },
      { label: "Packing", value: confirm },
    ],
    applications: [
      {
        title: "Feed or food use",
        body: "State the intended use so the quotation does not assume a grade.",
      },
    ],
    packing: "Bag weight and lot size are part of the enquiry.",
    faqs: [
      {
        q: "Is a moisture percentage published?",
        a: "No. Write the moisture limit you need and it will be confirmed or declined in the quotation.",
      },
    ],
    units: ["kg", "tonnes"],
  },
  {
    id: "ragi",
    slug: "ragi",
    name: "Ragi",
    category: "grains",
    markets: ["global", "domestic"],
    aliases: ["ragi", "finger millet", "finger millets"],
    summary: "Ragi, also called finger millet, for India and for export enquiries.",
    overview: [
      "Ragi and finger millet refer to the same catalogue product. It can be enquired for domestic supply or global export.",
      "Cleanliness, moisture and packing are confirmed for the lot under discussion.",
    ],
    images: [
      {
        src: "/images/ragi-grains.jpg",
        alt: "Reddish-brown ragi (finger millet) grains in a jute sack, a wooden bowl and a scoop, with finger-millet heads behind.",
      },
    ],
    specs: [
      { label: "Product", value: "Ragi (finger millet)" },
      { label: "Markets", value: "Global export and domestic supply" },
      { label: "Grade", value: confirm },
      { label: "Moisture", value: confirm },
      { label: "Packing", value: confirm },
    ],
    applications: [
      {
        title: "Food grain supply",
        body: "Flour mills, packers and traders can describe the cleanliness and pack they need.",
      },
    ],
    packing: "Bag size is a request until a quotation confirms it.",
    faqs: [
      {
        q: "Is ragi the same as finger millet?",
        a: "Yes. Search and filters treat both names as this product.",
      },
    ],
    units: ["kg", "tonnes"],
    enquiryNames: ["Ragi", "Finger millet"],
  },
  {
    id: "coconut-plants",
    slug: "coconut-plants",
    name: "Coconut Plant",
    category: "coconuts",
    markets: ["domestic"],
    aliases: ["coconut plant", "coconut plants", "coconut seedling", "coconut seedlings"],
    summary: "Coconut seedlings for planting enquiries inside India.",
    overview: [
      "Coconut plants on this site are seedlings for domestic supply. Variety, age, bag size and a delivery town are confirmed before any dispatch is discussed.",
      "The nursery photograph is a licensed reference image. It is not a photograph of an NR-owned farm.",
    ],
    images: [
      {
        src: "/images/coconut-seedlings.jpg",
        alt: "Rows of young coconut seedlings growing in nursery bags.",
      },
    ],
    specs: [
      { label: "Product", value: "Coconut seedling" },
      { label: "Market", value: "Domestic supply" },
      { label: "Variety", value: confirm },
      { label: "Age and height", value: confirm },
      { label: "Delivery town", value: "Share it in the quotation" },
    ],
    applications: [
      {
        title: "Planting",
        body: "Tell us the number of seedlings, the town and the date you hope to receive them. The date is a request, not a booking.",
      },
    ],
    packing: "Nursery bags and transport protection are discussed with the delivery town. Survival in transit is not guaranteed on this page.",
    faqs: [
      {
        q: "Are seedlings offered for export?",
        a: "This listing is for supply inside India. International plant shipments are not described here.",
      },
    ],
    units: ["seedlings"],
    enquiryNames: ["Coconut plant"],
  },
  {
    id: "tender-coconuts",
    slug: "tender-coconuts",
    name: "Tender Coconut",
    category: "coconuts",
    markets: ["domestic"],
    aliases: ["tender coconut", "thunder coconut", "green coconut", "tender coconuts"],
    summary: "Young green coconuts for drinking and fresh domestic trade.",
    overview: [
      "Tender coconut is the young green nut, distinct from mature coconuts.",
      "The original list used the name thunder coconut. That name is treated as tender coconut on this website until the business confirms a different meaning.",
    ],
    images: [
      {
        src: "/images/tender-coconut-pile.jpg",
        alt: "Fresh green tender coconuts harvested in bulk for drinking and domestic supply.",
      },
      {
        src: "/images/tender-coconut-boat.jpg",
        alt: "Harvested tender coconuts transported by boat along tropical coconut waterways.",
      },
    ],
    specs: [
      { label: "Product", value: "Tender green coconut" },
      { label: "Market", value: "Domestic supply" },
      { label: "Also requested as", value: "Thunder coconut" },
      { label: "Maturity and water", value: confirm },
      { label: "Count", value: "Share the quantity" },
    ],
    applications: [
      {
        title: "Fresh drinking nuts",
        body: "Retail and event buyers can request a count and a delivery town.",
      },
    ],
    packing:
      "Tender nuts are perishable. Any holding time must be confirmed for the season and the journey. No shelf-life is promised here.",
    faqs: [
      {
        q: "What is thunder coconut?",
        a: "In this draft it means tender coconut, the young green nut. If you need a different nut, say so in the message.",
      },
    ],
    units: ["pieces"],
    enquiryNames: ["Thunder coconut"],
  },
  {
    id: "copra",
    slug: "copra",
    name: "Copra",
    category: "copra",
    markets: ["domestic"],
    aliases: ["copra", "domestic copra", "copra cups"],
    summary: "Dried coconut kernel for domestic trade, separate from the export edible-copra listing.",
    overview: [
      "This copra page is for supply inside India. Export edible copra and ball copra have their own page, and dry coconut in the shell is separate again.",
      "Tell us whether you need cups, balls or another kernel form. The quotation will say which form can be discussed.",
    ],
    images: [
      {
        src: "/images/copra-halves.jpg",
        alt: "Halved dry coconut cups of copra with brown outer skin and white kernel.",
      },
      {
        src: "/images/copra-store.jpg",
        alt: "Copra heaped in a storage shed with a conveyor for loading.",
      },
    ],
    specs: [
      { label: "Product", value: "Copra (dried kernel)" },
      { label: "Market", value: "Domestic supply" },
      { label: "Form", value: confirm },
      { label: "Moisture", value: confirm },
      { label: "Packing", value: confirm },
    ],
    applications: [
      {
        title: "Trading and processing",
        body: "Mills and traders can state moisture, form and bag size as requirements.",
      },
    ],
    packing: "Bag type and net weight are enquiry items.",
    faqs: [
      {
        q: "Should I use the edible copra page instead?",
        a: "Use this page for domestic supply. Use Edible Copra if the enquiry is for international trade or for ball copra as an export form.",
      },
    ],
    units: ["kg", "tonnes"],
  },
  {
    id: "tomatoes",
    slug: "tomatoes",
    name: "Tomato",
    category: "produce",
    markets: ["domestic"],
    aliases: ["tomato", "tomatoes", "tamato", "tamatos"],
    summary: "Fresh tomatoes for domestic wholesale and retail enquiries.",
    overview: [
      "Tomato is listed for supply inside India. The spelling tamato in the original list points to this product.",
      "Size, ripeness and packing change with the season. Share the town and the date you need, and both will be treated as requests.",
    ],
    images: [
      {
        src: "/images/tomatoes-koyambedu.jpg",
        alt: "Crates of ripe red tomatoes at a wholesale vegetable market.",
      },
    ],
    specs: [
      { label: "Product", value: "Fresh tomato" },
      { label: "Market", value: "Domestic supply" },
      { label: "Size and ripeness", value: confirm },
      { label: "Packing", value: confirm },
    ],
    applications: [
      {
        title: "Wholesale and retail",
        body: "Request crate or carton packing and a delivery town. Coverage is not claimed until the quotation says so.",
      },
    ],
    packing: "Fresh produce timing is confirmed per enquiry. No standing delivery schedule is published.",
    faqs: [
      {
        q: "Are tomatoes exported?",
        a: "This listing is domestic. An export requirement would need to be asked as a separate confirmation.",
      },
    ],
    units: ["kg", "crates"],
    enquiryNames: ["Tamato"],
  },
];

export function getProduct(idOrSlug: string) {
  return products.find((product) => product.id === idOrSlug || product.slug === idOrSlug);
}

export function productsForMarket(market: Market) {
  return products.filter((product) => product.markets.includes(market));
}

export function relatedProducts(product: Product, limit = 3) {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const rest = products.filter(
    (item) => item.category !== product.category && item.id !== product.id,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}
