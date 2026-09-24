'use client'

import { useState } from 'react'

export function RefreshButton({ summary }: { summary: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const run = async () => {
    setState('loading')
    try {
      const res = await fetch('/api/revalidate', { method: 'POST', credentials: 'include' })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <div
      style={{
        marginBottom: 32,
        padding: 20,
        borderRadius: 12,
        border: '1px solid var(--theme-elevation-150)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <div>
        <strong>Contenu du site · محتوى الموقع</strong>
        <p style={{ margin: '4px 0 0', opacity: 0.7 }}>{summary}</p>
      </div>
      <button
        type="button"
        className="btn btn--style-secondary"
        style={{ margin: 0 }}
        onClick={run}
        disabled={state === 'loading'}
      >
        {state === 'loading'
          ? 'Rafraîchissement…'
          : state === 'done'
            ? 'Site rafraîchi ✔'
            : state === 'error'
              ? 'Échec — réessayer'
              : 'Rafraîchir le site public'}
      </button>
    </div>
  )
}
