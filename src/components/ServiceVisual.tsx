import type { ServiceVisual as Kind } from '@/collections/Services'

const C = '#6fd0f5'
const C2 = '#2fa8e4'
const W = 'rgba(255,255,255,0.85)'
const HOT = '#ff7a93'

/** Small animated "monitor" illustrations, one per imaging modality. Pure SVG + CSS. */
export function ServiceVisual({ kind, className }: { kind: Kind | string; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`sv-speed ${className ?? ''}`}
      aria-hidden="true"
      fill="none"
    >
      {renderKind(kind)}
    </svg>
  )
}

function renderKind(kind: string) {
  switch (kind) {
    case 'ct':
      return (
        <>
          <circle cx="60" cy="56" r="42" stroke={C2} strokeOpacity=".35" strokeWidth="10" />
          <circle cx="60" cy="56" r="34" stroke={C} strokeWidth="1.5" className="sv-dash sv-spin" />
          <g className="sv-spin" style={{ transformOrigin: '60px 56px', transformBox: 'view-box' }}>
            <path d="M60 56 L60 16" stroke={C} strokeWidth="2" strokeLinecap="round" />
            <circle cx="60" cy="18" r="3" fill={C} />
            <path d="M60 56 L60 16 A40 40 0 0 1 88 28 Z" fill={C} fillOpacity=".12" />
          </g>
          <rect x="14" y="66" width="92" height="7" rx="3.5" fill={W} fillOpacity=".9" />
          <rect x="40" y="74" width="40" height="30" rx="4" fill={C2} fillOpacity=".25" />
          <circle cx="60" cy="56" r="3" fill={W} className="sv-pulse" />
        </>
      )
    case 'mri':
      return (
        <>
          <rect
            x="14"
            y="16"
            width="92"
            height="84"
            rx="22"
            stroke={C2}
            strokeOpacity=".5"
            strokeWidth="2"
          />
          <circle cx="60" cy="54" r="26" stroke={C} strokeWidth="1.5" />
          {[0, 0.8, 1.6].map((d) => (
            <circle
              key={d}
              cx="60"
              cy="54"
              r="24"
              stroke={C}
              strokeWidth="1.2"
              className="sv-ripple"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
          <path
            d="M50 46c2-6 18-6 20 0 4 2 4 8 0 10-1 5-7 7-10 5-3 2-9 0-10-5-4-2-4-8 0-10z"
            stroke={W}
            strokeWidth="1.5"
          />
          <path d="M60 44v20" stroke={W} strokeOpacity=".5" strokeWidth="1" />
          <path d="M22 94h76" stroke={W} strokeOpacity=".6" strokeWidth="3" strokeLinecap="round" />
        </>
      )
    case 'ultrasound':
      return (
        <>
          <path
            d="M60 22 L22 92 A48 48 0 0 0 98 92 Z"
            fill={C2}
            fillOpacity=".12"
            stroke={C2}
            strokeOpacity=".5"
          />
          {[40, 55, 70].map((r) => (
            <path
              key={r}
              d={`M${60 - r * 0.52} ${22 + r * 0.9} A${r} ${r} 0 0 0 ${60 + r * 0.52} ${22 + r * 0.9}`}
              stroke={C}
              strokeOpacity=".35"
            />
          ))}
          <path
            d="M50 70c0-9 7-15 14-13 6 1 8 7 5 11 5 1 7 7 3 11-5 5-17 4-20-2-2-2-2-5-2-7z"
            fill={W}
            fillOpacity=".18"
            stroke={W}
            strokeWidth="1.3"
            className="sv-float"
          />
          <g className="sv-sweep">
            <path d="M60 22 L60 96" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
          </g>
          <rect x="50" y="12" width="20" height="12" rx="4" fill={W} />
        </>
      )
    case 'doppler':
      return (
        <>
          <path
            d="M8 44 C 40 24, 80 64, 112 40"
            stroke={HOT}
            strokeOpacity=".35"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path d="M8 44 C 40 24, 80 64, 112 40" stroke={HOT} strokeWidth="2" className="sv-dash" />
          <path
            d="M8 70 C 40 90, 80 50, 112 74"
            stroke={C2}
            strokeOpacity=".35"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path d="M112 74 C 80 50, 40 90, 8 70" stroke={C} strokeWidth="2" className="sv-dash" />
          <path
            d="M60 52 C 70 70, 76 86, 86 104"
            stroke={HOT}
            strokeOpacity=".3"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M60 52 C 70 70, 76 86, 86 104"
            stroke={HOT}
            strokeWidth="1.6"
            className="sv-dash"
          />
          <path
            d="M30 18 L90 18 L78 36 L42 36 Z"
            fill={W}
            fillOpacity=".12"
            stroke={W}
            strokeOpacity=".5"
          />
        </>
      )
    case 'mammo':
      return (
        <>
          <rect x="18" y="22" width="84" height="6" rx="3" fill={W} />
          <rect x="18" y="84" width="84" height="6" rx="3" fill={W} />
          <path
            d="M26 84 C 30 46, 90 46, 94 84 Z"
            fill={C2}
            fillOpacity=".18"
            stroke={C}
            strokeWidth="1.5"
          />
          <circle cx="68" cy="70" r="3.5" fill={C} className="sv-pulse" />
          <circle cx="68" cy="70" r="8" stroke={C} strokeWidth="1" className="sv-ripple" />
          <g className="sv-scan" style={{ transform: 'translateY(0)' }}>
            <rect x="18" y="55" width="84" height="2" fill={C} />
            <rect x="18" y="48" width="84" height="16" fill={C} fillOpacity=".08" />
          </g>
        </>
      )
    case 'dexa':
      return (
        <>
          <path
            d="M34 18c-6 0-8 8-3 11l4 3v42l-4 3c-5 3-3 11 3 11s7-6 5-9h12c-2 3-1 9 5 9s8-8 3-11l-4-3V32l4-3c5-3 3-11-3-11s-7 6-5 9H39c2-3 1-9-5-9z"
            stroke={W}
            strokeWidth="1.5"
            transform="translate(-4 4)"
          />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={70 + i * 9}
              y={40}
              width="6"
              height="56"
              rx="2"
              fill={i === 3 ? C : C2}
              fillOpacity={0.4 + i * 0.15}
              className="sv-grow"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
          <path d="M66 98h42" stroke={W} strokeOpacity=".6" />
        </>
      )
    case 'dental':
      return (
        <>
          <path
            d="M16 36 C 16 96, 104 96, 104 36"
            stroke={C2}
            strokeOpacity=".4"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {Array.from({ length: 12 }).map((_, i) => {
            const t = (i / 11) * Math.PI
            const x = 60 - Math.cos(t) * 44
            const y = 36 + Math.sin(t) * 40
            return (
              <rect
                key={i}
                x={x - 3.5}
                y={y - 5}
                width="7"
                height="10"
                rx="3"
                fill={W}
                fillOpacity=".9"
                transform={`rotate(${(t * 180) / Math.PI - 90} ${x} ${y})`}
              />
            )
          })}
          <g className="sv-spin" style={{ transformOrigin: '60px 58px', transformBox: 'view-box' }}>
            <path d="M60 8 L34 108 L86 108 Z" fill={C} fillOpacity=".12" />
            <rect x="53" y="4" width="14" height="8" rx="3" fill={W} />
            <path d="M34 110 H86" stroke={C} strokeWidth="3" strokeLinecap="round" />
          </g>
          <text
            x="104"
            y="112"
            textAnchor="end"
            fill={C}
            fontSize="11"
            fontWeight="700"
            fontFamily="monospace"
          >
            3D
          </text>
        </>
      )
    case 'cardiac':
      return (
        <>
          <g className="sv-beat">
            <path
              d="M60 92 C 30 72, 18 56, 18 42 C 18 30, 28 22, 39 22 C 48 22, 55 27, 60 35 C 65 27, 72 22, 81 22 C 92 22, 102 30, 102 42 C 102 56, 90 72, 60 92 Z"
              fill={HOT}
              fillOpacity=".18"
              stroke={HOT}
              strokeWidth="2"
            />
            <path
              d="M60 35 C 58 50, 62 62, 60 80"
              stroke={W}
              strokeOpacity=".5"
              strokeWidth="1.5"
            />
            <path d="M44 44 C 50 52, 52 62, 50 70" stroke={C} strokeWidth="2" className="sv-dash" />
            <path d="M76 44 C 70 52, 68 62, 70 70" stroke={C} strokeWidth="2" className="sv-dash" />
          </g>
          <path
            d="M6 104 H36 L42 94 L48 112 L56 84 L62 104 H114"
            stroke={W}
            strokeWidth="2"
            strokeLinejoin="round"
            className="sv-dash"
            style={{ strokeDasharray: '140 60' }}
          />
        </>
      )
    case 'xray':
    default:
      return (
        <>
          <path d="M60 14v92" stroke={W} strokeWidth="5" strokeDasharray="6 3" strokeOpacity=".9" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g
              key={i}
              stroke={C}
              strokeOpacity={0.9 - i * 0.08}
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path
                d={`M56 ${28 + i * 11} C 40 ${22 + i * 11}, 24 ${34 + i * 11}, 26 ${48 + i * 11}`}
              />
              <path
                d={`M64 ${28 + i * 11} C 80 ${22 + i * 11}, 96 ${34 + i * 11}, 94 ${48 + i * 11}`}
              />
            </g>
          ))}
          <g className="sv-scan">
            <rect x="8" y="58" width="104" height="2" fill={C} />
            <rect x="8" y="46" width="104" height="26" fill={C} fillOpacity=".08" />
          </g>
        </>
      )
  }
}
