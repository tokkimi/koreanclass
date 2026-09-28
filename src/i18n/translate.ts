/**
 * Traduction anglaise du contenu, appliquée à l'affichage seulement.
 * Les données (et donc la correction des exercices) restent en français :
 * seules les phrases montrées à l'écran passent par tr().
 * Dictionnaire : texte français exact → texte anglais (src/i18n/en/*.json).
 * Les consignes répétitives (« Que signifie « X » ? »…) passent par des modèles.
 */
export type Dict = Record<string, string>;

let dict: Dict = {};
export function setDictionary(d: Dict) {
  dict = d;
}
export const hasDictionary = () => Object.keys(dict).length > 0;

const LANG: Dict = {
  coréen: "Korean",
  japonais: "Japanese",
  espagnol: "Spanish",
  anglais: "English",
  français: "French",
  hiragana: "hiragana",
  katakana: "katakana",
  romaji: "romaji",
  lettres: "words",
};

/** [modèle français, modèle anglais] — (.+) devient {1}, {2}… ; chaque morceau est traduit à son tour s'il est en français. */
export const TEMPLATES: [RegExp, string][] = [
  [
    /^Dans le thème « (.+?) », que signifie (.+) \?$/,
    "In the “{1}” theme, what does {2} mean?",
  ],
  [
    /^Révision active : que signifie « (.+) » \?$/,
    "Active review: what does “{1}” mean?",
  ],
  [
    /^Rappel de vocabulaire : écris « (.+) » en (\S+)\.$/,
    "Vocabulary recall: write “{1}” in {L2}.",
  ],
  [/^Comment dit-on « (.+) » \?$/, "How do you say “{1}”?"],
  [/^Comment dit-on (\d[\d  ]*) \?$/, "How do you say {1}?"],
  [/^Quel est le sens de « (.+) » \?$/, "What is the meaning of “{1}”?"],
  [
    /^Dans cet atelier, à quoi sert « (.+) » \?$/,
    "In this workshop, what is “{1}” used for?",
  ],
  [/^Remets dans l’ordre : « (.+) »$/, "Put in order: “{1}”"],
  [/^Remets dans l’ordre : (.+)$/, "Put in order: {1}"],
  [
    /^Que signifie « (.+) » dans cette situation \?$/,
    "What does “{1}” mean in this situation?",
  ],
  [/^Que signifie « (.+) » \?$/, "What does “{1}” mean?"],
  [/^Que signifie (.+) \?$/, "What does {1} mean?"],
  [/^Que veut dire « (.+) » \?$/, "What does “{1}” mean?"],
  [/^Comment se lit « (.+) » \?$/, "How do you read “{1}”?"],
  [/^Comment se prononce « (.+) » \?$/, "How do you pronounce “{1}”?"],
  [
    /^Comment se dit la lettre « (.+) » \?$/,
    "How do you say the letter “{1}”?",
  ],
  [/^Quel kana se lit « (.+) » \?$/, "Which kana is read “{1}”?"],
  [/^Traduis : « (.+) »$/, "Translate: “{1}”"],
  [/^Traduis : (.+)$/, "Translate: {1}"],
  [
    /^Écris en hiragana la lecture de « (.+) »$/,
    "Write the reading of “{1}” in hiragana",
  ],
  [
    /^Écris en (coréen|japonais|espagnol|anglais|romaji|lettres|hiragana|katakana) : (.+)$/,
    "Write in {L1}: {2}",
  ],
  [/^« (.+) » veut dire…$/, "“{1}” means…"],
  [/^« (.+) » signifie :$/, "“{1}” means:"],
  [/^« (.+) » est…$/, "“{1}” is…"],
  [/^« (.+) » exprime…$/, "“{1}” expresses…"],
  [/^« (.+) » demande…$/, "“{1}” asks…"],
  [/^« (.+) » =$/, "“{1}” ="],
  [/^« (.+) » :$/, "“{1}”:"],
  [/^« (.+) »$/, "“{1}”"],
  [/^Pas « (.+) »\.$/, "Not “{1}”."],
  [/^Jamais « (.+) »\.$/, "Never “{1}”."],
  [/^comme « (.+) »$/, "like “{1}”"],
  [/^Forme (\S+) de « (.+) » \?$/, "{1} form of “{2}”?"],
  [/^Forme neutre de « (.+) » \?$/, "Plain form of “{1}”?"],
  [/^Pluriel de « (.+) » \?$/, "Plural of “{1}”?"],
  [/^Négatif de « (.+) » :$/, "Negative of “{1}”:"],
  [/^Prétérit de « (.+) » :$/, "Past simple of “{1}”:"],
  [/^Quel est le négatif de « (.+) » \?$/, "What is the negative of “{1}”?"],
  [
    /^Quel est le négatif poli de « (.+) » \?$/,
    "What is the polite negative of “{1}”?",
  ],
  [/^Kenjōgo de « (.+) » \?$/, "Kenjōgo of “{1}”?"],
  [/^Équivalent écrit de « (.+) » \?$/, "Written equivalent of “{1}”?"],
  [/^반말 de « (.+) » :$/, "반말 of “{1}”:"],
  [
    /^Subjonctif imparfait de « (.+) » \((.+)\) :$/,
    "Imperfect subjunctive of “{1}” ({2}):",
  ],
  [/^([\p{Script=Hangul}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー〜・0-9 ~.,?!…/()-]+?) : (.+?)\. ([\p{Script=Hangul}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー〜・0-9 ~.,?!…/()-]+?)\. — C’est : (.+)\.$/u, '{1}: {2}. {3}. — It’s: {4}.'],
  [/^([\p{Script=Hangul}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー〜・0-9 ~.,?!…/()-]+?) : ([^:]+)\.$/u, '{1}: {2}.'],
  [/^([\p{Script=Hangul}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー〜・0-9 ~.,?!…/()-]+?) : ([^:]+)$/u, '{1}: {2}'],
  [/^C’est : (.+)\.$/, 'It’s: {1}.'],
  [/^([\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han} ]+) signifie (.+)\.$/u, '{1} means {2}.'],
  [/^Il est (\d+) h (\d+)\.$/, "It is {1}:{2}."],
  [/^(\d+) ans \?$/, "{1} years old?"],
  [/^De (\d+) à (\d+)$/, "From {1} to {2}"],
  [/^([^«»:]{1,30}) : « (.+) » — (.+)$/, "{1}: “{2}” — {3}"],
  [/^([^«»:]{1,30}) : « (.+) »$/, "{1}: “{2}”"],
  [/^À retenir : (.+?)\. (.+)$/s, "Remember: {1}. {2}"],
];

const WS = /^(\s*)([\s\S]*?)(\s*)$/;
const norm = (s: string) => s.replace(/\s+/g, " ").trim();

function fill(tpl: string, m: RegExpMatchArray) {
  return tpl.replace(/\{(L?)(\d)\}/g, (_, l: string, i: string) => {
    const v = m[Number(i)] ?? "";
    return l ? (LANG[v] ?? v) : quotes(trCore(v));
  });
}
const quotes = (s: string) => s.replace(/«\s*/g, "“").replace(/\s*»/g, "”");

function trCore(s: string): string {
  const key = norm(s);
  if (!key) return s;
  const hit = dict[key];
  if (hit !== undefined) return hit;
  if (key.includes("\n") || /\n/.test(s))
    return s
      .split("\n")
      .map((l) => trLine(l))
      .join("\n");
  for (const [re, tpl] of TEMPLATES) {
    const m = key.match(re);
    if (m) return fill(tpl, m);
  }
  // Morceaux séparés par « — » ou « · » (ex. « 안녕 — bonjour »)
  for (const sep of [" — ", " · ", " → "]) {
    if (key.includes(sep)) {
      const parts = key.split(sep);
      const done = parts.map((p) => trCore(p));
      if (done.some((d, i) => d !== parts[i])) return done.join(sep);
    }
  }
  return s;
}
function trLine(l: string) {
  const m = l.match(/^(\s*(?:•|\d+\.)?\s*)(.*)$/)!;
  return m[1] + trCore(m[2]);
}

/** Traduit un texte si le dictionnaire anglais est chargé ; sinon le renvoie tel quel. */
export function tr(s: string): string {
  if (!s || !hasDictionary()) return s;
  const [, a, body, b] = s.match(WS)!;
  const out = trCore(body);
  return out === body ? s : a + out + b;
}

/** Pour l'extraction : morceaux à traduire d'un texte couvert par un modèle (sinon null). */
export function templateSlots(s: string): string[] | null {
  const key = norm(s);
  for (const [re, tpl] of TEMPLATES) {
    const m = key.match(re);
    if (m)
      return [...tpl.matchAll(/\{(L?)(\d)\}/g)]
        .filter((x) => !x[1])
        .map((x) => m[Number(x[2])]);
  }
  return null;
}
