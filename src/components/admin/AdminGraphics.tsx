import { LogoMark } from '../Logo'

/** Branding shown on the Payload login screen. */
export function AdminLogo() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      <LogoMark className="cims-admin-mark" />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <strong style={{ fontSize: 30, letterSpacing: '-0.02em', color: 'var(--theme-text)' }}>
          CIMS
        </strong>
        <span
          style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.6 }}
        >
          Radiologie
        </span>
      </span>
    </span>
  )
}

/** Small mark shown in the admin navigation. */
export function AdminIcon() {
  return <LogoMark className="cims-admin-icon" />
}
