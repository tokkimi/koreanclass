import type { Lesson } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

/** Extra lessons of the French course (explained in English), added at the end of each level. */
export const frExtra: Record<string, Lesson[]> = {
  'fr-0': [
    {
      id: 'fr-0-6',
      title: 'Colours and adjective agreement',
      subtitle: 'rouge · vert / verte · bleus',
      duration: 25,
      objectives: ['Name the colours', 'Make adjectives agree', 'Place colour adjectives after the noun'],
      sections: [
        {
          title: 'The colours',
          table: table(`
            French | Meaning
            rouge | red
            bleu / bleue | blue
            vert / verte | green
            jaune | yellow
            noir / noire | black
            blanc / blanche | white
            gris / grise | grey
            rose | pink
            violet / violette | purple
            orange | orange
            marron | brown
          `),
        },
        {
          title: 'Agreement and position',
          body: 'Colour adjectives go **after** the noun and **agree** in gender and number: un pull **vert**, une robe **verte**, des chaussures **vertes**. Adjectives ending in -e don’t change in the feminine (rouge). **orange** and **marron** never change.',
          examples: ex(`
            une voiture rouge | a red car
            un chat noir, une chatte noire | a black cat (m / f)
            des yeux bleus | blue eyes
            De quelle couleur est ton sac ? | What colour is your bag?
          `),
          tip: 'Irregular: **blanc → blanche**, violet → violet**te**.',
        },
      ],
      vocab: vocab(`
        rouge | red
        bleu | blue
        vert | green
        jaune | yellow
        noir | black
        blanc | white
        la couleur | the colour
        une robe | a dress
      `),
      exercises: [
        qcm('« a white dress »:', 'une robe blanche', ['une robe blanc', 'une blanche robe', 'une robe blanque']),
        qcm('« blue eyes »:', 'des yeux bleus', ['des bleus yeux', 'des yeux bleu', 'des yeux bleues']),
        qcm('Which colour never changes?', 'marron', ['vert', 'noir', 'gris']),
        qcm('« De quelle couleur ? » means…', 'What colour?', ['How much?', 'Which size?', 'Where from?']),
        match('Match', [['jaune', 'yellow'], ['gris', 'grey'], ['rose', 'pink'], ['noir', 'black']]),
        order('Put in order: « a red car »', 'une voiture rouge', 'a red car'),
        type('Translate: « green » (masculine)', 'vert'),
        type('Feminine of « blanc »', 'blanche'),
      ],
    },
    {
      id: 'fr-0-7',
      title: 'Family and possessives',
      subtitle: 'mon père · ma mère · mes parents',
      duration: 25,
      objectives: ['Talk about your family', 'Use mon, ma, mes, ton, son…'],
      sections: [
        {
          title: 'The family',
          table: table(`
            French | Meaning
            le père / la mère | father / mother
            les parents | parents
            le frère / la sœur | brother / sister
            le fils / la fille | son / daughter
            le grand-père / la grand-mère | grandfather / grandmother
            l’oncle / la tante | uncle / aunt
            le cousin / la cousine | cousin
          `),
        },
        {
          title: 'Possessives agree with the thing owned',
          table: table(`
            Masculine | Feminine | Plural | Meaning
            mon | ma | mes | my
            ton | ta | tes | your
            son | sa | ses | his / her
            notre | notre | nos | our
            votre | votre | vos | your (formal / pl.)
            leur | leur | leurs | their
          `),
          examples: ex(`
            Mon frère s’appelle Hugo. | My brother is called Hugo.
            Sa mère est médecin. | His / her mother is a doctor.
            Mon amie Léa. | My friend Léa. (mon before a vowel!)
          `),
          tip: '**son / sa** agree with the noun, not the owner: **sa** voiture = his car **or** her car.',
        },
      ],
      vocab: vocab(`
        la famille | the family
        le père | father
        la mère | mother
        le frère | brother
        la sœur | sister
        les grands-parents | grandparents
        l’oncle | uncle
        la tante | aunt
      `),
      dialogue: dlg(`
        Julie: Tu as des frères et sœurs ? | Do you have brothers and sisters?
        Ben: Oui, j’ai une sœur. Elle s’appelle Chloé. | Yes, I have a sister. Her name is Chloé.
        Julie: Et tes parents, ils habitent où ? | And your parents, where do they live?
        Ben: À Bordeaux. | In Bordeaux.
      `),
      exercises: [
        qcm('« my sister »:', 'ma sœur', ['mon sœur', 'mes sœur', 'ma sœurs']),
        qcm('« his car » (la voiture):', 'sa voiture', ['son voiture', 'ses voiture', 'sa voitures']),
        qcm('« my friend (female) Léa »:', 'mon amie Léa', ['ma amie Léa', 'mes amie Léa', 'ma’amie Léa']),
        qcm('« leurs enfants » means…', 'their children', ['his children', 'our children', 'your children']),
        match('Match', [['l’oncle', 'uncle'], ['la tante', 'aunt'], ['le fils', 'son'], ['la fille', 'daughter']]),
        order('Put in order: « My brother is called Hugo. »', 'Mon frère s’appelle Hugo.', 'My brother is called Hugo.'),
        type('Translate: « the family »', 'la famille'),
        type('Complete: ___ parents habitent à Lyon. (my)', 'Mes'),
      ],
    },
    {
      id: 'fr-0-8',
      title: 'Days, months and weather',
      subtitle: 'lundi · janvier · il fait beau · il pleut',
      duration: 25,
      objectives: ['Say the date', 'Talk about the weather'],
      sections: [
        {
          title: 'Days and months (no capital letter!)',
          body: 'lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche. janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre.',
          examples: ex(`
            On est quel jour ? — On est vendredi. | What day is it? — It’s Friday.
            Mon anniversaire, c’est le 12 mars. | My birthday is on 12 March.
            Le lundi, je vais à la piscine. | On Mondays, I go to the pool.
          `),
          tip: 'Dates use **cardinal** numbers: le **deux** mai — except the 1st: le **premier** mai.',
        },
        {
          title: 'The weather',
          table: table(`
            French | Meaning
            Il fait beau. | The weather is nice.
            Il fait chaud / froid. | It’s hot / cold.
            Il y a du soleil. | It’s sunny.
            Il y a du vent. | It’s windy.
            Il pleut. | It’s raining.
            Il neige. | It’s snowing.
          `),
        },
      ],
      vocab: vocab(`
        lundi | Monday
        mercredi | Wednesday
        dimanche | Sunday
        janvier | January
        août | August
        la météo | the weather forecast
        il fait beau | the weather is nice
        il pleut | it’s raining
      `),
      exercises: [
        qcm('« Thursday »:', 'jeudi', ['mardi', 'mercredi', 'vendredi']),
        qcm('« 1 May »:', 'le premier mai', ['le un mai', 'le premier de mai', 'mai le un']),
        qcm('« It’s cold »:', 'Il fait froid.', ['C’est froid temps.', 'Il est froid.', 'Il a froid.']),
        qcm('Days of the week in French take…', 'no capital letter', ['a capital letter', 'an article always', 'an s']),
        match('Match', [['il neige', 'it’s snowing'], ['il pleut', 'it’s raining'], ['il y a du vent', 'it’s windy'], ['il fait beau', 'the weather is nice']]),
        order('Put in order: « My birthday is on 12 March. »', 'Mon anniversaire, c’est le 12 mars.', 'My birthday is on 12 March.'),
        type('Translate: « Sunday »', 'dimanche'),
        type('Translate: « It’s hot. »', 'Il fait chaud'),
      ],
    },
  ],
  'fr-a1': [
    {
      id: 'fr-a1-6',
      title: 'In town: asking the way',
      subtitle: 'Où est… ? · à droite · en face de',
      duration: 30,
      objectives: ['Ask for directions', 'Understand directions', 'Use à / au / en with places'],
      sections: [
        {
          title: 'Asking',
          examples: ex(`
            Excusez-moi, où est la gare ? | Excuse me, where is the station?
            Il y a une pharmacie près d’ici ? | Is there a pharmacy near here?
            C’est loin ? — Non, c’est à cinq minutes à pied. | Is it far? — No, it’s a five-minute walk.
          `),
        },
        {
          title: 'Directions',
          table: table(`
            French | Meaning
            tout droit | straight on
            à droite / à gauche | on the right / left
            tournez à gauche | turn left
            à côté de | next to
            en face de | opposite
            au coin de la rue | at the corner of the street
            au bout de la rue | at the end of the street
          `),
          tip: 'Cities: **à** Paris. Masculine countries: **au** Japon. Feminine countries (ending in -e): **en** France. Plural: **aux** États-Unis.',
        },
      ],
      vocab: vocab(`
        la gare | the station
        la rue | the street
        la place | the square
        la pharmacie | the pharmacy
        à droite | on the right
        à gauche | on the left
        tout droit | straight on
        loin | far
      `),
      exercises: [
        qcm('« Turn left »:', 'Tournez à gauche.', ['Tournez à droite.', 'Tournez gauche.', 'Allez à la gauche tout.']),
        qcm('« opposite the bank »:', 'en face de la banque', ['à côté de la banque', 'opposé la banque', 'en face la banque']),
        qcm('« in Japan »:', 'au Japon', ['en Japon', 'à Japon', 'aux Japon']),
        qcm('« in France »:', 'en France', ['au France', 'à France', 'dans France']),
        match('Match', [['la gare', 'the station'], ['la place', 'the square'], ['loin', 'far'], ['à côté de', 'next to']]),
        order('Put in order: « Excuse me, where is the station? »', 'Excusez-moi, où est la gare ?', 'Excuse me, where is the station?'),
        type('Translate: « straight on »', 'tout droit'),
        type('Complete: J’habite ___ États-Unis.', 'aux'),
      ],
    },
    {
      id: 'fr-a1-7',
      title: 'Shopping and demonstratives',
      subtitle: 'ce · cet · cette · ces · Combien ça coûte ?',
      duration: 30,
      objectives: ['Use demonstratives', 'Ask for a size and a price', 'Name clothes'],
      sections: [
        {
          title: 'this / that / these',
          table: table(`
            French | Used with | Example
            ce | masculine | ce pull
            cet | masculine + vowel / h | cet anorak
            cette | feminine | cette robe
            ces | plural | ces chaussures
          `),
          tip: 'Add **-ci** (here) or **-là** (there) to contrast: ce pull-**ci** ou ce pull-**là** ?',
        },
        {
          title: 'In a shop',
          examples: ex(`
            Combien coûte cette veste ? | How much is this jacket?
            Vous l’avez en 38 ? | Do you have it in a 38?
            Je peux l’essayer ? | Can I try it on?
            Je le prends. | I’ll take it.
            Je peux payer par carte ? | Can I pay by card?
          `),
        },
      ],
      vocab: vocab(`
        la veste | the jacket
        le pantalon | the trousers
        la robe | the dress
        les chaussures | the shoes
        la taille | the size
        essayer | to try (on)
        cher | expensive
        les soldes | the sales
      `),
      dialogue: dlg(`
        Vendeuse: Je peux vous aider ? | Can I help you?
        Client: Oui, je cherche un pull. Vous avez ce pull en M ? | Yes, I’m looking for a jumper. Do you have this one in M?
        Vendeuse: Oui, voilà. Les cabines sont au fond. | Yes, here you are. The fitting rooms are at the back.
      `),
      exercises: [
        qcm('« this dress »:', 'cette robe', ['ce robe', 'cet robe', 'ces robe']),
        qcm('« this tree » (arbre, m.):', 'cet arbre', ['ce arbre', 'cette arbre', 'ces arbre']),
        qcm('« these shoes »:', 'ces chaussures', ['cettes chaussures', 'ce chaussures', 'ses chaussures']),
        qcm('« Je le prends » means…', 'I’ll take it.', ['I took it.', 'Take it.', 'I’m giving it back.']),
        match('Match', [['la taille', 'the size'], ['essayer', 'to try on'], ['cher', 'expensive'], ['les soldes', 'the sales']]),
        order('Put in order: « How much is this jacket? »', 'Combien coûte cette veste ?', 'How much is this jacket?'),
        type('Translate: « the shoes »', 'les chaussures'),
        type('Complete: ___ pantalon est trop grand. (this)', 'Ce'),
      ],
    },
    {
      id: 'fr-a1-8',
      title: 'Describing people and things',
      subtitle: 'grand · petit · beau / belle · nouveau / nouvelle',
      duration: 30,
      objectives: ['Use common adjectives', 'Know which adjectives go before the noun', 'Describe someone'],
      sections: [
        {
          title: 'Before or after the noun?',
          body: 'Most adjectives go **after** the noun (un livre **intéressant**). A few short, common ones go **before** — remember **BAGS**: **B**eauty (beau, joli), **A**ge (jeune, vieux, nouveau), **G**oodness (bon, mauvais), **S**ize (grand, petit).',
          examples: ex(`
            une jolie maison | a pretty house
            un grand appartement | a big flat
            un film intéressant | an interesting film
            une petite ville tranquille | a quiet little town
          `),
        },
        {
          title: 'Irregular adjectives',
          table: table(`
            Masculine | Before a vowel | Feminine | Meaning
            beau | bel | belle | beautiful
            nouveau | nouvel | nouvelle | new
            vieux | vieil | vieille | old
          `),
          examples: ex(`
            un bel homme, une belle femme | a handsome man, a beautiful woman
            Il est grand, brun et très sympa. | He’s tall, dark-haired and very nice.
          `),
        },
      ],
      vocab: vocab(`
        grand | tall, big
        petit | small
        beau / belle | beautiful
        nouveau / nouvelle | new
        vieux / vieille | old
        jeune | young
        sympa | nice
        intéressant | interesting
      `),
      exercises: [
        qcm('« a pretty house »:', 'une jolie maison', ['une maison jolie', 'un joli maison', 'une jolie maisons']),
        qcm('« an interesting book »:', 'un livre intéressant', ['un intéressant livre', 'une livre intéressante', 'un livre intéressante']),
        qcm('« a new friend » (ami, m.):', 'un nouvel ami', ['un nouveau ami', 'une nouvelle ami', 'un ami nouvel']),
        qcm('Feminine of « vieux »:', 'vieille', ['vieuse', 'vieil', 'vielle']),
        match('Match', [['jeune', 'young'], ['petit', 'small'], ['sympa', 'nice'], ['grand', 'tall']]),
        order('Put in order: « a quiet little town »', 'une petite ville tranquille', 'a quiet little town'),
        type('Feminine of « beau »', 'belle'),
        type('Complete: C’est un ___ homme. (beau, before a vowel)', 'bel'),
      ],
    },
  ],
  'fr-a2': [
    {
      id: 'fr-a2-6',
      title: 'Comparing',
      subtitle: 'plus… que · aussi… que · le meilleur',
      duration: 25,
      objectives: ['Compare things and people', 'Form the superlative', 'Use meilleur and mieux'],
      sections: [
        {
          title: 'Comparatives',
          table: table(`
            French | Meaning | Example
            plus… que | more… than | Paris est plus grand que Lyon.
            moins… que | less… than | Le train est moins cher que l’avion.
            aussi… que | as… as | Elle est aussi grande que sa mère.
            autant de… que | as much / many… as | J’ai autant de livres que toi.
          `),
        },
        {
          title: 'Irregulars and superlatives',
          body: '**bon → meilleur** (adjective), **bien → mieux** (adverb). Superlative: **le / la / les plus + adjective (+ de)**.',
          examples: ex(`
            Ce gâteau est meilleur que l’autre. | This cake is better than the other one.
            Elle chante mieux que moi. | She sings better than me.
            C’est la plus belle ville du monde. | It’s the most beautiful city in the world.
            C’est le meilleur restaurant de Paris. | It’s the best restaurant in Paris.
          `),
        },
      ],
      vocab: vocab(`
        plus | more
        moins | less
        aussi | as, also
        meilleur | better (adj.)
        mieux | better (adv.)
        le pire | the worst
        cher | expensive
        rapide | fast
      `),
      exercises: [
        qcm('« bigger than »:', 'plus grand que', ['plus grand de', 'aussi grand que', 'grand plus que']),
        qcm('« She sings better than me »:', 'Elle chante mieux que moi.', ['Elle chante meilleur que moi.', 'Elle chante plus bien que moi.', 'Elle chante mieux de moi.']),
        qcm('« the best restaurant »:', 'le meilleur restaurant', ['le plus bon restaurant', 'le mieux restaurant', 'le restaurant meilleur de']),
        qcm('« as tall as »:', 'aussi grand que', ['autant grand que', 'si grand comme', 'aussi grand comme']),
        match('Match', [['meilleur', 'better (adj.)'], ['mieux', 'better (adv.)'], ['moins', 'less'], ['le pire', 'the worst']]),
        order('Put in order: « It’s the most beautiful city in the world. »', 'C’est la plus belle ville du monde.', 'It’s the most beautiful city in the world.'),
        type('Complete: Le train est ___ cher que l’avion. (less)', 'moins'),
        type('Complete: J’ai ___ de livres que toi. (as many)', 'autant'),
      ],
    },
    {
      id: 'fr-a2-7',
      title: 'Health and the body',
      subtitle: 'j’ai mal à la tête · chez le médecin',
      duration: 30,
      objectives: ['Name body parts', 'Say where it hurts', 'Talk to a doctor or pharmacist'],
      sections: [
        {
          title: 'avoir mal à',
          body: '**avoir mal à + le / la / les** — and remember the contractions: **au** (à + le), **aux** (à + les).',
          table: table(`
            French | Meaning
            J’ai mal à la tête. | I have a headache.
            J’ai mal au ventre. | I have a stomach ache.
            J’ai mal au dos. | My back hurts.
            J’ai mal aux dents. | I have toothache.
            J’ai mal à la gorge. | I have a sore throat.
            J’ai de la fièvre. | I have a temperature.
          `),
        },
        {
          title: 'At the doctor’s',
          examples: ex(`
            Qu’est-ce qui ne va pas ? | What’s wrong?
            Depuis quand ? — Depuis deux jours. | Since when? — For two days.
            Je vous fais une ordonnance. | I’ll write you a prescription.
            Prenez ce médicament trois fois par jour. | Take this medicine three times a day.
          `),
          tip: 'Emergency number in France: **15** (medical) or **112** (all of Europe).',
        },
      ],
      vocab: vocab(`
        la tête | the head
        le ventre | the stomach
        le dos | the back
        la gorge | the throat
        les dents | the teeth
        le médecin | the doctor
        l’ordonnance | the prescription
        le médicament | the medicine
      `),
      dialogue: dlg(`
        Médecin: Qu’est-ce qui ne va pas ? | What’s wrong?
        Patiente: J’ai mal à la gorge et j’ai de la fièvre. | I have a sore throat and a temperature.
        Médecin: C’est une angine. Je vous fais une ordonnance. | It’s tonsillitis. I’ll write you a prescription.
      `),
      exercises: [
        qcm('« I have a headache »:', 'J’ai mal à la tête.', ['J’ai mal au tête.', 'Je suis mal à la tête.', 'J’ai tête mal.']),
        qcm('« My back hurts »:', 'J’ai mal au dos.', ['J’ai mal à le dos.', 'J’ai mal aux dos.', 'Mon dos a mal.']),
        qcm('« l’ordonnance » is…', 'the prescription', ['the order', 'the appointment', 'the pharmacy']),
        qcm('Medical emergency number in France:', '15', ['911', '999', '17']),
        match('Match', [['la gorge', 'the throat'], ['le ventre', 'the stomach'], ['les dents', 'the teeth'], ['le médecin', 'the doctor']]),
        order('Put in order: « I have a temperature. »', 'J’ai de la fièvre.', 'I have a temperature.'),
        type('Translate: « the medicine »', 'le médicament'),
        type('Complete: J’ai mal ___ dents.', 'aux'),
      ],
    },
    {
      id: 'fr-a2-8',
      title: 'The imperative',
      subtitle: 'Viens ! · Allons-y ! · Ne touchez pas !',
      duration: 25,
      objectives: ['Give instructions and advice', 'Form the negative imperative', 'Place pronouns with the imperative'],
      sections: [
        {
          title: 'Formation',
          body: 'Use the **tu, nous, vous** forms of the present, without the subject. For -er verbs, drop the **-s** of the tu form: tu parles → **Parle !**',
          table: table(`
            Infinitive | tu | nous | vous
            parler | parle | parlons | parlez
            finir | finis | finissons | finissez
            venir | viens | venons | venez
            être | sois | soyons | soyez
            avoir | aie | ayons | ayez
          `),
        },
        {
          title: 'Negative and pronouns',
          examples: ex(`
            Ne parle pas si fort ! | Don’t speak so loudly!
            Allons-y ! | Let’s go!
            Dis-moi la vérité. | Tell me the truth.
            Ne t’inquiète pas. | Don’t worry.
            Asseyez-vous, s’il vous plaît. | Sit down, please.
          `),
          tip: 'Affirmative: pronoun **after** with a hyphen (dis-**moi**). Negative: pronoun **before** (ne **me** dis pas).',
        },
      ],
      vocab: vocab(`
        viens | come (tu)
        allons-y | let’s go
        attends | wait (tu)
        écoutez | listen (vous)
        dis-moi | tell me
        ne t’inquiète pas | don’t worry
        asseyez-vous | sit down
        sois sage | be good
      `),
      exercises: [
        qcm('Imperative (tu) of « parler »:', 'parle', ['parles', 'parlez', 'parler']),
        qcm('Imperative (vous) of « être »:', 'soyez', ['êtes', 'soyiez', 'étez']),
        qcm('« Don’t worry » (tu):', 'Ne t’inquiète pas.', ['Ne inquiète-toi pas.', 'Ne t’inquiètes pas toi.', 'Pas t’inquiète.']),
        qcm('« Tell me » (tu):', 'Dis-moi.', ['Me dis.', 'Dis-me.', 'Dit-moi.']),
        match('Match', [['allons-y', 'let’s go'], ['attends', 'wait'], ['écoutez', 'listen'], ['viens', 'come']]),
        order('Put in order: « Sit down, please. »', 'Asseyez-vous, s’il vous plaît.', 'Sit down, please.'),
        type('Imperative (tu) of « finir »', 'finis'),
        type('Imperative (nous) of « aller »', 'allons'),
      ],
    },
  ],
  'fr-b1': [
    {
      id: 'fr-b1-6',
      title: 'The plus-que-parfait',
      subtitle: 'j’avais fini · elle était déjà partie',
      duration: 25,
      objectives: ['Form the pluperfect', 'Tell which action happened first'],
      sections: [
        {
          title: 'avoir / être in the imparfait + participle',
          table: table(`
            Pronoun | with avoir | with être
            j’ | avais mangé | étais parti(e)
            tu | avais mangé | étais parti(e)
            il / elle | avait mangé | était parti(e)
            nous | avions mangé | étions parti(e)s
            vous | aviez mangé | étiez parti(e)(s)
            ils / elles | avaient mangé | étaient parti(e)s
          `),
          examples: ex(`
            Quand je suis arrivé, le film avait déjà commencé. | When I arrived, the film had already started.
            Elle m’a dit qu’elle avait perdu ses clés. | She told me she had lost her keys.
            Je n’avais jamais vu la mer avant. | I had never seen the sea before.
          `),
        },
      ],
      vocab: vocab(`
        déjà | already
        avant | before
        jamais | never
        perdre | to lose
        commencer | to start
        la mer | the sea
        les clés | the keys
        oublier | to forget
      `),
      exercises: [
        qcm('« I had eaten »:', 'J’avais mangé.', ['J’ai mangé.', 'Je mangeais.', 'J’étais mangé.']),
        qcm('« She had left »:', 'Elle était partie.', ['Elle avait partie.', 'Elle est partie.', 'Elle avait parti.']),
        qcm('The pluperfect expresses…', 'an action before another past action', ['a habit', 'a future plan', 'an ongoing action']),
        qcm('« Je n’avais jamais vu la mer » means…', 'I had never seen the sea.', ['I will never see the sea.', 'I never see the sea.', 'I didn’t want to see the sea.']),
        match('Match', [['déjà', 'already'], ['avant', 'before'], ['perdre', 'to lose'], ['oublier', 'to forget']]),
        order('Put in order: « The film had already started. »', 'Le film avait déjà commencé.', 'The film had already started.'),
        type('Complete: Nous ___ fini. (avoir, imparfait)', 'avions'),
        type('Complete: Ils ___ arrivés en retard. (être, imparfait)', 'étaient'),
      ],
    },
    {
      id: 'fr-b1-7',
      title: 'Giving your opinion',
      subtitle: 'je pense que · je ne pense pas que · à mon avis',
      duration: 30,
      objectives: ['Express an opinion', 'Know when opinion takes the subjunctive', 'Agree and disagree'],
      sections: [
        {
          title: 'Indicative or subjunctive?',
          body: 'Affirmative opinion (**je pense que, je crois que, je trouve que**) → **indicative**. Negative or doubtful opinion (**je ne pense pas que, je doute que**) → **subjunctive**.',
          examples: ex(`
            Je pense que c’est une bonne idée. | I think it’s a good idea.
            Je ne pense pas que ce soit une bonne idée. | I don’t think it’s a good idea.
            À mon avis, il a raison. | In my opinion, he’s right.
            Je doute qu’il vienne. | I doubt he’ll come.
          `),
        },
        {
          title: 'Agreeing and disagreeing',
          table: table(`
            French | Meaning
            Je suis d’accord. | I agree.
            Je ne suis pas d’accord. | I disagree.
            Tu as raison. | You’re right.
            Tu as tort. | You’re wrong.
            Ça dépend. | It depends.
            Pas du tout ! | Not at all!
          `),
        },
      ],
      vocab: vocab(`
        penser | to think
        croire | to believe
        douter | to doubt
        à mon avis | in my opinion
        être d’accord | to agree
        avoir raison | to be right
        avoir tort | to be wrong
        ça dépend | it depends
      `),
      exercises: [
        qcm('« I think he’s right »:', 'Je pense qu’il a raison.', ['Je pense qu’il ait raison.', 'Je pense il a raison que.', 'Je ne pense qu’il a raison.']),
        qcm('« I don’t think it’s true »:', 'Je ne pense pas que ce soit vrai.', ['Je ne pense pas que c’est vrai vrai.', 'Je pense pas c’est vrai.', 'Je ne pense que ce soit pas vrai.']),
        qcm('« Tu as tort » means…', 'You’re wrong.', ['You’re right.', 'You’re late.', 'You’re tired.']),
        qcm('After « je doute que », use…', 'the subjunctive', ['the indicative', 'the infinitive', 'the future']),
        match('Match', [['à mon avis', 'in my opinion'], ['ça dépend', 'it depends'], ['pas du tout', 'not at all'], ['être d’accord', 'to agree']]),
        order('Put in order: « In my opinion, he is right. »', 'À mon avis, il a raison.', 'In my opinion, he is right.'),
        type('Complete: Je doute qu’il ___. (venir, subjunctive)', 'vienne'),
        type('Complete: Je suis d’___. (I agree)', 'accord'),
      ],
    },
    {
      id: 'fr-b1-8',
      title: 'The world of work',
      subtitle: 'le CV · l’entretien · le poste',
      duration: 30,
      objectives: ['Talk about your job', 'Handle a job interview in French', 'Write a short professional email'],
      sections: [
        {
          title: 'Vocabulary',
          table: table(`
            French | Meaning
            un poste | a position
            une entreprise | a company
            un salaire | a salary
            un collègue | a colleague
            le patron / la patronne | the boss
            un entretien d’embauche | a job interview
            postuler | to apply
            être au chômage | to be unemployed
          `),
        },
        {
          title: 'In the interview',
          examples: ex(`
            Parlez-moi de votre parcours. | Tell me about your background.
            J’ai trois ans d’expérience dans la vente. | I have three years’ experience in sales.
            Je suis quelqu’un d’organisé et de motivé. | I’m an organised and motivated person.
            Pourquoi voulez-vous travailler chez nous ? | Why do you want to work for us?
            Quand pourriez-vous commencer ? | When could you start?
          `),
          tip: 'Professional emails often end with **Cordialement,** (Kind regards).',
        },
      ],
      vocab: vocab(`
        un poste | a position
        une entreprise | a company
        un salaire | a salary
        un collègue | a colleague
        un entretien | an interview
        postuler | to apply
        l’expérience | experience
        le chômage | unemployment
      `),
      dialogue: dlg(`
        Recruteuse: Quels sont vos points forts ? | What are your strengths?
        Candidat: Je suis rigoureux et j’aime travailler en équipe. | I’m thorough and I like working in a team.
        Recruteuse: Et vos points faibles ? | And your weaknesses?
        Candidat: Je suis parfois un peu impatient. | I’m sometimes a bit impatient.
      `),
      exercises: [
        qcm('« to apply (for a job) »:', 'postuler', ['appliquer', 'demander le job', 'poster']),
        qcm('« être au chômage » means…', 'to be unemployed', ['to be on holiday', 'to be retired', 'to be on strike']),
        qcm('How do professional emails usually end?', 'Cordialement,', ['Bisous,', 'Salut,', 'À plus,']),
        qcm('« Quand pourriez-vous commencer ? » means…', 'When could you start?', ['When did you start?', 'Why start?', 'Can you finish?']),
        match('Match', [['un poste', 'a position'], ['un salaire', 'a salary'], ['une entreprise', 'a company'], ['un collègue', 'a colleague']]),
        order('Put in order: « I have three years’ experience. »', 'J’ai trois ans d’expérience.', 'I have three years’ experience.'),
        type('Translate: « a job interview » (un ___ d’embauche)', 'entretien'),
        type('Translate: « the boss » (masculine)', 'le patron'),
      ],
    },
  ],
  'fr-b2': [
    {
      id: 'fr-b2-6',
      title: 'Futur antérieur and conditionnel passé',
      subtitle: 'j’aurai fini · j’aurais aimé',
      duration: 30,
      objectives: ['Talk about an action completed before a future point', 'Express regrets and unconfirmed information'],
      sections: [
        {
          title: 'Futur antérieur',
          body: '**avoir / être in the future + participle**. After **quand, dès que, lorsque**, French uses it where English uses the present perfect.',
          examples: ex(`
            Je t’appellerai quand j’aurai fini. | I’ll call you when I’ve finished.
            Dès qu’il sera arrivé, on partira. | As soon as he has arrived, we’ll leave.
            D’ici juin, nous aurons déménagé. | By June, we will have moved.
          `),
        },
        {
          title: 'Conditionnel passé',
          body: '**avoir / être in the conditional + participle**: regrets, reproaches, and — in the news — **unconfirmed information**.',
          examples: ex(`
            J’aurais aimé venir. | I would have liked to come.
            Tu aurais dû me prévenir. | You should have warned me.
            L’incendie aurait fait trois victimes. | The fire reportedly left three victims.
          `),
        },
      ],
      vocab: vocab(`
        dès que | as soon as
        lorsque | when
        d’ici | by (time)
        déménager | to move house
        prévenir | to warn, let know
        regretter | to regret
        l’incendie | the fire
        la victime | the victim
      `),
      exercises: [
        qcm('« I’ll call you when I’ve finished »:', 'Je t’appellerai quand j’aurai fini.', ['Je t’appellerai quand j’ai fini.', 'Je t’appelle quand je finirai.', 'Je t’appellerai quand je finis.']),
        qcm('« I would have liked to come »:', 'J’aurais aimé venir.', ['J’aimerais venir hier.', 'J’aurai aimé venir.', 'J’avais aimé venir.']),
        qcm('In the news, « aurait fait trois victimes » means…', 'reportedly left three victims', ['will leave three victims', 'had three victims before', 'should leave three victims']),
        qcm('« Tu aurais dû » means…', 'You should have', ['You will have to', 'You had to', 'You must']),
        match('Match', [['dès que', 'as soon as'], ['d’ici', 'by'], ['déménager', 'to move house'], ['prévenir', 'to warn']]),
        order('Put in order: « By June, we will have moved. »', 'D’ici juin, nous aurons déménagé.', 'By June, we will have moved.'),
        type('Complete: Quand tu ___ fini, appelle-moi. (avoir, future)', 'auras'),
        type('Complete: J’___ aimé venir. (avoir, conditional)', 'aurais'),
      ],
    },
    {
      id: 'fr-b2-7',
      title: 'Compound relative pronouns',
      subtitle: 'lequel · auquel · duquel · ce qui / ce que',
      duration: 30,
      objectives: ['Use relative pronouns after prepositions', 'Use ce qui and ce que'],
      sections: [
        {
          title: 'lequel and its forms',
          body: 'After a preposition (for things), use **lequel, laquelle, lesquels, lesquelles**. With **à** and **de** they contract.',
          table: table(`
            Base | with à | with de
            lequel | auquel | duquel
            laquelle | à laquelle | de laquelle
            lesquels | auxquels | desquels
            lesquelles | auxquelles | desquelles
          `),
          examples: ex(`
            Le stylo avec lequel j’écris. | The pen I write with.
            Le projet auquel je pense. | The project I’m thinking about.
            La raison pour laquelle je suis venu. | The reason why I came.
          `),
        },
        {
          title: 'ce qui / ce que',
          examples: ex(`
            Ce qui m’intéresse, c’est l’histoire. | What interests me is history. (subject)
            Ce que je veux, c’est partir. | What I want is to leave. (object)
            Dis-moi ce dont tu as besoin. | Tell me what you need.
          `),
        },
      ],
      vocab: vocab(`
        lequel | which (after prep.)
        auquel | to which
        duquel | of which
        ce qui | what (subject)
        ce que | what (object)
        ce dont | what (of)
        la raison | the reason
        le projet | the project
      `),
      exercises: [
        qcm('« The reason why I came »:', 'La raison pour laquelle je suis venu', ['La raison pour lequel je suis venu', 'La raison que je suis venu pour', 'La raison dont je suis venu']),
        qcm('« The project I’m thinking about » (penser à):', 'Le projet auquel je pense', ['Le projet duquel je pense', 'Le projet que je pense à', 'Le projet lequel je pense']),
        qcm('« What interests me… »:', 'Ce qui m’intéresse…', ['Ce que m’intéresse…', 'Qu’est-ce qui m’intéresse…', 'Ce dont m’intéresse…']),
        qcm('« Tell me what you need » (avoir besoin de):', 'Dis-moi ce dont tu as besoin.', ['Dis-moi ce que tu as besoin.', 'Dis-moi ce qui tu as besoin.', 'Dis-moi quoi tu as besoin.']),
        match('Match', [['auquel', 'à + lequel'], ['duquel', 'de + lequel'], ['ce qui', 'subject'], ['ce que', 'object']]),
        order('Put in order: « What I want is to leave. »', 'Ce que je veux, c’est partir.', 'What I want is to leave.'),
        type('Complete: Le stylo avec ___ j’écris. (lequel)', 'lequel'),
        type('Complete: ___ que je préfère, c’est la mer. (What)', 'Ce'),
      ],
    },
    {
      id: 'fr-b2-8',
      title: 'Media and current affairs',
      subtitle: 'l’actualité · un article · selon',
      duration: 30,
      objectives: ['Understand news vocabulary', 'Discuss a news story', 'Nuance your point of view'],
      sections: [
        {
          title: 'Vocabulary',
          table: table(`
            French | Meaning
            l’actualité | the news, current affairs
            un journal / un quotidien | a newspaper / a daily
            un article | an article
            les réseaux sociaux | social media
            une fausse information | fake news
            un sondage | a poll
            le gouvernement | the government
            une grève | a strike
          `),
        },
        {
          title: 'Talking about the news',
          examples: ex(`
            D’après un sondage, 60 % des Français sont inquiets. | According to a poll, 60% of French people are worried.
            Selon le journal, la grève va continuer. | According to the paper, the strike will continue.
            Il faut vérifier ses sources. | You have to check your sources.
            Cette information reste à confirmer. | This information is yet to be confirmed.
          `),
          tip: 'For DELF B2, practise summarising an article in 3 sentences, then giving your opinion with arguments.',
        },
      ],
      vocab: vocab(`
        l’actualité | current affairs
        un quotidien | a daily newspaper
        un sondage | a poll
        une grève | a strike
        selon | according to
        vérifier | to check
        la source | the source
        les réseaux sociaux | social media
      `),
      exercises: [
        qcm('« une grève » is…', 'a strike', ['a grave', 'a beach', 'a gravel road']),
        qcm('« according to the paper »:', 'selon le journal', ['accordant le journal', 'selon du journal', 'à le journal']),
        qcm('« l’actualité » means…', 'current affairs', ['reality', 'currently', 'the present tense']),
        qcm('« un sondage » is…', 'a poll', ['a probe', 'a sound', 'a dream']),
        match('Match', [['un quotidien', 'a daily newspaper'], ['vérifier', 'to check'], ['la source', 'the source'], ['le gouvernement', 'the government']]),
        order('Put in order: « You have to check your sources. »', 'Il faut vérifier ses sources.', 'You have to check your sources.'),
        type('Translate: « social media »', 'les réseaux sociaux'),
        type('Translate: « fake news » (une fausse ___)', 'information'),
      ],
    },
  ],
  'fr-c1': [
    {
      id: 'fr-c1-6',
      title: 'Reading literature: the passé simple',
      subtitle: 'il fut · elle alla · ils prirent',
      duration: 30,
      objectives: ['Recognise the passé simple in novels', 'Know the most frequent irregular forms'],
      sections: [
        {
          title: 'A written-only tense',
          body: 'The **passé simple** replaces the passé composé in literature, fairy tales and history books. You need to **recognise** it, not use it when speaking. Mostly 3rd person (il / elle / ils).',
          table: table(`
            Infinitive | il / elle | ils / elles
            parler | parla | parlèrent
            finir | finit | finirent
            être | fut | furent
            avoir | eut | eurent
            faire | fit | firent
            prendre | prit | prirent
            venir | vint | vinrent
            voir | vit | virent
          `),
        },
        {
          title: 'In a text',
          examples: ex(`
            Il était une fois une princesse qui vivait dans un château. | Once upon a time there was a princess who lived in a castle.
            Un jour, un prince arriva et la vit. | One day, a prince arrived and saw her.
            Ils se marièrent et eurent beaucoup d’enfants. | They got married and had many children.
          `),
          tip: 'Like with the passé composé, the **imparfait** still sets the scene: « Il faisait nuit quand il arriva. »',
        },
      ],
      vocab: vocab(`
        il fut | he was
        il eut | he had
        il fit | he did, made
        il prit | he took
        il vint | he came
        il vit | he saw
        il était une fois | once upon a time
        le château | the castle
      `),
      exercises: [
        qcm('« il fut » is the passé simple of…', 'être', ['faire', 'fuir', 'avoir']),
        qcm('« ils eurent » means…', 'they had', ['they were', 'they will have', 'they saw']),
        qcm('« elle vit » can mean…', 'she saw (or she lives)', ['she came', 'she wanted', 'she went']),
        qcm('The passé simple is used mainly…', 'in literature and history books', ['in conversation', 'in text messages', 'for the future']),
        match('Match', [['il prit', 'he took'], ['il vint', 'he came'], ['il fit', 'he made'], ['il parla', 'he spoke']]),
        order('Put in order: « They got married and had many children. »', 'Ils se marièrent et eurent beaucoup d’enfants.', 'They got married and had many children.'),
        type('Passé simple of « aller » (il)', 'alla'),
        type('Passé simple of « finir » (il)', 'finit'),
      ],
    },
    {
      id: 'fr-c1-7',
      title: 'Formal style and nominalisation',
      subtitle: 'la hausse des prix · la mise en place de',
      duration: 30,
      objectives: ['Turn verbs into nouns', 'Write in a formal, concise style'],
      sections: [
        {
          title: 'Verb → noun',
          body: 'Formal French (reports, headlines, DALF essays) prefers **nouns** to verbs: « les prix augmentent » → « **l’augmentation** des prix ».',
          table: table(`
            Verb | Noun | Meaning
            augmenter | l’augmentation | increase
            baisser | la baisse | drop
            développer | le développement | development
            mettre en place | la mise en place | implementation
            décider | la décision | decision
            arriver | l’arrivée | arrival
            choisir | le choix | choice
          `),
        },
        {
          title: 'In context',
          examples: ex(`
            Le gouvernement a décidé de réduire les impôts. → La décision du gouvernement de réduire les impôts… | The government decided to cut taxes. → The government’s decision to cut taxes…
            Hausse des prix de l’énergie. | Rise in energy prices. (headline)
            Il convient de noter la mise en place de nouvelles mesures. | It should be noted that new measures have been introduced.
          `),
        },
      ],
      vocab: vocab(`
        l’augmentation | the increase
        la baisse | the decrease
        la hausse | the rise
        la mise en place | the implementation
        le développement | the development
        la décision | the decision
        réduire | to reduce
        les impôts | taxes
      `),
      exercises: [
        qcm('Noun of « augmenter »:', 'l’augmentation', ['l’augmentement', 'l’augmente', 'l’augmentance']),
        qcm('Noun of « choisir »:', 'le choix', ['la choisie', 'le choisissement', 'la choisition']),
        qcm('« Hausse des prix » is…', 'a headline style for « prices are rising »', ['a question', 'an order', 'a slang expression']),
        qcm('« la mise en place » means…', 'the implementation', ['the setting of the table', 'the place', 'the bet']),
        match('Match', [['baisser', 'la baisse'], ['arriver', 'l’arrivée'], ['décider', 'la décision'], ['développer', 'le développement']]),
        order('Put in order: « Rise in energy prices »', 'Hausse des prix de l’énergie', 'Rise in energy prices'),
        type('Noun of « baisser »', 'la baisse'),
        type('Translate: « taxes »', 'les impôts'),
      ],
    },
    {
      id: 'fr-c1-8',
      title: 'French around the world',
      subtitle: 'Québec · Belgique · Suisse · Afrique',
      duration: 25,
      objectives: ['Recognise regional varieties of French', 'Understand common regional words'],
      sections: [
        {
          title: 'One language, many accents',
          body: 'About **320 million** people speak French across five continents. Grammar is the same, but vocabulary, numbers and expressions change.',
          table: table(`
            Region | Word | France | Meaning
            Belgique / Suisse | septante | soixante-dix | 70
            Belgique / Suisse | nonante | quatre-vingt-dix | 90
            Suisse | huitante | quatre-vingts | 80
            Québec | un char | une voiture | a car
            Québec | magasiner | faire du shopping | to go shopping
            Québec | la fin de semaine | le week-end | the weekend
            Belgique | une drache | une grosse averse | a downpour
            Afrique de l’Ouest | une go | une fille | a girl
          `),
        },
        {
          title: 'Québec expressions',
          examples: ex(`
            C’est plate ! | It’s boring!
            Il fait frette ! | It’s freezing!
            On se voit en fin de semaine. | See you at the weekend.
            Bienvenue ! (= de rien) | You’re welcome!
          `),
          tip: 'In Québec, « **Bienvenue** » is also the answer to « Merci » — like « You’re welcome ».',
        },
      ],
      vocab: vocab(`
        septante | seventy (BE / CH)
        nonante | ninety (BE / CH)
        un char | a car (Québec)
        magasiner | to go shopping (Québec)
        la fin de semaine | the weekend (Québec)
        la francophonie | the French-speaking world
        un accent | an accent
        une expression | an expression
      `),
      exercises: [
        qcm('In Belgium, 70 is…', 'septante', ['soixante-dix', 'huitante', 'nonante']),
        qcm('In Québec, « un char » is…', 'a car', ['a tank', 'a chair', 'a cart']),
        qcm('« magasiner » means…', 'to go shopping', ['to store', 'to work in a shop', 'to read a magazine']),
        qcm('In Québec, « Bienvenue » can answer…', '« Merci »', ['« Bonjour »', '« Au revoir »', '« Pardon »']),
        match('Match', [['nonante', '90'], ['septante', '70'], ['huitante', '80'], ['la fin de semaine', 'the weekend']]),
        order('Put in order: « See you at the weekend. » (Québec)', 'On se voit en fin de semaine.', 'See you at the weekend.'),
        type('Translate (Belgium): « ninety »', 'nonante'),
        type('What is the French-speaking world called? (la ___)', 'francophonie'),
      ],
    },
  ],
}
