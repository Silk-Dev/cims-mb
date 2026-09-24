import Link from 'next/link'

import { Gantry } from '@/components/Gantry'

// Rendered inside the [locale] layout; kept bilingual since params are unavailable here.
export default function NotFound() {
  return (
    <section className="noise relative flex min-h-[90svh] items-center overflow-hidden bg-navy-950 pt-28 text-white">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="font-display text-8xl font-extrabold text-gradient sm:text-9xl" dir="ltr">
            404
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold">
            Page introuvable · الصفحة غير موجودة
          </h1>
          <p className="mt-4 text-white/60">
            Cette image n’apparaît sur aucun de nos clichés… · هذه الصورة لا تظهر في أي من صورنا.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/fr"
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 font-semibold"
            >
              Accueil
            </Link>
            <Link
              href="/ar"
              className="rounded-full border border-white/20 px-6 py-3 font-semibold"
            >
              الرئيسية
            </Link>
          </div>
        </div>
        <Gantry className="mx-auto w-full max-w-md opacity-80" />
      </div>
    </section>
  )
}
