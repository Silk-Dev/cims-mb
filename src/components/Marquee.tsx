export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-line bg-white py-6" dir="ltr">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <div className="marquee-track flex w-max animate-marquee items-center gap-10">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-bold text-navy-900/80 sm:text-3xl"
          >
            {item}
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
              <circle
                cx="10"
                cy="10"
                r="8"
                fill="none"
                stroke="#2fa8e4"
                strokeWidth="3"
                strokeDasharray="38 12"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
