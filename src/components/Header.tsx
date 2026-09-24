'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import type { Locale } from '@/lib/i18n'
import { localizeHref } from '@/lib/i18n'

import { ArrowIcon, PhoneIcon } from './Icons'
import { Logo } from './Logo'

type Props = {
  locale: Locale
  links: { label: string; href: string }[]
  phone?: { label: string; href: string }
  t: {
    book: string
    menu: string
    close: string
    switchTo: string
    switchToShort: string
    brandLine: string
  }
}

export function Header({ locale, links, phone, t }: Props) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const other: Locale = locale === 'fr' ? 'ar' : 'fr'
  const switchHref = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${other}`) || `/${other}`

  const isActive = (href: string) => {
    const full = localizeHref(href, locale)
    return href === '/' ? pathname === full : pathname.startsWith(full)
  }

  const light = !scrolled && !open

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4 sm:py-5'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 sm:px-6 ${
            scrolled
              ? 'mx-3 border border-line/70 bg-white/80 py-2 shadow-[0_8px_30px_-12px_rgba(16,42,85,0.25)] backdrop-blur-xl sm:mx-auto'
              : 'border border-transparent py-2'
          }`}
        >
          <Link href={`/${locale}`} aria-label="CIMS Radiologie" className="shrink-0">
            <Logo variant={light ? 'light' : 'dark'} line={t.brandLine} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={localizeHref(l.href, locale)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  light ? 'text-white/80 hover:text-white' : 'text-navy-800/80 hover:text-navy-900'
                }`}
              >
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 -z-10 rounded-full ${light ? 'bg-white/10' : 'bg-ice'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={switchHref}
              hrefLang={other}
              className={`grid h-10 min-w-10 place-items-center rounded-full border px-3 text-sm font-bold transition ${
                light
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-line text-navy-800 hover:bg-ice'
              }`}
              aria-label={t.switchTo}
              title={t.switchTo}
            >
              {t.switchToShort}
            </Link>
            {phone && (
              <a
                href={phone.href}
                className={`hidden h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold xl:inline-flex ${
                  light ? 'text-white' : 'text-navy-800'
                }`}
                dir="ltr"
              >
                <PhoneIcon width={16} height={16} />
                {phone.label}
              </a>
            )}
            <Link
              href={localizeHref('/contact', locale)}
              className="hidden h-10 items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(47,168,228,0.9)] transition hover:brightness-110 sm:inline-flex"
            >
              {t.book}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? t.close : t.menu}
              className={`relative grid h-10 w-10 place-items-center rounded-full border lg:hidden ${
                light ? 'border-white/20 text-white' : 'border-line text-navy-900'
              }`}
            >
              <span
                className={`absolute h-0.5 w-4 bg-current transition ${open ? 'rotate-45' : '-translate-y-1'}`}
              />
              <span
                className={`absolute h-0.5 w-4 bg-current transition ${open ? '-rotate-45' : 'translate-y-1'}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-white px-6 pb-10 pt-28 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: locale === 'ar' ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <Link
                    href={localizeHref(l.href, locale)}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-b border-line py-4 font-display text-2xl font-bold ${
                      isActive(l.href) ? 'text-blue-500' : 'text-navy-900'
                    }`}
                  >
                    {l.label}
                    <ArrowIcon className="text-cyan-400" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              {phone && (
                <a
                  href={phone.href}
                  className="flex items-center justify-center gap-2 rounded-full border border-line py-4 font-semibold text-navy-900"
                  dir="ltr"
                >
                  <PhoneIcon width={18} height={18} /> {phone.label}
                </a>
              )}
              <Link
                href={localizeHref('/contact', locale)}
                onClick={() => setOpen(false)}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 py-4 text-center font-semibold text-white"
              >
                {t.book}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
