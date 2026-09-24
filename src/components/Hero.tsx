'use client'

import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useRef } from 'react'

import { Gantry } from './Gantry'
import { ArrowIcon, PhoneIcon } from './Icons'

type Props = {
  eyebrow?: string | null
  title: string
  highlight?: string | null
  subtitle?: string | null
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  chips: string[]
  phones: { label: string; href: string }[]
  scrollLabel: string
}

const ease = [0.16, 1, 0.3, 1] as const

function Words({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${className ?? ''}`}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
          >
            {word}
            {' '}
          </motion.span>
        </span>
      ))}
    </>
  )
}

export function Hero({
  eyebrow,
  title,
  highlight,
  subtitle,
  primary,
  secondary,
  chips,
  phones,
  scrollLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const gantryScale = useTransform(scrollYProgress, [0, 1], [1, 1.35])
  const gantryOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 18 })

  const titleWords = title.split(' ').length

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        if (reduce) return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      className="noise relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pb-24 pt-32 text-white"
    >
      {/* Background */}
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 start-1/3 -z-10 h-[38rem] w-[38rem] rounded-full bg-blue-600/30 blur-[140px]" />
      <div className="absolute -bottom-48 end-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-cyan-400/20 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
        <motion.div style={{ y: textY }} className="relative z-10">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
              </span>
              {eyebrow}
            </motion.p>
          )}

          <h1 className="font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl xl:text-[4.25rem]">
            <Words text={title} />
            {highlight && (
              <>
                <br className="hidden sm:block" />
                <Words text={highlight} className="text-gradient" delay={titleWords * 0.06} />
              </>
            )}
          </h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.5 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href={primary.href}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-4 font-semibold text-white shadow-[0_10px_40px_-10px_rgba(47,168,228,0.8)] transition hover:shadow-[0_14px_50px_-8px_rgba(47,168,228,1)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{primary.label}</span>
              <ArrowIcon className="relative transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-semibold text-white/90 backdrop-blur transition hover:border-cyan-300/60 hover:bg-white/5"
            >
              {secondary.label}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/60"
          >
            {phones.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="inline-flex items-center gap-2 transition hover:text-cyan-200"
                dir="ltr"
              >
                <PhoneIcon width={16} height={16} className="text-cyan-300" />
                {p.label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-28 -z-10 mx-auto w-full max-w-none opacity-25 lg:pointer-events-auto lg:relative lg:inset-auto lg:top-auto lg:z-0 lg:opacity-100">
          <motion.div style={{ scale: gantryScale, opacity: gantryOpacity }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.6, ease }}
              style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
              className="relative mx-auto aspect-square w-full max-w-[640px]"
            >
              <div className="absolute inset-[18%] rounded-full bg-cyan-400/20 blur-[80px]" />
              <Gantry className="relative h-full w-full" />
              {chips.slice(0, 4).map((chip, i) => {
                const pos = [
                  'top-[8%] start-[4%]',
                  'top-[18%] end-[0%]',
                  'bottom-[22%] start-[-2%]',
                  'bottom-[8%] end-[8%]',
                ][i]
                return (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, y: 10 }}
                    animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -10, 0] }}
                    transition={{
                      opacity: { delay: 1.2 + i * 0.15, duration: 0.6 },
                      y: {
                        delay: 1.2 + i * 0.15,
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    className={`absolute ${pos} hidden items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-2xl backdrop-blur-md lg:inline-flex`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(111,208,245,0.8)]" />
                    {chip}
                  </motion.span>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/40 md:[@media(min-height:960px)]:flex"
      >
        {scrollLabel}
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-cyan-300"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
