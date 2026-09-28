import type { Level } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

/** French course, explained in English. */

export const fr0: Level = {
  id: 'fr-0',
  index: 0,
  name: 'Level 0 — First steps',
  korean: 'Premiers pas',
  cefr: 'Pre-A1',
  topik: 'Before DELF A1',
  color: '#5f3dc4',
  description: 'Pronounce French sounds, greet people, introduce yourself, count to 20 and understand masculine and feminine. Everything you need for your very first sentences.',
  lessons: [
    {
      id: 'fr-0-1',
      title: 'Sounds and the alphabet',
      subtitle: 'é · è · u · on · an · in · silent letters',
      duration: 25,
      objectives: ['Pronounce the key French vowels', 'Recognise nasal sounds', 'Know which letters are silent'],
      sections: [
        {
          title: 'Silent letters',
          body: 'Most **final consonants are silent**: petit (« peti »), grand (« gran »), Paris (« Pari »). The **h** is always silent. Final **-e** is usually silent too: une table.\nTip: the consonants **C, R, F, L** (think « CaReFuL ») are often pronounced at the end: parc, mer, neuf, sel.',
          examples: ex(`
            petit | small
            Paris | Paris
            l’hôtel | the hotel
            le parc | the park
          `),
        },
        {
          title: 'Vowels that don’t exist in English',
          table: table(`
            Sound | Example | Meaning
            u (lips round, say « ee ») | tu, rue | you, street
            ou | vous, rouge | you, red
            é | café, été | coffee, summer
            è / ê | mère, fête | mother, party
            eu | deux, bleu | two, blue
          `),
        },
        {
          title: 'Nasal sounds',
          body: 'When a vowel is followed by **n** or **m**, the sound goes through your nose and the n is not pronounced.',
          table: table(`
            Sound | Example | Meaning
            an / en | enfant, France | child, France
            on | bonjour, maison | hello, house
            in / un | vin, un | wine, one
          `),
        },
      ],
      vocab: vocab(`
        bonjour | hello
        rue | street
        vous | you (formal / plural)
        café | coffee
        deux | two
        vin | wine
        enfant | child
        maison | house
      `),
      exercises: [
        qcm('In « petit », the final t is…', 'silent', ['pronounced', 'pronounced like d', 'doubled']),
        qcm('Which word has a nasal sound?', 'bonjour', ['rue', 'café', 'deux']),
        qcm('The French h is…', 'always silent', ['breathed like in English', 'like a French r', 'pronounced at the start of words']),
        qcm('« rue » and « roue » differ by…', 'the vowel u / ou', ['the r', 'nothing', 'the final e']),
        match('Match', [['vin', 'wine'], ['rue', 'street'], ['enfant', 'child'], ['maison', 'house']]),
        type('Write the French word for « coffee »', 'café'),
      ],
    },
    {
      id: 'fr-0-2',
      title: 'Greetings and politeness',
      subtitle: 'Bonjour · Salut · Ça va ? · Merci · Au revoir',
      duration: 20,
      objectives: ['Greet people at any time of day', 'Choose between tu and vous', 'Say thank you and goodbye'],
      sections: [
        {
          title: 'Greetings',
          table: table(`
            French | Meaning | When
            Bonjour | Hello / good morning | all day, always polite
            Bonsoir | Good evening | from about 6 pm
            Salut | Hi / bye | with friends
            Au revoir | Goodbye | when leaving
            Bonne nuit | Good night | before bed
            À bientôt | See you soon | when leaving
          `),
          tip: 'In France, **always say « Bonjour »** when you enter a shop or talk to a stranger. Skipping it is considered rude!',
        },
        {
          title: 'Tu or vous?',
          body: '**tu** = informal « you » (friends, family, children). **vous** = polite « you » (strangers, older people, at work) **and** plural « you ». When in doubt, use **vous**.',
          examples: ex(`
            Ça va ? — Ça va bien, merci. | How are you? — I’m fine, thanks.
            Comment allez-vous ? | How are you? (formal)
            Merci beaucoup. — De rien. | Thank you very much. — You’re welcome.
            S’il vous plaît. / S’il te plaît. | Please. (formal / informal)
            Excusez-moi. / Pardon. | Excuse me. / Sorry.
          `),
        },
      ],
      vocab: vocab(`
        bonjour | hello
        bonsoir | good evening
        salut | hi (informal)
        au revoir | goodbye
        merci | thank you
        de rien | you’re welcome
        s’il vous plaît | please (formal)
        pardon | sorry, excuse me
      `),
      dialogue: dlg(`
        Claire: Bonjour Monsieur ! Comment allez-vous ? | Hello sir! How are you?
        M. Martin: Très bien, merci. Et vous ? | Very well, thank you. And you?
        Claire: Bien, merci. Au revoir ! | Fine, thanks. Goodbye!
        M. Martin: Au revoir, bonne journée ! | Goodbye, have a nice day!
      `),
      exercises: [
        qcm('You enter a bakery. You say…', 'Bonjour !', ['Salut !', 'Bonne nuit !', 'De rien !']),
        qcm('How do you say « you’re welcome »?', 'De rien.', ['Merci.', 'Pardon.', 'S’il vous plaît.']),
        qcm('Which « you » do you use with your boss?', 'vous', ['tu', 'te', 'toi']),
        qcm('« À bientôt » means…', 'See you soon', ['Good morning', 'Thank you', 'Good night']),
        match('Match', [['merci', 'thank you'], ['au revoir', 'goodbye'], ['bonsoir', 'good evening'], ['salut', 'hi']]),
        order('Put in order: « How are you? » (formal)', 'Comment allez-vous ?', 'How are you?'),
      ],
    },
    {
      id: 'fr-0-3',
      title: 'Introducing yourself',
      subtitle: 'Je m’appelle… · Je suis… · J’ai… ans',
      duration: 25,
      objectives: ['Say your name, nationality and age', 'Ask the same questions'],
      sections: [
        {
          title: 'Key sentences',
          examples: ex(`
            Comment tu t’appelles ? | What’s your name?
            Je m’appelle Emma. | My name is Emma.
            Je suis anglaise. | I’m English. (female)
            J’habite à Londres. | I live in London.
            J’ai vingt-cinq ans. | I’m twenty-five.
            Enchanté ! / Enchantée ! | Nice to meet you!
          `),
          tip: 'Age uses **avoir** (to have) in French: **J’ai** 25 ans, literally « I have 25 years ».',
        },
        {
          title: 'Nationalities agree with you',
          body: 'Add **-e** for a woman: anglais → anglais**e**, américain → américain**e**. Nationalities take **no capital letter** in French: je suis **a**nglais.',
          table: table(`
            Masculine | Feminine | Meaning
            anglais | anglaise | English
            américain | américaine | American
            canadien | canadienne | Canadian
            espagnol | espagnole | Spanish
          `),
        },
      ],
      vocab: vocab(`
        je m’appelle | my name is
        je suis | I am
        j’ai… ans | I am… years old
        j’habite à | I live in
        enchanté(e) | nice to meet you
        anglais / anglaise | English
        étudiant / étudiante | student
        où | where
      `),
      dialogue: dlg(`
        Lucas: Salut ! Je m’appelle Lucas. Et toi ? | Hi! My name is Lucas. And you?
        Emma: Moi, c’est Emma. Je suis anglaise. | I’m Emma. I’m English.
        Lucas: Enchanté ! Tu habites où ? | Nice to meet you! Where do you live?
        Emma: J’habite à Lyon. | I live in Lyon.
      `),
      exercises: [
        qcm('« I’m 30 » in French:', 'J’ai trente ans.', ['Je suis trente ans.', 'J’ai trente.', 'Je suis trente.']),
        qcm('A woman from England says…', 'Je suis anglaise.', ['Je suis anglais.', 'Je suis Anglaise.', 'Je suis Angleterre.']),
        qcm('« J’habite à Paris » means…', 'I live in Paris.', ['I’m from Paris.', 'I love Paris.', 'I’m going to Paris.']),
        order('Put in order: « My name is Emma. »', 'Je m’appelle Emma.', 'My name is Emma.'),
        type('Complete: Je m’___ Lucas.', 'appelle'),
        match('Match', [['je suis', 'I am'], ['j’ai', 'I have'], ['j’habite', 'I live'], ['je m’appelle', 'my name is']]),
      ],
    },
    {
      id: 'fr-0-4',
      title: 'Numbers 0 to 20',
      subtitle: 'zéro · un · deux · trois …',
      duration: 20,
      objectives: ['Count from 0 to 20', 'Give a phone number'],
      sections: [
        {
          title: 'From 0 to 20',
          table: table(`
            French | Number
            zéro | 0
            un | 1
            deux | 2
            trois | 3
            quatre | 4
            cinq | 5
            six | 6
            sept | 7
            huit | 8
            neuf | 9
            dix | 10
            onze | 11
            douze | 12
            treize | 13
            quinze | 15
            seize | 16
            dix-sept | 17
            vingt | 20
          `),
          tip: 'French phone numbers are read **in pairs**: 06 12 34 56 78 → « zéro six, douze, trente-quatre, cinquante-six, soixante-dix-huit ».',
        },
      ],
      vocab: vocab(`
        un | one
        deux | two
        trois | three
        cinq | five
        dix | ten
        douze | twelve
        seize | sixteen
        vingt | twenty
      `),
      exercises: [
        qcm('How do you say 7?', 'sept', ['six', 'cette', 'seize']),
        qcm('How do you say 16?', 'seize', ['six', 'dix-six', 'soixante']),
        qcm('« quatorze » =', '14', ['4', '40', '24']),
        match('Match', [['trois', '3'], ['huit', '8'], ['onze', '11'], ['vingt', '20']]),
        type('Write in letters: 2', 'deux'),
        type('Write in letters: 17', ['dix-sept', 'dix sept']),
      ],
    },
    {
      id: 'fr-0-5',
      title: 'Gender and articles',
      subtitle: 'le · la · les · un · une · des',
      duration: 25,
      objectives: ['Understand masculine and feminine', 'Use definite and indefinite articles', 'Form the plural'],
      sections: [
        {
          title: 'Every noun has a gender',
          body: 'In French, every noun is **masculine or feminine**. Learn each word **with its article**: **le** livre (the book), **la** table (the table). Before a vowel or silent h: **l’** (l’ami, l’hôtel).',
          table: table(`
            Masculine | Feminine | Plural | Meaning
            le | la | les | the
            un | une | des | a / some
          `),
        },
        {
          title: 'Plural and helpful endings',
          body: 'Plural: usually add **-s** (silent!): le chat → les chats. Words ending in **-tion, -té, -ette** are usually feminine; words ending in **-ment, -age, -eau** are usually masculine.',
          examples: ex(`
            un livre, des livres | a book, (some) books
            la nation | the nation
            le fromage | the cheese
            le bateau | the boat
          `),
        },
      ],
      vocab: vocab(`
        le livre | the book
        la table | the table
        l’ami / l’amie | the friend
        le fromage | the cheese
        la voiture | the car
        le bateau | the boat
        la chambre | the bedroom
        les enfants | the children
      `),
      exercises: [
        qcm('Which article for « fromage »?', 'le', ['la', 'l’', 'une']),
        qcm('Which article for « nation »?', 'la', ['le', 'un', 'les']),
        qcm('« un livre » in the plural:', 'des livres', ['les livre', 'uns livres', 'des livre']),
        qcm('Before « hôtel » we write…', 'l’', ['le', 'la', 'un’']),
        type('Complete with the definite article: ___ voiture', 'la'),
        match('Match', [['le bateau', 'the boat'], ['la chambre', 'the bedroom'], ['le livre', 'the book'], ['les enfants', 'the children']]),
      ],
    },
  ],
  test: [
    qcm('In « grand », the final d is…', 'silent', ['pronounced', 'pronounced like t', 'doubled']),
    qcm('You enter a shop. You say…', 'Bonjour !', ['Salut !', 'Au revoir !', 'Bonne nuit !']),
    qcm('Polite « please »:', 's’il vous plaît', ['s’il te plaît', 'merci', 'de rien']),
    qcm('« I’m 20 years old »:', 'J’ai vingt ans.', ['Je suis vingt ans.', 'J’ai vingt.', 'Je suis vingt.']),
    qcm('How do you say 12?', 'douze', ['deux', 'dix-deux', 'treize']),
    qcm('Which article for « table »?', 'la', ['le', 'un', 'l’']),
    qcm('A woman from America says…', 'Je suis américaine.', ['Je suis américain.', 'Je suis Américaine.', 'Je suis Amérique.']),
    match('Match', [['merci', 'thank you'], ['de rien', 'you’re welcome'], ['pardon', 'sorry'], ['au revoir', 'goodbye']]),
    match('Match', [['cinq', '5'], ['neuf', '9'], ['quinze', '15'], ['vingt', '20']]),
    order('Put in order: « I live in London. »', 'J’habite à Londres.', 'I live in London.'),
    type('Write in letters: 10', 'dix'),
    type('Plural of « le chat »', 'les chats'),
  ],
}

export const frA1: Level = {
  id: 'fr-a1',
  index: 1,
  name: 'Level 1 — Beginner',
  korean: 'Débutant',
  cefr: 'A1',
  topik: 'DELF A1',
  color: '#4c3bb3',
  description: 'Use être and avoir, conjugate -er verbs and key irregular verbs, make negative sentences and questions, tell the time and describe your daily routine.',
  lessons: [
    {
      id: 'fr-a1-1',
      title: 'Être and avoir',
      subtitle: 'je suis · tu es · j’ai · tu as',
      duration: 25,
      objectives: ['Conjugate être (to be) and avoir (to have)', 'Know the expressions that use avoir'],
      sections: [
        {
          title: 'The two most important verbs',
          table: table(`
            Pronoun | être (to be) | avoir (to have)
            je / j’ | suis | ai
            tu | es | as
            il / elle / on | est | a
            nous | sommes | avons
            vous | êtes | avez
            ils / elles | sont | ont
          `),
          tip: '**on** is very common in spoken French and means « we »: **On** est prêts ? (Are we ready?)',
        },
        {
          title: 'Expressions with avoir',
          body: 'Where English uses « to be », French often uses **avoir**:',
          examples: ex(`
            J’ai faim. | I’m hungry.
            J’ai soif. | I’m thirsty.
            J’ai froid / chaud. | I’m cold / hot.
            Tu as raison. | You’re right.
            Il a peur. | He’s scared.
          `),
        },
      ],
      vocab: vocab(`
        avoir faim | to be hungry
        avoir soif | to be thirsty
        avoir froid | to be cold
        avoir raison | to be right
        avoir peur | to be scared
        fatigué(e) | tired
        content(e) | happy
        prêt(e) | ready
      `),
      exercises: [
        qcm('nous + être:', 'sommes', ['sont', 'êtes', 'avons']),
        qcm('ils + avoir:', 'ont', ['sont', 'avons', 'a']),
        qcm('« I’m hungry »:', 'J’ai faim.', ['Je suis faim.', 'Je suis affamé faim.', 'J’ai soif.']),
        qcm('« You’re right » (informal):', 'Tu as raison.', ['Tu es raison.', 'Tu es droit.', 'Tu as droit.']),
        type('Complete: Vous ___ français ? (être)', 'êtes'),
        order('Put in order: « We are ready. »', 'Nous sommes prêts.', 'We are ready.'),
      ],
    },
    {
      id: 'fr-a1-2',
      title: 'Present tense: -er verbs',
      subtitle: 'parler · aimer · habiter',
      duration: 30,
      objectives: ['Conjugate regular -er verbs', 'Know which endings are silent'],
      sections: [
        {
          title: 'The pattern',
          body: '90 % of French verbs end in **-er** and follow this pattern. Remove -er and add the endings. The endings **-e, -es, -ent are silent**: je parle, tu parles, ils parlent all sound the same!',
          table: table(`
            Pronoun | parler (to speak) | aimer (to like / love)
            je / j’ | parle | aime
            tu | parles | aimes
            il / elle | parle | aime
            nous | parlons | aimons
            vous | parlez | aimez
            ils / elles | parlent | aiment
          `),
        },
        {
          title: 'In context',
          examples: ex(`
            Je parle un peu français. | I speak a little French.
            Tu aimes le chocolat ? | Do you like chocolate?
            Nous habitons à Nice. | We live in Nice.
            Elles travaillent le samedi. | They work on Saturdays.
          `),
          tip: 'French has only **one present tense**: « je parle » = I speak **and** I am speaking.',
        },
      ],
      vocab: vocab(`
        parler | to speak
        aimer | to like, to love
        habiter | to live
        travailler | to work
        manger | to eat
        regarder | to watch
        écouter | to listen
        un peu | a little
      `),
      dialogue: dlg(`
        Julie: Tu parles anglais ? | Do you speak English?
        Tom: Oui, et je parle un peu français. | Yes, and I speak a little French.
        Julie: Tu aimes la France ? | Do you like France?
        Tom: J’adore ! J’habite à Paris maintenant. | I love it! I live in Paris now.
      `),
      exercises: [
        qcm('nous + parler:', 'parlons', ['parlez', 'parlent', 'parlonts']),
        qcm('vous + aimer:', 'aimez', ['aimons', 'aimes', 'aiment']),
        qcm('Which endings are silent?', '-e, -es, -ent', ['-ons, -ez', '-ez, -ent', 'none']),
        qcm('« Je mange » can mean…', 'I eat / I am eating', ['I ate', 'I will eat', 'I have eaten']),
        type('Conjugate: ils ___ (travailler)', 'travaillent'),
        order('Put in order: « We live in Nice. »', 'Nous habitons à Nice.', 'We live in Nice.'),
      ],
    },
    {
      id: 'fr-a1-3',
      title: 'Essential irregular verbs',
      subtitle: 'aller · faire · vouloir · pouvoir',
      duration: 35,
      objectives: ['Conjugate 4 key irregular verbs', 'Use aller + place and faire + activity'],
      sections: [
        {
          title: 'Four verbs you use every day',
          table: table(`
            Pronoun | aller (go) | faire (do) | vouloir (want) | pouvoir (can)
            je | vais | fais | veux | peux
            tu | vas | fais | veux | peux
            il / elle | va | fait | veut | peut
            nous | allons | faisons | voulons | pouvons
            vous | allez | faites | voulez | pouvez
            ils / elles | vont | font | veulent | peuvent
          `),
        },
        {
          title: 'Useful structures',
          examples: ex(`
            Je vais au cinéma. | I’m going to the cinema.
            Je fais du sport. | I do sport.
            Je voudrais un café, s’il vous plaît. | I would like a coffee, please.
            Tu peux m’aider ? | Can you help me?
          `),
          tip: '**à + le = au**, **à + les = aux**: je vais **au** marché, **aux** États-Unis. « Je voudrais » (I would like) is more polite than « je veux ».',
        },
      ],
      vocab: vocab(`
        aller | to go
        faire | to do, to make
        vouloir | to want
        pouvoir | can, to be able
        je voudrais | I would like
        le marché | the market
        la plage | the beach
        aider | to help
      `),
      exercises: [
        qcm('je + aller:', 'vais', ['vas', 'va', 'allons']),
        qcm('vous + faire:', 'faites', ['faisez', 'fez', 'font']),
        qcm('ils + vouloir:', 'veulent', ['voulent', 'veuent', 'voulons']),
        qcm('« Je vais ___ cinéma »', 'au', ['à le', 'à la', 'aux']),
        type('Conjugate: nous ___ (pouvoir)', 'pouvons'),
        order('Put in order: « I would like a coffee. »', 'Je voudrais un café.', 'I would like a coffee.'),
      ],
    },
    {
      id: 'fr-a1-4',
      title: 'Negatives and questions',
      subtitle: 'ne… pas · est-ce que · qu’est-ce que',
      duration: 30,
      objectives: ['Make a sentence negative', 'Ask questions in three ways'],
      sections: [
        {
          title: 'ne… pas',
          body: 'Put **ne** before the verb and **pas** after it. ne → **n’** before a vowel. In spoken French, the ne is often dropped: « Je sais pas ».',
          examples: ex(`
            Je ne parle pas espagnol. | I don’t speak Spanish.
            Il n’aime pas le café. | He doesn’t like coffee.
            Je ne mange jamais de viande. | I never eat meat.
            Il n’y a plus de pain. | There’s no more bread.
          `),
        },
        {
          title: 'Three ways to ask',
          table: table(`
            Style | Example | Register
            Tu viens ? | rising intonation | informal
            Est-ce que tu viens ? | add est-ce que | neutral
            Viens-tu ? | inversion | formal
          `),
          examples: ex(`
            Où est la gare ? | Where is the station?
            Qu’est-ce que tu fais ? | What are you doing?
            Pourquoi tu ris ? | Why are you laughing?
            Combien ça coûte ? | How much is it?
          `),
        },
      ],
      vocab: vocab(`
        ne… pas | not
        ne… jamais | never
        ne… plus | no longer, no more
        où | where
        quand | when
        pourquoi | why
        combien | how much, how many
        qu’est-ce que | what
      `),
      exercises: [
        qcm('« I don’t like tea »:', 'Je n’aime pas le thé.', ['Je ne aime pas le thé.', 'Je n’aime le thé pas.', 'Je pas aime le thé.']),
        qcm('« I never eat meat »:', 'Je ne mange jamais de viande.', ['Je mange ne jamais viande.', 'Je ne jamais mange de viande.', 'Je ne mange pas jamais viande.']),
        qcm('Which question is neutral (neither slang nor very formal)?', 'Est-ce que tu viens ?', ['Tu viens ?', 'Viens-tu ?', 'Venez-vous donc ?']),
        qcm('« Combien ça coûte ? » means…', 'How much is it?', ['When is it?', 'Why is it?', 'Where is it?']),
        match('Match', [['où', 'where'], ['quand', 'when'], ['pourquoi', 'why'], ['combien', 'how much']]),
        type('Make it negative: Je parle. → Je ne parle ___.', 'pas'),
      ],
    },
    {
      id: 'fr-a1-5',
      title: 'Time and daily routine',
      subtitle: 'Quelle heure est-il ? · je me lève · je me couche',
      duration: 30,
      objectives: ['Tell the time', 'Use reflexive verbs', 'Describe your day'],
      sections: [
        {
          title: 'Telling the time',
          examples: ex(`
            Quelle heure est-il ? | What time is it?
            Il est huit heures. | It’s eight o’clock.
            Il est deux heures et demie. | It’s half past two.
            Il est cinq heures moins le quart. | It’s quarter to five.
            à midi / à minuit | at noon / at midnight
          `),
          tip: 'Timetables use the **24-hour clock**: le train part à **18 h 30**.',
        },
        {
          title: 'Reflexive verbs',
          body: 'Many daily actions use a reflexive pronoun: **se lever** (to get up) → je **me** lève, tu **te** lèves, il **se** lève, nous **nous** levons, vous **vous** levez, ils **se** lèvent.',
          examples: ex(`
            Je me lève à sept heures. | I get up at seven.
            Je me douche et je prends mon petit-déjeuner. | I shower and have breakfast.
            Le soir, je me couche à onze heures. | In the evening, I go to bed at eleven.
          `),
        },
      ],
      vocab: vocab(`
        se lever | to get up
        se doucher | to shower
        se coucher | to go to bed
        le petit-déjeuner | breakfast
        le déjeuner | lunch
        le dîner | dinner
        lundi | Monday
        le week-end | the weekend
      `),
      exercises: [
        qcm('« It’s half past two »:', 'Il est deux heures et demie.', ['Il est deux et demie heures.', 'Il est demi deux heures.', 'C’est deux heures demie.']),
        qcm('« I go to bed »:', 'Je me couche.', ['Je couche.', 'Je me couché.', 'Je te couche.']),
        qcm('nous + se lever:', 'nous nous levons', ['nous se levons', 'nous levons', 'nous nous lève']),
        qcm('« le déjeuner » is…', 'lunch', ['breakfast', 'dinner', 'a snack']),
        type('Complete: Je ___ lève à sept heures.', 'me'),
        match('Match', [['lundi', 'Monday'], ['midi', 'noon'], ['minuit', 'midnight'], ['le dîner', 'dinner']]),
      ],
    },
  ],
  test: [
    qcm('vous + être:', 'êtes', ['estes', 'sommes', 'avez']),
    qcm('« I’m thirsty »:', 'J’ai soif.', ['Je suis soif.', 'J’ai faim.', 'Je suis soiffé.']),
    qcm('ils + parler:', 'parlent', ['parlons', 'parlez', 'parle']),
    qcm('tu + aller:', 'vas', ['vais', 'va', 'allez']),
    qcm('« I’m going to the market »:', 'Je vais au marché.', ['Je vais à le marché.', 'Je vais à marché.', 'Je va au marché.']),
    qcm('« He doesn’t work »:', 'Il ne travaille pas.', ['Il ne pas travaille.', 'Il travaille ne pas.', 'Il n’travaille.']),
    qcm('« Qu’est-ce que tu fais ? » means…', 'What are you doing?', ['Where are you?', 'Who are you?', 'Why are you here?']),
    qcm('« Il est six heures moins le quart » =', '5:45', ['6:15', '6:45', '5:15']),
    match('Match', [['faire', 'to do'], ['vouloir', 'to want'], ['pouvoir', 'can'], ['aller', 'to go']]),
    order('Put in order: « I don’t speak Spanish. »', 'Je ne parle pas espagnol.', 'I don’t speak Spanish.'),
    type('Conjugate: je ___ (faire)', 'fais'),
    type('Conjugate: nous ___ (avoir)', 'avons'),
  ],
}
