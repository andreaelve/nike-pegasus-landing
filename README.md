# Nike Pegasus 43 — Mobile Landing Page

A mobile-first product landing page for the Nike Pegasus 43 running shoe, built with Next.js and Tailwind CSS and seeded from a real stock/inventory JSON file.

## Project

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 (PostCSS integration)
- **Fonts:** `next/font` (Geist / Geist Mono), loaded with zero layout shift
- **Data source:** `src/data/stock.json` — 26 size variants (SKU, price, size labels, stock status/quantity, launch date) for a single colorway of the Pegasus 43

## The task / problem

Design and build a phone-first ecommerce landing page for a single shoe, driven entirely by real stock data, with two hard constraints:

1. **No layout shift (CLS).** Photos, fonts, and size buttons must reserve their final space *before* their content (images, web fonts) finishes loading, so the page never jumps as things load in.
2. **Inventory-aware sizing.** Sizes that are sold out must be visibly disabled, and sizes running low must warn the shopper ("only x left in stock") the moment they're selected — without that warning's absence/presence shifting anything else on screen.

The content order was planned around the mobile shopping journey — Photos → Price → Sizes → Tech Copy → Reviews — mirroring how a runner on a 375px phone screen actually evaluates a shoe: see it, check the price, pick a size, read why it's good, confirm with social proof.

## The solution

- **Photos** — a swipeable, scroll-snap carousel in a fixed `aspect-square` box, so the box's height is locked to its width before any image decodes. A skeleton pulse placeholder fills that exact box until each image reports loaded (handled correctly for both network loads and already-cached images, via an `img.complete` check in a ref callback, since cached images can fire their `load` event before React attaches its listener). The colorway name sits as a caption directly underneath the photo carousel.
- **Price** — product name, style code, and price, pulled straight from the stock data.
- **Sizes** — a fixed 4-column grid with a fixed row height, so the grid's size never changes regardless of which size is selected. Sold-out sizes are disabled and struck through; selecting a low-stock size reveals a message in a dedicated, fixed-height slot below the grid ("Only x left in stock!") that never pushes the page content below it.
- **Tech copy** — feature highlights (cushioning, Air unit, mesh upper, outsole).
- **Reviews** — star ratings and customer quotes, with a "load more" affordance.
- **Add to Bag** — a `position: sticky` bottom bar showing the live price for the selected size, or a prompt to pick one.
- **Fonts** — loaded via `next/font`, which self-hosts and size-matches fallback fonts automatically, avoiding font-swap layout shift.

## How to run it

```bash
cd nike-pegasus-landing
npm install
npm run dev
```

Then open **http://localhost:3000**. The page is designed mobile-first — for the intended view, open dev tools and set the viewport to **375px wide**.

## Project structure

```
src/
  app/            Next.js App Router entry (layout.tsx, page.tsx)
  components/     Header, PhotoGallery, PriceSection, SizeGrid, TechCopySection,
                   ReviewsSection, AddToBagBar, ProductLanding (composition root)
  data/           stock.json (copy of the source stock file, imported at build time)
  lib/            stock.ts — loads/sorts stock data, derives product info, formatters
  types/          stock.ts — TypeScript types for stock/product data
public/images/    Placeholder product photos (SVG)
```

See [PROMPT_NOTES.md](./PROMPT_NOTES.md) for the prompts used to plan and build this project.
