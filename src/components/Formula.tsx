/* ============================================================
   Visual MTK — Rumus interaktif
   Rumus bukan teks mati. Setiap bagian bisa disorot, dan gambar
   di sebelahnya ikut menyala lewat SorotContext.

   Markup:
     "L = [half:½] × [alas:a] × [tinggi:t]"
   Bagian dalam [ ] menjadi token yang bisa disorot.
   Gunakan ^ untuk pangkat: "r^2" atau "r^{n+1}".
   ============================================================ */

import {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { FormulaRole } from '../lib/types'

/* ---------------- Konteks sorotan ---------------- */

interface SorotCtx {
  sorot: string | null
  set: (id: string | null) => void
  /** dikunci lewat klik, tidak hilang saat pointer pergi. */
  kunci: string | null
  toggleKunci: (id: string) => void
}

const Ctx = createContext<SorotCtx | null>(null)

/** Bungkus rumus + visual agar keduanya berbagi sorotan yang sama. */
export function SorotProvider({ children }: { children: ReactNode }) {
  const [sorot, setSorot] = useState<string | null>(null)
  const [kunci, setKunci] = useState<string | null>(null)
  const value = useMemo<SorotCtx>(
    () => ({
      sorot: sorot ?? kunci,
      set: (id) => setSorot(id),
      kunci,
      toggleKunci: (id) => setKunci((k) => (k === id ? null : id)),
    }),
    [sorot, kunci],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

/** Bagian rumus yang sedang disorot (null bila tidak ada). */
export function useSorot(): string | null {
  return useContext(Ctx)?.sorot ?? null
}

/** Untuk visual yang ingin ikut menyorot saat objeknya disentuh. */
export function useSorotAksi() {
  const c = useContext(Ctx)
  return {
    set: c?.set ?? (() => {}),
    toggle: c?.toggleKunci ?? (() => {}),
  }
}

/* ---------------- Parser ---------------- */

type Node =
  | { k: 'teks'; teks: string }
  | { k: 'bagian'; id: string; teks: string }

function parse(src: string): Node[] {
  const out: Node[] = []
  const re = /\[([a-zA-Z0-9_-]+):([^\]]*)\]/g
  let i = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    if (m.index > i) out.push({ k: 'teks', teks: src.slice(i, m.index) })
    out.push({ k: 'bagian', id: m[1], teks: m[2] })
    i = m.index + m[0].length
  }
  if (i < src.length) out.push({ k: 'teks', teks: src.slice(i) })
  return out
}

/** Ubah "r^2" dan "x^{n+1}" menjadi elemen sup. */
function rich(teks: string, key: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\^(?:\{([^}]*)\}|(\S))/g
  let i = 0
  let n = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(teks))) {
    if (m.index > i) out.push(teks.slice(i, m.index))
    out.push(
      <sup key={`${key}-s${n++}`} className="fx-sup">
        {m[1] ?? m[2]}
      </sup>,
    )
    i = m.index + m[0].length
  }
  if (i < teks.length) out.push(teks.slice(i))
  return out
}

/* ---------------- Komponen ---------------- */

export interface FormulaViewProps {
  src: string
  roles?: Record<string, FormulaRole>
  arti?: Record<string, string>
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** rumus yang bisa disorot tetapi tidak bisa diklik (mis. di kartu). */
  statis?: boolean
  className?: string
}

export function Formula({
  src,
  roles = {},
  arti = {},
  size = 'lg',
  statis = false,
  className = '',
  ringkas = false,
}: FormulaViewProps & {
  /** sembunyikan kalimat ajakan; arti tetap muncul saat sebuah bagian disorot. */
  ringkas?: boolean
}) {
  const ctx = useContext(Ctx)
  const [lokal, setLokal] = useState<string | null>(null)
  const uid = useId()
  const nodes = useMemo(() => parse(src), [src])
  const sorot = ctx ? ctx.sorot : lokal
  const set = ctx ? ctx.set : setLokal
  const toggle = ctx ? ctx.toggleKunci : (id: string) => setLokal((k) => (k === id ? null : id))

  const adaArti = Object.keys(arti).length > 0
  const pesan = sorot ? arti[sorot] : undefined

  return (
    <div className={`fx-wrap ${className}`}>
      <div className={`fx fx-${size}`} role="math" aria-label={teksAksesibel(src)}>
        {nodes.map((n, i) =>
          n.k === 'teks' ? (
            <span key={`${uid}-t${i}`} className="fx-plain">
              {rich(n.teks, `${uid}-t${i}`)}
            </span>
          ) : statis ? (
            <span
              key={`${uid}-b${i}`}
              className="fx-part is-static"
              data-role={roles[n.id] ?? 'plain'}
              data-on={sorot === n.id ? 'true' : undefined}
            >
              {rich(n.teks, `${uid}-b${i}`)}
            </span>
          ) : (
            <button
              key={`${uid}-b${i}`}
              type="button"
              className="fx-part"
              data-role={roles[n.id] ?? 'plain'}
              data-on={sorot === n.id ? 'true' : undefined}
              onPointerEnter={() => set(n.id)}
              onPointerLeave={() => set(null)}
              onFocus={() => set(n.id)}
              onBlur={() => set(null)}
              onClick={() => toggle(n.id)}
              aria-label={arti[n.id] ? `${n.teks}: ${arti[n.id]}` : n.teks}
            >
              {rich(n.teks, `${uid}-b${i}`)}
            </button>
          ),
        )}
      </div>
      {adaArti && !statis && (!ringkas || pesan) && (
        <p className="fx-arti" aria-live="polite">
          {pesan ?? 'Sentuh bagian rumus untuk melihat artinya pada gambar.'}
        </p>
      )}
    </div>
  )
}

/** Versi teks polos untuk pembaca layar dan pencarian. */
export function teksAksesibel(src: string) {
  return src
    .replace(/\[[a-zA-Z0-9_-]+:([^\]]*)\]/g, '$1')
    .replace(/\^\{([^}]*)\}/g, ' pangkat $1')
    .replace(/\^(\S)/g, ' pangkat $1')
    .replace(/×/g, ' kali ')
    .replace(/÷/g, ' dibagi ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Rumus statis kecil untuk dipakai di dalam kalimat. */
export function F({ children }: { children: string }) {
  return <span className="fx fx-inline">{rich(children, 'inl')}</span>
}
