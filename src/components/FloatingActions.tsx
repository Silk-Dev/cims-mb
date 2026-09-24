'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { PhoneIcon, WhatsAppIcon } from './Icons'

/** Quick call / WhatsApp buttons that appear once the visitor scrolls past the hero. */
export function FloatingActions({
  phoneHref,
  whatsappHref,
  labels,
}: {
  phoneHref?: string
  whatsappHref?: string
  labels: { call: string; whatsapp: string }
}) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-5 end-5 z-40 flex flex-col gap-3"
        >
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label={labels.whatsapp}
              className="grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.8)] transition hover:scale-110"
            >
              <WhatsAppIcon width={26} height={26} />
            </a>
          )}
          {phoneHref && (
            <a
              href={phoneHref}
              aria-label={labels.call}
              className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-[0_10px_30px_-8px_rgba(47,168,228,0.9)] transition hover:scale-110"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/40" />
              <PhoneIcon width={22} height={22} className="relative" />
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
