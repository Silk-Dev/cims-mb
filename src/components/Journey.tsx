'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

type Step = { title: string; text?: string | null }

/** Vertical timeline whose progress line fills as you scroll through it. */
export function Journey({ title, steps }: { title?: string | null; steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="bg-grid-light relative bg-ice py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-5xl">
            {title}
          </h2>
        </div>
        <div ref={ref} className="relative ps-14 sm:ps-20">
          <div className="absolute inset-y-2 start-5 w-px bg-line sm:start-7" />
          <motion.div
            style={{ scaleY }}
            className="absolute inset-y-2 start-5 w-px origin-top bg-gradient-to-b from-blue-500 to-cyan-400 sm:start-7"
          />
          <ol className="flex flex-col gap-14">
            {steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span className="absolute -start-14 top-0 grid h-10 w-10 place-items-center rounded-full border border-cyan-300/50 bg-white font-display text-sm font-bold text-blue-500 shadow-[0_0_0_6px_var(--color-ice)] sm:-start-20 sm:h-14 sm:w-14 sm:text-base">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-2xl font-bold text-navy-900">{step.title}</h3>
                {step.text && (
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{step.text}</p>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
