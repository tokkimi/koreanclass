import type { Level } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

export const frB2: Level = {
  id: 'fr-b2',
  index: 4,
  name: 'Level 4 — Upper intermediate',
  korean: 'Intermédiaire avancé',
  cefr: 'B2',
  topik: 'DELF B2',
  color: '#a61e4d',
  description: 'Imagine and regret with the conditional and si clauses, report what people said, use the passive and the gérondif, and build a clear argument. The level required by French universities.',
  lessons: [
    {
      id: 'fr-b2-1',
      title: 'The conditional',
      subtitle: 'je voudrais · tu pourrais · il faudrait',
      duration: 25,
      objectives: ['Form the present conditional', 'Be polite, give advice, imagine'],
      sections: [
        {
          title: 'Formation',
          body: 'Future stem + imparfait endings: **-ais, -ais, -ait, -ions, -iez, -aient**. parler → je parler**ais**, être → je **serais**, avoir → j’**aurais**, pouvoir → je **pourrais**, faire → je **ferais**.',
          examples: ex(`
            Je voudrais réserver une table. | I would like to book a table.
            Tu pourrais m’aider ? | Could you help me?
            Vous devriez vous reposer. | You should rest.
            À ta place, j’accepterais. | If I were you, I would accept.
          `),
        },
        {
          title: 'The past conditional',
          body: '**avoir / être in the conditional + past participle**: for regrets and reproaches.',
          examples: ex(`
            J’aurais dû partir plus tôt. | I should have left earlier.
            Tu aurais pu m’appeler ! | You could have called me!
          `),
        },
      ],
      vocab: vocab(`
        je voudrais | I would like
        tu pourrais | you could
        vous devriez | you should
        à ta place | if I were you
        réserver | to book
        j’aurais dû | I should have
        tu aurais pu | you could have
        le conseil | the advice
      `),
      exercises: [
        qcm('Conditional of « être » (je):', 'serais', ['étrais', 'serai', 'étais']),
        qcm('« Could you help me? » (tu):', 'Tu pourrais m’aider ?', ['Tu pouvais m’aider ?', 'Tu pourras m’aider ?', 'Tu peux m’aiderais ?']),
        qcm('« I should have left earlier »:', 'J’aurais dû partir plus tôt.', ['Je devrais partir plus tôt hier.', 'J’ai dû partir plus tôt.', 'Je devrais parti plus tôt.']),
        qcm('« You should rest » (vous):', 'Vous devriez vous reposer.', ['Vous devez vous reposer.', 'Vous deviez vous reposer.', 'Vous devrez vous reposer.']),
        type('Conditional of « aimer » (j’___)', 'aimerais'),
        order('Put in order: « I would like to book a table. »', 'Je voudrais réserver une table.', 'I would like to book a table.'),
      ],
    },
    {
      id: 'fr-b2-2',
      title: 'Si clauses',
      subtitle: 'si j’avais… je ferais · si j’avais su…',
      duration: 30,
      objectives: ['Use the three types of si clauses', 'Never put a conditional after si'],
      sections: [
        {
          title: 'The three patterns',
          table: table(`
            Si + | Main clause | Example
            présent | présent / futur | Si tu viens, on ira au cinéma.
            imparfait | conditionnel présent | Si j’avais le temps, je voyagerais.
            plus-que-parfait | conditionnel passé | Si j’avais su, je serais venu.
          `),
          tip: 'Golden rule: **never a conditional right after si**. « Si j’aurais » is a classic mistake (even among French speakers!).',
        },
        {
          title: 'Examples',
          examples: ex(`
            S’il fait beau demain, nous irons à la plage. | If the weather is nice tomorrow, we’ll go to the beach.
            Si j’étais riche, j’achèterais une maison en Provence. | If I were rich, I would buy a house in Provence.
            Si tu m’avais écouté, tu n’aurais pas raté ton train. | If you had listened to me, you wouldn’t have missed your train.
          `),
        },
      ],
      vocab: vocab(`
        si | if
        riche | rich
        le temps | time
        voyager | to travel
        su | known (savoir)
        rater | to miss
        écouter | to listen
        la Provence | Provence
      `),
      exercises: [
        qcm('« If I had time, I would travel »:', 'Si j’avais le temps, je voyagerais.', ['Si j’aurais le temps, je voyagerais.', 'Si j’ai le temps, je voyagerais.', 'Si j’avais le temps, je voyagerai.']),
        qcm('« If I had known, I would have come »:', 'Si j’avais su, je serais venu.', ['Si j’aurais su, je serais venu.', 'Si je savais, je viendrais.', 'Si j’avais su, je viendrais hier.']),
        qcm('After « si », we never use…', 'the conditional', ['the present', 'the imparfait', 'the plus-que-parfait']),
        qcm('« S’il pleut, je ___ à la maison. »', 'resterai', ['resterais', 'restais', 'serais resté']),
        type('Complete: Si j’___ riche, j’achèterais une maison. (être)', 'étais'),
        order('Put in order: « If you come, we’ll go to the cinema. »', 'Si tu viens, on ira au cinéma.', 'If you come, we’ll go to the cinema.'),
      ],
    },
    {
      id: 'fr-b2-3',
      title: 'Reported speech',
      subtitle: 'il a dit que… · elle m’a demandé si…',
      duration: 30,
      objectives: ['Report statements, questions and orders', 'Shift tenses correctly'],
      sections: [
        {
          title: 'Tense shifts (after a past verb)',
          table: table(`
            Direct | Reported
            « Je suis fatigué. » | Il a dit qu’il était fatigué.
            « J’ai fini. » | Il a dit qu’il avait fini.
            « Je partirai demain. » | Il a dit qu’il partirait le lendemain.
            « Tu viens ? » | Elle m’a demandé si je venais.
            « Qu’est-ce que tu veux ? » | Elle m’a demandé ce que je voulais.
            « Viens ! » | Il m’a dit de venir.
          `),
          tip: 'Time words change too: demain → **le lendemain**, hier → **la veille**, aujourd’hui → **ce jour-là**.',
        },
      ],
      vocab: vocab(`
        dire que | to say that
        demander si | to ask if
        ce que | what
        le lendemain | the next day
        la veille | the day before
        ce jour-là | that day
        expliquer | to explain
        répondre | to answer
      `),
      exercises: [
        qcm('« Je suis malade » → Il a dit qu’il…', 'était malade', ['est malade', 'sera malade', 'serait été malade']),
        qcm('« Tu viens ? » → Elle m’a demandé…', 'si je venais', ['que je venais', 'si tu viens', 'ce que je venais']),
        qcm('« Qu’est-ce que tu fais ? » → Il m’a demandé…', 'ce que je faisais', ['qu’est-ce que je faisais', 'que je faisais', 'si je faisais quoi']),
        qcm('« Je viendrai demain » → Il a dit qu’il viendrait…', 'le lendemain', ['demain', 'la veille', 'hier']),
        type('« Assieds-toi ! » → Il m’a dit ___ m’asseoir.', 'de'),
        match('Match', [['le lendemain', 'the next day'], ['la veille', 'the day before'], ['ce jour-là', 'that day'], ['ce que', 'what']]),
      ],
    },
    {
      id: 'fr-b2-4',
      title: 'The passive and the gérondif',
      subtitle: 'a été construit · en marchant',
      duration: 30,
      objectives: ['Form the passive voice', 'Use the gérondif for simultaneity and manner'],
      sections: [
        {
          title: 'The passive: être + participle',
          body: 'The participle **agrees** with the subject. The agent is introduced by **par**. French often prefers **on** instead: On a volé mon vélo (My bike was stolen).',
          examples: ex(`
            La tour Eiffel a été construite en 1889. | The Eiffel Tower was built in 1889.
            Le prix sera annoncé demain. | The prize will be announced tomorrow.
            Ce roman a été écrit par Victor Hugo. | This novel was written by Victor Hugo.
          `),
        },
        {
          title: 'The gérondif: en + -ant',
          body: 'Form: nous form minus -ons + **-ant**: nous marchons → **en marchant**. It expresses **while / by doing**. Irregular: être → en **étant**, avoir → en **ayant**, savoir → en **sachant**.',
          examples: ex(`
            Je chante en me douchant. | I sing while I shower.
            C’est en forgeant qu’on devient forgeron. | Practice makes perfect. (lit. « it’s by forging that one becomes a blacksmith »)
            Il a appris le français en regardant des films. | He learned French by watching films.
          `),
        },
      ],
      vocab: vocab(`
        construire | to build
        annoncer | to announce
        le roman | the novel
        voler | to steal
        en marchant | while walking
        apprendre | to learn
        le forgeron | the blacksmith
        par | by
      `),
      exercises: [
        qcm('« The house was sold »:', 'La maison a été vendue.', ['La maison a été vendu.', 'La maison était vendant.', 'La maison a vendue.']),
        qcm('Gérondif of « faire »:', 'en faisant', ['en fairant', 'en fait', 'en faisons']),
        qcm('« He learned French by watching films »:', 'Il a appris le français en regardant des films.', ['Il a appris le français pour regarder des films.', 'Il a appris le français à regardant des films.', 'Il a appris le français en regarder des films.']),
        qcm('A common French alternative to the passive is…', 'on', ['y', 'en', 'dont']),
        type('Gérondif of « être »', 'en étant'),
        order('Put in order: « I sing while I shower. »', 'Je chante en me douchant.', 'I sing while I shower.'),
      ],
    },
    {
      id: 'fr-b2-5',
      title: 'Building an argument',
      subtitle: 'd’abord · cependant · en effet · donc',
      duration: 30,
      objectives: ['Structure an essay or a debate', 'Use connectors of cause, opposition and consequence'],
      sections: [
        {
          title: 'Connectors',
          table: table(`
            Connector | Meaning | Function
            d’abord / ensuite / enfin | first / then / finally | order
            en effet | indeed | justify
            car / puisque | because / since | cause
            cependant / pourtant | however / yet | opposition
            alors que | whereas | contrast
            donc / c’est pourquoi | so / that’s why | consequence
            en conclusion | in conclusion | conclude
          `),
        },
        {
          title: 'A mini-argument',
          examples: ex(`
            D’abord, le télétravail fait gagner du temps. | First, remote work saves time.
            En effet, on évite les transports. | Indeed, you avoid commuting.
            Cependant, il peut isoler les salariés. | However, it can isolate employees.
            C’est pourquoi un modèle hybride semble idéal. | That’s why a hybrid model seems ideal.
          `),
          tip: 'For DELF B2 speaking, you defend an opinion on a short text: announce your plan (« Tout d’abord… ensuite… pour finir… »).',
        },
      ],
      vocab: vocab(`
        d’abord | first
        en effet | indeed
        cependant | however
        pourtant | yet
        donc | so, therefore
        alors que | whereas
        le télétravail | remote work
        le salarié | the employee
      `),
      exercises: [
        qcm('« However »:', 'cependant', ['donc', 'en effet', 'd’abord']),
        qcm('« That’s why »:', 'c’est pourquoi', ['c’est parce que', 'alors que', 'puisque']),
        qcm('« En effet » is used to…', 'justify or confirm', ['oppose', 'conclude', 'list']),
        match('Match', [['d’abord', 'first'], ['enfin', 'finally'], ['car', 'because'], ['donc', 'so']]),
        type('Translate: « whereas » (two words)', 'alors que'),
        order('Put in order: « However, it can isolate employees. »', 'Cependant, il peut isoler les salariés.', 'However, it can isolate employees.'),
      ],
    },
  ],
  test: [
    qcm('Conditional of « pouvoir » (nous):', 'pourrions', ['pouvrions', 'pourrons', 'pouvions']),
    qcm('« You could have told me! » (tu):', 'Tu aurais pu me le dire !', ['Tu pourrais me le dire hier !', 'Tu as pu me le dire !', 'Tu pouvais me le dire !']),
    qcm('« If I were you »:', 'À ta place', ['Si je serais toi', 'Si tu étais moi', 'Comme toi']),
    qcm('« If I had money, I would buy it »:', 'Si j’avais de l’argent, je l’achèterais.', ['Si j’aurais de l’argent, je l’achèterais.', 'Si j’ai de l’argent, je l’achèterais.', 'Si j’avais de l’argent, je l’achèterai.']),
    qcm('« Je pars demain » → Il a dit qu’il partait…', 'le lendemain', ['demain', 'hier', 'la veille']),
    qcm('« The letter was written by Marie »:', 'La lettre a été écrite par Marie.', ['La lettre a été écrit par Marie.', 'La lettre a écrite par Marie.', 'La lettre était écrivant par Marie.']),
    qcm('Gérondif of « avoir »:', 'en ayant', ['en avant', 'en avoirant', 'en eu']),
    qcm('« Yet / nevertheless »:', 'pourtant', ['donc', 'car', 'en effet']),
    match('Match', [['cependant', 'however'], ['en effet', 'indeed'], ['puisque', 'since'], ['en conclusion', 'in conclusion']]),
    order('Put in order: « If I had known, I would have come. »', 'Si j’avais su, je serais venu.', 'If I had known, I would have come.'),
    type('Conditional of « faire » (je)', 'ferais'),
    type('« Viens ! » → Il m’a dit ___ venir.', 'de'),
  ],
}

export const frC1: Level = {
  id: 'fr-c1',
  index: 5,
  name: 'Level 5 — Advanced & fluent',
  korean: 'Avancé',
  cefr: 'C1-C2',
  topik: 'DALF C1 / C2',
  color: '#364fc7',
  description: 'Sound truly French: idioms, everyday spoken French and slang, advanced subjunctive, false friends and exam strategies for the DALF.',
  lessons: [
    {
      id: 'fr-c1-1',
      title: 'French idioms',
      subtitle: 'poser un lapin · avoir le cafard · coûter les yeux de la tête',
      duration: 25,
      objectives: ['Understand the most common idioms', 'Use them naturally'],
      sections: [
        {
          title: 'Must-know idioms',
          table: table(`
            Idiom | Literally | Meaning
            poser un lapin | to put down a rabbit | to stand someone up
            avoir le cafard | to have the cockroach | to feel down
            coûter les yeux de la tête | to cost the eyes of the head | to cost an arm and a leg
            avoir un poil dans la main | to have a hair in the hand | to be lazy
            tomber dans les pommes | to fall into the apples | to faint
            ce n’est pas ma tasse de thé | it’s not my cup of tea | it’s not my thing
            appeler un chat un chat | to call a cat a cat | to call a spade a spade
            quand les poules auront des dents | when hens have teeth | when pigs fly
          `),
        },
        {
          title: 'In context',
          examples: ex(`
            Il m’a posé un lapin hier soir ! | He stood me up last night!
            J’ai le cafard depuis la rentrée. | I’ve been feeling down since the new term.
            Ce sac coûte les yeux de la tête. | This bag costs an arm and a leg.
          `),
        },
      ],
      vocab: vocab(`
        le lapin | the rabbit
        le cafard | the cockroach (the blues)
        le poil | the hair
        la pomme | the apple
        la poule | the hen
        la tasse | the cup
        la rentrée | back to school / work
        les yeux | the eyes
      `),
      exercises: [
        qcm('« Poser un lapin » means…', 'to stand someone up', ['to cook a rabbit', 'to tell a lie', 'to be late']),
        qcm('« Avoir le cafard » means…', 'to feel down', ['to be dirty', 'to be scared', 'to be lucky']),
        qcm('« Tomber dans les pommes » means…', 'to faint', ['to go shopping', 'to fall in love', 'to eat a lot']),
        match('Match', [['avoir un poil dans la main', 'to be lazy'], ['coûter les yeux de la tête', 'to be very expensive'], ['appeler un chat un chat', 'to speak frankly'], ['quand les poules auront des dents', 'never']]),
        type('Complete: Ce n’est pas ma tasse de ___. (not my thing)', 'thé'),
        qcm('« Il m’a posé un lapin » means…', 'He didn’t show up.', ['He gave me a rabbit.', 'He asked me a question.', 'He surprised me.']),
      ],
    },
    {
      id: 'fr-c1-2',
      title: 'Spoken French and slang',
      subtitle: 'j’sais pas · t’inquiète · c’est ouf · verlan',
      duration: 30,
      objectives: ['Understand how French is really spoken', 'Recognise common slang and verlan'],
      sections: [
        {
          title: 'What changes when French people speak',
          body: '• **ne** disappears: Je **sais pas** (je ne sais pas).\n• **on** replaces nous: **On** y va ?\n• Sounds are swallowed: **j’sais pas** → « chépa », **tu es** → « t’es ».\n• Questions with intonation: Tu viens ?',
          examples: ex(`
            T’inquiète ! | Don’t worry!
            Y a pas de souci. | No problem.
            Ça marche ! | OK, sounds good!
            Je suis crevé. | I’m exhausted.
          `),
        },
        {
          title: 'Everyday slang and verlan',
          body: '**Verlan** reverses syllables: à l’envers → verlan. It’s very common among young people.',
          table: table(`
            Slang | Standard | Meaning
            un mec / une meuf | un homme / une femme | a guy / a girl
            le boulot | le travail | work, job
            bosser | travailler | to work
            la bouffe | la nourriture | food
            c’est ouf | c’est fou | it’s crazy
            relou | lourd | annoying
            chelou | louche | weird, shady
          `),
        },
      ],
      vocab: vocab(`
        t’inquiète | don’t worry
        ça marche | OK, sounds good
        crevé | exhausted
        le boulot | job
        bosser | to work
        la bouffe | food
        c’est ouf | it’s crazy
        chelou | weird
      `),
      dialogue: dlg(`
        Léo: T’as vu le film hier ? C’était ouf ! | Did you see the film yesterday? It was crazy!
        Inès: Non, j’ai bossé tard, j’étais crevée. | No, I worked late, I was exhausted.
        Léo: T’inquiète, on le regarde ce soir ? | Don’t worry, shall we watch it tonight?
        Inès: Ça marche ! | Sounds good!
      `),
      exercises: [
        qcm('« Je sais pas » is…', 'spoken French for « je ne sais pas »', ['a grammar mistake nobody makes', 'a formal expression', 'a question']),
        qcm('« C’est ouf » means…', 'It’s crazy.', ['It’s over.', 'It’s ugly.', 'It’s tiring.']),
        qcm('« bosser » means…', 'to work', ['to boss around', 'to sleep', 'to eat']),
        qcm('« relou » is verlan for…', 'lourd (annoying)', ['rouler', 'loup', 'lourdement']),
        match('Match', [['le boulot', 'job'], ['la bouffe', 'food'], ['crevé', 'exhausted'], ['un mec', 'a guy']]),
        type('Translate: « don’t worry » (spoken French, one word with apostrophe)', 't’inquiète'),
      ],
    },
    {
      id: 'fr-c1-3',
      title: 'Advanced subjunctive',
      subtitle: 'bien que · à moins que · le seul qui · quoi que',
      duration: 35,
      objectives: ['Use the subjunctive after conjunctions', 'Use it after superlatives and in relative clauses'],
      sections: [
        {
          title: 'Conjunctions that require it',
          table: table(`
            Conjunction | Meaning | Example
            bien que / quoique | although | Bien qu’il soit tard, je reste.
            à moins que | unless | Je viendrai, à moins qu’il (ne) pleuve.
            pour que / afin que | so that | Je parle lentement pour que tu comprennes.
            sans que | without | Il est parti sans que je le sache.
            jusqu’à ce que | until | Attends jusqu’à ce que je revienne.
          `),
          tip: '**Après que** takes the **indicative** in standard grammar (après qu’il **est** parti), even though many French people use the subjunctive.',
        },
        {
          title: 'Superlatives, doubt and relatives',
          examples: ex(`
            C’est le meilleur film que j’aie jamais vu. | It’s the best film I have ever seen.
            Je cherche quelqu’un qui sache parler chinois. | I’m looking for someone who can speak Chinese.
            Je ne pense pas qu’il ait raison. | I don’t think he’s right.
            Quoi que tu fasses, fais-le bien. | Whatever you do, do it well.
          `),
        },
      ],
      vocab: vocab(`
        bien que | although
        à moins que | unless
        afin que | so that
        sans que | without
        jusqu’à ce que | until
        quoi que | whatever
        le meilleur | the best
        que j’aie vu | that I have seen
      `),
      exercises: [
        qcm('« Although it’s late »:', 'Bien qu’il soit tard', ['Bien qu’il est tard', 'Bien qu’il sera tard', 'Bien que c’est tard']),
        qcm('« Wait until I come back »:', 'Attends jusqu’à ce que je revienne.', ['Attends jusqu’à ce que je reviens.', 'Attends jusqu’à je revenir.', 'Attends que jusqu’à je revienne.']),
        qcm('« après que » in standard grammar takes…', 'the indicative', ['the subjunctive', 'the infinitive', 'the conditional']),
        qcm('« Whatever you do »:', 'Quoi que tu fasses', ['Quoique tu fais', 'Quoi que tu fais', 'Quel que tu fasses']),
        type('Complete: C’est le meilleur film que j’___ vu. (subjunctive of avoir)', 'aie'),
        order('Put in order: « I don’t think he is right. »', 'Je ne pense pas qu’il ait raison.', 'I don’t think he is right.'),
      ],
    },
    {
      id: 'fr-c1-4',
      title: 'False friends',
      subtitle: 'actuellement · librairie · sensible · rester',
      duration: 20,
      objectives: ['Avoid the most common English–French traps'],
      sections: [
        {
          title: 'Classic traps',
          table: table(`
            French | Real meaning | Not to be confused with
            actuellement | currently | actually (en fait)
            une librairie | a bookshop | a library (une bibliothèque)
            sensible | sensitive | sensible (raisonnable)
            rester | to stay | to rest (se reposer)
            éventuellement | possibly | eventually (finalement)
            un préservatif | a condom | a preservative (un conservateur)
            assister à | to attend | to assist (aider)
            la monnaie | change (coins) | money (l’argent)
          `),
          tip: 'Never say « Il n’y a pas de préservatifs dans ce yaourt » — say **conservateurs**!',
        },
      ],
      vocab: vocab(`
        actuellement | currently
        en fait | actually
        la librairie | the bookshop
        la bibliothèque | the library
        sensible | sensitive
        raisonnable | sensible
        rester | to stay
        la monnaie | change (coins)
      `),
      exercises: [
        qcm('« Actuellement » means…', 'currently', ['actually', 'accurately', 'finally']),
        qcm('« A library » in French:', 'une bibliothèque', ['une librairie', 'une libraire', 'une livrerie']),
        qcm('« Je vais assister à la réunion » means…', 'I’m going to attend the meeting.', ['I’m going to help at the meeting.', 'I’m going to cancel the meeting.', 'I’m going to lead the meeting.']),
        match('Match', [['rester', 'to stay'], ['sensible', 'sensitive'], ['éventuellement', 'possibly'], ['la monnaie', 'change (coins)']]),
        type('How do you say « actually » in French? (two words)', 'en fait'),
        qcm('« She is very sensible » (reasonable):', 'Elle est très raisonnable.', ['Elle est très sensible.', 'Elle est très sensée sensible.', 'Elle est très sentie.']),
      ],
    },
    {
      id: 'fr-c1-5',
      title: 'Preparing for the DALF',
      subtitle: 'synthèse · essai argumenté · exposé',
      duration: 30,
      objectives: ['Know the DALF C1 tasks', 'Use formal written French'],
      sections: [
        {
          title: 'The DALF C1',
          body: 'Four skills: **listening**, **reading**, **writing** (a synthesis of several documents + an argumentative essay) and **speaking** (a presentation based on documents, followed by a discussion with the examiners). You need 50/100 overall and at least 5/25 in each skill.',
        },
        {
          title: 'Formal written French',
          examples: ex(`
            Madame, Monsieur, | Dear Sir or Madam,
            Je me permets de vous écrire afin de… | I am writing to you in order to…
            Il convient de souligner que… | It should be emphasised that…
            Force est de constater que… | One has to admit that…
            Dans l’attente de votre réponse, je vous prie d’agréer mes salutations distinguées. | I look forward to your reply. Yours faithfully.
          `),
          tip: 'In the synthesis, you must **not give your opinion** and **not quote** the documents: reorganise their ideas in your own words.',
        },
      ],
      vocab: vocab(`
        la synthèse | the summary, synthesis
        l’essai argumenté | the argumentative essay
        l’exposé | the presentation
        il convient de | it is appropriate to
        force est de constater | one has to admit
        afin de | in order to
        agréer | to accept (formal letters)
        les salutations distinguées | yours faithfully
      `),
      exercises: [
        qcm('In the DALF synthesis, you must…', 'not give your opinion', ['give your opinion', 'quote the documents', 'write a letter']),
        qcm('« Force est de constater que… » means…', 'One has to admit that…', ['It is forbidden to…', 'Force is needed to…', 'It is easy to see…']),
        qcm('Formal letter opening when you don’t know the person:', 'Madame, Monsieur,', ['Salut,', 'Cher ami,', 'Coucou,']),
        match('Match', [['la synthèse', 'synthesis'], ['l’exposé', 'presentation'], ['afin de', 'in order to'], ['il convient de', 'it is appropriate to']]),
        type('Complete: Je me permets de vous écrire ___ de… (in order to)', 'afin'),
        order('Put in order: « It should be emphasised that… »', 'Il convient de souligner que…', 'It should be emphasised that…'),
      ],
    },
  ],
  test: [
    qcm('« He stood me up »:', 'Il m’a posé un lapin.', ['Il m’a donné un lapin.', 'Il m’a mis un poil.', 'Il m’a coûté les yeux.']),
    qcm('« Tomber dans les pommes » means…', 'to faint', ['to pick apples', 'to fall asleep', 'to be surprised']),
    qcm('« J’sais pas » stands for…', 'je ne sais pas', ['je sais tout', 'je sais pourquoi', 'je ne suis pas']),
    qcm('« chelou » means…', 'weird', ['cheap', 'expensive', 'friendly']),
    qcm('« Unless it rains »:', 'à moins qu’il ne pleuve', ['à moins qu’il pleut', 'sauf qu’il pleuvra', 'à moins de pleuvoir il']),
    qcm('« I’m looking for someone who knows Chinese »:', 'Je cherche quelqu’un qui sache le chinois.', ['Je cherche quelqu’un qui sait le chinois demain.', 'Je cherche quelqu’un que sache le chinois.', 'Je cherche quelqu’un qui savoir le chinois.']),
    qcm('« une librairie » is…', 'a bookshop', ['a library', 'a bookcase', 'a publisher']),
    qcm('« Actually, I don’t agree »:', 'En fait, je ne suis pas d’accord.', ['Actuellement, je ne suis pas d’accord.', 'Actuel, je ne suis pas d’accord.', 'En actuel, je ne suis pas d’accord.']),
    match('Match', [['bien que', 'although'], ['afin que', 'so that'], ['sans que', 'without'], ['jusqu’à ce que', 'until']]),
    order('Put in order: « It’s the best film I have ever seen. »', 'C’est le meilleur film que j’aie jamais vu.', 'It’s the best film I have ever seen.'),
    type('How do you say « to stay » in French?', 'rester'),
    type('Complete: Bien qu’il ___ tard, je reste. (subjunctive of être)', 'soit'),
  ],
}
