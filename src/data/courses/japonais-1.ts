import type { Level } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

export const jaKana: Level = {
  id: 'ja-kana',
  index: 0,
  name: 'Niveau 0 — Kana',
  korean: 'かな',
  cefr: 'Pré-A1',
  topik: 'Avant le JLPT N5',
  color: '#d6336c',
  description:
    'Lire et écrire les deux syllabaires japonais : les hiragana (mots japonais, terminaisons) et les katakana (mots étrangers). À la fin, tu lis n’importe quel mot écrit en kana.',
  lessons: [
    {
      id: 'ja-k1',
      title: 'Les voyelles et les lignes K et S',
      subtitle: 'あ い う え お · か き く け こ · さ し す せ そ',
      duration: 25,
      objectives: ['Comprendre les trois écritures du japonais', 'Lire les 5 voyelles', 'Lire les lignes K et S'],
      sections: [
        {
          title: 'Trois écritures qui cohabitent',
          body:
            "Une phrase japonaise mélange **trois systèmes** :\n• les **hiragana** (ひらがな) : syllabes arrondies pour les mots japonais et la grammaire ;\n• les **katakana** (カタカナ) : syllabes anguleuses pour les mots étrangers (コーヒー, café) ;\n• les **kanji** (漢字) : caractères d’origine chinoise qui portent le sens.\nOn commence toujours par les hiragana : 46 signes de base, chacun = une syllabe.",
          examples: ex(`
            わたしは がくせいです。| watashi wa gakusei desu | Je suis étudiant(e). (tout en hiragana)
            私は学生です。| watashi wa gakusei desu | La même phrase avec des kanji.
          `),
        },
        {
          title: 'Les cinq voyelles',
          body: 'Le japonais n’a que **5 voyelles**, toujours prononcées pareil. Le **u** se prononce presque « ou » avec les lèvres détendues, le **e** comme « é ».',
          table: table(`
            Kana | Romaji | Prononciation
            あ | a | a
            い | i | i
            う | u | ou (lèvres peu arrondies)
            え | e | é
            お | o | o
          `),
        },
        {
          title: 'Lignes K et S',
          body: 'Chaque ligne combine une consonne avec les 5 voyelles. Attention : **し** se lit « shi » (pas « si »).',
          table: table(`
            Kana | Romaji | Exemple
            か き く け こ | ka ki ku ke ko | かさ (kasa) parapluie
            さ し す せ そ | sa shi su se so | すし (sushi) sushi
          `),
          tip: 'Le **u** de す est souvent presque muet en fin de mot : です se dit « dess ».',
        },
      ],
      vocab: vocab(`
        あい | ai | amour
        いえ | ie | maison
        うえ | ue | dessus
        あか | aka | rouge
        いけ | ike | étang
        かさ | kasa | parapluie
        すし | sushi | sushi
        あさ | asa | matin
      `),
      exercises: [
        qcm('Quel kana se lit « shi » ?', 'し', ['さ', 'す', 'せ']),
        qcm('Comment se lit « か » ?', 'ka', ['sa', 'ko', 'ki']),
        qcm('Quelle écriture sert surtout aux mots étrangers ?', 'Les katakana', ['Les hiragana', 'Les kanji', 'Le romaji']),
        match('Associe chaque kana à sa lecture', [['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']]),
        type('Écris en romaji : すし', 'sushi'),
        qcm('Que veut dire « あさ » ?', 'matin', ['rouge', 'maison', 'amour']),
      ],
    },
    {
      id: 'ja-k2',
      title: 'Lignes T, N, H et M',
      subtitle: 'た ち つ て と · な に ぬ ね の · は ひ ふ へ ほ · ま み む め も',
      duration: 25,
      objectives: ['Lire les lignes T, N, H, M', 'Repérer les lectures irrégulières chi, tsu, fu'],
      sections: [
        {
          title: 'Ligne T : deux surprises',
          body: 'Dans la ligne T, **ち** se lit « chi » et **つ** se lit « tsu ».',
          table: table(`
            Kana | Romaji | Exemple
            た ち つ て と | ta chi tsu te to | くつ (kutsu) chaussures
            な に ぬ ね の | na ni nu ne no | ねこ (neko) chat
          `),
        },
        {
          title: 'Lignes H et M',
          body: '**ふ** se lit « fu », avec un souffle léger entre les lèvres (ni f ni h français).',
          table: table(`
            Kana | Romaji | Exemple
            は ひ ふ へ ほ | ha hi fu he ho | はな (hana) fleur
            ま み む め も | ma mi mu me mo | みみ (mimi) oreille
          `),
          tip: 'Les paires faciles à confondre : **ぬ / め** (ぬ a une petite boucle), **は / ほ** (ほ a deux traits horizontaux).',
        },
      ],
      vocab: vocab(`
        ねこ | neko | chat
        いぬ | inu | chien
        はな | hana | fleur / nez
        くつ | kutsu | chaussures
        さかな | sakana | poisson
        みみ | mimi | oreille
        ひと | hito | personne
        つき | tsuki | lune
      `),
      dialogue: dlg(`
        先生: これは なんですか。| Qu’est-ce que c’est ?
        レア: ねこです。| C’est un chat.
      `),
      exercises: [
        qcm('Comment se lit « つ » ?', 'tsu', ['tu', 'su', 'chi']),
        qcm('Quel kana se lit « fu » ?', 'ふ', ['へ', 'ほ', 'ひ']),
        qcm('Que veut dire « ねこ » ?', 'chat', ['chien', 'poisson', 'fleur']),
        match('Associe', [['いぬ', 'chien'], ['さかな', 'poisson'], ['つき', 'lune'], ['ひと', 'personne']]),
        type('Écris en romaji : はな', 'hana'),
        qcm('Laquelle de ces syllabes se lit « chi » ?', 'ち', ['さ', 'き', 'つ']),
      ],
    },
    {
      id: 'ja-k3',
      title: 'Lignes Y, R, W, le ん et les sons voisés',
      subtitle: 'や ゆ よ · ら り る れ ろ · わ を ん · が ざ だ ば ぱ',
      duration: 30,
      objectives: ['Finir le tableau des hiragana', 'Lire les dakuten ゛ et handakuten ゜'],
      sections: [
        {
          title: 'Les dernières lignes',
          body: 'Le **r** japonais est entre « r » et « l », un seul petit coup de langue. **を** (wo) se prononce « o » et ne sert qu’à marquer le complément d’objet. **ん** est le seul kana sans voyelle.',
          table: table(`
            Kana | Romaji
            や ゆ よ | ya yu yo
            ら り る れ ろ | ra ri ru re ro
            わ を ん | wa (w)o n
          `),
        },
        {
          title: 'Deux petits traits ゛ et un rond ゜',
          body: 'Le **dakuten** ゛ rend la consonne sonore : か → が (ga). Le **handakuten** ゜ transforme h en p : は → ぱ (pa).',
          table: table(`
            Kana | Romaji
            が ぎ ぐ げ ご | ga gi gu ge go
            ざ じ ず ぜ ぞ | za ji zu ze zo
            だ ぢ づ で ど | da ji zu de do
            ば び ぶ べ ぼ | ba bi bu be bo
            ぱ ぴ ぷ ぺ ぽ | pa pi pu pe po
          `),
          tip: 'Tu connais maintenant les 71 hiragana (46 + 25 voisés). Entraîne-toi en lisant des mots lentement, syllabe par syllabe.',
        },
      ],
      vocab: vocab(`
        やま | yama | montagne
        よる | yoru | nuit
        りんご | ringo | pomme
        わたし | watashi | je, moi
        にほん | nihon | Japon
        ごはん | gohan | riz, repas
        てんぷら | tenpura | tempura
        ぶた | buta | cochon
      `),
      exercises: [
        qcm('Comment se lit « が » ?', 'ga', ['ka', 'pa', 'ba']),
        qcm('Que fait le petit rond ゜ sur は ?', 'Il donne « pa »', ['Il donne « ba »', 'Il donne « wa »', 'Il allonge la voyelle']),
        qcm('Comment se lit « にほん » ?', 'nihon', ['nifon', 'nihan', 'nahon']),
        match('Associe', [['りんご', 'pomme'], ['やま', 'montagne'], ['よる', 'nuit'], ['ごはん', 'riz, repas']]),
        type('Écris en romaji : わたし', 'watashi'),
        qcm('Quel kana n’a pas de voyelle ?', 'ん', ['を', 'る', 'よ']),
      ],
    },
    {
      id: 'ja-k4',
      title: 'Syllabes combinées, petit っ et voyelles longues',
      subtitle: 'きゃ しゅ ちょ · きって · おかあさん',
      duration: 25,
      objectives: ['Lire les syllabes combinées', 'Doubler une consonne avec っ', 'Allonger une voyelle'],
      sections: [
        {
          title: 'Petits ゃ ゅ ょ',
          body: 'Un kana en **-i** suivi d’un **petit** ゃ, ゅ ou ょ forme une seule syllabe : き + ゃ = **きゃ** (kya).',
          table: table(`
            Kana | Romaji | Exemple
            きゃ きゅ きょ | kya kyu kyo | きょう (kyō) aujourd’hui
            しゃ しゅ しょ | sha shu sho | しゃしん (shashin) photo
            ちゃ ちゅ ちょ | cha chu cho | おちゃ (ocha) thé
          `),
        },
        {
          title: 'Le petit っ : une pause',
          body: 'Un **petit っ** double la consonne suivante : on marque un court silence. きて (kite, « viens ») ≠ **きって** (kitte, « timbre »).',
          examples: ex(`
            きって | kitte | timbre
            ざっし | zasshi | magazine
            がっこう | gakkō | école
          `),
        },
        {
          title: 'Voyelles longues',
          body: 'Une voyelle longue dure **deux temps**. Elle change le sens : おばさん (tante) ≠ **おばあさん** (grand-mère). En hiragana on ajoute あ, い, う (après o/u) ou い (après e).',
          examples: ex(`
            おかあさん | okāsan | mère
            おとうさん | otōsan | père
            せんせい | sensei | professeur
          `),
        },
      ],
      vocab: vocab(`
        きょう | kyō | aujourd’hui
        おちゃ | ocha | thé vert
        しゃしん | shashin | photo
        きって | kitte | timbre
        がっこう | gakkō | école
        せんせい | sensei | professeur
        おかあさん | okāsan | mère
        おとうさん | otōsan | père
      `),
      exercises: [
        qcm('Comment se lit « きょう » ?', 'kyō', ['kiyou', 'kyu', 'kiō']),
        qcm('Que fait un petit っ ?', 'Il double la consonne suivante', ['Il allonge la voyelle', 'Il rend la consonne sonore', 'Il se prononce « tsu »']),
        qcm('Quel mot veut dire « grand-mère » ?', 'おばあさん', ['おばさん', 'おかあさん', 'おとうさん']),
        match('Associe', [['おちゃ', 'thé vert'], ['しゃしん', 'photo'], ['がっこう', 'école'], ['せんせい', 'professeur']]),
        type('Écris en hiragana : kitte (timbre)', 'きって', 'petit っ'),
        qcm('Dans « きって », combien de temps (mores) compte-t-on ?', '3', ['2', '4', '1']),
      ],
    },
    {
      id: 'ja-k5',
      title: 'Les katakana',
      subtitle: 'ア イ ウ エ オ · コーヒー · フランス',
      duration: 30,
      objectives: ['Lire les katakana', 'Comprendre le trait d’allongement ー', 'Lire les mots empruntés'],
      sections: [
        {
          title: 'Même sons, autre forme',
          body: 'Les katakana notent **exactement les mêmes sons** que les hiragana, avec des traits droits. On les utilise pour les mots étrangers, les noms étrangers et parfois pour insister.',
          table: table(`
            Katakana | Hiragana | Romaji
            ア イ ウ エ オ | あ い う え お | a i u e o
            カ キ ク ケ コ | か き く け こ | ka ki ku ke ko
            サ シ ス セ ソ | さ し す せ そ | sa shi su se so
            タ チ ツ テ ト | た ち つ て と | ta chi tsu te to
            ナ ニ ヌ ネ ノ | な に ぬ ね の | na ni nu ne no
            ハ ヒ フ ヘ ホ | は ひ ふ へ ほ | ha hi fu he ho
            マ ミ ム メ モ | ま み む め も | ma mi mu me mo
            ラ リ ル レ ロ | ら り る れ ろ | ra ri ru re ro
          `),
          tip: 'Pièges célèbres : **シ** (shi) / **ツ** (tsu), **ソ** (so) / **ン** (n). Les traits de シ et ン « montent », ceux de ツ et ソ « descendent ».',
        },
        {
          title: 'Le trait ー',
          body: 'En katakana, une voyelle longue s’écrit avec un trait : **コーヒー** (kōhī, café). Les mots étrangers sont adaptés aux syllabes japonaises.',
          examples: ex(`
            コーヒー | kōhī | café
            フランス | furansu | France
            パン | pan | pain
            テレビ | terebi | télévision
            アイスクリーム | aisukurīmu | glace
          `),
        },
      ],
      vocab: vocab(`
        コーヒー | kōhī | café
        フランス | furansu | France
        パリ | pari | Paris
        パン | pan | pain
        テレビ | terebi | télévision
        ホテル | hoteru | hôtel
        レストラン | resutoran | restaurant
        カメラ | kamera | appareil photo
      `),
      dialogue: dlg(`
        店員: いらっしゃいませ。| Bienvenue !
        レア: コーヒーと パン、おねがいします。| Un café et du pain, s’il vous plaît.
        店員: はい、かしこまりました。| Très bien.
      `),
      exercises: [
        qcm('Comment se lit « シ » ?', 'shi', ['tsu', 'so', 'n']),
        qcm('Que veut dire « フランス » ?', 'France', ['Français (langue)', 'franc', 'Paris']),
        qcm('À quoi sert le trait « ー » ?', 'À allonger la voyelle', ['À doubler la consonne', 'À séparer deux mots', 'À poser une question']),
        match('Associe', [['パン', 'pain'], ['テレビ', 'télévision'], ['ホテル', 'hôtel'], ['カメラ', 'appareil photo']]),
        type('Écris en romaji : コーヒー', ['kohi', 'kōhī', 'koohii', 'kouhii']),
        qcm('Quel katakana se lit « n » ?', 'ン', ['ソ', 'シ', 'ツ']),
      ],
    },
  ],
  test: [
    qcm('Quel kana se lit « tsu » ?', 'つ', ['す', 'ち', 'そ']),
    qcm('Comment se lit « ふ » ?', 'fu', ['hu', 'pu', 'bu']),
    qcm('Comment se lit « じ » ?', 'ji', ['shi', 'chi', 'zi']),
    qcm('Quel mot veut dire « école » ?', 'がっこう', ['がこう', 'がっこ', 'かっこう']),
    qcm('Comment se lit « しゃしん » ?', 'shashin', ['shiyashin', 'sashin', 'shashi']),
    qcm('Quel katakana se lit « so » ?', 'ソ', ['ン', 'シ', 'ツ']),
    qcm('Les katakana servent surtout pour…', 'les mots étrangers', ['la grammaire', 'les verbes', 'les chiffres']),
    match('Associe', [['ねこ', 'chat'], ['いぬ', 'chien'], ['やま', 'montagne'], ['りんご', 'pomme']]),
    match('Associe', [['コーヒー', 'café'], ['パン', 'pain'], ['ホテル', 'hôtel'], ['テレビ', 'télévision']]),
    type('Écris en romaji : さかな', 'sakana'),
    type('Écris en romaji : ぱん', 'pan'),
    qcm('Quelle paire est une voyelle longue ?', 'おばあさん', ['おばさん', 'きって', 'ざっし']),
  ],
}

export const jaN5: Level = {
  id: 'ja-n5',
  index: 1,
  name: 'Niveau 1 — Débutant',
  korean: 'しょきゅう',
  cefr: 'A1',
  topik: 'JLPT N5',
  color: '#c2255c',
  description:
    'Se présenter, montrer des objets, compter, parler de ses actions au présent poli (です / ます) et décrire avec les adjectifs. Tu poses les bases de la phrase japonaise : sujet – complément – verbe.',
  lessons: [
    {
      id: 'ja-n5-1',
      title: 'Saluer et se présenter',
      subtitle: 'はじめまして · わたしは〜です · よろしく おねがいします',
      duration: 25,
      objectives: ['Saluer selon le moment', 'Dire son nom, sa nationalité, son métier', 'Utiliser は et です'],
      sections: [
        {
          title: 'Les salutations',
          table: table(`
            Japonais | Romaji | Sens
            おはようございます | ohayō gozaimasu | Bonjour (le matin)
            こんにちは | konnichiwa | Bonjour (la journée)
            こんばんは | konbanwa | Bonsoir
            さようなら | sayōnara | Au revoir (séparation longue)
            ありがとうございます | arigatō gozaimasu | Merci
            すみません | sumimasen | Excusez-moi / pardon
          `),
          tip: 'Dans こんにちは et こんばんは, le dernier は se lit **wa** : c’est la particule du thème.',
        },
        {
          title: 'A は B です : « A est B »',
          body: '**は** (lu « wa ») marque le **thème** : ce dont on parle. **です** termine la phrase poliment, comme « c’est / je suis ». Le verbe est **toujours à la fin**.',
          examples: ex(`
            わたしは レアです。| watashi wa rea desu | Je suis Léa.
            フランスじんです。| furansujin desu | Je suis français(e).
            がくせいです。| gakusei desu | Je suis étudiant(e).
            はじめまして。よろしく おねがいします。| hajimemashite. yoroshiku onegai shimasu | Enchanté(e). Au plaisir.
          `),
        },
        {
          title: 'Nationalités : pays + じん',
          body: 'On ajoute **じん** (人, personne) au nom du pays : フランス → **フランスじん** (Français), にほん → **にほんじん** (Japonais). Pour la langue, on ajoute **ご** : フランスご (le français).',
        },
      ],
      vocab: vocab(`
        わたし | watashi | je, moi
        がくせい | gakusei | étudiant(e)
        かいしゃいん | kaishain | employé(e) de bureau
        せんせい | sensei | professeur
        フランスじん | furansujin | Français(e)
        にほんじん | nihonjin | Japonais(e)
        はじめまして | hajimemashite | enchanté(e) (1re rencontre)
        なまえ | namae | nom, prénom
      `),
      dialogue: dlg(`
        ゆき: はじめまして。ゆきです。| Enchantée. Je suis Yuki.
        レア: はじめまして。レアです。フランスじんです。| Enchantée. Je suis Léa. Je suis française.
        ゆき: がくせいですか。| Tu es étudiante ?
        レア: はい、がくせいです。よろしく おねがいします。| Oui, je suis étudiante. Au plaisir.
      `),
      exercises: [
        qcm('Comment dit-on « bonjour » le matin ?', 'おはようございます', ['こんばんは', 'さようなら', 'すみません']),
        qcm('Comment se prononce la particule は dans « わたしは » ?', 'wa', ['ha', 'ba', 'a']),
        qcm('Que veut dire « フランスじん » ?', 'un(e) Français(e)', ['la langue française', 'la France', 'Paris']),
        order('Remets dans l’ordre : « Je suis étudiante. »', 'わたしは がくせい です', 'Je suis étudiante.'),
        match('Associe', [['せんせい', 'professeur'], ['がくせい', 'étudiant(e)'], ['なまえ', 'nom'], ['かいしゃいん', 'employé(e)']]),
        type('Complète : わたしは レア___。(je suis Léa)', 'です'),
      ],
    },
    {
      id: 'ja-n5-2',
      title: 'Montrer et poser des questions',
      subtitle: 'これ・それ・あれ · の · 〜ですか',
      duration: 25,
      objectives: ['Désigner un objet proche ou lointain', 'Poser une question avec か', 'Exprimer l’appartenance avec の'],
      sections: [
        {
          title: 'これ・それ・あれ・どれ',
          table: table(`
            Japonais | Sens | Distance
            これ | ceci | près de moi
            それ | cela | près de toi
            あれ | cela là-bas | loin de nous deux
            どれ | lequel ? | question
          `),
        },
        {
          title: 'La question : か',
          body: 'On ajoute **か** à la fin d’une phrase pour en faire une question, sans changer l’ordre des mots. On répond はい (oui) ou いいえ (non).',
          examples: ex(`
            これは なんですか。| kore wa nan desu ka | Qu’est-ce que c’est ?
            それは ほんです。| sore wa hon desu | C’est un livre.
            あれは がっこうですか。| are wa gakkō desu ka | Là-bas, c’est une école ?
            いいえ、びょういんです。| iie, byōin desu | Non, c’est un hôpital.
          `),
        },
        {
          title: 'Le の de l’appartenance',
          body: '**A の B** = « le B de A ». わたしの ほん = mon livre. にほんごの せんせい = le professeur de japonais.',
          examples: ex(`
            わたしの かさです。| watashi no kasa desu | C’est mon parapluie.
            だれの かばんですか。| dare no kaban desu ka | C’est le sac de qui ?
          `),
        },
      ],
      vocab: vocab(`
        これ | kore | ceci
        それ | sore | cela
        あれ | are | cela là-bas
        なん / なに | nan / nani | quoi
        だれ | dare | qui
        ほん | hon | livre
        かばん | kaban | sac
        とけい | tokei | montre, horloge
      `),
      dialogue: dlg(`
        トム: それは なんですか。| Qu’est-ce que c’est ?
        ゆき: これですか。にほんごの ほんです。| Ça ? C’est un livre de japonais.
        トム: ゆきさんの ほんですか。| C’est ton livre, Yuki ?
        ゆき: いいえ、せんせいの ほんです。| Non, c’est le livre du professeur.
      `),
      exercises: [
        qcm('Quel mot désigne un objet loin de nous deux ?', 'あれ', ['これ', 'それ', 'どれ']),
        qcm('Comment transforme-t-on une phrase en question ?', 'On ajoute か à la fin', ['On inverse sujet et verbe', 'On ajoute は au début', 'On change です en ます']),
        qcm('« わたしの ほん » veut dire…', 'mon livre', ['je suis un livre', 'le livre est à moi ?', 'un livre et moi']),
        order('Remets dans l’ordre : « Qu’est-ce que c’est ? »', 'これは なん ですか', 'Qu’est-ce que c’est ?'),
        match('Associe', [['ほん', 'livre'], ['かばん', 'sac'], ['とけい', 'montre'], ['だれ', 'qui']]),
        type('Complète : せんせい___ かさです。(c’est le parapluie du professeur)', 'の'),
      ],
    },
    {
      id: 'ja-n5-3',
      title: 'Les nombres, l’heure et les prix',
      subtitle: 'いち に さん · なんじ · いくら',
      duration: 30,
      objectives: ['Compter jusqu’à 10 000', 'Dire l’heure', 'Demander un prix'],
      sections: [
        {
          title: 'De 1 à 10',
          table: table(`
            Japonais | Kanji | Nombre
            いち | 一 | 1
            に | 二 | 2
            さん | 三 | 3
            よん / し | 四 | 4
            ご | 五 | 5
            ろく | 六 | 6
            なな / しち | 七 | 7
            はち | 八 | 8
            きゅう / く | 九 | 9
            じゅう | 十 | 10
          `),
          body: 'Les grands nombres se construisent comme des briques : じゅう (10), **ひゃく** (100), **せん** (1 000), **まん** (10 000). 25 = にじゅうご (2×10 + 5).',
        },
        {
          title: 'L’heure : 〜じ・〜ふん',
          body: '**じ** = heure, **ふん / ぷん** = minutes, **はん** = et demie. Attention : 4 h = **よじ**, 7 h = **しちじ**, 9 h = **くじ**.',
          examples: ex(`
            いま なんじですか。| ima nanji desu ka | Quelle heure est-il ?
            さんじ はんです。| sanji han desu | Il est 3 h 30.
            くじ じゅっぷんです。| kuji juppun desu | Il est 9 h 10.
          `),
        },
        {
          title: 'Faire ses courses',
          examples: ex(`
            これは いくらですか。| kore wa ikura desu ka | Combien ça coûte ?
            せんえんです。| sen en desu | C’est 1 000 yens.
            これを ください。| kore o kudasai | Je prends ceci, s’il vous plaît.
          `),
        },
      ],
      vocab: vocab(`
        いくら | ikura | combien (prix)
        えん | en | yen
        なんじ | nanji | quelle heure
        いま | ima | maintenant
        はん | han | et demie
        ひゃく | hyaku | cent
        せん | sen | mille
        まん | man | dix mille
      `),
      dialogue: dlg(`
        レア: すみません、この かさは いくらですか。| Excusez-moi, combien coûte ce parapluie ?
        店員: せんごひゃくえんです。| 1 500 yens.
        レア: じゃ、これを ください。| Alors je le prends.
      `),
      exercises: [
        qcm('Comment dit-on 7 ?', 'なな', ['はち', 'ろく', 'きゅう']),
        qcm('Comment dit-on « 4 heures » ?', 'よじ', ['しじ', 'よんじ', 'よっじ']),
        qcm('« いくらですか » sert à demander…', 'un prix', ['l’heure', 'un nom', 'un lieu']),
        match('Associe', [['ひゃく', '100'], ['せん', '1 000'], ['まん', '10 000'], ['じゅう', '10']]),
        type('Écris en hiragana le nombre 3', 'さん'),
        qcm('Comment dit-on « 3 h 30 » ?', 'さんじ はん', ['さんじ さんじゅう', 'さん はんじ', 'はん さんじ']),
      ],
    },
    {
      id: 'ja-n5-4',
      title: 'Les verbes en ます et les particules',
      subtitle: 'たべます · を・に・へ・で',
      duration: 35,
      objectives: ['Conjuguer au présent poli affirmatif et négatif', 'Utiliser を, に, へ, で'],
      sections: [
        {
          title: 'Présent poli : 〜ます / 〜ません',
          body: 'La forme **ます** exprime le présent **et** le futur poli. Au négatif : **ません**. Le verbe ne change pas selon la personne !',
          table: table(`
            Affirmatif | Négatif | Sens
            たべます | たべません | manger
            のみます | のみません | boire
            いきます | いきません | aller
            みます | みません | regarder
            します | しません | faire
          `),
        },
        {
          title: 'Les particules : des étiquettes après les mots',
          body: '**を** (lu « o ») marque l’objet. **に** marque le moment précis ou la destination. **へ** (lu « e ») marque la direction. **で** marque le lieu de l’action ou le moyen.',
          examples: ex(`
            パンを たべます。| pan o tabemasu | Je mange du pain.
            しちじに おきます。| shichiji ni okimasu | Je me lève à 7 h.
            がっこうへ いきます。| gakkō e ikimasu | Je vais à l’école.
            でんしゃで いきます。| densha de ikimasu | J’y vais en train.
            うちで テレビを みます。| uchi de terebi o mimasu | Je regarde la télé à la maison.
          `),
          tip: 'L’ordre typique : **Temps に · Lieu で · Objet を · Verbe**.',
        },
      ],
      vocab: vocab(`
        たべます | tabemasu | manger
        のみます | nomimasu | boire
        いきます | ikimasu | aller
        きます | kimasu | venir
        おきます | okimasu | se lever
        ねます | nemasu | dormir
        みず | mizu | eau
        でんしゃ | densha | train
      `),
      dialogue: dlg(`
        ゆき: あした なにを しますか。| Qu’est-ce que tu fais demain ?
        トム: きょうとへ いきます。| Je vais à Kyoto.
        ゆき: しんかんせんで いきますか。| Tu y vas en shinkansen ?
        トム: いいえ、バスで いきます。| Non, j’y vais en bus.
      `),
      exercises: [
        qcm('Quel est le négatif de « のみます » ?', 'のみません', ['のみました', 'のまない', 'のみませんか']),
        qcm('Quelle particule marque l’objet (ce qu’on mange) ?', 'を', ['に', 'で', 'へ']),
        qcm('« バスで いきます » : que marque で ?', 'le moyen (en bus)', ['la destination', 'l’objet', 'le moment']),
        order('Remets dans l’ordre : « Je mange du pain. »', 'パンを たべます', 'Je mange du pain.'),
        type('Complète : しちじ___ おきます。(à 7 h)', 'に'),
        match('Associe', [['たべます', 'manger'], ['のみます', 'boire'], ['ねます', 'dormir'], ['きます', 'venir']]),
      ],
    },
    {
      id: 'ja-n5-5',
      title: 'Décrire : adjectifs et existence',
      subtitle: 'たかい · きれい · あります · います',
      duration: 30,
      objectives: ['Utiliser les adjectifs en い et en な', 'Dire « il y a » avec あります / います'],
      sections: [
        {
          title: 'Deux familles d’adjectifs',
          body: 'Les **adjectifs en い** se terminent par い et se mettent au négatif en remplaçant い par **くない**. Les **adjectifs en な** prennent **な** devant un nom et **じゃ ありません** au négatif.',
          table: table(`
            Adjectif | Devant un nom | Négatif poli
            たかい (cher, haut) | たかい ほん | たかくないです
            おいしい (bon) | おいしい りょうり | おいしくないです
            きれい (joli, propre) | きれいな へや | きれいじゃ ありません
            しずか (calme) | しずかな まち | しずかじゃ ありません
          `),
          tip: 'Exception à connaître : いい (bien) → **よくない** (pas bien).',
        },
        {
          title: 'Il y a : あります / います',
          body: '**あります** pour les objets et les plantes, **います** pour les êtres vivants qui bougent (personnes, animaux). Le lieu prend **に**.',
          examples: ex(`
            つくえの うえに ほんが あります。| tsukue no ue ni hon ga arimasu | Il y a un livre sur le bureau.
            こうえんに いぬが います。| kōen ni inu ga imasu | Il y a un chien dans le parc.
            ねこは どこに いますか。| neko wa doko ni imasu ka | Où est le chat ?
          `),
        },
      ],
      vocab: vocab(`
        おおきい | ōkii | grand
        ちいさい | chiisai | petit
        あたらしい | atarashii | nouveau
        ふるい | furui | vieux (objet)
        おいしい | oishii | bon, délicieux
        きれい | kirei | joli, propre
        げんき | genki | en forme
        どこ | doko | où
      `),
      dialogue: dlg(`
        トム: この ラーメンは おいしいですね。| Ces ramen sont délicieux, hein.
        ゆき: ええ。でも、ちょっと たかいです。| Oui. Mais un peu chers.
        トム: この みせは しずかで いいですね。| Ce restaurant est calme, c’est bien.
      `),
      exercises: [
        qcm('Quel est le négatif poli de « たかい » ?', 'たかくないです', ['たかいじゃ ありません', 'たかいません', 'たかないです']),
        qcm('Comment dit-on « une jolie chambre » ?', 'きれいな へや', ['きれい へや', 'きれいの へや', 'きれいい へや']),
        qcm('Pour dire « il y a un chat », on utilise…', 'います', ['あります', 'です', 'ます']),
        match('Associe les contraires', [['おおきい', 'ちいさい'], ['あたらしい', 'ふるい'], ['たかい', 'やすい']]),
        type('Complète : こうえんに いぬが ___。(il y a un chien)', 'います'),
        qcm('Quel est le négatif de « いい » ?', 'よくない', ['いくない', 'いいじゃない', 'いいません']),
      ],
    },
  ],
  test: [
    qcm('Comment dit-on « bonsoir » ?', 'こんばんは', ['こんにちは', 'おはよう', 'さようなら']),
    qcm('« これは だれの かばんですか » veut dire…', 'À qui est ce sac ?', ['Qu’est-ce que ce sac ?', 'Où est le sac ?', 'Combien coûte ce sac ?']),
    qcm('Comment dit-on « 9 heures » ?', 'くじ', ['きゅうじ', 'くうじ', 'きゅじ']),
    qcm('Quelle particule marque le lieu d’une action ?', 'で', ['を', 'に', 'は']),
    qcm('Quel est le négatif de « いきます » ?', 'いきません', ['いかない', 'いきました', 'いきませ']),
    qcm('Pour les objets, « il y a » se dit…', 'あります', ['います', 'です', 'します']),
    qcm('Comment dit-on « un endroit calme » ?', 'しずかな ところ', ['しずか ところ', 'しずかい ところ', 'しずかの ところ']),
    order('Remets dans l’ordre : « Je vais à l’école en train. »', 'でんしゃで がっこうへ いきます', 'Je vais à l’école en train.'),
    order('Remets dans l’ordre : « Je suis française. »', 'わたしは フランスじん です', 'Je suis française.'),
    match('Associe', [['いくら', 'combien (prix)'], ['なんじ', 'quelle heure'], ['どこ', 'où'], ['だれ', 'qui']]),
    type('Complète : パン___ たべます。', 'を'),
    type('Écris en hiragana le négatif poli de « おいしい » (sans です)', 'おいしくない'),
  ],
}
