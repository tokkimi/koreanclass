import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { siteLangAtStart } from './lib/i18n'
import { setDictionary } from './i18n/translate'
import './styles.css'

function render() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

// Site en anglais : on charge d'abord le dictionnaire, puis la traduction de l'affichage.
if (siteLangAtStart() === 'en')
  Promise.all([import('./i18n/en'), import('./i18n/dom')])
    .then(([d, dom]) => {
      setDictionary(d.default)
      dom.startDomTranslation()
    })
    .catch(() => undefined)
    .finally(render)
else render()
