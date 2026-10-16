import { Link, useSearchParams } from 'react-router-dom'
import { levelReadings, themeReadings } from '../data/koreanReadingCatalog'
import { KoreanReading } from '../components/KoreanReading'

export default function KoreanReadingPage() {
  const [params, setParams] = useSearchParams()
  const entries = [...levelReadings.map((reading, index) => ({ label: `${index === 0 ? 'Hangeul' : `Niveau ${index}`} — ${reading.title}`, reading })), ...Object.entries(themeReadings).map(([theme, reading]) => ({ label: `Vocabulaire — ${theme}`, reading }))]
  const selected = entries.find((entry) => entry.reading.id === params.get('texte')) ?? entries[0]
  return <div className="container page narrow"><Link className="link" to="/coreen">← Coréen</Link><header className="page-head"><p className="eyebrow">ATELIER DE CORÉEN</p><h1>Lire, comprendre et traduire</h1><p>Du premier mot aux textes argumentatifs. Commence sans les aides, réponds aux questions puis compare tes traductions. Les lectures propres à chaque leçon se trouvent aussi après ses exercices.</p><div className="row"><Link to="/coreen/tournures-de-phrases" className="btn ghost">Tournures de phrases</Link><Link to="/vocabulaire" className="btn ghost">Vocabulaire</Link></div></header><label>Choisir un texte<select className="input" value={selected.reading.id} onChange={(e) => setParams({ texte: e.target.value })}>{entries.map(({ label, reading }) => <option key={reading.id} value={reading.id}>{label}</option>)}</select></label><KoreanReading key={selected.reading.id} reading={selected.reading} /></div>
}
