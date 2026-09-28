import type { Level } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

export const frA2: Level = {
  id: 'fr-a2',
  index: 2,
  name: 'Level 2 — Elementary',
  korean: 'Élémentaire',
  cefr: 'A2',
  topik: 'DELF A2',
  color: '#3b5bdb',
  description: 'Talk about the past with the passé composé (avoir and être), the future, replace nouns with pronouns and order food with partitive articles.',
  lessons: [
    {
      id: 'fr-a2-1',
      title: 'Passé composé with avoir',
      subtitle: 'j’ai mangé · tu as fini · il a pris',
      duration: 30,
      objectives: ['Form the passé composé with avoir', 'Know the key irregular past participles'],
      sections: [
        {
          title: 'avoir + past participle',
          body: 'The passé composé is the main past tense for **completed actions**: I ate / I have eaten. Past participles: **-er → -é** (manger → mangé), **-ir → -i** (finir → fini), **-re → -u** (vendre → vendu).',
          examples: ex(`
            J’ai mangé une crêpe. | I ate a crêpe.
            Nous avons fini le travail. | We finished the work.
            Tu as vendu ta voiture ? | Did you sell your car?
            Je n’ai pas compris. | I didn’t understand.
          `),
        },
        {
          title: 'Irregular participles',
          table: table(`
            Infinitive | Participle | Meaning
            faire | fait | done, made
            prendre | pris | taken
            voir | vu | seen
            avoir | eu | had
            être | été | been
            boire | bu | drunk
            écrire | écrit | written
            mettre | mis | put
          `),
          tip: 'In the negative, ne… pas goes around **avoir**: je **n’ai pas** vu.',
        },
      ],
      vocab: vocab(`
        hier | yesterday
        la semaine dernière | last week
        fait | done, made
        pris | taken
        vu | seen
        compris | understood
        bu | drunk
        déjà | already
      `),
      exercises: [
        qcm('« I ate »:', 'J’ai mangé.', ['Je suis mangé.', 'J’ai manger.', 'J’ai mangée.']),
        qcm('Past participle of « prendre »:', 'pris', ['prendu', 'prenu', 'prit']),
        qcm('Past participle of « voir »:', 'vu', ['voiré', 'vi', 'voyé']),
        qcm('« I didn’t understand »:', 'Je n’ai pas compris.', ['Je ne compris pas.', 'Je n’ai compris pas.', 'Je ne pas ai compris.']),
        type('Past participle of « faire »', 'fait'),
        order('Put in order: « We finished the work. »', 'Nous avons fini le travail.', 'We finished the work.'),
      ],
    },
    {
      id: 'fr-a2-2',
      title: 'Passé composé with être',
      subtitle: 'je suis allé(e) · elle est partie · nous nous sommes levés',
      duration: 30,
      objectives: ['Know which verbs use être', 'Make the participle agree'],
      sections: [
        {
          title: 'The « house of être »',
          body: 'About 15 verbs of **movement or change of state** use **être**, plus **all reflexive verbs**. With être, the participle **agrees** with the subject: elle est allé**e**, ils sont allé**s**.',
          table: table(`
            Verb | Participle | Meaning
            aller / venir | allé / venu | go / come
            arriver / partir | arrivé / parti | arrive / leave
            entrer / sortir | entré / sorti | enter / go out
            monter / descendre | monté / descendu | go up / go down
            naître / mourir | né / mort | be born / die
            rester / tomber | resté / tombé | stay / fall
          `),
        },
        {
          title: 'Examples',
          examples: ex(`
            Je suis allé à Paris. | I went to Paris. (man)
            Elle est arrivée hier. | She arrived yesterday.
            Nous sommes restés à la maison. | We stayed at home.
            Elle s’est levée tôt. | She got up early.
          `),
          tip: 'Memory trick: **DR & MRS VANDERTRAMP** lists the être verbs.',
        },
      ],
      vocab: vocab(`
        aller | to go
        venir | to come
        partir | to leave
        arriver | to arrive
        rester | to stay
        tomber | to fall
        naître | to be born
        tôt | early
      `),
      dialogue: dlg(`
        Marie: Qu’est-ce que tu as fait ce week-end ? | What did you do this weekend?
        Sam: Je suis allé à Bordeaux avec des amis. | I went to Bordeaux with friends.
        Marie: Vous êtes restés longtemps ? | Did you stay long?
        Sam: Non, on est rentrés dimanche soir. | No, we came back on Sunday evening.
      `),
      exercises: [
        qcm('« She went »:', 'Elle est allée.', ['Elle a allé.', 'Elle est allé.', 'Elle a allée.']),
        qcm('Which verb uses être?', 'partir', ['manger', 'voir', 'faire']),
        qcm('« We stayed » (group of men):', 'Nous sommes restés.', ['Nous avons restés.', 'Nous sommes resté.', 'Nous avons resté.']),
        qcm('Reflexive verbs in the passé composé use…', 'être', ['avoir', 'aller', 'faire']),
        type('Complete: Ils ___ arrivés hier.', 'sont'),
        order('Put in order: « She got up early. »', 'Elle s’est levée tôt.', 'She got up early.'),
      ],
    },
    {
      id: 'fr-a2-3',
      title: 'Talking about the future',
      subtitle: 'je vais partir · je partirai',
      duration: 25,
      objectives: ['Use the futur proche', 'Form the futur simple'],
      sections: [
        {
          title: 'Futur proche: aller + infinitive',
          examples: ex(`
            Je vais manger. | I’m going to eat.
            Il va pleuvoir. | It’s going to rain.
            Qu’est-ce que tu vas faire ce soir ? | What are you going to do tonight?
          `),
        },
        {
          title: 'Futur simple',
          body: 'Infinitive + **-ai, -as, -a, -ons, -ez, -ont** (drop the -e of -re verbs). Irregular stems: être → **ser-**, avoir → **aur-**, aller → **ir-**, faire → **fer-**, venir → **viendr-**, pouvoir → **pourr-**.',
          examples: ex(`
            Je parlerai français couramment. | I will speak French fluently.
            Nous serons à Paris demain. | We will be in Paris tomorrow.
            Tu auras le temps ? | Will you have time?
            J’irai en France l’été prochain. | I will go to France next summer.
          `),
        },
      ],
      vocab: vocab(`
        demain | tomorrow
        ce soir | tonight
        l’année prochaine | next year
        bientôt | soon
        plus tard | later
        couramment | fluently
        pleuvoir | to rain
        le temps | time, weather
      `),
      exercises: [
        qcm('« I’m going to leave »:', 'Je vais partir.', ['Je vais partis.', 'Je va partir.', 'Je partir vais.']),
        qcm('Future of « être » (nous):', 'serons', ['êterons', 'sommerons', 'aurons']),
        qcm('Future of « aller » (je):', 'irai', ['allerai', 'vais', 'irais']),
        qcm('Future of « avoir » (tu):', 'auras', ['avoiras', 'aviras', 'as']),
        type('Future of « parler » (je)', 'parlerai'),
        order('Put in order: « I will go to France. »', 'J’irai en France.', 'I will go to France.'),
      ],
    },
    {
      id: 'fr-a2-4',
      title: 'Object pronouns',
      subtitle: 'le · la · les · lui · leur',
      duration: 30,
      objectives: ['Replace direct and indirect objects', 'Place the pronoun before the verb'],
      sections: [
        {
          title: 'Direct and indirect',
          table: table(`
            Direct | Indirect | English
            me | me | me / to me
            te | te | you / to you
            le / la | lui | him, her, it / to him, to her
            nous | nous | us / to us
            vous | vous | you / to you (pl.)
            les | leur | them / to them
          `),
        },
        {
          title: 'Before the verb!',
          body: 'Unlike English, the pronoun goes **before the verb**: I see **him** → Je **le** vois. In the passé composé: je **l’**ai vu. With an infinitive: je vais **le** voir.',
          examples: ex(`
            Tu connais Marie ? — Oui, je la connais. | Do you know Marie? — Yes, I know her.
            Je lui téléphone ce soir. | I’m calling him / her tonight.
            Je leur ai donné un cadeau. | I gave them a present.
            Je ne les aime pas. | I don’t like them.
          `),
          tip: '**lui** means both « to him » and « to her ».',
        },
      ],
      vocab: vocab(`
        connaître | to know (a person)
        téléphoner à | to call
        donner | to give
        un cadeau | a present
        dire | to say, to tell
        envoyer | to send
        prêter | to lend
        les clés | the keys
      `),
      exercises: [
        qcm('« I see him »:', 'Je le vois.', ['Je vois le.', 'Je lui vois.', 'Je vois lui.']),
        qcm('« I’m calling her » (téléphoner à):', 'Je lui téléphone.', ['Je la téléphone.', 'Je téléphone la.', 'Je leur téléphone.']),
        qcm('« I gave them a present »:', 'Je leur ai donné un cadeau.', ['Je les ai donné un cadeau.', 'Je ai leur donné un cadeau.', 'Je leurs ai donné un cadeau.']),
        qcm('« Je vais le voir » means…', 'I’m going to see him.', ['I saw him.', 'I see him.', 'He is going to see me.']),
        type('Complete: Les clés ? Je ___ ai. (them)', 'les'),
        match('Match', [['le', 'him / it (direct)'], ['lui', 'to him / her'], ['les', 'them (direct)'], ['leur', 'to them']]),
      ],
    },
    {
      id: 'fr-a2-5',
      title: 'Food and partitive articles',
      subtitle: 'du pain · de la confiture · pas de sucre',
      duration: 25,
      objectives: ['Use du, de la, des', 'Order in a café or restaurant'],
      sections: [
        {
          title: '« Some » in French',
          body: 'For an unspecified quantity, French uses **du** (masc.), **de la** (fem.), **de l’** (before a vowel), **des** (plural). In the negative, they all become **de / d’**.',
          examples: ex(`
            Je mange du pain. | I eat (some) bread.
            Tu veux de la confiture ? | Do you want some jam?
            Il boit de l’eau. | He drinks water.
            Je ne bois pas de café. | I don’t drink coffee.
          `),
          tip: 'After verbs of taste (aimer, adorer, détester), use **le / la / les**: J’aime **le** fromage.',
        },
        {
          title: 'At the café',
          examples: ex(`
            Je voudrais un croissant, s’il vous plaît. | I’d like a croissant, please.
            L’addition, s’il vous plaît. | The bill, please.
            Qu’est-ce que vous me conseillez ? | What do you recommend?
          `),
        },
      ],
      vocab: vocab(`
        le pain | bread
        la confiture | jam
        l’eau | water
        le fromage | cheese
        la viande | meat
        les légumes | vegetables
        l’addition | the bill
        le sucre | sugar
      `),
      dialogue: dlg(`
        Serveur: Bonjour ! Vous désirez ? | Hello! What would you like?
        Cliente: Un café et un croissant, s’il vous plaît. | A coffee and a croissant, please.
        Serveur: Du sucre avec le café ? | Sugar with the coffee?
        Cliente: Non merci, pas de sucre. | No thanks, no sugar.
      `),
      exercises: [
        qcm('« I eat bread »:', 'Je mange du pain.', ['Je mange le pain du.', 'Je mange de pain.', 'Je mange des pain.']),
        qcm('« I don’t drink milk »:', 'Je ne bois pas de lait.', ['Je ne bois pas du lait.', 'Je ne bois pas le lait de.', 'Je bois pas des lait.']),
        qcm('« I love cheese »:', 'J’adore le fromage.', ['J’adore du fromage.', 'J’adore de fromage.', 'J’adore des fromage.']),
        qcm('« de l’eau »: why de l’?', 'eau starts with a vowel', ['eau is plural', 'eau is masculine', 'it’s negative']),
        type('Complete: Tu veux ___ confiture ? (some, feminine)', 'de la'),
        match('Match', [['le pain', 'bread'], ['la viande', 'meat'], ['les légumes', 'vegetables'], ['l’addition', 'the bill']]),
      ],
    },
  ],
  test: [
    qcm('Past participle of « boire »:', 'bu', ['boiré', 'bui', 'buvé']),
    qcm('« Did you see the film? » (tu):', 'Tu as vu le film ?', ['Tu es vu le film ?', 'Tu as voir le film ?', 'Tu as vué le film ?']),
    qcm('« She left »:', 'Elle est partie.', ['Elle a parti.', 'Elle est parti.', 'Elle a partie.']),
    qcm('Which verb uses être in the passé composé?', 'venir', ['prendre', 'finir', 'boire']),
    qcm('Future of « faire » (je):', 'ferai', ['fairai', 'fais', 'ferais']),
    qcm('« I know her »:', 'Je la connais.', ['Je lui connais.', 'Je connais la.', 'Je le connais elle.']),
    qcm('« I’m talking to them »:', 'Je leur parle.', ['Je les parle.', 'Je parle leur.', 'Je leurs parle.']),
    qcm('« I don’t want sugar »:', 'Je ne veux pas de sucre.', ['Je ne veux pas du sucre.', 'Je veux pas le sucre de.', 'Je ne veux de sucre pas.']),
    match('Match', [['faire', 'fait'], ['prendre', 'pris'], ['écrire', 'écrit'], ['mettre', 'mis']]),
    order('Put in order: « I went to Paris. »', 'Je suis allé à Paris.', 'I went to Paris.'),
    type('Complete: Nous ___ restés à la maison.', 'sommes'),
    type('Future of « venir » (je)', 'viendrai'),
  ],
}

export const frB1: Level = {
  id: 'fr-b1',
  index: 3,
  name: 'Level 3 — Intermediate',
  korean: 'Intermédiaire',
  cefr: 'B1',
  topik: 'DELF B1',
  color: '#862e9c',
  description: 'Tell stories with the imparfait and passé composé, express wishes and necessity with the subjunctive, link ideas with qui, que, où, dont, and master the tricky pronouns y and en.',
  lessons: [
    {
      id: 'fr-b1-1',
      title: 'The imparfait',
      subtitle: 'j’étais · il faisait · nous habitions',
      duration: 30,
      objectives: ['Form the imparfait', 'Describe the past and past habits'],
      sections: [
        {
          title: 'Formation',
          body: 'Take the **nous** form of the present, remove **-ons**, add **-ais, -ais, -ait, -ions, -iez, -aient**. nous parlons → je parl**ais**. Only exception: être → **ét-** (j’étais).',
          table: table(`
            Pronoun | parler | faire | être
            je | parlais | faisais | étais
            tu | parlais | faisais | étais
            il / elle | parlait | faisait | était
            nous | parlions | faisions | étions
            vous | parliez | faisiez | étiez
            ils / elles | parlaient | faisaient | étaient
          `),
        },
        {
          title: 'Uses',
          body: 'The imparfait describes **background, descriptions, feelings and habits** in the past (« used to », « was …-ing »).',
          examples: ex(`
            Quand j’étais petit, j’habitais à la campagne. | When I was little, I lived in the countryside.
            Il faisait beau et les oiseaux chantaient. | The weather was nice and the birds were singing.
            Tous les étés, nous allions à la mer. | Every summer, we used to go to the seaside.
          `),
        },
      ],
      vocab: vocab(`
        quand j’étais petit(e) | when I was little
        la campagne | the countryside
        tous les étés | every summer
        souvent | often
        d’habitude | usually
        l’oiseau | the bird
        chanter | to sing
        la mer | the sea
      `),
      exercises: [
        qcm('Imparfait of « parler » (nous):', 'parlions', ['parlons', 'parlaions', 'parlerions']),
        qcm('Imparfait of « être » (je):', 'étais', ['suisais', 'serais', 'étai']),
        qcm('The imparfait is used for…', 'descriptions and habits in the past', ['a single completed action', 'the future', 'orders']),
        qcm('« Il faisait beau » means…', 'The weather was nice.', ['He did something nice.', 'It will be nice.', 'He was handsome.']),
        type('Imparfait of « avoir » (ils)', 'avaient'),
        order('Put in order: « When I was little, I lived in the countryside. »', 'Quand j’étais petit, j’habitais à la campagne.', 'When I was little, I lived in the countryside.'),
      ],
    },
    {
      id: 'fr-b1-2',
      title: 'Imparfait or passé composé?',
      subtitle: 'je dormais quand le téléphone a sonné',
      duration: 30,
      objectives: ['Choose the right past tense', 'Tell a story'],
      sections: [
        {
          title: 'Background vs. event',
          table: table(`
            Imparfait | Passé composé
            the setting, the scene | the action that happens
            was …-ing / used to | did (once, completed)
            Il pleuvait… | …quand je suis sorti.
            Je dormais… | …quand le téléphone a sonné.
          `),
          tip: 'Think of a film: the **imparfait** is the scenery, the **passé composé** is what the actors do.',
        },
        {
          title: 'A short story',
          examples: ex(`
            C’était un samedi soir. Il faisait froid. | It was a Saturday evening. It was cold.
            Je regardais la télé quand quelqu’un a frappé à la porte. | I was watching TV when someone knocked at the door.
            J’ai ouvert : c’était mon frère ! | I opened: it was my brother!
          `),
        },
      ],
      vocab: vocab(`
        soudain | suddenly
        tout à coup | all of a sudden
        pendant que | while
        frapper | to knock
        ouvrir / ouvert | to open / opened
        sonner | to ring
        quelqu’un | someone
        la porte | the door
      `),
      exercises: [
        qcm('« I was sleeping when the phone rang »:', 'Je dormais quand le téléphone a sonné.', ['J’ai dormi quand le téléphone sonnait.', 'Je dormais quand le téléphone sonnait.', 'J’ai dormi quand le téléphone a sonné.']),
        qcm('Which tense sets the scene?', 'the imparfait', ['the passé composé', 'the future', 'the present']),
        qcm('« Tout à coup » usually introduces…', 'a passé composé action', ['an imparfait description', 'a question', 'the future']),
        qcm('« Il pleuvait quand je suis sorti » means…', 'It was raining when I went out.', ['It rained when I was going out.', 'It will rain when I go out.', 'It rained, then I went out.']),
        type('Complete: Je regardais la télé quand quelqu’un ___ frappé.', 'a'),
        match('Match', [['soudain', 'suddenly'], ['pendant que', 'while'], ['quelqu’un', 'someone'], ['la porte', 'the door']]),
      ],
    },
    {
      id: 'fr-b1-3',
      title: 'Introduction to the subjunctive',
      subtitle: 'il faut que tu viennes · je veux que tu saches',
      duration: 35,
      objectives: ['Form the present subjunctive', 'Use it after il faut que, vouloir que, avant que'],
      sections: [
        {
          title: 'Formation',
          body: 'Take the **ils** form of the present, remove **-ent**, add **-e, -es, -e, -ions, -iez, -ent**. ils parl**ent** → que je parl**e**. Key irregulars: être → **que je sois**, avoir → **que j’aie**, aller → **que j’aille**, faire → **que je fasse**, pouvoir → **que je puisse**, savoir → **que je sache**.',
          table: table(`
            Pronoun | parler | finir | être
            que je | parle | finisse | sois
            que tu | parles | finisses | sois
            qu’il / elle | parle | finisse | soit
            que nous | parlions | finissions | soyons
            que vous | parliez | finissiez | soyez
            qu’ils / elles | parlent | finissent | soient
          `),
        },
        {
          title: 'When to use it',
          body: 'After expressions of **necessity, wish, emotion, doubt**, and some conjunctions — when the two clauses have **different subjects**.',
          examples: ex(`
            Il faut que tu viennes. | You have to come.
            Je veux que tu sois heureux. | I want you to be happy.
            Je suis content que vous soyez là. | I’m glad you’re here.
            Pars avant qu’il pleuve ! | Leave before it rains!
          `),
          tip: 'Same subject → infinitive: Je veux **partir** (I want to leave), not « je veux que je parte ».',
        },
      ],
      vocab: vocab(`
        il faut que | it is necessary that
        vouloir que | to want (someone to)
        avant que | before
        pour que | so that
        bien que | although
        être content que | to be glad that
        que je sois | that I be
        que j’aie | that I have
      `),
      exercises: [
        qcm('« You have to come » (il faut):', 'Il faut que tu viennes.', ['Il faut que tu viens.', 'Il faut tu venir.', 'Il faut que tu venir.']),
        qcm('Subjunctive of « être » (je):', 'sois', ['suis', 'soit', 'serai']),
        qcm('Subjunctive of « faire » (tu):', 'fasses', ['fais', 'faises', 'ferais']),
        qcm('« I want to leave »:', 'Je veux partir.', ['Je veux que je parte.', 'Je veux que partir.', 'Je veux que je pars.']),
        type('Subjunctive of « avoir » (que j’___)', 'aie'),
        order('Put in order: « I want you to be happy. »', 'Je veux que tu sois heureux.', 'I want you to be happy.'),
      ],
    },
    {
      id: 'fr-b1-4',
      title: 'Relative pronouns',
      subtitle: 'qui · que · où · dont',
      duration: 30,
      objectives: ['Link two sentences', 'Choose between qui, que, où, dont'],
      sections: [
        {
          title: 'The four pronouns',
          table: table(`
            Pronoun | Role | Example
            qui | subject (who / which) | L’homme qui parle est mon père.
            que | direct object (whom / which / that) | Le livre que je lis est génial.
            où | place or time (where / when) | La ville où j’habite est petite.
            dont | replaces « de + noun » (whose / of which) | Le film dont je parle est sorti hier.
          `),
          tip: 'Quick test: if a **verb** follows directly, it’s usually **qui**; if a **subject** follows, it’s **que**.',
        },
        {
          title: 'dont',
          body: '**dont** replaces a complement introduced by **de**: parler **de**, avoir besoin **de**, être fier **de**.',
          examples: ex(`
            C’est l’outil dont j’ai besoin. | It’s the tool I need.
            La fille dont le frère est pilote. | The girl whose brother is a pilot.
            Le jour où je suis arrivé. | The day (when) I arrived.
          `),
        },
      ],
      vocab: vocab(`
        qui | who, which (subject)
        que | that, whom (object)
        où | where, when
        dont | whose, of which
        avoir besoin de | to need
        être fier de | to be proud of
        l’outil | the tool
        génial | great
      `),
      exercises: [
        qcm('« Le livre ___ je lis »', 'que', ['qui', 'où', 'dont']),
        qcm('« L’homme ___ parle »', 'qui', ['que', 'dont', 'où']),
        qcm('« La ville ___ j’habite »', 'où', ['que', 'qui', 'dont']),
        qcm('« Le film ___ je parle »', 'dont', ['que', 'qui', 'où']),
        type('Complete: C’est l’outil ___ j’ai besoin.', 'dont'),
        match('Match', [['qui', 'subject'], ['que', 'direct object'], ['où', 'place / time'], ['dont', 'replaces de + noun']]),
      ],
    },
    {
      id: 'fr-b1-5',
      title: 'The pronouns y and en',
      subtitle: 'j’y vais · j’en veux · il y en a',
      duration: 30,
      objectives: ['Replace places and à + thing with y', 'Replace de + noun and quantities with en'],
      sections: [
        {
          title: 'y',
          body: '**y** replaces a **place** (à Paris, chez moi, dans la cuisine) or **à + thing**.',
          examples: ex(`
            Tu vas à Paris ? — Oui, j’y vais demain. | Are you going to Paris? — Yes, I’m going there tomorrow.
            Tu penses à ton examen ? — Oui, j’y pense. | Are you thinking about your exam? — Yes, I’m thinking about it.
            On y va ! | Let’s go!
          `),
        },
        {
          title: 'en',
          body: '**en** replaces **de + noun**, and nouns with a **quantity** (du, des, un, beaucoup de…). Keep the number at the end.',
          examples: ex(`
            Tu veux du café ? — Oui, j’en veux. | Do you want some coffee? — Yes, I want some.
            Tu as des frères ? — J’en ai deux. | Do you have brothers? — I have two.
            Il parle de son voyage ? — Oui, il en parle. | Is he talking about his trip? — Yes, he’s talking about it.
            Il y en a beaucoup. | There are a lot of them.
          `),
        },
      ],
      vocab: vocab(`
        y | there, about it (à…)
        en | some, of it, of them
        on y va | let’s go
        penser à | to think about
        parler de | to talk about
        beaucoup | a lot
        il y en a | there are some
        chez moi | at my place
      `),
      exercises: [
        qcm('« Tu vas à Lyon ? — Oui, ___ vais. »', 'j’y', ['j’en', 'je le', 'je lui']),
        qcm('« Tu veux des pommes ? — Oui, ___ veux trois. »', 'j’en', ['j’y', 'je les', 'je leur']),
        qcm('« On y va ! » means…', 'Let’s go!', ['We are there!', 'We have some!', 'We went!']),
        qcm('« penser à mon examen » → …', 'j’y pense', ['j’en pense', 'je lui pense', 'je le pense']),
        type('Complete: Tu as des frères ? — J’___ ai deux.', 'en'),
        order('Put in order: « There are a lot of them. »', 'Il y en a beaucoup.', 'There are a lot of them.'),
      ],
    },
  ],
  test: [
    qcm('Imparfait of « faire » (nous):', 'faisions', ['faisons', 'ferions', 'fasions']),
    qcm('« We used to go to the sea every summer »:', 'Nous allions à la mer tous les étés.', ['Nous sommes allés à la mer tous les étés.', 'Nous irons à la mer tous les étés.', 'Nous allons à la mer tous les étés hier.']),
    qcm('« I was reading when he arrived »:', 'Je lisais quand il est arrivé.', ['J’ai lu quand il arrivait.', 'Je lisais quand il arrivait.', 'J’ai lu quand il est arrivé.']),
    qcm('Subjunctive of « aller » (je):', 'aille', ['vais', 'alle', 'irai']),
    qcm('« It’s necessary that we leave »:', 'Il faut que nous partions.', ['Il faut que nous partons.', 'Il faut nous partir.', 'Il faut que nous partirons.']),
    qcm('« La femme ___ tu as vue »', 'que', ['qui', 'dont', 'où']),
    qcm('« La maison ___ je suis né »', 'où', ['que', 'dont', 'qui']),
    qcm('« Tu as du pain ? — Oui, ___ ai. »', 'j’en', ['j’y', 'je le', 'je lui']),
    match('Match', [['être', 'que je sois'], ['avoir', 'que j’aie'], ['faire', 'que je fasse'], ['savoir', 'que je sache']]),
    order('Put in order: « You have to come. »', 'Il faut que tu viennes.', 'You have to come.'),
    type('Imparfait of « être » (ils)', 'étaient'),
    type('Complete: C’est le livre ___ j’ai besoin.', 'dont'),
  ],
}
