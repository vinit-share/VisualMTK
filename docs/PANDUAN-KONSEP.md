# Panduan menulis modul konsep Visual MTK

Dokumen ini adalah kontrak untuk siapa pun (manusia atau agen) yang menambah
konsep baru. Ikuti persis. Acuan kualitas: `src/concepts/segitiga-setengah.tsx`.

Cara anak mengubah angka di dalam gambar — pegangan seret, rel, tata letak HP,
layar penuh — diatur di `docs/PANDUAN-INTERAKSI.md`. Acuan interaksinya:
`src/concepts/lingkaran-luas.tsx`.

## Aturan yang tidak bisa ditawar

1. **Akurasi matematika di atas keindahan visual.** Jangan pernah membuat animasi
   yang enak dilihat tetapi menyesatkan. Kalau sebuah metafora punya batas
   (mis. "perkalian = penjumlahan berulang" gugur untuk pecahan), sebutkan
   batasnya di bagian penjelasan.
2. **Rumus muncul terakhir.** Urutan halaman sudah dipaksakan oleh
   `KonsepPage`: tebak → bongkar → eksperimen → penjelasan → rumus → soal.
   Jangan menulis narasi yang membocorkan rumus di langkah pertama.
3. **Bahasa Indonesia, nada mengajak, bukan menggurui.** Panggil pembaca "kamu".
   Kalimat pendek. Tidak ada "sebagaimana telah diketahui".
4. **Tanpa emoji di dalam konten.** Ikon diambil dari komponen `Ikon`.
5. **Angka ditulis gaya Indonesia**: gunakan `fmt()` dari `src/lib/num.ts`
   (3,14 bukan 3.14).
6. **Satu berkas per konsep**: `src/concepts/<id>.tsx`, `export default` bertipe
   `Konsep`, dengan `id` sama persis dengan nama berkasnya. `registry.ts`
   menemukannya sendiri lewat `import.meta.glob`.
   Judul, pertanyaan, tagline, domain, dan tag yang tampil di galeri diambil
   dari modulmu lewat `npm run bangun:katalog` — jangan menulisnya dua kali.
7. **Jangan menambah dependensi npm.** Tidak ada pustaka animasi, tidak ada
   pustaka grafik. Semua digambar dengan SVG + hook di `src/lib/anim.ts`.
8. **Jangan menyunting berkas milik konsep lain** dan jangan menyunting
   `katalog.ts`, `kurikulum.ts`, atau berkas di `src/components/`, `src/lib/`,
   `src/styles/`. Kalau butuh gaya baru, pakai `style={{...}}` sebaris.

## Kerangka berkas

```tsx
import { Svg, Tag, Dimensi, SikuSiku } from '../components/Stage'
import { fase, seg, easing } from '../lib/anim'
import { fmt, clamp, lerp } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 660   // lebar sistem koordinat SVG
const H = 420   // tinggi sistem koordinat SVG

function VisualBongkar({ step, t, p, sorot }: DeriveState) { /* ... */ }
function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) { /* ... */ }

const konsep: Konsep = { /* ... */ }
export default konsep
```

## Mesin animasi

`VisualBongkar` menerima `{ step, t, p, sorot }`:

- `step` — indeks langkah aktif (0-based)
- `t` — kemajuan langkah aktif, 0→1
- `p` — nilai penggeser (`params` pada `bongkar`)
- `sorot` — id bagian rumus yang sedang disentuh pengguna, atau `null`

Dua pembantu wajib dipakai supaya gambar konsisten saat pengguna melompat
antar langkah:

- `fase(step, t, target)` — 1 bila langkah `target` sudah lewat, 0 bila belum,
  dan `t` bila sedang berjalan.
- `seg(t, a, b)` — potongan `t` di antara `a`..`b`, dinormalkan 0..1. Untuk
  mengurutkan beberapa gerakan di dalam SATU langkah.

Contoh:

```tsx
const munculKotak = fase(step, t, 1)          // kotak mulai muncul di langkah 1
const geser = step === 3 ? seg(t, 0.2, 0.9) : step > 3 ? 1 : 0
```

Gambar harus benar untuk SEMBARANG kombinasi `(step, t)`, bukan hanya saat
animasi berjalan maju — pengguna bisa mengeklik langkah mana pun.

## Warna

Selalu pakai token, jangan hex. Peran warna konsisten di seluruh aplikasi:

| Token | Arti |
|---|---|
| `var(--m-a)` / `var(--m-a-soft)` | besaran pertama (mis. `a`, alas, jari-jari) |
| `var(--m-b)` / `var(--m-b-soft)` | besaran kedua (mis. `b`, tinggi) |
| `var(--m-ab)` / `var(--m-ab-soft)` | hasil interaksi keduanya (mis. `ab`, luas) |
| `var(--m-c)` / `var(--m-c-soft)` | hasil/resultan (mis. `c`) |
| `var(--m-hi)` | sorotan "aha" |
| `var(--m-grid)`, `var(--m-axis)`, `var(--m-ghost)` | kisi, sumbu, bayangan |
| `var(--ink)`, `var(--ink-2)`, `var(--surface)` | teks dan latar |

Token ini otomatis benar di tema terang maupun gelap. Warna hex mentah akan
rusak di tema gelap dan dianggap cacat.

## Rumus interaktif

Markup: `"[luas:L] = [setengah:½] × [alas:a] × [tinggi:t]"`.
Bagian dalam kurung siku menjadi token yang bisa disorot.

- `roles` memetakan id bagian ke peran warna: `'a' | 'b' | 'ab' | 'c' | 'hi' | 'plain'`
- `arti` memberi penjelasan satu kalimat yang muncul saat bagian itu disentuh
- Di dalam `Visual`, baca prop `sorot` dan **nyalakan objek yang bersangkutan**
  (tebalkan garis, naikkan opasitas, tampilkan label). Ini wajib untuk minimal
  dua bagian rumus.
- Pangkat ditulis `r^2` atau `x^{n+1}`.

## Isi `Konsep`

| Bidang | Aturan |
|---|---|
| `tebak` | 3–4 pilihan. Setiap pilihan salah wajib punya `balasan` yang menjelaskan **kenapa pilihan itu menggoda**, bukan sekadar "salah". |
| `bongkar.steps` | 5–8 langkah. `narasi` maksimal 2 kalimat, bahasa anak. `durasi` 1200–2400 ms. |
| `bongkar.params` | 0–3 penggeser. Batasi rentangnya agar konstruksinya tetap sahih. Penggeser tampil di **semua** langkah, jadi bila narasi, judul, atau rumus menyebut angka yang ikut berubah, tulis sebagai fungsi: `narasi: (p) => \`Alasnya ${fmt(p.a)}…\``. Jangan menulis angka tetap yang bisa bertentangan dengan gambar. |
| `eksperimen` | Wajib ada `temuan(p)` yang **berubah mengikuti nilai** — inilah yang membuat anak menemukan pola sendiri. |
| `penjelasan` | Ketiga level (`SD`, `SMP`, `SMA`) diisi bila masuk akal; minimal dua. SD: analogi konkret. SMP: alasan matematis. SMA: formal (koordinat, determinan, limit, dsb). |
| `soal` | 4–6 butir, minimal 3 tipe berbeda, minimal satu generator parametrik. |

## Soal

- Setiap soal punya **3 tingkat `hint`** yang menuntun tanpa membocorkan jawaban:
  hint 1 mengarahkan perhatian, hint 2 memberi langkah antara, hint 3 hampir
  sampai.
- Soal pilihan ganda: setiap pengecoh wajib punya `diagnosa` yang menyebutkan
  **kesalahan berpikir spesifik** yang menghasilkan pilihan itu (mis. "kamu
  memakai sisi miring sebagai tinggi").
- `pembahasan` menyebut angkanya, bukan hanya rumusnya.
- Isi `konsep: '<id konsep ini>'` agar tombol "Lihat kenapa" muncul.
- Isi `topicId` (pada modul dan setiap soal) dengan id topik kurikulum
  tempat konsep ini ditautkan. Tautannya ditulis di tabel `KONSEP_DI_TOPIK`
  pada `scripts/bangun-kurikulum.mjs`; setelah `npm run bangun`, id-nya bisa
  dilihat di `src/data/tautan.generated.ts`.
- Generator parametrik menerima `rnd: () => number` dan harus selalu
  menghasilkan angka "cantik" (hasil bulat, tidak negatif untuk SD).

## Aksesibilitas & performa

- `Svg` wajib diberi `label` yang mendeskripsikan isinya.
- Jangan memakai warna sebagai satu-satunya pembeda: tambahkan label teks,
  pola garis, atau bentuk.
- Semua ukuran huruf pada SVG minimal 13 satuan koordinat.
- Jangan menggambar lebih dari ~400 elemen SVG sekaligus. Untuk simulasi
  berjumlah besar, gambar ringkasannya (batang, kisi terkelompok), bukan
  ribuan elemen.
- Jangan memakai `setInterval`. Kalau perlu animasi mandiri, pakai `useRaf`.
- Hormati `useReducedMotion()` bila membuat gerak sendiri di luar `useTimeline`.

## Uji sebelum selesai

```bash
npm run periksa
```

Perintah ini menjalankan pemeriksaan tipe **dan** `scripts/uji-konsep.mjs`.
Uji itu otomatis memeriksa modulmu:

- bentuk datanya (jumlah langkah, level penjelasan, keberadaan eksperimen);
- `topicId` dan `kelas` modul — juga `topicId` setiap soal — sama dengan
  topik yang ditautkan ke konsep ini di peta kurikulum;
- **kunci jawaban setiap soal** — setiap generator parametrik dijalankan dengan
  12 benih berbeda, lalu jawabannya dinilai ulang memakai penilai yang sama
  dengan yang dipakai aplikasi;
- kelengkapan pedagogis: minimal 2 petunjuk, ada pembahasan, dan setiap
  pengecoh pilihan ganda punya `diagnosa`;
- toleransi soal angka cukup untuk pembulatan yang diminta soalnya;
- judul, narasi, dan rumus setiap langkah bongkar — termasuk yang berupa fungsi
  dari penggeser — dijalankan di seluruh kombinasi nilai penggeser: tidak boleh
  kosong, memuat `NaN`/`undefined`/`+ -`, atau narasinya lebih dari 2 kalimat;
- `temuan()` benar-benar berubah saat penggeser digeser dari minimum ke maksimum;
- **render seluruh visual** pada ratusan kombinasi `(step, t, parameter, sorot)`,
  lalu memindai keluarannya dari `NaN` dan `Infinity` yang bocor ke atribut SVG;
- jumlah elemen SVG tetap di bawah 400;
- tidak ada warna heksadesimal mentah, `console.log`, atau `setInterval`.

Wajib nol temuan **fatal**. Temuan **serius** harus diperbaiki kecuali ada
alasan kuat yang kamu tuliskan sebagai komentar di berkasnya.

Yang tidak bisa diperiksa mesin dan tetap menjadi tanggung jawabmu:
- kebenaran isi penjelasan dan narasi,
- apakah animasinya benar-benar menggambarkan langkah yang diklaim,
- apakah gambarnya masih terbaca di lebar 360 px.
