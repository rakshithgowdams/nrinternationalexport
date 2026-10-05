# Photographs

One AI-generated illustration is used, at the client's request: `coconut-sacks-india.jpg` in the home page process section (cropped to remove mislabelled "Product of Philippines" cartons and the generator watermark). Replace it with a real packing photograph when one is available.

- **Wikimedia Commons photographs** are listed with author, licence and source in `data/image-credits.json`, which feeds the public `/image-credits` page. Keep that page linked in the footer; the CC BY and CC BY-SA licences require the credit.
- **Business-supplied photographs**: `coconut-halves.jpg`, `copra-halves.jpg`, `semi-husked-coconut-pile.jpg`, `ginger-fresh.jpg`, `ragi-grains.jpg`, `maize-cobs.jpg`. Confirm the business owns or has licensed each one before launch.

To re-download the Commons set (for example after changing a choice), edit the list in `scripts/fetch-photos.mjs` and run:

```
node scripts/fetch-photos.mjs
```

The best long-term option is real photographs of NR stock, packing and the sourcing region; swap them in file by file.

The logo files in `public/brand` are the supplied lockup. The certificate badges in `public/certificates` were supplied by the business.
