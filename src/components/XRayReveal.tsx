'use client'

import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { Reveal } from './Reveal'

const BODY =
  'M170 100 L170 120 C120 128 80 140 70 180 L58 320 C56 350 70 355 78 330 L96 200 L110 205 C112 260 118 300 116 340 C112 380 118 420 130 470 L270 470 C282 420 288 380 284 340 C282 300 288 260 290 205 L304 200 L322 330 C330 355 344 350 342 320 L330 180 C320 140 280 128 230 120 L230 100 Z'

function Silhouette({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <>
      <ellipse cx="200" cy="62" rx="36" ry="44" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <path d={BODY} fill={fill} stroke={stroke} strokeWidth="1.5" />
    </>
  )
}

function HalfRibs() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        const y = 150 + i * 19
        const w = 64 - Math.abs(i - 3) * 3
        return (
          <path
            key={i}
            d={`M194 ${y} C ${194 - w * 0.6} ${y - 10}, ${194 - w} ${y + 6}, ${194 - w + 4} ${y + 34}`}
            stroke="#e6f7ff"
            strokeOpacity={0.85 - i * 0.04}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        )
      })}
      <path
        d="M198 134 Q160 126 126 144"
        stroke="#e6f7ff"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M86 186 L70 318" stroke="#e6f7ff" strokeWidth="9" strokeLinecap="round" />
      <circle cx="88" cy="182" r="10" fill="#e6f7ff" fillOpacity=".8" />
    </>
  )
}

function Skeleton() {
  return (
    <g filter="url(#xr-glow)">
      <ellipse cx="200" cy="58" rx="29" ry="36" fill="none" stroke="#e6f7ff" strokeWidth="5" />
      <circle cx="188" cy="56" r="7" fill="#e6f7ff" fillOpacity=".25" />
      <circle cx="212" cy="56" r="7" fill="#e6f7ff" fillOpacity=".25" />
      <path d="M182 86 Q200 100 218 86" stroke="#e6f7ff" strokeWidth="4" fill="none" />
      {Array.from({ length: 25 }).map((_, i) => (
        <rect
          key={i}
          x="193"
          y={108 + i * 12}
          width="14"
          height="9"
          rx="3"
          fill="#e6f7ff"
          fillOpacity={0.95 - i * 0.012}
        />
      ))}
      <rect x="195" y="146" width="10" height="84" rx="5" fill="#e6f7ff" fillOpacity=".55" />
      <HalfRibs />
      <g transform="translate(400 0) scale(-1 1)">
        <HalfRibs />
      </g>
      <path
        d="M150 402 C128 422 138 462 176 470 L200 452 L224 470 C262 462 272 422 250 402 C230 418 170 418 150 402 Z"
        fill="#e6f7ff"
        fillOpacity=".25"
        stroke="#e6f7ff"
        strokeWidth="4"
      />
      <ellipse cx="216" cy="232" rx="26" ry="30" fill="#ff7a93" fillOpacity=".35">
        <animate attributeName="rx" values="24;29;24" dur="1.1s" repeatCount="indefinite" />
        <animate attributeName="ry" values="28;33;28" dur="1.1s" repeatCount="indefinite" />
      </ellipse>
    </g>
  )
}

type Props = { title?: string | null; text?: string | null; hint?: string | null }

export function XRayReveal({ title, text, hint }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(200)
  const y = useMotionValue(240)
  const [hovering, setHovering] = useState(false)
  const mask = useMotionTemplate`radial-gradient(circle 95px at ${x}px ${y}px, #000 96%, transparent 100%)`

  // Idle animation: the lens wanders over the body until the user takes control.
  useEffect(() => {
    if (hovering || reduce) return
    const el = box.current
    if (!el) return
    const w = el.clientWidth
    const h = el.clientHeight
    const ax = animate(x, [w * 0.5, w * 0.35, w * 0.62, w * 0.5], {
      duration: 9,
      repeat: Infinity,
      ease: 'easeInOut',
    })
    const ay = animate(y, [h * 0.2, h * 0.45, h * 0.6, h * 0.2], {
      duration: 9,
      repeat: Infinity,
      ease: 'easeInOut',
    })
    return () => {
      ax.stop()
      ay.stop()
    }
  }, [hovering, reduce, x, y])

  return (
    <section className="noise relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="absolute start-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              <span className="text-gradient">{title}</span>
            </h2>
          </Reveal>
          {text && (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">{text}</p>
            </Reveal>
          )}
          {hint && (
            <Reveal delay={0.2}>
              <p className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-cyan-200">
                <span className="relative grid h-5 w-5 place-items-center rounded-full border border-cyan-300/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                </span>
                {hint}
              </p>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1}>
          <div
            ref={box}
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              x.set(e.clientX - r.left)
              y.set(e.clientY - r.top)
            }}
            className="relative mx-auto aspect-[400/520] w-full max-w-md cursor-none select-none"
          >
            <svg
              viewBox="0 0 400 520"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="xr-skin" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#1c5fa3" stopOpacity=".55" />
                  <stop offset="1" stopColor="#102a55" stopOpacity=".4" />
                </linearGradient>
              </defs>
              <Silhouette fill="url(#xr-skin)" stroke="rgba(111,208,245,0.35)" />
            </svg>

            <motion.div
              className="absolute inset-0"
              style={{ WebkitMaskImage: mask, maskImage: mask }}
            >
              <svg
                viewBox="0 0 400 520"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <filter id="xr-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect width="400" height="520" fill="#030a17" />
                <Silhouette fill="rgba(111,208,245,0.08)" stroke="rgba(181,230,251,0.4)" />
                <Skeleton />
              </svg>
            </motion.div>

            <motion.div
              className="pointer-events-none absolute h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-300/80 shadow-[0_0_40px_rgba(111,208,245,0.5),inset_0_0_30px_rgba(111,208,245,0.25)]"
              style={{ left: x, top: y }}
            >
              <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-cyan-300" />
              <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-cyan-300" />
              <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-cyan-300" />
              <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-cyan-300" />
              <span
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.6rem] tracking-widest text-cyan-200/80"
                dir="ltr"
              >
                CIMS · SCAN
              </span>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
