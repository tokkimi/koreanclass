import type { Lesson } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

/** Leçons supplémentaires du cursus anglais, ajoutées à la fin de chaque niveau. */
export const enExtra: Record<string, Lesson[]> = {
  'en-0': [
    {
      id: 'en-0-6',
      title: 'Les couleurs et les adjectifs',
      subtitle: 'red · blue · a big red car',
      duration: 20,
      objectives: ['Nommer les couleurs', 'Placer l’adjectif avant le nom', 'Savoir que l’adjectif est invariable'],
      sections: [
        {
          title: 'Les couleurs',
          table: table(`
            Anglais | Sens
            red | rouge
            blue | bleu
            yellow | jaune
            green | vert
            black | noir
            white | blanc
            grey | gris
            pink | rose
            orange | orange
            brown | marron
            purple | violet
          `),
        },
        {
          title: 'Avant le nom, jamais d’accord',
          body: 'L’adjectif se place **avant** le nom et ne prend **jamais de -s** : a red car → two red cars. Avec plusieurs adjectifs, l’ordre habituel est : opinion, taille, âge, couleur (a beautiful big old red car).',
          examples: ex(`
            a white shirt | une chemise blanche
            two black cats | deux chats noirs
            What colour is it? | De quelle couleur est-ce ?
            It’s dark blue. | C’est bleu foncé.
          `),
          tip: 'Britannique : **colour**, **grey**. Américain : **color**, **gray**.',
        },
      ],
      vocab: vocab(`
        red | rouge
        blue | bleu
        yellow | jaune
        green | vert
        black | noir
        white | blanc
        colour | couleur
        dark / light | foncé / clair
      `),
      exercises: [
        qcm('« des chats noirs » :', 'black cats', ['cats blacks', 'blacks cats', 'cats black']),
        qcm('« De quelle couleur est-ce ? » :', 'What colour is it?', ['Which colour it is?', 'What is colour?', 'How colour is it?']),
        qcm('« purple » veut dire…', 'violet', ['rose', 'pourpre foncé uniquement', 'marron']),
        qcm('« light blue » veut dire…', 'bleu clair', ['bleu foncé', 'lumière bleue', 'bleu marine']),
        match('Associe', [['grey', 'gris'], ['pink', 'rose'], ['brown', 'marron'], ['yellow', 'jaune']]),
        order('Remets dans l’ordre : « une grande voiture rouge »', 'a big red car', 'une grande voiture rouge'),
        type('Traduis : « vert »', 'green'),
        type('Traduis : « une chemise blanche »', 'a white shirt'),
      ],
    },
    {
      id: 'en-0-7',
      title: 'La famille et les possessifs',
      subtitle: 'my mother · his brother · Tom’s car',
      duration: 25,
      objectives: ['Présenter sa famille', 'Utiliser my, your, his, her', 'Utiliser le cas possessif ’s'],
      sections: [
        {
          title: 'La famille',
          table: table(`
            Anglais | Sens
            father / mother | père / mère
            parents | parents
            brother / sister | frère / sœur
            son / daughter | fils / fille
            grandfather / grandmother | grand-père / grand-mère
            uncle / aunt | oncle / tante
            cousin | cousin(e)
          `),
        },
        {
          title: 'Possessifs et ’s',
          body: '**my, your, his** (à lui), **her** (à elle), **its, our, their**. Attention : le possessif dépend du **possesseur** : **his** mother (sa mère, à lui), **her** father (son père, à elle). Pour « le … de Tom » : **Tom’s** car.',
          examples: ex(`
            This is my sister. Her name is Emma. | Voici ma sœur. Elle s’appelle Emma.
            Paul is my cousin. His dad is a pilot. | Paul est mon cousin. Son père est pilote.
            Is this Sarah’s phone? | C’est le téléphone de Sarah ?
            My parents’ house is in York. | La maison de mes parents est à York.
          `),
        },
      ],
      vocab: vocab(`
        mother | mère
        father | père
        brother | frère
        sister | sœur
        daughter | fille (enfant)
        son | fils
        aunt | tante
        uncle | oncle
      `),
      dialogue: dlg(`
        Kate: Have you got any brothers or sisters? | Tu as des frères et sœurs ?
        Hugo: Yes, one sister. Her name is Lina. | Oui, une sœur. Elle s’appelle Lina.
        Kate: Is she older than you? | Elle est plus âgée que toi ?
        Hugo: No, she’s my little sister. | Non, c’est ma petite sœur.
      `),
      exercises: [
        qcm('Paul parle de sa mère : « ___ mother »', 'his', ['her', 'its', 'their']),
        qcm('Emma parle de son père : « ___ father »', 'her', ['his', 'she', 'hers']),
        qcm('« la voiture de Tom » :', 'Tom’s car', ['the car of Tom’s', 'Tom car', 'car’s Tom']),
        qcm('« daughter » veut dire…', 'fille (enfant)', ['fille (jeune femme)', 'petite-fille', 'tante']),
        match('Associe', [['uncle', 'oncle'], ['aunt', 'tante'], ['son', 'fils'], ['cousin', 'cousin(e)']]),
        order('Remets dans l’ordre : « Voici ma sœur. »', 'This is my sister.', 'Voici ma sœur.'),
        type('Traduis : « grand-mère »', 'grandmother'),
        type('Complète : Our ___ are from Spain. (parents)', 'parents'),
      ],
    },
    {
      id: 'en-0-8',
      title: 'Jours, mois et météo',
      subtitle: 'Monday · January · It’s sunny',
      duration: 25,
      objectives: ['Dire la date', 'Parler du temps qu’il fait'],
      sections: [
        {
          title: 'Jours et mois (avec majuscule !)',
          body: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. January, February, March, April, May, June, July, August, September, October, November, December.',
          examples: ex(`
            What day is it today? — It’s Friday. | Quel jour sommes-nous ? — Vendredi.
            My birthday is on the 5th of June. | Mon anniversaire est le 5 juin.
            See you on Monday! | À lundi !
          `),
          tip: 'Les dates : **the first** (1st), **the second** (2nd), **the third** (3rd), puis **-th** : the fourth, the fifth…',
        },
        {
          title: 'La météo',
          table: table(`
            Anglais | Sens
            It’s sunny. | Il y a du soleil.
            It’s raining. | Il pleut.
            It’s cloudy. | C’est nuageux.
            It’s windy. | Il y a du vent.
            It’s cold / hot. | Il fait froid / chaud.
            It’s snowing. | Il neige.
          `),
        },
      ],
      vocab: vocab(`
        Monday | lundi
        Wednesday | mercredi
        Sunday | dimanche
        January | janvier
        weather | météo, temps
        sunny | ensoleillé
        rain | pluie
        birthday | anniversaire
      `),
      exercises: [
        qcm('« jeudi » :', 'Thursday', ['Tuesday', 'Wednesday', 'Thirsday']),
        qcm('« Il pleut » :', 'It’s raining.', ['It rains now.', 'Is raining.', 'It’s rain.']),
        qcm('« le 3 mai » :', 'the third of May', ['the three of May', 'the thirdth of May', 'May the three']),
        qcm('Les jours en anglais prennent…', 'une majuscule', ['une minuscule', 'un article', 'un s']),
        match('Associe', [['windy', 'venteux'], ['cloudy', 'nuageux'], ['sunny', 'ensoleillé'], ['snowing', 'il neige']]),
        order('Remets dans l’ordre : « Mon anniversaire est le 5 juin. »', 'My birthday is on the 5th of June.', 'Mon anniversaire est le 5 juin.'),
        type('Traduis : « mercredi »', 'Wednesday'),
        type('Traduis : « Il fait froid. »', ['It’s cold', 'It is cold']),
      ],
    },
  ],
  'en-a1': [
    {
      id: 'en-a1-6',
      title: 'Au restaurant',
      subtitle: 'Can I have… ? · the bill · I’d like',
      duration: 30,
      objectives: ['Commander poliment', 'Demander l’addition', 'Comprendre un menu'],
      sections: [
        {
          title: 'Commander',
          examples: ex(`
            A table for two, please. | Une table pour deux, s’il vous plaît.
            Can I see the menu, please? | Je peux voir le menu ?
            I’d like the fish, please. | Je voudrais le poisson, s’il vous plaît.
            Can I have some water? | Je peux avoir de l’eau ?
            Could we have the bill, please? | L’addition, s’il vous plaît.
          `),
          tip: 'Au Royaume-Uni : **the bill** ; aux États-Unis : **the check**. Le pourboire (tip) est d’environ 10-12 % au Royaume-Uni, 15-20 % aux États-Unis.',
        },
        {
          title: 'Le menu',
          table: table(`
            Anglais | Sens
            starter | entrée
            main course | plat principal
            dessert | dessert
            chips | frites (UK)
            fries | frites (US)
            still / sparkling water | eau plate / gazeuse
          `),
        },
      ],
      vocab: vocab(`
        menu | carte, menu
        bill | addition (UK)
        starter | entrée
        main course | plat principal
        waiter | serveur
        order | commander
        tip | pourboire
        delicious | délicieux
      `),
      dialogue: dlg(`
        Waiter: Are you ready to order? | Vous êtes prêts à commander ?
        Léa: Yes. I’d like the chicken salad, please. | Oui. Je voudrais la salade au poulet, s’il vous plaît.
        Waiter: Anything to drink? | Quelque chose à boire ?
        Léa: Just some still water, thanks. | Juste de l’eau plate, merci.
      `),
      exercises: [
        qcm('« L’addition, s’il vous plaît » (UK) :', 'Could we have the bill, please?', ['Could we have the addition, please?', 'Can we pay the note?', 'The count, please.']),
        qcm('« Je voudrais… » (poli) :', 'I’d like…', ['I want to…', 'I would to like…', 'I like…']),
        qcm('« main course » veut dire…', 'plat principal', ['entrée', 'dessert', 'boisson']),
        qcm('« sparkling water » :', 'eau gazeuse', ['eau plate', 'eau du robinet', 'eau fraîche']),
        match('Associe', [['starter', 'entrée'], ['waiter', 'serveur'], ['tip', 'pourboire'], ['chips', 'frites (UK)']]),
        order('Remets dans l’ordre : « Une table pour deux, s’il vous plaît. »', 'A table for two, please.', 'Une table pour deux, s’il vous plaît.'),
        type('Traduis : « délicieux »', 'delicious'),
        type('Complète : Can I ___ some water? (avoir)', 'have'),
      ],
    },
    {
      id: 'en-a1-7',
      title: 'En ville : demander son chemin',
      subtitle: 'Where is… ? · turn left · go straight on',
      duration: 30,
      objectives: ['Demander un lieu', 'Comprendre un itinéraire', 'Utiliser les prépositions de lieu'],
      sections: [
        {
          title: 'Demander',
          examples: ex(`
            Excuse me, where is the station? | Excusez-moi, où est la gare ?
            Is there a bank near here? | Y a-t-il une banque près d’ici ?
            How do I get to the museum? | Comment aller au musée ?
            Is it far? — No, it’s a five-minute walk. | C’est loin ? — Non, c’est à cinq minutes à pied.
          `),
        },
        {
          title: 'Indications',
          table: table(`
            Anglais | Sens
            go straight on | allez tout droit
            turn left / right | tournez à gauche / droite
            take the second street | prenez la deuxième rue
            next to | à côté de
            opposite | en face de
            between | entre
            at the end of the street | au bout de la rue
          `),
        },
      ],
      vocab: vocab(`
        station | gare
        museum | musée
        street | rue
        corner | coin
        left | gauche
        right | droite
        opposite | en face de
        far | loin
      `),
      exercises: [
        qcm('« Tournez à gauche » :', 'Turn left.', ['Turn on left.', 'Go left turn.', 'Take the left.']),
        qcm('« en face de la banque » :', 'opposite the bank', ['in front the bank', 'face of the bank', 'opposite of bank']),
        qcm('« Comment aller à la gare ? » :', 'How do I get to the station?', ['How I go to station?', 'Where do I station?', 'How get I the station?']),
        qcm('« a five-minute walk » :', 'à cinq minutes à pied', ['une marche de cinq minutes en voiture', 'cinq minutes de retard', 'cinq marches']),
        match('Associe', [['between', 'entre'], ['next to', 'à côté de'], ['corner', 'coin'], ['far', 'loin']]),
        order('Remets dans l’ordre : « Y a-t-il une banque près d’ici ? »', 'Is there a bank near here?', 'Y a-t-il une banque près d’ici ?'),
        type('Traduis : « tout droit » (go ___ on)', 'straight'),
        type('Traduis : « la rue »', ['the street', 'street']),
      ],
    },
    {
      id: 'en-a1-8',
      title: 'Faire du shopping',
      subtitle: 'this · that · these · those · How much…?',
      duration: 30,
      objectives: ['Utiliser les démonstratifs', 'Demander une taille, un prix, essayer', 'Nommer les vêtements'],
      sections: [
        {
          title: 'this / that / these / those',
          table: table(`
            Anglais | Nombre | Distance
            this | singulier | proche
            these | pluriel | proche
            that | singulier | loin
            those | pluriel | loin
          `),
        },
        {
          title: 'Au magasin',
          examples: ex(`
            How much is this jacket? | Combien coûte cette veste ?
            How much are those shoes? | Combien coûtent ces chaussures ?
            Can I try it on? | Je peux l’essayer ?
            Have you got it in a medium? | Vous l’avez en M ?
            I’ll take it. | Je le prends.
            Can I pay by card? | Je peux payer par carte ?
          `),
        },
      ],
      vocab: vocab(`
        jacket | veste
        trousers | pantalon (UK)
        dress | robe
        shoes | chaussures
        size | taille
        try on | essayer
        cheap | bon marché
        expensive | cher
      `),
      dialogue: dlg(`
        Assistant: Can I help you? | Je peux vous aider ?
        Tom: Yes, have you got these jeans in a smaller size? | Oui, vous avez ce jean dans une taille plus petite ?
        Assistant: Sure. Here you are. The changing rooms are over there. | Bien sûr. Voilà. Les cabines sont là-bas.
      `),
      exercises: [
        qcm('« ces chaussures-ci » :', 'these shoes', ['this shoes', 'those shoe', 'that shoes']),
        qcm('« Combien coûtent ces chaussures-là ? » :', 'How much are those shoes?', ['How much is those shoes?', 'How many cost those shoes?', 'How much are these shoe?']),
        qcm('« Je peux l’essayer ? » :', 'Can I try it on?', ['Can I try on it?', 'Can I essay it?', 'Can I test it?']),
        qcm('« I’ll take it » veut dire…', 'Je le prends.', ['Je vais le rendre.', 'Je l’ai pris.', 'Prenez-le.']),
        match('Associe', [['dress', 'robe'], ['size', 'taille'], ['cheap', 'bon marché'], ['jacket', 'veste']]),
        order('Remets dans l’ordre : « Je peux payer par carte ? »', 'Can I pay by card?', 'Je peux payer par carte ?'),
        type('Traduis : « cher »', 'expensive'),
        type('Complète : ___ shoes over there are nice. (ces… là-bas)', 'Those'),
      ],
    },
  ],
  'en-a2': [
    {
      id: 'en-a2-6',
      title: 'La fréquence',
      subtitle: 'always · often · sometimes · never · How often…?',
      duration: 25,
      objectives: ['Utiliser les adverbes de fréquence', 'Les placer correctement'],
      sections: [
        {
          title: 'Du plus fréquent au moins fréquent',
          table: table(`
            Adverbe | Sens
            always | toujours (100 %)
            usually | d’habitude
            often | souvent
            sometimes | parfois
            rarely / hardly ever | rarement
            never | jamais (0 %)
          `),
        },
        {
          title: 'Leur place',
          body: '**Avant** le verbe principal (I **often** go), mais **après** be (She is **always** late). Pour demander : **How often** do you…? Réponses : once a week, twice a month, every day.',
          examples: ex(`
            I usually get up at seven. | Je me lève d’habitude à 7 h.
            He is never on time. | Il n’est jamais à l’heure.
            How often do you go to the gym? — Twice a week. | Tu vas à la salle tous les combien ? — Deux fois par semaine.
          `),
        },
      ],
      vocab: vocab(`
        always | toujours
        usually | d’habitude
        often | souvent
        sometimes | parfois
        never | jamais
        once | une fois
        twice | deux fois
        gym | salle de sport
      `),
      exercises: [
        qcm('Place correcte :', 'She is always late.', ['She always is late.', 'Always she is late.', 'She is late always is.']),
        qcm('Place correcte :', 'I often play tennis.', ['I play often tennis.', 'Often I tennis play.', 'I play tennis often always.']),
        qcm('« deux fois par semaine » :', 'twice a week', ['two times the week', 'twice for week', 'two a week']),
        qcm('« How often… ? » demande…', 'la fréquence', ['la durée', 'le prix', 'la distance']),
        match('Associe', [['never', 'jamais'], ['sometimes', 'parfois'], ['usually', 'd’habitude'], ['once', 'une fois']]),
        order('Remets dans l’ordre : « Je me lève d’habitude à 7 h. »', 'I usually get up at seven.', 'Je me lève d’habitude à 7 h.'),
        type('Traduis : « souvent »', 'often'),
        type('Complète : How ___ do you go to the cinema?', 'often'),
      ],
    },
    {
      id: 'en-a2-7',
      title: 'La santé et le corps',
      subtitle: 'I’ve got a headache · my back hurts',
      duration: 30,
      objectives: ['Nommer les parties du corps', 'Dire où on a mal', 'Parler au médecin et à la pharmacie'],
      sections: [
        {
          title: 'Avoir mal',
          table: table(`
            Anglais | Sens
            I’ve got a headache. | J’ai mal à la tête.
            I’ve got a stomach ache. | J’ai mal au ventre.
            I’ve got a sore throat. | J’ai mal à la gorge.
            My back hurts. | J’ai mal au dos.
            I’ve got a cold. | J’ai un rhume.
            I’ve got a temperature. | J’ai de la fièvre.
          `),
        },
        {
          title: 'Chez le médecin',
          examples: ex(`
            What’s the matter? | Qu’est-ce qui ne va pas ?
            How long have you felt like this? | Depuis combien de temps vous sentez-vous comme ça ?
            You should stay in bed. | Vous devriez rester au lit.
            Take two tablets a day. | Prenez deux comprimés par jour.
          `),
          tip: 'Urgences : **999** au Royaume-Uni, **911** aux États-Unis.',
        },
      ],
      vocab: vocab(`
        head | tête
        back | dos
        stomach | ventre, estomac
        throat | gorge
        hurt | faire mal
        headache | mal de tête
        doctor | médecin
        tablet | comprimé
      `),
      dialogue: dlg(`
        Doctor: What’s the matter? | Qu’est-ce qui ne va pas ?
        Patient: I’ve got a sore throat and a temperature. | J’ai mal à la gorge et de la fièvre.
        Doctor: It’s probably flu. Drink lots of water and rest. | C’est sûrement la grippe. Buvez beaucoup d’eau et reposez-vous.
      `),
      exercises: [
        qcm('« J’ai mal à la tête » :', 'I’ve got a headache.', ['I have mal of head.', 'My head is ache.', 'I’ve got a head hurt.']),
        qcm('« J’ai mal au dos » :', 'My back hurts.', ['My back is hurt me.', 'I hurt back.', 'I’ve got a back.']),
        qcm('« I’ve got a temperature » veut dire…', 'J’ai de la fièvre.', ['J’ai un thermomètre.', 'Il fait chaud.', 'J’ai froid.']),
        qcm('Urgences au Royaume-Uni :', '999', ['112 uniquement', '911', '15']),
        match('Associe', [['throat', 'gorge'], ['stomach', 'ventre'], ['tablet', 'comprimé'], ['cold', 'rhume']]),
        order('Remets dans l’ordre : « Qu’est-ce qui ne va pas ? »', 'What’s the matter?', 'Qu’est-ce qui ne va pas ?'),
        type('Traduis : « médecin »', 'doctor'),
        type('Complète : I’ve got a sore ___. (gorge)', 'throat'),
      ],
    },
    {
      id: 'en-a2-8',
      title: 'Le past continuous',
      subtitle: 'I was watching TV when…',
      duration: 25,
      objectives: ['Décrire une action en cours dans le passé', 'Combiner past continuous et prétérit'],
      sections: [
        {
          title: 'was / were + -ing',
          examples: ex(`
            At 8 pm I was having dinner. | À 20 h, j’étais en train de dîner.
            They were playing football. | Ils jouaient au foot.
            What were you doing yesterday at 5? | Que faisais-tu hier à 17 h ?
          `),
        },
        {
          title: 'when / while',
          body: '**Past continuous** = l’action longue (le décor). **Prétérit** = l’action courte qui interrompt. **while** + action longue, **when** + action courte.',
          examples: ex(`
            I was sleeping when the phone rang. | Je dormais quand le téléphone a sonné.
            While I was cooking, he arrived. | Pendant que je cuisinais, il est arrivé.
          `),
        },
      ],
      vocab: vocab(`
        while | pendant que
        when | quand
        ring / rang | sonner / a sonné
        happen | se passer
        suddenly | soudain
        cook | cuisiner
        at the time | à ce moment-là
        yesterday | hier
      `),
      exercises: [
        qcm('« Je dormais quand… » :', 'I was sleeping when…', ['I slept when…', 'I was sleep when…', 'I sleeping when…']),
        qcm('« They ___ football. » (jouaient)', 'were playing', ['was playing', 'played were', 'are playing']),
        qcm('L’action courte qui interrompt est au…', 'prétérit', ['past continuous', 'présent', 'futur']),
        qcm('« Que faisais-tu ? » :', 'What were you doing?', ['What did you doing?', 'What you were doing?', 'What was you do?']),
        match('Associe', [['while', 'pendant que'], ['suddenly', 'soudain'], ['happen', 'se passer'], ['at the time', 'à ce moment-là']]),
        order('Remets dans l’ordre : « Je dormais quand le téléphone a sonné. »', 'I was sleeping when the phone rang.', 'Je dormais quand le téléphone a sonné.'),
        type('Complète : We ___ watching TV. (étions)', 'were'),
        type('Complète : ___ I was cooking, he arrived. (pendant que)', 'While'),
      ],
    },
  ],
  'en-b1': [
    {
      id: 'en-b1-6',
      title: 'Gérondif ou infinitif ?',
      subtitle: 'enjoy doing · want to do · stop smoking / stop to smoke',
      duration: 30,
      objectives: ['Savoir quels verbes sont suivis de -ing ou de to', 'Comprendre les changements de sens'],
      sections: [
        {
          title: 'Verbe + -ing / verbe + to',
          table: table(`
            + -ing | + to + base
            enjoy, like, love, hate | want, would like, need
            finish, stop, avoid | decide, hope, plan
            mind, suggest, keep | promise, agree, refuse
            après une préposition (interested in doing) | learn, manage, afford
          `),
          examples: ex(`
            I enjoy reading. | J’aime lire.
            She decided to leave. | Elle a décidé de partir.
            Do you mind opening the window? | Ça vous dérange d’ouvrir la fenêtre ?
            I’m interested in learning Japanese. | Ça m’intéresse d’apprendre le japonais.
          `),
        },
        {
          title: 'Changement de sens',
          body: '**stop doing** = arrêter de faire ; **stop to do** = s’arrêter pour faire. **remember doing** = se souvenir d’avoir fait ; **remember to do** = penser à faire.',
          examples: ex(`
            He stopped smoking. | Il a arrêté de fumer.
            He stopped to smoke. | Il s’est arrêté pour fumer.
            Remember to lock the door! | Pense à fermer la porte à clé !
          `),
        },
      ],
      vocab: vocab(`
        enjoy | apprécier
        avoid | éviter
        mind | déranger
        decide | décider
        refuse | refuser
        afford | avoir les moyens
        remember | se souvenir
        lock | fermer à clé
      `),
      exercises: [
        qcm('« I enjoy ___ » :', 'swimming', ['to swim', 'swim', 'swam']),
        qcm('« She wants ___ » :', 'to travel', ['travelling', 'travel', 'travelled']),
        qcm('« Il a arrêté de fumer » :', 'He stopped smoking.', ['He stopped to smoke.', 'He stopped smoke.', 'He stopped of smoking.']),
        qcm('« Pense à fermer la porte » :', 'Remember to lock the door.', ['Remember locking the door.', 'Remember lock the door.', 'Remember of locking.']),
        match('Associe', [['avoid', 'éviter'], ['afford', 'avoir les moyens'], ['refuse', 'refuser'], ['mind', 'déranger']]),
        order('Remets dans l’ordre : « Elle a décidé de partir. »', 'She decided to leave.', 'Elle a décidé de partir.'),
        type('Complète : I’m interested in ___ Japanese. (learn)', 'learning'),
        type('Complète : We hope ___ see you soon.', 'to'),
      ],
    },
    {
      id: 'en-b1-7',
      title: 'Question tags et questions indirectes',
      subtitle: 'isn’t it? · don’t you? · Could you tell me where…?',
      duration: 30,
      objectives: ['Former les question tags', 'Poser une question indirecte polie'],
      sections: [
        {
          title: 'Les question tags (« n’est-ce pas ? »)',
          body: 'Phrase affirmative → tag **négatif** ; phrase négative → tag **positif**. On reprend l’auxiliaire.',
          examples: ex(`
            It’s cold, isn’t it? | Il fait froid, n’est-ce pas ?
            You like tea, don’t you? | Tu aimes le thé, non ?
            She can’t swim, can she? | Elle ne sait pas nager, si ?
            They left early, didn’t they? | Ils sont partis tôt, non ?
          `),
          tip: 'Exception : I’m right, **aren’t I**?',
        },
        {
          title: 'Les questions indirectes',
          body: 'Plus polies. Après l’introduction, **pas d’inversion** et pas de do / does / did.',
          examples: ex(`
            Where is the station? → Could you tell me where the station is? | Pourriez-vous me dire où est la gare ?
            What time does it open? → Do you know what time it opens? | Savez-vous à quelle heure ça ouvre ?
            Is he coming? → I wonder if he is coming. | Je me demande s’il vient.
          `),
        },
      ],
      vocab: vocab(`
        wonder | se demander
        tell | dire
        know | savoir
        polite | poli
        open | ouvrir
        early | tôt
        right | vrai, juste
        tag | petite question finale
      `),
      exercises: [
        qcm('« You’re French, ___? »', 'aren’t you', ['isn’t it', 'don’t you', 'are you']),
        qcm('« He didn’t call, ___? »', 'did he', ['didn’t he', 'does he', 'was he']),
        qcm('Question indirecte correcte :', 'Could you tell me where the bank is?', ['Could you tell me where is the bank?', 'Could you tell me where does the bank is?', 'Could you tell where the bank?']),
        qcm('« I’m late, ___? »', 'aren’t I', ['amn’t I', 'isn’t it', 'am not I']),
        match('Associe', [['wonder', 'se demander'], ['polite', 'poli'], ['early', 'tôt'], ['tell', 'dire']]),
        order('Remets dans l’ordre : « Savez-vous à quelle heure ça ouvre ? »', 'Do you know what time it opens?', 'Savez-vous à quelle heure ça ouvre ?'),
        type('Complète : It’s beautiful, ___ it?', 'isn’t'),
        type('Complète : You like pizza, ___ you?', 'don’t'),
      ],
    },
    {
      id: 'en-b1-8',
      title: 'Le monde du travail',
      subtitle: 'job interview · CV · skills · apply for',
      duration: 30,
      objectives: ['Parler de son expérience', 'Réussir un entretien en anglais', 'Écrire un e-mail professionnel simple'],
      sections: [
        {
          title: 'Vocabulaire',
          table: table(`
            Anglais | Sens
            apply for a job | postuler
            CV (UK) / résumé (US) | CV
            skills | compétences
            salary | salaire
            colleague | collègue
            manager | responsable
            full-time / part-time | temps plein / partiel
            be in charge of | être responsable de
          `),
        },
        {
          title: 'En entretien',
          examples: ex(`
            Tell me about yourself. | Parlez-moi de vous.
            I’ve been working in marketing for three years. | Je travaille dans le marketing depuis trois ans.
            My main strength is that I’m well organised. | Mon principal atout est que je suis bien organisé.
            I was in charge of a team of five people. | J’étais responsable d’une équipe de cinq personnes.
            Why do you want to work for us? | Pourquoi voulez-vous travailler chez nous ?
          `),
          tip: 'Faux ami : **actually** = en fait (pas « actuellement » = currently).',
        },
      ],
      vocab: vocab(`
        apply | postuler
        skills | compétences
        salary | salaire
        colleague | collègue
        manager | responsable
        strength | point fort
        weakness | point faible
        experience | expérience
      `),
      dialogue: dlg(`
        Interviewer: What are your strengths? | Quels sont vos points forts ?
        Candidate: I’m a good team player and I learn quickly. | J’aime travailler en équipe et j’apprends vite.
        Interviewer: And your weaknesses? | Et vos points faibles ?
        Candidate: Sometimes I’m a bit of a perfectionist. | Parfois, je suis un peu perfectionniste.
      `),
      exercises: [
        qcm('« postuler à un emploi » :', 'apply for a job', ['postulate a job', 'apply to job for', 'candidate a job']),
        qcm('« actually » veut dire…', 'en fait', ['actuellement', 'activement', 'exactement']),
        qcm('« part-time » veut dire…', 'à temps partiel', ['temps partagé', 'en partie payé', 'intérimaire']),
        qcm('« I was in charge of a team » :', 'J’étais responsable d’une équipe.', ['J’étais chargé par une équipe.', 'J’ai payé une équipe.', 'J’étais dans une équipe.']),
        match('Associe', [['skills', 'compétences'], ['salary', 'salaire'], ['strength', 'point fort'], ['weakness', 'point faible']]),
        order('Remets dans l’ordre : « Parlez-moi de vous. »', 'Tell me about yourself.', 'Parlez-moi de vous.'),
        type('Traduis : « collègue »', 'colleague'),
        type('Complète : I’ve been working here ___ three years.', 'for'),
      ],
    },
  ],
  'en-b2': [
    {
      id: 'en-b2-6',
      title: 'Déduction au passé',
      subtitle: 'must have · can’t have · might have · should have',
      duration: 30,
      objectives: ['Faire des déductions sur le passé', 'Exprimer un reproche ou un regret'],
      sections: [
        {
          title: 'Modal + have + participe',
          table: table(`
            Structure | Sens | Exemple
            must have done | a sûrement fait | She must have forgotten.
            can’t have done | n’a sûrement pas fait | He can’t have seen us.
            might / may have done | a peut-être fait | They might have missed the bus.
            should have done | aurait dû faire | You should have told me.
            could have done | aurait pu faire | It could have been worse.
          `),
          examples: ex(`
            The streets are wet. It must have rained. | Les rues sont mouillées. Il a dû pleuvoir.
            I shouldn’t have eaten so much. | Je n’aurais pas dû manger autant.
          `),
        },
      ],
      vocab: vocab(`
        must have | a dû (certitude)
        can’t have | n’a pas pu
        might have | a peut-être
        should have | aurait dû
        could have | aurait pu
        wet | mouillé
        forget / forgotten | oublier / oublié
        worse | pire
      `),
      exercises: [
        qcm('« Il a dû oublier » :', 'He must have forgotten.', ['He must forget.', 'He should have forget.', 'He had to forgotten.']),
        qcm('« Tu aurais dû me le dire » :', 'You should have told me.', ['You should told me.', 'You must have told me.', 'You had should tell me.']),
        qcm('« Ils ont peut-être raté le bus » :', 'They might have missed the bus.', ['They must have missed the bus.', 'They can’t have missed the bus.', 'They might missed the bus.']),
        qcm('« She can’t have seen us » veut dire…', 'Elle n’a sûrement pas pu nous voir.', ['Elle ne peut pas nous voir.', 'Elle ne nous a pas vus exprès.', 'Elle devait nous voir.']),
        match('Associe', [['must have', 'certitude'], ['might have', 'possibilité'], ['should have', 'reproche'], ['can’t have', 'impossibilité']]),
        order('Remets dans l’ordre : « Ça aurait pu être pire. »', 'It could have been worse.', 'Ça aurait pu être pire.'),
        type('Complète : The streets are wet. It must ___ rained.', 'have'),
        type('Complète : I shouldn’t have ___ so much. (eat)', 'eaten'),
      ],
    },
    {
      id: 'en-b2-7',
      title: 'Faire faire : have / get something done',
      subtitle: 'I had my hair cut · get your car repaired',
      duration: 25,
      objectives: ['Exprimer un service rendu par quelqu’un d’autre', 'Distinguer have et get'],
      sections: [
        {
          title: 'have / get + objet + participe passé',
          body: 'Quand quelqu’un fait quelque chose **pour nous** : I **had my hair cut** (je me suis fait couper les cheveux — par un coiffeur). **get** est plus familier.',
          examples: ex(`
            I’m having my car repaired. | Je fais réparer ma voiture.
            She got her phone fixed. | Elle a fait réparer son téléphone.
            We need to have the house painted. | Il faut qu’on fasse repeindre la maison.
            He had his wallet stolen. | Il s’est fait voler son portefeuille.
          `),
          tip: 'Attention : « I cut my hair » = je me suis coupé les cheveux **moi-même**.',
        },
      ],
      vocab: vocab(`
        repair | réparer
        fix | réparer, arranger
        paint | peindre
        cut | couper
        hairdresser | coiffeur
        wallet | portefeuille
        clean | nettoyer
        deliver | livrer
      `),
      exercises: [
        qcm('« Je me suis fait couper les cheveux » :', 'I had my hair cut.', ['I cut my hair.', 'I had cut my hair.', 'I made my hair cut.']),
        qcm('« Je fais réparer ma voiture » :', 'I’m having my car repaired.', ['I’m repairing my car.', 'I make repair my car.', 'I’m having repair my car.']),
        qcm('« He had his wallet stolen » veut dire…', 'Il s’est fait voler son portefeuille.', ['Il a volé un portefeuille.', 'Il avait un portefeuille volé.', 'Il a fait voler son portefeuille exprès.']),
        qcm('Laquelle est plus familière ?', 'get something done', ['have something done', 'les deux pareil', 'make something done']),
        match('Associe', [['repair', 'réparer'], ['paint', 'peindre'], ['deliver', 'livrer'], ['hairdresser', 'coiffeur']]),
        order('Remets dans l’ordre : « Elle a fait réparer son téléphone. »', 'She got her phone fixed.', 'Elle a fait réparer son téléphone.'),
        type('Complète : We need to have the house ___. (paint)', 'painted'),
        type('Complète : I ___ my hair cut yesterday. (have, passé)', 'had'),
      ],
    },
    {
      id: 'en-b2-8',
      title: 'Futur continu et futur antérieur',
      subtitle: 'I’ll be working · I’ll have finished',
      duration: 25,
      objectives: ['Parler d’une action en cours dans le futur', 'Parler d’une action terminée avant un moment futur'],
      sections: [
        {
          title: 'Future continuous : will be + -ing',
          examples: ex(`
            This time tomorrow, I’ll be flying to Tokyo. | Demain à cette heure-ci, je serai dans l’avion pour Tokyo.
            Don’t call at 8, we’ll be having dinner. | N’appelle pas à 20 h, on sera en train de dîner.
          `),
        },
        {
          title: 'Future perfect : will have + participe',
          examples: ex(`
            By 2030, I’ll have finished my studies. | D’ici 2030, j’aurai fini mes études.
            By the time you arrive, we’ll have left. | Quand tu arriveras, nous serons partis.
          `),
          tip: 'Mots-signaux : **by** (d’ici), **by the time** (au moment où), **this time next week**.',
        },
      ],
      vocab: vocab(`
        by | d’ici (à)
        by the time | au moment où
        this time tomorrow | demain à la même heure
        fly | prendre l’avion
        finish | finir
        studies | études
        leave / left | partir / parti
        deadline | date limite
      `),
      exercises: [
        qcm('« Demain à cette heure-ci, je travaillerai » :', 'This time tomorrow, I’ll be working.', ['This time tomorrow, I’ll work.', 'This time tomorrow, I’ll have worked.', 'This time tomorrow, I’m working.']),
        qcm('« D’ici juin, j’aurai fini » :', 'By June, I’ll have finished.', ['By June, I’ll finish.', 'Until June, I’ll have finished.', 'By June, I’ll be finishing.']),
        qcm('« by the time » veut dire…', 'au moment où', ['à temps', 'de temps en temps', 'pendant ce temps']),
        qcm('Le future perfect exprime…', 'une action terminée avant un moment futur', ['une action en cours', 'une habitude', 'un passé récent']),
        match('Associe', [['by', 'd’ici'], ['deadline', 'date limite'], ['fly', 'prendre l’avion'], ['studies', 'études']]),
        order('Remets dans l’ordre : « Quand tu arriveras, nous serons partis. »', 'By the time you arrive, we’ll have left.', 'Quand tu arriveras, nous serons partis.'),
        type('Complète : We’ll be ___ dinner at 8. (have)', 'having'),
        type('Complète : By 2030, I’ll have ___ my studies. (finish)', 'finished'),
      ],
    },
  ],
  'en-c1': [
    {
      id: 'en-c1-6',
      title: 'Les collocations',
      subtitle: 'make a decision · do homework · heavy rain',
      duration: 25,
      objectives: ['Employer les bonnes associations de mots', 'Distinguer make et do'],
      sections: [
        {
          title: 'make ou do ?',
          table: table(`
            make | do
            a decision | homework
            a mistake | the shopping
            a phone call | your best
            an effort | business
            money | a favour
            progress | the washing-up
          `),
          tip: 'En gros : **make** = créer, produire ; **do** = accomplir une tâche, une activité.',
        },
        {
          title: 'Adjectif + nom',
          examples: ex(`
            heavy rain / heavy traffic | forte pluie / circulation dense
            a strong coffee | un café fort
            a high salary | un salaire élevé
            a close friend | un ami proche
            a big mistake | une grosse erreur
          `),
        },
      ],
      vocab: vocab(`
        make a decision | prendre une décision
        make a mistake | faire une erreur
        do your best | faire de son mieux
        do a favour | rendre service
        heavy rain | forte pluie
        heavy traffic | circulation dense
        close friend | ami proche
        make progress | faire des progrès
      `),
      exercises: [
        qcm('« prendre une décision » :', 'make a decision', ['take a decision do', 'do a decision', 'have a decision']),
        qcm('« faire ses devoirs » :', 'do homework', ['make homework', 'make the homeworks', 'do homeworks']),
        qcm('« une forte pluie » :', 'heavy rain', ['strong rain', 'big rain', 'hard rains']),
        qcm('« rendre service » :', 'do a favour', ['make a favour', 'give a service', 'do a service']),
        match('Associe', [['make', 'a mistake'], ['do', 'the shopping'], ['heavy', 'traffic'], ['close', 'friend']]),
        order('Remets dans l’ordre : « Fais de ton mieux. »', 'Do your best.', 'Fais de ton mieux.'),
        type('Complète : She’s making good ___. (progrès)', 'progress'),
        type('Complète : I need to ___ a phone call. (make / do)', 'make'),
      ],
    },
    {
      id: 'en-c1-7',
      title: 'Nuancer et adoucir',
      subtitle: 'It seems that · tend to · arguably · to some extent',
      duration: 30,
      objectives: ['Nuancer une affirmation (hedging)', 'Adopter le ton académique et diplomatique'],
      sections: [
        {
          title: 'Le hedging',
          body: 'En anglais académique et professionnel, on évite les affirmations trop absolues. On **adoucit** avec des verbes, adverbes et expressions.',
          table: table(`
            Expression | Sens
            It seems / appears that… | Il semble que…
            tend to | avoir tendance à
            arguably | on peut soutenir que
            to some extent | dans une certaine mesure
            it could be argued that | on pourrait avancer que
            relatively / fairly | relativement / assez
          `),
          examples: ex(`
            Young people tend to spend more time online. | Les jeunes ont tendance à passer plus de temps en ligne.
            This is arguably the best solution. | C’est sans doute la meilleure solution.
            I’m not entirely sure that’s right. | Je ne suis pas tout à fait sûr que ce soit juste.
          `),
        },
        {
          title: 'Être diplomate',
          examples: ex(`
            I’m afraid I can’t make it. | Je crains de ne pas pouvoir venir.
            Would you mind sending it again? | Cela vous dérangerait-il de le renvoyer ?
            That’s a fair point, but… | C’est juste, mais…
          `),
        },
      ],
      vocab: vocab(`
        seem | sembler
        tend to | avoir tendance à
        arguably | sans doute
        to some extent | dans une certaine mesure
        fairly | assez
        entirely | entièrement
        I’m afraid | je crains que
        a fair point | une remarque juste
      `),
      exercises: [
        qcm('« avoir tendance à » :', 'tend to', ['have tendency', 'tender to', 'intend to']),
        qcm('« dans une certaine mesure » :', 'to some extent', ['in a certain measure', 'at some point', 'by some way']),
        qcm('« I’m afraid I can’t » est…', 'un refus poli', ['une peur réelle', 'une menace', 'une question']),
        qcm('Quelle phrase est la plus nuancée ?', 'It seems that prices are rising.', ['Prices are rising.', 'Prices rise, obviously.', 'Everyone knows prices rise.']),
        match('Associe', [['arguably', 'sans doute'], ['fairly', 'assez'], ['entirely', 'entièrement'], ['seem', 'sembler']]),
        order('Remets dans l’ordre : « C’est une remarque juste, mais… »', 'That’s a fair point, but…', 'C’est une remarque juste, mais…'),
        type('Complète : Young people ___ to spend more time online. (ont tendance)', 'tend'),
        type('Complète : It could be ___ that… (on pourrait avancer)', 'argued'),
      ],
    },
    {
      id: 'en-c1-8',
      title: 'Anglais britannique et américain',
      subtitle: 'flat / apartment · lift / elevator · colour / color',
      duration: 25,
      objectives: ['Reconnaître les différences UK / US', 'Rester cohérent dans un écrit'],
      sections: [
        {
          title: 'Le vocabulaire',
          table: table(`
            UK | US | Sens
            flat | apartment | appartement
            lift | elevator | ascenseur
            holiday | vacation | vacances
            biscuit | cookie | biscuit
            queue | line | file d’attente
            underground / tube | subway | métro
            petrol | gas | essence
            autumn | fall | automne
          `),
        },
        {
          title: 'Orthographe et grammaire',
          body: 'Orthographe : colour / color, centre / center, organise / organize, travelled / traveled. Grammaire : les Américains utilisent plus souvent le prétérit là où les Britanniques mettent le present perfect (Did you eat yet? / Have you eaten yet?).',
          tip: 'Dans un examen ou un écrit, choisis **un seul standard** et reste cohérent.',
        },
      ],
      vocab: vocab(`
        flat | appartement (UK)
        apartment | appartement (US)
        lift | ascenseur (UK)
        elevator | ascenseur (US)
        queue | file d’attente (UK)
        holiday | vacances (UK)
        vacation | vacances (US)
        fall | automne (US)
      `),
      exercises: [
        qcm('« métro » en anglais américain :', 'subway', ['underground', 'tube', 'metro only']),
        qcm('« file d’attente » en anglais britannique :', 'queue', ['line', 'row', 'waiting']),
        qcm('Orthographe américaine de « centre » :', 'center', ['centre', 'centr', 'centere']),
        qcm('« petrol » (UK) se dit aux États-Unis…', 'gas', ['oil', 'fuel pump', 'petroleum']),
        match('Associe (UK → US)', [['flat', 'apartment'], ['lift', 'elevator'], ['biscuit', 'cookie'], ['autumn', 'fall']]),
        order('Remets dans l’ordre : « Nous partons en vacances (US). »', 'We are going on vacation.', 'Nous partons en vacances.'),
        type('Anglais britannique pour « vacances »', 'holiday'),
        type('Orthographe britannique de « color »', 'colour'),
      ],
    },
  ],
}
