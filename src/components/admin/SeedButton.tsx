'use client'

import { useState } from 'react'

export function SeedButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const run = async () => {
    setState('loading')
    try {
      const res = await fetch('/api/seed', { method: 'POST', credentials: 'include' })
      setState(res.ok ? 'done' : 'error')
      if (res.ok) setTimeout(() => window.location.reload(), 800)
    } catch {
      setState('error')
    }
  }

  return (
    <div
      style={{
        marginBottom: 32,
        padding: 24,
        borderRadius: 12,
        border: '1px solid var(--theme-elevation-150)',
        background: 'var(--theme-elevation-50)',
      }}
    >
      <h3 style={{ margin: 0 }}>Le site est vide · الموقع فارغ</h3>
      <p style={{ margin: '8px 0 16px' }}>
        Importer le contenu de départ en français et en arabe (examens, FAQ, articles, textes de
        l’accueil, coordonnées). · استيراد المحتوى الأولي بالفرنسية والعربية.
      </p>
      <button
        type="button"
        className="btn btn--style-primary"
        onClick={run}
        disabled={state === 'loading' || state === 'done'}
      >
        {state === 'loading'
          ? 'Import en cours…'
          : state === 'done'
            ? 'Contenu importé ✔'
            : 'Importer le contenu initial'}
      </button>
      {state === 'error' && (
        <p style={{ color: 'var(--theme-error-500)' }}>
          L’import a échoué. Consultez les logs du serveur.
        </p>
      )}
    </div>
  )
}
