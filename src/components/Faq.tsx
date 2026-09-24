'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { PlusIcon } from './Icons'

export function Faq({
  items,
}: {
  items: { id: string | number; question: string; answer: string }[]
}) {
  const [open, setOpen] = useState<string | number | null>(items[0]?.id ?? null)
  return (
    <div className="divide-y divide-line rounded-[2rem] border border-line bg-white">
      {items.map((item) => {
        const isOpen = open === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 px-6 py-6 text-start sm:px-8"
            >
              <span className="font-display text-lg font-semibold text-navy-900">
                {item.question}
              </span>
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${
                  isOpen
                    ? 'rotate-45 bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                    : 'bg-ice text-blue-500'
                }`}
              >
                <PlusIcon width={18} height={18} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-7 text-base leading-relaxed text-muted sm:px-8">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
