/* ============================================================
   KONSEP — Kenapa penyebut harus disamakan sebelum dijumlahkan?
   Kelas 5 · Bilangan

   Gagasan: pecahan menghitung POTONGAN. Menjumlahkan hanya masuk
   akal kalau potongan yang dihitung sama besar. Menyamakan penyebut
   bukan ritual — ia berarti memotong ulang kedua batang menjadi
   potongan sejenis, tanpa mengubah nilainya sedikit pun.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import { Pegangan, useInteraksi, useSeret } from '../components/Interaksi'
import { Svg, Tag, tinta, useSempit, useUkuranLayar } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, lcm, pecahanTeks, simplify } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/* ---------------- Tata letak ----------------
   Dua sistem koordinat: lebar untuk layar besar, tegak untuk HP.
   Setiap batang yang bisa dipegang punya dua titik (lihat PeganganBatang):
   - tepi atas, di ujung warna           → pembilang (banyak potong berwarna)
   - tepi bawah, di garis potong pertama → penyebut (ukuran satu potong);
     garis potong lainnya juga bisa dijepit dan diseret.

   Angka-angka di bawah dihitung untuk skala terkecil yang mungkin, yaitu
   ±0,76 px per satuan (HP 320 px, atau panggung lebar 560 px dikurangi
   bantalannya). Pada skala itu titik berjari-jari ±12, label nilainya
   setinggi ±30 dan duduk ±41 di atas titik, dan u(48) ≈ 63.
   - tinggi batang 64: dua titik satu batang bisa bertemu pada x yang sama
     (pembilang 1), jadi tinggi batang = jarak keduanya ≥ u(48).
   - celah antarbatang 74–76: label pembilang batang bawah yang sedang
     dipegang tidak menyentuh titik penyebut batang atas, dan ajakan
     "Seret garis potong" tidak menyentuh titik pembilang batang bawah.
   - batang atas cukup jauh dari tepi atas: label pembilangnya tidak
     menabrak keterangan dan tidak masuk ke bawah tombol layar penuh di
     pojok kanan atas (±58 satuan di HP).
   - keterangan HP di atas dipusatkan sedikit ke kiri (xKet) supaya baris
     terpanjangnya tidak masuk ke bawah tombol layar penuh itu.
   - teks pertama di BAWAH batang kedua (pesan langkah 1 pada bongkar,
     "penyebut sekutu terkecil" pada eksperimen) duduk paling sedikit
     ±37 satuan di bawah tepi bawah batang itu: saat penyebutnya dipegang,
     titiknya memakai lingkaran sorot berjari-jari 2,1 × jari-jari titik
     (±25 satuan pada skala terkecil), dan lingkaran itu tidak boleh
     menodai teksnya. */

/** Tata letak visual bongkar. */
function letakBongkar(sempit: boolean) {
  return sempit
    ? {
        w: 420,
        h: 506,
        x: 74,
        lebar: 310,
        tinggi: 64,
        tinggiHasil: 52,
        // keterangan dua baris di atas; pesan langkah 1 sedikit di bawah
        // batang hasil, yang tidak pernah tampak bersamaan dengannya
        xKet: 182,
        yKet: 22,
        ySalah: 362,
        barisKet: 23,
        ukKet: 15,
        y1: 118,
        y2: 258,
        yHasil: 350,
        ukHasil: 16,
      }
    : {
        w: 690,
        h: 482,
        x: 108,
        lebar: 500,
        tinggi: 64,
        tinggiHasil: 46,
        xKet: 345,
        yKet: 32,
        ySalah: 347,
        barisKet: 0,
        ukKet: 16,
        y1: 104,
        y2: 242,
        yHasil: 334,
        ukHasil: 18,
      }
}

/** Tata letak visual eksperimen. */
function letakEksperimen(sempit: boolean) {
  return sempit
    ? { w: 420, h: 482, x: 74, lebar: 310, tinggi: 64, tinggiSenilai: 46, yJudul: 26, ukJudul: 17, y1: 116, y2: 256, ySekutu: 360, y3: 374 }
    : { w: 690, h: 478, x: 108, lebar: 500, tinggi: 64, tinggiSenilai: 46, yJudul: 36, ukJudul: 20, y1: 110, y2: 248, ySekutu: 352, y3: 366 }
}

/** Jarak antara dua batang yang bertumpuk rapat (hasil, bentuk senilai). */
const JEDA_RAPAT = 8

/** Satu batang pecahan: dibagi `bagian`, tersorot `terisi` potong. */
function Batang({
  x,
  y,
  lebar,
  tinggi,
  bagian,
  terisi,
  warna,
  label,
  labelTampak = true,
  garisBaru,
  opacityGarisBaru = 0,
  garisAsli,
  nyala = false,
}: {
  x: number
  y: number
  lebar: number
  tinggi: number
  bagian: number
  terisi: number
  warna: string
  label?: string
  /** false selama pegangan pembilang menampilkan label yang sama di dekat jari. */
  labelTampak?: boolean
  /** garis potong tambahan yang sedang muncul (indeks relatif `bagian`). */
  garisBaru?: number
  opacityGarisBaru?: number
  /** penyebut semula: garis potong lamanya digambar sedikit lebih tebal. */
  garisAsli?: number
  nyala?: boolean
}) {
  const u = useUkuranLayar()
  const w = lebar / bagian
  const asli = garisAsli ?? bagian
  // Semua potongan harus digambar: kalau dibatasi, bagian berwarna tampak
  // lebih pendek daripada nilainya (mis. 7/9 dengan penyebut sekutu 90).
  const potong = bagian
  return (
    <g>
      {Array.from({ length: potong }, (_, i) => (
        <rect
          key={i}
          x={x + i * w}
          y={y}
          width={w}
          height={tinggi}
          fill={i < terisi ? warna : 'var(--surface)'}
          fillOpacity={i < terisi ? (nyala ? 0.72 : 0.5) : 1}
          stroke="var(--ink-3)"
          strokeWidth={0.8}
        />
      ))}
      {/* garis potong lama tetap terlihat setelah dipotong ulang: tiap potong
          lama terbelah menjadi beberapa potong baru yang sama besar */}
      {asli < bagian &&
        Array.from({ length: asli - 1 }, (_, i) => {
          const gx = x + ((i + 1) * lebar) / asli
          return <line key={`a${i}`} x1={gx} y1={y} x2={gx} y2={y + tinggi} stroke="var(--ink-2)" strokeWidth={1.6} />
        })}
      {/* garis potong yang baru muncul saat penyebut disamakan */}
      {garisBaru !== undefined &&
        opacityGarisBaru > 0.01 &&
        Array.from({ length: garisBaru - 1 }, (_, i) => {
          const gx = x + ((i + 1) * lebar) / garisBaru
          // Jangan gambar ulang garis yang memang sudah ada.
          const sudahAda = Math.abs(((i + 1) * bagian) / garisBaru % 1) < 1e-9
          if (sudahAda) return null
          return (
            <line
              key={`g${i}`}
              x1={gx}
              y1={y}
              x2={gx}
              y2={y + tinggi}
              stroke="var(--m-hi)"
              strokeWidth={2}
              opacity={opacityGarisBaru}
            />
          )
        })}
      <rect
        x={x}
        y={y}
        width={lebar}
        height={tinggi}
        fill="none"
        stroke={nyala ? warna : 'var(--ink-2)'}
        strokeWidth={nyala ? 3 : 2}
      />
      {label && labelTampak && (
        <text
          x={x - 14}
          y={y + tinggi / 2}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={Math.max(20, u(15))}
          fontWeight={800}
          fill={tinta(warna)}
          fontFamily="var(--font-math)"
        >
          {label}
        </text>
      )}
    </g>
  )
}

/**
 * Semua yang bisa dipegang pada satu batang pecahan.
 *
 * Pembilang: titik di tepi atas, tepat di ujung bagian berwarna.
 *   posisi  x + lebar · p/q      →  p = (jari − x) · q / lebar
 *
 * Penyebut: garis potong. Garis ke-k berada di x + k · lebar/q. Menggeser
 * garis ke kiri memperkecil setiap potong, jadi potongannya makin banyak.
 *   posisi  x + k · lebar/q      →  q = k · lebar / (jari − x)
 * - Titik di tepi bawah garis pertama (k = 1): pegangan yang terlihat,
 *   bisa dipakai dengan papan ketik, dan diberi ajakan.
 * - Garis potong mana pun bisa dijepit dan diseret (seperti akordeon):
 *   garis yang dipegang tetap menempel di jari. Ini perlu karena ukuran
 *   satu potong berubah makin sedikit saat q besar — pada garis pertama,
 *   beda 8 dan 9 potong di HP hanya ±4 px, sedangkan pada garis ke-7
 *   bedanya ±30 px. Garis ke-k paling jauh sampai ujung batang (q = k),
 *   jadi q dijepit ≥ k; di situ garisnya menyatu dengan tepi kanan.
 * Pembilang tidak boleh melebihi penyebut. Kalau penyebut dikecilkan
 * (dari gambar atau kontrol angka), pembilangnya ikut dijepit, supaya
 * angka di kontrol tidak berbeda dengan pecahan yang tergambar.
 * Pembulatan ke bilangan bulat dan batas penggeser dikerjakan mesin.
 */
function PeganganBatang({
  x,
  y,
  lebar,
  tinggi,
  p,
  q,
  kunciP,
  kunciQ,
  labelP,
  warna,
  utama = false,
}: {
  x: number
  y: number
  lebar: number
  tinggi: number
  p: number
  q: number
  kunciP: string
  kunciQ: string
  labelP: string
  warna: string
  utama?: boolean
}) {
  const ctx = useInteraksi()
  const u = useUkuranLayar()

  // Jaga pembilang ≤ penyebut pada nilai resmi. Gambar sudah menjepitnya
  // (bacaParam), tetapi tanpa ini kontrol angka bisa menulis "a = 5" di
  // sebelah gambar 2/2 setelah garis potong diseret ke kanan.
  const nilaiP = ctx?.kendali.nilai[kunciP]
  const nilaiQ = ctx?.kendali.nilai[kunciQ]
  const atur = ctx?.kendali.atur
  // Tanpa { halus }: efek ini berjalan sebelum efek animasi useKendali, dan
  // opsi halus akan membuat seret penyebut yang sedang berjalan ikut
  // dianimasikan alih-alih menempel di jari. Gambarnya sudah menampilkan
  // pembilang yang dijepit, jadi tidak ada yang melompat.
  useEffect(() => {
    if (atur && nilaiP !== undefined && nilaiQ !== undefined && nilaiP > nilaiQ) atur({ [kunciP]: nilaiQ })
  }, [atur, nilaiP, nilaiQ, kunciP])

  // Garis ke berapa yang sedang dijepit, dan jarak jari dari garis itu saat
  // mulai (supaya garisnya tidak meloncat ke jari).
  const [dijepit, setDijepit] = useState<number | null>(null)
  const jepit = useRef({ k: 1, dx: 0 })
  const seret = useSeret({
    mulai: (pt) => {
      const k = clamp(Math.round(((pt.x - x) * q) / lebar), 1, q - 1)
      jepit.current = { k, dx: pt.x - (x + (k * lebar) / q) }
      setDijepit(k)
      ctx?.kendali.setAktif(kunciQ)
    },
    gerak: (pt) => {
      const { k, dx } = jepit.current
      const jarak = pt.x - dx - x
      const baru = jarak > 1e-6 ? (k * lebar) / jarak : 1e6
      // Paling sedikit k potong: garis ke-k boleh didorong sampai ujung
      // batang (lalu menyatu dengan tepinya). Kalau dijepit ≥ k + 1, garis
      // potong terakhir tidak bisa diseret ke kanan sama sekali.
      ctx?.kendali.atur({ [kunciQ]: Math.max(k, baru) })
    },
    selesai: () => {
      setDijepit(null)
      ctx?.kendali.setAktif(null)
    },
  })

  const jarakGaris = lebar / q
  const lebarJepit = Math.min(jarakGaris * 0.8, u(28))
  // Garis yang disorot: yang dijepit, atau garis pertama saat titiknya dipegang.
  // Bila garis yang dijepit sudah didorong ke ujung (q = k), tepi kanan
  // batanglah yang disorot.
  const kSorot = dijepit ?? (ctx?.kendali.aktif === kunciQ ? 1 : null)
  const kGaris = kSorot === null ? null : Math.min(kSorot, q)

  return (
    <>
      {/* area jepit tak terlihat di setiap garis potong */}
      <g {...seret} style={{ ...seret.style, cursor: 'ew-resize' }} data-param={kunciQ}>
        {Array.from({ length: q - 1 }, (_, i) => (
          <rect
            key={i}
            x={x + (i + 1) * jarakGaris - lebarJepit / 2}
            y={y}
            width={lebarJepit}
            height={tinggi}
            fill="transparent"
          />
        ))}
      </g>
      {kGaris !== null && (
        <line
          x1={x + kGaris * jarakGaris}
          y1={y}
          x2={x + kGaris * jarakGaris}
          y2={y + tinggi}
          stroke={warna}
          strokeWidth={Math.max(3, u(3.5))}
          style={{ pointerEvents: 'none' }}
        />
      )}
      {/* Tanpa label nilai: labelnya akan menutupi potongan yang sedang
          berubah. Pecahan di kiri batang ikut berubah dan dekat dengan jari.
          Ajakan dan denyut ditahan selama titik LAIN sedang dipegang: ajakan
          ini duduk di bawah batangnya, tepat di tempat label nilai titik
          pembilang batang berikutnya muncul. */}
      <Pegangan
        x={x + lebar / q}
        y={y + tinggi}
        param={kunciQ}
        arah="x"
        utama={utama && ctx?.kendali.aktif == null}
        ajakan="Seret garis potong"
        keNilai={(pt) => lebar / Math.max(1e-6, pt.x - x)}
      />
      <Pegangan
        x={x + (lebar * p) / q}
        y={y}
        param={kunciP}
        arah="x"
        label={labelP}
        keNilai={(pt) => clamp(((pt.x - x) * q) / lebar, 1, q)}
      />
    </>
  )
}

/** Keterangan pada gambar: satu baris di layar lebar, dipecah di HP. */
function Keterangan({
  baris,
  x,
  y,
  jarak,
  sempit,
  warna,
  size,
}: {
  baris: string[]
  x: number
  y: number
  jarak: number
  sempit: boolean
  warna: string
  size: number
}) {
  const teks = sempit ? baris : [baris.join(' ')]
  return (
    <>
      {teks.map((b, i) => (
        <Tag key={i} x={x} y={y + i * jarak} warna={warna} size={size}>
          {b}
        </Tag>
      ))}
    </>
  )
}

function bacaParam(p: Record<string, number>) {
  const q1 = clamp(Math.round(p.q1 ?? 2), 2, 12)
  const q2 = clamp(Math.round(p.q2 ?? 4), 2, 12)
  const p1 = clamp(Math.round(p.p1 ?? 1), 1, q1)
  const p2 = clamp(Math.round(p.p2 ?? 1), 1, q2)
  const L = lcm(q1, q2)
  const a = (p1 * L) / q1
  const b = (p2 * L) / q2
  const total = a + b
  const [hp, hq] = simplify(total, L)
  // Bentuk akhir hasil (disederhanakan atau pecahan campuran), hanya bila
  // berbeda dari total/L.
  const bentukAkhir = pecahanTeks(total, L, true)
  const ringkas = bentukAkhir !== `${total}/${L}` ? bentukAkhir : null
  // Batang mana yang harus dipotong ulang supaya keduanya berisi L bagian.
  const dipotong: 'keduanya' | 'atas' | 'bawah' | 'tidak ada' =
    q1 !== L && q2 !== L ? 'keduanya' : q1 !== L ? 'atas' : q2 !== L ? 'bawah' : 'tidak ada'
  return { p1, q1, p2, q2, L, a, b, total, hp, hq, ringkas, dipotong }
}

/** Tulis pecahan dengan angka gaya Indonesia, mis. "3/4". */
const pec = (x: number, y: number) => `${fmt(x)}/${fmt(y)}`

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { p1, q1, p2, q2, L: kpk, a, b, total, ringkas, dipotong } = bacaParam(p)
  const sempit = useSempit()
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const L = letakBongkar(sempit)
  const cx = L.w / 2
  const BH = L.tinggi

  const salahGabung = step === 1 ? seg(t, 0.2, 0.8) : 0
  const potongUlang = step >= 2 ? (step === 2 ? seg(t, 0.15, 0.85) : 1) : 0
  const sejenis = fase(step, t, 3)
  const jumlah = step >= 4 ? (step === 4 ? seg(t, 0.15, 0.9) : 1) : 0

  const { y1, y2 } = L
  const yh = L.yHasil
  const HH = L.tinggiHasil
  const yhBawah = total <= kpk ? yh + HH : yh + 2 * HH + JEDA_RAPAT

  // Memegang titik sebuah batang ikut menyalakan batang itu (lewat sorot a/b).
  const nyala1 = sorot === 'a' || sorot === 'q'
  const nyala2 = sorot === 'b' || sorot === 'q'
  const nyalaHasil = sorot === 'hasil'

  // Setelah dipotong ulang, kedua batang memakai kpk bagian.
  const bagian1 = potongUlang > 0.55 ? kpk : q1
  const bagian2 = potongUlang > 0.55 ? kpk : q2
  const isi1 = potongUlang > 0.55 ? a : p1
  const isi2 = potongUlang > 0.55 ? b : p2
  const label1 = `${fmt(isi1)}/${fmt(bagian1)}`
  const label2 = `${fmt(isi2)}/${fmt(bagian2)}`
  const opacityBaru = potongUlang < 0.55 ? potongUlang / 0.55 : 0

  const bentang = { x: L.x, lebar: L.lebar, tinggi: BH }
  const bentangHasil = { x: L.x, lebar: L.lebar, tinggi: L.tinggiHasil }

  return (
    <Svg w={L.w} h={L.h} maxH={L.h} label="Dua batang pecahan yang dipotong ulang agar potongannya sama besar">
      <Batang
        {...bentang}
        y={y1}
        bagian={bagian1}
        terisi={isi1}
        warna="var(--m-a)"
        label={label1}
        labelTampak={aktif !== 'p1'}
        garisBaru={kpk}
        opacityGarisBaru={opacityBaru}
        garisAsli={q1}
        nyala={nyala1}
      />
      <Batang
        {...bentang}
        y={y2}
        bagian={bagian2}
        terisi={isi2}
        warna="var(--m-b)"
        label={label2}
        labelTampak={aktif !== 'p2'}
        garisBaru={kpk}
        opacityGarisBaru={opacityBaru}
        garisAsli={q2}
        nyala={nyala2}
      />

      {/* langkah 1: mencoba menggabungkan potongan yang beda ukuran */}
      {salahGabung > 0.05 && (
        <g opacity={salahGabung}>
          <rect x={L.x} y={y1 - 8} width={(p1 / q1) * L.lebar} height={BH + 16} rx={8} fill="none" stroke="var(--m-hi)" strokeWidth={2} strokeDasharray="6 5" />
          <rect x={L.x} y={y2 - 8} width={(p2 / q2) * L.lebar} height={BH + 16} rx={8} fill="none" stroke="var(--m-hi)" strokeWidth={2} strokeDasharray="6 5" />
          <Keterangan
            x={cx}
            y={L.ySalah}
            jarak={L.barisKet}
            sempit={sempit}
            warna="var(--m-hi)"
            size={L.ukKet}
            baris={
              q1 === q2
                ? [`${fmt(p1)} potong + ${fmt(p2)} potong = ${fmt(p1 + p2)} potong —`, 'potongannya sejenis']
                : [`${fmt(p1)} potong + ${fmt(p2)} potong = ${fmt(p1 + p2)} potong…`, 'tapi potong yang mana?']
            }
          />
        </g>
      )}

      {/* batang hasil */}
      {jumlah > 0.05 && (
        <g opacity={jumlah}>
          {total <= kpk ? (
            <Batang
              {...bentangHasil}
              y={yh}
              bagian={kpk}
              terisi={total}
              warna="var(--m-ab)"
              label={`${fmt(total)}/${fmt(kpk)}`}
              nyala={nyalaHasil}
            />
          ) : (
            <>
              {/* Lebih dari satu utuh: dua baris dengan skala yang SAMA seperti
                  batang di atas, supaya hasil tidak tampak lebih pendek. */}
              <Batang {...bentangHasil} y={yh} bagian={kpk} terisi={kpk} warna="var(--m-ab)" label="1" nyala={nyalaHasil} />
              <Batang
                {...bentangHasil}
                y={yh + HH + JEDA_RAPAT}
                bagian={kpk}
                terisi={total - kpk}
                warna="var(--m-ab)"
                label={`${fmt(total - kpk)}/${fmt(kpk)}`}
                nyala={nyalaHasil}
              />
            </>
          )}
          <Tag x={cx} y={yhBawah + 28} warna="var(--m-ab)" size={L.ukHasil}>
            {`${fmt(a)}/${fmt(kpk)} + ${fmt(b)}/${fmt(kpk)} = ${fmt(total)}/${fmt(kpk)}${ringkas ? ` = ${ringkas}` : ''}`}
          </Tag>
        </g>
      )}

      {/* keterangan */}
      {step === 2 && (
        <Keterangan
          x={L.xKet}
          y={L.yKet}
          jarak={L.barisKet}
          sempit={sempit}
          warna="var(--m-hi)"
          size={L.ukKet}
          baris={
            dipotong === 'keduanya'
              ? ['kedua batang dipotong ulang', `menjadi ${fmt(kpk)} bagian`]
              : dipotong === 'atas'
                ? ['batang atas dipotong ulang', `menjadi ${fmt(kpk)} bagian`]
                : dipotong === 'bawah'
                  ? ['batang bawah dipotong ulang', `menjadi ${fmt(kpk)} bagian`]
                  : ['penyebutnya sudah sama,', 'tidak ada yang perlu dipotong ulang']
          }
        />
      )}
      {sejenis > 0.4 && jumlah < 0.05 && (
        <Keterangan
          x={L.xKet}
          y={L.yKet}
          jarak={L.barisKet}
          sempit={sempit}
          warna="var(--m-ab)"
          size={L.ukKet}
          baris={
            dipotong === 'tidak ada'
              ? ['semua potongan', 'memang sudah sama besar']
              : ['sekarang semua potongan', 'sama besar']
          }
        />
      )}
      {step === 0 && (
        <Keterangan
          x={L.xKet}
          y={L.yKet}
          jarak={L.barisKet}
          sempit={sempit}
          warna="var(--ink-2)"
          size={L.ukKet}
          baris={
            q1 === q2
              ? ['panjang seluruh batang sama,', 'ukuran potongannya pun sama']
              : ['panjang seluruh batang sama,', 'tetapi ukuran potongannya berbeda']
          }
        />
      )}

      {/* Titik seret: tepi warna (pembilang) dan garis potong pertama
          (penyebut). Setelah dipotong ulang, titik penyebut tetap menempel
          pada garis potong lama yang digambar lebih tebal. */}
      <PeganganBatang {...bentang} y={y1} p={p1} q={q1} kunciP="p1" kunciQ="q1" labelP={label1} warna="var(--m-a)" utama />
      <PeganganBatang {...bentang} y={y2} p={p2} q={q2} kunciP="p2" kunciQ="q2" labelP={label2} warna="var(--m-b)" />
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const { p1, q1, p2, q2, L: kpk, a, b, total } = bacaParam(p)
  const sempit = useSempit()
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const L = letakEksperimen(sempit)
  const cx = L.w / 2
  const { y1, y2, y3 } = L
  const y4 = y3 + L.tinggiSenilai + JEDA_RAPAT

  const label1 = `${fmt(p1)}/${fmt(q1)}`
  const label2 = `${fmt(p2)}/${fmt(q2)}`
  const bentang = { x: L.x, lebar: L.lebar, tinggi: L.tinggi }
  const bentangSenilai = { x: L.x, lebar: L.lebar, tinggi: L.tinggiSenilai }

  return (
    <Svg w={L.w} h={L.h} maxH={L.h} label="Dua pecahan yang bisa diubah, beserta bentuk senilai dan jumlahnya">
      {/* dua pecahan asli: bisa dipegang */}
      <Batang
        {...bentang}
        y={y1}
        bagian={q1}
        terisi={p1}
        warna="var(--m-a)"
        label={label1}
        labelTampak={aktif !== 'p1'}
        nyala={sorot === 'a'}
      />
      <Batang
        {...bentang}
        y={y2}
        bagian={q2}
        terisi={p2}
        warna="var(--m-b)"
        label={label2}
        labelTampak={aktif !== 'p2'}
        nyala={sorot === 'b'}
      />

      {/* Bentuk senilainya setelah dipotong ulang: mengikuti batang di atas.
          Batang senilai ikut menyala bersama batang asalnya, karena rumus
          hidup di bawah gambar justru menuliskan bentuk senilai itu — kalau
          hanya batang atas yang menyala, bagian rumus yang berbunyi a/kpk
          menunjuk batang yang terbaca p/q. */}
      <Tag x={cx} y={L.ySekutu} warna="var(--m-ab)" size={15}>
        {`penyebut sekutu terkecil: ${fmt(kpk)}`}
      </Tag>
      <Batang
        {...bentangSenilai}
        y={y3}
        bagian={kpk}
        terisi={a}
        warna="var(--m-a)"
        label={`${fmt(a)}/${fmt(kpk)}`}
        garisAsli={q1}
        nyala={sorot === 'a' || sorot === 'q'}
      />
      <Batang
        {...bentangSenilai}
        y={y4}
        bagian={kpk}
        terisi={b}
        warna="var(--m-b)"
        label={`${fmt(b)}/${fmt(kpk)}`}
        garisAsli={q2}
        nyala={sorot === 'b' || sorot === 'q'}
      />

      <Tag x={cx} y={L.yJudul} warna="var(--ink)" size={L.ukJudul}>
        {`${label1} + ${label2} = ${pecahanTeks(total, kpk, true)}`}
      </Tag>

      <PeganganBatang {...bentang} y={y1} p={p1} q={q1} kunciP="p1" kunciQ="q1" labelP={label1} warna="var(--m-a)" utama />
      <PeganganBatang {...bentang} y={y2} p={p2} q={q2} kunciP="p2" kunciQ="q2" labelP={label2} warna="var(--m-b)" />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'pecahan-penyebut',
  topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
  judul: 'Menjumlahkan pecahan',
  pertanyaan: 'Kenapa penyebut harus disamakan dulu sebelum pecahan dijumlahkan?',
  tagline: 'Coba jumlahkan potongan yang ukurannya berbeda — kamu akan lihat sendiri masalahnya.',
  kelas: 5,
  domain: 'bilangan',
  tags: ['pecahan', 'penyebut', 'penjumlahan', 'KPK', 'pecahan senilai'],

  tebak: {
    pertanyaan: 'Berapa hasil ½ + ¼?',
    pilihan: [
      {
        id: 'a',
        label: '2/6',
        balasan:
          'Ini jawaban yang paling sering muncul: pembilang dijumlah, penyebut dijumlah. Tapi coba pikir — 2/6 itu kurang dari ½. Masa menambah sesuatu justru membuatnya mengecil?',
      },
      {
        id: 'b',
        label: '3/4',
        benar: true,
        balasan: 'Betul. Dan sebentar lagi kamu bisa melihat kenapa angka 4 itu muncul.',
      },
      {
        id: 'c',
        label: '2/4',
        balasan:
          'Angka 2/4 sama dengan ½ — berarti bagian ¼ tadi hilang entah ke mana. Padahal ia benar-benar menambah sesuatu.',
      },
    ],
    penutup:
      'Uji cepat yang selalu berguna: hasil penjumlahan dua bilangan positif harus lebih besar daripada masing-masingnya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      // Lambang mengikuti rumus akhir a/b + c/d; warnanya warna batangnya.
      { key: 'p1', label: 'Pembilang pertama', min: 1, max: 5, step: 1, awal: 1, bulat: true, simbol: 'a', peran: 'a', bagian: 'a' },
      { key: 'q1', label: 'Penyebut pertama', min: 2, max: 8, step: 1, awal: 2, bulat: true, simbol: 'b', peran: 'a', bagian: 'a' },
      { key: 'p2', label: 'Pembilang kedua', min: 1, max: 5, step: 1, awal: 1, bulat: true, simbol: 'c', peran: 'b', bagian: 'b' },
      { key: 'q2', label: 'Penyebut kedua', min: 2, max: 8, step: 1, awal: 4, bulat: true, simbol: 'd', peran: 'b', bagian: 'b' },
    ],
    roles: { a: 'a', b: 'b', q: 'hi', hasil: 'ab' },
    arti: {
      a: 'Pecahan pertama.',
      b: 'Pecahan kedua.',
      q: 'Penyebut sekutu — ukuran potongan baru yang dipakai kedua batang. Rumus umum memakai b×d, yang selalu bisa; gambar memakai KPK-nya, yang tidak pernah lebih besar dan sering lebih kecil.',
      hasil: 'Jumlahnya, dihitung setelah potongannya sejenis.',
    },
    steps: [
      {
        id: 's0',
        judul: (p) => {
          const { q1, q2 } = bacaParam(p)
          return q1 === q2 ? 'Dua batang, ukuran potongan sama' : 'Dua batang, dua ukuran potongan'
        },
        narasi: (p) => {
          const { q1, q2 } = bacaParam(p)
          return q1 === q2
            ? `Panjang seluruh batang sama — keduanya mewakili satu utuh. Cara memotongnya pun sama: keduanya dipotong menjadi ${fmt(q1)} bagian, jadi ukuran potongannya sudah sama besar.`
            : `Panjang seluruh batang sama — keduanya mewakili satu utuh. Yang berbeda cuma cara memotongnya: batang atas dipotong menjadi ${fmt(q1)} bagian, batang bawah menjadi ${fmt(q2)} bagian.`
        },
        rumus: (p) => {
          const { p1, q1, p2, q2 } = bacaParam(p)
          return `[a:${pec(p1, q1)}] + [b:${pec(p2, q2)}] = ?`
        },
        durasi: 1800,
      },
      {
        id: 's1',
        judul: (p) => {
          const { q1, q2 } = bacaParam(p)
          return q1 === q2 ? 'Gabungkan begitu saja — kali ini boleh' : 'Coba gabungkan begitu saja'
        },
        narasi: (p) => {
          const { p1, q1, p2, q2 } = bacaParam(p)
          const n = fmt(p1 + p2)
          return q1 === q2
            ? `Kalau langsung dihitung, ${fmt(p1)} potong tambah ${fmt(p2)} potong sama dengan ${n} potong — dan kali ini itu benar. Kedua batang dipotong menjadi ${fmt(q1)} bagian, jadi potongannya sejenis dan boleh langsung dihitung bersama.`
            : `Kalau langsung dihitung "${fmt(p1)} potong tambah ${fmt(p2)} potong sama dengan ${n} potong", pertanyaannya: ${n} potong berukuran apa? Potongannya tidak sejenis, jadi tidak bisa dihitung bersama.`
        },
        durasi: 2400,
      },
      {
        id: 's2',
        judul: (p) =>
          bacaParam(p).dipotong === 'tidak ada' ? 'Tidak ada yang perlu dipotong ulang' : 'Potong ulang supaya sejenis',
        narasi: (p) => {
          const { q1, q2, L, dipotong } = bacaParam(p)
          const tetap = 'Bagian berwarnanya tidak bertambah maupun berkurang — panjangnya persis sama seperti tadi.'
          if (dipotong === 'keduanya')
            return `Kedua batang dipotong lagi menjadi ${fmt(L)} bagian: tiap potongan atas terbelah jadi ${fmt(L / q1)}, tiap potongan bawah jadi ${fmt(L / q2)}. ${tetap}`
          if (dipotong === 'atas')
            return `Batang atas dipotong lagi menjadi ${fmt(L)} bagian: tiap potongan lamanya terbelah jadi ${fmt(L / q1)}. ${tetap}`
          if (dipotong === 'bawah')
            return `Batang bawah dipotong lagi menjadi ${fmt(L)} bagian: tiap potongan lamanya terbelah jadi ${fmt(L / q2)}. ${tetap}`
          return `Kedua penyebutnya sudah ${fmt(L)}, jadi tidak ada batang yang perlu dipotong ulang. Bagian berwarnanya tetap persis seperti tadi.`
        },
        durasi: 2400,
      },
      {
        id: 's3',
        judul: (p) =>
          bacaParam(p).dipotong === 'tidak ada'
            ? 'Potongannya memang sudah sama besar'
            : 'Sekarang potongannya sama besar',
        narasi: (p) => {
          const { p1, q1, p2, q2, L, a, b, dipotong } = bacaParam(p)
          if (dipotong === 'tidak ada')
            return `Kedua batang tetap terbaca ${pec(p1, q1)} dan ${pec(p2, q2)}, karena potongannya memang sudah sama besar sejak awal. Tidak ada nama yang perlu diganti.`
          const atas = dipotong === 'bawah' ? `tetap terbaca ${pec(a, L)}` : `kini terbaca ${pec(a, L)}`
          const bawah = dipotong === 'atas' ? `tetap terbaca ${pec(b, L)}` : `kini terbaca ${pec(b, L)}`
          return `Batang pertama ${atas}, batang kedua ${bawah}. Nilainya sama sekali tidak berubah, hanya namanya yang berganti.`
        },
        rumus: (p) => {
          const { p1, q1, p2, q2, L, a, b, dipotong } = bacaParam(p)
          const asal = `[a:${pec(p1, q1)}] + [b:${pec(p2, q2)}]`
          return dipotong === 'tidak ada' ? asal : `${asal} = [a:${pec(a, L)}] + [b:${pec(b, L)}]`
        },
        durasi: 2000,
      },
      {
        id: 's4',
        judul: (p) =>
          bacaParam(p).dipotong === 'tidak ada' ? 'Tinggal dijumlahkan' : 'Baru boleh dijumlahkan',
        narasi: (p) => {
          const { L, a, b, total, hp, hq, ringkas } = bacaParam(p)
          const ekor =
            total === L
              ? ', yaitu tepat 1 utuh'
              : total > L
                ? hq === 1
                  ? `, yaitu tepat ${fmt(hp)} utuh`
                  : ` — lebih dari satu utuh, yaitu ${pecahanTeks(total, L, true)}`
                : ringkas
                  ? `, atau ${ringkas} setelah disederhanakan`
                  : ''
          return `${fmt(a)} potong ditambah ${fmt(b)} potong sama dengan ${fmt(total)} potong. Karena satu utuh berisi ${fmt(L)} potong, hasilnya ${pec(total, L)}${ekor}.`
        },
        rumus: (p) => {
          const { L, a, b, total, ringkas } = bacaParam(p)
          return `[a:${pec(a, L)}] + [b:${pec(b, L)}] = [hasil:${pec(total, L)}]${ringkas ? ` = [hasil:${ringkas}]` : ''}`
        },
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Itulah gunanya menyamakan penyebut',
        narasi:
          'Penyebut menyatakan ukuran potongan. Menyamakannya berarti memastikan yang kamu hitung memang benda sejenis — sama seperti kamu tidak menjumlahkan 3 apel dengan 2 jeruk lalu menyebutnya 5 apel.',
        rumus: '[a:a/b] + [b:c/d] = (a×d + c×b) / [q:(b×d)]',
        durasi: 2400,
      },
    ],
  },

  eksperimen: {
    judul: 'Ganti kedua pecahannya',
    ajakan:
      'Seret titik di ujung warna untuk mengubah pembilang, atau garis potong mana saja untuk mengubah penyebut. Warna di batang bawah selalu sama panjang dengan pasangannya di atas.',
    params: [
      { key: 'p1', label: 'Pembilang pertama', min: 1, max: 7, step: 1, awal: 1, bulat: true, simbol: 'a', peran: 'a', bagian: 'a' },
      { key: 'q1', label: 'Penyebut pertama', min: 2, max: 10, step: 1, awal: 2, bulat: true, simbol: 'b', peran: 'a', bagian: 'a' },
      { key: 'p2', label: 'Pembilang kedua', min: 1, max: 7, step: 1, awal: 1, bulat: true, simbol: 'c', peran: 'b', bagian: 'b' },
      { key: 'q2', label: 'Penyebut kedua', min: 2, max: 10, step: 1, awal: 3, bulat: true, simbol: 'd', peran: 'b', bagian: 'b' },
    ],
    Visual: VisualEksperimen,
    // Rumus hidup di bawah gambar: bentuk senilai yang dijumlahkan. Pecahan
    // aslinya dan hasil sederhananya sudah tertulis di atas batang.
    rumus: (p) => {
      const { L, a, b, total } = bacaParam(p)
      return `[a:${pec(a, L)}] + [b:${pec(b, L)}] = ${pec(total, L)}`
    },
    temuan: (p) => {
      const { p1, q1, p2, q2, L, a, b, total } = bacaParam(p)
      const sama = q1 === q2
      return (
        <p>
          <strong>
            {fmt(p1)}/{fmt(q1)} + {fmt(p2)}/{fmt(q2)} = {pecahanTeks(total, L, true)}
          </strong>
          . Penyebut sekutu terkecilnya {fmt(L)}, sehingga kedua pecahan ditulis ulang menjadi{' '}
          {fmt(a)}/{fmt(L)} dan {fmt(b)}/{fmt(L)}.{' '}
          {sama
            ? 'Karena penyebutnya sudah sama, tidak ada yang perlu dipotong ulang — tinggal dijumlahkan.'
            : 'Coba seret garis potong sampai kedua penyebutnya sama: setiap batang bawah akan tampak persis sama dengan pasangannya di atas, karena tidak ada yang perlu dipotong ulang.'}{' '}
          Perhatikan juga: hasilnya selalu lebih besar daripada kedua pecahan asalnya.
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Bayangkan kamu punya dua kue yang besarnya sama. Kue pertama dipotong jadi{' '}
          <strong>2</strong> bagian, kue kedua dipotong jadi <strong>4</strong> bagian.
        </p>
        <p>
          Kamu mengambil 1 potong dari masing-masing kue. Kalau ditanya "dapat berapa potong?",
          jawabannya memang 2 potong — tapi 2 potong yang tidak sama besar. Jadi tidak bisa langsung
          disebut 2 per sekian.
        </p>
        <p>
          Caranya: potong dulu kue pertama menjadi 4 juga. Sekarang potongan yang tadi 1 dari 2
          berubah menjadi 2 dari 4 — <strong>besarnya sama saja</strong>, cuma dipotong lebih halus.
        </p>
        <p>
          Setelah itu barulah bisa dijumlahkan: 2 potong seperempat + 1 potong seperempat = 3 potong
          seperempat, yaitu 3/4.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Penyebut memberi tahu <strong>ukuran satu potong</strong>, pembilang memberi tahu{' '}
          <strong>berapa banyak potong</strong> yang diambil. Menjumlahkan berarti menghitung total
          potongan — dan itu hanya bermakna kalau potongannya sejenis.
        </p>
        <p>
          Mengubah 1/2 menjadi 2/4 memakai sifat pecahan senilai: mengalikan pembilang dan penyebut
          dengan bilangan yang sama (asal bukan nol) sama saja dengan mengalikan dengan 1, sehingga
          nilainya tidak berubah.
        </p>
        <p style={{ textAlign: 'center' }}>
          a/b = (a×k)/(b×k) untuk k ≠ 0, karena (a/b) × (k/k) = (a/b) × 1
        </p>
        <p>
          Secara umum: a/b + c/d = (a·d + c·b)/(b·d). Memakai KPK dari b dan d menghasilkan angka
          yang tidak pernah lebih besar — sering lebih kecil, dan sama dengan b·d bila b dan d tidak
          punya faktor sekutu selain 1 (misalnya 4 dan 5). Hasil akhirnya tetap sama setelah disederhanakan.
        </p>
        <h4>Kenapa pada perkalian tidak perlu disamakan?</h4>
        <p>
          Karena perkaliannya menanyakan hal yang berbeda. "⅔ × ¾" berarti "ambil dua pertiga dari
          tiga perempat" — bukan menghitung banyaknya potongan sejenis, melainkan memotong sesuatu
          yang sudah terpotong. Pada gambar, itu berarti membagi persegi ke dua arah sekaligus,
          sehingga banyaknya potongan kecil menjadi 3 × 4 = 12. Itulah sebabnya penyebutnya dikalikan
          begitu saja.
        </p>
        <h4>Uji cepat yang menyelamatkan</h4>
        <p>
          Jumlah dua pecahan positif harus lebih besar daripada masing-masingnya. Jawaban populer
          ½ + ¼ = 2/6 gagal uji ini, karena 2/6 lebih kecil daripada ½.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Penjumlahan pecahan didefinisikan lewat gagasan penyebut bersama karena bilangan rasional
          dibangun sebagai kelas ekuivalensi pasangan bilangan bulat dengan komponen kedua bukan nol:
          (a, b) ~ (c, d) bila ad = bc. Operasi
        </p>
        <p style={{ textAlign: 'center' }}>a/b + c/d := (ad + cb)/(bd)</p>
        <p>
          sebenarnya tidak punya pilihan lain: bila a/b dimaknai sebagai a × b⁻¹ di dalam lapangan
          (field) yang memuat ℤ, sifat distributif memaksa a × b⁻¹ + c × d⁻¹ = (ad + cb) × (bd)⁻¹.
          Definisi "naif" (a + c)/(b + d) bahkan tidak terdefinisi dengan baik: 1/2 dan 2/4 mewakili
          bilangan yang sama, tetapi 1/2 + 1/4 secara naif menjadi (1+1)/(2+4) = 2/6 = 1/3, sedangkan
          2/4 + 1/4 menjadi (2+1)/(4+4) = 3/8 — hasilnya bergantung pada penulisan, bukan pada
          nilainya.
        </p>
        <p>
          Menariknya, operasi naif itu tetap punya makna di tempat lain: (a+c)/(b+d) disebut{' '}
          <em>mediant</em>, muncul pada barisan Farey dan pohon Stern–Brocot. Ia bukan penjumlahan,
          melainkan operasi lain pada pasangan (pembilang, penyebut) yang — asalkan penyebutnya
          positif — selalu menghasilkan nilai di antara kedua pecahan asal. Itu persis mengapa "2/6"
          terasa terlalu kecil: ia terletak di antara 1/4 dan 1/2.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[a:a/b] + [b:c/d] = (a·d + c·b) / [q:b·d]',
    roles: { a: 'a', b: 'b', q: 'hi' },
    arti: {
      a: 'Pecahan pertama: a potong berukuran 1/b.',
      b: 'Pecahan kedua: c potong berukuran 1/d.',
      q: 'Penyebut bersama — ukuran potongan baru yang dipakai keduanya. Boleh b×d; KPK-nya tidak pernah lebih besar dan sering lebih kecil, sehingga angkanya lebih ringan.',
    },
  },

  soal: [
    (rnd) => {
      const q = [4, 6, 8, 10, 12][Math.floor(rnd() * 5)]
      const q1 = 2
      const p1 = 1
      const p2 = 1 + Math.floor(rnd() * (q / 2 - 1))
      const L = lcm(q1, q)
      const total = (p1 * L) / q1 + (p2 * L) / q
      const [hp, hq] = simplify(total, L)
      return {
        id: 'pec-1',
        tipe: 'isian',
        topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
        kelas: 5,
        tingkat: 'mudah',
        konsep: 'pecahan-penyebut',
        pertanyaan: `Hitunglah 1/2 + ${p2}/${q}. Tulis jawabanmu dalam bentuk pecahan paling sederhana, contoh penulisan: 2/5`,
        jawaban: [`${hp}/${hq}`, hq === 1 ? `${hp}` : `${hp}/${hq}`],
        hint: [
          'Ukuran potongan kedua pecahan masih berbeda. Cari ukuran potongan yang bisa dipakai keduanya.',
          `Penyebut sekutu terkecil dari 2 dan ${q} adalah ${L}.`,
          `Ubah 1/2 menjadi ${L / 2}/${L}, lalu jumlahkan pembilangnya.`,
        ],
        pembahasan: `1/2 = ${L / 2}/${L} dan ${p2}/${q} = ${(p2 * L) / q}/${L}. Jumlahnya ${total}/${L} = ${hp}/${hq}.`,
      }
    },
    {
      id: 'pec-2',
      tipe: 'pilihan',
      topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'pecahan-penyebut',
      pertanyaan: 'Hasil dari 2/3 + 1/6 adalah...',
      pilihan: [
        { id: 'a', label: '5/6', benar: true },
        {
          id: 'b',
          label: '3/9',
          diagnosa:
            'Pembilang dijumlah dengan pembilang, penyebut dengan penyebut. Perhatikan: 3/9 sama dengan 1/3, padahal hasilnya harus lebih besar daripada 2/3.',
        },
        {
          id: 'c',
          label: '3/6',
          diagnosa:
            'Penyebutnya sudah tepat, tetapi 2/3 belum diubah menjadi 4/6 sebelum dijumlahkan.',
        },
        {
          id: 'd',
          label: '5/9',
          diagnosa: 'Pembilangnya sudah benar, tetapi penyebutnya ikut dijumlahkan. Penyebut menyatakan ukuran potongan, dan ukuran itu tidak berubah saat menjumlah.',
        },
      ],
      hint: [
        'Apakah kedua penyebutnya sudah sama? Kalau belum, samakan dulu.',
        'KPK dari 3 dan 6 adalah 6, jadi ubah 2/3 menjadi berapa per enam?',
        '2/3 = 4/6. Sekarang jumlahkan 4/6 + 1/6.',
      ],
      pembahasan:
        '2/3 = 4/6, jadi 4/6 + 1/6 = 5/6. Penyebut tetap 6 karena ukuran potongannya tidak berubah — yang bertambah hanyalah banyaknya potongan.',
    },
    {
      id: 'pec-3',
      tipe: 'benar-salah',
      topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'pecahan-penyebut',
      pertanyaan: 'Sama seperti penjumlahan, perkalian pecahan juga mengharuskan penyebut disamakan lebih dulu.',
      jawaban: false,
      diagnosa:
        'Perkalian menanyakan hal yang berbeda: "berapa bagian dari bagian". Penyebutnya justru langsung dikalikan, karena potongannya terbagi ke dua arah sekaligus.',
      hint: [
        'Coba hitung 1/2 × 1/3 dengan menggambar persegi yang dipotong dua arah.',
        'Berapa banyak potongan kecil yang terbentuk?',
        'Penjumlahan menghitung banyaknya potongan sejenis; perkalian membuat potongan baru.',
      ],
      pembahasan:
        'Salah. Pada perkalian, pembilang dikali pembilang dan penyebut dikali penyebut: 1/2 × 1/3 = 1/6. Tidak ada penyamaan penyebut sama sekali.',
    },
    {
      id: 'pec-4',
      tipe: 'urutkan',
      topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'pecahan-penyebut',
      pertanyaan: 'Susun langkah menghitung 3/4 + 2/5.',
      langkah: [
        'Cari penyebut sekutu dari 4 dan 5, yaitu 20',
        'Ubah 3/4 menjadi 15/20',
        'Ubah 2/5 menjadi 8/20',
        'Jumlahkan pembilangnya: 15 + 8 = 23',
        'Hasilnya 23/20, atau 1 3/20',
      ],
      hint: [
        'Menyamakan ukuran potongan selalu dilakukan lebih dulu.',
        'Setelah penyebutnya sama, yang dijumlahkan hanya pembilangnya.',
      ],
      pembahasan:
        '3/4 = 15/20 dan 2/5 = 8/20, jadi jumlahnya 23/20 = 1 3/20. Hasilnya lebih dari satu utuh — masuk akal, karena 3/4 hanya kurang 1/4 untuk menjadi satu, sedangkan yang ditambahkan (2/5) lebih besar daripada 1/4.',
    },
    {
      id: 'pec-5',
      tipe: 'angka',
      topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
      kelas: 6,
      tingkat: 'sulit',
      konsep: 'pecahan-penyebut',
      pertanyaan:
        'Ibu memakai 1/3 kg gula untuk kue dan 1/4 kg untuk minuman. Berapa kg gula yang dipakai seluruhnya? Tulis jawabanmu sebagai desimal, bulatkan sampai tiga angka di belakang koma.',
      jawaban: 7 / 12,
      // 0,0005: menerima 0,583 (pembulatan yang benar), menolak 0,584.
      toleransi: 0.0005,
      satuan: 'kg',
      hint: [
        'Samakan dulu penyebut 3 dan 4. Berapa KPK-nya?',
        '1/3 = 4/12 dan 1/4 = 3/12.',
        'Jumlahnya 7/12. Sekarang ubah ke desimal dengan membagi 7 dengan 12.',
      ],
      pembahasan:
        '1/3 + 1/4 = 4/12 + 3/12 = 7/12 ≈ 0,583 kg. Perhatikan hasilnya lebih besar daripada 1/3 maupun 1/4 — sesuai harapan.',
    },
  ],

  lanjut: ['persen-dari', 'bagi-pecahan', 'perkalian-luas'],
}

export default konsep
