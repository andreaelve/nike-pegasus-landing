"use client";

import { useRef, useState } from "react";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  colorway: string;
}

export default function PhotoGallery({ photos, colorway }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => photos.map(() => false));
  const scrollerRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(index);
  }

  function markLoaded(index: number) {
    setLoaded((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }

  return (
    <section aria-label="Product photos">
      {/* Reserved 1:1 box: height is locked to width before any image decodes. */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className="relative aspect-square w-full flex-none snap-start"
          >
            {/* Skeleton placeholder occupies the exact box until the image reports loaded. */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 animate-pulse bg-neutral-200 transition-opacity duration-300 ${
                loaded[index] ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              ref={(el) => {
                // Cached images can finish loading before this listener attaches,
                // in which case the "load" event never fires — catch that case here.
                if (el?.complete) markLoaded(index);
              }}
              data-testid={index === 0 ? "main-photo" : undefined}
              src={photo.src}
              alt={photo.alt}
              width={800}
              height={800}
              loading={index === 0 ? "eager" : "lazy"}
              onLoad={() => markLoaded(index)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                loaded[index] ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Fixed-height dot strip: always 24px, regardless of photo count. */}
      <div className="flex h-6 items-center justify-center gap-1.5">
        {photos.map((photo, index) => (
          <span
            key={photo.src}
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-neutral-900" : "bg-neutral-300"
            }`}
          />
        ))}
      </div>

      <p className="px-4 pb-1 text-center text-sm text-neutral-500">
        {colorway}
      </p>
    </section>
  );
}
