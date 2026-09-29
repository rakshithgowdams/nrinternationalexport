import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const source = process.argv[2];
if (!source) {
  console.error("Usage: node scripts/make-icons.mjs <logo.png>");
  process.exit(1);
}

const white = { r: 255, g: 255, b: 255, alpha: 1 };

const mark = await sharp(source)
  .extract({ left: 120, top: 0, width: 650, height: 345 })
  .flatten({ background: white })
  .trim({ background: "#ffffff", threshold: 20 })
  .toBuffer({ resolveWithObject: true });

const side = Math.round(Math.max(mark.info.width, mark.info.height) * 1.08);
const square = await sharp({ create: { width: side, height: side, channels: 4, background: white } })
  .composite([{ input: mark.data, gravity: "center" }])
  .png()
  .toBuffer();

const png = (size) => sharp(square).resize(size, size, { kernel: "lanczos3" }).png().toBuffer();

await writeFile("app/icon.png", await png(512));
await writeFile("app/apple-icon.png", await png(180));
await writeFile("public/icon-192.png", await png(192));
await writeFile("public/icon-512.png", await png(512));

const icoSizes = [16, 32, 48];
const images = await Promise.all(icoSizes.map(png));
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  header.writeUInt8(icoSizes[index], entry);
  header.writeUInt8(icoSizes[index], entry + 1);
  header.writeUInt8(0, entry + 2);
  header.writeUInt8(0, entry + 3);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile("app/favicon.ico", Buffer.concat([header, ...images]));

console.log(`mark ${mark.info.width}x${mark.info.height}, square ${side}px`);
