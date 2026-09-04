/* ============================================================
   Visual MTK — Visual pembuka beranda
   Janji produk dalam satu gambar: lingkaran dipotong, disusun
   ulang, dan berubah menjadi bangun yang luasnya kita kenal.
   Pengunjung bisa langsung menggeser jumlah potongannya —
   interaksi pertama terjadi dalam beberapa detik pertama.
   ============================================================ */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion, useTween } from '../lib/anim'
import { fmt } from '../lib/num'
import { Juring } from '../visuals/juring'
import { Ikon } from './Ikon'
import { Slider } from './Slider'
import { Svg, Tag } from './Stage'

const W = 620
const H = 372
const R = 92

export function HeroVisual() {
  const kurangi = useReducedMotion()
  const [n, setN] = useState(8)
  const [target, setTarget] = useState(0)
  const t = useTween(target, { durasi: 2200 })

  // Mainkan sekali saat halaman terbuka: dari lingkaran ke susunan.
  useEffect(() => {
    if (kurangi) {
      setTarget(1)
      return
    }
    const id = setTimeout(() => setTarget(1), 700)
    return () => clearTimeout(id)
  }, [kurangi])

  const lebar = Math.PI * R
  const rx = W / 2 - lebar / 2
  const ry = 132
  const cx = W / 2
  const cy = ry + R / 2

  const halus = n >= 24

  return (
    <div className="hero-visual">
      <Svg
        w={W}
        h={H}
        maxH={360}
        label="Lingkaran dipotong menjadi juring lalu disusun menyerupai persegi panjang"
      >
        {/* bayangan persegi panjang tujuan */}
        <rect
          x={rx}
          y={ry}
          width={lebar}
          height={R}
          rx={6}
          fill="none"
          stroke="var(--m-axis)"
          strokeWidth={1.5}
          strokeDasharray="6 7"
          opacity={t * 0.65}
        />

        <Juring n={n} t={t} r={R} cx={cx} cy={cy} rx={rx} ry={ry} />

        {t > 0.85 && (
          <>
            <Tag x={W / 2} y={ry - 30} warna="var(--m-a)" size={16}>
              {`panjang ≈ setengah keliling = π × r`}
            </Tag>
            <Tag
              x={rx - R * Math.sin(Math.PI / n) - 16}
              y={ry + R / 2}
              anchor="end"
              warna="var(--m-b)"
              size={16}
            >
              {`tinggi ≈ r`}
            </Tag>
          </>
        )}
        {t < 0.15 && (
          <Tag x={W / 2} y={cy + R + 34} warna="var(--ink-2)" size={16}>
            satu lingkaran, jari-jari r
          </Tag>
        )}
      </Svg>

      <div className="hero-kontrol">
        <Slider
          label="Jumlah potongan"
          nilai={n}
          min={4}
          max={64}
          step={2}
          bulat
          onChange={(v) => {
            setN(v)
            setTarget(1)
          }}
        />
        <p className="hero-catatan" aria-live="polite">
          {halus ? (
            <>
              <strong>Semakin banyak potongannya, semakin mirip persegi panjang.</strong> Luasnya
              mendekati {fmt(Math.PI, 2)} × r × r — di situlah πr² lahir.
            </>
          ) : (
            <>Geser ke kanan. Perhatikan bentuknya makin rapi saat potongannya bertambah.</>
          )}
        </p>
        <Link className="btn btn-why btn-sm" to="/konsep/lingkaran-luas">
          <Ikon nama="kenapa" /> Lihat penjelasan lengkapnya
        </Link>
      </div>
    </div>
  )
}
