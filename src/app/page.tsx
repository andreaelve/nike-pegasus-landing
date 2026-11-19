import ProductLanding from "@/components/ProductLanding";
import { product, sizes } from "@/lib/stock";

export default function Home() {
  return <ProductLanding product={product} sizes={sizes} />;
}
