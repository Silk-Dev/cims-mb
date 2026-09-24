import Image from 'next/image'

import type { Dictionary } from '@/lib/dictionary'
import { type Locale, localizeHref } from '@/lib/i18n'
import type { Faq as FaqDoc, Media, Page, Service } from '@/payload-types'

import { CtaBanner } from './CtaBanner'
import { Faq } from './Faq'
import { Reveal } from './Reveal'
import { RichText } from './RichText'
import { SectionHeading } from './SectionHeading'
import { ServiceCard } from './ServiceCard'
import { Stats } from './Stats'

type Block = NonNullable<Page['layout']>[number]

type Props = {
  blocks: Block[]
  locale: Locale
  t: Dictionary
  allServices: Service[]
  allFaqs: FaqDoc[]
}

const isObj = <T,>(v: unknown): v is T => !!v && typeof v === 'object'

/** Renders the flexible "layout" blocks editors compose in Payload. */
export function Blocks({ blocks, locale, t, allServices, allFaqs }: Props) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'content':
            return (
              <section key={block.id} className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
                {block.heading && <SectionHeading title={block.heading} />}
                <Reveal className={block.heading ? 'mt-8' : ''}>
                  <RichText data={block.body} />
                </Reveal>
              </section>
            )
          case 'imageText': {
            const img = isObj<Media>(block.image) ? block.image : null
            return (
              <section
                key={block.id}
                className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2"
              >
                <Reveal
                  className={block.imagePosition === 'start' ? 'lg:order-first' : 'lg:order-last'}
                >
                  {img?.url && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    </div>
                  )}
                </Reveal>
                <div>
                  {block.heading && <SectionHeading title={block.heading} />}
                  <Reveal className="mt-6">
                    <RichText data={block.body} />
                  </Reveal>
                </div>
              </section>
            )
          }
          case 'servicesGrid': {
            const picked = (block.services ?? []).filter(isObj<Service>)
            const list = picked.length ? picked : allServices
            return (
              <section key={block.id} className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
                {block.heading && <SectionHeading title={block.heading} />}
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((s, i) => (
                    <ServiceCard
                      key={s.id}
                      index={i}
                      href={localizeHref(`/services/${s.slug}`, locale)}
                      title={s.title}
                      tagline={s.tagline}
                      excerpt={s.excerpt}
                      visual={s.visual}
                      cta={t.viewService}
                    />
                  ))}
                </div>
              </section>
            )
          }
          case 'stats':
            return (
              <section key={block.id} className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
                <Stats
                  items={(block.items ?? []).map((s) => ({
                    value: s.value,
                    suffix: s.suffix,
                    label: s.label,
                  }))}
                />
              </section>
            )
          case 'faq': {
            const picked = (block.faqs ?? []).filter(isObj<FaqDoc>)
            const list = picked.length ? picked : allFaqs
            return (
              <section key={block.id} className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
                {block.heading && <SectionHeading title={block.heading} />}
                <div className="mt-10">
                  <Faq
                    items={list.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
                  />
                </div>
              </section>
            )
          }
          case 'cta':
            return (
              <CtaBanner
                key={block.id}
                title={block.heading}
                text={block.text}
                bookLabel={block.buttonLabel || t.book}
                bookHref={localizeHref(block.buttonHref || '/contact', locale)}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
