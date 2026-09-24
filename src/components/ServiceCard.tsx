'use client'

import Link from 'next/link'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'

import { ArrowIcon } from './Icons'
import { ServiceVisual } from './ServiceVisual'

type Props = {
  href: string
  title: string
  tagline?: string | null
  excerpt?: string | null
  visual: string
  index: number
  cta: string
}

/** Card with a live "monitor" visual, a cursor spotlight and a subtle 3D tilt. */
export function ServiceCard({ href, title, tagline, excerpt, visual, index, cta }: Props) {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const rx = useSpring(0, { stiffness: 200, damping: 20 })
  const ry = useSpring(0, { stiffness: 200, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(47,168,228,0.16), transparent 60%)`

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left)
        y.set(e.clientY - r.top)
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 8)
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
      }}
      onPointerLeave={() => {
        rx.set(0)
        ry.set(0)
        x.set(-200)
        y.set(-200)
      }}
      className="group relative"
    >
      <Link
        href={href}
        className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white p-3 shadow-[0_1px_0_rgba(16,42,85,0.04)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(16,42,85,0.45)]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: spotlight }}
        />
        <div className="noise relative aspect-[16/10] overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-navy-900 via-navy-800 to-blue-600">
          <div className="bg-grid absolute inset-0 opacity-60" />
          <div className="absolute -end-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl transition duration-700 group-hover:scale-150" />
          <ServiceVisual
            kind={visual}
            className="absolute inset-0 m-auto h-[78%] w-[78%] transition duration-700 group-hover:scale-110"
          />
          <span
            className="absolute start-4 top-4 font-mono text-[0.65rem] tracking-widest text-cyan-200/70"
            dir="ltr"
          >
            {String(index + 1).padStart(2, '0')} / CIMS
          </span>
        </div>
        <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
          <h3 className="font-display text-xl font-bold text-navy-900">{title}</h3>
          {tagline && <p className="mt-1 text-sm font-medium text-blue-500">{tagline}</p>}
          {excerpt && (
            <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-muted">{excerpt}</p>
          )}
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-navy-800">
            {cta}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ice text-blue-500 transition group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-400 group-hover:text-white">
              <ArrowIcon width={16} height={16} />
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
