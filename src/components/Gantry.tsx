'use client'

import { motion, useReducedMotion } from 'motion/react'

const ticks = Array.from({ length: 72 })

/**
 * The hero centrepiece: an animated CT gantry drawn from the CIMS "C".
 * An X-ray tube and detector orbit the bore while an axial "slice" lights up inside.
 */
export function Gantry({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  // CSS rotation around the SVG centre (view-box origin is reliable across browsers).
  const spin = (duration: number, reverse = false) => ({
    style: {
      transformOrigin: '300px 300px',
      transformBox: 'view-box' as const,
      animation: reduce
        ? undefined
        : `sv-spin ${duration}s linear infinite${reverse ? ' reverse' : ''}`,
    },
  })

  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gt-c" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0f2a57" />
          <stop offset="0.5" stopColor="#1c5fa3" />
          <stop offset="1" stopColor="#6fd0f5" />
        </linearGradient>
        <radialGradient id="gt-bore" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#6fd0f5" stopOpacity=".28" />
          <stop offset="0.6" stopColor="#1f78c1" stopOpacity=".12" />
          <stop offset="1" stopColor="#050f22" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gt-beam" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#b5e6fb" stopOpacity=".9" />
          <stop offset="1" stopColor="#2fa8e4" stopOpacity="0.05" />
        </linearGradient>
        <filter id="gt-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="gt-clip">
          <circle cx="300" cy="300" r="150" />
        </clipPath>
      </defs>

      {/* Outer "C" housing */}
      <g {...spin(90)}>
        <circle
          cx="300"
          cy="300"
          r="255"
          fill="none"
          stroke="url(#gt-c)"
          strokeWidth="46"
          strokeDasharray="1270 332"
          strokeLinecap="round"
          transform="rotate(37 300 300)"
        />
      </g>

      {/* Tick ring */}
      <g {...spin(70, true)}>
        {ticks.map((_, i) => (
          <line
            key={i}
            x1="300"
            y1={i % 6 === 0 ? 70 : 76}
            x2="300"
            y2="84"
            stroke="#6fd0f5"
            strokeOpacity={i % 6 === 0 ? 0.8 : 0.3}
            strokeWidth={i % 6 === 0 ? 2 : 1}
            transform={`rotate(${i * 5} 300 300)`}
          />
        ))}
      </g>

      {/* Dashed gantry ring */}
      <circle
        cx="300"
        cy="300"
        r="190"
        fill="none"
        stroke="#2fa8e4"
        strokeOpacity=".35"
        strokeWidth="1.5"
        strokeDasharray="2 10"
      />
      <circle
        cx="300"
        cy="300"
        r="172"
        fill="none"
        stroke="#6fd0f5"
        strokeOpacity=".5"
        strokeWidth="2"
      />

      {/* Bore */}
      <circle cx="300" cy="300" r="150" fill="url(#gt-bore)" />

      {/* Axial slice inside the bore */}
      <g clipPath="url(#gt-clip)" opacity=".95">
        <ellipse
          cx="300"
          cy="306"
          rx="108"
          ry="80"
          fill="#6fd0f5"
          fillOpacity=".06"
          stroke="#b5e6fb"
          strokeOpacity=".55"
          strokeWidth="2"
        />
        <path
          d="M232 300c0-34 18-52 40-52 14 0 18 16 18 40v34c0 18-10 30-28 30-20 0-30-22-30-52z"
          fill="#050f22"
          fillOpacity=".55"
          stroke="#6fd0f5"
          strokeOpacity=".5"
        />
        <path
          d="M368 300c0-34-18-52-40-52-14 0-18 16-18 40v34c0 18 10 30 28 30 20 0 30-22 30-52z"
          fill="#050f22"
          fillOpacity=".55"
          stroke="#6fd0f5"
          strokeOpacity=".5"
        />
        <ellipse cx="312" cy="318" rx="26" ry="22" fill="#2fa8e4" fillOpacity=".35" />
        <circle
          cx="300"
          cy="366"
          r="13"
          fill="none"
          stroke="#fff"
          strokeOpacity=".85"
          strokeWidth="3"
        />
        <circle cx="300" cy="366" r="5" fill="#fff" fillOpacity=".5" />
        <motion.rect
          x="150"
          width="300"
          height="3"
          fill="#b5e6fb"
          filter="url(#gt-glow)"
          initial={{ y: 170 }}
          animate={reduce ? undefined : { y: [170, 430, 170] }}
          transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
        />
      </g>

      {/* Orbiting tube + detector + fan beam */}
      <g {...spin(7)}>
        <path d="M300 128 L205 452 A170 170 0 0 0 395 452 Z" fill="url(#gt-beam)" opacity=".16" />
        <rect x="282" y="112" width="36" height="22" rx="6" fill="#b5e6fb" filter="url(#gt-glow)" />
        <path
          d="M205 462 A175 175 0 0 0 395 462"
          fill="none"
          stroke="#6fd0f5"
          strokeWidth="8"
          strokeLinecap="round"
          opacity=".9"
        />
      </g>

      {/* Patient table */}
      <rect x="120" y="428" width="360" height="16" rx="8" fill="#b5e6fb" fillOpacity=".85" />
      <rect x="240" y="444" width="120" height="70" rx="10" fill="#173a70" />
    </svg>
  )
}
