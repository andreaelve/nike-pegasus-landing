# Nike Pegasus 43 — Mobile Landing Page

A mobile-first product landing page for the Nike Pegasus 43 running shoe, built with Next.js and Tailwind CSS and seeded from a real stock/inventory JSON file.

## Prompt notes

Plan prompt, word for word:

> Write me plan for a phone-first landing page for Nike's customers to buy the new Pegasus 43 running shoe. Place the content in this order: Photos, Price, Sizes, Tech Copy, Reviews. Use the stock list information in nike_pegasus_size_stock.json for the content. Ensure there's to layout-shifts, including holding space for photos and fonts when loading. Give me the plan in headed sections, with each part's order and size at 375 pixels wide.

Build prompt, word for word:

> Following the plan made up in "Nike Pegasus 43 — Mobile Landing Page Plan", build me the Nike shoe landing page using Next.js and styling with Tailwind CSS with a mobile first approach, and seed it with the information provided in the nike_pegasus_size_stock_b2ebb9fac7f74d6a8bb3432d7642176f.json file. For shoe sizes low in stock, give the user a notice if they select a size thats running out by providing a simple message underneath saying "only x left in stock". Name the color of the shoe as a sub title underneath the picture. The layout should hold space for the photos and size buttons, so when the media loads in the layout wont shift.

At 375px wide, Claude Code's first pass already had the right section order and a reserved-space photo box and size grid, so no layout shift showed up right away. I kept that structure as-is. What I changed: the colorway caption, which Claude Code had first placed near the price, got moved underneath the photo carousel per the prompt, and a real bug — the photo skeleton never fading out for already-cached images — got fixed after I spotted it in manual testing.

Mobile check prompt, word for word:

> Using this mobile_check_profile.yaml, record the Slow 4G phone trace with Chrome DevTools MCP. Use a phone screen 375px wide with a 4x CPU slowdown. Report back to me the results. In your report, if the size_grid_shift_px_max fails, report back what causes that shift.

The trace itself came back clean — CLS 0.00, no `layout-shift` events — but the automated check still failed on the first run, and not because of an actual pixel shift: the page had none of the five `data-testid` selectors the check's profile (`Web Platform Slow 4G Mobile Check Profile.yaml`) requires it to read from, and `speed-budget.json` didn't exist at the repo root at all. Two changes made the check pass:
- Added `data-testid="size-grid"`, `"size-button"` / `"size-button-sold-out"`, `"main-photo"` (on the first, eager-loaded photo), and `"price"` to the elements the profile watches.
- Added `speed-budget.json` at the repo root with the three required keys (`performance_score_min: 90`, `size_grid_shift_px_max: 0`, `size_button_min_px: 44`) — none looser than the profile's required values, per its policy.

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
