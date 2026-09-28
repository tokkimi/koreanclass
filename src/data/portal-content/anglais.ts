import type { PortalContent } from './types.js'

export const anglais: PortalContent = {
  writing: {
    title: 'Alphabet et prononciation',
    lead: 'Touche une lettre pour entendre son nom anglais. Pour apprendre pas à pas, suis le Niveau 0 — Premiers pas.',
    grids: [
      {
        title: 'L’alphabet (26 lettres)',
        items: [
          ['A', 'éi'], ['B', 'bi'], ['C', 'si'], ['D', 'di'], ['E', 'i'], ['F', 'èf'], ['G', 'dji'], ['H', 'éitch'], ['I', 'aï'], ['J', 'djéi'], ['K', 'kéi'], ['L', 'èl'], ['M', 'èm'],
          ['N', 'èn'], ['O', 'ôou'], ['P', 'pi'], ['Q', 'kiou'], ['R', 'ar'], ['S', 'ès'], ['T', 'ti'], ['U', 'iou'], ['V', 'vi'], ['W', 'double-iou'], ['X', 'èks'], ['Y', 'ouaï'], ['Z', 'zèd (UK) / zi (US)'],
        ].map(([ch, read]) => [ch, read, undefined, ch] as [string, string, string?, string?]),
      },
      {
        title: 'Les sons clés',
        items: [
          ['th', 'langue entre les dents', 'think', 'think'], ['th', 'version sonore', 'the', 'the'], ['h', 'soufflé', 'house', 'house'], ['w', 'ou rapide', 'water', 'water'],
          ['ee', 'i long', 'sheep', 'sheep'], ['i', 'i court', 'ship', 'ship'], ['r', 'langue en arrière', 'red', 'red'], ['-ing', 'ng nasal', 'singing', 'singing'],
        ],
      },
    ],
    sections: [
      {
        id: 'lettres',
        title: '1. Une orthographe qui ne dit pas tout',
        body: 'L’anglais a **26 lettres**, comme le français, mais la même lettre peut se prononcer de plusieurs façons : **a** dans cat, name, car, all. Il faut donc apprendre les mots **avec leur son**, en les écoutant.\n**Épeler** est très courant (au téléphone, pour un nom) : apprends bien le nom des lettres.',
      },
      {
        id: 'voyelles',
        title: '2. Voyelles courtes et longues',
        body: 'La durée de la voyelle change le sens du mot. Exagère la différence au début.',
        table: {
          head: ['Mot', 'Voyelle', 'Sens'],
          rows: [
            ['ship', 'i court', 'bateau'],
            ['sheep', 'i long', 'mouton'],
            ['full', 'ou court', 'plein'],
            ['fool', 'ou long', 'idiot'],
            ['cat', 'a très ouvert', 'chat'],
          ],
        },
      },
      {
        id: 'consonnes',
        title: '3. Les consonnes difficiles pour un francophone',
        body: '**th** : la langue entre les dents, sourd dans **think**, sonore dans **the**. **h** : toujours soufflé (hello, happy) — ne l’oublie pas ! **r** : la langue recule sans toucher le palais. **w** : un « ou » très rapide (water, week).',
        table: {
          head: ['Mot', 'Son clé', 'Sens'],
          rows: [
            ['three', 'th sourd', 'trois'],
            ['mother', 'th sonore', 'mère'],
            ['hungry', 'h soufflé', 'affamé'],
            ['right', 'r anglais', 'droite'],
            ['window', 'w', 'fenêtre'],
          ],
        },
      },
      {
        id: 'accent',
        title: '4. L’accent tonique et les lettres muettes',
        body: 'Chaque mot a **une syllabe accentuée**, plus forte et plus longue : **HO**-tel, ba-**NA**-na, **PHO**-to-graph / pho-**TO**-gra-pher. Certaines lettres sont **muettes** : k dans **know**, w dans **write**, b dans **climb**, gh dans **night**.',
      },
      {
        id: 'mots',
        title: '5. Lire ses premiers mots, pas à pas',
        body: 'Écoute, répète en exagérant l’accent tonique, puis dis le mot naturellement.',
        words: [
          ['hello', 'h soufflé + « lo », accent sur « lo ».', 'bonjour'],
          ['thank you', 'th sourd, langue entre les dents.', 'merci'],
          ['water', 'w rapide, « t » souvent adouci.', 'eau'],
          ['knife', 'k muet : « naïf ».', 'couteau'],
        ],
      },
    ],
    quizTitle: 'À toi : reconnaître les lettres et les sons',
    quiz: [
      ['Comment se dit la lettre « A » ?', 'éi', 'a', 'aï', 'i'],
      ['Comment se dit la lettre « E » ?', 'i', 'e', 'é', 'aï'],
      ['Comment se dit la lettre « I » ?', 'aï', 'i', 'éi', 'ouaï'],
      ['Comment se dit la lettre « J » ?', 'djéi', 'ji', 'dji', 'jé'],
      ['Comment se dit la lettre « G » ?', 'dji', 'gé', 'djéi', 'gui'],
      ['Comment se dit la lettre « Y » ?', 'ouaï', 'i grec', 'yé', 'aï'],
      ['Pour « th », on met…', 'la langue entre les dents', 'les lèvres en rond', 'la langue au palais', 'rien : il est muet'],
      ['Le « h » de « happy » est…', 'soufflé', 'muet', 'roulé', 'comme un r'],
      ['Quel mot a un « i » long ?', 'sheep', 'ship', 'sit', 'fish'],
      ['Dans « know », quelle lettre est muette ?', 'k', 'n', 'o', 'w'],
      ['Dans « write », quelle lettre est muette ?', 'w', 'r', 'i', 't'],
      ['Où est l’accent dans « banana » ?', 'sur la 2e syllabe', 'sur la 1re', 'sur la dernière', 'partout'],
      ['« mother » contient un…', 'th sonore', 'th sourd', 't simple', 'd'],
      ['« Z » se dit en anglais britannique…', 'zèd', 'zi', 'zède', 'zèta'],
      ['« ship » veut dire…', 'bateau', 'mouton', 'magasin', 'chaussure'],
      ['Combien de lettres dans l’alphabet anglais ?', '26', '24', '27', '28'],
    ],
    next: [
      ['L’alphabet et les sons', 'en-0', 'en-0-1'],
      ['Saluer', 'en-0', 'en-0-2'],
      ['Se présenter', 'en-0', 'en-0-3'],
    ],
  },
  numbers: {
    title: 'Chiffres & nombres',
    lead: 'Les nombres anglais, expliqués pas à pas. Lis et écoute d’abord ; les exercices viennent ensuite.',
    why: {
      title: 'Des nombres réguliers… et deux pièges',
      paragraphs: [
        'Les nombres anglais sont très réguliers : twenty-one, twenty-two… Le piège n°1 est la paire **-teen / -ty** : thir**teen** (13) ≠ thir**ty** (30). L’accent tombe à la fin pour -teen, au début pour -ty.',
        'Piège n°2 : **hundred, thousand, million** ne prennent **pas de -s** après un nombre : two hundred, three thousand. En anglais britannique, on ajoute **and** : one hundred **and** five.',
        'Les grands nombres s’écrivent avec une **virgule** (1,000) et les décimales avec un **point** (2.5) — l’inverse du français !',
      ],
    },
    table: {
      title: 'Écouter et apprendre de 0 à 10',
      head: ['Nombre', 'Anglais', 'Ordinal'],
      rows: [
        ['0', 'zero', '—'],
        ['1', 'one', 'first'],
        ['2', 'two', 'second'],
        ['3', 'three', 'third'],
        ['4', 'four', 'fourth'],
        ['5', 'five', 'fifth'],
        ['6', 'six', 'sixth'],
        ['7', 'seven', 'seventh'],
        ['8', 'eight', 'eighth'],
        ['9', 'nine', 'ninth'],
        ['10', 'ten', 'tenth'],
      ],
      note: 'Dans un numéro de téléphone, 0 se dit souvent « oh », et deux chiffres identiques « double » : 0 7 7 → oh double seven.',
    },
    build: {
      title: 'Construire un nombre',
      paragraphs: [
        '**11-19 :** eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen. **Dizaines :** twenty, thirty, **forty** (sans u !), fifty, sixty, seventy, eighty, ninety. **Avec trait d’union :** twenty-five, ninety-nine.',
        '**Centaines :** a / one hundred, two hundred and ten. **Milliers :** a thousand, twenty thousand. **Million :** a million, three million. Les années se lisent par paires : 1999 = **nineteen ninety-nine**, 2025 = **twenty twenty-five**.',
      ],
    },
    sentences: {
      title: 'Une phrase, morceau par morceau',
      items: [
        { text: 'Two coffees, please.', explain: 'Two = deux · coffees = cafés · please = s’il vous plaît. → « Deux cafés, s’il vous plaît. »' },
        { text: 'It’s twenty past three.', explain: 'It’s = il est · twenty past = vingt après · three = trois heures. → « Il est 15 h 20. »' },
      ],
    },
    units: [
      {
        id: 'age',
        title: 'Dire et demander l’âge',
        body: 'L’âge se dit avec **to be** : I**’m** 25 (years old). Jamais « I have 25 ». Pour demander : **How old are you?**',
        examples: [
          { ko: 'I’m sixteen years old.', fr: 'I’m = je suis · sixteen = 16 · years old = ans. → J’ai 16 ans.' },
          { ko: 'How old is your brother?', fr: 'How old = quel âge · is your brother = a ton frère. → Quel âge a ton frère ?' },
        ],
        qs: [
          ['« J’ai 16 ans » :', 'I’m sixteen.', 'I have sixteen.', 'I have sixteen years.', 'I’m sixty.'],
          ['« Quel âge as-tu ? » :', 'How old are you?', 'How many years have you?', 'What age you have?', 'How are you old?'],
          ['40 :', 'forty', 'fourty', 'fourteen', 'fortie'],
          ['13 :', 'thirteen', 'thirty', 'threeteen', 'thirdteen'],
          ['« She’s in her twenties » veut dire…', 'Elle a entre 20 et 29 ans', 'Elle a 20 ans pile', 'Elle a 12 ans', 'Elle est née en 2020'],
          ['21 :', 'twenty-one', 'twenty-first', 'twentyone-teen', 'one-twenty'],
        ],
      },
      {
        id: 'time',
        title: 'Lire l’heure',
        body: '**o’clock** = heure pile. **past** = après (jusqu’à la demie), **to** = avant (après la demie). **a quarter past** = et quart, **half past** = et demie, **a quarter to** = moins le quart. **am** = avant midi, **pm** = après midi.',
        examples: [
          { ko: 'It’s five past nine in the morning.', fr: 'five past nine = 9 h 05 · in the morning = du matin.' },
          { ko: 'What time does it start?', fr: 'What time = à quelle heure · does it start = ça commence. → À quelle heure ça commence ?' },
        ],
        qs: [
          ['3 h 30 :', 'half past three', 'half three past', 'three and half', 'half to three'],
          ['4 h 45 :', 'a quarter to five', 'a quarter to four', 'a quarter past four', 'four and a quarter'],
          ['8 h 00 :', 'eight o’clock', 'eight hours', 'eight past', 'eight of clock'],
          ['« 3 pm » :', '15 h', '3 h du matin', 'minuit', '3 minutes'],
          ['6 h 10 :', 'ten past six', 'ten to six', 'six to ten', 'ten after to six'],
          ['« What time is it? » demande…', 'l’heure', 'la date', 'la durée', 'le prix'],
        ],
      },
      {
        id: 'money',
        title: 'La livre, le dollar et les prix',
        body: 'Au Royaume-Uni : **pounds** (£) et **pence** (p). Aux États-Unis : **dollars** ($) et **cents**. £4.50 se dit **four pounds fifty** ; $12.99 = **twelve ninety-nine**. Le symbole se place **avant** le nombre : £5, $10.',
        examples: [
          { ko: 'How much is it? — It’s twelve pounds fifty.', fr: 'How much is it = combien ça coûte · twelve pounds fifty = 12,50 £.' },
          { ko: 'Here’s your change.', fr: 'Here’s = voici · your change = votre monnaie.' },
        ],
        qs: [
          ['£4.50 se dit…', 'four pounds fifty', 'four pound and fifty', 'fifty four pounds', 'four point fifty pound'],
          ['« Combien ça coûte ? » :', 'How much is it?', 'How many is it?', 'How much it costs?', 'What cost?'],
          ['200 :', 'two hundred', 'two hundreds', 'two hundred of', 'twenty hundred'],
          ['« change » en boutique :', 'la monnaie rendue', 'le changement', 'l’échange', 'la caisse'],
          ['Où se place le symbole £ ?', 'avant le nombre', 'après le nombre', 'au milieu', 'jamais'],
          ['1,000 en anglais s’écrit avec…', 'une virgule', 'un point', 'un espace', 'un tiret'],
        ],
      },
      {
        id: 'dates',
        title: 'Dates, téléphone et années',
        body: 'Royaume-Uni : **the 3rd of May** (3/5). États-Unis : **May 3rd** (5/3) — attention à l’ordre des chiffres ! Les ordinaux : first, second, third, puis **-th**. Téléphone : chiffre par chiffre, **oh** pour 0, **double** pour deux chiffres identiques.',
        examples: [
          { ko: 'My birthday is on the fifteenth of June.', fr: 'the fifteenth of June = le 15 juin.' },
          { ko: 'My number is oh seven double four…', fr: 'oh = 0 · double four = 44.' },
        ],
        qs: [
          ['Le 15 juin (UK) :', 'the fifteenth of June', 'the fifteen of June', 'June the fifteen', 'fifteen June of'],
          ['1999 se lit…', 'nineteen ninety-nine', 'one thousand nine nine nine', 'nineteen nine nine', 'ninety-nine nineteen'],
          ['« 3rd » se lit…', 'third', 'three', 'threeth', 'thirdth'],
          ['Aux États-Unis, 5/3 signifie…', 'le 3 mai', 'le 5 mars', 'le 5 mai', 'le 3 mars'],
          ['Au téléphone, 0 se dit souvent…', 'oh', 'zero only', 'nil', 'none'],
          ['« double seven » :', '77', '14', '7', '777'],
        ],
      },
    ],
    next: [
      ['Étape 1 · cours + exercices', 'Les nombres', 'en-0', 'en-0-4'],
      ['Étape 2 · cours + exercices', 'L’heure et les jours', 'en-a1', 'en-a1-5'],
    ],
  },
  colors: {
    title: 'Les couleurs · colours',
    lead: 'Observe les 16 couleurs, écoute leur nom, puis entraîne-toi avec le QCM.',
    colors: [
      ['red', '', 'rouge', '#e44654'],
      ['blue', '', 'bleu', '#316bea'],
      ['yellow', '', 'jaune', '#f4d647'],
      ['green', '', 'vert', '#42a96b'],
      ['orange', '', 'orange', '#f08e40'],
      ['purple', '', 'violet', '#9865cc'],
      ['pink', '', 'rose', '#ef9ec1'],
      ['brown', '', 'marron', '#885539'],
      ['black', '', 'noir', '#202328'],
      ['white', '', 'blanc', '#ffffff'],
      ['grey', '', 'gris', '#92969c'],
      ['light blue', '', 'bleu ciel', '#91cef1'],
      ['navy blue', '', 'bleu marine', '#263565'],
      ['beige', '', 'beige', '#dfceb0'],
      ['gold', '', 'doré', '#c4a244'],
      ['silver', '', 'argenté', '#bfc5ce'],
    ],
    sentence: {
      title: 'Mettre une couleur dans une phrase',
      paragraphs: [
        { text: 'La couleur se place **avant** le nom et ne s’accorde **jamais** : a **red** car, two **red** cars.' },
        { text: 'The bag is blue.', say: 'The bag is blue.' },
        { text: 'The bag (le sac) + is (est) + blue (bleu) → Le sac est bleu.' },
        { text: 'What colour is it?', say: 'What colour is it?' },
        { text: 'What (quelle) + colour (couleur) + is it (est-ce) → C’est de quelle couleur ?' },
        { text: 'Pour nuancer : **light** blue (bleu clair), **dark** green (vert foncé). Britannique : colour, grey ; américain : color, gray.' },
      ],
    },
  },
}
