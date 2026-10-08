/* ============================================================
   KONSEP — Bagaimana segitiga bisa berubah menjadi gelombang?
   Kelas 10 · Geometri

   Gagasan: pada lingkaran berjari-jari 1, sisi miring segitiga
   selalu bernilai 1. Akibatnya sin θ = depan/miring = tinggi titik
   itu sendiri, dan cos θ = posisi mendatarnya (kiri-kanan).

   Ketika titik berputar, tingginya naik-turun berulang. Merekam
   tinggi itu terhadap sudut menghasilkan grafik sinus. Gelombang
   bukan hal baru — ia rekaman perjalanan satu titik di lingkaran.
   ============================================================ */

import { useRef } from 'react'
import { Pegangan, useInteraksi, type Titik } from '../components/Interaksi'
import { Svg, Tag, SikuSiku, useSempit, useSkalaSvg, useUkuranLayar } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, rad } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/**
 * Tata letak gambar. Di layar lebar lingkaran dan gelombang berdampingan,
 * sehingga garis penghubungnya mendatar dan tinggi keduanya sebanding. Di HP
 * gelombang turun ke bawah lingkaran, supaya lingkarannya bisa digambar besar.
 */
interface Tata {
  sempit: boolean
  w: number
  h: number
  maxH: number
  /** pusat dan jari-jari lingkaran satuan. */
  cx: number
  cy: number
  r: number
  /** rentang mendatar gelombang, garis nolnya, dan tinggi untuk nilai 1. */
  wx0: number
  wx1: number
  wcy: number
  ws: number
  /** garis dasar label derajat di bawah gelombang. */
  tandaY: number
  /** baris keterangan pertama. */
  ketY: number
}

const LEBAR: Tata = {
  sempit: false,
  w: 728,
  h: 430,
  maxH: 440,
  // Pusat cukup jauh dari tepi kiri, supaya ajakan "Coba putar aku" di bawah
  // titik tidak terpotong saat titiknya di sisi kiri lingkaran.
  cx: 188,
  cy: 218,
  r: 108,
  // Gelombang dimulai cukup jauh dari lingkaran, supaya pegangan di θ = 0°
  // (tepi kanan lingkaran) dan pegangan di awal grafik tidak berdempet, dan
  // ajakan di bawah titik (θ ≈ 330°–340°) tidak menimpa label "−1" grafik pada
  // panggung lebar tersempit (gambar selebar ±528 px). Ujung kanan menyisakan
  // ruang untuk sorot pegangan.
  wx0: 400,
  wx1: 700,
  wcy: 218,
  ws: 108, // tinggi gelombang sama dengan jari-jari, supaya sebanding
  // Label derajat di bawah lingkaran sorot pegangan grafik saat titiknya di lembah.
  tandaY: 372,
  ketY: 40,
}

const HP: Tata = {
  sempit: true,
  w: 420,
  h: 546,
  maxH: 480,
  cx: 210,
  cy: 152,
  r: 118,
  // Label "1" grafik cukup jauh ke kiri, supaya ajakan di bawah titik
  // (θ ≈ 220°) tidak menimpanya pada HP 320 px.
  wx0: 40,
  // Sorot pegangan di ujung kanan grafik tetap di dalam bingkai pada HP 320 px.
  wx1: 392,
  wcy: 372,
  // Tidak bisa sebanding tanpa mengecilkan lingkaran; garis 1 dan −1 tetap diberi label.
  ws: 72,
  tandaY: 482,
  ketY: 501,
}

/** Ubah sudut derajat menjadi titik pada lingkaran satuan (koordinat layar). */
const titikPada = (L: Tata, deg: number) => ({
  x: L.cx + L.r * Math.cos(rad(deg)),
  y: L.cy - L.r * Math.sin(rad(deg)),
})

/** Buang sisa galat mengambang: Math.sin(π) memberi 1,2·10⁻¹⁶, padahal sin 180° tepat 0. */
const nol = (v: number) => (Math.abs(v) < 1e-9 ? 0 : v)

/* ---------------- Letak label "1" pada jari-jari ---------------- */

/** Ajakan pada pegangan titik P sebelum anak pernah menyeret. */
const AJAKAN = 'Coba putar aku'

interface Kotak {
  x0: number
  x1: number
  y0: number
  y1: number
}

/** Perkiraan kotak latar sebuah Tag (rumusnya sama dengan Tag di Stage.tsx). */
function kotakTag(x: number, y: number, teks: string, size: number, skala: number, layar = false): Kotak {
  const uk = !layar && skala > 0 ? Math.max(size, Math.min(size * 1.6, 11 / skala)) : size
  const lebar = [...teks].length * uk * 0.58 + 7 * (uk / size) * 2
  return { x0: x - lebar / 2, x1: x + lebar / 2, y0: y - uk * 0.82, y1: y + uk * 0.68 }
}

const luasTumpang = (a: Kotak, b: Kotak) =>
  Math.max(0, Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)) *
  Math.max(0, Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0))

const lebarkan = (k: Kotak, d: number): Kotak => ({ x0: k.x0 - d, x1: k.x1 + d, y0: k.y0 - d, y1: k.y1 + d })

/**
 * Tempat yang dicoba untuk label "1", urut dari yang paling disukai:
 * [jarak dari pusat (× r), sisi (1 = luar segitiga, −1 = dalam), jarak dari garis jari-jari].
 */
const KANDIDAT_SATU: [number, number, number][] = [0.62, 0.54, 0.7, 0.46, 0.78, 0.38, 0.3].flatMap(
  (f): [number, number, number][] => [
    [f, 1, 17],
    [f, -1, 17],
    [f, 1, 26],
  ],
)

/**
 * Label "1" duduk di samping jari-jari, di sisi luar segitiga (bukan di bawah
 * sisi mendatar, yang panjangnya cos θ), agar jelas yang bernilai 1 adalah sisi
 * miringnya. Bila tempat itu tertimpa pegangan P, sorotnya, garis sin/cos, atau
 * ajakan "Coba putar aku" di bawah titik, label bergeser sepanjang jari-jari ke
 * tempat kosong terdekat. Ukuran pegangan dan ajakan dihitung dengan rumus yang
 * sama dengan Pegangan di Interaksi.tsx.
 */
function letakSatu(L: Tata, theta: number, skalaUkur: number, ajakan: boolean, menyala: boolean) {
  const { cx: CX, cy: CY, r: R } = L
  const s = nol(Math.sin(rad(theta)))
  const c = nol(Math.cos(rad(theta)))
  const luar = s * c >= 0 ? 1 : -1
  const di = (f: number, k: number, samping: number) => ({
    x: CX + f * R * c - samping * k * luar * s,
    y: CY - (f * R * s + samping * k * luar * c),
  })
  const skala = skalaUkur || 0.6
  const px = (n: number) => n / skala
  const rTitik = Math.max(8, px(9))
  const P = { x: CX + R * c, y: CY - R * s }
  const rP = menyala ? rTitik * 2.1 : rTitik
  // [kotak, bobot]. Menutup titik P atau garis sin/cos jauh lebih buruk daripada
  // menyentuh tepi ajakan: label "1" yang duduk di atas garis sinus terbaca
  // sebagai panjang sisi tegak, bukan sisi miring.
  const halang: [Kotak, number][] = [
    [lebarkan({ x0: P.x - rP, x1: P.x + rP, y0: P.y - rP, y1: P.y + rP }, px(3)), 100],
    [{ x0: Math.min(P.x, CX) - 2, x1: Math.max(P.x, CX) + 2, y0: CY - 2, y1: CY + 2 }, 100],
    [{ x0: P.x - 2, x1: P.x + 2, y0: Math.min(P.y, CY) - 2, y1: Math.max(P.y, CY) + 2 }, 100],
  ]
  if (ajakan && !menyala) {
    halang.push([lebarkan(kotakTag(P.x, P.y + rTitik + px(24), AJAKAN, px(13), skalaUkur, true), px(4)), 1])
  }
  // Bila tidak ada tempat yang benar-benar kosong, pakai yang tumpangannya (berbobot) paling kecil.
  let terbaik = di(0.62, 1, 17)
  let paling = Infinity
  for (const [f, k, samping] of KANDIDAT_SATU) {
    const q = di(f, k, samping)
    const kotak = kotakTag(q.x, q.y, '1', 12, skalaUkur)
    const luas = halang.reduce((j, [h, bobot]) => j + bobot * luasTumpang(h, kotak), 0)
    if (luas === 0) return q
    if (luas < paling) {
      paling = luas
      terbaik = q
    }
  }
  return terbaik
}

/** Bilangan bertanda; negatifnya memakai '−' (U+2212), bukan tanda hubung. */
const bil = (n: number, desimal?: number) =>
  n < 0 ? `−${fmt(-n, desimal)}` : fmt(n, desimal)

/**
 * Nilainya tepat pada tiga desimal? Untuk sudut bulat hanya 0, ±½, ±1 (dan
 * kuadratnya ¼, ½, ¾) — selebihnya irasional, jadi hanya bisa dibulatkan.
 */
const tepat = (v: number) => Math.abs(v * 1000 - Math.round(v * 1000)) < 1e-6

/** Tanda hubung nilai: "=" hanya untuk nilai tepat, "≈" untuk nilai yang dibulatkan. */
const sama = (v: number) => (tepat(v) ? '=' : '≈')

/** Angka bertanda: nilai tepat tanpa nol berlebih ("0,5"), selain itu dibulatkan. */
const angka = (v: number, desimal = 3) => bil(v, tepat(v) ? undefined : desimal)

/** Panjang (tanpa tanda) dalam kalimat: "0,5" atau "sekitar 0,643". */
const panjang = (v: number) => (tepat(v) ? fmt(Math.abs(v)) : `sekitar ${fmt(Math.abs(v), 3)}`)

/**
 * Satu-satunya tempat nilai penggeser bongkar diturunkan. Gambar DAN teks
 * langkah sama-sama memakai fungsi ini, supaya angka di narasi tidak pernah
 * berbeda dari angka yang tergambar.
 */
function nilaiBongkar(p: Record<string, number>) {
  const theta = clamp(Math.round(p.theta ?? 40), 0, 360)
  const s = nol(Math.sin(rad(theta)))
  const c = nol(Math.cos(rad(theta)))
  return {
    theta,
    s,
    c,
    /** sudut lancip — hanya di sini perbandingan sisi segitiga benar-benar berlaku. */
    lancip: theta > 0 && theta < 90,
    /** titik tepat di sumbu: salah satu sisi habis, segitiganya gepeng. */
    gepeng: s === 0 || c === 0,
  }
}

/**
 * Busur sudut θ di pusat. Lewat satu putaran busurnya melebar menjadi spiral,
 * supaya 400° tidak tampak sama dengan 40°.
 */
function jalurBusur(L: Tata, theta: number) {
  const titikBusur = (d: number) => {
    const rb = 16 + (6 * d) / 360
    return `${(L.cx + rb * Math.cos(rad(d))).toFixed(1)} ${(L.cy - rb * Math.sin(rad(d))).toFixed(1)}`
  }
  const p = [`M ${titikBusur(0)}`]
  for (let d = 6; d < theta; d += 6) p.push(`L ${titikBusur(d)}`)
  p.push(`L ${titikBusur(theta)}`)
  return p.join(' ')
}

function Lingkaran({
  L,
  theta,
  tampilSegitiga,
  tampilCos,
  nyalaSin,
  nyalaCos,
  nyalaSudut,
  ajakan = false,
}: {
  L: Tata
  theta: number
  tampilSegitiga: number
  tampilCos: number
  nyalaSin: boolean
  nyalaCos: boolean
  /** sudutnya sedang diputar anak (pegangan P menyala). */
  nyalaSudut: boolean
  /** ajakan "Coba putar aku" sedang tampil di bawah titik. */
  ajakan?: boolean
}) {
  const skala = useSkalaSvg()
  const { cx: CX, cy: CY, r: R } = L
  const P = titikPada(L, theta)
  const s = nol(Math.sin(rad(theta)))
  const c = nol(Math.cos(rad(theta)))
  // Di sumbu, segitiganya gepeng: tidak ada sudut siku-siku yang perlu ditandai.
  const gepeng = s === 0 || c === 0
  const label1 = letakSatu(L, theta, skala, ajakan, nyalaSudut)
  // Label θ duduk di kuadran yang berseberangan dengan titiknya: di sana tidak
  // ada segitiga, pegangan, atau label "1" yang bisa tertimpa.
  const kanan = c < 0
  const bawah = s >= 0

  return (
    <g>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--m-grid)" strokeWidth={2} />
      <line x1={CX - R - 18} y1={CY} x2={CX + R + 18} y2={CY} stroke="var(--m-axis)" strokeWidth={1.6} />
      <line x1={CX} y1={CY - R - 18} x2={CX} y2={CY + R + 18} stroke="var(--m-axis)" strokeWidth={1.6} />

      {/* busur sudut */}
      {theta > 0.5 && (
        <path
          d={jalurBusur(L, theta)}
          fill="none"
          stroke={nyalaSudut ? 'var(--m-hi)' : 'var(--ink-3)'}
          strokeWidth={nyalaSudut ? 2.4 : 1.6}
          strokeLinecap="round"
        />
      )}

      {/* segitiga siku-siku */}
      {tampilSegitiga > 0.02 && (
        <g opacity={tampilSegitiga}>
          <polygon
            points={`${CX},${CY} ${P.x},${CY} ${P.x},${P.y}`}
            fill="var(--m-ab)"
            fillOpacity={0.18}
            stroke="var(--m-ab)"
            strokeWidth={1.6}
          />
          {!gepeng && (
            <SikuSiku
              x={P.x}
              y={CY}
              ux={c >= 0 ? -1 : 1}
              uy={0}
              vx={0}
              vy={s >= 0 ? -1 : 1}
              s={11}
              warna="var(--m-ab)"
            />
          )}
        </g>
      )}

      {/* sisi tegak = sinus */}
      <line
        x1={P.x}
        y1={CY}
        x2={P.x}
        y2={P.y}
        stroke="var(--m-a)"
        strokeWidth={nyalaSin ? 5 : 3.4}
        strokeLinecap="round"
      />
      {/* sisi mendatar = kosinus */}
      {tampilCos > 0.02 && (
        <line
          x1={CX}
          y1={CY}
          x2={P.x}
          y2={CY}
          stroke="var(--m-b)"
          strokeWidth={nyalaCos ? 5 : 3.4}
          strokeLinecap="round"
          opacity={tampilCos}
        />
      )}

      {/* jari-jari */}
      <line x1={CX} y1={CY} x2={P.x} y2={P.y} stroke="var(--ink)" strokeWidth={2.4} />
      <circle cx={P.x} cy={P.y} r={6} fill="var(--m-hi)" />
      <circle cx={CX} cy={CY} r={3.5} fill="var(--ink)" />

      <Tag
        x={CX + (kanan ? 30 : -30)}
        y={CY + (bawah ? 19 : -19)}
        anchor={kanan ? 'start' : 'end'}
        warna={nyalaSudut ? 'var(--m-hi)' : 'var(--ink-2)'}
        size={13}
      >
        {`θ = ${fmt(Math.round(theta))}°`}
      </Tag>
      <Tag x={label1.x} y={label1.y} warna="var(--ink-soft)" size={12}>
        1
      </Tag>
    </g>
  )
}

function Gelombang({
  L,
  theta,
  maksDeg,
  tampilCos,
  nyalaSin,
  nyalaCos,
  rekam,
}: {
  L: Tata
  theta: number
  maksDeg: number
  tampilCos: number
  nyalaSin: boolean
  nyalaCos: boolean
  /** Sudut terjauh yang sudah terekam di grafik; bawaannya sampai θ. */
  rekam?: number
}) {
  const u = useUkuranLayar()
  const huruf = Math.max(12, u(12))
  const { wx0: WX0, wx1: WX1 } = L
  const kx = (deg: number) => WX0 + (deg / maksDeg) * (WX1 - WX0)
  const ky = (v: number) => L.wcy - v * L.ws
  const P = titikPada(L, theta)

  const langkah = 2
  const ujung = Math.max(theta, rekam ?? theta)
  const jalur = (f: (d: number) => number) => {
    const p: string[] = []
    for (let d = 0; d <= ujung + 0.001; d += langkah) {
      p.push(`${p.length === 0 ? 'M' : 'L'} ${kx(d).toFixed(1)} ${ky(f(d)).toFixed(1)}`)
    }
    return p.join(' ')
  }

  const tanda = maksDeg > 400 ? [0, 180, 360, 540, 720] : [0, 90, 180, 270, 360]

  return (
    <g>
      <line x1={WX0} y1={L.wcy} x2={WX1} y2={L.wcy} stroke="var(--m-axis)" strokeWidth={1.6} />
      {[1, -1].map((v) => (
        <line
          key={v}
          x1={WX0}
          y1={ky(v)}
          x2={WX1}
          y2={ky(v)}
          stroke="var(--m-grid)"
          strokeWidth={1}
          strokeDasharray="5 5"
        />
      ))}
      <text x={WX0 - 8} y={ky(1)} textAnchor="end" dominantBaseline="middle" fontSize={huruf} fontWeight={700} fill="var(--ink-soft)">
        1
      </text>
      <text x={WX0 - 8} y={ky(-1)} textAnchor="end" dominantBaseline="middle" fontSize={huruf} fontWeight={700} fill="var(--ink-soft)">
        −1
      </text>
      {tanda
        .filter((d) => d <= maksDeg)
        .map((d) => (
          <text
            key={d}
            x={kx(d)}
            y={L.tandaY}
            textAnchor="middle"
            fontSize={huruf}
            fontWeight={700}
            fill="var(--ink-soft)"
          >
            {`${d}°`}
          </text>
        ))}

      {tampilCos > 0.02 && (
        <path
          d={jalur((d) => Math.cos(rad(d)))}
          fill="none"
          stroke="var(--m-b)"
          strokeWidth={nyalaCos ? 3.6 : 2.2}
          opacity={tampilCos}
          strokeLinejoin="round"
        />
      )}
      <path
        d={jalur((d) => Math.sin(rad(d)))}
        fill="none"
        stroke="var(--m-a)"
        strokeWidth={nyalaSin ? 4 : 2.8}
        strokeLinejoin="round"
      />

      {/* garis penghubung dari lingkaran ke titik gelombang */}
      <line
        x1={P.x}
        y1={P.y}
        x2={kx(theta)}
        y2={ky(Math.sin(rad(theta)))}
        stroke="var(--m-hi)"
        strokeWidth={1.3}
        strokeDasharray="4 5"
        opacity={0.75}
      />
      <circle cx={kx(theta)} cy={ky(Math.sin(rad(theta)))} r={5.5} fill="var(--m-a)" />
      <line
        x1={kx(theta)}
        y1={L.wcy}
        x2={kx(theta)}
        y2={ky(Math.sin(rad(theta)))}
        stroke="var(--m-a)"
        strokeWidth={2.4}
        opacity={0.85}
      />
    </g>
  )
}

/**
 * Dua pegangan untuk sudut yang sama:
 * - titik P di lingkaran, diputar (sudut dibaca dengan Math.atan2);
 * - titik di grafik, diseret mendatar karena sumbu mendatar grafik adalah θ.
 * Nilai θ dibaca pada label θ di pusat lingkaran, jadi pegangan tidak perlu
 * label sendiri yang bisa menimpa label "1" atau keterangan di atasnya.
 */
function PeganganSudut({
  L,
  theta,
  maksDeg,
  sembunyi = false,
}: {
  L: Tata
  theta: number
  /** sudut di ujung kanan grafik. */
  maksDeg: number
  sembunyi?: boolean
}) {
  const ctx = useInteraksi()
  // Sudut "tanpa jepit" dari seretan terakhir. Tanpa ini, memutar terus
  // melewati 360° lalu kembali ke 180° membuat titiknya melompat.
  const putaran = useRef<number | null>(null)
  const P = titikPada(L, theta)
  const sGambar = Math.sin(rad(theta))

  const dariLingkaran = (pt: Titik) => {
    const a = ((Math.atan2(L.cy - pt.y, pt.x - L.cx) * 180) / Math.PI + 360) % 360
    const spec = ctx?.peta.get('theta')
    const nilai = ctx?.kendali.nilai.theta ?? theta
    const lalu = putaran.current
    const acuan =
      lalu !== null && spec && Math.abs(clamp(lalu, spec.min, spec.max) - nilai) <= 1 ? lalu : nilai
    // Pilih sudut yang setara dengan a (selisih kelipatan 360°) yang paling dekat dengan acuan.
    const baru = a + 360 * Math.round((acuan - a) / 360)
    // Yang diingat paling jauh setengah putaran di luar rentang. Kalau anak terus
    // memutar melewati batas, titiknya diam di batas dan langsung ikut lagi begitu
    // jari kembali ke dekatnya — tanpa ini, setiap putaran ekstra harus diputar
    // balik dulu sebelum titiknya mau bergerak, jadi titiknya terasa macet.
    putaran.current = spec ? clamp(baru, spec.min - 180, spec.max + 180) : baru
    return baru
  }

  return (
    <>
      <Pegangan
        x={L.wx0 + (theta / maksDeg) * (L.wx1 - L.wx0)}
        y={L.wcy - sGambar * L.ws}
        param="theta"
        arah="x"
        sembunyi={sembunyi}
        keNilai={(pt) => ((pt.x - L.wx0) / (L.wx1 - L.wx0)) * maksDeg}
      />
      <Pegangan
        x={P.x}
        y={P.y}
        param="theta"
        arah="putar"
        utama
        ajakan={AJAKAN}
        sembunyi={sembunyi}
        keNilai={dariLingkaran}
      />
    </>
  )
}

/** Keterangan gambar. Di HP kalimat panjang dipecah di tanda pisah menjadi dua baris. */
function Keterangan({ L, warna, children }: { L: Tata; warna: string; children: string }) {
  if (!L.sempit) {
    return (
      <Tag x={L.w / 2} y={L.ketY} warna={warna} size={16}>
        {children}
      </Tag>
    )
  }
  const size = 15
  const muat = children.length * size * 0.58 + 14 <= L.w - 24
  const baris = muat ? [children] : children.split(' — ')
  const y0 = baris.length === 1 ? L.ketY + 13 : L.ketY
  return (
    <>
      {baris.map((b, i) => (
        <Tag key={i} x={L.w / 2} y={y0 + i * 26} warna={warna} size={size}>
          {b}
        </Tag>
      ))}
    </>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const L = useSempit() ? HP : LEBAR
  const ctx = useInteraksi()
  const aktif = ctx?.kendali.aktif === 'theta'
  const dasar = nilaiBongkar(p).theta

  const putarPenuh = step === 2 ? 360 * seg(t, 0.02, 0.98) : 0
  const putarDua = step === 5 ? 720 * seg(t, 0.02, 0.98) : 0
  const theta =
    step === 2 ? putarPenuh : step === 5 ? putarDua : step === 4 ? 40 + 140 * seg(t, 0.1, 0.9) : dasar

  const maksDeg = step >= 5 ? 720 : 360
  // Putaran penuh sudah direkam pada langkah 2 (dan 5), jadi di langkah 3 dan 6
  // rekaman itu tetap tampil utuh — agar pergeseran seperempat putaran antara
  // grafik sinus dan kosinus benar-benar terlihat, bukan hanya sampai θ.
  const rekam = step === 3 ? 360 : step >= 6 ? 720 : undefined
  const tampilSegitiga = fase(step, t, 0)
  const tampilCos = fase(step, t, 3)
  const identitas = step >= 6

  const nyalaSin = sorot === 'sin' || sorot === 'y'
  const nyalaCos = sorot === 'cos' || sorot === 'x'

  const s = nol(Math.sin(rad(theta)))
  const c = nol(Math.cos(rad(theta)))

  // Titiknya dipegang anak hanya pada langkah yang sudutnya mengikuti nilai θ.
  // Pada langkah 2, 4, dan 5 titiknya diputar oleh animasi, jadi pegangannya disembunyikan.
  const bebas = step === 0 || step === 1 || step === 3 || step === 6

  const keterangan: [string, string] | null =
    step <= 1
      ? ['var(--m-a)', `sin ${fmt(Math.round(theta))}° ${sama(s)} ${angka(s)} — itulah tinggi titiknya`]
      : step === 2
        ? ['var(--ink-2)', 'tingginya direkam terhadap sudut']
        : step === 3
          ? ['var(--m-b)', `cos ${fmt(Math.round(theta))}° ${sama(c)} ${angka(c)} — posisi mendatarnya`]
          : step === 4
            ? ['var(--m-hi)', 'setelah 90°, tingginya mulai menurun']
            : step === 5
              ? ['var(--m-ab)', 'lewat 360°, titik kembali ke tempat semula — polanya berulang']
              : identitas
                ? [
                    'var(--m-ab)',
                    `${angka(s * s)} + ${angka(c * c)} = 1 — ${
                      s === 0 || c === 0 ? 'tetap berlaku walau segitiganya gepeng' : 'Pythagoras pada segitiga itu'
                    }`,
                  ]
                : null

  return (
    <Svg w={L.w} h={L.h} maxH={L.maxH} label="Lingkaran satuan dan grafik sinus yang terbentuk dari perputaran titik">
      <Lingkaran
        L={L}
        theta={theta}
        tampilSegitiga={tampilSegitiga}
        tampilCos={tampilCos}
        nyalaSin={nyalaSin}
        nyalaCos={nyalaCos}
        nyalaSudut={aktif && bebas}
        ajakan={!!ctx?.ajakan && bebas && !aktif}
      />
      <Gelombang
        L={L}
        theta={theta}
        maksDeg={maksDeg}
        tampilCos={tampilCos}
        nyalaSin={nyalaSin}
        nyalaCos={nyalaCos}
        rekam={rekam}
      />

      {keterangan && (
        <Keterangan L={L} warna={keterangan[0]}>
          {keterangan[1]}
        </Keterangan>
      )}

      <PeganganSudut L={L} theta={theta} maksDeg={maksDeg} sembunyi={!bebas} />
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const L = useSempit() ? HP : LEBAR
  const ctx = useInteraksi()
  const aktif = ctx?.kendali.aktif === 'theta'
  const theta = clamp(Math.round(p.theta ?? 40), 0, 720)
  const s = nol(Math.sin(rad(theta)))
  const c = nol(Math.cos(rad(theta)))

  // Di layar lebar ketiga angka ditumpuk di tengah; di HP sin dan cos berdampingan di bawah grafik.
  const posSin = L.sempit ? { x: L.w * 0.27, y: L.ketY } : { x: L.w / 2, y: 36 }
  const posCos = L.sempit ? { x: L.w * 0.73, y: L.ketY } : { x: L.w / 2, y: 68 }
  const posJumlah = L.sempit ? { x: L.w / 2, y: L.ketY + 26 } : { x: L.w / 2, y: L.h - 18 }

  return (
    <Svg w={L.w} h={L.h} maxH={L.maxH} label="Lingkaran satuan dengan sudut yang bisa diputar bebas">
      <Lingkaran
        L={L}
        theta={theta}
        tampilSegitiga={1}
        tampilCos={1}
        nyalaSin={sorot === 'sin' || sorot === 'y'}
        nyalaCos={sorot === 'cos' || sorot === 'x'}
        nyalaSudut={aktif}
        ajakan={!!ctx?.ajakan && !aktif}
      />
      <Gelombang
        L={L}
        theta={theta}
        maksDeg={720}
        tampilCos={1}
        nyalaSin={sorot === 'sin' || sorot === 'y'}
        nyalaCos={sorot === 'cos' || sorot === 'x'}
      />
      <Tag x={posSin.x} y={posSin.y} warna="var(--m-a)" size={L.sempit ? 15 : 16}>
        {`sin ${fmt(theta)}° ${sama(s)} ${angka(s, 4)}`}
      </Tag>
      <Tag x={posCos.x} y={posCos.y} warna="var(--m-b)" size={L.sempit ? 15 : 16}>
        {`cos ${fmt(theta)}° ${sama(c)} ${angka(c, 4)}`}
      </Tag>
      <Tag x={posJumlah.x} y={posJumlah.y} warna="var(--m-ab)" size={15}>
        {`sin² + cos² = ${fmt(s * s + c * c, 4)}`}
      </Tag>

      <PeganganSudut L={L} theta={theta} maksDeg={720} />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'sin-cos-lingkaran',
  topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
  judul: 'Sinus dan kosinus',
  pertanyaan: 'Bagaimana segitiga bisa berubah menjadi gelombang?',
  tagline: 'Satu titik berputar di lingkaran. Bayangannya menggambar grafik sinus.',
  kelas: 10,
  domain: 'geometri',
  tags: ['sinus', 'kosinus', 'lingkaran satuan', 'trigonometri', 'gelombang'],

  tebak: {
    pertanyaan:
      'Pada lingkaran berjari-jari 1, sebuah titik berada di sudut θ. Menurutmu sin θ itu apa?',
    pilihan: [
      {
        id: 'a',
        label: 'Besar sudutnya sendiri',
        balasan:
          'Sudut dan sinus memang saling terkait, tetapi bukan hal yang sama. sin 90° bernilai 1, bukan 90.',
      },
      {
        id: 'b',
        label: 'Tinggi titik itu dari sumbu mendatar',
        benar: true,
        balasan:
          'Tepat. Karena sisi miringnya bernilai 1, perbandingan depan/miring menjadi tinggi dibagi 1 — yaitu tinggi itu sendiri.',
      },
      {
        id: 'c',
        label: 'Panjang busur dari titik nol',
        balasan:
          'Panjang busur justru ukuran sudut dalam radian. Sinus adalah ketinggian, bukan jarak sepanjang lingkaran.',
      },
    ],
    penutup:
      'Begitu sinus dibaca sebagai "ketinggian", gelombang sinus berhenti terasa misterius.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'theta', label: 'Sudut θ', min: 0, max: 360, step: 1, awal: 40, satuan: '°', simbol: 'θ', peran: 'hi' },
    ],
    roles: { sin: 'a', cos: 'b', y: 'a', x: 'b', satu: 'hi' },
    arti: {
      sin: 'Sinus — tinggi titik pada lingkaran satuan (bertanda: negatif bila titiknya di bawah sumbu mendatar).',
      cos: 'Kosinus — posisi mendatar titik itu terhadap pusat (bertanda: negatif bila titiknya di kiri pusat).',
      y: 'Koordinat tegak titik.',
      x: 'Koordinat mendatar titik.',
      satu: 'Jari-jari lingkaran satuan, selalu bernilai 1. Inilah yang menyederhanakan semuanya.',
    },
    steps: [
      {
        id: 's0',
        judul: (p) =>
          nilaiBongkar(p).gepeng
            ? 'Di sumbu, segitiganya gepeng'
            : 'Segitiga siku-siku di dalam lingkaran',
        narasi: (p) => {
          const { theta, s, c } = nilaiBongkar(p)
          if (s === 0) {
            return `Di ${fmt(theta)}° titiknya duduk tepat pada sumbu mendatar, jadi garis tegaknya habis dan tidak ada segitiga yang terbentuk. Putar titik merah muda itu sedikit saja, dan segitiga siku-sikunya langsung muncul.`
          }
          if (c === 0) {
            return `Di ${fmt(theta)}° titiknya tepat ${s > 0 ? 'di atas' : 'di bawah'} pusat, jadi jari-jarinya berimpit dengan garis tegak dan segitiganya gepeng. Putar titik merah muda itu sedikit saja, dan segitiga siku-sikunya langsung muncul.`
          }
          // Titik di bawah sumbu: garis tegaknya naik ke sumbu, bukan "diturunkan".
          return `Tarik jari-jari ke titik di sudut ${fmt(theta)}°, lalu buat garis tegak lurus dari titik itu ${s > 0 ? 'turun' : 'naik'} ke sumbu mendatar. Terbentuk segitiga siku-siku yang sisi miringnya jari-jari itu sendiri.`
        },
        durasi: 2000,
      },
      {
        id: 's1',
        judul: 'Jari-jarinya 1, jadi semuanya lebih sederhana',
        narasi: (p) => {
          const { theta, s, gepeng } = nilaiBongkar(p)
          // Di sumbu tidak ada segitiga (langkah 0), jadi yang disebut jari-jarinya.
          const awal = gepeng
            ? 'Karena jari-jarinya 1, membagi dengan jari-jari tidak mengubah apa pun — sin θ langsung sama dengan tinggi titiknya.'
            : 'Karena sisi miringnya 1, membagi dengan sisi miring tidak mengubah apa pun — sin θ langsung sama dengan tinggi titiknya.'
          if (s === 0) {
            return `${awal} Titik di ${fmt(theta)}° duduk tepat pada sumbu mendatar, jadi tingginya nol dan sin ${fmt(theta)}° = 0.`
          }
          return `${awal} Titik di ${fmt(theta)}° berada ${panjang(s)} ${s < 0 ? 'di bawah' : 'di atas'} sumbu mendatar, jadi sin ${fmt(theta)}° ${sama(s)} ${angka(s)}.`
        },
        rumus: (p) =>
          nilaiBongkar(p).lancip
            ? '[sin:sin θ] = depan / miring = [y:y] / [satu:1] = [y:y]'
            : '[sin:sin θ] = [y:y] / [satu:1] = [y:y]',
        durasi: 2600,
      },
      {
        id: 's2',
        judul: 'Putar titiknya satu putaran',
        narasi:
          'Sambil titik berputar, tingginya kita catat pada grafik. Naik sampai puncak, turun melewati nol, lalu ke bawah, lalu kembali.',
        durasi: 3400,
      },
      {
        id: 's3',
        judul: 'Kosinus adalah posisi mendatarnya',
        narasi: (p) => {
          const { theta, c } = nilaiBongkar(p)
          const akhir =
            'Grafik kosinus berbentuk sama dengan grafik sinus, hanya bergeser seperempat putaran.'
          if (c === 0) {
            return `Titik di ${fmt(theta)}° tidak berada di kiri maupun di kanan pusat, jadi cos ${fmt(theta)}° = 0. ${akhir}`
          }
          return `Titik di ${fmt(theta)}° berada ${panjang(c)} ${c < 0 ? 'di kiri' : 'di kanan'} pusat, jadi cos ${fmt(theta)}° ${sama(c)} ${angka(c)}. ${akhir}`
        },
        rumus: (p) =>
          nilaiBongkar(p).lancip
            ? '[cos:cos θ] = samping / miring = [x:x]'
            : '[cos:cos θ] = [x:x]',
        durasi: 2400,
      },
      {
        id: 's4',
        judul: 'Setelah 90°, tingginya menurun',
        narasi:
          'Titik terus berputar berlawanan arah jarum jam, tetapi tingginya sudah melewati puncak. Di situlah gelombang mulai membentuk lengkung turun.',
        durasi: 2400,
      },
      {
        id: 's5',
        judul: 'Setelah 360°, semuanya berulang',
        narasi:
          'Titiknya kembali ke tempat semula, jadi tingginya pun mengulang nilai yang sama. Karena itu grafik sinus tidak pernah berhenti berulang.',
        durasi: 3000,
      },
      {
        id: 's6',
        judul: 'Dan Pythagoras masih berlaku',
        narasi: (p) => {
          const { theta, s, c, gepeng } = nilaiBongkar(p)
          // Angka sama persis dengan label gambar langkah ini. Kuadrat yang dibulatkan
          // ke tiga desimal tetap berjumlah tepat 1 untuk setiap sudut bulat 0°–360°.
          const hitung = `${angka(s * s)} + ${angka(c * c)} = 1`
          if (gepeng) {
            return `Di ${fmt(theta)}° segitiganya gepeng: satu sisinya habis, sisi lainnya sepanjang 1. Jumlah kuadratnya tetap ${hitung}, jadi identitas ini pun tetap berlaku.`
          }
          return `Sisi tegak segitiga ini ${panjang(s)}, sisi mendatarnya ${panjang(c)}, dan sisi miringnya 1, jadi sin² θ + cos² θ ${sama(s * s)} ${hitung}. Ini berlaku di kuadran mana pun, karena tanda negatif hilang begitu dikuadratkan.`
        },
        rumus: '[sin:sin^2 θ] + [cos:cos^2 θ] = [satu:1]',
        durasi: 2600,
      },
    ],
  },

  eksperimen: {
    judul: 'Putar sudutnya sendiri',
    ajakan:
      'Putar titik merah muda di lingkaran sampai lewat 360°, atau seret titiknya di grafik. Garis putus-putus selalu menghubungkan keduanya.',
    params: [
      { key: 'theta', label: 'Sudut θ', min: 0, max: 720, step: 1, awal: 40, satuan: '°', simbol: 'θ', peran: 'hi' },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const theta = clamp(Math.round(p.theta ?? 40), 0, 720)
      const s = nol(Math.sin(rad(theta)))
      const c = nol(Math.cos(rad(theta)))
      const kuadran = Math.floor((theta % 360) / 90) + 1
      // Pasangan satu putaran yang masih bisa dicapai di eksperimen (0°–720°).
      const pasangan = theta + 360 <= 720 ? theta + 360 : theta - 360
      const letak =
        s === 0 || c === 0
          ? 'tepat di sumbu, bukan di kuadran mana pun'
          : `di kuadran ${kuadran}`
      return (
        <p>
          Pada θ = {fmt(theta)}°, titiknya berada {letak}:{' '}
          <strong>
            sin {sama(s)} {angka(s)}, cos {sama(c)} {angka(c)}
          </strong>
          .{' '}
          {s > 0
            ? 'Titiknya di atas sumbu mendatar, jadi sinusnya positif.'
            : s < 0
              ? 'Titiknya di bawah sumbu mendatar, jadi sinusnya negatif.'
              : 'Titiknya tepat pada sumbu mendatar, jadi sinusnya 0.'}{' '}
          {c > 0
            ? 'Ia di kanan pusat, jadi kosinusnya positif.'
            : c < 0
              ? 'Ia di kiri pusat, jadi kosinusnya negatif.'
              : 'Ia tepat pada sumbu tegak, tidak di kiri maupun di kanan pusat, jadi kosinusnya 0.'}{' '}
          Perhatikan sin² + cos² selalu bernilai 1 berapa pun sudutnya — itu Pythagoras, bukan
          kebetulan. Coba juga bandingkan {fmt(theta)}° dengan {fmt(pasangan)}°, yang terpaut
          satu putaran penuh: hasilnya sama persis.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Di segitiga siku-siku, sinus sebuah sudut adalah{' '}
          <strong>sisi depan dibagi sisi miring</strong>. Perbandingan ini tidak berubah walau
          segitiganya diperbesar atau diperkecil — karena itu ia layak diberi nama.
        </p>
        <p>
          Kalau segitiga itu digambar di dalam lingkaran berjari-jari 1, sisi miringnya bernilai 1.
          Membagi dengan 1 tidak mengubah apa pun, jadi <strong>sin θ = tinggi titiknya</strong>.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Lingkaran satuan memperluas arti sinus dan kosinus melampaui segitiga. Segitiga hanya
          sanggup menampung sudut antara 0° dan 90°, sedangkan sebuah titik bisa berputar sejauh apa
          pun. Dengan mendefinisikan
        </p>
        <p style={{ textAlign: 'center' }}>
          cos θ = absis titik, sin θ = ordinat titik
        </p>
        <p>
          kedua fungsi itu menjadi terdefinisi untuk semua bilangan real, termasuk sudut tumpul dan
          sudut negatif. Tanda pada tiap kuadran bukan hafalan: ia sekadar mengikuti letak titiknya.
        </p>
        <h4>Sifat yang langsung terbaca dari gambar</h4>
        <ul>
          <li>Periodisitas: sin(θ + 360°) = sin θ, karena titiknya kembali ke tempat yang sama.</li>
          <li>
            Identitas Pythagoras: sin²θ + cos²θ = 1, langsung dari segitiga bersisi miring 1. Di
            kuadran mana pun berlaku, karena tanda negatif hilang saat dikuadratkan.
          </li>
          <li>Sudut berelasi: sin(180° − θ) = sin θ, karena kedua titik punya ketinggian sama.</li>
          <li>Kesetaraan bentuk: cos θ = sin(θ + 90°), yaitu grafik yang sama tetapi bergeser.</li>
        </ul>
        <h4>Kenapa gelombang muncul di mana-mana</h4>
        <p>
          Setiap gerak melingkar beraturan yang diproyeksikan ke satu arah menghasilkan gerak
          harmonik sederhana, yang grafiknya sinus. Getaran bunyi, gelombang cahaya, arus listrik
          bolak-balik, dan ayunan bandul juga dimodelkan dengan sinus — bukan karena benda-benda itu
          berputar, melainkan karena persamaan yang mengaturnya berbentuk sama. Untuk bandul,
          kesamaan itu hanya berlaku mendekati, yaitu bila simpangannya kecil.
        </p>
        <p>
          Perlu diingat, satuan derajat hanyalah kesepakatan. Dalam kalkulus dipakai radian, karena
          hanya dengan radian berlaku d(sin x)/dx = cos x tanpa faktor tambahan.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[sin:sin θ] = [y:y],  [cos:cos θ] = [x:x],  [sin:sin^2 θ] + [cos:cos^2 θ] = [satu:1]',
    roles: { sin: 'a', cos: 'b', y: 'a', x: 'b', satu: 'hi' },
    arti: {
      sin: 'Tinggi titik pada lingkaran satuan (negatif bila di bawah sumbu mendatar).',
      cos: 'Posisi mendatar titik terhadap pusat (negatif bila di kiri pusat).',
      y: 'Ordinat titik — nilainya persis sama dengan sinus.',
      x: 'Absis titik — nilainya persis sama dengan kosinus.',
      satu: 'Jari-jari lingkaran satuan. Karena bernilai 1, identitas Pythagoras berbentuk sesederhana ini.',
    },
  },

  soal: [
    {
      id: 'sin-1',
      tipe: 'pilihan',
      topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
      kelas: 10,
      tingkat: 'mudah',
      konsep: 'sin-cos-lingkaran',
      pertanyaan: 'Berapa nilai sin 90°?',
      pilihan: [
        { id: 'a', label: '1', benar: true },
        { id: 'b', label: '90', diagnosa: 'Sinus bukan besar sudutnya. Nilainya tidak pernah lebih dari 1.' },
        { id: 'c', label: '0', diagnosa: 'Itu nilai cos 90°. Pada 90°, titiknya berada tepat di puncak lingkaran.' },
        { id: 'd', label: '½', diagnosa: 'Nilai ½ adalah sin 30°, bukan sin 90°.' },
      ],
      hint: [
        'Bayangkan titik pada lingkaran satuan di sudut 90°. Di mana letaknya?',
        'Titik itu berada tepat di atas pusat.',
        'Sinus adalah ketinggiannya, dan jari-jarinya 1.',
      ],
      pembahasan:
        'Pada 90°, titiknya berada di (0, 1). Karena sin θ adalah ordinatnya, sin 90° = 1. Sekaligus cos 90° = 0.',
    },
    {
      id: 'sin-2',
      tipe: 'benar-salah',
      topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'sin-cos-lingkaran',
      pertanyaan: 'Nilai sin θ bisa lebih besar dari 1 apabila sudutnya cukup besar.',
      jawaban: false,
      diagnosa:
        'Sinus adalah ketinggian titik pada lingkaran berjari-jari 1. Titik itu tidak pernah bisa lebih tinggi dari jari-jarinya sendiri.',
      hint: [
        'Ingat arti geometris sinus pada lingkaran satuan.',
        'Seberapa tinggi titik pada lingkaran berjari-jari 1 bisa naik?',
        'Perhatikan juga grafiknya: apakah pernah melewati garis 1?',
      ],
      pembahasan:
        'Salah. Selalu berlaku −1 ≤ sin θ ≤ 1, karena sinus adalah ordinat titik pada lingkaran berjari-jari 1. Memperbesar sudut hanya membuat titiknya berputar lagi, bukan naik lebih tinggi.',
    },
    {
      id: 'sin-3',
      tipe: 'angka',
      topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'sin-cos-lingkaran',
      pertanyaan:
        'Diketahui sin θ = 0,6 dan θ sudut lancip. Berapa nilai cos θ?',
      jawaban: 0.8,
      toleransi: 0.005,
      hint: [
        'Gunakan identitas yang berasal dari teorema Pythagoras.',
        'sin²θ + cos²θ = 1, jadi cos²θ = 1 − 0,36.',
        'Akarkan 0,64. Karena θ lancip, ambil nilai yang positif.',
      ],
      pembahasan:
        'cos²θ = 1 − 0,6² = 1 − 0,36 = 0,64, sehingga cos θ = 0,8. Ini segitiga 3-4-5 yang diskalakan menjadi 0,6-0,8-1.',
    },
    {
      id: 'sin-4',
      tipe: 'cocokkan',
      topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'sin-cos-lingkaran',
      pertanyaan: 'Pasangkan tiap sudut dengan nilai sinusnya.',
      pasangan: [
        { kiri: 'sin 0°', kanan: '0' },
        { kiri: 'sin 30°', kanan: '0,5' },
        { kiri: 'sin 90°', kanan: '1' },
        { kiri: 'sin 180°', kanan: '0' },
        { kiri: 'sin 270°', kanan: '−1' },
      ],
      hint: [
        'Bayangkan letak titiknya pada lingkaran untuk setiap sudut.',
        'Pada 0° dan 180°, titiknya berada di sumbu mendatar — tingginya nol.',
        'Pada 270°, titiknya berada di titik terendah.',
      ],
      pembahasan:
        'Empat nilai bisa dibaca langsung dari letak titik pada lingkaran satuan: 0° dan 180° di sumbu mendatar (tinggi 0), 90° di puncak (1), 270° di dasar (−1). Untuk 30° perlu satu langkah lagi: titik di 30°, pasangannya di −30°, dan pusat membentuk segitiga sama sisi (sudut di pusat 60°, dua sisinya jari-jari 1). Jadi jarak tegak kedua titik itu 1, dan tinggi titik di 30° tepat setengahnya, 0,5.',
    },
    {
      id: 'sin-5',
      tipe: 'urutkan',
      topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
      kelas: 11,
      tingkat: 'sulit',
      konsep: 'sin-cos-lingkaran',
      pertanyaan: 'Susun alasan kenapa grafik sinus berulang setiap 360°.',
      langkah: [
        'sin θ didefinisikan sebagai ketinggian titik pada lingkaran satuan',
        'Menambah sudut sebesar 360° berarti berputar satu putaran penuh',
        'Setelah satu putaran penuh, titiknya kembali ke posisi yang sama',
        'Posisi yang sama berarti ketinggian yang sama',
        'Karena itu sin(θ + 360°) = sin θ untuk setiap θ',
      ],
      hint: [
        'Mulailah dari definisi sinus, bukan dari grafiknya.',
        'Yang membuat nilainya berulang adalah posisi titik, bukan bentuk grafiknya.',
      ],
      pembahasan:
        'Periodisitas bukan sifat tambahan yang perlu dihafal — ia akibat langsung dari kenyataan bahwa lingkaran itu tertutup.',
    },
  ],

  lanjut: ['pythagoras', 'sudut-segitiga', 'turunan-kemiringan'],
}

export default konsep
