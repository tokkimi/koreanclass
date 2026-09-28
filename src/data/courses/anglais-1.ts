import type { Level } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

export const en0: Level = {
  id: 'en-0',
  index: 0,
  name: 'Niveau 0 — Premiers pas',
  korean: 'First steps',
  cefr: 'Pré-A1',
  topik: 'Avant le niveau A1',
  color: '#1c7ed6',
  description: 'Prononcer les sons clés de l’anglais, saluer, te présenter, compter et utiliser a / an / the. Tes toutes premières phrases en anglais.',
  lessons: [
    {
      id: 'en-0-1',
      title: 'L’alphabet et les sons',
      subtitle: 'A B C · th · h · voyelles longues',
      duration: 25,
      objectives: ['Épeler en anglais', 'Prononcer th et h', 'Distinguer voyelles courtes et longues'],
      sections: [
        {
          title: 'Épeler : les lettres pièges',
          table: table(`
            Lettre | Se dit comme
            A | « éi »
            E | « i »
            I | « aï »
            G | « dji »
            J | « djéi »
            R | « ar »
            W | « double-you »
            Y | « ouaï »
          `),
          tip: 'Épeler son nom est un classique au téléphone : « Martin, M-A-R-T-I-N ».',
        },
        {
          title: 'Les sons qui n’existent pas en français',
          body: '**th** : langue entre les dents (**think**, **the**). **h** : toujours soufflé (**house**, **hello**). **Voyelles longues / courtes** : ship (court) ≠ sheep (long).',
          examples: ex(`
            think | penser
            the | le, la, les
            house | maison
            ship / sheep | bateau / mouton
            live / leave | vivre / partir
          `),
        },
      ],
      vocab: vocab(`
        hello | bonjour
        name | nom, prénom
        spell | épeler
        think | penser
        house | maison
        ship | bateau
        sheep | mouton
        leave | partir
      `),
      exercises: [
        qcm('Comment se dit la lettre « I » en anglais ?', '« aï »', ['« i »', '« éi »', '« ouaï »']),
        qcm('Comment se dit la lettre « E » ?', '« i »', ['« e »', '« aï »', '« éi »']),
        qcm('Pour prononcer « th », on met…', 'la langue entre les dents', ['les lèvres en rond', 'la langue au palais', 'rien : il est muet']),
        qcm('Le « h » de « house » est…', 'soufflé', ['muet', 'roulé', 'comme un r']),
        match('Associe', [['ship', 'bateau'], ['sheep', 'mouton'], ['live', 'vivre'], ['leave', 'partir']]),
        type('Traduis : « maison »', 'house'),
      ],
    },
    {
      id: 'en-0-2',
      title: 'Saluer et être poli',
      subtitle: 'Hello · Good morning · How are you? · Thank you',
      duration: 20,
      objectives: ['Saluer selon le moment', 'Demander comment ça va', 'Remercier et s’excuser'],
      sections: [
        {
          title: 'Les salutations',
          table: table(`
            Anglais | Sens | Quand
            Hello / Hi | Bonjour / Salut | toujours
            Good morning | Bonjour | le matin
            Good afternoon | Bon après-midi | l’après-midi
            Good evening | Bonsoir | le soir (arrivée)
            Good night | Bonne nuit | en partant le soir
            Goodbye / Bye | Au revoir | départ
            See you! | À plus ! | départ
          `),
        },
        {
          title: 'La politesse',
          examples: ex(`
            How are you? | Comment vas-tu / allez-vous ?
            I’m fine, thanks. And you? | Bien, merci. Et toi ?
            Please. | S’il te plaît / s’il vous plaît.
            Thank you. You’re welcome. | Merci. De rien.
            Sorry! / Excuse me. | Pardon ! / Excusez-moi.
          `),
          tip: '**Excuse me** pour attirer l’attention, **Sorry** pour s’excuser d’une erreur.',
        },
      ],
      vocab: vocab(`
        good morning | bonjour (matin)
        good evening | bonsoir
        good night | bonne nuit
        goodbye | au revoir
        please | s’il vous plaît
        thank you | merci
        you’re welcome | de rien
        sorry | pardon, désolé
      `),
      dialogue: dlg(`
        Emma: Hi! How are you? | Salut ! Comment ça va ?
        Paul: I’m fine, thanks. And you? | Bien, merci. Et toi ?
        Emma: Very well. See you later! | Très bien. À plus tard !
        Paul: Bye! | Salut !
      `),
      exercises: [
        qcm('À 22 h, en partant, tu dis…', 'Good night', ['Good morning', 'Good afternoon', 'Good evening']),
        qcm('Réponse à « Thank you » :', 'You’re welcome.', ['Please.', 'Sorry.', 'Excuse me.']),
        qcm('Pour attirer l’attention d’un inconnu :', 'Excuse me.', ['Sorry.', 'Goodbye.', 'Thank you.']),
        order('Remets dans l’ordre : « Comment vas-tu ? »', 'How are you?', 'Comment vas-tu ?'),
        match('Associe', [['please', 's’il vous plaît'], ['thank you', 'merci'], ['sorry', 'pardon'], ['goodbye', 'au revoir']]),
        type('Traduis : « bonjour » (le matin)', 'good morning'),
      ],
    },
    {
      id: 'en-0-3',
      title: 'Se présenter',
      subtitle: 'My name is… · I’m from… · I’m … years old',
      duration: 25,
      objectives: ['Dire son nom, sa nationalité, son âge', 'Poser les mêmes questions'],
      sections: [
        {
          title: 'Les phrases clés',
          examples: ex(`
            What’s your name? | Comment t’appelles-tu ?
            My name is Léa. / I’m Léa. | Je m’appelle Léa.
            Where are you from? | D’où viens-tu ?
            I’m from France. I’m French. | Je viens de France. Je suis français(e).
            How old are you? | Quel âge as-tu ?
            I’m twenty (years old). | J’ai vingt ans.
            Nice to meet you! | Enchanté(e) !
          `),
          tip: 'Attention : l’âge se dit avec **to be** (être) : I **am** 20, jamais « I have 20 ».',
        },
        {
          title: 'Pays et nationalités',
          table: table(`
            Pays | Nationalité
            France | French
            England | English
            Spain | Spanish
            the United States | American
            Germany | German
          `),
          body: 'Les nationalités prennent **toujours une majuscule** en anglais : I’m **F**rench.',
        },
      ],
      vocab: vocab(`
        my name is | je m’appelle
        I’m from | je viens de
        French | français(e)
        English | anglais(e)
        years old | ans (âge)
        nice to meet you | enchanté(e)
        student | étudiant(e)
        where | où
      `),
      dialogue: dlg(`
        Jack: Hi, I’m Jack. What’s your name? | Salut, je suis Jack. Comment t’appelles-tu ?
        Léa: My name is Léa. I’m from Paris. | Je m’appelle Léa. Je viens de Paris.
        Jack: Nice to meet you, Léa! | Enchanté, Léa !
      `),
      exercises: [
        qcm('« J’ai 25 ans » :', 'I’m 25.', ['I have 25.', 'I have 25 years.', 'I’m 25 years.']),
        qcm('« Je suis français » :', 'I’m French.', ['I’m french.', 'I’m France.', 'I’m from French.']),
        qcm('« Where are you from? » veut dire…', 'D’où viens-tu ?', ['Où es-tu ?', 'Où vas-tu ?', 'Qui es-tu ?']),
        order('Remets dans l’ordre : « Comment t’appelles-tu ? »', 'What’s your name?', 'Comment t’appelles-tu ?'),
        match('Associe', [['Spain', 'Spanish'], ['England', 'English'], ['Germany', 'German'], ['France', 'French']]),
        type('Complète : Nice to ___ you!', 'meet'),
      ],
    },
    {
      id: 'en-0-4',
      title: 'Les nombres',
      subtitle: 'one · two · thirteen · thirty',
      duration: 20,
      objectives: ['Compter jusqu’à 100', 'Distinguer 13 / 30, 14 / 40'],
      sections: [
        {
          title: 'De 1 à 20',
          table: table(`
            Anglais | Nombre
            one | 1
            two | 2
            three | 3
            four | 4
            five | 5
            six | 6
            seven | 7
            eight | 8
            nine | 9
            ten | 10
            eleven | 11
            twelve | 12
            thirteen | 13
            fifteen | 15
            twenty | 20
          `),
        },
        {
          title: 'Les dizaines et le piège -teen / -ty',
          body: '**thir-TEEN** (13) : accent sur la fin, son long. **THIR-ty** (30) : accent au début. Dizaines : twenty, thirty, forty (sans u !), fifty, sixty, seventy, eighty, ninety, one hundred.',
          examples: ex(`
            thirteen / thirty | 13 / 30
            fourteen / forty | 14 / 40
            twenty-five | 25
            one hundred | 100
          `),
        },
      ],
      vocab: vocab(`
        one | un
        three | trois
        eight | huit
        twelve | douze
        thirteen | treize
        thirty | trente
        forty | quarante
        hundred | cent
      `),
      exercises: [
        qcm('Comment dit-on 12 ?', 'twelve', ['twenty', 'eleven', 'two-teen']),
        qcm('« forty » =', '40', ['14', '4', '44']),
        qcm('Quelle orthographe est correcte pour 40 ?', 'forty', ['fourty', 'fourtee', 'fortee']),
        match('Associe', [['thirteen', '13'], ['thirty', '30'], ['fifteen', '15'], ['fifty', '50']]),
        type('Écris en lettres : 8', 'eight'),
        type('Écris en lettres : 25', ['twenty-five', 'twenty five']),
      ],
    },
    {
      id: 'en-0-5',
      title: 'Les articles et le pluriel',
      subtitle: 'a · an · the · cats · children',
      duration: 20,
      objectives: ['Choisir entre a et an', 'Utiliser the', 'Former le pluriel'],
      sections: [
        {
          title: 'a, an, the',
          body: 'Pas de genre en anglais ! **a** devant un son consonne (a cat), **an** devant un son voyelle (an apple, an hour — h muet). **the** = le, la, les.',
          examples: ex(`
            a book | un livre
            an apple | une pomme
            an hour | une heure
            a university | une université (son « you »)
            the sun | le soleil
          `),
        },
        {
          title: 'Le pluriel',
          body: 'En général **+s** (cat → cats). Après s, sh, ch, x : **+es** (bus → buses, watch → watches). Irréguliers : man → **men**, woman → **women**, child → **children**, person → **people**, foot → **feet**.',
        },
      ],
      vocab: vocab(`
        book | livre
        apple | pomme
        hour | heure
        child / children | enfant / enfants
        man / men | homme / hommes
        woman / women | femme / femmes
        person / people | personne / gens
        watch | montre
      `),
      exercises: [
        qcm('Quel article devant « apple » ?', 'an', ['a', 'the a', 'one an']),
        qcm('Quel article devant « hour » ?', 'an', ['a', 'the an', 'aucun']),
        qcm('Pluriel de « child » ?', 'children', ['childs', 'childes', 'childrens']),
        qcm('Pluriel de « watch » ?', 'watches', ['watchs', 'watch', 'watchies']),
        type('Pluriel de « woman »', 'women'),
        match('Associe', [['man', 'men'], ['foot', 'feet'], ['person', 'people'], ['bus', 'buses']]),
      ],
    },
  ],
  test: [
    qcm('Comment se dit la lettre « A » ?', '« éi »', ['« a »', '« aï »', '« i »']),
    qcm('Réponse à « How are you? » :', 'I’m fine, thanks.', ['I’m 20.', 'I’m from Paris.', 'You’re welcome.']),
    qcm('« Quel âge as-tu ? » :', 'How old are you?', ['How are you?', 'What age have you?', 'How many years you have?']),
    qcm('« Je suis espagnol » :', 'I’m Spanish.', ['I’m Spain.', 'I’m spanish.', 'I have Spanish.']),
    qcm('« fourteen » =', '14', ['40', '4', '44']),
    qcm('Quel article devant « university » ?', 'a', ['an', 'aucun', 'the an']),
    qcm('Pluriel de « foot » ?', 'feet', ['foots', 'feets', 'footes']),
    match('Associe', [['good morning', 'bonjour (matin)'], ['good night', 'bonne nuit'], ['sorry', 'pardon'], ['please', 's’il vous plaît']]),
    match('Associe', [['three', '3'], ['seven', '7'], ['eleven', '11'], ['twenty', '20']]),
    order('Remets dans l’ordre : « Je viens de France. »', 'I’m from France.', 'Je viens de France.'),
    type('Écris en lettres : 30', 'thirty'),
    type('Pluriel de « child »', 'children'),
  ],
}

export const enA1: Level = {
  id: 'en-a1',
  index: 1,
  name: 'Niveau 1 — Débutant',
  korean: 'Beginner',
  cefr: 'A1',
  topik: 'Cambridge A1 · TOEIC 120+',
  color: '#1971c2',
  description: 'Conjuguer to be, le présent simple et le présent continu, parler de ce que tu as et de ce qu’il y a, et situer dans le temps avec in, on, at.',
  lessons: [
    {
      id: 'en-a1-1',
      title: 'Le verbe to be',
      subtitle: 'I am · you are · he is · isn’t',
      duration: 25,
      objectives: ['Conjuguer to be', 'Faire des phrases négatives et des questions'],
      sections: [
        {
          title: 'Conjugaison',
          table: table(`
            Forme pleine | Contractée | Négatif
            I am | I’m | I’m not
            you are | you’re | you aren’t
            he / she / it is | he’s | he isn’t
            we are | we’re | we aren’t
            they are | they’re | they aren’t
          `),
        },
        {
          title: 'Questions et réponses courtes',
          body: 'Pour poser une question, on **inverse** : You are → **Are you**…? On répond avec une réponse courte : Yes, I am. / No, I’m not.',
          examples: ex(`
            Are you a teacher? — Yes, I am. | Tu es prof ? — Oui.
            Is she English? — No, she isn’t. | Elle est anglaise ? — Non.
            We’re tired. | Nous sommes fatigués.
            It’s cold today. | Il fait froid aujourd’hui.
          `),
        },
      ],
      vocab: vocab(`
        teacher | professeur
        tired | fatigué
        happy | heureux
        cold | froid
        hot | chaud
        busy | occupé
        hungry | qui a faim
        ready | prêt
      `),
      exercises: [
        qcm('« They ___ happy. »', 'are', ['is', 'am', 'be']),
        qcm('Négatif de « she is » :', 'she isn’t', ['she don’t', 'she aren’t', 'she not is']),
        qcm('« J’ai faim » :', 'I’m hungry.', ['I have hungry.', 'I have hunger.', 'I’m hunger.']),
        qcm('Réponse courte à « Are you ready? » :', 'Yes, I am.', ['Yes, I’m.', 'Yes, I ready.', 'Yes, I do.']),
        type('Complète : ___ you tired? (to be)', 'Are'),
        order('Remets dans l’ordre : « Il fait froid aujourd’hui. »', 'It’s cold today.', 'Il fait froid aujourd’hui.'),
      ],
    },
    {
      id: 'en-a1-2',
      title: 'Le présent simple',
      subtitle: 'I work · she works · do / does',
      duration: 30,
      objectives: ['Parler des habitudes', 'Ne pas oublier le -s', 'Utiliser do / does'],
      sections: [
        {
          title: 'Le -s de la 3e personne',
          body: 'Le présent simple décrit les **habitudes et les vérités**. À **he / she / it**, on ajoute **-s** : I work → she work**s**. Après o, s, sh, ch, x : **-es** (she goes, he watches). have → **has**.',
          examples: ex(`
            I work in an office. | Je travaille dans un bureau.
            She lives in London. | Elle habite à Londres.
            He watches TV every evening. | Il regarde la télé tous les soirs.
          `),
        },
        {
          title: 'Négation et question avec do / does',
          table: table(`
            Forme | I / you / we / they | he / she / it
            négatif | I don’t work | she doesn’t work
            question | Do you work? | Does she work?
          `),
          tip: 'Avec does / doesn’t, le verbe **perd son -s** : She doesn’t **work** (et non works).',
        },
      ],
      vocab: vocab(`
        work | travailler
        live | habiter, vivre
        like | aimer
        watch | regarder
        go | aller
        every day | tous les jours
        usually | d’habitude
        never | jamais
      `),
      dialogue: dlg(`
        Tom: Do you like coffee? | Tu aimes le café ?
        Sara: Yes, I do. I drink it every morning. | Oui. J’en bois tous les matins.
        Tom: My sister doesn’t like coffee. She prefers tea. | Ma sœur n’aime pas le café. Elle préfère le thé.
      `),
      exercises: [
        qcm('« She ___ in Paris. » (live)', 'lives', ['live', 'living', 'is live']),
        qcm('« He ___ TV. » (watch)', 'watches', ['watchs', 'watch', 'is watch']),
        qcm('Négatif de « she likes tea » :', 'she doesn’t like tea', ['she don’t like tea', 'she doesn’t likes tea', 'she not likes tea']),
        qcm('Question : « ___ you speak English? »', 'Do', ['Does', 'Are', 'Is']),
        type('Complète : ___ he work here? (question)', 'Does'),
        order('Remets dans l’ordre : « Je ne travaille pas le dimanche. »', 'I don’t work on Sundays.', 'Je ne travaille pas le dimanche.'),
      ],
    },
    {
      id: 'en-a1-3',
      title: 'Avoir et il y a',
      subtitle: 'have got · there is · there are',
      duration: 25,
      objectives: ['Dire ce qu’on possède', 'Décrire un lieu avec there is / there are'],
      sections: [
        {
          title: 'have / have got',
          examples: ex(`
            I have a brother. / I’ve got a brother. | J’ai un frère.
            She has two cats. / She’s got two cats. | Elle a deux chats.
            Do you have a car? / Have you got a car? | As-tu une voiture ?
          `),
          body: '**Have got** est très courant en anglais britannique ; **have** avec do / does est universel.',
        },
        {
          title: 'There is / There are',
          body: '**There is** + singulier, **there are** + pluriel. Question : **Is there…? / Are there…?** Avec **some** (affirmatif) et **any** (négatif, question).',
          examples: ex(`
            There is a park near my house. | Il y a un parc près de chez moi.
            There are some shops in the street. | Il y a des magasins dans la rue.
            Is there a bank here? | Y a-t-il une banque ici ?
            There aren’t any restaurants. | Il n’y a pas de restaurants.
          `),
        },
      ],
      vocab: vocab(`
        brother | frère
        sister | sœur
        car | voiture
        park | parc
        shop | magasin
        bank | banque
        near | près de
        street | rue
      `),
      exercises: [
        qcm('« Elle a un chien » :', 'She has a dog.', ['She have a dog.', 'She is a dog.', 'She haves a dog.']),
        qcm('« Il y a trois chambres » :', 'There are three bedrooms.', ['There is three bedrooms.', 'It has three bedrooms.', 'They are three bedrooms.']),
        qcm('« Y a-t-il une gare ? » :', 'Is there a station?', ['There is a station?', 'Are there a station?', 'Has it a station?']),
        qcm('« Il n’y a pas de pain » :', 'There isn’t any bread.', ['There isn’t some bread.', 'There aren’t bread.', 'There is no any bread.']),
        type('Complète : I’ve ___ two sisters.', 'got'),
        match('Associe', [['near', 'près de'], ['shop', 'magasin'], ['street', 'rue'], ['brother', 'frère']]),
      ],
    },
    {
      id: 'en-a1-4',
      title: 'Le présent continu',
      subtitle: 'I’m working · she’s reading · right now',
      duration: 25,
      objectives: ['Décrire une action en cours', 'Choisir entre présent simple et continu'],
      sections: [
        {
          title: 'be + verbe-ing',
          examples: ex(`
            I’m reading a book. | Je lis un livre (en ce moment).
            She’s talking on the phone. | Elle est au téléphone.
            Are you listening? | Tu écoutes ?
            They aren’t sleeping. | Ils ne dorment pas.
          `),
          body: 'Orthographe : make → mak**ing**, run → run**ning**, swim → swim**ming**.',
        },
        {
          title: 'Simple ou continu ?',
          body: '**Présent simple** : habitude (I usually **drink** tea). **Présent continu** : maintenant (I**’m drinking** coffee **now**). Les verbes d’état (like, know, want, understand) ne se mettent pas au continu.',
          tip: 'Mots-signaux : now, right now, at the moment → continu ; always, usually, every day → simple.',
        },
      ],
      vocab: vocab(`
        read | lire
        listen | écouter
        sleep | dormir
        run | courir
        cook | cuisiner
        now | maintenant
        at the moment | en ce moment
        phone | téléphone
      `),
      exercises: [
        qcm('« Je cuisine en ce moment » :', 'I’m cooking at the moment.', ['I cook at the moment.', 'I’m cook at the moment.', 'I cooking at the moment.']),
        qcm('Forme -ing de « run » :', 'running', ['runing', 'runnning', 'runeing']),
        qcm('« I ___ tea every morning. »', 'drink', ['am drinking', 'drinking', 'drinks']),
        qcm('Quelle phrase est correcte ?', 'I understand you.', ['I’m understanding you.', 'I understanding you.', 'I’m understand you.']),
        type('Complète : Look! It ___ raining. (to be)', 'is'),
        order('Remets dans l’ordre : « Elle est au téléphone. »', 'She’s talking on the phone.', 'Elle est au téléphone.'),
      ],
    },
    {
      id: 'en-a1-5',
      title: 'L’heure, les jours et in / on / at',
      subtitle: 'What time is it? · on Monday · at 7',
      duration: 25,
      objectives: ['Dire l’heure', 'Utiliser in, on, at pour le temps'],
      sections: [
        {
          title: 'L’heure',
          examples: ex(`
            What time is it? | Quelle heure est-il ?
            It’s seven o’clock. | Il est 7 heures.
            It’s half past three. | Il est 3 h 30.
            It’s quarter to five. | Il est 5 h moins le quart.
            It’s ten past six. | Il est 6 h 10.
          `),
        },
        {
          title: 'in, on, at',
          table: table(`
            Préposition | Usage | Exemples
            at | heure, moment précis | at 7 o’clock, at night, at the weekend
            on | jour, date | on Monday, on 14 July, on my birthday
            in | mois, saison, année, partie du jour | in May, in summer, in 2025, in the morning
          `),
          tip: 'Les jours et les mois prennent une **majuscule** : Monday, July.',
        },
      ],
      vocab: vocab(`
        Monday | lundi
        Friday | vendredi
        weekend | week-end
        o’clock | heure pile
        half past | et demie
        quarter to | moins le quart
        morning | matin
        birthday | anniversaire
      `),
      exercises: [
        qcm('« Il est 3 h 30 » :', 'It’s half past three.', ['It’s half three past.', 'It’s three and half.', 'It’s half to three.']),
        qcm('« lundi » : ___ Monday', 'on', ['in', 'at', 'to']),
        qcm('« en été » : ___ summer', 'in', ['on', 'at', 'to']),
        qcm('« à 8 heures » : ___ 8 o’clock', 'at', ['in', 'on', 'to']),
        type('Complète : I get up ___ the morning.', 'in'),
        match('Associe', [['Monday', 'lundi'], ['Friday', 'vendredi'], ['birthday', 'anniversaire'], ['weekend', 'week-end']]),
      ],
    },
  ],
  test: [
    qcm('« We ___ students. »', 'are', ['is', 'am', 'be']),
    qcm('« Il n’est pas là » :', 'He isn’t here.', ['He doesn’t here.', 'He not is here.', 'He aren’t here.']),
    qcm('« She ___ to school every day. » (go)', 'goes', ['go', 'gos', 'is go']),
    qcm('Négatif de « he plays » :', 'he doesn’t play', ['he don’t play', 'he doesn’t plays', 'he isn’t play']),
    qcm('« Il y a des pommes » :', 'There are some apples.', ['There is some apples.', 'There are any apples.', 'It has apples.']),
    qcm('« Qu’est-ce que tu fais (maintenant) ? » :', 'What are you doing?', ['What do you do?', 'What you doing?', 'What are you do?']),
    qcm('« en mai » : ___ May', 'in', ['on', 'at', 'to']),
    match('Associe la bonne préposition', [['at', '7 o’clock'], ['on', 'Monday'], ['in', 'July']]),
    order('Remets dans l’ordre : « Tu aimes le café ? »', 'Do you like coffee?', 'Tu aimes le café ?'),
    type('Forme -ing de « swim »', 'swimming'),
    type('Complète : ___ there a bank near here?', 'Is'),
    type('Complète : She ___ got two brothers.', 'has'),
  ],
}
