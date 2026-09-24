'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

function Counter({ value, suffix }: { value: number; suffix?: string | null }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export function Stats({
  items,
}: {
  items: { value: number; suffix?: string | null; label: string }[]
}) {
  if (!items.length) return null
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-line bg-line lg:grid-cols-4">
      {items.map((item, i) => (
        <div key={i} className="group relative bg-white p-6 sm:p-10">
          <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-transform duration-700 group-hover:scale-x-100 rtl:origin-right" />
          <div className="font-display text-4xl font-extrabold text-navy-900 sm:text-6xl">
            <span className="text-gradient-dark">
              <Counter value={item.value} suffix={item.suffix} />
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-muted sm:text-base">{item.label}</p>
        </div>
      ))}
    </div>
  )
}
