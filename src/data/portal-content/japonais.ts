import type { PortalContent } from './types.js'

const H = 'あいうえお かきくけこ さしすせそ たちつてと なにぬねの はひふへほ まみむめも や ゆ よ らりるれろ わ を ん'
const HR = 'a i u e o ka ki ku ke ko sa shi su se so ta chi tsu te to na ni nu ne no ha hi fu he ho ma mi mu me mo ya yu yo ra ri ru re ro wa o n'
const K = 'アイウエオ カキクケコ サシスセソ タチツテト ナニヌネノ ハヒフヘホ マミムメモ ヤ ユ ヨ ラリルレロ ワ ヲ ン'
const chars = (s: string) => [...s.replace(/\s/g, '')]
const reads = HR.split(' ')

export const japonais: PortalContent = {
  writing: {
    title: 'Comprendre les kana かな',
    lead: 'Touche un kana pour l’entendre. Pour apprendre pas à pas, suis le Niveau 0 — Kana.',
    grids: [
      { title: 'Hiragana (ひらがな)', items: chars(H).map((c, i) => [c, reads[i], undefined, c]) },
      { title: 'Katakana (カタカナ)', items: chars(K).map((c, i) => [c, reads[i], undefined, c]) },
    ],
    sections: [
      {
        id: 'ecritures',
        title: '1. Trois écritures, un seul texte',
        body: 'Le japonais mélange **hiragana** (mots japonais et grammaire), **katakana** (mots étrangers, onomatopées) et **kanji** (sens). Un kana = une syllabe (ou « more »). On commence par les 46 hiragana de base : avec eux, tu peux déjà tout écrire.\n**Un kana :** か (ka). **Un mot :** かさ (kasa, parapluie). **Avec un kanji :** 傘.',
      },
      {
        id: 'voyelles',
        title: '2. Les cinq voyelles',
        body: 'Toutes les syllabes finissent par l’une de ces 5 voyelles (sauf ん). Elles se prononcent toujours pareil.',
        table: {
          head: ['Kana', 'Comment l’aborder', 'Romaji'],
          rows: [
            ['あ', 'a : bouche ouverte, comme en français.', 'a'],
            ['い', 'i : comme le i de « midi ».', 'i'],
            ['う', 'u : proche de « ou », lèvres peu arrondies.', 'u'],
            ['え', 'e : comme « é ».', 'e'],
            ['お', 'o : comme le o de « mot ».', 'o'],
          ],
        },
      },
      {
        id: 'sons',
        title: '3. Les lignes et les sons voisés',
        body: 'Chaque ligne = consonne + voyelle : か き く け こ. Attention aux lectures irrégulières : **し** (shi), **ち** (chi), **つ** (tsu), **ふ** (fu).\nDeux petits traits **゛** rendent la consonne sonore : か → が (ga). Un petit rond **゜** transforme h en p : は → ぱ (pa).',
        table: {
          head: ['Base', 'Avec ゛', 'Avec ゜'],
          rows: [
            ['か ka', 'が ga', '—'],
            ['さ sa', 'ざ za', '—'],
            ['た ta', 'だ da', '—'],
            ['は ha', 'ば ba', 'ぱ pa'],
          ],
        },
      },
      {
        id: 'petits',
        title: '4. Petits kana et voyelles longues',
        body: '**Petit ゃ ゅ ょ** : き + ゃ = きゃ (kya), une seule syllabe. **Petit っ** : il double la consonne suivante (きって, kitte, timbre). **Voyelle longue** : elle dure deux temps (おかあさん, okāsan). En katakana, on l’écrit avec **ー** : コーヒー.',
      },
      {
        id: 'mots',
        title: '5. Lire ses premiers mots, pas à pas',
        body: 'Lis syllabe par syllabe, puis d’un seul souffle.',
        words: [
          ['すし', 'す (su) + し (shi) : deux syllabes.', 'sushi'],
          ['ねこ', 'ね (ne) + こ (ko).', 'chat'],
          ['がっこう', 'が (ga) + petit っ + こう (kō, voyelle longue).', 'école'],
          ['コーヒー', 'コー (kō) + ヒー (hī) : katakana et traits d’allongement.', 'café'],
        ],
      },
    ],
    quizTitle: 'À toi : reconnaître les kana',
    quiz: [
      ['Comment se lit « か » ?', 'ka', 'ki', 'sa', 'ko'],
      ['Comment se lit « し » ?', 'shi', 'si', 'tsu', 'chi'],
      ['Comment se lit « つ » ?', 'tsu', 'tu', 'su', 'shi'],
      ['Comment se lit « ふ » ?', 'fu', 'hu', 'pu', 'bu'],
      ['Comment se lit « ね » ?', 'ne', 'nu', 'me', 're'],
      ['Comment se lit « ん » ?', 'n', 'so', 'shi', 'tsu'],
      ['Quel kana se lit « mi » ?', 'み', 'む', 'め', 'ま'],
      ['Quel kana se lit « ro » ?', 'ろ', 'る', 'れ', 'ら'],
      ['Comment se lit « が » ?', 'ga', 'ka', 'pa', 'ba'],
      ['Comment se lit « ぱ » ?', 'pa', 'ba', 'ha', 'wa'],
      ['Comment se lit « きゃ » ?', 'kya', 'kiya', 'ka', 'kyu'],
      ['Que fait le petit っ ?', 'Il double la consonne suivante', 'Il allonge la voyelle', 'Il rend la consonne sonore', 'Il se lit « tsu »'],
      ['Quel katakana se lit « shi » ?', 'シ', 'ツ', 'ソ', 'ン'],
      ['Quel katakana se lit « n » ?', 'ン', 'ソ', 'シ', 'ツ'],
      ['À quoi sert « ー » en katakana ?', 'À allonger la voyelle', 'À séparer les mots', 'À marquer une question', 'À doubler la consonne'],
      ['Que veut dire « ねこ » ?', 'chat', 'chien', 'poisson', 'oiseau'],
    ],
    next: [
      ['Voyelles et lignes K, S', 'ja-kana', 'ja-k1'],
      ['Sons voisés', 'ja-kana', 'ja-k3'],
      ['Les katakana', 'ja-kana', 'ja-k5'],
    ],
  },
  numbers: {
    title: 'Chiffres & nombres',
    lead: 'Deux façons de compter, expliquées pas à pas. Lis et écoute d’abord ; les exercices viennent ensuite.',
    why: {
      title: 'Pourquoi deux systèmes ?',
      paragraphs: [
        'Les nombres **sino-japonais** (いち, に, さん…) servent aux prix, aux dates, aux heures et à presque tous les calculs.',
        'Les nombres **japonais natifs** (ひとつ, ふたつ, みっつ…) servent à compter des objets sans compteur précis, jusqu’à 10.',
        'Beaucoup de choses se comptent aussi avec un **compteur** : 〜まい (objets plats), 〜ほん (objets longs), 〜にん (personnes), 〜さい (âge).',
      ],
    },
    table: {
      title: 'Écouter et apprendre de 0 à 10',
      head: ['Nombre', 'Sino-japonais', 'Natif'],
      rows: [
        ['0', 'ゼロ / れい', '—'],
        ['1', 'いち', 'ひとつ'],
        ['2', 'に', 'ふたつ'],
        ['3', 'さん', 'みっつ'],
        ['4', 'よん / し', 'よっつ'],
        ['5', 'ご', 'いつつ'],
        ['6', 'ろく', 'むっつ'],
        ['7', 'なな / しち', 'ななつ'],
        ['8', 'はち', 'やっつ'],
        ['9', 'きゅう / く', 'ここのつ'],
        ['10', 'じゅう', 'とお'],
      ],
      note: '4, 7 et 9 ont deux lectures : よん et なな sont les plus courantes ; し (qui évoque la mort) est évité.',
    },
    build: {
      title: 'Construire un nombre',
      paragraphs: [
        '**Dizaines :** じゅう = 10, にじゅう = 20, にじゅうさん = 23. **Centaines :** ひゃく = 100, さんびゃく = 300, ろっぴゃく = 600, はっぴゃく = 800.',
        '**Milliers :** せん = 1 000, さんぜん = 3 000, はっせん = 8 000. **Dix mille :** まん = 10 000 — on compte par tranches de 10 000, pas de 1 000 : 100 000 = じゅうまん.',
      ],
    },
    sentences: {
      title: 'Une phrase, morceau par morceau',
      items: [
        { text: 'コーヒーを ふたつ ください。', explain: 'コーヒー = café · を = objet · ふたつ = deux (natif) · ください = donnez-moi. → « Deux cafés, s’il vous plaît. »' },
        { text: 'ごご さんじ にじゅっぷんです。', explain: 'ごご = après-midi · さんじ = 3 heures · にじゅっぷん = 20 minutes · です = c’est. → « Il est 15 h 20. »' },
      ],
    },
    units: [
      {
        id: 'age',
        title: 'Dire et demander l’âge',
        body: 'Nombre + **さい** (歳) : にじゅうさい = 20 ans. Changements : 1 = **いっさい**, 8 = **はっさい**, 10 = **じゅっさい**. 20 ans a une forme spéciale : **はたち**.',
        examples: [
          { ko: 'わたしは じゅうろくさいです。', fr: 'わたしは = moi · じゅうろく = 16 · さい = ans · です. → J’ai 16 ans.' },
          { ko: 'なんさいですか。', fr: 'なん = quel · さい = âge · ですか ? → Quel âge as-tu ?' },
        ],
        qs: [
          ['16 ans ?', 'じゅうろくさい', 'じゅうろっさい', 'ろくじゅうさい', 'じゅうろくにん'],
          ['20 ans (forme spéciale) ?', 'はたち', 'はつか', 'ふたつさい', 'にさい'],
          ['8 ans ?', 'はっさい', 'ようか', 'やっつさい', 'はちにん'],
          ['1 an ?', 'いっさい', 'いちさい', 'ひとつさい', 'ひとり'],
          ['10 ans ?', 'じゅっさい', 'とおか', 'とおさい', 'じゅうにん'],
          ['Que demande « なんさいですか » ?', 'L’âge', 'Le prix', 'L’heure', 'Le nombre de personnes'],
        ],
      },
      {
        id: 'time',
        title: 'Lire l’heure',
        body: 'Heure : nombre + **じ** (よじ, しちじ, くじ). Minutes : **ふん / ぷん** selon le nombre : いっぷん, にふん, さんぷん, よんぷん, ごふん, ろっぷん, じゅっぷん. **はん** = et demie. **ごぜん** = matin, **ごご** = après-midi.',
        examples: [
          { ko: 'ごぜん くじ ごふんです。', fr: 'ごぜん = matin · くじ = 9 h · ごふん = 5 min. → Il est 9 h 05.' },
          { ko: 'さんじはんに あいましょう。', fr: 'さんじはん = 3 h 30 · に = à · あいましょう = retrouvons-nous. → Retrouvons-nous à 3 h 30.' },
        ],
        qs: [
          ['4 heures ?', 'よじ', 'しじ', 'よんじ', 'よっじ'],
          ['9 heures ?', 'くじ', 'きゅうじ', 'ここのじ', 'きゅじ'],
          ['10 minutes ?', 'じゅっぷん', 'じゅうふん', 'じゅっふん', 'とおふん'],
          ['3 h 30 ?', 'さんじはん', 'さんじ はんぷん', 'みっつじはん', 'はんさんじ'],
          ['« ごご » veut dire…', 'après-midi', 'matin', 'minuit', 'midi pile'],
          ['6 minutes ?', 'ろっぷん', 'ろくふん', 'むっぷん', 'ろくぷん'],
        ],
      },
      {
        id: 'money',
        title: 'Le yen et les prix',
        body: 'La monnaie japonaise est le **yen** : **えん** (円, ¥). Billets : 1 000, 5 000, 10 000 yens ; pièces : 1, 5, 10, 50, 100, 500. Attention aux sons qui changent : さんびゃく (300), ろっぴゃく (600), はっぴゃく (800), さんぜん (3 000), はっせん (8 000). 10 000 = **いちまん**.',
        examples: [
          { ko: 'これは いくらですか。— せんごひゃくえんです。', fr: 'いくら = combien. → C’est 1 500 yens.' },
          { ko: 'カードで はらえますか。', fr: 'カードで = par carte · はらえますか = peut-on payer ? → Je peux payer par carte ?' },
        ],
        qs: [
          ['300 yens ?', 'さんびゃくえん', 'さんひゃくえん', 'さんぴゃくえん', 'みっつひゃくえん'],
          ['10 000 yens ?', 'いちまんえん', 'じゅうせんえん', 'まんまんえん', 'ひゃくせんえん'],
          ['800 ?', 'はっぴゃく', 'はちひゃく', 'はちびゃく', 'やっぴゃく'],
          ['3 000 ?', 'さんぜん', 'さんせん', 'みっせん', 'さんまん'],
          ['Quelle question demande le prix ?', 'いくらですか', 'なんじですか', 'なんさいですか', 'どこですか'],
          ['Le symbole du yen est…', '¥', '₩', '€', '$'],
        ],
      },
      {
        id: 'dates',
        title: 'Dates et compteurs',
        body: 'Mois : nombre + **がつ** (しがつ = avril, しちがつ = juillet, くがつ = septembre). Jours 1 à 10 : **ついたち, ふつか, みっか, よっか, いつか, むいか, なのか, ようか, ここのか, とおか** ; 20 = **はつか**. Compteurs : **〜まい** (feuilles, billets), **〜ほん** (bouteilles, stylos : いっぽん, にほん, さんぼん), **〜にん** (personnes : ひとり, ふたり, さんにん).',
        examples: [
          { ko: 'しがつ ついたちです。', fr: 'しがつ = avril · ついたち = le 1er. → C’est le 1er avril.' },
          { ko: 'ビールを にほん ください。', fr: 'ビール = bière · にほん = deux (bouteilles) · ください. → Deux bières, s’il vous plaît.' },
        ],
        qs: [
          ['Le 1er du mois ?', 'ついたち', 'いちにち', 'いちか', 'ひとつか'],
          ['Le 20 ?', 'はつか', 'にじゅうにち', 'にじゅっか', 'ふたとおか'],
          ['Avril ?', 'しがつ', 'よんがつ', 'よがつ', 'しちがつ'],
          ['Deux personnes ?', 'ふたり', 'ににん', 'ふたつにん', 'にり'],
          ['Trois bouteilles ?', 'さんぼん', 'さんほん', 'みっつほん', 'さんぽん'],
          ['Le 3 du mois ?', 'みっか', 'さんにち', 'みつか', 'さんか'],
        ],
      },
    ],
    next: [
      ['Étape 1 · cours + exercices', 'Les nombres, l’heure et les prix', 'ja-n5', 'ja-n5-3'],
      ['Étape 2 · cours + exercices', 'La famille et compter les personnes', 'ja-n5', 'ja-n5-6'],
    ],
  },
  colors: {
    title: 'Les couleurs · いろ',
    lead: 'Observe les 16 couleurs, écoute leur nom, puis entraîne-toi avec le QCM.',
    colors: [
      ['赤', 'あか', 'rouge', '#e44654'],
      ['青', 'あお', 'bleu', '#316bea'],
      ['黄色', 'きいろ', 'jaune', '#f4d647'],
      ['緑', 'みどり', 'vert', '#42a96b'],
      ['オレンジ', 'orenji', 'orange', '#f08e40'],
      ['紫', 'むらさき', 'violet', '#9865cc'],
      ['ピンク', 'pinku', 'rose', '#ef9ec1'],
      ['茶色', 'ちゃいろ', 'marron', '#885539'],
      ['黒', 'くろ', 'noir', '#202328'],
      ['白', 'しろ', 'blanc', '#ffffff'],
      ['灰色', 'はいいろ', 'gris', '#92969c'],
      ['水色', 'みずいろ', 'bleu ciel', '#91cef1'],
      ['紺色', 'こんいろ', 'bleu marine', '#263565'],
      ['ベージュ', 'bēju', 'beige', '#dfceb0'],
      ['金色', 'きんいろ', 'doré', '#c4a244'],
      ['銀色', 'ぎんいろ', 'argenté', '#bfc5ce'],
    ],
    sentence: {
      title: 'Mettre une couleur dans une phrase',
      paragraphs: [
        { text: '**いろ** signifie « couleur ». Certaines couleurs ont une forme d’**adjectif en い** : あか → **あかい** くるま (une voiture rouge), あお → **あおい** そら (le ciel bleu), しろい, くろい, きいろい, ちゃいろい.' },
        { text: 'くるまは あかいです。', say: 'くるまは あかいです。' },
        { text: 'くるま (voiture) + は (thème) + あかい (rouge) + です → La voiture est rouge.' },
        { text: 'なにいろですか。', say: 'なにいろですか。' },
        { text: 'なに (quoi) + いろ (couleur) + ですか → C’est de quelle couleur ?' },
        { text: 'Les autres couleurs (みどり, むらさき, ピンク…) sont des noms : on dit **みどりの** かばん (un sac vert), avec の.' },
      ],
    },
  },
}
