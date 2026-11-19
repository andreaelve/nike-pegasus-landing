const features = [
  {
    title: "Responsive cushioning",
    body: "A full-length foam midsole soaks up impact and springs back on every stride, from easy miles to tempo days.",
  },
  {
    title: "Forefoot Air unit",
    body: "A visible Air unit under the forefoot adds a quick, springy toe-off without adding weight.",
  },
  {
    title: "Breathable engineered mesh",
    body: "An engineered mesh upper flexes with your foot and keeps air moving over long runs.",
  },
  {
    title: "Durable waffle outsole",
    body: "A waffle-pattern rubber outsole holds traction on roads and light trails, mile after mile.",
  },
];

export default function TechCopySection() {
  return (
    <section className="px-4 py-6" aria-label="Product details">
      <h2 className="text-lg font-medium text-neutral-900">
        Built for the mile and beyond
      </h2>
      <ul className="mt-4 space-y-4">
        {features.map((feature) => (
          <li key={feature.title} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-neutral-100 text-neutral-900"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm leading-snug text-neutral-600">
                {feature.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
