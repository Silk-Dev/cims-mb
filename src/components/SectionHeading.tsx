import { Reveal } from './Reveal'

type Props = {
  eyebrow?: string | null
  title?: string | null
  text?: string | null
  align?: 'start' | 'center'
  tone?: 'light' | 'dark'
}

export function SectionHeading({ eyebrow, title, text, align = 'start', tone = 'light' }: Props) {
  const dark = tone === 'dark'
  return (
    <Reveal className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p
          className={`mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] ${
            dark ? 'text-cyan-300' : 'text-blue-500'
          }`}
        >
          <span className={`h-px w-8 ${dark ? 'bg-cyan-300' : 'bg-blue-500'}`} />
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className={`font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl ${
            dark ? 'text-white' : 'text-navy-900'
          }`}
        >
          {title}
        </h2>
      )}
      {text && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/65' : 'text-muted'}`}>
          {text}
        </p>
      )}
    </Reveal>
  )
}
