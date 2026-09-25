import { numberLessons } from '../data/numberPractice'
import { SavedQuiz } from '../components/SavedQuiz'
import { Link } from 'react-router-dom'
import { SpeakButton } from '../components/Speak'

const digits = [['0', '영 / 공', '—'], ['1', '일', '하나'], ['2', '이', '둘'], ['3', '삼', '셋'], ['4', '사', '넷'], ['5', '오', '다섯'], ['6', '육', '여섯'], ['7', '칠', '일곱'], ['8', '팔', '여덟'], ['9', '구', '아홉'], ['10', '십', '열']]

export default function Numbers() {
  return <div className="container page">
    <div className="page-head"><h1>Chiffres & nombres</h1><p className="muted">Deux façons de compter, expliquées pas à pas. Lis et écoute d’abord ; les exercices viennent ensuite.</p></div>
    <section className="card"><h2>Pourquoi deux systèmes ?</h2><p>Les nombres <strong>sino-coréens</strong> (일, 이, 삼…) servent notamment aux prix, aux dates et aux minutes. Les nombres <strong>natifs</strong> (하나, 둘, 셋…) servent notamment à compter des objets, à donner son âge avec 살 et à dire les heures.</p><p>Un chiffre est un signe de 0 à 9. Un nombre peut contenir plusieurs chiffres : 25 se lit 이십오 dans le système sino-coréen et 스물다섯 dans le système natif.</p></section>
    <section className="card"><h2>Écouter et apprendre de 0 à 10</h2><div style={{overflowX:'auto'}}><table><thead><tr><th>Nombre</th><th>Sino-coréen</th><th>Natif</th></tr></thead><tbody>{digits.map(([n,s,k]) => <tr key={n}><td>{n}</td><td><span lang="ko">{s}</span> <SpeakButton text={s.replace(' / ', ', ')} /></td><td><span lang="ko">{k}</span>{n !== '0' && <SpeakButton text={k} />}</td></tr>)}</tbody></table></div><p>Pour zéro, retiens 영 dans les nombres et 공 dans les numéros de téléphone. Il n’y a pas de zéro dans la série native présentée ici.</p></section>
    <section className="card"><h2>Construire un nombre</h2><p><strong>Sino-coréen :</strong> 십 = 10. 이십 = 2 × 10 = 20. 이십삼 = 20 + 3 = 23. 백 = 100, 천 = 1 000 et 만 = 10 000.</p><p><strong>Natif :</strong> 열 = 10, 스물 = 20, 서른 = 30. 열셋 = 10 + 3 = 13 ; 스물셋 = 20 + 3 = 23.</p><p>Devant un compteur, 하나 → 한, 둘 → 두, 셋 → 세, 넷 → 네 et 스물 → 스무. Ainsi : 한 개 (un objet), 세 명 (trois personnes), 스무 살 (20 ans). À 21 ans : 스물한 살.</p></section>
    <section className="card"><h2>Une phrase, morceau par morceau</h2><h3 lang="ko">커피 두 잔 주세요. <SpeakButton text="커피 두 잔 주세요." /></h3><p><strong>커피</strong> = café · <strong>두</strong> = deux · <strong>잔</strong> = compteur de tasses · <strong>주세요</strong> = donnez-moi, s’il vous plaît. → « Deux cafés, s’il vous plaît. »</p><h3 lang="ko">오후 세 시 이십 분이에요. <SpeakButton text="오후 세 시 이십 분이에요." /></h3><p><strong>오후</strong> = après-midi · <strong>세 시</strong> = trois heures (natif) · <strong>이십 분</strong> = vingt minutes (sino-coréen) · <strong>이에요</strong> = c’est. → « Il est 15 h 20. » Une seule phrase utilise les deux systèmes !</p></section>
    <nav className="row" style={{flexWrap:'wrap'}} aria-label="Les nombres au quotidien">{numberLessons.map(l=><a key={l.id} className="btn ghost" href={'#'+l.id}>{l.title}</a>)}</nav>
    {numberLessons.map(l=><section className="card mt" id={l.id} key={l.id}><h2>{l.title}</h2>{l.sections.map(s=><div key={s.title}><p>{s.body}</p>{s.examples?.map(e=><div key={e.ko}><h3 lang="ko">{e.ko} <SpeakButton text={e.ko}/></h3><p>{e.fr}</p></div>)}</div>)}<h3>À toi : 6 questions corrigées</h3><SavedQuiz lesson={l}/></section>)}
    <p className="small muted">Repères sur les billets : <a className="link" href="https://www.bok.or.kr/eng/main/contents.do?menuNo=400112" target="_blank" rel="noreferrer">Banque de Corée</a>.</p><div className="level-grid">
      <Link className="card" to="/cours/debutant/d4"><span className="pill">Étape 1 · cours + exercices</span><h2>Prix, dates et téléphone</h2><p>Les nombres sino-coréens, les grands nombres, les mois et leurs exceptions. Exemples audio, QCM, réponses écrites et associations.</p><span className="link">Apprendre 일, 이, 삼 →</span></Link>
      <Link className="card" to="/cours/debutant/d5"><span className="pill">Étape 2 · cours + exercices</span><h2>Compter, donner son âge et l’heure</h2><p>Les nombres natifs jusqu’à 99, les compteurs et les formes courtes : 한, 두, 세, 네, 스무. Puis entraîne-toi avec les exercices corrigés.</p><span className="link">Apprendre 하나, 둘, 셋 →</span></Link>
    </div>
  </div>
}
