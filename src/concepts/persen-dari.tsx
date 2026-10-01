/* ============================================================
   KONSEP — Kenapa "20% dari 50" hasilnya 10?
   Kelas 6 · Bilangan

   Gagasan: "persen" secara harfiah berarti "per seratus".
   Kisi seratus kotak membuat arti itu terlihat. Setelah persen
   diubah menjadi pecahan sederhana, mengambil persen dari suatu
   jumlah menjadi sekadar membagi jumlah itu menjadi beberapa
   kelompok sama besar lalu mengambil sebagian kelompoknya.

   Miskonsepsi yang dibongkar: mengira "20%" selalu berarti
   "20 sesuatu", tanpa memedulikan keseluruhannya.

   Interaksi langsung (lihat docs/PANDUAN-INTERAKSI.md):
   - persen → pegangan pada BATAS ARSIRAN kisi seratus. Kisi terisi
     baris demi baris, jadi batasnya berjalan berundak; pegangannya
     duduk di ujung kanan kotak terakhir yang tersorot. Inilah pegangan
     utama: menghitung kotak sendiri adalah inti konsep ini.
   - total  → pegangan pada TEPI BAWAH kumpulan benda. Benda selalu
     sepuluh per baris, jadi menarik tepi itu ke bawah menambah satu
     baris = sepuluh benda (langkah penggesernya memang 10).
   ============================================================ */

import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, useSempit } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, lerp, simplify } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/** Garis/bingkai kelompok hanya digambar bila banyak kelompoknya paling banyak ini. */
const MAKS_KELOMPOK_DIGAMBAR = 10

/** Benda selalu sepuluh per baris, sama seperti kisi seratus. */
const PER_BARIS = 10

/** Bingkai kumpulan benda digambar sedikit di luar kotak-kotaknya. */
const OFS = 3

/* Selama kumpulan benda belum ada (langkah 0–2), kisi berdiri sendiri di
   tengah panggung dan kotaknya digambar sebesar ini — di situlah anak
   menghitung kotaknya. Tepi atasnya tidak ikut berubah (`kisiY` sama pada
   kedua tata letak), jadi kisi hanya mengecil dan bergeser, tidak melompat.
   Batas angkanya: pegangan batas pada baris terakhir duduk di
   kisiY + 9,5 · SEL_BESAR dan ajakannya menjulur ±70 satuan ke bawah — pada
   28 satuan itu berhenti di 448, masih di dalam bingkai 460. */
const SEL_BESAR = 28

/* ---------------- Tata letak ----------------
   Dua sistem koordinat: lebar untuk layar besar, tegak untuk HP. Pada
   keduanya kisi seratus berdiri di kiri dan kumpulan benda di kanan,
   supaya keduanya bisa dibandingkan sekaligus.

   Angka-angka di bawah dijaga agar di nilai penggeser MANA PUN:
   - kumpulan benda paling tinggi 20 baris (total 200), jadi tepi
     bawahnya di `bendaY - OFS + 20 · selB`; label "terambil …" duduk
     `jedaTerambil` di bawahnya — cukup jauh untuk melewati lingkaran
     sorot pegangan tepi bawah dan tetap di dalam viewBox;
   - pegangan tepi bawah duduk di tengah tepi supaya labelnya tidak
     keluar bingkai; jaraknya ke pegangan batas arsiran (paling jauh di
     tepi kanan kisi) selalu jauh lebih dari u(48);
   - ajakan "Seret …" digambar mesin DI BAWAH pegangan batas dan selebar
     teksnya, jadi `kisiX` paling sedikit selebar setengah ajakan itu dan
     kisi + setengah ajakan masih berhenti sebelum kumpulan benda. Di HP
     ruangnya sempit, jadi ajakannya dipendekkan.
   - tidak ada label di bawah kisi: pecahan sederhana tampil di label
     atas kisi, supaya tidak pernah bertabrakan dengan ajakan itu. */
function letak(sempit: boolean) {
  return sempit
    ? {
        w: 420,
        h: 460,
        judulY: 28,
        ukJudul: 17,
        sel: 17,
        kisiX: 42,
        kisiY: 112,
        labelKisiY: 90,
        selB: 14,
        bendaX: 262,
        bendaY: 112,
        labelBendaY: 90,
        /** kolom tempat pegangan tepi bawah duduk (0..PER_BARIS). */
        pegangKol: 5,
        jedaTerambil: 46,
        labelPanjang: false,
        ajakanBatas: 'Seret',
      }
    : {
        w: 680,
        h: 460,
        judulY: 30,
        ukJudul: 19,
        sel: 20,
        kisiX: 125,
        kisiY: 112,
        labelKisiY: 90,
        selB: 14,
        bendaX: 418,
        bendaY: 112,
        labelBendaY: 90,
        pegangKol: 5,
        jedaTerambil: 46,
        labelPanjang: true,
        ajakanBatas: 'Seret batas',
      }
}

/** Nilai turunan penggeser bongkar — dipakai bersama oleh gambar dan teks langkah. */
function nilaiBongkar(p: Record<string, number>) {
  const persen = clamp(Math.round((p.persen ?? 20) / 5) * 5, 5, 95)
  const total = clamp(Math.round((p.total ?? 50) / 10) * 10, 10, 200)
  const [pp, qq] = simplify(persen, 100)
  const hasil = (persen / 100) * total
  return { persen, total, pp, qq, hasil, isi: total / qq }
}

/** Bingkai kelompok benda tergambar bila tiap kelompok pas mengisi baris penuh. */
function bingkaiKelompokTergambar(total: number, kelompok: number) {
  return kelompok <= MAKS_KELOMPOK_DIGAMBAR && (total / kelompok) % PER_BARIS === 0
}

/**
 * Garis batas sesudah `batas` kotak pertama pada kisi yang terisi baris demi
 * baris. Bila batasnya jatuh di tengah baris, garisnya berundak, supaya tiap
 * bagian benar-benar berisi kotak yang sama dengan yang tersorot.
 */
function jalurBatas(x: number, y: number, sel: number, batas: number) {
  const r = Math.floor(batas / PER_BARIS)
  const c = batas - r * PER_BARIS
  const yA = y + r * sel - 0.75
  const kanan = x + PER_BARIS * sel
  return c === 0
    ? `M ${x} ${yA} H ${kanan}`
    : `M ${x} ${yA + sel} H ${x + c * sel - 0.75} V ${yA} H ${kanan}`
}

/** Letak pegangan batas arsiran: ujung kanan kotak terakhir yang tersorot. */
function titikBatas(x: number, y: number, sel: number, batas: number) {
  const k = clamp(Math.round(batas), 0, 100)
  if (k <= 0) return { x, y: y + sel / 2 }
  const r = Math.floor((k - 1) / PER_BARIS)
  const c = ((k - 1) % PER_BARIS) + 1
  return { x: x + c * sel, y: y + r * sel + sel / 2 }
}

/** Kebalikan `titikBatas`: posisi jari pada kisi menjadi banyaknya kotak. */
function batasDariTitik(pt: { x: number; y: number }, x: number, y: number, sel: number) {
  const r = clamp(Math.floor((pt.y - y) / sel), 0, 9)
  const c = clamp(Math.round((pt.x - x) / sel), 0, PER_BARIS)
  return r * PER_BARIS + c
}

const KATA = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas']

/** Bilangan cacah kecil sebagai kata ("lima", "dua belas"); selebihnya angka. */
function kata(n: number): string {
  if (Number.isInteger(n) && n >= 0 && n <= 11) return KATA[n]
  if (Number.isInteger(n) && n >= 12 && n <= 19) return `${KATA[n - 10]} belas`
  if (n === 20) return 'dua puluh'
  return fmt(n)
}

/* ---------------- Kisi seratus ---------------- */

function KisiSeratus({
  x,
  y,
  sel,
  tersorot,
  kelompok,
  opacityKelompok = 0,
  nyala = false,
  batasTampak = false,
  bingkaiNyala = false,
}: {
  x: number
  y: number
  sel: number
  tersorot: number
  /** banyaknya kelompok sama besar, untuk garis pembagi. */
  kelompok?: number
  opacityKelompok?: number
  nyala?: boolean
  /** gambar garis batas arsiran — garis yang dipegang anak. */
  batasTampak?: boolean
  /** tebalkan bingkai seratus kotak saat bagian rumus "100" disentuh. */
  bingkaiNyala?: boolean
}) {
  const kotak = []
  for (let i = 0; i < 100; i++) {
    const r = Math.floor(i / PER_BARIS)
    const c = i % PER_BARIS
    const aktif = i < tersorot
    kotak.push(
      <rect
        key={i}
        x={x + c * sel}
        y={y + r * sel}
        width={sel - 1.5}
        height={sel - 1.5}
        rx={2}
        fill={aktif ? 'var(--m-a)' : 'var(--surface)'}
        fillOpacity={aktif ? (nyala ? 0.85 : 0.6) : 1}
        stroke="var(--ink-3)"
        strokeWidth={0.7}
      />,
    )
  }
  // Batas selalu jatuh di tepi kotak: kotak terisi bila i < tersorot.
  const batas = clamp(Math.ceil(tersorot - 1e-9), 0, 100)
  return (
    <g>
      {kotak}
      {kelompok && opacityKelompok > 0.01 && kelompok <= MAKS_KELOMPOK_DIGAMBAR
        ? Array.from({ length: kelompok - 1 }, (_, k) => (
            <path
              key={`g${k}`}
              d={jalurBatas(x, y, sel, Math.round(((k + 1) * 100) / kelompok))}
              fill="none"
              stroke="var(--m-hi)"
              strokeWidth={2.5}
              strokeLinejoin="round"
              opacity={opacityKelompok}
            />
          ))
        : null}
      <rect
        x={x - 1}
        y={y - 1}
        width={PER_BARIS * sel}
        height={10 * sel}
        fill="none"
        stroke={bingkaiNyala ? 'var(--m-hi)' : 'var(--ink-2)'}
        strokeWidth={bingkaiNyala ? 3.5 : 2}
      />
      {batasTampak && (
        <path
          d={jalurBatas(x, y, sel, batas)}
          fill="none"
          stroke="var(--m-a)"
          strokeWidth={nyala ? 4.5 : 3.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
    </g>
  )
}

/* ---------------- Deretan benda sebanyak `total` ---------------- */

function Benda({
  x,
  y,
  total,
  tersorot,
  sel,
  kelompok,
  opacityKelompok = 0,
  nyala = false,
  tepiNyala = false,
}: {
  x: number
  y: number
  total: number
  tersorot: number
  sel: number
  kelompok?: number
  opacityKelompok?: number
  nyala?: boolean
  /** tebalkan bingkai dan tepi bawah saat keseluruhannya sedang dipegang. */
  tepiNyala?: boolean
}) {
  const n = Math.min(total, 200)
  const baris = Math.ceil(n / PER_BARIS)
  // Bulatkan sisa galat pembulatan (mis. 0,29 × 100 = 28,999…).
  const ts = Math.round(tersorot * 1e6) / 1e6
  const kotak = []
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / PER_BARIS)
    const c = i % PER_BARIS
    const aktif = i + 1 <= ts
    // Hasil pecahan (mis. 25% dari 10 = 2,5) diwarnai sebagian kotak,
    // bukan dibulatkan ke atas menjadi satu kotak utuh.
    const sebagian = !aktif && i < ts ? ts - i : 0
    kotak.push(
      <rect
        key={i}
        x={x + c * sel}
        y={y + r * sel}
        width={sel - 2}
        height={sel - 2}
        rx={2.5}
        fill={aktif ? 'var(--m-ab)' : 'var(--surface-3)'}
        fillOpacity={aktif ? (nyala ? 0.9 : 0.72) : 1}
        stroke={aktif || sebagian > 0 ? 'var(--m-ab)' : 'var(--ink-3)'}
        strokeWidth={0.8}
      />,
    )
    if (sebagian > 0.001) {
      kotak.push(
        <rect
          key={`s${i}`}
          x={x + c * sel}
          y={y + r * sel}
          width={(sel - 2) * sebagian}
          height={sel - 2}
          fill="var(--m-ab)"
          fillOpacity={nyala ? 0.9 : 0.72}
        />,
      )
    }
  }
  const bx = x - OFS
  const by = y - OFS
  const lebar = PER_BARIS * sel
  const tinggi = baris * sel
  return (
    <g>
      {kotak}
      {kelompok && opacityKelompok > 0.01 && kelompok <= MAKS_KELOMPOK_DIGAMBAR
        ? Array.from({ length: kelompok }, (_, k) => {
            const mulai = (k * n) / kelompok
            const isiKel = n / kelompok
            // Hanya gambar bingkai bila kelompoknya rapi sebaris penuh.
            if (isiKel % PER_BARIS !== 0 || mulai % PER_BARIS !== 0) return null
            return (
              <rect
                key={`k${k}`}
                x={bx}
                y={by + (mulai / PER_BARIS) * sel}
                width={lebar}
                height={(isiKel / PER_BARIS) * sel}
                rx={5}
                fill="none"
                stroke="var(--m-hi)"
                strokeWidth={2}
                opacity={opacityKelompok}
              />
            )
          })
        : null}
      <rect
        x={bx}
        y={by}
        width={lebar}
        height={tinggi}
        rx={5}
        fill="none"
        stroke="var(--m-b)"
        strokeWidth={tepiNyala ? 2.6 : 1.8}
        opacity={tepiNyala ? 1 : 0.7}
      />
      {/* tepi bawah: garis yang ditarik anak untuk menambah baris benda */}
      <line
        x1={bx}
        y1={by + tinggi}
        x2={bx + lebar}
        y2={by + tinggi}
        stroke="var(--m-b)"
        strokeWidth={tepiNyala ? 5 : 3.5}
        strokeLinecap="round"
      />
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { persen, total, pp, qq, hasil } = nilaiBongkar(p)
  const sempit = useSempit()
  const L = letak(sempit)
  const aktif = useInteraksi()?.kendali.aktif

  const sorotKisi = step === 1 ? seg(t, 0.1, 0.9) : step >= 1 ? 1 : 0
  const kelompokKisi = fase(step, t, 2)
  const munculBenda = fase(step, t, 3)
  // Kisi mengecil dan bergeser ke kolom kiri LEBIH DULU, bendanya baru
  // muncul sesudah itu — supaya keduanya tidak pernah bertindihan.
  const pindah = seg(munculBenda, 0, 0.55)
  const bendaOp = seg(munculBenda, 0.55, 1)
  const kelompokBenda = fase(step, t, 4)
  const ambil = step >= 5 ? (step === 5 ? seg(t, 0.15, 0.9) : 1) : 0
  const selesai = step >= 6

  const nyalaPersen = sorot === 'persen' || aktif === 'persen'
  const nyalaTotal = sorot === 'total' || aktif === 'total'
  const nyalaHasil = sorot === 'hasil'

  // Selama benda belum muncul, kisi berdiri besar di tengah panggung; setelah
  // itu mengecil mulus ke kolom kiri. Pegangan memakai ukuran yang sama.
  const sel = lerp(SEL_BESAR, L.sel, pindah)
  const kisiX = lerp((L.w - PER_BARIS * sel) / 2, L.kisiX, pindah)
  const tersorotKisi = sorotKisi * persen
  const peg = titikBatas(kisiX, L.kisiY, sel, Math.ceil(tersorotKisi - 1e-9))

  const baris = total / PER_BARIS
  const tepiY = L.bendaY - OFS + baris * L.selB
  const tengahBenda = L.bendaX + (PER_BARIS * L.selB) / 2 - OFS

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={460}
      label="Kisi seratus kotak yang batas arsirannya bisa diseret, dan kumpulan benda yang tepi bawahnya bisa ditarik"
    >
      <g opacity={bendaOp > 0.5 ? 0.95 : 1}>
        <KisiSeratus
          x={kisiX}
          y={L.kisiY}
          sel={sel}
          tersorot={tersorotKisi}
          kelompok={qq}
          opacityKelompok={kelompokKisi}
          nyala={nyalaPersen}
          batasTampak={sorotKisi > 0.02}
          bingkaiNyala={sorot === 'seratus'}
        />
        {/* Satu label saja di atas kisi: "100 kotak" → "20 dari 100" →
            "20/100 = 1/5". Ruang di bawah kisi dibiarkan kosong untuk
            ajakan pegangan batas. */}
        {aktif !== 'persen' && (
          <Tag
            x={kisiX + (PER_BARIS * sel) / 2}
            y={L.labelKisiY}
            warna={kelompokKisi > 0.4 ? 'var(--m-hi)' : 'var(--m-a)'}
            size={16}
          >
            {kelompokKisi > 0.4
              ? `${fmt(persen)}/100 = ${fmt(pp)}/${fmt(qq)}`
              : sorotKisi > 0.5
                ? `${fmt(persen)} dari 100`
                : '100 kotak'}
          </Tag>
        )}
      </g>

      {bendaOp > 0.02 && (
        <g opacity={bendaOp}>
          <Benda
            x={L.bendaX}
            y={L.bendaY}
            total={total}
            tersorot={ambil * hasil}
            sel={L.selB}
            kelompok={qq}
            opacityKelompok={kelompokBenda}
            nyala={nyalaHasil}
            tepiNyala={nyalaTotal}
          />
          {aktif !== 'total' && (
            <Tag x={tengahBenda} y={L.labelBendaY} warna="var(--m-b)" size={16}>
              {L.labelPanjang ? `keseluruhan = ${fmt(total)}` : `${fmt(total)} benda`}
            </Tag>
          )}
          {ambil > 0.7 && (
            <Tag x={tengahBenda} y={tepiY + L.jedaTerambil} warna="var(--m-ab)" size={17}>
              {`terambil ${fmt(hasil)}`}
            </Tag>
          )}
        </g>
      )}

      {step === 0 && (
        <Tag x={L.w / 2} y={L.judulY} warna="var(--ink-2)" size={L.ukJudul}>
          "persen" artinya "per seratus"
        </Tag>
      )}
      {selesai && (
        <Tag x={L.w / 2} y={L.judulY} warna="var(--m-ab)" size={L.ukJudul + 2}>
          {`${fmt(persen)}% dari ${fmt(total)} = ${fmt(hasil)}`}
        </Tag>
      )}

      {/* Persen dipegang di batas arsiran; keseluruhan di tepi bawah kumpulan.
          Keduanya disembunyikan selama objeknya belum ada di panggung. */}
      <Pegangan
        x={peg.x}
        y={peg.y}
        param="persen"
        arah="bebas"
        utama
        sembunyi={sorotKisi < 0.15}
        label={`${fmt(persen)}%`}
        ajakan={L.ajakanBatas}
        keNilai={(pt) => batasDariTitik(pt, kisiX, L.kisiY, sel)}
      />
      <Pegangan
        x={L.bendaX + L.pegangKol * L.selB - OFS}
        y={tepiY}
        param="total"
        arah="y"
        sembunyi={bendaOp < 0.5}
        label={`${fmt(total)} benda`}
        keNilai={(pt) => ((pt.y + OFS - L.bendaY) / L.selB) * PER_BARIS}
      />
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const sempit = useSempit()
  const L = letak(sempit)
  const aktif = useInteraksi()?.kendali.aktif

  const persen = clamp(Math.round(p.persen ?? 20), 0, 100)
  const total = clamp(Math.round((p.total ?? 50) / 10) * 10, 10, 200)
  const hasil = (persen / 100) * total

  const peg = titikBatas(L.kisiX, L.kisiY, L.sel, persen)
  const baris = total / PER_BARIS
  const tepiY = L.bendaY - OFS + baris * L.selB
  const tengahBenda = L.bendaX + (PER_BARIS * L.selB) / 2 - OFS

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={460}
      label="Kisi persen yang batas arsirannya bisa diseret, dan kumpulan benda yang tepi bawahnya bisa ditarik"
    >
      <KisiSeratus
        x={L.kisiX}
        y={L.kisiY}
        sel={L.sel}
        tersorot={persen}
        nyala={sorot === 'persen' || aktif === 'persen'}
        batasTampak
        bingkaiNyala={sorot === 'seratus'}
      />
      {aktif !== 'persen' && (
        <Tag x={L.kisiX + (PER_BARIS * L.sel) / 2} y={L.labelKisiY} warna="var(--m-a)" size={16}>
          {`${fmt(persen)} dari 100`}
        </Tag>
      )}

      <Benda
        x={L.bendaX}
        y={L.bendaY}
        total={total}
        tersorot={hasil}
        sel={L.selB}
        nyala={sorot === 'hasil'}
        tepiNyala={sorot === 'total' || aktif === 'total'}
      />
      {aktif !== 'total' && (
        <Tag x={tengahBenda} y={L.labelBendaY} warna="var(--m-b)" size={16}>
          {L.labelPanjang ? `keseluruhan = ${fmt(total)}` : `${fmt(total)} benda`}
        </Tag>
      )}
      <Tag x={tengahBenda} y={tepiY + L.jedaTerambil} warna="var(--m-ab)" size={16}>
        {`terambil ${fmt(hasil)}`}
      </Tag>

      <Tag x={L.w / 2} y={L.judulY} warna="var(--ink)" size={L.ukJudul + 2}>
        {`${fmt(persen)}% dari ${fmt(total)} = ${fmt(hasil)}`}
      </Tag>

      <Pegangan
        x={peg.x}
        y={peg.y}
        param="persen"
        arah="bebas"
        utama
        label={`${fmt(persen)}%`}
        ajakan={L.ajakanBatas}
        keNilai={(pt) => batasDariTitik(pt, L.kisiX, L.kisiY, L.sel)}
      />
      <Pegangan
        x={L.bendaX + L.pegangKol * L.selB - OFS}
        y={tepiY}
        param="total"
        arah="y"
        label={`${fmt(total)} benda`}
        keNilai={(pt) => ((pt.y + OFS - L.bendaY) / L.selB) * PER_BARIS}
      />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'persen-dari',
  topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
  judul: 'Persen',
  pertanyaan: 'Kenapa "20% dari 50" hasilnya 10?',
  tagline: 'Persen cuma cara lain menulis "per seratus". Lihat 100 kotaknya, langsung jelas.',
  kelas: 6,
  domain: 'bilangan',
  tags: ['persen', 'pecahan', 'perbandingan', 'diskon'],

  tebak: {
    pertanyaan: 'Mana yang lebih banyak: 20% dari 50, atau 20% dari 200?',
    pilihan: [
      {
        id: 'a',
        label: 'Sama, dua-duanya 20',
        balasan:
          'Ini kekeliruan yang paling sering: menganggap "20%" adalah jumlah tetap. Padahal persen selalu menempel pada suatu keseluruhan.',
      },
      {
        id: 'b',
        label: '20% dari 200',
        benar: true,
        balasan:
          'Betul. Persentase yang sama pada keseluruhan yang lebih besar menghasilkan angka yang lebih besar: 10 lawan 40.',
      },
      {
        id: 'c',
        label: '20% dari 50',
        balasan:
          'Justru sebaliknya. Coba pikirkan: 20% dari uang jajanmu sebulan jelas lebih kecil daripada 20% dari gaji orang dewasa.',
      },
    ],
    penutup:
      'Persen tidak pernah berdiri sendiri. Selalu ada pertanyaan lanjutan: "persen dari apa?"',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      {
        key: 'persen',
        label: 'Persen',
        min: 5,
        max: 95,
        step: 5,
        awal: 20,
        satuan: '%',
        simbol: 'p',
        peran: 'a',
        bagian: 'persen',
      },
      {
        key: 'total',
        label: 'Keseluruhan',
        min: 10,
        max: 200,
        step: 10,
        awal: 50,
        bulat: true,
        simbol: 'n',
        peran: 'b',
        bagian: 'total',
      },
    ],
    roles: { persen: 'a', total: 'b', hasil: 'ab', seratus: 'hi' },
    arti: {
      persen: 'Banyaknya bagian yang diambil dari setiap seratus.',
      total: 'Keseluruhan — banyaknya benda yang menjadi acuan.',
      hasil: 'Hasilnya: bagian dari keseluruhan itu.',
      seratus: 'Angka 100 muncul karena "persen" memang berarti "per seratus".',
    },
    steps: [
      {
        id: 's0',
        judul: 'Seratus kotak',
        narasi:
          'Kata "persen" berasal dari "per seratus". Karena itu bayangkan selalu ada seratus kotak sebagai patokan.',
        rumus: '1% = 1 dari [seratus:100]',
        durasi: 1800,
      },
      {
        id: 's1',
        judul: 'Sorot sebanyak persennya',
        narasi: (p) => {
          const { persen } = nilaiBongkar(p)
          return `Persen dibaca begini: ${fmt(persen)}% berarti ${fmt(persen)} kotak dari seratus kotak itu. Seret garis batas arsiran pada kisi untuk menghitung kotaknya sendiri — belum ada perhitungan apa pun di sini.`
        },
        rumus: (p) => {
          const { persen } = nilaiBongkar(p)
          return `[persen:${fmt(persen)}]% = [persen:${fmt(persen)}]/[seratus:100]`
        },
        durasi: 2000,
      },
      {
        id: 's2',
        judul: 'Sederhanakan pecahannya',
        narasi: (p) => {
          const { persen, pp, qq } = nilaiBongkar(p)
          const jalur = pp === 1 ? 'tepat satu jalur' : `${kata(pp)} jalur`
          const ekor =
            qq > MAKS_KELOMPOK_DIGAMBAR
              ? `Kisinya bisa dibagi menjadi ${kata(qq)} jalur sama besar dan yang tersorot ${jalur}, tetapi garis pembaginya terlalu banyak untuk digambar.`
              : `Kisinya terbagi menjadi ${kata(qq)} jalur sama besar, dan yang tersorot ${jalur}.`
          return `${fmt(persen)} dari seratus sama saja dengan ${fmt(pp)} dari ${fmt(qq)}. ${ekor}`
        },
        rumus: (p) => {
          const { persen, pp, qq } = nilaiBongkar(p)
          return `[persen:${fmt(persen)}]/[seratus:100] = ${fmt(pp)}/${fmt(qq)}`
        },
        durasi: 2200,
      },
      {
        id: 's3',
        judul: 'Ganti keseluruhannya',
        narasi: (p) => {
          const { persen, total } = nilaiBongkar(p)
          if (total === 100)
            return `Sekarang acuannya bukan lagi seratus kotak, melainkan 100 benda — kebetulan sama banyak. Persennya tetap ${fmt(persen)}%; tarik tepi bawah kumpulan benda agar acuannya benar-benar berbeda.`
          return `Sekarang acuannya bukan lagi seratus kotak, melainkan ${fmt(total)} benda. Persennya tetap ${fmt(persen)}%, tetapi keseluruhannya berbeda.`
        },
        rumus: (p) => `keseluruhan = [total:${fmt(nilaiBongkar(p).total)}]`,
        durasi: 2000,
      },
      {
        id: 's4',
        judul: 'Bagi menjadi kelompok sama besar',
        narasi: (p) => {
          const { persen, total, pp, qq, isi } = nilaiBongkar(p)
          const ekor = bingkaiKelompokTergambar(total, qq)
            ? `berisi ${fmt(isi)} benda.`
            : Number.isInteger(isi)
              ? `berisi ${fmt(isi)} benda, walau bingkai kelompoknya tidak digambar.`
              : `berisi ${fmt(isi)} benda — potongan benda boleh, karena yang dijaga perbandingannya.`
          return `${fmt(persen)}% berarti "${fmt(pp)} dari ${fmt(qq)}", jadi ${fmt(total)} benda dibagi menjadi ${kata(qq)} kelompok sama besar. Tiap kelompok ${ekor}`
        },
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Ambil bagiannya',
        narasi: (p) => {
          const { persen, total, pp, hasil } = nilaiBongkar(p)
          const isi = pp === 1 ? 'Isinya' : 'Isi seluruhnya'
          return `Ambil kelompok sebanyak pembilangnya, yaitu ${kata(pp)} kelompok. ${isi} ${fmt(hasil)} benda — itulah ${fmt(persen)}% dari ${fmt(total)}.`
        },
        durasi: 2200,
      },
      {
        id: 's6',
        judul: 'Bentuk rumusnya',
        narasi:
          'Menghitung p% dari n selalu sama: ubah persen menjadi pecahan per seratus, lalu kalikan dengan keseluruhannya.',
        rumus: '[hasil:hasil] = [persen:p]/[seratus:100] × [total:n]',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Ubah persennya, ubah juga keseluruhannya',
    ajakan:
      'Seret batas arsiran pada kisi seratus untuk mengubah persennya. Tarik tepi bawah kumpulan benda untuk mengubah keseluruhannya.',
    params: [
      {
        key: 'persen',
        label: 'Persen',
        min: 0,
        max: 100,
        step: 1,
        awal: 20,
        satuan: '%',
        simbol: 'p',
        peran: 'a',
        bagian: 'persen',
      },
      {
        key: 'total',
        label: 'Keseluruhan',
        min: 10,
        max: 200,
        step: 10,
        awal: 50,
        bulat: true,
        simbol: 'n',
        peran: 'b',
        bagian: 'total',
      },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const persen = clamp(Math.round(p.persen ?? 20), 0, 100)
      const total = clamp(Math.round((p.total ?? 50) / 10) * 10, 10, 200)
      return `[hasil:${fmt((persen / 100) * total)}] = [persen:${fmt(persen)}]/[seratus:100] × [total:${fmt(total)}]`
    },
    temuan: (p) => {
      const persen = clamp(Math.round(p.persen ?? 20), 0, 100)
      const total = clamp(Math.round((p.total ?? 50) / 10) * 10, 10, 200)
      const hasil = (persen / 100) * total
      const [pp, qq] = simplify(persen, 100)
      return (
        <p>
          <strong>
            {fmt(persen)}% dari {fmt(total)} adalah {fmt(hasil)}.
          </strong>{' '}
          {persen === 0
            ? 'Nol persen berarti tidak mengambil apa pun.'
            : persen === 100
              ? 'Seratus persen berarti mengambil seluruhnya — itulah kenapa 100% selalu sama dengan keseluruhan itu sendiri.'
              : `Sebagai pecahan, ${fmt(persen)}% sama dengan ${fmt(pp)}/${fmt(qq)}.`}{' '}
          Biarkan batas arsirannya di tempat, lalu tarik tepi bawah kumpulan benda sampai bendanya
          dua kali lipat: hasilnya ikut berlipat dua. Persen bukan jumlah tetap, melainkan{' '}
          <em>perbandingan</em>.
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Kata <strong>persen</strong> artinya "per seratus". Jadi 20% berarti "20 dari setiap 100".
        </p>
        <p>
          Kalau kamu punya 100 permen dan mengambil 20%, kamu mengambil 20 permen. Tapi kalau kamu
          hanya punya 50 permen, 20% tentu bukan 20 permen lagi — karena 20 dari 50 itu jauh lebih
          dari seperlima.
        </p>
        <p>
          Caranya: 20 dari 100 sama dengan 1 dari 5. Jadi bagi 50 permen menjadi 5 kelompok sama
          banyak, masing-masing 10 permen. Ambil <strong>1 kelompok</strong>, dapat 10 permen.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Persen adalah pecahan dengan penyebut tetap 100. Menuliskannya begitu membuat
          perbandingan antar hal yang berbeda ukuran menjadi mudah dibandingkan.
        </p>
        <p style={{ textAlign: 'center' }}>p% dari n = (p/100) × n</p>
        <p>
          Karena perkalian bersifat komutatif, muncul trik yang sering berguna:{' '}
          <strong>p% dari n selalu sama dengan n% dari p</strong>. Menghitung 4% dari 75 mungkin
          merepotkan, tetapi 75% dari 4 langsung terlihat: 3.
        </p>
        <h4>Persen bukan satuan</h4>
        <p>
          Kesalahan tersering adalah memperlakukan persen sebagai jumlah tetap. Kalimat "diskon 20%"
          tidak berarti "potongan 20 ribu" — potongannya bergantung pada harga aslinya.
        </p>
        <h4>Kenaikan lalu penurunan tidak saling membatalkan</h4>
        <p>
          Harga naik 20% lalu turun 20% tidak kembali ke harga semula. Dari 100 naik 20% menjadi 120,
          lalu turun 20% dari 120 (yaitu 24) menjadi 96. Penyebabnya: kedua persen itu dihitung
          terhadap acuan yang berbeda.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Menyatakan perubahan sebagai persen berarti bekerja dengan{' '}
          <strong>faktor pengali</strong>: naik p% sama dengan mengalikan dengan (1 + p/100), turun
          p% sama dengan mengalikan dengan (1 − p/100).
        </p>
        <p style={{ textAlign: 'center' }}>
          (1 + 0,2)(1 − 0,2) = 1 − 0,04 = 0,96 ≠ 1
        </p>
        <p>
          Bentuk itu adalah identitas (1 + x)(1 − x) = 1 − x², sehingga kerugiannya selalu sebesar
          x² dari nilai semula. Karena x² &gt; 0 untuk setiap x ≠ 0, naik lalu turun dengan persen
          yang <em>sama</em> — dalam urutan mana pun — selalu berakhir di bawah nilai semula. (Bila
          persennya berbeda, hasilnya bisa di atas atau di bawah: naik 50% lalu turun 10% memberi
          1,5 × 0,9 = 1,35.)
        </p>
        <p>
          Cara pandang faktor pengali ini yang membuat bunga majemuk menjadi mudah: nilai setelah n
          periode adalah M₀(1 + i)ⁿ, sebuah fungsi eksponensial. Karena itu persen dan eksponen
          bertemu di kelas 10.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[hasil:hasil] = [persen:p]% × [total:n] = [persen:p]/[seratus:100] × [total:n]',
    roles: { hasil: 'ab', persen: 'a', total: 'b', seratus: 'hi' },
    arti: {
      hasil: 'Bagian yang diambil.',
      persen: 'Banyaknya bagian dari setiap seratus.',
      total: 'Keseluruhan yang menjadi acuan — tanpa ini, persen tidak berarti apa-apa.',
      seratus: 'Selalu 100, karena "persen" berarti "per seratus".',
    },
  },

  soal: [
    (rnd) => {
      const persen = [10, 20, 25, 50, 75][Math.floor(rnd() * 5)]
      const total = (2 + Math.floor(rnd() * 9)) * 20
      return {
        id: 'per-1',
        tipe: 'angka',
        topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
        kelas: 6,
        tingkat: 'mudah',
        konsep: 'persen-dari',
        pertanyaan: `Berapa ${persen}% dari ${total}?`,
        jawaban: (persen / 100) * total,
        toleransi: 1e-6,
        hint: [
          'Ubah dulu persennya menjadi pecahan per seratus.',
          `${persen}% = ${persen}/100.`,
          `Sekarang kalikan: ${persen}/100 × ${total}.`,
        ],
        pembahasan: `${persen}% dari ${total} = ${persen}/100 × ${total} = ${fmt((persen / 100) * total)}.`,
      }
    },
    {
      id: 'per-2',
      tipe: 'pilihan',
      topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'persen-dari',
      pertanyaan:
        'Sebuah baju berharga Rp200.000 mendapat diskon 25%. Berapa harga yang harus dibayar?',
      pilihan: [
        { id: 'a', label: 'Rp150.000', benar: true },
        {
          id: 'b',
          label: 'Rp50.000',
          diagnosa: 'Itu besar diskonnya, bukan harga yang dibayar. Harga bayar = harga awal dikurangi diskon.',
        },
        {
          id: 'c',
          label: 'Rp175.000',
          diagnosa: 'Sepertinya diskon dihitung 12,5% atau setengah dari yang seharusnya.',
        },
        {
          id: 'd',
          label: 'Rp199.975',
          diagnosa: 'Persennya diperlakukan seperti potongan 25 rupiah, bukan 25 per seratus.',
        },
      ],
      hint: [
        'Hitung dulu berapa besar diskonnya dalam rupiah.',
        '25% dari 200.000 = 1/4 × 200.000 = 50.000.',
        'Harga bayar = 200.000 − 50.000. Cara cepat: bayar 75% dari harga awal.',
      ],
      pembahasan:
        'Diskon = 25% × 200.000 = 50.000, jadi dibayar 150.000. Lebih cepat: membayar 75% dari harga awal, yaitu 0,75 × 200.000 = 150.000.',
    },
    {
      id: 'per-3',
      tipe: 'benar-salah',
      topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
      kelas: 7,
      tingkat: 'sulit',
      konsep: 'persen-dari',
      pertanyaan:
        'Sebuah harga naik 10%, lalu turun 10%. Harganya kembali seperti semula.',
      jawaban: false,
      diagnosa:
        'Kenaikan dihitung dari harga awal, tetapi penurunan dihitung dari harga yang sudah naik. Acuannya berbeda, jadi hasilnya tidak kembali sama.',
      hint: [
        'Coba pakai angka mudah, misalnya harga awal 100.',
        'Naik 10% menjadi 110. Sekarang turun 10% dari BERAPA?',
        '10% dari 110 adalah 11, bukan 10.',
      ],
      pembahasan:
        'Salah. Dari 100 naik 10% menjadi 110, lalu turun 10% (yaitu 11) menjadi 99 — lebih rendah 1% dari semula. Persen selalu dihitung terhadap acuan saat itu.',
    },
    {
      id: 'per-4',
      tipe: 'angka',
      topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
      kelas: 7,
      tingkat: 'sulit',
      konsep: 'persen-dari',
      pertanyaan:
        'Dari 40 siswa, 15 siswa membawa bekal. Berapa persen siswa yang membawa bekal?',
      jawaban: 37.5,
      satuan: '%',
      toleransi: 0.01,
      hint: [
        'Persen berarti "per seratus". Jadi ubah 15 dari 40 menjadi "berapa dari 100".',
        'Tulis sebagai pecahan dulu: 15/40.',
        'Kalikan dengan 100 untuk mengubahnya menjadi persen.',
      ],
      pembahasan:
        '15/40 = 0,375, dan 0,375 × 100% = 37,5%. Artinya perbandingannya setara dengan 37,5 dari setiap 100 — misalnya 75 dari 200 siswa.',
    },
    {
      id: 'per-5',
      tipe: 'cocokkan',
      topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'persen-dari',
      pertanyaan: 'Pasangkan tiap persen dengan pecahan paling sederhananya.',
      pasangan: [
        { kiri: '25%', kanan: '1/4' },
        { kiri: '20%', kanan: '1/5' },
        { kiri: '50%', kanan: '1/2' },
        { kiri: '75%', kanan: '3/4' },
      ],
      hint: [
        'Tulis dulu setiap persen sebagai pecahan berpenyebut 100.',
        'Lalu sederhanakan dengan membagi pembilang dan penyebutnya dengan bilangan yang sama.',
        '25/100 dibagi 25 menjadi 1/4.',
      ],
      pembahasan:
        'Menghafal empat pasangan ini sangat menghemat waktu: 25% = 1/4, 20% = 1/5, 50% = 1/2, 75% = 3/4. Semuanya berasal dari menyederhanakan pecahan berpenyebut 100.',
    },
  ],

  lanjut: ['pecahan-penyebut', 'bagi-pecahan', 'peluang-simulasi'],
}

export default konsep
