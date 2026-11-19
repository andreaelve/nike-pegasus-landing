export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4">
      <span className="text-lg font-bold tracking-tight">nike</span>
      <button
        type="button"
        aria-label="View bag"
        className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-900"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            d="M6 8h12l1 13H5L6 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 8a3 3 0 0 1 6 0"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </header>
  );
}
