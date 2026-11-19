interface PriceSectionProps {
  name: string;
  styleCode: string;
  priceLabel: string;
}

export default function PriceSection({
  name,
  styleCode,
  priceLabel,
}: PriceSectionProps) {
  return (
    <section className="min-h-28 px-4 py-4" aria-label="Price">
      <h1 className="text-xl font-medium leading-tight text-neutral-900">
        {name}
      </h1>
      <p className="mt-0.5 text-sm text-neutral-500">Style {styleCode}</p>
      <p className="mt-2 text-xl font-semibold text-neutral-900">
        {priceLabel}
      </p>
    </section>
  );
}
