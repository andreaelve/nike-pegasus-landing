"use client";

import { useState } from "react";
import type { Product, SizeVariant } from "@/types/stock";
import { formatPrice } from "@/lib/stock";
import Header from "@/components/Header";
import PhotoGallery from "@/components/PhotoGallery";
import PriceSection from "@/components/PriceSection";
import SizeGrid from "@/components/SizeGrid";
import TechCopySection from "@/components/TechCopySection";
import ReviewsSection from "@/components/ReviewsSection";
import AddToBagBar from "@/components/AddToBagBar";

interface ProductLandingProps {
  product: Product;
  sizes: SizeVariant[];
}

const photos = [
  { src: "/images/pegasus-1.svg", alt: "Nike Pegasus 43, front angle" },
  { src: "/images/pegasus-2.svg", alt: "Nike Pegasus 43, side profile" },
  { src: "/images/pegasus-3.svg", alt: "Nike Pegasus 43, outsole tread" },
];

export default function ProductLanding({ product, sizes }: ProductLandingProps) {
  const [selectedSku, setSelectedSku] = useState<string | null>(null);
  const selected = sizes.find((size) => size.sku === selectedSku) ?? null;

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header />
      <main>
        <PhotoGallery photos={photos} colorway={product.colorway} />
        <PriceSection
          name={product.name}
          styleCode={product.styleCode}
          priceLabel={formatPrice(product.price)}
        />
        <SizeGrid
          sizes={sizes}
          selectedSku={selectedSku}
          onSelect={setSelectedSku}
        />
        <TechCopySection />
        <ReviewsSection />
      </main>
      <AddToBagBar selected={selected} />
    </div>
  );
}
