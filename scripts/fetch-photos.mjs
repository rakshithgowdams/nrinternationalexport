// Downloads the freely licensed Wikimedia Commons photographs used on the site
// and writes their attribution to data/image-credits.json.
import sharp from "sharp";
import fs from "node:fs";

const UA = "NRInternationalExportSite/1.0 (contact@nrinternationalexport.com)";

const photos = [
  ["plantation-india.jpg", "Cocos nucifera plantation in continental India (Nagesh).jpg", "Coconut plantation"],
  ["coconut-orchard.jpg", "Coconut tree orchard.JPG", "Coconut orchard"],
  ["coconut-farm-kadakola.jpg", "Coconut farm at Kadakola village.jpg", "Coconut farm, Kadakola, Karnataka"],
  ["coconut-heaps.jpg", "Heaps of coconuts (3187666876).jpg", "Heaps of coconuts under palms"],
  ["coconuts-market.jpg", "Coconuts at Bakin Dogo Market Kaduna North 01.jpg", "Mature coconuts"],
  ["copra-cups.jpg", "Coconut copra.JPG", "Copra cups"],
  ["ball-copra.jpg", "Copra full.JPG", "Whole dry coconut (ball copra)"],
  ["copra-store.jpg", "Copra crop basilan.JPG", "Copra store"],
  ["desiccated-coconut-real.jpg", "Ground coconut seed.jpg", "Ground dried coconut"],
  ["coconut-shell-halves.jpg", "Coconut shell,TamilNadu150.jpg", "Coconut shell halves"],
  ["coconut-oil-bottle.jpg", "Coconut oil bottle in the background of coconuts from Kaleeswari Farm.jpg", "Coconut oil"],
  ["coconut-seedlings.jpg", "Coconut seedlings.JPG", "Coconut seedlings"],
  ["coconut-kalasha.jpg", "Kalasha satyanarayana.jpg", "Coconut on a ritual kalasha"],
  ["semi-husked-andaman.jpg", "Coconuts, Shaheed Island, Andamans.jpg", "Semi-husked coconuts"],
  ["coconut-kernel-halves.jpg", "Coconut shells.jpg", "Halved coconuts with kernel"],
  ["tender-coconut-pile.jpg", "Tender coconut 2.jpg", "Tender coconuts"],
  ["tomatoes-koyambedu.jpg", "India - Koyambedu Market - Tomatoes 02 (3987058522).jpg", "Tomatoes, Koyambedu Market"],
  ["kochi-container-terminal.jpg", "Mogral at the International Container Transshipment Terminal, Kochi.jpg", "Container terminal, Kochi"],
  ["koyambedu-market.jpg", "India - Koyambedu Market - Market 04 (3986889326).jpg", "Koyambedu wholesale market"],
  ["finger-millet-heads.jpg", "Finger millets.jpg", "Finger millet (ragi) heads"],
  ["jute-sacks.jpg", "Jute Bags.jpg", "Jute sacks"],
];

const strip = (html = "") => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const url = (titles) => {
  const u = new URL("https://commons.wikimedia.org/w/api.php");
  u.search = new URLSearchParams({
    action: "query",
    format: "json",
    titles: titles.map((t) => `File:${t}`).join("|"),
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "1600",
  }).toString();
  return u;
};

const info = {};
for (let i = 0; i < photos.length; i += 20) {
  const batch = photos.slice(i, i + 20).map((p) => p[1]);
  const json = await (await fetch(url(batch), { headers: { "User-Agent": UA } })).json();
  const normalized = Object.fromEntries((json.query.normalized ?? []).map((n) => [n.to, n.from]));
  for (const page of Object.values(json.query.pages)) {
    const from = (normalized[page.title] ?? page.title).replace(/^File:/, "");
    info[from] = page;
  }
}

const credits = [];
for (const [file, title, subject] of photos) {
  const page = info[title];
  const ii = page?.imageinfo?.[0];
  if (!ii) throw new Error(`Not found on Commons: ${title}`);
  const m = ii.extmetadata;
  const buf = Buffer.from(await (await fetch(ii.thumburl, { headers: { "User-Agent": UA } })).arrayBuffer());
  await sharp(buf)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(`public/images/${file}`);
  credits.push({
    file: `/images/${file}`,
    subject,
    title,
    author: strip(m.Artist?.value) || "Unknown",
    license: m.LicenseShortName?.value ?? "",
    licenseUrl: m.LicenseUrl?.value ?? "",
    source: ii.descriptionurl,
  });
  console.log(`${file} <- ${title} | ${m.LicenseShortName?.value} | ${strip(m.Artist?.value)}`);
}

fs.writeFileSync("data/image-credits.json", `${JSON.stringify(credits, null, 2)}\n`);
