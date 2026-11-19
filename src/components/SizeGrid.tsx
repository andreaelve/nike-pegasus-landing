import type { SizeVariant } from "@/types/stock";

interface SizeGridProps {
  sizes: SizeVariant[];
  selectedSku: string | null;
  onSelect: (sku: string) => void;
}

export default function SizeGrid({ sizes, selectedSku, onSelect }: SizeGridProps) {
  const selected = sizes.find((size) => size.sku === selectedSku) ?? null;
  const lowStockMessage =
    selected && selected.stock_status === "low_stock"
      ? `Only ${selected.stock_quantity} left in stock!`
      : null;

  return (
    <section className="px-4 py-4" aria-label="Select size">
      <div className="flex items-baseline justify-between">
        <h2 className="text-base font-medium text-neutral-900">
          Select size
        </h2>
        <button
          type="button"
          className="text-sm text-neutral-500 underline underline-offset-2"
        >
          Size guide
        </button>
      </div>

      {/* Fixed row height (44px) and gap so the grid's footprint never changes. */}
      <div
        data-testid="size-grid"
        className="mt-3 grid grid-cols-4 gap-2"
        style={{ gridAutoRows: "2.75rem" }}
      >
        {sizes.map((size) => {
          const isSoldOut = size.stock_status === "sold_out";
          const isLowStock = size.stock_status === "low_stock";
          const isSelected = size.sku === selectedSku;

          return (
            <button
              key={size.sku}
              type="button"
              data-testid={isSoldOut ? "size-button-sold-out" : "size-button"}
              disabled={isSoldOut}
              aria-pressed={isSelected}
              onClick={() => onSelect(size.sku)}
              className={`relative flex items-center justify-center rounded-md border px-1 text-[11px] font-medium leading-tight transition-colors ${
                isSoldOut
                  ? "cursor-not-allowed border-neutral-200 text-neutral-300 line-through"
                  : isSelected
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 text-neutral-900 hover:border-neutral-900"
              }`}
            >
              {size.size_label}
              {isLowStock && !isSoldOut && (
                <span
                  aria-hidden="true"
                  className={`absolute right-1 top-1 h-1.5 w-1.5 rounded-full ${
                    isSelected ? "bg-amber-300" : "bg-amber-500"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Reserved message slot: always present at 24px so selecting a size never shifts the bar below. */}
      <div className="mt-2 h-6 text-sm font-medium text-amber-600">
        {lowStockMessage}
      </div>
    </section>
  );
}
