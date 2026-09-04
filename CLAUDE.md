# Visual MTK

Aplikasi web belajar matematika visual untuk siswa SD–SMA Indonesia.
Tagline: **"Jangan cuma hafal. Lihat kenapa."**

Prinsip produk: `visual → interaksi → eksperimen → penjelasan → baru rumus`.
Rumus tidak pernah muncul lebih dulu.

## Tumpukan teknologi

- Vite + React 19 + TypeScript, tanpa backend dan tanpa basis data.
- Rute: `react-router-dom` dengan **HashRouter** (agar bisa di-hosting statis
  di mana saja).
- Gaya: CSS biasa dengan token di `src/styles/tokens.css`. **Tidak memakai
  Tailwind atau pustaka UI.**
- Animasi: hook sendiri di `src/lib/anim.ts`. **Tidak ada pustaka animasi.**
- Kemajuan belajar: `localStorage` lewat `src/lib/store.ts`.

Jangan menambah dependensi npm tanpa alasan kuat.

## Peta berkas

| Berkas | Isi |
|---|---|
| `src/lib/types.ts` | Model konten (`Konsep`, `DeriveScene`, `Soal`, `Topic`) |
| `src/lib/anim.ts` | `useTimeline`, `useTween`, `fase`, `seg`, `useReducedMotion` |
| `src/lib/store.ts` | Kemajuan, streak, status penguasaan |
| `src/lib/num.ts` | Format angka Indonesia, acak berbenih, util |
| `src/lib/sesi.ts` | Penyusun sesi latihan soal |
| `src/components/Bongkar.tsx` | Mesin "Rumus → Bongkar" (fitur khas) |
| `src/components/Formula.tsx` | Rumus interaktif + `SorotProvider` |
| `src/components/Stage.tsx` | `Svg`, `Tag`, `Dimensi`, `SikuSiku` |
| `src/components/SoalView.tsx` | Penyaji soal + petunjuk bertahap |
| `src/concepts/*.tsx` | Satu berkas per konsep, ditemukan otomatis |
| `src/data/katalog.ts` | Metadata ringan tiap konsep |
| `src/data/kurikulum.ts` | Peta topik kelas 1–12 dan jalur konsep |

## Menambah konsep

Baca `docs/PANDUAN-KONSEP.md` lebih dulu. Acuan kualitas:
`src/concepts/segitiga-setengah.tsx`.

## Bahasa

Seluruh teks yang dilihat pengguna, nama variabel domain, dan komentar kode
ditulis dalam bahasa Indonesia.

## Perintah

```bash
npm run dev      # server pengembangan
npx tsc -b       # pemeriksaan tipe (wajib lulus)
npm run build    # bundel produksi
```
