import { useId } from 'react'

type Props = { variant?: 'light' | 'dark'; className?: string; showText?: boolean; line?: string }

/** Vector recreation of the CIMS mark: the "C" ring framing a CT gantry. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`c-${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0f2a57" />
          <stop offset="0.55" stopColor="#173a70" />
          <stop offset="1" stopColor="#2fa8e4" />
        </linearGradient>
        <linearGradient id={`g-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1f78c1" />
          <stop offset="1" stopColor="#6fd0f5" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke={`url(#c-${id})`}
        strokeWidth="17"
        strokeDasharray="190 49"
        transform="rotate(37 50 50)"
      />
      <circle cx="50" cy="50" r="19" fill="none" stroke={`url(#g-${id})`} strokeWidth="5" />
      <path d="M36 66 Q50 56 64 66 L66 72 H34 Z" fill="#173a70" />
      <rect x="45" y="30" width="10" height="2" rx="1" fill="#2fa8e4" />
      <rect x="46.5" y="34" width="7" height="1.6" rx="0.8" fill="#2fa8e4" />
    </svg>
  )
}

export function Logo({ variant = 'dark', className, showText = true, line = 'Radiologie' }: Props) {
  const light = variant === 'light'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`} dir="ltr">
      <LogoMark className="h-10 w-10 shrink-0" />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-[family-name:var(--font-montserrat)] text-[1.45rem] font-extrabold tracking-tight ${
              light ? 'text-white' : 'text-gradient-dark'
            }`}
          >
            CIMS
          </span>
          <span
            className={`mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.32em] ${
              light ? 'text-cyan-200/80' : 'text-navy-700/70'
            }`}
          >
            {line}
          </span>
        </span>
      )}
    </span>
  )
}
