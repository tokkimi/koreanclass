import type { PortalContent } from './types.js'

export const francais: PortalContent = {
  writing: {
    title: 'Alphabet and pronunciation',
    lead: 'Tap a letter to hear its French name. To learn step by step, follow Level 0 — First steps.',
    grids: [
      {
        title: 'The alphabet (26 letters)',
        items: [
          ['A', 'ah'], ['B', 'bay'], ['C', 'say'], ['D', 'day'], ['E', 'uh'], ['F', 'eff'], ['G', 'zhay'], ['H', 'ash'], ['I', 'ee'], ['J', 'zhee'], ['K', 'kah'], ['L', 'ell'], ['M', 'em'],
          ['N', 'en'], ['O', 'oh'], ['P', 'pay'], ['Q', 'kü'], ['R', 'air'], ['S', 'ess'], ['T', 'tay'], ['U', 'ü'], ['V', 'vay'], ['W', 'doo-bluh-vay'], ['X', 'eeks'], ['Y', 'ee-grek'], ['Z', 'zed'],
        ].map(([ch, read]) => [ch, read, undefined, ch.toLowerCase()] as [string, string, string?, string?]),
      },
      {
        title: 'Accents and key sounds',
        items: [
          ['é', 'ay', 'café', 'café'], ['è / ê', 'eh', 'mère', 'mère'], ['ç', 's', 'garçon', 'garçon'], ['u', 'ü', 'rue', 'rue'],
          ['ou', 'oo', 'vous', 'vous'], ['on', 'nasal', 'bonjour', 'bonjour'], ['an / en', 'nasal', 'enfant', 'enfant'], ['r', 'throat r', 'rouge', 'rouge'],
        ],
      },
    ],
    sections: [
      {
        id: 'lettres',
        title: '1. Same letters, different sounds',
        body: 'French uses the same **26 letters** as English, plus **accents**: **é** (acute), **è ê** (grave, circumflex), **ç** (cedilla), **ë ï** (diaeresis). Accents are part of the spelling and often change the sound.\nMost **final consonants are silent**: petit, grand, Paris. The **h** is always silent.',
      },
      {
        id: 'voyelles',
        title: '2. Vowels English doesn’t have',
        body: 'Round your lips more than in English and keep each vowel short and pure.',
        table: {
          head: ['Word', 'Sound', 'Meaning'],
          rows: [
            ['tu', 'u: say « ee » with round lips', 'you'],
            ['vous', 'ou: like « food »', 'you (formal)'],
            ['été', 'é: like « say » without the y', 'summer'],
            ['deux', 'eu: lips round, tongue forward', 'two'],
            ['mère', 'è: like « bed »', 'mother'],
          ],
        },
      },
      {
        id: 'nasales',
        title: '3. Nasal vowels and the French R',
        body: 'When a vowel is followed by **n** or **m** (and no vowel after), the air goes through the nose and the n is **not pronounced**. The French **r** is made at the back of the throat, a bit like gargling softly.',
        table: {
          head: ['Word', 'Sound', 'Meaning'],
          rows: [
            ['bonjour', 'on', 'hello'],
            ['enfant', 'an / en', 'child'],
            ['vin', 'in', 'wine'],
            ['rouge', 'French r', 'red'],
            ['Paris', 'silent s', 'Paris'],
          ],
        },
      },
      {
        id: 'liaison',
        title: '4. Liaison and elision',
        body: '**Liaison:** a silent final consonant is pronounced when the next word starts with a vowel: les‿amis (« lay-zami »), vous‿êtes. **Elision:** le, la, je, ne… lose their vowel before a vowel: **l’**ami, **j’**aime, **c’**est. **Stress** falls lightly on the **last syllable** of a group: un café, s’il vous plaît.',
      },
      {
        id: 'mots',
        title: '5. Reading your first words, step by step',
        body: 'Read syllable by syllable, then say the word in one go.',
        words: [
          ['bonjour', 'bon (nasal) + jour : the r at the back of the throat.', 'hello'],
          ['merci', 'mer + ci : c before i = « s ».', 'thank you'],
          ['garçon', 'ç = « s », on = nasal.', 'boy'],
          ['les amis', 'liaison: « lay-zami ».', 'the friends'],
        ],
      },
    ],
    quizTitle: 'Your turn: recognise letters and sounds',
    quiz: [
      ['Which letter is always silent in French?', 'h', 'r', 'u', 'ç'],
      ['In « petit », the final t is…', 'silent', 'pronounced', 'like d', 'doubled'],
      ['How is « ç » pronounced?', 'like s', 'like k', 'like ch', 'like z'],
      ['How is « é » pronounced?', 'like « say » without the y', 'like « bed »', 'silent', 'like « ee »'],
      ['Which word has a nasal sound?', 'bonjour', 'rue', 'café', 'deux'],
      ['How do you say the letter « E » in French?', 'uh', 'ee', 'ay', 'eh'],
      ['How do you say the letter « I » in French?', 'ee', 'eye', 'ay', 'uh'],
      ['How do you say the letter « J » in French?', 'zhee', 'jay', 'zhay', 'yot'],
      ['How do you say the letter « G » in French?', 'zhay', 'gee', 'zhee', 'gay'],
      ['« les amis » is pronounced with…', 'a liaison: « lay-zami »', 'a silent s and a pause', 'two separate words', 'a stressed « les »'],
      ['« l’ami » is an example of…', 'elision', 'liaison', 'a nasal sound', 'a silent letter'],
      ['Where does the stress usually fall?', 'on the last syllable of a group', 'on the first syllable', 'on every syllable', 'on the article'],
      ['« tu » and « tout » differ by…', 'the vowel u / ou', 'the t', 'nothing', 'the accent'],
      ['The French « r » is made…', 'at the back of the throat', 'with the tip of the tongue', 'with the lips', 'it is silent'],
      ['How many letters in the French alphabet?', '26', '27', '28', '30'],
      ['What does « merci » mean?', 'thank you', 'please', 'hello', 'sorry'],
    ],
    next: [
      ['Sounds and the alphabet', 'fr-0', 'fr-0-1'],
      ['Greetings', 'fr-0', 'fr-0-2'],
      ['Introducing yourself', 'fr-0', 'fr-0-3'],
    ],
  },
  numbers: {
    title: 'Numbers',
    lead: 'French numbers, explained step by step. Read and listen first; the exercises come after.',
    why: {
      title: 'Logical up to 69… then it gets creative',
      paragraphs: [
        'From 0 to 69, French numbers work like English: vingt-deux (22), trente-cinq (35). Note **et un** for 21, 31, 41, 51, 61: vingt **et** un.',
        'Then French counts in twenties: **70 = soixante-dix** (60 + 10), **80 = quatre-vingts** (4 × 20), **90 = quatre-vingt-dix** (4 × 20 + 10). In Belgium and Switzerland you’ll hear septante (70) and nonante (90).',
        'Large numbers use a **space** or a dot (1 000 or 1.000) and decimals use a **comma** (2,5) — the opposite of English!',
      ],
    },
    table: {
      title: 'Listen and learn from 0 to 10',
      head: ['Number', 'French', 'Ordinal'],
      rows: [
        ['0', 'zéro', '—'],
        ['1', 'un', 'premier'],
        ['2', 'deux', 'deuxième'],
        ['3', 'trois', 'troisième'],
        ['4', 'quatre', 'quatrième'],
        ['5', 'cinq', 'cinquième'],
        ['6', 'six', 'sixième'],
        ['7', 'sept', 'septième'],
        ['8', 'huit', 'huitième'],
        ['9', 'neuf', 'neuvième'],
        ['10', 'dix', 'dixième'],
      ],
      note: 'un becomes une before a feminine noun: une pomme. premier becomes première: la première fois.',
    },
    build: {
      title: 'Building a number',
      paragraphs: [
        '**11-16:** onze, douze, treize, quatorze, quinze, seize. **17-19:** dix-sept, dix-huit, dix-neuf. **Tens:** vingt, trente, quarante, cinquante, soixante. **70-99:** soixante-dix, soixante et onze, quatre-vingts, quatre-vingt-un, quatre-vingt-dix, quatre-vingt-dix-neuf.',
        '**Hundreds:** cent, deux cents (but deux cent un). **Thousands:** mille (never « un mille »), deux mille. **Millions:** un million **de** personnes.',
      ],
    },
    sentences: {
      title: 'One sentence, piece by piece',
      items: [
        { text: 'Deux cafés, s’il vous plaît.', explain: 'Deux = two · cafés = coffees · s’il vous plaît = please. → « Two coffees, please. »' },
        { text: 'Il est quinze heures vingt.', explain: 'Il est = it is · quinze heures = 15 h (3 pm) · vingt = twenty (minutes). → « It’s 3:20 pm. »' },
      ],
    },
    units: [
      {
        id: 'age',
        title: 'Saying and asking your age',
        body: 'Age uses **avoir** (to have): **J’ai** 25 **ans**. Never « je suis 25 ». Don’t forget **ans** (years). To ask: **Quel âge as-tu ?** / **Quel âge avez-vous ?**',
        examples: [
          { ko: 'J’ai seize ans.', fr: 'J’ai = I have · seize = 16 · ans = years. → I’m 16.' },
          { ko: 'Quel âge a ton frère ?', fr: 'Quel âge = what age · a ton frère = does your brother have. → How old is your brother?' },
        ],
        qs: [
          ['« I’m 16 »:', 'J’ai seize ans.', 'Je suis seize ans.', 'J’ai seize.', 'Je suis seize.'],
          ['« How old are you? » (tu):', 'Quel âge as-tu ?', 'Combien ans as-tu ?', 'Quel âge es-tu ?', 'Comment vieux es-tu ?'],
          ['21:', 'vingt et un', 'vingt-un', 'vingt-et-une-un', 'deux-un'],
          ['70:', 'soixante-dix', 'septante-dix', 'sept-dix', 'soixante-sept'],
          ['80:', 'quatre-vingts', 'huitante-vingt', 'quatre-dix', 'octante-vingt'],
          ['Which verb is used for age?', 'avoir', 'être', 'faire', 'aller'],
        ],
      },
      {
        id: 'time',
        title: 'Telling the time',
        body: '**Il est** + number + **heure(s)**. Timetables use the **24-hour clock**: 15 h 20 = quinze heures vingt. In conversation: **et quart** (quarter past), **et demie** (half past), **moins le quart** (quarter to), **midi** (noon), **minuit** (midnight).',
        examples: [
          { ko: 'Il est neuf heures cinq.', fr: 'neuf heures cinq = 9:05.' },
          { ko: 'Le train part à dix-huit heures trente.', fr: 'Le train part = the train leaves · à dix-huit heures trente = at 18:30 (6:30 pm).' },
        ],
        qs: [
          ['3:30:', 'trois heures et demie', 'trois heures et demi-heure', 'demie trois heures', 'trois et moitié'],
          ['4:45:', 'cinq heures moins le quart', 'quatre heures moins le quart', 'quatre heures et quart', 'cinq heures et quart'],
          ['12:00 (noon):', 'midi', 'minuit', 'douze heure', 'le midi heure'],
          ['« dix-huit heures » is…', '6 pm', '8 pm', '6 am', '18 minutes'],
          ['« Il est une heure » means…', 'It’s one o’clock.', 'It’s an hour long.', 'It’s one hour ago.', 'It’s time.'],
          ['« Quelle heure est-il ? » asks…', 'the time', 'the date', 'the price', 'the age'],
        ],
      },
      {
        id: 'money',
        title: 'The euro, prices and change',
        body: 'In France: **l’euro** (€) and **les centimes**. 4,50 € is read **quatre euros cinquante**. The € sign goes **after** the number. Remember: **cent** (100), **deux cents** (200) but **deux cent cinquante** (250); **mille** never takes an s.',
        examples: [
          { ko: 'Ça coûte combien ? — Douze euros cinquante.', fr: 'Ça coûte combien = how much is it · douze euros cinquante = €12.50.' },
          { ko: 'Voici votre monnaie.', fr: 'Voici = here is · votre monnaie = your change.' },
        ],
        qs: [
          ['€4.50 is read…', 'quatre euros cinquante', 'quatre euro et cinquante', 'cinquante quatre euros', 'quatre virgule cinquante euro'],
          ['« How much is it? »:', 'Ça coûte combien ?', 'Combien c’est coûte ?', 'Quel prix il coûte ?', 'Comment coûte ?'],
          ['200:', 'deux cents', 'deux cent', 'deux centaines', 'deux-cent-s'],
          ['1,000:', 'mille', 'un mille', 'milles', 'un millier un'],
          ['« la monnaie » in a shop is…', 'the change', 'the money', 'the currency only', 'the till'],
          ['Where does the € sign go in French?', 'after the number', 'before the number', 'in the middle', 'nowhere'],
        ],
      },
      {
        id: 'dates',
        title: 'Dates, phone numbers and years',
        body: 'Dates: **le** + number + month: le 3 mai. Only the 1st uses an ordinal: **le premier** mai. Years are read as a whole number: 2025 = **deux mille vingt-cinq**. Phone numbers are read **in pairs**: 06 12 34 56 78.',
        examples: [
          { ko: 'Mon anniversaire, c’est le quinze juin.', fr: 'le quinze juin = 15 June.' },
          { ko: 'J’habite au troisième étage.', fr: 'J’habite = I live · au troisième étage = on the third floor.' },
        ],
        qs: [
          ['15 June:', 'le quinze juin', 'le quinzième juin', 'juin le quinze', 'quinze de juin'],
          ['1 May:', 'le premier mai', 'le un mai', 'le première mai', 'mai le premier un'],
          ['2025:', 'deux mille vingt-cinq', 'vingt vingt-cinq', 'deux milles vingt-cinq', 'deux mille et vingt-cinq'],
          ['« on the third floor »:', 'au troisième étage', 'au trois étage', 'au troisième étages', 'dans le trois étage'],
          ['French phone numbers are read…', 'in pairs', 'digit by digit only', 'backwards', 'in English'],
          ['« soixante-quinze » is…', '75', '65', '15', '85'],
        ],
      },
    ],
    next: [
      ['Step 1 · lesson + exercises', 'Numbers 0 to 20', 'fr-0', 'fr-0-4'],
      ['Step 2 · lesson + exercises', 'Time and daily routine', 'fr-a1', 'fr-a1-5'],
    ],
  },
  colors: {
    title: 'Colours · les couleurs',
    lead: 'Look at the 16 colours, listen to their names, then practise with the quiz.',
    colors: [
      ['rouge', '', 'red', '#e44654'],
      ['bleu', '', 'blue', '#316bea'],
      ['jaune', '', 'yellow', '#f4d647'],
      ['vert', '', 'green', '#42a96b'],
      ['orange', '', 'orange', '#f08e40'],
      ['violet', '', 'purple', '#9865cc'],
      ['rose', '', 'pink', '#ef9ec1'],
      ['marron', '', 'brown', '#885539'],
      ['noir', '', 'black', '#202328'],
      ['blanc', '', 'white', '#ffffff'],
      ['gris', '', 'grey', '#92969c'],
      ['bleu ciel', '', 'sky blue', '#91cef1'],
      ['bleu marine', '', 'navy blue', '#263565'],
      ['beige', '', 'beige', '#dfceb0'],
      ['doré', '', 'gold', '#c4a244'],
      ['argenté', '', 'silver', '#bfc5ce'],
    ],
    sentence: {
      title: 'Putting a colour in a sentence',
      paragraphs: [
        { text: 'Colours go **after** the noun and **agree**: un sac **vert**, une robe **verte**, des chaussures **vertes**. Colours ending in -e (rouge, jaune, rose) don’t change in the feminine. **marron** and **orange** never change.' },
        { text: 'La voiture est rouge.', say: 'La voiture est rouge.' },
        { text: 'La voiture (the car) + est (is) + rouge (red) → The car is red.' },
        { text: 'C’est de quelle couleur ?', say: 'C’est de quelle couleur ?' },
        { text: 'C’est (it is) + de quelle couleur (of which colour) → What colour is it?' },
        { text: 'Compound colours don’t agree: des yeux **bleu clair** (light blue eyes), une veste **vert foncé** (a dark green jacket).' },
      ],
    },
  },
}
