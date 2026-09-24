import { Reveal } from './Reveal'

type Props = {
  eyebrow?: string | null
  title: string
  intro?: string | null
  children?: React.ReactNode
}

/** Dark header band for inner pages, echoing the hero's gantry rings. */
export function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="noise relative isolate overflow-hidden bg-navy-950 pb-20 pt-40 text-white sm:pb-28 sm:pt-48">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute -top-32 end-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-blue-600/30 blur-[120px]" />
      <svg
        viewBox="0 0 400 400"
        className="absolute -end-40 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-y-1/2 animate-spin-slower opacity-40"
        aria-hidden="true"
      >
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#2fa8e4"
          strokeWidth="26"
          strokeDasharray="900 231"
          strokeOpacity=".35"
        />
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="#6fd0f5"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        <circle cx="200" cy="200" r="110" fill="none" stroke="#6fd0f5" strokeOpacity=".4" />
      </svg>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {eyebrow && (
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
              <span className="h-px w-8 bg-cyan-300" />
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
