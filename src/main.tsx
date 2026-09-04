import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/newsreader'
import './styles/tokens.css'
import './styles/base.css'
import './styles/ui.css'
import './styles/parts.css'
import './styles/halaman.css'

import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HashRouter dipilih supaya aplikasi statis ini bisa di-hosting
        di mana saja (termasuk GitHub Pages) tanpa konfigurasi server. */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
