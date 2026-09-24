import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic, Inter, Montserrat } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { FloatingActions } from '@/components/FloatingActions'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SmoothScroll } from '@/components/SmoothScroll'
import { getDictionary } from '@/lib/dictionary'
import { dirOf, isLocale, telHref } from '@/lib/i18n'
import { getNavigation, getServices, getSettings } from '@/lib/payload'

import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

export const revalidate = 60

// Pages are rendered on first request and then cached (ISR), so building does not need the database.
export function generateStaticParams() {
  return []
}

export const viewport: Viewport = { themeColor: '#050f22' }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const settings = await getSettings(locale)
  const base = process.env.SITE_URL || 'http://localhost:3000'
  return {
    metadataBase: new URL(base),
    title: {
      default: `${settings.siteName} — ${locale === 'ar' ? 'منزل بورقيبة' : 'Menzel Bourguiba'}`,
      template: `%s · ${settings.siteName}`,
    },
    description: settings.seoDescription ?? undefined,
    alternates: { languages: { fr: '/fr', ar: '/ar' } },
    openGraph: {
      siteName: settings.siteName ?? 'CIMS Radiologie',
      locale: locale === 'ar' ? 'ar_TN' : 'fr_TN',
      type: 'website',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const t = getDictionary(locale)
  const [settings, nav, services] = await Promise.all([
    getSettings(locale),
    getNavigation(locale),
    getServices(locale),
  ])
  const mainPhone = settings.phoneOffice || settings.phoneMobile
  const whatsappHref = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`
    : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: settings.siteName,
    description: settings.seoDescription,
    medicalSpecialty: 'Radiology',
    telephone: [settings.phoneOffice, settings.phoneMobile].filter(Boolean),
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '15 Avenue Mongi Slim',
      postalCode: '7050',
      addressLocality: 'Menzel Bourguiba',
      addressRegion: 'Bizerte',
      addressCountry: 'TN',
    },
    availableService: services.map((s) => ({ '@type': 'MedicalProcedure', name: s.title })),
    sameAs: [settings.facebook, settings.instagram].filter(Boolean),
  }

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${inter.variable} ${montserrat.variable} ${arabic.variable}`}
    >
      <body className="overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          {t.skip}
        </a>
        <SmoothScroll />
        <Header
          locale={locale}
          links={(nav.header ?? []).map((l) => ({ label: l.label, href: l.href }))}
          phone={mainPhone ? { label: mainPhone, href: telHref(mainPhone)! } : undefined}
          t={{
            book: t.book,
            menu: t.menu,
            close: t.close,
            switchTo: t.switchTo,
            switchToShort: t.switchToShort,
            brandLine: t.brandLine,
          }}
        />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} settings={settings} nav={nav} services={services} />
        <FloatingActions
          phoneHref={telHref(mainPhone)}
          whatsappHref={whatsappHref}
          labels={{ call: t.call, whatsapp: t.whatsapp }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
