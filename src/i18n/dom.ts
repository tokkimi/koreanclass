import { tr } from './translate'

/**
 * Site en anglais : traduit à l'affichage les textes français restants
 * (contenu des cours, pages coréennes…). Ne modifie ni les données ni les
 * réponses envoyées au serveur. Ignore les textes dans la langue étudiée
 * (attribut lang="ko", "ja-JP"…) et les zones marquées translate="no".
 */
const ATTRS = ['aria-label', 'title', 'placeholder', 'alt']
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'NOSCRIPT'])

function skipped(el: Element | null): boolean {
  for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
    if (SKIP_TAGS.has(e.tagName) || e.getAttribute('translate') === 'no') return true
    const lang = e.getAttribute('lang')
    if (lang && lang !== 'fr' && lang !== 'en') return true
  }
  return false
}

function textNode(n: Text) {
  const v = n.nodeValue
  if (!v || !/\p{L}/u.test(v) || skipped(n.parentElement)) return
  const t = tr(v)
  if (t !== v) n.nodeValue = t
}
function attrs(el: Element) {
  for (const a of ATTRS) {
    const v = el.getAttribute(a)
    if (v && /\p{L}/u.test(v)) {
      const t = tr(v)
      // Un champ de saisie garde son contenu, mais son placeholder se traduit
      if (t !== v && !skipped(el.tagName === 'TEXTAREA' ? el.parentElement : el)) el.setAttribute(a, t)
    }
  }
}
function deep(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) return textNode(root as Text)
  if (root.nodeType !== Node.ELEMENT_NODE) return
  const el = root as Element
  if (el.tagName === 'TEXTAREA') attrs(el)
  if (skipped(el)) return
  attrs(el)
  const w = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.nodeType === Node.ELEMENT_NODE && (n as Element).tagName === 'TEXTAREA' && attrs(n as Element), n.nodeType === Node.ELEMENT_NODE && (SKIP_TAGS.has((n as Element).tagName) || (n as Element).getAttribute('translate') === 'no' || ((n as Element).getAttribute('lang') ?? 'fr').match(/^(fr|en)$/) === null) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  })
  for (let n = w.nextNode(); n; n = w.nextNode()) {
    if (n.nodeType === Node.TEXT_NODE) {
      const v = n.nodeValue
      if (v && /\p{L}/u.test(v)) {
        const t = tr(v)
        if (t !== v) n.nodeValue = t
      }
    } else attrs(n as Element)
  }
}

export function startDomTranslation() {
  const title = () => {
    const t = tr(document.title)
    if (t !== document.title) document.title = t
  }
  deep(document.body)
  title()
  new MutationObserver((list) => {
    for (const m of list) {
      if (m.type === 'characterData') textNode(m.target as Text)
      else if (m.type === 'attributes') attrs(m.target as Element)
      else m.addedNodes.forEach(deep)
    }
  }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS })
  const head = document.querySelector('title')
  if (head) new MutationObserver(title).observe(head, { childList: true, characterData: true, subtree: true })
}
