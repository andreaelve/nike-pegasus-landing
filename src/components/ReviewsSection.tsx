const reviews = [
  {
    name: "Jordan M.",
    rating: 5,
    body: "My go-to for easy miles. The forefoot feels springy without being mushy, and they held up fine through a wet week of runs.",
  },
  {
    name: "Priya S.",
    rating: 4,
    body: "True to size and comfortable out of the box. Wish the upper breathed a little better on hot days, but overall a solid daily trainer.",
  },
  {
    name: "Theo R.",
    rating: 5,
    body: "Ran a half marathon in these with zero hot spots. Outsole grip has been great on both pavement and gravel paths.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 ${
            index < rating ? "fill-neutral-900" : "fill-neutral-200"
          }`}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.6 6 .7-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L1.4 7.8l6-.7L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const average =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section className="px-4 py-6" aria-label="Reviews">
      <div className="flex min-h-12 items-center gap-2">
        <Stars rating={Math.round(average)} />
        <span className="text-sm font-medium text-neutral-900">
          {average.toFixed(1)}
        </span>
        <span className="text-sm text-neutral-500">
          ({reviews.length} reviews)
        </span>
      </div>

      <ul className="mt-2 space-y-3">
        {reviews.map((review) => (
          <li
            key={review.name}
            className="min-h-32 rounded-lg border border-neutral-200 p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-900">
                {review.name}
              </span>
              <Stars rating={review.rating} />
            </div>
            <p className="mt-2 text-sm leading-snug text-neutral-600">
              {review.body}
            </p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 h-11 w-full rounded-full border border-neutral-300 text-sm font-medium text-neutral-900"
      >
        Load more reviews
      </button>
    </section>
  );
}
