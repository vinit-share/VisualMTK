/* ============================================================
   KONSEP — Kenapa negatif × negatif = positif?
   Kelas 7 · Bilangan

   Dua argumen yang saling menguatkan:
   (1) POLA — turunkan pengali satu demi satu, hasilnya naik tetap.
       Meneruskan pola memaksa (−1) × (−2) = +2.
   (2) HUKUM DISTRIBUTIF — argumen yang benar-benar mengunci:
       (−1)(−2) + (−1)(2) = (−1)(−2 + 2) = (−1)(0) = 0,
       sehingga (−1)(−2) harus 2 agar jumlahnya nol.

   Pola saja belum membuktikan apa pun; itu dinyatakan
   terang-terangan pada langkah keenam (s5).

   INTERAKSI LANGSUNG
   Konsep ini tentang TANDA, dan tanda tinggal di garis bilangan.
   Karena itu setiap angka yang bisa diubah diwakili satu titik pada
   garis bilangannya sendiri:
   - bongkar: titik pada bilangan negatif yang dipakai seluruh baris
     tabel. Penggesernya menyimpan bilangan itu apa adanya — negatif,
     −5…−2 — bukan besarnya, supaya seret, tombol −/+, dan panah papan
     ketik semuanya menggerakkan titik ke arah yang sama dengan angkanya.
     Menyeretnya ke kiri membuat bilangannya makin negatif dan keenam
     baris ikut berubah sekaligus. Bagian rel yang benar-benar bisa
     dipegang ditebalkan, sehingga anak melihat batasnya.
   - eksperimen: dua titik, satu untuk tiap faktor, pada dua garis
     bilangan −6…6. Anak menyeretnya melewati nol dan melihat sendiri
     hasilnya berpindah sisi. Tiap garis diberi lambangnya (a / b) di
     ujung kirinya, sewarna dengan bagian rumusnya.
   Warna: negatif = var(--m-b), hasil positif = var(--m-ab),
   sorotan "aha" = var(--m-hi).

   TATA LETAK
   Dua sistem koordinat: lebar 690 × (470 / 430) dan HP tegak
   420 × (540 / 442). Di HP tabel bongkar dirapatkan (dy 36) dan panel
   argumen mengisi ruang di bawahnya; keterangan kata di bawah garis
   bilangan eksperimen hanya muncul di tata letak lebar, karena di HP
   tempat itu dipakai pil ajakan yang digantung mesin di bawah titiknya.
   Di HP panel argumen dan tabel aturan berbagi satu tempat: pergantiannya
   berurutan (panel pergi dulu, tabel datang kemudian), bukan menyilang,
   supaya dua blok rumus tidak pernah tertulis bertumpuk.
   Barisan angka di bawah tiap garis bilangan dijaga cukup dekat ke garisnya
   supaya pil ajakan yang digantung mesin lewat di bawahnya tanpa menyentuh —
   lihat TataBongkar.nlAngkaY dan TataEks.angkaDy.
   ============================================================ */

import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, tinta, useSempit, useUkuranLayarUntuk } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/** Pengali pada tiap baris tabel, dari 3 turun sampai −2. */
const BARIS = [3, 2, 1, 0, -1, -2]

/** Bilangan bertanda; negatifnya memakai '−' (U+2212), bukan tanda hubung.
 *  Dipakai gambar DAN teks langkah supaya angkanya tertulis sama persis. */
const bil = (n: number) => (n < 0 ? `−${fmt(-n)}` : fmt(n))

/** Bilangan negatif diberi kurung agar '3 × (−2)' terbaca jelas. */
const tanda = (n: number) => (n < 0 ? `(${bil(n)})` : bil(n))

/**
 * Batas bilangan negatif yang dikalikan pada tabel bongkar. Penggesernya
 * menyimpan bilangan NEGATIF itu sendiri (bukan besarnya), supaya menaikkan
 * nilainya — lewat panah kanan, tombol +, atau seret ke kanan — selalu
 * memindahkan titiknya ke kanan pada garis bilangan.
 */
const B_MIN = -5
const B_MAKS = -2

/** Bilangan negatif pada tabel bongkar. Dipakai gambar DAN teks langkah. */
const negB = (p: Record<string, number>) =>
  clamp(Math.round(Number.isFinite(p.b) ? p.b : B_MAKS), B_MIN, B_MAKS)

/** Besarnya bilangan itu (positif), untuk teks "naik 3" dan panah "+3". */
const nilaiB = (p: Record<string, number>) => -negB(p)

/* ---------------- Tata letak bongkar ---------------- */

/** Ujung garis bilangan tempat titik −b diseret. */
const NL_MIN = -6
const NL_MAKS = 0
const NL_ANGKA = [-6, -5, -4, -3, -2, -1, 0]

interface TataBongkar {
  w: number
  h: number
  maxH: number
  /** keterangan sekilas di atas gambar. */
  ketY: number
  fKet: number
  /** garis bilangan untuk bilangan yang dikalikan. */
  nlX1: number
  nlX2: number
  nlY: number
  /**
   * Baris angka di bawah garis bilangan. Pil ajakan sekali-pakai yang
   * digantung Pegangan menggantung 22,3 piksel LAYAR di bawah titiknya —
   * jarak tetap dalam piksel, bukan satuan — jadi dalam satuan ia naik
   * mendekati titik saat gambarnya diperbesar. Supaya angka di bawah titik
   * tidak terbayang, nlAngkaY − nlY harus tetap di atas 22,3 / skala
   * terbesar yang bisa dicapai tata letak ini: 22 untuk yang mencapai
   * skala 1, dan 24 masih aman di HP yang dibatasi maxH ke skala 0,89.
   */
  nlAngkaY: number
  /** label nilai di atas titik yang diseret. */
  nlLabelY: number
  /** tabel pola. Jarak nlY → y0 harus menyisakan tempat untuk pil ajakan
   *  yang digantung Pegangan di bawah titiknya. */
  y0: number
  dy: number
  xKiri: number
  xSama: number
  xHasil: number
  rectX: number
  rectW: number
  fBaris: number
  fHasil: number
  panahDx: number
  panahTagDx: number
  /** panel argumen distributif. */
  panelX: number
  panelY: number
  panelW: number
  panelH: number
  panelKepalaY: number
  panelBarisY: number
  panelDy: number
  fPanel: number
  /** tabel aturan tanda. */
  aturanX: number
  aturanY: number
  selW: number
  selH: number
  selGapX: number
  selGapY: number
  fSel: number
  /** di HP panel distributif dan tabel aturan berbagi satu tempat. */
  satuTempat: boolean
}

const BONGKAR_LEBAR: TataBongkar = {
  w: 690,
  h: 470,
  maxH: 470,
  ketY: 34,
  fKet: 16,
  nlX1: 70,
  nlX2: 370,
  nlY: 100,
  nlAngkaY: 122,
  nlLabelY: 70,
  y0: 172,
  dy: 44,
  xKiri: 200,
  xSama: 228,
  xHasil: 296,
  rectX: 58,
  rectW: 286,
  fBaris: 21,
  fHasil: 22,
  panahDx: 30,
  panahTagDx: 72,
  panelX: 400,
  panelY: 100,
  panelW: 272,
  panelH: 192,
  panelKepalaY: 126,
  panelBarisY: 158,
  panelDy: 27,
  fPanel: 16,
  aturanX: 400,
  aturanY: 310,
  selW: 124,
  selH: 46,
  selGapX: 12,
  selGapY: 10,
  fSel: 17,
  satuTempat: false,
}

/** HP tegak: tabel tetap besar, panel argumen mengisi ruang di bawahnya. */
const BONGKAR_HP: TataBongkar = {
  w: 420,
  h: 540,
  maxH: 480,
  ketY: 38,
  fKet: 15,
  nlX1: 56,
  nlX2: 368,
  nlY: 104,
  nlAngkaY: 128,
  nlLabelY: 72,
  y0: 182,
  dy: 36,
  xKiri: 196,
  xSama: 220,
  xHasil: 282,
  rectX: 62,
  rectW: 240,
  fBaris: 20,
  fHasil: 21,
  panahDx: 22,
  panahTagDx: 62,
  panelX: 34,
  panelY: 384,
  panelW: 352,
  panelH: 152,
  panelKepalaY: 404,
  panelBarisY: 430,
  panelDy: 24,
  fPanel: 15,
  aturanX: 40,
  aturanY: 402,
  selW: 160,
  selH: 52,
  selGapX: 16,
  selGapY: 10,
  fSel: 17,
  satuTempat: true,
}

/** Nilai pada garis bilangan → koordinat x. Rumus posisi satu-satunya. */
const nlKe = (v: number, L: TataBongkar) =>
  L.nlX1 + ((v - NL_MIN) / (NL_MAKS - NL_MIN)) * (L.nlX2 - L.nlX1)

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const nb = negB(p) // bilangan negatif yang dikalikan, mis. −3
  const b = -nb // besarnya, untuk keterangan "naik 3"
  const sempit = useSempit()
  const L = sempit ? BONGKAR_HP : BONGKAR_LEBAR
  const u = useUkuranLayarUntuk(L.w)
  const aktif = useInteraksi()?.kendali.aktif ?? null

  // Baris yang sudah tampak.
  const tampak = (i: number) => {
    if (step === 0) return seg(t, i * 0.22, i * 0.22 + 0.4) * (i <= 2 ? 1 : 0)
    if (i <= 2) return 1
    if (i === 3) return fase(step, t, 2)
    if (i === 4) return fase(step, t, 3)
    return fase(step, t, 4)
  }
  const panah = fase(step, t, 1)
  const distributif = fase(step, t, 5)
  const aturanMasuk = fase(step, t, 6)
  // Di HP keduanya berbagi satu tempat. Pergantiannya dibuat berurutan, bukan
  // menyilang: panel pergi dulu (paruh pertama), tabel aturan baru datang
  // (paruh kedua), supaya dua blok rumus tidak pernah tertulis bertumpuk.
  const panel = L.satuTempat ? distributif * (1 - seg(aturanMasuk, 0, 0.45)) : distributif
  const aturan = L.satuTempat ? seg(aturanMasuk, 0.55, 1) : aturanMasuk

  const nyalaNeg = sorot === 'neg-a' || sorot === 'neg-b'
  const nyalaHasil = sorot === 'hasil'
  // Bilangan yang sedang dipegang menyala di garis bilangan DAN di setiap baris.
  const warnaFaktor = aktif === 'b' || sorot === 'neg-b' ? 'var(--m-hi)' : 'var(--m-b)'

  const hx = nlKe(nb, L)
  // Sorotan baris tidak boleh lebih tinggi dari jarak antarbaris, supaya dua
  // baris negatif yang berdampingan tidak saling menimpa di HP.
  const rectH = Math.min(38, L.dy - 6)
  // <text> mentah panel: jangan sampai tampil di bawah 12 px di layar sempit.
  const fPanel = Math.max(L.fPanel, u(12, L.fPanel))

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Tabel pola perkalian dengan bilangan negatif, dengan garis bilangan untuk mengubah bilangan yang dikalikan"
    >
      {/* ---------- Garis bilangan: bilangan negatif yang dipakai semua baris ---------- */}
      <line x1={L.nlX1} y1={L.nlY} x2={L.nlX2} y2={L.nlY} stroke="var(--m-axis)" strokeWidth={2} />
      {/* bagian yang bisa dipegang — ujungnya dari rentang penggesernya sendiri */}
      <line
        x1={nlKe(B_MIN, L)}
        y1={L.nlY}
        x2={nlKe(B_MAKS, L)}
        y2={L.nlY}
        stroke={warnaFaktor}
        strokeWidth={u(7, 7)}
        strokeLinecap="round"
        opacity={0.32}
      />
      {NL_ANGKA.map((v) => (
        <g key={v}>
          <line
            x1={nlKe(v, L)}
            y1={L.nlY - (v === 0 ? 12 : 6)}
            x2={nlKe(v, L)}
            y2={L.nlY + (v === 0 ? 12 : 6)}
            stroke={v === 0 ? 'var(--ink-3)' : 'var(--m-axis)'}
            strokeWidth={v === 0 ? 1.8 : 1.3}
          />
          <text
            x={nlKe(v, L)}
            y={L.nlAngkaY}
            textAnchor="middle"
            fontSize={u(12, 12)}
            fontWeight={700}
            fill="var(--ink-soft)"
          >
            {bil(v)}
          </text>
        </g>
      ))}
      {/* label statis disembunyikan saat titiknya dipegang: pegangan punya labelnya sendiri */}
      {aktif !== 'b' && (
        <Tag x={hx} y={L.nlLabelY} warna={warnaFaktor} size={15}>
          {`× ${tanda(nb)}`}
        </Tag>
      )}

      {/* ---------- Tabel pola ---------- */}
      {BARIS.map((m, i) => {
        const o = tampak(i)
        if (o <= 0.01) return null
        const hasil = m * nb + 0 // "+ 0" mengubah −0 menjadi 0 agar tidak tampil "-0"
        const y = L.y0 + i * L.dy
        const negatifKeduanya = m < 0
        const warna = negatifKeduanya ? 'var(--m-hi)' : 'var(--ink)'
        return (
          <g key={m} opacity={o}>
            {negatifKeduanya && (
              <rect
                x={L.rectX}
                y={y - rectH / 2}
                width={L.rectW}
                height={rectH}
                rx={9}
                fill="var(--m-hi)"
                opacity={nyalaHasil || nyalaNeg ? 0.16 : 0.08}
              />
            )}
            <text
              x={L.xKiri}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={L.fBaris}
              fontWeight={700}
              fontFamily="var(--font-math)"
            >
              <tspan fill={tinta(warna)}>{`${tanda(m)} × `}</tspan>
              <tspan fill={tinta(warnaFaktor)}>{tanda(nb)}</tspan>
            </text>
            <text
              x={L.xSama}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={L.fBaris}
              fontWeight={700}
              fill="var(--ink-2)"
            >
              =
            </text>
            <text
              x={L.xHasil}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={L.fHasil}
              fontWeight={800}
              fill={tinta(hasil > 0 ? 'var(--m-ab)' : hasil < 0 ? 'var(--m-b)' : 'var(--ink-2)')}
              fontFamily="var(--font-math)"
            >
              {bil(hasil)}
            </text>
          </g>
        )
      })}

      {/* panah "+b" di antara baris */}
      {panah > 0.05 &&
        BARIS.slice(0, -1).map((m, i) => {
          const o = Math.min(panah, tampak(i), tampak(i + 1))
          if (o <= 0.05) return null
          const y = L.y0 + i * L.dy + L.dy / 2
          return (
            <g key={`p${m}`} opacity={o}>
              <path
                d={`M ${L.xHasil + L.panahDx} ${y - 13} q 22 13 0 26`}
                fill="none"
                stroke="var(--m-ab)"
                strokeWidth={2}
              />
              <Tag x={L.xHasil + L.panahTagDx} y={y} warna="var(--m-ab)" size={14}>
                {`+${fmt(b)}`}
              </Tag>
            </g>
          )
        })}

      {/* ---------- Panel argumen distributif ---------- */}
      {panel > 0.05 && (
        <g opacity={panel}>
          <rect
            x={L.panelX}
            y={L.panelY}
            width={L.panelW}
            height={L.panelH}
            rx={14}
            fill="var(--surface-2)"
          />
          <Tag x={L.panelX + L.panelW / 2} y={L.panelKepalaY} warna="var(--m-a)" size={14} latar={null}>
            alasan yang mengunci
          </Tag>
          {[
            `(−1)(−${fmt(b)}) + (−1)(${fmt(b)})`,
            `= (−1) × (−${fmt(b)} + ${fmt(b)})`,
            `= (−1) × 0 = 0`,
            `karena (−1)(${fmt(b)}) = −${fmt(b)},`,
            `maka (−1)(−${fmt(b)}) = +${fmt(b)}`,
          ].map((s, i) => (
            <text
              key={i}
              x={L.panelX + L.panelW / 2}
              y={L.panelBarisY + i * L.panelDy}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={fPanel}
              fontWeight={i === 4 ? 800 : 600}
              fill={tinta(i === 4 ? 'var(--m-ab)' : 'var(--ink-2)')}
              fontFamily="var(--font-math)"
            >
              {s}
            </text>
          ))}
        </g>
      )}

      {/* ---------- Tabel aturan tanda ---------- */}
      {aturan > 0.05 && (
        <g opacity={aturan}>
          {[
            ['+ × +', '+'],
            ['+ × −', '−'],
            ['− × +', '−'],
            ['− × −', '+'],
          ].map(([kiri, hasil], i) => {
            const x = L.aturanX + (i % 2) * (L.selW + L.selGapX)
            const y = L.aturanY + Math.floor(i / 2) * (L.selH + L.selGapY)
            const positif = hasil === '+'
            return (
              <g key={kiri}>
                <rect
                  x={x}
                  y={y}
                  width={L.selW}
                  height={L.selH}
                  rx={10}
                  fill={positif ? 'var(--m-ab)' : 'var(--m-b)'}
                  opacity={i === 3 ? 0.28 : 0.14}
                  stroke={positif ? 'var(--m-ab)' : 'var(--m-b)'}
                  strokeWidth={i === 3 ? 2.5 : 1}
                />
                <text
                  x={x + L.selW / 2}
                  y={y + L.selH / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={L.fSel}
                  fontWeight={800}
                  fill={tinta(positif ? 'var(--m-ab)' : 'var(--m-b)')}
                >
                  {`${kiri} = ${hasil}`}
                </text>
              </g>
            )
          })}
        </g>
      )}

      {step === 1 && (
        <Tag x={L.w / 2} y={L.ketY} warna="var(--m-ab)" size={L.fKet}>
          {`setiap turun satu baris, hasilnya naik ${fmt(b)}`}
        </Tag>
      )}
      {step === 5 && (
        <Tag x={L.w / 2} y={L.ketY} warna="var(--ink-2)" size={L.fKet}>
          pola saja belum membuktikan
        </Tag>
      )}

      {/* Titik pada garis bilangan: satu-satunya angka yang bisa diubah di sini.
          Selalu ada, karena baris pertama pun sudah memakainya.
          keNilai membaca posisi jari sebagai bilangan pada garis itu apa adanya
          (negatif), kebalikan tepat dari nlKe yang menggambar titiknya.
          Ajakannya dibuat sesingkat mungkin: pil itu digantung mesin tepat di
          bawah titiknya, jadi kalau panjang ia menutupi beberapa angka garis
          bilangan sekaligus. Dengan satu kata dan nlAngkaY yang dijaga
          (lihat TataBongkar.nlAngkaY), pil itu lewat di bawah barisan angka
          tanpa menyentuhnya, kecuali di mode layar penuh yang skalanya jauh
          di atas 1 — di sana pil bergeser naik dalam satuan dan menutupi satu
          angka, yaitu angka di bawah titik itu sendiri, yang nilainya sudah
          tertulis di label atas titiknya. */}
      <Pegangan
        x={hx}
        y={L.nlY}
        param="b"
        arah="x"
        utama
        ajakan="Seret"
        label={`× ${tanda(nb)}`}
        keNilai={(pt) =>
          NL_MIN + clamp((pt.x - L.nlX1) / (L.nlX2 - L.nlX1), 0, 1) * (NL_MAKS - NL_MIN)
        }
      />
    </Svg>
  )
}

/* ---------------- Tata letak eksperimen ---------------- */

/** Kedua faktor hidup pada garis bilangan −6…6 (sama dengan rentang penggeser). */
const EKS_MIN = -6
const EKS_MAKS = 6

interface SumbuSpec {
  x1: number
  x2: number
  y: number
}

interface TataEks {
  w: number
  h: number
  maxH: number
  pernyataanY: number
  fPernyataan: number
  tandaY: number
  fTanda: number
  /** dua garis bilangan faktor: [a, b]. */
  sumbu: [SumbuSpec, SumbuSpec]
  /**
   * Label nilai di atas titik, angka di bawah garis. angkaDy paling banyak
   * 22: pil ajakan Pegangan menggantung 22,3 piksel layar di bawah titiknya,
   * dan kedua tata letak eksperimen bisa mencapai skala 1, jadi angka yang
   * lebih rendah dari itu akan terbayang pilnya.
   */
  labelDy: number
  angkaDy: number
  /** simbol (a / b) di kiri garisnya: penanda tetap yang menyatu dengan rumus. */
  simbolDx: number
  /**
   * Keterangan kata ("bilangan pertama") di bawah garis — hanya di tata letak
   * lebar. Di HP tempat itu dipakai ajakan "Seret" yang digantung Pegangan di
   * bawah titiknya, jadi di sana cukup simbol di kiri garis.
   */
  ketDy?: number
  /** angka ditulis setiap berapa satuan. */
  tiap: number
  /** garis bilangan hasil. */
  gy: number
  gx1: number
  gx2: number
  hasilTiap: number
  hasilAngkaDy: number
  hasilTagDy: number
  fHasilTag: number
}

const EKS_LEBAR: TataEks = {
  w: 690,
  h: 430,
  maxH: 430,
  pernyataanY: 42,
  fPernyataan: 24,
  tandaY: 82,
  fTanda: 15,
  sumbu: [
    { x1: 55, x2: 305, y: 142 },
    { x1: 385, x2: 635, y: 142 },
  ],
  labelDy: -32,
  angkaDy: 22,
  simbolDx: 16,
  ketDy: 68,
  tiap: 2,
  gy: 348,
  gx1: 50,
  gx2: 640,
  hasilTiap: 6,
  hasilAngkaDy: 22,
  hasilTagDy: -78,
  fHasilTag: 18,
}

/** HP tegak: dua garis bilangan faktor bertumpuk, garis hasil di bawahnya. */
const EKS_HP: TataEks = {
  w: 420,
  h: 442,
  maxH: 442,
  pernyataanY: 44,
  fPernyataan: 20,
  tandaY: 80,
  fTanda: 13,
  sumbu: [
    { x1: 60, x2: 360, y: 150 },
    { x1: 60, x2: 360, y: 262 },
  ],
  labelDy: -32,
  angkaDy: 22,
  simbolDx: 16,
  tiap: 2,
  gy: 396,
  gx1: 40,
  gx2: 380,
  hasilTiap: 12,
  hasilAngkaDy: 22,
  hasilTagDy: -78,
  fHasilTag: 18,
}

/** Nilai faktor → koordinat x pada sumbunya. Rumus posisi satu-satunya. */
const eksKe = (v: number, s: SumbuSpec) =>
  s.x1 + ((v - EKS_MIN) / (EKS_MAKS - EKS_MIN)) * (s.x2 - s.x1)

/**
 * Satu garis bilangan −6…6 dengan titik yang bisa diseret. Dipakai dua kali:
 * satu untuk tiap faktor, sehingga anak melihat tandanya berpindah sisi nol.
 */
function SumbuFaktor({
  s,
  L,
  param,
  simbol,
  nilai,
  warna,
  ket,
  utama,
  aktif,
  u,
}: {
  s: SumbuSpec
  L: TataEks
  param: string
  /** lambang yang sama dengan rumus dan kontrol angka: 'a' atau 'b'. */
  simbol: string
  nilai: number
  warna: string
  ket: string
  utama?: boolean
  aktif: string | null
  u: (px: number, cadangan?: number) => number
}) {
  const hx = eksKe(nilai, s)
  const angka: number[] = []
  for (let v = EKS_MIN; v <= EKS_MAKS; v += 1) angka.push(v)
  return (
    <g>
      <line x1={s.x1} y1={s.y} x2={s.x2} y2={s.y} stroke="var(--m-axis)" strokeWidth={2} />
      <line
        x1={s.x1}
        y1={s.y}
        x2={s.x2}
        y2={s.y}
        stroke={warna}
        strokeWidth={u(7, 7)}
        strokeLinecap="round"
        opacity={0.22}
      />
      {angka.map((v) => (
        <g key={v}>
          <line
            x1={eksKe(v, s)}
            y1={s.y - (v === 0 ? 12 : 6)}
            x2={eksKe(v, s)}
            y2={s.y + (v === 0 ? 12 : 6)}
            stroke={v === 0 ? 'var(--ink-3)' : 'var(--m-axis)'}
            strokeWidth={v === 0 ? 1.8 : 1.3}
          />
          {v % L.tiap === 0 && (
            <text
              x={eksKe(v, s)}
              y={s.y + L.angkaDy}
              textAnchor="middle"
              fontSize={u(12, 12)}
              fontWeight={700}
              fill="var(--ink-soft)"
            >
              {bil(v)}
            </text>
          )}
        </g>
      ))}
      {/* lambang di kiri garisnya — warnanya sama dengan bagian rumusnya */}
      <Tag x={s.x1 - L.simbolDx} y={s.y} anchor="end" warna={warna} size={16}>
        {simbol}
      </Tag>
      {/* keterangan kata hanya bila tata letaknya menyediakan tempat */}
      {L.ketDy !== undefined && (
        <Tag
          x={(s.x1 + s.x2) / 2}
          y={s.y + L.ketDy}
          size={u(12, 13)}
          warna="var(--ink-2)"
          tebal={700}
          latar={null}
          layar
        >
          {ket}
        </Tag>
      )}
      {/* label statis disembunyikan selama titiknya dipegang */}
      {aktif !== param && (
        <Tag x={hx} y={s.y + L.labelDy} warna={warna} size={15}>
          {bil(nilai)}
        </Tag>
      )}
      {/* Ajakan sengaja satu kata: pil itu digantung mesin di bawah titiknya,
          jadi kalau panjang ia menutupi angka-angka garis bilangan. angkaDy
          dijaga 22 supaya pil lewat di bawah barisan angka (lihat TataEks). */}
      <Pegangan
        x={hx}
        y={s.y}
        param={param}
        arah="x"
        utama={utama}
        ajakan="Seret"
        label={bil(nilai)}
        keNilai={(pt) =>
          EKS_MIN + clamp((pt.x - s.x1) / (s.x2 - s.x1), 0, 1) * (EKS_MAKS - EKS_MIN)
        }
      />
    </g>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  // "+ 0" mengubah −0 menjadi 0 agar tidak tampil "-0".
  const a = Math.round(clamp(p.a ?? -3, EKS_MIN, EKS_MAKS)) + 0
  const b = Math.round(clamp(p.b ?? -4, EKS_MIN, EKS_MAKS)) + 0
  const hasil = a * b + 0

  const sempit = useSempit()
  const L = sempit ? EKS_HP : EKS_LEBAR
  const u = useUkuranLayarUntuk(L.w)
  const aktif = useInteraksi()?.kendali.aktif ?? null

  // Garis bilangan hasil: −36 sampai 36 (6 × 6 adalah hasil terbesar).
  const min = -36
  const maks = 36
  const gy = L.gy
  const ke = (v: number) => L.gx1 + ((v - min) / (maks - min)) * (L.gx2 - L.gx1)

  const langkah = Math.abs(a)

  const warnaA = sorot === 'neg-a' || aktif === 'a' ? 'var(--m-hi)' : 'var(--m-a)'
  const warnaB = sorot === 'neg-b' || aktif === 'b' ? 'var(--m-hi)' : 'var(--m-b)'
  const warnaHasil = sorot === 'hasil' ? 'var(--m-hi)' : 'var(--m-ab)'

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Dua garis bilangan untuk kedua faktor, dan garis bilangan hasil perkaliannya"
    >
      {/* pernyataan perkalian: warnanya sama dengan titik yang mewakilinya */}
      <text
        x={L.w / 2}
        y={L.pernyataanY}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={L.fPernyataan}
        fontWeight={800}
        fontFamily="var(--font-math)"
      >
        <tspan fill={tinta(warnaA)}>{tanda(a)}</tspan>
        <tspan fill="var(--ink-soft)">{' × '}</tspan>
        <tspan fill={tinta(warnaB)}>{tanda(b)}</tspan>
        <tspan fill="var(--ink-soft)">{' = '}</tspan>
        <tspan fill={tinta(warnaHasil)}>{bil(hasil)}</tspan>
      </text>
      <Tag
        x={L.w / 2}
        y={L.tandaY}
        warna={sorot === 'neg-a' || sorot === 'neg-b' ? 'var(--m-hi)' : 'var(--ink-2)'}
        size={L.fTanda}
      >
        {a === 0 || b === 0
          ? 'apa pun dikali nol hasilnya nol'
          : a < 0 && b < 0
            ? 'negatif × negatif → hasilnya positif'
            : a > 0 && b > 0
              ? 'positif × positif → hasilnya positif'
              : 'tandanya berbeda → hasilnya negatif'}
      </Tag>

      {/* dua faktor, masing-masing satu titik pada garis bilangannya */}
      <SumbuFaktor
        s={L.sumbu[0]}
        L={L}
        param="a"
        simbol="a"
        nilai={a}
        warna={warnaA}
        ket="bilangan pertama"
        utama
        aktif={aktif}
        u={u}
      />
      <SumbuFaktor
        s={L.sumbu[1]}
        L={L}
        param="b"
        simbol="b"
        nilai={b}
        warna={warnaB}
        ket="bilangan kedua"
        aktif={aktif}
        u={u}
      />

      {/* ---------- garis bilangan hasil ---------- */}
      <line x1={L.gx1} y1={gy} x2={L.gx2} y2={gy} stroke="var(--m-axis)" strokeWidth={2} />
      {Array.from({ length: 13 }, (_, i) => min + i * 6).map((v) => (
        <g key={v}>
          <line
            x1={ke(v)}
            y1={gy - 6}
            x2={ke(v)}
            y2={gy + 6}
            stroke="var(--m-axis)"
            strokeWidth={1.4}
          />
          {v % L.hasilTiap === 0 && (
            <text
              x={ke(v)}
              y={gy + L.hasilAngkaDy}
              textAnchor="middle"
              fontSize={u(12, 12)}
              fontWeight={700}
              fill="var(--ink-soft)"
            >
              {bil(v)}
            </text>
          )}
        </g>
      ))}
      <line x1={ke(0)} y1={gy - 42} x2={ke(0)} y2={gy + 12} stroke="var(--ink-3)" strokeWidth={1.6} />

      {/* Lompatan sebanyak |a| kali sepanjang b — paling banyak 6 karena |a| ≤ 6.
          Kalau hasilnya nol, panjang tiap lompatan nol: busurnya tidak
          digambar, sebab busur sepanjang nol hanya meninggalkan coretan
          berwarna di atas garis nol. */}
      {hasil !== 0 &&
        Array.from({ length: langkah }, (_, i) => {
          // Setiap lompatan sepanjang |b|; arahnya ditentukan tanda hasil.
          const mulai = i * (hasil / (langkah || 1))
          const akhir = (i + 1) * (hasil / (langkah || 1))
          const naik = 26 + (i % 2) * 12
          return (
            <path
              key={i}
              d={`M ${ke(mulai)} ${gy - 4} Q ${(ke(mulai) + ke(akhir)) / 2} ${gy - 4 - naik} ${ke(akhir)} ${gy - 4}`}
              fill="none"
              stroke={warnaHasil}
              strokeWidth={2.2}
              opacity={0.85}
            />
          )
        })}

      <circle cx={ke(hasil)} cy={gy} r={sorot === 'hasil' ? 10 : 7} fill={warnaHasil} />
      <Tag x={ke(hasil)} y={gy + L.hasilTagDy} warna={warnaHasil} size={L.fHasilTag}>
        {bil(hasil)}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'negatif-kali-negatif',
  topicId: 'smp7-operasi-hitung-bilangan-bulat',
  judul: 'Negatif kali negatif',
  pertanyaan: 'Kenapa negatif × negatif hasilnya positif?',
  tagline: 'Bukan aturan yang dibuat-buat. Ini satu-satunya jawaban yang menjaga aritmetika tetap utuh.',
  kelas: 7,
  domain: 'bilangan',
  tags: ['bilangan bulat', 'negatif', 'perkalian', 'pola', 'distributif'],

  tebak: {
    pertanyaan: 'Menurutmu, kenapa (−3) × (−4) hasilnya +12 dan bukan −12?',
    pilihan: [
      {
        id: 'a',
        label: 'Karena memang begitu aturannya',
        balasan:
          'Ini jawaban yang paling sering terdengar di kelas. Tapi matematika hampir tidak pernah punya aturan yang benar-benar sembarangan — biasanya ada sesuatu yang memaksanya.',
      },
      {
        id: 'b',
        label: 'Karena dua tanda minus saling menghapus',
        balasan:
          'Cara mengingat yang praktis, tapi belum menjelaskan apa pun. Kenapa dua minus boleh saling menghapus pada perkalian, sedangkan pada penjumlahan tidak?',
      },
      {
        id: 'c',
        label: 'Karena kalau hasilnya negatif, aturan hitung lain jadi rusak',
        benar: true,
        balasan:
          'Tepat. Nilai positif adalah satu-satunya pilihan yang menjaga hukum distributif tetap berlaku. Sebentar lagi kamu melihat kerusakannya kalau dipilih yang lain.',
      },
    ],
    penutup:
      'Yang menarik: tidak ada seorang pun yang "memutuskan" hasilnya positif. Aturan itu terpaksa muncul.',
  },

  bongkar: {
    Visual: VisualBongkar,
    // Penggeser menyimpan bilangan negatifnya sendiri (−5…−2), bukan besarnya:
    // angka di kontrol persis sama dengan angka yang tertulis di setiap baris
    // tabel dan di atas titiknya, dan menaikkan nilainya menggeser titik ke
    // kanan. Lambangnya "−b" supaya sepadan dengan bagian (−b) pada rumus akhir.
    params: [
      {
        key: 'b',
        label: 'Bilangan negatif yang dikalikan',
        min: B_MIN,
        max: B_MAKS,
        step: 1,
        awal: B_MAKS,
        bulat: true,
        simbol: '−b',
        peran: 'b',
        bagian: 'neg-b',
      },
    ],
    roles: { 'neg-a': 'a', 'neg-b': 'b', hasil: 'ab', nol: 'hi' },
    arti: {
      'neg-a': 'Bilangan pertama yang negatif.',
      'neg-b': 'Bilangan kedua yang negatif — titik yang kamu seret pada garis bilangan.',
      hasil: 'Hasil kalinya — positif, dan itu terpaksa demikian.',
      nol: 'Nol adalah kunci argumennya: apa pun dikali nol hasilnya nol.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Mulai dari yang sudah kamu tahu',
        narasi:
          'Tiga baris pertama ini perkalian biasa: bilangan positif dikali bilangan negatif. Hasilnya negatif, dan itu belum aneh sama sekali.',
        durasi: 2200,
      },
      {
        id: 's1',
        judul: 'Ada pola yang rapi',
        narasi: (p) => {
          const b = nilaiB(p)
          return `Perhatikan kolom hasilnya: setiap kali pengali di kiri berkurang satu, hasilnya justru naik ${fmt(b)}. Dari ${bil(-3 * b)} ke ${bil(-2 * b)} lalu ke ${bil(-b)}, naiknya selalu ${fmt(b)}.`
        },
        durasi: 2000,
      },
      {
        id: 's2',
        judul: 'Sampai di nol',
        narasi:
          'Nol dikali berapa pun hasilnya nol. Baris ini tidak diragukan siapa pun, dan ia menjadi titik pijak kita.',
        durasi: 1600,
      },
      {
        id: 's3',
        judul: 'Teruskan polanya satu baris lagi',
        narasi: (p) => {
          const b = nilaiB(p)
          return `Kalau polanya diteruskan, hasil berikutnya harus naik ${fmt(b)} lagi dari nol, jadi (−1) × (${bil(-b)}) = ${fmt(b)}. Artinya negatif dikali negatif memberi hasil positif.`
        },
        durasi: 2200,
      },
      {
        id: 's4',
        judul: 'Dan sekali lagi',
        narasi: (p) => {
          const b = nilaiB(p)
          return `Polanya tetap konsisten: (−2) × (${bil(-b)}) = ${fmt(2 * b)}, naik ${fmt(b)} lagi. Menghentikan pola di sini justru akan membuat tabel ini tampak ganjil.`
        },
        durasi: 1800,
      },
      {
        id: 's5',
        judul: 'Tapi pola belum membuktikan',
        narasi:
          'Pola bisa saja kebetulan. Alasan yang benar-benar mengunci datang dari sifat distributif — sifat yang sudah kamu pakai sejak SD.',
        rumus: (p) => {
          const b = nilaiB(p)
          return `(−1)(${bil(-b)}) + (−1)(${fmt(b)}) = (−1)([nol:${bil(-b)} + ${fmt(b)}]) = (−1)(0) = 0`
        },
        durasi: 2600,
      },
      {
        id: 's6',
        judul: 'Aturan tandanya',
        narasi: (p) => {
          const b = nilaiB(p)
          return `Karena (−1)(${fmt(b)}) = ${bil(-b)}, satu-satunya nilai yang membuat jumlahnya nol adalah (−1)(${bil(-b)}) = +${fmt(b)}. Argumen yang sama persis berlaku untuk bilangan negatif mana pun, sehingga (−a)(−b) = +ab.`
        },
        rumus: '[neg-a:(−a)] × [neg-b:(−b)] = [hasil:+ab]',
        durasi: 2400,
      },
    ],
  },

  eksperimen: {
    judul: 'Coba semua kombinasi tanda',
    ajakan:
      'Seret kedua titik pada garis bilangannya melewati nol. Perhatikan kapan hasilnya berpindah ke sisi kanan.',
    params: [
      {
        key: 'a',
        label: 'Bilangan pertama',
        min: EKS_MIN,
        max: EKS_MAKS,
        step: 1,
        awal: -3,
        bulat: true,
        simbol: 'a',
        peran: 'a',
        bagian: 'neg-a',
      },
      {
        key: 'b',
        label: 'Bilangan kedua',
        min: EKS_MIN,
        max: EKS_MAKS,
        step: 1,
        awal: -4,
        bulat: true,
        simbol: 'b',
        peran: 'b',
        bagian: 'neg-b',
      },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const a = Math.round(clamp(p.a ?? -3, EKS_MIN, EKS_MAKS)) + 0
      const b = Math.round(clamp(p.b ?? -4, EKS_MIN, EKS_MAKS)) + 0
      return `[neg-a:${tanda(a)}] × [neg-b:${tanda(b)}] = [hasil:${bil(a * b + 0)}]`
    },
    temuan: (p) => {
      const a = Math.round(p.a ?? -3) + 0
      const b = Math.round(p.b ?? -4) + 0
      const h = a * b + 0
      return (
        <p>
          <strong>
            {tanda(a)} × {tanda(b)} = {bil(h)}.
          </strong>{' '}
          {a === 0 || b === 0
            ? 'Nol menghapus segalanya — dan justru baris nol inilah yang memaksa aturan tanda menjadi seperti sekarang.'
            : a * b > 0
              ? 'Kedua tandanya sama, jadi hasilnya positif.'
              : 'Tandanya berbeda, jadi hasilnya negatif.'}{' '}
          Tahan satu titik tetap di sisi kiri nol, lalu tarik titik yang lain dari ujung kiri sampai
          ujung kanan: hasilnya bergerak menurun dengan langkah tetap, melewati nol tanpa terputus.
          Pola itulah yang tidak boleh dirusak.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Alasan sebenarnya cuma satu kalimat: <strong>kita ingin hukum distributif tetap
          berlaku.</strong> Sifat itu berbunyi a(b + c) = ab + ac, dan sudah kamu pakai sejak
          belajar perkalian bersusun.
        </p>
        <p>Sekarang perhatikan perhitungan ini, dengan a dan b bilangan positif:</p>
        <p style={{ textAlign: 'center' }}>
          (−a)(−b) + (−a)(b) = (−a)(−b + b) = (−a)(0) = 0
        </p>
        <p>
          Kita sudah tahu (−a)(b) = −ab: urutan perkalian boleh ditukar, jadi (−a)(b) = b × (−a),
          dan bilangan positif dikali bilangan negatif hasilnya negatif — persis seperti baris-baris
          awal tabel tadi. Jadi persamaan di atas menjadi (−a)(−b) + (−ab) = 0, dan satu-satunya
          bilangan yang bila dijumlahkan dengan −ab menghasilkan nol adalah <strong>+ab</strong>.
        </p>
        <p>
          Jadi bukan seseorang yang memutuskan hasilnya positif. Nilai itu terpaksa muncul, kecuali
          kita bersedia membuang hukum distributif — dan tanpa hukum itu, hampir seluruh aritmetika
          yang kamu kenal ikut runtuh.
        </p>
        <h4>Analogi yang membantu, tapi bukan bukti</h4>
        <p>
          Ada analogi terkenal: menghadap ke suatu arah, lalu berbalik dua kali, membuatmu menghadap
          ke arah semula. Analogi ini enak diingat dan tidak salah, tetapi ia hanya{' '}
          <em>menggambarkan</em> aturannya — yang membuktikan tetap argumen distributif di atas.
        </p>
      </>
    ),
    SD: (
      <>
        <p>
          Lihat daftar ini: 3 × (−2) = −6, lalu 2 × (−2) = −4, lalu 1 × (−2) = −2, lalu 0 × (−2) = 0.
        </p>
        <p>
          Setiap kali angka di depan berkurang satu, hasilnya naik 2. Turun, naik 2. Turun, naik 2.
        </p>
        <p>
          Nah, kalau diteruskan: (−1) × (−2) harus naik 2 lagi dari 0, jadi hasilnya{' '}
          <strong>+2</strong>. Kalau tiba-tiba hasilnya −2, polanya patah tanpa alasan.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Dalam bahasa aljabar abstrak, aturan tanda adalah <em>teorema</em>, bukan aksioma. Pada
          sembarang gelanggang (ring) berlaku (−a)(−b) = ab, dan buktinya persis yang tadi:
        </p>
        <p style={{ textAlign: 'center' }}>
          (−a)(−b) + (−a)b = (−a)(−b + b) = (−a)·0 = 0 ⟹ (−a)(−b) = −((−a)b) = −(−ab) = ab
        </p>
        <p>
          Langkah (−a)·0 = 0 sendiri juga teorema: dari a·0 = a(0 + 0) = a·0 + a·0, kurangkan a·0
          dari kedua ruas. Begitu pula (−a)b = −(ab), dengan cara yang sama: ab + (−a)b = (a + (−a))b
          = 0·b = 0.
        </p>
        <h4>Kenapa ini penting</h4>
        <p>
          Kalau seseorang mendefinisikan (−1)(−1) = −1 pada bilangan bulat, struktur yang dihasilkan
          bukan lagi gelanggang: distributivitas gugur, dan bersamanya gugur pula pemfaktoran,
          penyelesaian persamaan, serta hampir semua aljabar. Jadi "negatif kali negatif positif"
          bukan pilihan selera — ia akibat yang tak terelakkan bila hukum distributif ingin tetap
          berlaku.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[neg-a:(−a)] × [neg-b:(−b)] = [hasil:ab]',
    roles: { 'neg-a': 'a', 'neg-b': 'b', hasil: 'ab' },
    arti: {
      'neg-a': 'Bilangan negatif pertama.',
      'neg-b': 'Bilangan negatif kedua.',
      hasil:
        'Hasilnya positif — satu-satunya nilai yang menjaga hukum distributif tetap berlaku.',
    },
  },

  soal: [
    (rnd) => {
      const a = -(2 + Math.floor(rnd() * 8))
      const b = -(2 + Math.floor(rnd() * 8))
      return {
        id: 'neg-1',
        tipe: 'angka',
        topicId: 'smp7-operasi-hitung-bilangan-bulat',
        kelas: 7,
        tingkat: 'mudah',
        konsep: 'negatif-kali-negatif',
        pertanyaan: `Hitunglah ${tanda(a)} × ${tanda(b)}.`,
        jawaban: a * b,
        toleransi: 1e-9,
        hint: [
          'Tentukan dulu tandanya sebelum menghitung angkanya.',
          'Kedua bilangan bertanda sama, jadi hasilnya positif.',
          `Sekarang kalikan angkanya: ${fmt(Math.abs(a))} × ${fmt(Math.abs(b))}.`,
        ],
        pembahasan: `${tanda(a)} × ${tanda(b)} = +${fmt(a * b)}. Tanda sama menghasilkan positif.`,
      }
    },
    {
      id: 'neg-2',
      tipe: 'pilihan',
      topicId: 'smp7-operasi-hitung-bilangan-bulat',
      kelas: 7,
      tingkat: 'sedang',
      konsep: 'negatif-kali-negatif',
      pertanyaan: 'Hasil dari (−2) × (−3) × (−4) adalah...',
      pilihan: [
        { id: 'a', label: '−24', benar: true },
        {
          id: 'b',
          label: '24',
          diagnosa:
            'Kamu mungkin berpikir "semua negatif jadi positif". Yang menentukan adalah BANYAKNYA tanda negatif: di sini ada tiga, jumlah ganjil, jadi hasilnya negatif.',
        },
        { id: 'c', label: '−9', diagnosa: 'Angkanya dijumlahkan, bukan dikalikan.' },
        { id: 'd', label: '9', diagnosa: 'Dua kekeliruan sekaligus: dijumlahkan, lalu tandanya juga keliru.' },
      ],
      hint: [
        'Kerjakan dua bilangan pertama dulu, baru hasilnya dikalikan dengan yang ketiga.',
        '(−2) × (−3) = +6. Sekarang +6 dikali (−4).',
        'Hitung banyaknya tanda negatif. Kalau ganjil, hasil akhirnya negatif.',
      ],
      pembahasan:
        '(−2)(−3) = 6, lalu 6 × (−4) = −24. Aturan cepatnya: banyaknya faktor negatif genap → hasil positif; ganjil → hasil negatif.',
    },
    {
      id: 'neg-3',
      tipe: 'benar-salah',
      topicId: 'smp7-operasi-hitung-bilangan-bulat',
      kelas: 7,
      tingkat: 'sedang',
      konsep: 'negatif-kali-negatif',
      pertanyaan: 'Sama seperti pada perkalian, (−3) + (−4) juga menghasilkan bilangan positif.',
      jawaban: false,
      diagnosa:
        'Aturan "dua negatif jadi positif" hanya berlaku untuk perkalian dan pembagian, tidak untuk penjumlahan. Menambah utang pada utang tetap menghasilkan utang.',
      hint: [
        'Perhatikan operasinya: ini penjumlahan, bukan perkalian.',
        'Bayangkan garis bilangan: mulai dari −3, lalu melangkah 4 lagi ke kiri.',
        'Ke mana kamu berakhir, di kiri atau di kanan nol?',
      ],
      pembahasan:
        'Salah. (−3) + (−4) = −7. Aturan tanda pada perkalian tidak berlaku pada penjumlahan — ini salah satu kekeliruan paling sering.',
    },
    {
      id: 'neg-4',
      tipe: 'urutkan',
      topicId: 'smp7-operasi-hitung-bilangan-bulat',
      kelas: 8,
      tingkat: 'sulit',
      konsep: 'negatif-kali-negatif',
      pertanyaan: 'Susun kembali alasan yang memaksa (−1) × (−2) bernilai +2.',
      langkah: [
        'Mulai dari −2 + 2 = 0',
        'Kalikan kedua ruas dengan (−1): (−1)(−2 + 2) = (−1) × 0',
        'Jabarkan ruas kiri dengan sifat distributif: (−1)(−2) + (−1)(2) = (−1) × 0',
        'Ruas kanan bernilai 0, jadi (−1)(−2) + (−1)(2) = 0',
        'Karena (−1)(2) = −2, maka (−1)(−2) harus +2 agar jumlahnya 0',
      ],
      hint: [
        'Buktinya berangkat dari sesuatu yang pasti benar dan sangat sederhana.',
        'Nol adalah kuncinya: apa pun dikali nol hasilnya nol.',
        'Penjabaran dengan sifat distributif dilakukan setelah kedua ruas dikalikan.',
      ],
      pembahasan:
        'Inti buktinya: kalikan pernyataan yang pasti benar (−2 + 2 = 0) dengan (−1), lalu jabarkan dengan sifat distributif. Hasil positif menjadi satu-satunya kemungkinan.',
    },
    (rnd) => {
      const a = -(2 + Math.floor(rnd() * 6))
      const b = 2 + Math.floor(rnd() * 6)
      const c = -(2 + Math.floor(rnd() * 6))
      return {
        id: 'neg-5',
        tipe: 'angka',
        topicId: 'smp7-operasi-hitung-bilangan-bulat',
        kelas: 8,
        tingkat: 'sulit',
        konsep: 'negatif-kali-negatif',
        pertanyaan: `Hitunglah ${tanda(a)} × ${tanda(b)} − ${tanda(a)} × ${tanda(c)}.`,
        jawaban: a * b - a * c,
        toleransi: 1e-9,
        hint: [
          'Kerjakan kedua perkalian lebih dulu, baru kurangkan.',
          `${tanda(a)} × ${tanda(b)} = ${bil(a * b)}, dan ${tanda(a)} × ${tanda(c)} = ${bil(a * c)}.`,
          `Sekarang hitung ${bil(a * b)} − ${bil(a * c)}. Hati-hati: ${tanda(a)} × ${tanda(c)} positif karena kedua tandanya negatif, jadi yang dikurangkan adalah bilangan positif.`,
        ],
        pembahasan: `${tanda(a)} × ${tanda(b)} = ${bil(a * b)} dan ${tanda(a)} × ${tanda(c)} = ${bil(a * c)}, jadi ${bil(a * b)} − ${bil(a * c)} = ${bil(a * b - a * c)}. Cara lain: keluarkan faktor bersama, ${tanda(a)} × (${bil(b)} − ${tanda(c)}) = ${tanda(a)} × ${bil(b - c)} = ${bil(a * b - a * c)}.`,
      }
    },
  ],

  lanjut: ['timbangan-persamaan', 'kuadrat-jumlah', 'nilai-tempat'],
}

export default konsep
