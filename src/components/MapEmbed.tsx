export function MapEmbed({ query, title }: { query: string; title: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`
  return (
    <div className="relative h-full min-h-[360px] overflow-hidden rounded-[2rem] border border-line bg-ice">
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full grayscale-[35%] contrast-[1.05]"
      />
    </div>
  )
}
