import { recognition } from '../data/recognition'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { recordLesson, useCurrentUser } from '../lib/store'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { compose, FINALS, INITIALS, MEDIALS } from '../lib/hangul'
import { speak } from '../lib/speech'
import { SpeakButton } from '../components/Speak'

const CONSONANTS: [string, string, string][] = [
  ['ㄱ', 'g/k', '기역'], ['ㄴ', 'n', '니은'], ['ㄷ', 'd/t', '디귿'], ['ㄹ', 'r/l', '리을'], ['ㅁ', 'm', '미음'],
  ['ㅂ', 'b/p', '비읍'], ['ㅅ', 's', '시옷'], ['ㅇ', '–/ng', '이응'], ['ㅈ', 'j', '지읒'], ['ㅊ', 'ch', '치읓'],
  ['ㅋ', 'k', '키읔'], ['ㅌ', 't', '티읕'], ['ㅍ', 'p', '피읖'], ['ㅎ', 'h', '히읗'],
  ['ㄲ', 'kk', '쌍기역'], ['ㄸ', 'tt', '쌍디귿'], ['ㅃ', 'pp', '쌍비읍'], ['ㅆ', 'ss', '쌍시옷'], ['ㅉ', 'jj', '쌍지읒'],
]
const VOWELS: [string, string][] = [
  ['ㅏ', 'a'], ['ㅑ', 'ya'], ['ㅓ', 'eo'], ['ㅕ', 'yeo'], ['ㅗ', 'o'], ['ㅛ', 'yo'], ['ㅜ', 'u'], ['ㅠ', 'yu'], ['ㅡ', 'eu'], ['ㅣ', 'i'],
  ['ㅐ', 'ae'], ['ㅒ', 'yae'], ['ㅔ', 'e'], ['ㅖ', 'ye'], ['ㅘ', 'wa'], ['ㅙ', 'wae'], ['ㅚ', 'oe'], ['ㅝ', 'wo'], ['ㅞ', 'we'], ['ㅟ', 'wi'], ['ㅢ', 'ui'],
]

export default function Alphabet() {
  const user = useCurrentUser()
  const [ini, setIni] = useState('ㅎ')
  const [med, setMed] = useState('ㅏ')
  const [fin, setFin] = useState('ㄴ')
  const syllable = compose(ini, med, fin)

  return (
    <div className="container page">
      <div className="page-head">
        <h1>Comprendre le hangeul <span className="ko-text">한글</span></h1>
        <p className="muted">
          Cliquez sur une lettre pour l'entendre (avec la voyelle ㅏ pour les consonnes). Pour apprendre pas à pas, suivez le{' '}
          <Link to="/cours/hangeul" className="link">Niveau 0 — Hangeul</Link>.
        </p>
      </div>

      <section className="card">
        <h2>Les lettres, en un coup d’œil</h2>
        <p className="muted">Commence ici : touche une carte pour entendre le son, puis passe à la leçon guidée juste après.</p>
        <h3>Consonnes (자음)</h3>
        <div className="jamo-grid">
          {CONSONANTS.map(([c, r, name]) => (
            <button key={c} className="jamo" onClick={() => speak(compose(c, 'ㅏ'))}>
              <span className="ko-text jamo-char">{c}</span>
              <span className="small">{r}</span>
              <span className="muted small ko-text">{name}</span>
            </button>
          ))}
        </div>
        <h3 className="mt">Voyelles (모음)</h3>
        <div className="jamo-grid">
          {VOWELS.map(([v, r]) => (
            <button key={v} className="jamo" onClick={() => speak(compose('ㅇ', v))}>
              <span className="ko-text jamo-char">{v}</span>
              <span className="small">{r}</span>
              <span className="muted small ko-text">{compose('ㅇ', v)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card"><h2>Commencer de zéro : lire le cours</h2><p>Tu n’as besoin de connaître aucune lettre. Lis les explications dans l’ordre, écoute les exemples et essaie de les recopier. Aucun quiz ni compte n’est nécessaire pour cette partie.</p><nav className="row" style={{flexWrap:'wrap'}} aria-label="Sommaire du cours de hangeul"><a className="btn" href="#quiz-lettres">QCM lettres & syllabes</a><a className="btn ghost" href="#lettres">1. Lettres et syllabes</a><a className="btn ghost" href="#voyelles-base">2. Voyelles</a><a className="btn ghost" href="#consonnes-base">3. Consonnes</a><a className="btn ghost" href="#assembler">4. Assembler</a><a className="btn ghost" href="#premiers-mots">5. Lire ses premiers mots</a></nav></section>
      <section className="card mt" id="lettres"><h2>1. Le hangeul, c’est quoi ?</h2><p>Le <strong>hangeul (한글)</strong> est l’alphabet utilisé pour écrire le coréen. Ses lettres représentent des sons. Elles sont regroupées en petits blocs : chaque bloc correspond à une syllabe.</p><p><strong>Une lettre :</strong> ㄴ. <strong>Une syllabe :</strong> 나, formée de ㄴ + ㅏ. <strong>Un mot :</strong> 나무, formé de deux syllabes 나 + 무, signifie « arbre ».</p><p>Une consonne est un son pour lequel la bouche freine ou bloque l’air, comme n ou m. Une voyelle est un son que l’on peut faire résonner sans ce blocage, comme a ou i. Une syllabe contient une voyelle, avec éventuellement des consonnes autour.</p><p>On apprend d’abord <strong>14 consonnes de base et 10 voyelles de base</strong>. Avec les consonnes doubles et les autres voyelles, les tableaux de cette page présentent 19 consonnes initiales et 21 voyelles.</p><p>Les lettres ne sont pas des mots à traduire : ㄴ ne veut pas dire « arbre ». C’est leur assemblage dans 나무 qui forme ce mot.</p></section>
      <section className="card mt" id="voyelles-base"><h2>2. Les voyelles : le cœur du son</h2><p>Commence par ces six voyelles. Les repères français et la romanisation sont approximatifs : écoute surtout les exemples.</p><div className="table-wrap"><table><thead><tr><th>Lettre</th><th>Comment l’aborder</th><th>Écouter</th></tr></thead><tbody>{[
       ['ㅏ','a : ouvre la bouche, sans arrondir les lèvres.','아'],['ㅓ','eo : une seule voyelle, plus ouverte que ㅗ ; ne lis pas « é-o ».','어'],['ㅗ','o : arrondis les lèvres.','오'],['ㅜ','u dans la romanisation : proche du « ou » français, pas du « u » de lune.','우'],['ㅡ','eu : une seule voyelle, langue en arrière et lèvres non arrondies ; ce n’est pas le « eu » français.','으'],['ㅣ','i : proche du i français.','이']
      ].map(([letter,help,sound])=><tr key={letter}><td lang="ko">{letter}</td><td>{help}</td><td><SpeakButton text={sound}/></td></tr>)}</tbody></table></div><p>Un deuxième petit trait ajoute un son initial proche de « y » : ㅏ → ㅑ (ya), ㅓ → ㅕ (yeo), ㅗ → ㅛ (yo), ㅜ → ㅠ (yu).</p><p><strong>Pourquoi écrit-on 아 et pas seulement ㅏ ?</strong> Un bloc syllabique commence par une place de consonne. Quand le son commence directement par une voyelle, on met ㅇ à cette place : au début du bloc, il est muet. Ainsi, 아 se lit a.</p><p>À essayer sans quiz : écoute 아 puis 우. Recopie chaque bloc cinq fois en prononçant le son, puis compare 어 et 오.</p></section>
      <section className="card mt" id="consonnes-base"><h2>3. Les consonnes : commencer et fermer un son</h2><p>Commence par <strong>ㄴ (n), ㅁ (m), ㅅ (s), ㅎ (h)</strong>. Avec ㅏ, elles deviennent 나, 마, 사, 하. La lettre ㄴ s’appelle 니은, mais dans 나, elle représente le son n : le nom de la lettre et son son sont deux choses différentes.</p><p lang="ko">나 <SpeakButton text="나"/> · 마 <SpeakButton text="마"/> · 사 <SpeakButton text="사"/> · 하 <SpeakButton text="하"/></p><p>ㄱ, ㄷ et ㅂ ne correspondent pas exactement à une seule lettre française : selon leur position et leur environnement, elles peuvent rappeler g/k, d/t et b/p. ㄹ peut rappeler un battement bref de langue entre des voyelles, et un l en finale.</p><p>Les familles <strong>ㄱ / ㅋ / ㄲ</strong>, <strong>ㄷ / ㅌ / ㄸ</strong> et <strong>ㅂ / ㅍ / ㅃ</strong> opposent des consonnes simples, aspirées et tendues. Les aspirées laissent passer davantage d’air ; les tendues demandent une articulation resserrée. Ce n’est pas simplement parler plus fort.</p><p><strong>ㅇ a deux rôles :</strong> muet au début de 아, mais un son « ng » à la fin de 강. Il faut donc regarder sa place dans le bloc.</p><p>À essayer : lis 나 → 누 → 니. La consonne reste la même ; seule la voyelle change.</p></section>
      <section className="card mt" id="assembler"><h2>4. Comment assembler les lettres ?</h2><div className="table-wrap"><table><thead><tr><th>Assemblage</th><th>Résultat</th><th>Ce qui se passe</th></tr></thead><tbody><tr><td>ㄴ + ㅏ</td><td lang="ko">나 <SpeakButton text="나"/></td><td>La voyelle verticale se place à droite.</td></tr><tr><td>ㅁ + ㅜ</td><td lang="ko">무 <SpeakButton text="무"/></td><td>La voyelle horizontale se place sous la consonne.</td></tr><tr><td>ㅎ + ㅏ + ㄴ</td><td lang="ko">한 <SpeakButton text="한"/></td><td>La consonne finale se place tout en bas.</td></tr><tr><td>ㄱ + ㅜ + ㄱ</td><td lang="ko">국 <SpeakButton text="국"/></td><td>La finale ferme le bloc : on n’ajoute pas de voyelle après elle.</td></tr></tbody></table></div><p>La consonne du bas s’appelle le <strong>받침 (batchim)</strong>. Dans 한, c’est ㄴ. Dans 나, il n’y en a pas. Une syllabe peut aussi comporter deux consonnes écrites en finale ; leur prononciation se travaille ensuite selon le mot et le son suivant.</p><p>Pour écrire, organise les traits du haut vers le bas et de la gauche vers la droite dans le bloc. Garde chaque syllabe dans un carré imaginaire. Recopie 한, puis 국, puis 한국 : ce dernier mot contient deux syllabes.</p></section>
      <section className="card mt" id="premiers-mots"><h2>5. Lire ses premiers mots, pas à pas</h2>{[
       ['나무','나 = ㄴ + ㅏ ; 무 = ㅁ + ㅜ. Deux blocs : na-mu.','arbre'],['우유','우 = ㅇ + ㅜ ; 유 = ㅇ + ㅠ. Les deux ㅇ initiaux sont muets.','lait'],['아이','아 = ㅇ + ㅏ ; 이 = ㅇ + ㅣ. Deux voyelles, deux blocs.','enfant'],['한국','한 = ㅎ + ㅏ + ㄴ ; 국 = ㄱ + ㅜ + ㄱ. Deux blocs avec finales.','Corée']
      ].map(([word,parts,meaning])=><div className="mt" key={word}><h3><span lang="ko">{word}</span> <SpeakButton text={word}/> — {meaning}</h3><p>{parts}</p></div>)}<h3>Une première phrase : 우유예요.</h3><p><strong>우유</strong> = lait ; <strong>예요</strong> = « c’est », après un nom terminé par une voyelle. L’ensemble signifie « C’est du lait ». On écrit les blocs ensemble : 우·유·예·요, puis on lit la phrase d’un seul mouvement.</p><SpeakButton text="우유예요."/><p>Entraînement libre : cache les explications, lis les quatre mots, puis retrouve chaque consonne et chaque voyelle. Si tu hésites, retourne au tableau : aucun score n’est nécessaire pour apprendre.</p></section>
      <section className="mt" id="quiz-lettres"><h2>À toi : reconnaître les lettres et les syllabes</h2><p>16 questions avec une correction expliquée après chaque réponse. {user ? 'Ton résultat sera enregistré dans ton parcours.' : 'Connecte-toi pour enregistrer ton résultat sur tous tes appareils.'}</p><ExerciseRunner key={user?.id ?? 'guest'} exercises={recognition.exercises} passMark={70} onFinish={async (score,total,_results,answers,operationId)=>{if(user) await recordLesson(recognition.id,recognition.title,score,total,answers,operationId)}} /></section>
      <section className="card mt"><h2>Continuer le cours guidé</h2><p>Ces ateliers développent les règles avec d’autres exemples. Le cours se lit avant les exercices, qui restent en bas de chaque leçon.</p><div className="row" style={{flexWrap:'wrap'}}><Link className="btn" to="/cours/hangeul/s-blocks">Lettres et blocs</Link><Link className="btn ghost" to="/cours/hangeul/s-sounds">Sons et finales</Link><Link className="btn ghost" to="/cours/hangeul/s-linking">Liaisons</Link></div></section>
      <section className="card mt builder">
        <h2>🧩 Construire une syllabe</h2>
        <p className="muted">Choisissez une consonne initiale, une voyelle et (facultatif) une consonne finale.</p>
        <div className="builder-grid">
          <label>
            Initiale
            <select className="input ko-text" value={ini} onChange={(e) => setIni(e.target.value)}>
              {INITIALS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Voyelle
            <select className="input ko-text" value={med} onChange={(e) => setMed(e.target.value)}>
              {MEDIALS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Finale (batchim)
            <select className="input ko-text" value={fin} onChange={(e) => setFin(e.target.value)}>
              {FINALS.map((x) => (
                <option key={x} value={x}>
                  {x || '(aucune)'}
                </option>
              ))}
            </select>
          </label>
          <div className="builder-result">
            <span className="ko-text">{syllable}</span>
            <SpeakButton text={syllable} label="Écouter" />
          </div>
        </div>
      </section>
    </div>
  )
}
