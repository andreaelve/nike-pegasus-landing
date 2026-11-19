import type { SizeVariant } from "@/types/stock";
import { formatPrice } from "@/lib/stock";

interface AddToBagBarProps {
  selected: SizeVariant | null;
}

export default function AddToBagBar({ selected }: AddToBagBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center gap-3 border-t border-neutral-200 bg-white px-4"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <button
        type="button"
        disabled={!selected}
        className={`h-11 flex-1 rounded-full text-sm font-semibold transition-colors ${
          selected
            ? "bg-neutral-900 text-white"
            : "cursor-not-allowed bg-neutral-200 text-neutral-400"
        }`}
      >
        {selected ? `Add to Bag — ${formatPrice(selected.price)}` : "Select a size"}
      </button>
    </div>
  );
}
