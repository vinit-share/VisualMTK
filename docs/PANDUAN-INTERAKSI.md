# Panduan interaksi langsung Visual MTK

Kontrak untuk siapa pun yang membuat atau mengubah visual konsep. Baca bersama
`docs/PANDUAN-KONSEP.md`. Contoh acuan: `src/concepts/lingkaran-luas.tsx`
(`VisualBongkar` dan `VisualEksperimen`).

## Prinsip

> Anak memanipulasi objek matematika secara langsung, bukan mengisi formulir
> untuk memanipulasi objek.

Target pengalaman: **lihat → sentuh → gerakkan → paham**. Bukan: baca instruksi
→ cari kotak isian → ketik angka → lihat hasil.

Urutan prioritas saat ada tarik-menarik:

1. **Pemahaman** — anak mengerti apa yang sedang terjadi.
2. **Manipulasi langsung** — anak memegang objeknya sendiri.
3. **Visualisasi** — perubahannya terlihat jelas.
4. **Rumus** — terhubung dengan perubahan itu.
5. **Kontrol** — hanya membantu, tidak pernah mengambil alih layar.

## Yang sudah ditangani mesin

`Bongkar` dan `Eksperimen` membungkus setiap visual dengan `InteraksiProvider`.
Kamu tidak perlu menulis ulang hal-hal ini:

| Hal | Di mana |
|---|---|
| Nilai penggeser + perubahan halus (lingkaran benar-benar *tumbuh*, tidak melompat) | `useKendali` — visual menerima nilai yang sedang bergerak lewat `p` |
| Kontrol cadangan ringkas `− r = 5 +` yang angkanya bisa diketik | `BilahAngka`, otomatis dari `params` |
| Di HP hanya angka yang sedang/terakhir dipegang yang tampil | `BilahAngka` |
| Tombol layar penuh (⛶) di pojok panggung, Esc untuk keluar | `TombolFokus`, otomatis |
| Label `Tag` tidak pernah tampil lebih kecil dari 11 px di layar | `Tag` di `Stage.tsx` |
| Petunjuk "Coba geser aku" + denyut sampai anak berhasil menyeret | `Pegangan utama` |
| Seret tidak menggulir halaman, termasuk di Safari iOS | `Pegangan`, `useSeret` |
| Papan ketik: panah, PageUp/PageDown, Home/End; `role="slider"` | `Pegangan` |

## Perangkat yang kamu pakai di dalam visual

Semua dari `src/components/Interaksi.tsx` dan `src/components/Stage.tsx`.

### `Pegangan` — titik yang diseret

```tsx
<Pegangan
  x={cx + R} y={cy}                // posisi titik, koordinat SVG
  param="r"                        // kunci penggeser (atau ['puncak', 'tinggi'])
  keNilai={(pt) => Math.hypot(pt.x - cx, pt.y - cy) / SKALA}  // jari → nilai
  label={`r = ${fmt(r)}`}          // tampil di dekat jari saat dipegang
  arah="x"                         // 'x' | 'y' | 'bebas' | 'putar' (panah kecil)
  utama                            // satu per visual: diberi denyut + ajakan
/>
```

- `keNilai` menerima posisi jari dalam koordinat SVG dan mengembalikan nilai
  penggeser (atau objek `{ puncak: …, tinggi: … }` untuk dua penggeser).
  Pembulatan ke `step` dan penjepitan ke `min`/`max` dilakukan mesin.
- Posisi pegangan harus dihitung dari nilai yang **sama** dengan yang dipakai
  menggambar objeknya, supaya titiknya menempel pada objek saat diseret.
- Area sentuh otomatis ±52 px di layar walaupun titiknya tampak kecil.
- `sembunyi` untuk langkah bongkar yang objeknya belum muncul.

### `RelGeser` — rel pendek di dekat objek

Untuk nilai yang tidak punya tempat geometris (banyak potongan, persen, tahap
susunan):

```tsx
<RelGeser x1={150} x2={530} y={400} param="n" label={`${n} potongan`} kiri="4" kanan="64" />
```

Letakkan **di dekat objek yang dipengaruhinya**, bukan di tepi bawah gambar
kalau objeknya di atas. Label nilai selalu tampil di atas pegangannya.

### `TombolGambar` — tombol di dalam gambar

Untuk nilai yang lebih wajar diketuk: "lempar lagi", "tambah satu bola".

```tsx
<TombolGambar x={cx} y={400} param="benih" ubah={(v) => v + 1} label="Lempar lagi" />
```

### `useSeret` — interaksi khusus

Untuk interaksi yang bukan satu titik: menyeret bola keluar dari timbangan,
menggeser garis pembagi pecahan, mengambil kubus satuan.

```tsx
const seret = useSeret({
  gerak: (pt) => kendali.atur({ b: nilaiDari(pt) }),
})
<g {...seret} data-param="b">…</g>
```

`data-param` **wajib** diberi kunci penggeser yang diubah — alat uji memakainya
untuk memastikan setiap penggeser bisa dipegang dari gambar. Ambil kendali
lewat `useInteraksi()?.kendali`.

### Membaca keadaan

- `useInteraksi()?.kendali.aktif` — kunci penggeser yang sedang dipegang.
  Sembunyikan label statis yang sama selama itu, karena pegangan menampilkan
  labelnya sendiri di dekat jari.
- `useSempit()` — `true` bila panggung sempit (HP tegak, < 560 px).
- `useUkuranLayar()` — `u(13)` mengubah 13 px layar menjadi satuan SVG. Pakai
  untuk `<text>` mentah, tebal garis penting, dan jarak aman. Hook ini hanya
  tahu skalanya **di dalam** `<Svg>`. Di komponen yang menggambar `<Svg>` itu
  sendiri, pakai `useUkuranLayarUntuk(w)` dengan lebar sistem koordinatmu —
  kalau tidak, ukurannya diam-diam jatuh ke nilai cadangan dan huruf bisa
  tampil di bawah 11 px di HP.

### Objek ↕ angka ↕ rumus

Tiga hal itu harus terasa satu sistem:

- Beri `bagian` pada `ParamSpec` — id bagian rumus yang mewakili penggeser itu.
  Selama pegangannya diseret, bagian rumus itu menyala (dan `sorot` yang sama
  sampai ke visual), otomatis lewat `SorotDariPegangan`.
- Beri `eksperimen.rumus`: markup rumus yang berisi angka saat ini. Mesin
  menampilkannya tepat di bawah gambar dan angkanya ikut bergerak saat objeknya
  diseret:

  ```ts
  rumus: (p) => `[luas:L] = [pi:π] × [r2:${fmt(p.r)}^2] = ${fmt(Math.PI * p.r ** 2, 2)}`
  ```

  Pakai id bagian yang sama dengan `rumus.roles` konsepnya, supaya warnanya
  sama dengan objeknya.

## Pola interaksi menurut jenis besaran

Pilih yang paling alami untuk konsepnya. Jangan memaksa satu pola untuk semua.

| Besaran | Pola | Contoh |
|---|---|---|
| Panjang / ukuran (sisi, alas, tinggi, jari-jari) | `Pegangan` di ujung objek, arah sesuai sumbunya | ujung jari-jari, puncak garis tinggi, pojok persegi |
| Posisi titik | `Pegangan` bebas atau satu sumbu | puncak segitiga, titik pada grafik |
| Sudut | `Pegangan` di ujung lengan atau pada busur, `keNilai` memakai `Math.atan2`, `arah="putar"` | θ pada lingkaran satuan, sudut alas segitiga |
| Dua bagian satu garis | `Pegangan` di **batas** kedua bagian dan di ujungnya | batas `a` │ `b` pada sisi `(a + b)` |
| Banyak benda (bulat kecil) | `useSeret` untuk mengambil/menambah benda, atau `RelGeser` di dekat kelompoknya | kubus satuan, bola di timbangan |
| Pecahan | seret garis pembagi pada batang, atau `RelGeser` pembilang/penyebut tepat di sisi batangnya | 3/4 pada batang |
| Tahap/perubahan bentuk 0..1 | `RelGeser` dengan keterangan kedua ujung | lingkaran ↔ persegi panjang |
| Acak / percobaan | `TombolGambar` | lempar koin lagi |
| Nilai pada grafik fungsi | `Pegangan` yang meluncur pada kurva (`keNilai` hanya membaca `pt.x`) | titik singgung pada y = x² |

## Tata letak

1. **Dua tata letak.** Sistem koordinat lebar (mis. 680 × 460) untuk layar
   besar, dan tegak untuk HP bila `useSempit()`:
   `w` 400–440, `h` paling tinggi 1,3 × `w`. Di HP bentuknya justru digambar
   lebih besar, bukan tata letak lebar yang dikecilkan.
2. **Visual tidak boleh memakan seluruh layar HP.** Dengan rasio di atas, gambar
   setinggi ±430 px, sehingga narasi dan tombol putar masih terlihat.
3. **Tidak ada yang keluar dari viewBox** di kombinasi penggeser mana pun
   (minimum, maksimum, dan ekstrem campuran), di kedua tata letak.
4. **Angka menempel pada objeknya.** `────── 8 cm ──────`, bukan `Panjang: [8]`
   di bawah gambar.
5. **Tidak ada tabrakan** antara label, pegangan, dan rel — di kedua tata
   letak dan di nilai ekstrem. Dua pegangan paling sedikit `u(48)` terpisah.
6. **Label rel:** label nilai di atas pegangan, keterangan ujung di bawah rel,
   jadi dua rel perlu jarak vertikal ±80 satuan.

## Teks

- `ajakan` eksperimen menyebut **aksi pada objek**: "Seret titik ungu…",
  "Tarik batas antara a dan b…". Jangan menyebut "penggeser" atau "slider".
- Narasi bongkar yang menyuruh "geser penggeser" diganti dengan aksi pada
  objeknya.
- Beri `simbol` dan `peran` pada `params`, supaya kontrol angka memakai lambang
  dan warna yang sama dengan objek dan rumusnya:
  `{ key: 'r', label: 'Jari-jari', …, simbol: 'r', peran: 'b' }`.

## Daftar periksa per visual

Untuk setiap visual, jawab dengan jujur:

1. Apa saja yang bisa diubah?
2. Bisakah semuanya diubah langsung dari gambar?
3. Apakah kontrolnya jauh dari objek yang dikontrol?
4. Apakah kontrol mengurangi ukuran gambar?
5. Apakah gambar terlihat utuh, di HP juga?
6. Bagaimana interaksinya dengan jari di HP?
7. Apakah area sentuhnya cukup besar dan tidak saling berdempet?
8. Apakah perubahan terlihat seketika saat diseret?
9. Apakah anak paham hubungan angka dengan objeknya?
10. Adakah interaksi yang lebih alami? Kalau ada, pakai itu.

## Uji

`npm run periksa` merender setiap visual dalam tata letak lebar **dan** HP, lalu
gagal bila ada penggeser yang tidak punya `Pegangan`, `RelGeser`,
`TombolGambar`, atau elemen `useSeret` ber-`data-param` di salah satu tata
letak.

Yang tetap harus dicek manusia di peramban (lebar ±375 px dan desktop):
tabrakan label, titik yang tertutup, rasa menyeret, dan apakah gambarnya masih
menjadi tokoh utama halaman.
