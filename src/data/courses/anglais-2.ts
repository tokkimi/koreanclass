import type { Level } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

export const enA2: Level = {
  id: 'en-a2',
  index: 2,
  name: 'Niveau 2 — Élémentaire',
  korean: 'Elementary',
  cefr: 'A2',
  topik: 'Cambridge A2 Key · TOEIC 225+',
  color: '#1864ab',
  description: 'Raconter au passé (verbes réguliers et irréguliers), parler du futur avec will et going to, comparer, et maîtriser some / any / much / many.',
  lessons: [
    {
      id: 'en-a2-1',
      title: 'Le prétérit des verbes réguliers',
      subtitle: 'worked · played · did you…?',
      duration: 25,
      objectives: ['Former le prétérit en -ed', 'Poser des questions avec did'],
      sections: [
        {
          title: 'Verbe + -ed',
          body: 'Le prétérit raconte une action **terminée** à un moment précis du passé (yesterday, last week, in 2020, ago). Même forme pour toutes les personnes !',
          examples: ex(`
            I worked yesterday. | J’ai travaillé hier.
            She visited London last year. | Elle a visité Londres l’an dernier.
            We stopped at a café. | Nous nous sommes arrêtés dans un café.
            They studied all night. | Ils ont étudié toute la nuit.
          `),
          tip: 'Orthographe : stop → sto**pped**, study → stud**ied**, like → lik**ed**.',
        },
        {
          title: 'Négation et question : did',
          examples: ex(`
            I didn’t watch TV. | Je n’ai pas regardé la télé.
            Did you call her? — Yes, I did. | Tu l’as appelée ? — Oui.
            Where did you stay? | Où as-tu logé ?
          `),
          body: 'Après **did / didn’t**, le verbe revient à la base : Did you **call**? (pas called).',
        },
      ],
      vocab: vocab(`
        yesterday | hier
        last week | la semaine dernière
        ago | il y a (temps)
        visit | visiter
        stay | rester, loger
        call | appeler
        stop | s’arrêter
        study | étudier
      `),
      exercises: [
        qcm('Prétérit de « study » :', 'studied', ['studyed', 'studed', 'studying']),
        qcm('Prétérit de « stop » :', 'stopped', ['stoped', 'stopt', 'stopping']),
        qcm('« Did you ___ him? » (call)', 'call', ['called', 'calls', 'calling']),
        qcm('« Il y a deux jours » :', 'two days ago', ['ago two days', 'there are two days', 'since two days']),
        type('Négatif : I ___ watch TV yesterday.', 'didn’t'),
        order('Remets dans l’ordre : « Elle a visité Londres l’an dernier. »', 'She visited London last year.', 'Elle a visité Londres l’an dernier.'),
      ],
    },
    {
      id: 'en-a2-2',
      title: 'Les verbes irréguliers',
      subtitle: 'go → went · see → saw · buy → bought',
      duration: 30,
      objectives: ['Connaître 20 verbes irréguliers courants', 'Raconter un week-end'],
      sections: [
        {
          title: 'Les plus fréquents',
          table: table(`
            Base | Prétérit | Sens
            be | was / were | être
            go | went | aller
            have | had | avoir
            do | did | faire
            see | saw | voir
            eat | ate | manger
            buy | bought | acheter
            take | took | prendre
            make | made | fabriquer
            get | got | obtenir
            say | said | dire
            come | came | venir
          `),
          tip: '**was** pour I / he / she / it, **were** pour you / we / they.',
        },
        {
          title: 'Raconter',
          examples: ex(`
            Last weekend I went to Brighton. | Le week-end dernier, je suis allé à Brighton.
            We ate fish and chips on the beach. | Nous avons mangé des fish and chips sur la plage.
            It was great! | C’était génial !
          `),
        },
      ],
      vocab: vocab(`
        went | suis allé (go)
        saw | ai vu (see)
        ate | ai mangé (eat)
        bought | ai acheté (buy)
        took | ai pris (take)
        was / were | étais (be)
        beach | plage
        great | génial
      `),
      dialogue: dlg(`
        Amy: What did you do at the weekend? | Qu’as-tu fait ce week-end ?
        Luc: I went to a concert. It was amazing! | Je suis allé à un concert. C’était incroyable !
        Amy: Did you buy a T-shirt? | Tu as acheté un T-shirt ?
        Luc: No, I didn’t. They were too expensive. | Non. Ils étaient trop chers.
      `),
      exercises: [
        qcm('Prétérit de « buy » :', 'bought', ['buyed', 'brought', 'buied']),
        qcm('Prétérit de « see » :', 'saw', ['seed', 'seen', 'sow']),
        qcm('« They ___ at home. » (be, prétérit)', 'were', ['was', 'been', 'are']),
        match('Associe', [['go', 'went'], ['eat', 'ate'], ['take', 'took'], ['make', 'made']]),
        type('Prétérit de « have »', 'had'),
        type('Prétérit de « say »', 'said'),
      ],
    },
    {
      id: 'en-a2-3',
      title: 'Parler du futur',
      subtitle: 'I’m going to · I will · I’m meeting',
      duration: 30,
      objectives: ['Distinguer will et going to', 'Utiliser le présent continu pour un rendez-vous'],
      sections: [
        {
          title: 'Trois façons de parler du futur',
          table: table(`
            Forme | Usage | Exemple
            going to | projet déjà décidé | I’m going to learn Spanish.
            will | décision spontanée, promesse, prédiction | I’ll help you!
            présent continu | rendez-vous fixé | I’m meeting Tom at 6.
          `),
        },
        {
          title: 'Exemples',
          examples: ex(`
            It’s cold. — I’ll close the window. | Il fait froid. — Je vais fermer la fenêtre. (spontané)
            Look at the clouds! It’s going to rain. | Regarde les nuages ! Il va pleuvoir. (on le voit)
            I think she’ll win. | Je pense qu’elle gagnera.
            I won’t tell anyone. | Je ne le dirai à personne.
          `),
          tip: '**won’t** = will not.',
        },
      ],
      vocab: vocab(`
        tomorrow | demain
        next year | l’année prochaine
        plan | projet
        promise | promettre
        win | gagner
        rain | pleuvoir
        cloud | nuage
        anyone | personne (négatif), quelqu’un
      `),
      exercises: [
        qcm('Le téléphone sonne. « Je réponds ! » :', 'I’ll answer it!', ['I’m going to answer it!', 'I answer it!', 'I will to answer it!']),
        qcm('Projet décidé : « Je vais apprendre le piano » :', 'I’m going to learn the piano.', ['I’ll learn the piano now.', 'I learn the piano.', 'I going to learn the piano.']),
        qcm('Négatif de « will » :', 'won’t', ['willn’t', 'will not to', 'don’t will']),
        qcm('Rendez-vous fixé : « Je vois le médecin demain » :', 'I’m seeing the doctor tomorrow.', ['I see the doctor tomorrow.', 'I’ll seeing the doctor.', 'I going to see doctor.']),
        type('Complète : Look at the clouds! It’s ___ to rain.', 'going'),
        order('Remets dans l’ordre : « Je ne le dirai à personne. »', 'I won’t tell anyone.', 'Je ne le dirai à personne.'),
      ],
    },
    {
      id: 'en-a2-4',
      title: 'Comparer',
      subtitle: 'bigger · more expensive · the best',
      duration: 25,
      objectives: ['Former comparatifs et superlatifs', 'Connaître les irréguliers'],
      sections: [
        {
          title: 'Adjectifs courts / longs',
          table: table(`
            Adjectif | Comparatif | Superlatif
            small | smaller than | the smallest
            big | bigger than | the biggest
            happy | happier than | the happiest
            expensive | more expensive than | the most expensive
            interesting | more interesting than | the most interesting
          `),
        },
        {
          title: 'Les irréguliers',
          table: table(`
            Adjectif | Comparatif | Superlatif
            good | better | the best
            bad | worse | the worst
            far | further | the furthest
          `),
          examples: ex(`
            London is bigger than Paris. | Londres est plus grande que Paris.
            This is the best pizza in town! | C’est la meilleure pizza de la ville !
            Tea is not as strong as coffee. | Le thé n’est pas aussi fort que le café.
          `),
        },
      ],
      vocab: vocab(`
        cheap | bon marché
        expensive | cher
        fast | rapide
        slow | lent
        easy | facile
        difficult | difficile
        better | meilleur
        worse | pire
      `),
      exercises: [
        qcm('Comparatif de « big » :', 'bigger', ['biger', 'more big', 'biggest']),
        qcm('Superlatif de « good » :', 'the best', ['the goodest', 'the better', 'the most good']),
        qcm('Comparatif de « expensive » :', 'more expensive', ['expensiver', 'most expensive', 'expensivest']),
        qcm('« aussi rapide que » :', 'as fast as', ['so fast than', 'as fast than', 'more fast as']),
        type('Comparatif de « bad »', 'worse'),
        order('Remets dans l’ordre : « Londres est plus grande que Paris. »', 'London is bigger than Paris.', 'Londres est plus grande que Paris.'),
      ],
    },
    {
      id: 'en-a2-5',
      title: 'Quantités',
      subtitle: 'some · any · much · many · a lot of',
      duration: 25,
      objectives: ['Distinguer dénombrable et indénombrable', 'Choisir much / many / a lot of'],
      sections: [
        {
          title: 'Dénombrable ou pas ?',
          body: '**Dénombrables** : on peut compter (an apple, two apples). **Indénombrables** : pas de pluriel (water, money, bread, information, advice). « Des informations » = **some information**.',
        },
        {
          title: 'Les quantifieurs',
          table: table(`
            Mot | Avec | Exemple
            many | dénombrables (négatif, question) | How many people?
            much | indénombrables (négatif, question) | How much money?
            a lot of | les deux (affirmatif) | a lot of friends, a lot of time
            a few | dénombrables : quelques | a few days
            a little | indénombrables : un peu de | a little sugar
          `),
          tip: 'Prix : **How much** is it? — Combien ça coûte ?',
        },
      ],
      vocab: vocab(`
        money | argent
        water | eau
        bread | pain
        advice | conseil(s)
        information | information(s)
        people | gens
        sugar | sucre
        time | temps
      `),
      exercises: [
        qcm('« How ___ people are there? »', 'many', ['much', 'lot', 'few']),
        qcm('« I don’t have ___ money. »', 'much', ['many', 'a few', 'any a']),
        qcm('« Des conseils » :', 'some advice', ['some advices', 'an advice', 'many advices']),
        qcm('« quelques jours » :', 'a few days', ['a little days', 'a few day', 'much days']),
        type('Complète : How ___ is this T-shirt? (prix)', 'much'),
        match('Associe', [['a little', 'un peu de'], ['a few', 'quelques'], ['a lot of', 'beaucoup de'], ['any', 'aucun / du (négatif)']]),
      ],
    },
  ],
  test: [
    qcm('Prétérit de « play » :', 'played', ['plaid', 'plaied', 'playing']),
    qcm('« Did she ___ the film? » (like)', 'like', ['liked', 'likes', 'liking']),
    qcm('Prétérit de « take » :', 'took', ['taked', 'taken', 'tooked']),
    qcm('« I ___ tired yesterday. » (be)', 'was', ['were', 'been', 'am']),
    qcm('Décision spontanée : « Je vais t’aider ! »', 'I’ll help you!', ['I’m going to help you tomorrow!', 'I help you!', 'I will helping you!']),
    qcm('Superlatif de « bad » :', 'the worst', ['the baddest', 'the worse', 'the most bad']),
    qcm('Comparatif de « happy » :', 'happier', ['more happy', 'happyer', 'happiest']),
    qcm('« How ___ water do you drink? »', 'much', ['many', 'few', 'lot']),
    match('Associe', [['buy', 'bought'], ['see', 'saw'], ['come', 'came'], ['get', 'got']]),
    order('Remets dans l’ordre : « Qu’as-tu fait ce week-end ? »', 'What did you do at the weekend?', 'Qu’as-tu fait ce week-end ?'),
    type('Prétérit de « go »', 'went'),
    type('Comparatif de « good »', 'better'),
  ],
}

export const enB1: Level = {
  id: 'en-b1',
  index: 3,
  name: 'Niveau 3 — Intermédiaire',
  korean: 'Intermediate',
  cefr: 'B1',
  topik: 'Cambridge B1 Preliminary · TOEIC 550+',
  color: '#5f3dc4',
  description: 'Maîtriser le present perfect (le grand piège des francophones), les modaux, le premier conditionnel et les relatives. Tu te débrouilles dans la plupart des situations.',
  lessons: [
    {
      id: 'en-b1-1',
      title: 'Le present perfect',
      subtitle: 'I have been · have you ever…? · already · yet',
      duration: 30,
      objectives: ['Former le present perfect', 'Parler d’expériences', 'Utiliser already, yet, just, ever'],
      sections: [
        {
          title: 'have + participe passé',
          body: 'Il relie le passé au **présent** : une expérience, un résultat visible, une action récente. Participe : -ed pour les réguliers, 3e colonne pour les irréguliers (been, seen, done, eaten, gone…).',
          examples: ex(`
            I have been to Japan. | Je suis déjà allé au Japon.
            Have you ever eaten sushi? | As-tu déjà mangé des sushis ?
            She has just left. | Elle vient de partir.
            I haven’t finished yet. | Je n’ai pas encore fini.
            We have already seen this film. | Nous avons déjà vu ce film.
          `),
        },
        {
          title: 'Les petits mots',
          table: table(`
            Mot | Sens | Place
            ever | déjà (question) | Have you ever…?
            never | jamais | I have never…
            just | venir de | She has just…
            already | déjà | I have already…
            yet | encore (nég.), déjà (question) | …yet? / not…yet
          `),
        },
      ],
      vocab: vocab(`
        been | été (be)
        seen | vu (see)
        done | fait (do)
        eaten | mangé (eat)
        gone | allé (go)
        already | déjà
        yet | encore / déjà
        ever | déjà (jamais dans une question)
      `),
      exercises: [
        qcm('« As-tu déjà visité Rome ? » :', 'Have you ever visited Rome?', ['Did you ever visited Rome?', 'Have you ever visit Rome?', 'Are you ever visited Rome?']),
        qcm('« Elle vient de partir » :', 'She has just left.', ['She just has leave.', 'She comes to leave.', 'She has just leaved.']),
        qcm('Participe passé de « eat » :', 'eaten', ['ate', 'eated', 'eat']),
        qcm('« Je n’ai pas encore fini » :', 'I haven’t finished yet.', ['I haven’t finished already.', 'I didn’t finish yet still.', 'I have not yet finish.']),
        type('Participe passé de « do »', 'done'),
        order('Remets dans l’ordre : « Je ne suis jamais allé au Japon. »', 'I have never been to Japan.', 'Je ne suis jamais allé au Japon.'),
      ],
    },
    {
      id: 'en-b1-2',
      title: 'Present perfect ou prétérit ? for / since',
      subtitle: 'I’ve lived here for 3 years · since 2020',
      duration: 30,
      objectives: ['Choisir entre present perfect et prétérit', 'Utiliser for et since'],
      sections: [
        {
          title: 'Le choix',
          body: '**Prétérit** : moment précis et terminé (yesterday, in 2019, last week). **Present perfect** : sans date, ou période pas finie (today, this week, ever, never).',
          examples: ex(`
            I saw him yesterday. | Je l’ai vu hier. (moment précis)
            I’ve seen him today. | Je l’ai vu aujourd’hui. (période non terminée)
          `),
        },
        {
          title: 'Depuis : for / since',
          body: 'Pour une action **commencée dans le passé et qui continue**, le français utilise le présent, l’anglais le **present perfect** ! **for** + durée, **since** + point de départ.',
          examples: ex(`
            I’ve lived in London for three years. | J’habite à Londres depuis trois ans.
            She has worked here since 2020. | Elle travaille ici depuis 2020.
            How long have you known him? | Depuis combien de temps le connais-tu ?
          `),
          tip: 'Jamais « I live here since 2020 » : c’est la faute n°1 des francophones.',
        },
      ],
      vocab: vocab(`
        for | depuis (durée), pendant
        since | depuis (point de départ)
        how long | depuis combien de temps
        know / known | connaître / connu
        move | déménager
        married | marié
        company | entreprise
        month | mois
      `),
      exercises: [
        qcm('« J’habite ici depuis 2019 » :', 'I’ve lived here since 2019.', ['I live here since 2019.', 'I’ve lived here for 2019.', 'I lived here since 2019.']),
        qcm('« depuis deux heures (durée) » :', 'for two hours', ['since two hours', 'during two hours ago', 'from two hours']),
        qcm('« Je l’ai vu hier » :', 'I saw him yesterday.', ['I’ve seen him yesterday.', 'I have saw him yesterday.', 'I see him yesterday.']),
        qcm('« Depuis combien de temps es-tu marié ? » :', 'How long have you been married?', ['Since when are you married?', 'How long are you married?', 'For how long you are married?']),
        type('Complète : She has worked here ___ five years.', 'for'),
        type('Complète : I’ve known him ___ January.', 'since'),
      ],
    },
    {
      id: 'en-b1-3',
      title: 'Les modaux',
      subtitle: 'can · must · have to · should · might',
      duration: 30,
      objectives: ['Exprimer capacité, obligation, conseil, probabilité'],
      sections: [
        {
          title: 'Le rôle de chaque modal',
          table: table(`
            Modal | Sens | Exemple
            can / could | capacité, permission | Can I sit here?
            must | obligation (personnelle), déduction | You must see this film!
            have to | obligation (extérieure) | I have to wear a uniform.
            mustn’t | interdiction | You mustn’t smoke here.
            don’t have to | absence d’obligation | You don’t have to come.
            should | conseil | You should rest.
            might / may | possibilité | It might rain.
          `),
          tip: 'Piège : **mustn’t** = interdit ; **don’t have to** = pas obligé.',
        },
        {
          title: 'Construction',
          body: 'Un modal est suivi de la **base verbale sans to** : She can **swim** (pas « to swim », pas « swims »).',
          examples: ex(`
            Could you help me, please? | Pourriez-vous m’aider, s’il vous plaît ?
            You should see a doctor. | Tu devrais voir un médecin.
            He must be tired. | Il doit être fatigué. (déduction)
          `),
        },
      ],
      vocab: vocab(`
        can | pouvoir, savoir
        must | devoir
        have to | être obligé de
        should | devrait
        might | pourrait (peut-être)
        wear | porter (vêtement)
        rest | se reposer
        allowed | autorisé
      `),
      exercises: [
        qcm('« Tu n’es pas obligé de venir » :', 'You don’t have to come.', ['You mustn’t come.', 'You haven’t to come.', 'You must not to come.']),
        qcm('« Il est interdit de fumer ici » :', 'You mustn’t smoke here.', ['You don’t have to smoke here.', 'You shouldn’t to smoke.', 'You can’t to smoke.']),
        qcm('« Tu devrais te reposer » :', 'You should rest.', ['You should to rest.', 'You must rest now or else.', 'You would rest.']),
        qcm('« Il va peut-être pleuvoir » :', 'It might rain.', ['It might to rain.', 'It must rain.', 'It can rains.']),
        type('Complète : She ___ swim very well. (capacité)', 'can'),
        order('Remets dans l’ordre : « Pourriez-vous m’aider ? »', 'Could you help me?', 'Pourriez-vous m’aider ?'),
      ],
    },
    {
      id: 'en-b1-4',
      title: 'Le premier conditionnel',
      subtitle: 'If it rains, I’ll stay · unless · when',
      duration: 25,
      objectives: ['Parler d’une condition réelle au futur', 'Utiliser unless, as soon as, when'],
      sections: [
        {
          title: 'If + présent, will + base',
          body: 'Pour une condition **possible** dans le futur. Jamais de will après **if** !',
          examples: ex(`
            If it rains, I’ll stay at home. | S’il pleut, je resterai à la maison.
            If you study, you’ll pass. | Si tu étudies, tu réussiras.
            I won’t go unless you come. | Je n’irai pas à moins que tu viennes.
            I’ll call you when I arrive. | Je t’appellerai quand j’arriverai.
          `),
          tip: 'Même règle après **when, as soon as, before, after** : le français met un futur, l’anglais un **présent** (when I **arrive**).',
        },
        {
          title: 'Le zéro conditionnel',
          body: 'Pour les vérités générales : **if + présent, présent**.',
          examples: ex(`
            If you heat ice, it melts. | Si on chauffe de la glace, elle fond.
          `),
        },
      ],
      vocab: vocab(`
        if | si
        unless | à moins que
        as soon as | dès que
        pass | réussir (examen)
        fail | échouer
        heat | chauffer
        melt | fondre
        late | en retard
      `),
      exercises: [
        qcm('« S’il pleut, je resterai… » :', 'If it rains, I’ll stay…', ['If it will rain, I’ll stay…', 'If it rains, I stay…', 'If it rained, I’ll stay…']),
        qcm('« Je t’appellerai quand j’arriverai » :', 'I’ll call you when I arrive.', ['I’ll call you when I’ll arrive.', 'I call you when I will arrive.', 'I’ll call you when I arrived.']),
        qcm('« unless » veut dire…', 'à moins que', ['jusqu’à ce que', 'même si', 'dès que']),
        qcm('Zéro conditionnel : « If you heat ice, it ___. »', 'melts', ['will melt', 'melted', 'would melt']),
        type('Complète : If you study, you ___ pass. (futur)', 'will'),
        order('Remets dans l’ordre : « Si tu te dépêches, tu ne seras pas en retard. »', 'If you hurry, you won’t be late.', 'Si tu te dépêches, tu ne seras pas en retard.'),
      ],
    },
    {
      id: 'en-b1-5',
      title: 'Les relatives',
      subtitle: 'who · which · that · whose · where',
      duration: 25,
      objectives: ['Choisir le bon pronom relatif', 'Savoir quand on peut l’omettre'],
      sections: [
        {
          title: 'Les pronoms',
          table: table(`
            Pronom | Pour | Exemple
            who | personnes | The man who lives next door…
            which | choses | The car which I bought…
            that | personnes ou choses (courant) | The book that you gave me…
            whose | possession (dont le) | The girl whose brother is a pilot…
            where | lieux | The town where I was born…
          `),
        },
        {
          title: 'Omettre le pronom',
          body: 'Quand le pronom est **complément** (et non sujet), on peut le supprimer, c’est très courant à l’oral.',
          examples: ex(`
            The film (that) we saw was great. | Le film que nous avons vu était génial.
            The woman who called you is my aunt. | La femme qui t’a appelé est ma tante. (sujet : obligatoire)
          `),
        },
      ],
      vocab: vocab(`
        next door | à côté (voisin)
        born | né
        aunt | tante
        uncle | oncle
        pilot | pilote
        neighbour | voisin
        town | ville
        give / gave | donner / a donné
      `),
      exercises: [
        qcm('« La ville où je suis né » :', 'The town where I was born', ['The town which I was born', 'The town who I was born', 'The town where I born']),
        qcm('« La fille dont le frère est pilote » :', 'The girl whose brother is a pilot', ['The girl who’s brother is a pilot', 'The girl which brother is a pilot', 'The girl that brother is a pilot']),
        qcm('Dans quelle phrase peut-on omettre le pronom ?', 'The film that we saw was great.', ['The man who lives here is kind.', 'The dog which bit me ran away.', 'The girl who called is Amy.']),
        qcm('Pour une personne, on utilise…', 'who', ['which', 'where', 'whose']),
        type('Complète : The car ___ I bought is red. (chose)', ['which', 'that']),
        match('Associe', [['who', 'personnes'], ['which', 'choses'], ['where', 'lieux'], ['whose', 'possession']]),
      ],
    },
  ],
  test: [
    qcm('« As-tu déjà mangé des huîtres ? » :', 'Have you ever eaten oysters?', ['Did you ever eat oysters yesterday?', 'Have you ever ate oysters?', 'Are you ever eaten oysters?']),
    qcm('« Je travaille ici depuis 3 ans » :', 'I’ve worked here for three years.', ['I work here since three years.', 'I’ve worked here since three years.', 'I worked here for three years ago.']),
    qcm('« Je l’ai rencontré en 2018 » :', 'I met him in 2018.', ['I’ve met him in 2018.', 'I have meet him in 2018.', 'I meet him in 2018.']),
    qcm('« Tu n’es pas obligé » :', 'You don’t have to.', ['You mustn’t.', 'You haven’t.', 'You shouldn’t to.']),
    qcm('« Il doit être à la maison » (déduction) :', 'He must be at home.', ['He has to be at home.', 'He should to be at home.', 'He can be at home sure.']),
    qcm('« Dès que je saurai, je te le dirai » :', 'As soon as I know, I’ll tell you.', ['As soon as I’ll know, I tell you.', 'As soon as I know, I tell you.', 'As soon I will know, I’ll tell you.']),
    qcm('« L’homme qui habite à côté » :', 'The man who lives next door', ['The man which lives next door', 'The man whose lives next door', 'The man where lives next door']),
    qcm('Participe passé de « go » :', 'gone', ['went', 'goed', 'going']),
    match('Associe', [['should', 'conseil'], ['might', 'possibilité'], ['mustn’t', 'interdiction'], ['can', 'capacité']]),
    order('Remets dans l’ordre : « Je n’ai pas encore fini. »', 'I haven’t finished yet.', 'Je n’ai pas encore fini.'),
    type('Complète : She has lived in Paris ___ 2015.', 'since'),
    type('Complète : If it rains, we ___ stay at home. (futur)', 'will'),
  ],
}
