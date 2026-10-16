import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { languages, localized, type LanguageId } from '../data/languages'
import { SpeakButton } from './Speak'

type T = (fr: string, en: string) => string
const examples: Record<LanguageId, { phrase: string; word: string; read?: string }> = {
  coreen: { phrase: '커피 한 잔 주세요.', word: '커피', read: 'keopi han jan juseyo' },
  japonais: { phrase: 'コーヒーを一杯ください。', word: 'コーヒー', read: 'kōhī o ippai kudasai' },
  espagnol: { phrase: 'Un café, por favor.', word: 'café' },
  anglais: { phrase: 'A coffee, please.', word: 'coffee' },
  francais: { phrase: 'Un café, s’il vous plaît.', word: 'café' },
}

export function HomeMethod({ t, en }: { t: T; en: boolean }) {
  const [language, setLanguage] = useState<LanguageId>('coreen')
  const [active, setActive] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const [flipped, setFlipped] = useState(false)
  const articles = useRef<Array<HTMLElement | null>>([])
  const reducedMotion = useReducedMotion()
  const selected = languages.find((l) => l.id === language)!
  const example = examples[language]
  const coursePath = language === 'coreen' ? '/cours' : `${selected.path}/cours`
  const steps = [
    [t('Apprendre', 'Learn'), t('Comprends la phrase, pas seulement les mots.', 'Understand the sentence, not just the words.'), t('Des explications, des exemples et les erreurs à éviter. Tu vois comment une phrase se construit avant de la mémoriser.', 'Explanations, examples and common mistakes. See how a sentence is built before memorising it.')],
    [t('Écouter', 'Listen'), t('Passe de la phrase écrite à la phrase entendue.', 'Go from reading a sentence to hearing it.'), t('Écoute, ralentis et retrouve le texte quand tu en as besoin. La prononciation accompagne les phrases et les dialogues.', 'Listen, slow down and reveal the text when you need it. Pronunciation accompanies sentences and dialogues.')],
    [t('Pratiquer', 'Practise'), t('Essaie. Comprends. Recommence.', 'Try. Understand. Try again.'), t('Complète, remets les mots dans l’ordre et choisis une réponse. Les corrections expliquées t’aident à comprendre tes erreurs.', 'Fill gaps, reorder words and choose an answer. Explained corrections help you understand your mistakes.')],
    [t('Parler', 'Speak'), t('Ta langue s’apprend aussi à voix haute.', 'Learn your language out loud, too.'), t('Répète une phrase, prends un rôle dans un dialogue, puis formule ta propre réponse. Tu passes de reconnaître à utiliser.', 'Repeat a sentence, take a role in a dialogue, then form your own answer. Move from recognising to using.')],
    [t('Réviser', 'Review'), t('Ce que tu apprends doit rester.', 'Make what you learn stay with you.'), t('Flashcards, révisions espacées et carnet d’erreurs : retrouve ce qui te demande encore un effort, au bon moment.', 'Flashcards, spaced reviews and a mistake notebook: revisit what still takes effort, at the right time.')],
  ]

  useEffect(() => {
    const media = window.matchMedia('(min-width: 901px)')
    const observer = new IntersectionObserver((entries) => {
      if (!media.matches) return
      const visible = entries.find((entry) => entry.isIntersecting)
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.step))
    }, { rootMargin: '-30% 0px -40% 0px', threshold: 0 })
    articles.current.forEach((article) => { if (article) observer.observe(article) })
    return () => observer.disconnect()
  }, [])

  function chooseStep(index: number) {
    setActive(index)
    if (window.matchMedia('(min-width: 901px)').matches) {
      articles.current[index]?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'center' })
    }
  }

  return (
    <section className="container hm" aria-labelledby="hm-title">
      <div className="hm-heading">
        <p className="hc-eyebrow">{t('UNE LEÇON, CINQ FAÇONS D’AVANCER', 'ONE LESSON, FIVE WAYS TO PROGRESS')}</p>
        <h2 id="hm-title">{t('Du premier mot à ta propre réponse.', 'From your first word to your own answer.')}</h2>
        <p className="hc-lead">{t('Fais défiler pour découvrir la méthode. Essaie la même phrase dans chacune des cinq langues.', 'Scroll to discover the method. Try the same sentence in each of the five languages.')}</p>
      </div>
      <div className="hm-story">
        <div className="hm-stage">
          <div className="hm-language" aria-label={t('Langue de la démonstration', 'Demo language')}>
            {languages.map((lang) => <button key={lang.id} type="button" aria-pressed={language === lang.id} onClick={() => { setLanguage(lang.id); setAnswer(null); setFlipped(false) }}>{localized(lang, en).name}</button>)}
          </div>
          <div className="hm-window">
            <div className="hm-topline"><span>TalkToMe Club</span><span>{t('Aperçu de la méthode', 'Method preview')}</span></div>
            <div className="hm-window-header"><span>{t('AU CAFÉ', 'AT THE CAFÉ')} · {localized(selected, en).name}</span><h3>{steps[active][0]}</h3></div>
            <div className="hm-screen">
              <AnimatePresence mode="wait">
                <motion.div key={active} className="hm-preview" initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .22 }}>
                  {active === 0 && <><p className="hm-small">{t('UNE PHRASE POUR COMMANDER', 'A SENTENCE FOR ORDERING')}</p><p className="hm-phrase" lang={selected.speech}>{example.phrase}</p><p>{t('Un café, s’il vous plaît.', 'A coffee, please.')}</p><div className="hm-notion"><strong>{example.word}</strong><span>{t('Le mot pour « café »', 'The word for “coffee”')}</span></div></>}
                  {active === 1 && <><div className="hm-wave" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ height: `${18 + (i * 29 % 62)}px` }} />)}</div><p className="hm-phrase" lang={selected.speech}>{example.phrase}</p><SpeakButton text={example.phrase} lang={selected.speech} label={t('Écouter la phrase', 'Listen to the sentence')} />{example.read && <p className="hm-read">{example.read}</p>}</>}
                  {active === 2 && <><p className="hm-phrase" lang={selected.speech}>{example.word}</p><p>{t('Que signifie ce mot ?', 'What does this word mean?')}</p><div className="hm-answers">{[t('Café', 'Coffee'), t('Thé', 'Tea'), t('Eau', 'Water')].map((option, index) => <button type="button" key={index} className={answer === index ? (index === 0 ? 'is-correct' : 'is-wrong') : ''} onClick={() => setAnswer(index)}>{option}<span>{answer === index ? (index === 0 ? '✓' : '×') : '→'}</span></button>)}</div>{answer !== null && <p role="status" className="hm-feedback">{answer === 0 ? t('Exact. Tu sais maintenant le reconnaître.', 'Correct. You can now recognise it.') : t(`Réessaie : « ${example.word} » signifie « café ».`, `Try again: “${example.word}” means “coffee”.`)}</p>}</>}
                  {active === 3 && <><p className="hm-small">{t('À TOI DE PRENDRE LA PAROLE', 'YOUR TURN TO SPEAK')}</p><div className="hm-conversation"><span>{t('Le serveur', 'The waiter')}</span><p>{t('Bonjour, que souhaitez-vous ?', 'Hello, what would you like?')}</p></div><div className="hm-conversation hm-conversation--you"><span>{t('Toi', 'You')}</span><p lang={selected.speech}>{example.phrase}</p></div><p className="hm-read">{t('Prononce ta réponse à voix haute. Dans les cours, entraîne-toi phrase par phrase.', 'Say your answer out loud. In the lessons, practise sentence by sentence.')}</p></>}
                  {active === 4 && <><p className="hm-small">{t('UNE CARTE POUR RETENIR', 'A CARD TO REMEMBER')}</p><button type="button" className={`hm-flashcard ${flipped ? 'is-flipped' : ''}`} aria-pressed={flipped} onClick={() => setFlipped(!flipped)}><strong lang={flipped ? (en ? 'en' : 'fr') : selected.speech}>{flipped ? t('café', 'coffee') : example.word}</strong><span>{t('Clique pour retourner', 'Click to flip')} ↻</span></button><p className="hm-read">{t('Les révisions du cursus se concentrent sur ce qui te reste à mémoriser.', 'Course reviews focus on what you still need to memorise.')}</p></>}
                </motion.div>
              </AnimatePresence>
            </div>
            <nav className="hm-step-nav" aria-label={t('Étapes de la méthode', 'Method steps')}>{steps.map((step, index) => <button key={index} type="button" aria-current={active === index ? 'step' : undefined} onClick={() => chooseStep(index)}><span>{String(index + 1).padStart(2, '0')}</span><small>{step[0]}</small></button>)}</nav>
          </div>
          <Link className="hm-cta" to={coursePath}>{t('Découvrir le cursus', 'Explore the course')} · {localized(selected, en).name} <span>→</span></Link>
        </div>
        <div className="hm-copy">{steps.map((step, index) => <article key={index} ref={(node) => { articles.current[index] = node }} data-step={index} className={active === index ? 'is-active' : ''}><span className="hm-number">{String(index + 1).padStart(2, '0')} / {step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></article>)}</div>
      </div>
    </section>
  )
}
