import rawStock from "@/data/stock.json";
import type { Product, SizeVariant } from "@/types/stock";

const variants = rawStock as SizeVariant[];

export const sizes: SizeVariant[] = [...variants].sort(
  (a, b) => a.display_order - b.display_order,
);

export const product: Product = {
  name: sizes[0].product_name,
  styleCode: sizes[0].style_code,
  colorway: sizes[0].colorway,
  price: sizes[0].price,
  launchDate: sizes[0].launch_date,
};

export function formatPrice(price: number): string {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function formatLaunchDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
