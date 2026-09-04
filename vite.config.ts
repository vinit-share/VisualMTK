import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Jalur relatif supaya hasil build bisa ditaruh di subfolder mana pun
  // (GitHub Pages, folder di server, atau dibuka langsung dari berkas).
  base: './',
  plugins: [react()],
  build: {
    // Data kurikulum cukup besar; batas peringatan dinaikkan agar log build
    // tidak berisik untuk potongan yang memang sudah dimuat secara terpisah.
    chunkSizeWarningLimit: 700,
  },
})
