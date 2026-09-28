import type { Level } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

export const enB2: Level = {
  id: 'en-b2',
  index: 4,
  name: 'Niveau 4 — Intermédiaire avancé',
  korean: 'Upper intermediate',
  cefr: 'B2',
  topik: 'Cambridge B2 First · TOEIC 785+',
  color: '#862e9c',
  description: 'Imaginer avec les 2e et 3e conditionnels, utiliser la voix passive, rapporter des paroles, maîtriser les phrasal verbs et raconter avec le past perfect. Le niveau demandé en entreprise.',
  lessons: [
    {
      id: 'en-b2-1',
      title: 'Les 2e et 3e conditionnels',
      subtitle: 'If I had… I would · If I had known… I would have',
      duration: 35,
      objectives: ['Imaginer une situation irréelle', 'Exprimer un regret sur le passé'],
      sections: [
        {
          title: '2e conditionnel : irréel du présent',
          body: '**If + prétérit, would + base**. Avec be, on dit souvent **were** à toutes les personnes.',
          examples: ex(`
            If I had more time, I would travel. | Si j’avais plus de temps, je voyagerais.
            If I were you, I’d accept. | Si j’étais toi, j’accepterais.
            What would you do if you won the lottery? | Que ferais-tu si tu gagnais au loto ?
          `),
        },
        {
          title: '3e conditionnel : irréel du passé',
          body: '**If + past perfect, would have + participe**. Pour un regret ou une situation passée qu’on ne peut plus changer.',
          examples: ex(`
            If I had known, I would have come. | Si j’avais su, je serais venu.
            If she hadn’t missed the train, she wouldn’t have been late. | Si elle n’avait pas raté le train, elle n’aurait pas été en retard.
          `),
          tip: 'Contractions à l’oral : I’d have = I **would** have ; If I’d known = If I **had** known.',
        },
      ],
      vocab: vocab(`
        lottery | loterie
        accept | accepter
        miss | rater
        regret | regretter
        known | su, connu
        advice | conseil
        choice | choix
        instead | à la place
      `),
      exercises: [
        qcm('« Si j’étais riche, j’achèterais une maison » :', 'If I were rich, I would buy a house.', ['If I would be rich, I would buy a house.', 'If I am rich, I would buy a house.', 'If I were rich, I will buy a house.']),
        qcm('« Si j’avais su, je serais venu » :', 'If I had known, I would have come.', ['If I knew, I would come.', 'If I would have known, I had come.', 'If I had knew, I would came.']),
        qcm('Le 3e conditionnel parle…', 'd’une situation passée irréelle', ['d’une habitude', 'd’un futur probable', 'd’une vérité générale']),
        qcm('« If I were you » veut dire…', 'À ta place', ['Si tu étais moi', 'Si j’étais avec toi', 'Quand j’étais toi']),
        type('Complète : If I had more time, I ___ travel.', ['would', '’d']),
        order('Remets dans l’ordre : « Que ferais-tu si tu gagnais ? »', 'What would you do if you won?', 'Que ferais-tu si tu gagnais ?'),
      ],
    },
    {
      id: 'en-b2-2',
      title: 'La voix passive',
      subtitle: 'is made · was built · has been sold',
      duration: 30,
      objectives: ['Former le passif à tous les temps', 'Savoir quand l’utiliser'],
      sections: [
        {
          title: 'be + participe passé',
          table: table(`
            Temps | Actif | Passif
            présent | They make cars here. | Cars are made here.
            prétérit | They built it in 1900. | It was built in 1900.
            present perfect | They have sold the house. | The house has been sold.
            futur | They will announce it. | It will be announced.
            modal | You must sign it. | It must be signed.
          `),
        },
        {
          title: 'Pourquoi le passif ?',
          body: 'Quand l’auteur est **inconnu**, **évident** ou **sans importance**, ou pour mettre en avant le résultat. Très fréquent dans la presse, les rapports et les consignes. L’auteur, s’il est mentionné, est introduit par **by**.',
          examples: ex(`
            English is spoken all over the world. | L’anglais est parlé dans le monde entier.
            My bike was stolen yesterday. | On m’a volé mon vélo hier.
            Hamlet was written by Shakespeare. | Hamlet a été écrit par Shakespeare.
          `),
        },
      ],
      vocab: vocab(`
        build / built | construire / construit
        steal / stolen | voler / volé
        sign | signer
        announce | annoncer
        report | rapport
        speak / spoken | parler / parlé
        sell / sold | vendre / vendu
        write / written | écrire / écrit
      `),
      exercises: [
        qcm('« La maison a été vendue » :', 'The house has been sold.', ['The house has sold.', 'The house was been sold.', 'The house is sell.']),
        qcm('« Le pont a été construit en 1890 » :', 'The bridge was built in 1890.', ['The bridge built in 1890.', 'The bridge has built in 1890.', 'The bridge was build in 1890.']),
        qcm('« On m’a volé mon téléphone » :', 'My phone was stolen.', ['My phone stole.', 'They was stolen my phone.', 'I was stolen my phone.']),
        qcm('Passif de « They will announce the results » :', 'The results will be announced.', ['The results will announced.', 'The results are will announced.', 'The results will being announced.']),
        type('Complète : English ___ spoken here. (présent)', 'is'),
        order('Remets dans l’ordre : « Ce document doit être signé. »', 'This document must be signed.', 'Ce document doit être signé.'),
      ],
    },
    {
      id: 'en-b2-3',
      title: 'Le discours rapporté',
      subtitle: 'She said (that)… · He asked if… · told me to',
      duration: 30,
      objectives: ['Faire la concordance des temps', 'Rapporter questions et ordres', 'Distinguer say et tell'],
      sections: [
        {
          title: 'Le recul des temps',
          table: table(`
            Direct | Rapporté
            « I am tired. » | She said she was tired.
            « I saw it. » | He said he had seen it.
            « I will call. » | She said she would call.
            « I can swim. » | He said he could swim.
            « Are you ready? » | She asked if I was ready.
            « Close the door! » | He told me to close the door.
          `),
        },
        {
          title: 'say ou tell ?',
          body: '**say** (something) : She **said** that… **tell** + personne : She **told me** that… Jamais « she said me ».',
          examples: ex(`
            He told me he was leaving. | Il m’a dit qu’il partait.
            She said she’d be late. | Elle a dit qu’elle serait en retard.
            They asked me where I lived. | Ils m’ont demandé où j’habitais.
          `),
          tip: 'Dans une question rapportée, **pas d’inversion** : she asked where I **lived** (et non where did I live).',
        },
      ],
      vocab: vocab(`
        say / said | dire / a dit
        tell / told | dire (à quelqu’un)
        ask / asked | demander
        explain | expliquer
        promise | promettre
        admit | admettre
        suggest | suggérer
        deny | nier
      `),
      exercises: [
        qcm('« I am hungry » → She said…', 'she was hungry', ['she is hungry', 'she has been hungry', 'I was hungry']),
        qcm('« I will help » → He said…', 'he would help', ['he will help', 'he helped', 'he had help']),
        qcm('Quelle phrase est correcte ?', 'She told me she was tired.', ['She said me she was tired.', 'She told she was tired.', 'She said to me that she is tired yesterday.']),
        qcm('« Where do you live? » → They asked me…', 'where I lived', ['where did I live', 'where do I live', 'where I live?']),
        type('« Sit down! » → He told me ___ sit down.', 'to'),
        order('Remets dans l’ordre : « Elle m’a demandé si j’étais prêt. »', 'She asked if I was ready.', 'Elle m’a demandé si j’étais prêt.'),
      ],
    },
    {
      id: 'en-b2-4',
      title: 'Les phrasal verbs',
      subtitle: 'give up · look forward to · run out of',
      duration: 30,
      objectives: ['Comprendre 15 phrasal verbs essentiels', 'Placer le complément'],
      sections: [
        {
          title: 'Verbe + particule = nouveau sens',
          table: table(`
            Phrasal verb | Sens | Exemple
            give up | abandonner, arrêter | I gave up smoking.
            look after | s’occuper de | She looks after her kids.
            look forward to | avoir hâte de | I look forward to meeting you.
            find out | découvrir | I found out the truth.
            run out of | être à court de | We’ve run out of milk.
            turn down | refuser | He turned down the offer.
            get on with | bien s’entendre avec | I get on well with my boss.
            put off | reporter | They put off the meeting.
            carry on | continuer | Carry on!
            set up | créer, installer | She set up her own company.
          `),
          tip: '**Look forward to** est suivi de **-ing** : I look forward to **hearing** from you (formule classique des e-mails).',
        },
        {
          title: 'Où placer le complément ?',
          body: 'Pour beaucoup de phrasal verbs séparables, le nom peut se mettre avant ou après la particule, mais un **pronom se met toujours au milieu** : turn **it** down (jamais turn down it).',
        },
      ],
      vocab: vocab(`
        give up | abandonner
        look after | s’occuper de
        find out | découvrir
        run out of | être à court de
        turn down | refuser
        put off | reporter
        carry on | continuer
        set up | créer
      `),
      dialogue: dlg(`
        Kate: Did you accept the job offer? | Tu as accepté l’offre d’emploi ?
        Ben: No, I turned it down. The salary was too low. | Non, je l’ai refusée. Le salaire était trop bas.
        Kate: Don’t give up! Something better will come up. | N’abandonne pas ! Quelque chose de mieux va se présenter.
      `),
      exercises: [
        qcm('« Nous n’avons plus de lait » :', 'We’ve run out of milk.', ['We’ve run off milk.', 'We’ve given up milk.', 'We’ve put off milk.']),
        qcm('« J’ai hâte de vous rencontrer » :', 'I look forward to meeting you.', ['I look forward to meet you.', 'I look after meeting you.', 'I look for to meet you.']),
        qcm('« Il a refusé l’offre » (avec pronom) :', 'He turned it down.', ['He turned down it.', 'He down turned it.', 'He turned it off down.']),
        qcm('« put off » veut dire…', 'reporter', ['éteindre', 'mettre', 'enlever']),
        match('Associe', [['give up', 'abandonner'], ['look after', 's’occuper de'], ['find out', 'découvrir'], ['set up', 'créer']]),
        type('Complète : I get ___ well with my colleagues. (bien s’entendre)', 'on'),
      ],
    },
    {
      id: 'en-b2-5',
      title: 'Raconter : past perfect et past continuous',
      subtitle: 'was walking · had already left · used to',
      duration: 30,
      objectives: ['Combiner les temps du récit', 'Parler d’anciennes habitudes avec used to'],
      sections: [
        {
          title: 'Les temps du récit',
          table: table(`
            Temps | Rôle | Exemple
            past continuous | décor, action en cours | I was walking home…
            prétérit | action principale | …when I saw a fox.
            past perfect | action antérieure | The film had started when we arrived.
          `),
          examples: ex(`
            It was raining and everyone was waiting for the bus. | Il pleuvait et tout le monde attendait le bus.
            When I got to the station, the train had already left. | Quand je suis arrivé à la gare, le train était déjà parti.
          `),
        },
        {
          title: 'used to',
          body: '**used to + base** : une habitude passée qui n’existe plus.',
          examples: ex(`
            I used to live in Lyon. | Avant, j’habitais à Lyon.
            Did you use to play football? | Tu jouais au foot avant ?
            She didn’t use to like coffee. | Avant, elle n’aimait pas le café.
          `),
        },
      ],
      vocab: vocab(`
        suddenly | soudain
        meanwhile | pendant ce temps
        by the time | au moment où
        fox | renard
        get to | arriver à
        used to | avoir l’habitude (passé)
        already | déjà
        story | histoire
      `),
      exercises: [
        qcm('« Je marchais quand j’ai vu un renard » :', 'I was walking when I saw a fox.', ['I walked when I was seeing a fox.', 'I was walking when I was see a fox.', 'I had walked when I see a fox.']),
        qcm('« Le train était déjà parti » :', 'The train had already left.', ['The train has already left.', 'The train was already leaving.', 'The train already left had.']),
        qcm('« Avant, je fumais » :', 'I used to smoke.', ['I use to smoke.', 'I was used to smoke.', 'I used to smoking.']),
        qcm('Le past perfect exprime…', 'une action antérieure à une autre action passée', ['une action en cours', 'une habitude présente', 'un futur']),
        type('Complète : She didn’t ___ to like coffee.', 'use'),
        order('Remets dans l’ordre : « Il pleuvait quand je suis sorti. »', 'It was raining when I went out.', 'Il pleuvait quand je suis sorti.'),
      ],
    },
  ],
  test: [
    qcm('« Si j’avais une voiture, je te conduirais » :', 'If I had a car, I would drive you.', ['If I would have a car, I drive you.', 'If I have a car, I would drive you.', 'If I had a car, I will drive you.']),
    qcm('« Si tu m’avais appelé, je serais venu » :', 'If you had called me, I would have come.', ['If you called me, I would come.', 'If you would have called, I had come.', 'If you had call me, I would came.']),
    qcm('« Ce livre a été traduit en 20 langues » :', 'This book has been translated into 20 languages.', ['This book has translated into 20 languages.', 'This book is been translated in 20 languages.', 'This book was translate into 20 languages.']),
    qcm('« I can’t come » → He said…', 'he couldn’t come', ['he can’t come', 'he can’t came', 'he hasn’t come']),
    qcm('Quelle phrase est correcte ?', 'He told me to wait.', ['He said me to wait.', 'He told to me wait.', 'He said me wait.']),
    qcm('« avoir hâte de » :', 'look forward to', ['look after', 'look for', 'look up']),
    qcm('« Quand je suis arrivé, elle était partie » :', 'When I arrived, she had left.', ['When I arrived, she has left.', 'When I had arrived, she left.', 'When I arrive, she had left.']),
    qcm('« Avant, j’habitais à Londres » :', 'I used to live in London.', ['I use to live in London.', 'I was used to live in London.', 'I used living in London.']),
    match('Associe', [['turn down', 'refuser'], ['run out of', 'être à court de'], ['put off', 'reporter'], ['carry on', 'continuer']]),
    order('Remets dans l’ordre : « Si j’étais toi, j’accepterais. »', 'If I were you, I would accept.', 'Si j’étais toi, j’accepterais.'),
    type('Complète : My bike ___ stolen yesterday.', 'was'),
    type('Complète : I gave ___ smoking last year. (arrêter)', 'up'),
  ],
}

export const enC1: Level = {
  id: 'en-c1',
  index: 5,
  name: 'Niveau 5 — Avancé & courant',
  korean: 'Advanced',
  cefr: 'C1-C2',
  topik: 'Cambridge C1 Advanced · IELTS 7+ · TOEIC 945+',
  color: '#364fc7',
  description: 'Parler et écrire comme un natif : idioms, inversion et emphase, wish / if only, écrit formel et connecteurs, et stratégies pour IELTS et Cambridge.',
  lessons: [
    {
      id: 'en-c1-1',
      title: 'Idioms du quotidien',
      subtitle: 'a piece of cake · break the ice · under the weather',
      duration: 25,
      objectives: ['Comprendre les idioms les plus courants', 'Les utiliser à bon escient'],
      sections: [
        {
          title: 'Les incontournables',
          table: table(`
            Idiom | Sens
            a piece of cake | du gâteau, très facile
            break the ice | briser la glace
            under the weather | patraque
            cost an arm and a leg | coûter les yeux de la tête
            hit the nail on the head | mettre le doigt dessus
            let the cat out of the bag | vendre la mèche
            once in a blue moon | tous les trente-six du mois
            the ball is in your court | la balle est dans ton camp
          `),
        },
        {
          title: 'En situation',
          examples: ex(`
            The exam was a piece of cake. | L’examen était du gâteau.
            I’m feeling a bit under the weather today. | Je suis un peu patraque aujourd’hui.
            I only see him once in a blue moon. | Je ne le vois que très rarement.
          `),
          tip: 'Les idioms donnent du naturel à l’oral, mais évite-les dans un écrit formel (lettre de motivation, rapport).',
        },
      ],
      vocab: vocab(`
        a piece of cake | très facile
        under the weather | patraque
        break the ice | briser la glace
        costly | coûteux
        nail | clou
        bag | sac
        court | terrain (sport), tribunal
        rarely | rarement
      `),
      exercises: [
        qcm('« under the weather » veut dire…', 'un peu malade', ['sous la pluie', 'de mauvaise humeur', 'en vacances']),
        qcm('« let the cat out of the bag » veut dire…', 'vendre la mèche', ['libérer quelqu’un', 'faire une bêtise', 'partir en voyage']),
        qcm('« once in a blue moon » veut dire…', 'très rarement', ['une fois par mois', 'la nuit', 'jamais']),
        match('Associe', [['a piece of cake', 'très facile'], ['break the ice', 'briser la glace'], ['cost an arm and a leg', 'coûter très cher'], ['hit the nail on the head', 'mettre le doigt dessus']]),
        type('Complète : The ball is in your ___. (c’est à toi de jouer)', 'court'),
        qcm('Où éviter les idioms ?', 'dans un écrit formel', ['entre amis', 'dans un film', 'dans une conversation détendue']),
      ],
    },
    {
      id: 'en-c1-2',
      title: 'Inversion et emphase',
      subtitle: 'Never have I… · Not only… but also · What I need is…',
      duration: 30,
      objectives: ['Utiliser l’inversion après une expression négative', 'Mettre en relief avec les cleft sentences'],
      sections: [
        {
          title: 'L’inversion (registre soutenu)',
          body: 'Après une expression négative ou restrictive placée en tête, on **inverse** sujet et auxiliaire, comme dans une question.',
          examples: ex(`
            Never have I seen such a mess. | Jamais je n’ai vu un tel désordre.
            Not only did he lie, but he also stole. | Non seulement il a menti, mais il a aussi volé.
            Rarely do we get such an opportunity. | Rarement avons-nous une telle occasion.
            Hardly had I arrived when the phone rang. | À peine étais-je arrivé que le téléphone a sonné.
          `),
        },
        {
          title: 'Les phrases clivées',
          examples: ex(`
            What I need is a holiday. | Ce dont j’ai besoin, c’est de vacances.
            It was Tom who broke the window. | C’est Tom qui a cassé la fenêtre.
            All I want is some peace. | Tout ce que je veux, c’est un peu de calme.
          `),
          tip: 'Autre emphase facile : **do / did** à l’affirmatif : I **do** like it! (J’aime vraiment ça !)',
        },
      ],
      vocab: vocab(`
        never | jamais
        rarely | rarement
        hardly | à peine
        not only… but also | non seulement… mais aussi
        such | tel, un tel
        mess | désordre
        opportunity | occasion
        peace | calme, paix
      `),
      exercises: [
        qcm('Inversion correcte :', 'Never have I seen such a view.', ['Never I have seen such a view.', 'Never I saw such a view.', 'Never seen have I such a view.']),
        qcm('« Non seulement il est en retard, mais… » :', 'Not only is he late, but…', ['Not only he is late, but…', 'Not only he late is, but…', 'Only not is he late, but…']),
        qcm('« Ce dont j’ai besoin, c’est de dormir » :', 'What I need is sleep.', ['That I need is sleep.', 'Which I need is sleep.', 'What I need it is sleep.']),
        qcm('« I do like it! » exprime…', 'l’insistance', ['une question', 'le passé', 'une négation']),
        type('Complète : Rarely ___ we see him. (inversion, présent)', 'do'),
        order('Remets dans l’ordre : « C’est Tom qui a cassé la fenêtre. »', 'It was Tom who broke the window.', 'C’est Tom qui a cassé la fenêtre.'),
      ],
    },
    {
      id: 'en-c1-3',
      title: 'Souhaits et regrets',
      subtitle: 'I wish I knew · If only I had… · I’d rather',
      duration: 25,
      objectives: ['Exprimer un souhait ou un regret', 'Utiliser would rather et it’s time'],
      sections: [
        {
          title: 'wish / if only',
          table: table(`
            Structure | Sens | Exemple
            wish + prétérit | regret sur le présent | I wish I knew the answer.
            wish + past perfect | regret sur le passé | I wish I had studied more.
            wish + would | agacement, souhait de changement | I wish you would stop talking.
            if only | version plus forte | If only I had listened!
          `),
        },
        {
          title: 'would rather et it’s time',
          examples: ex(`
            I’d rather stay at home. | Je préférerais rester à la maison.
            I’d rather you didn’t smoke. | Je préférerais que tu ne fumes pas.
            It’s time we left. | Il est temps que nous partions.
          `),
          tip: 'Après **I’d rather + autre sujet** et **it’s time**, on utilise le **prétérit** même pour un sens présent.',
        },
      ],
      vocab: vocab(`
        wish | souhaiter
        if only | si seulement
        would rather | préférer
        it’s time | il est temps
        regret | regret
        listen | écouter
        answer | réponse
        stop | arrêter
      `),
      exercises: [
        qcm('« J’aimerais savoir parler chinois » :', 'I wish I could speak Chinese.', ['I wish I can speak Chinese.', 'I wish I will speak Chinese.', 'I wish to I spoke Chinese.']),
        qcm('« Si seulement je l’avais écouté ! » :', 'If only I had listened to him!', ['If only I listened to him yesterday!', 'If only I have listened to him!', 'If only I would listen to him before!']),
        qcm('« Il est temps que nous partions » :', 'It’s time we left.', ['It’s time we leave.', 'It’s time we will leave.', 'It’s time we had leave.']),
        qcm('« Je préférerais que tu restes » :', 'I’d rather you stayed.', ['I’d rather you stay.', 'I’d rather you will stay.', 'I’d rather you to stay.']),
        type('Complète : I wish I ___ studied more. (regret passé)', 'had'),
        order('Remets dans l’ordre : « Je préférerais rester à la maison. »', 'I’d rather stay at home.', 'Je préférerais rester à la maison.'),
      ],
    },
    {
      id: 'en-c1-4',
      title: 'L’écrit formel',
      subtitle: 'Furthermore · Nevertheless · I am writing to…',
      duration: 30,
      objectives: ['Structurer un essai', 'Rédiger un e-mail professionnel'],
      sections: [
        {
          title: 'Connecteurs soutenus',
          table: table(`
            Connecteur | Sens
            furthermore / moreover | de plus
            nevertheless / nonetheless | néanmoins
            whereas | alors que
            consequently / therefore | par conséquent
            in addition to + -ing | en plus de
            despite + nom / -ing | malgré
            to sum up | en résumé
          `),
        },
        {
          title: 'L’e-mail professionnel',
          examples: ex(`
            Dear Ms Smith, | Madame Smith,
            I am writing to enquire about… | Je vous écris pour me renseigner sur…
            Please find attached my CV. | Veuillez trouver ci-joint mon CV.
            I would be grateful if you could… | Je vous serais reconnaissant de bien vouloir…
            I look forward to hearing from you. | Dans l’attente de votre réponse.
            Kind regards, / Yours sincerely, | Cordialement,
          `),
          tip: 'À l’écrit formel : pas de contractions (I am, not I’m) et pas de phrasal verbs familiers.',
        },
      ],
      vocab: vocab(`
        furthermore | de plus
        nevertheless | néanmoins
        whereas | alors que
        therefore | par conséquent
        despite | malgré
        enquire | se renseigner
        attached | ci-joint
        grateful | reconnaissant
      `),
      exercises: [
        qcm('« Néanmoins » (soutenu) :', 'nevertheless', ['furthermore', 'whereas', 'therefore']),
        qcm('« Malgré la pluie » :', 'despite the rain', ['despite of the rain', 'although the rain', 'in spite the rain']),
        qcm('Formule de fin d’un e-mail formel :', 'I look forward to hearing from you.', ['See you soon!', 'Cheers!', 'Bye for now!']),
        qcm('À l’écrit formel, on évite…', 'les contractions', ['les connecteurs', 'les majuscules', 'les paragraphes']),
        type('Complète : Please find ___ my CV. (ci-joint)', 'attached'),
        match('Associe', [['whereas', 'alors que'], ['therefore', 'par conséquent'], ['furthermore', 'de plus'], ['to sum up', 'en résumé']]),
      ],
    },
    {
      id: 'en-c1-5',
      title: 'Préparer IELTS et Cambridge',
      subtitle: 'Speaking · Writing Task 2 · Use of English',
      duration: 30,
      objectives: ['Connaître les épreuves', 'Gagner des points à l’oral et à l’écrit'],
      sections: [
        {
          title: 'Les épreuves',
          body: '**IELTS** : Listening, Reading, Writing (2 tâches), Speaking (entretien de 11-14 min) — noté de 1 à 9. **Cambridge C1 Advanced** : Reading & Use of English, Writing, Listening, Speaking (en binôme). **TOEIC** : compréhension orale et écrite, surtout en contexte professionnel.',
        },
        {
          title: 'Phrases qui font gagner des points',
          examples: ex(`
            That’s an interesting question. Let me think… | C’est une question intéressante. Laissez-moi réfléchir…
            From my point of view… | De mon point de vue…
            On the one hand… on the other hand… | D’un côté… de l’autre…
            It could be argued that… | On pourrait avancer que…
            To put it another way… | Autrement dit…
          `),
          tip: 'À l’oral, l’examinateur évalue aussi la **fluidité** : mieux vaut reformuler que rester silencieux.',
        },
      ],
      vocab: vocab(`
        band score | note (IELTS)
        fluency | aisance
        accuracy | précision
        range | variété (vocabulaire)
        essay | dissertation
        paraphrase | reformuler
        argue | soutenir, argumenter
        examiner | examinateur
      `),
      exercises: [
        qcm('L’IELTS est noté…', 'de 1 à 9', ['de 0 à 20', 'de A à F', 'de 10 à 990']),
        qcm('« It could be argued that… » veut dire…', 'On pourrait avancer que…', ['Il faut se disputer…', 'Il est interdit de…', 'Personne ne pense que…']),
        qcm('« fluency » veut dire…', 'l’aisance', ['la précision', 'la grammaire', 'l’accent']),
        match('Associe', [['essay', 'dissertation'], ['accuracy', 'précision'], ['range', 'variété'], ['paraphrase', 'reformuler']]),
        type('Complète : On the one hand… on the other ___…', 'hand'),
        order('Remets dans l’ordre : « De mon point de vue… »', 'From my point of view…', 'De mon point de vue…'),
      ],
    },
  ],
  test: [
    qcm('« coûter les yeux de la tête » :', 'cost an arm and a leg', ['cost an eye and a head', 'break the bank of eyes', 'a piece of cake']),
    qcm('« vendre la mèche » :', 'let the cat out of the bag', ['break the ice', 'hit the nail on the head', 'under the weather']),
    qcm('Inversion correcte :', 'Hardly had I arrived when it started.', ['Hardly I had arrived when it started.', 'Hardly I arrived when it started.', 'Hardly arrived had I when it started.']),
    qcm('« Ce que je veux, c’est… » :', 'What I want is…', ['That I want is…', 'Which I want is…', 'It I want is…']),
    qcm('« J’aurais aimé partir plus tôt » :', 'I wish I had left earlier.', ['I wish I left earlier yesterday.', 'I wish I would leave earlier before.', 'I wish I have left earlier.']),
    qcm('« Il est temps que tu te couches » :', 'It’s time you went to bed.', ['It’s time you go to bed.', 'It’s time you will go to bed.', 'It’s time for you go to bed.']),
    qcm('« alors que » (contraste) :', 'whereas', ['therefore', 'furthermore', 'despite']),
    qcm('Ouverture d’un e-mail formel :', 'I am writing to…', ['Hey there,', 'What’s up?', 'Just a quick one…']),
    match('Associe', [['nevertheless', 'néanmoins'], ['despite', 'malgré'], ['moreover', 'de plus'], ['consequently', 'par conséquent']]),
    order('Remets dans l’ordre : « Jamais je n’ai vu une telle chose. »', 'Never have I seen such a thing.', 'Jamais je n’ai vu une telle chose.'),
    type('Complète : If only I ___ listened! (regret passé)', 'had'),
    type('Complète : I look forward to ___ from you.', 'hearing'),
  ],
}
