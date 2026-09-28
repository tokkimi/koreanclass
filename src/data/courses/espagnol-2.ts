import type { Level } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

export const esB1: Level = {
  id: 'es-b1',
  index: 3,
  name: 'Niveau 3 — Intermédiaire',
  korean: 'Intermedio',
  cefr: 'B1',
  topik: 'DELE B1',
  color: '#a61e4d',
  description: 'Entrer dans le subjonctif pour exprimer souhaits, doutes et opinions, donner des ordres, et ne plus confondre por et para. Tu peux maintenant tenir une vraie discussion.',
  lessons: [
    {
      id: 'es-b1-1',
      title: 'Former le subjonctif présent',
      subtitle: 'hable · coma · viva · tenga',
      duration: 30,
      objectives: ['Former le subjonctif des verbes réguliers et irréguliers'],
      sections: [
        {
          title: 'Le principe des voyelles inversées',
          body: 'On part du **yo** du présent, on enlève le -o, puis on inverse la voyelle : **-ar → -e**, **-er / -ir → -a**.',
          table: table(`
            Pronom | hablar | comer | tener (tengo)
            yo | hable | coma | tenga
            tú | hables | comas | tengas
            él / ella | hable | coma | tenga
            nosotros | hablemos | comamos | tengamos
            ellos | hablen | coman | tengan
          `),
        },
        {
          title: 'Six irréguliers à connaître',
          table: table(`
            Infinitif | Subjonctif (yo)
            ser | sea
            ir | vaya
            estar | esté
            haber | haya
            saber | sepa
            dar | dé
          `),
        },
      ],
      vocab: vocab(`
        sea | que je sois
        vaya | que j’aille
        esté | que je sois (estar)
        haya | qu’il y ait
        sepa | que je sache
        tenga | que j’aie
        haga | que je fasse
        pueda | que je puisse
      `),
      exercises: [
        qcm('Subjonctif de « hablar » (yo) :', 'hable', ['habla', 'hablo', 'hablé']),
        qcm('Subjonctif de « comer » (tú) :', 'comas', ['comes', 'comías', 'comás']),
        qcm('Subjonctif de « ir » (yo) :', 'vaya', ['voya', 'iga', 'vaye']),
        qcm('Subjonctif de « ser » (ellos) :', 'sean', ['son', 'seen', 'eran']),
        type('Subjonctif de « tener » (nosotros)', 'tengamos'),
        match('Associe', [['saber', 'sepa'], ['estar', 'esté'], ['haber', 'haya'], ['dar', 'dé']]),
      ],
    },
    {
      id: 'es-b1-2',
      title: 'Souhaits et demandes',
      subtitle: 'quiero que · ojalá · espero que',
      duration: 30,
      objectives: ['Exprimer un souhait avec ojalá', 'Demander à quelqu’un de faire quelque chose'],
      sections: [
        {
          title: 'Deux sujets différents → subjonctif',
          body: 'Si le sujet change entre les deux verbes, on utilise **que + subjonctif**. Même sujet : infinitif.',
          examples: ex(`
            Quiero viajar. | Je veux voyager. (même sujet)
            Quiero que viajes conmigo. | Je veux que tu voyages avec moi.
            Espero que estés bien. | J’espère que tu vas bien.
            Te pido que me ayudes. | Je te demande de m’aider.
          `),
        },
        {
          title: 'Ojalá',
          body: '**Ojalá** (d’origine arabe, « si Dieu le veut ») = « pourvu que », toujours suivi du subjonctif.',
          examples: ex(`
            ¡Ojalá haga buen tiempo mañana! | Pourvu qu’il fasse beau demain !
            Ojalá puedas venir. | J’espère que tu pourras venir.
          `),
        },
      ],
      vocab: vocab(`
        ojalá | pourvu que
        esperar | espérer, attendre
        pedir | demander
        necesitar | avoir besoin
        preferir | préférer
        conmigo | avec moi
        el buen tiempo | le beau temps
        ayudar | aider
      `),
      dialogue: dlg(`
        Mamá: Quiero que ordenes tu habitación. | Je veux que tu ranges ta chambre.
        Leo: Vale, pero prefiero que me ayudes. | D’accord, mais je préfère que tu m’aides.
        Mamá: ¡Ojalá seas más ordenado algún día! | Pourvu que tu sois plus ordonné un jour !
      `),
      exercises: [
        qcm('« Je veux que tu viennes » :', 'Quiero que vengas.', ['Quiero que vienes.', 'Quiero venir tú.', 'Quiero que venir.']),
        qcm('« Je veux venir » :', 'Quiero venir.', ['Quiero que venga.', 'Quiero que vengo.', 'Quiero vengas.']),
        qcm('Après « ojalá », on met…', 'le subjonctif', ['l’indicatif', 'l’infinitif', 'le futur']),
        type('Complète : Espero que ___ bien. (estar, tú)', 'estés'),
        order('Remets dans l’ordre : « Je te demande de m’aider. »', 'Te pido que me ayudes.', 'Je te demande de m’aider.'),
        qcm('« Ojalá haga buen tiempo » veut dire…', 'Pourvu qu’il fasse beau.', ['Il fait beau.', 'Il a fait beau.', 'S’il fait beau.']),
      ],
    },
    {
      id: 'es-b1-3',
      title: 'Opinion et doute',
      subtitle: 'creo que · no creo que · es importante que',
      duration: 30,
      objectives: ['Donner son opinion', 'Exprimer le doute', 'Utiliser les expressions impersonnelles'],
      sections: [
        {
          title: 'Affirmer ou douter',
          body: 'Opinion **affirmative** → indicatif. Opinion **négative** ou doute → subjonctif.',
          examples: ex(`
            Creo que tienes razón. | Je crois que tu as raison.
            No creo que tengas razón. | Je ne crois pas que tu aies raison.
            Pienso que es caro. | Je pense que c’est cher.
            Dudo que venga. | Je doute qu’il vienne.
          `),
        },
        {
          title: 'Expressions impersonnelles',
          examples: ex(`
            Es importante que descanses. | Il est important que tu te reposes.
            Es posible que llueva. | Il est possible qu’il pleuve.
            Es verdad que es difícil. | C’est vrai que c’est difficile. (certitude → indicatif)
          `),
          tip: 'Ce qui est **certain** (es verdad, es cierto, está claro) garde l’indicatif.',
        },
      ],
      vocab: vocab(`
        creer | croire
        pensar | penser
        dudar | douter
        tener razón | avoir raison
        es posible | il est possible
        es verdad | c’est vrai
        a mi parecer | à mon avis
        sin embargo | cependant
      `),
      exercises: [
        qcm('« Je crois qu’il est là » :', 'Creo que está aquí.', ['Creo que esté aquí.', 'Creo estar aquí.', 'No creo que está aquí.']),
        qcm('« Je ne crois pas qu’il soit là » :', 'No creo que esté aquí.', ['No creo que está aquí.', 'No creo estar aquí.', 'Creo que no esté aquí.']),
        qcm('« Es verdad que… » est suivi de…', 'l’indicatif', ['le subjonctif', 'l’infinitif', 'l’impératif']),
        type('Complète : Es posible que ___ mañana. (llover)', 'llueva'),
        match('Associe', [['dudar', 'douter'], ['creer', 'croire'], ['sin embargo', 'cependant'], ['tener razón', 'avoir raison']]),
        order('Remets dans l’ordre : « Il est important que tu te reposes. »', 'Es importante que descanses.', 'Il est important que tu te reposes.'),
      ],
    },
    {
      id: 'es-b1-4',
      title: 'L’impératif',
      subtitle: '¡Habla! · ¡No hables! · ¡Venga!',
      duration: 30,
      objectives: ['Donner des ordres à tú et usted', 'Former l’impératif négatif'],
      sections: [
        {
          title: 'Affirmatif',
          body: '**tú** : 3e personne du présent (habla, come). Irréguliers : ven, di, haz, pon, sal, sé, ten, ve. **usted / ustedes / nosotros** : subjonctif (hable, coman, vamos).',
          table: table(`
            Infinitif | tú | usted
            hablar | habla | hable
            comer | come | coma
            venir | ven | venga
            hacer | haz | haga
            decir | di | diga
          `),
        },
        {
          title: 'Négatif : toujours le subjonctif',
          examples: ex(`
            ¡No hables tan alto! | Ne parle pas si fort !
            No te preocupes. | Ne t’inquiète pas.
            ¡Siéntese, por favor! | Asseyez-vous, s’il vous plaît !
            Gire a la derecha. | Tournez à droite.
          `),
        },
      ],
      vocab: vocab(`
        girar | tourner
        a la derecha | à droite
        a la izquierda | à gauche
        todo recto | tout droit
        preocuparse | s’inquiéter
        sentarse | s’asseoir
        cruzar | traverser
        esperar | attendre
      `),
      exercises: [
        qcm('Impératif (tú) de « venir » :', 'ven', ['viene', 'venga', 'vienes']),
        qcm('Impératif (tú) de « hacer » :', 'haz', ['hace', 'haga', 'haces']),
        qcm('« Ne parle pas ! » (tú) :', '¡No hables!', ['¡No habla!', '¡No hablas!', '¡No hable tú!']),
        qcm('« Tournez à droite » (usted) :', 'Gire a la derecha.', ['Gira a la derecha.', 'Giras a la derecha.', 'Girad a la derecha.']),
        type('Impératif (tú) de « decir »', 'di'),
        match('Associe', [['todo recto', 'tout droit'], ['a la izquierda', 'à gauche'], ['cruzar', 'traverser'], ['sentarse', 's’asseoir']]),
      ],
    },
    {
      id: 'es-b1-5',
      title: 'Por ou para ?',
      subtitle: 'por la mañana · para ti · gracias por',
      duration: 30,
      objectives: ['Distinguer por (cause, passage) et para (but, destinataire)'],
      sections: [
        {
          title: 'Les grands usages',
          table: table(`
            Préposition | Usage | Exemple
            para | but, objectif | Estudio para aprender.
            para | destinataire | Este regalo es para ti.
            para | destination, échéance | Salgo para Madrid. Es para el lunes.
            por | cause | Gracias por tu ayuda.
            por | passage, lieu vague | Paseo por el parque.
            por | moyen, échange | Te llamo por teléfono. Lo compré por 10 euros.
            por | moment de la journée | Trabajo por la mañana.
          `),
          tip: 'Astuce : **para** regarde vers l’avant (le but), **por** regarde en arrière (la cause).',
        },
      ],
      vocab: vocab(`
        por eso | c’est pourquoi
        por fin | enfin
        por favor | s’il vous plaît
        para siempre | pour toujours
        por ejemplo | par exemple
        pasear | se promener
        el regalo | le cadeau
        la ayuda | l’aide
      `),
      exercises: [
        qcm('« Ce cadeau est pour toi » :', 'Este regalo es para ti.', ['Este regalo es por ti.', 'Este regalo es a ti.', 'Este regalo es de ti.']),
        qcm('« Merci pour ton aide » :', 'Gracias por tu ayuda.', ['Gracias para tu ayuda.', 'Gracias de tu ayuda.', 'Gracias a tu ayuda por.']),
        qcm('« Je me promène dans le parc » :', 'Paseo por el parque.', ['Paseo para el parque.', 'Paseo en para parque.', 'Paseo a el parque.']),
        qcm('« J’étudie pour apprendre » :', 'Estudio para aprender.', ['Estudio por aprender.', 'Estudio a aprender.', 'Estudio de aprender.']),
        type('Complète : Trabajo ___ la mañana.', 'por'),
        match('Associe', [['por eso', 'c’est pourquoi'], ['por fin', 'enfin'], ['para siempre', 'pour toujours'], ['por ejemplo', 'par exemple']]),
      ],
    },
  ],
  test: [
    qcm('Subjonctif de « hacer » (yo) :', 'haga', ['hace', 'hazga', 'hiciera']),
    qcm('Subjonctif de « saber » (tú) :', 'sepas', ['sabes', 'sabas', 'supieras']),
    qcm('« Je veux que tu m’appelles » :', 'Quiero que me llames.', ['Quiero que me llamas.', 'Quiero llamarme tú.', 'Quiero que llamar.']),
    qcm('« Je pense que c’est une bonne idée » :', 'Pienso que es una buena idea.', ['Pienso que sea una buena idea.', 'No pienso que es buena idea.', 'Pienso ser una buena idea.']),
    qcm('« Dudo que… » est suivi de…', 'le subjonctif', ['l’indicatif', 'l’infinitif', 'le passé']),
    qcm('Impératif (tú) de « poner » :', 'pon', ['pone', 'ponga', 'pones']),
    qcm('« Ne t’inquiète pas » :', 'No te preocupes.', ['No te preocupas.', 'No preocúpate.', 'No te preocupa.']),
    qcm('« Je t’appelle par téléphone » :', 'Te llamo por teléfono.', ['Te llamo para teléfono.', 'Te llamo en teléfono.', 'Te llamo a teléfono.']),
    match('Associe', [['ser', 'sea'], ['ir', 'vaya'], ['estar', 'esté'], ['tener', 'tenga']]),
    order('Remets dans l’ordre : « Pourvu qu’il fasse beau demain. »', 'Ojalá haga buen tiempo mañana.', 'Pourvu qu’il fasse beau demain.'),
    type('Complète : No creo que ___ razón. (tener, tú)', 'tengas'),
    type('Complète : Salgo ___ Madrid mañana. (destination)', 'para'),
  ],
}

export const esB2: Level = {
  id: 'es-b2',
  index: 4,
  name: 'Niveau 4 — Intermédiaire avancé',
  korean: 'Intermedio alto',
  cefr: 'B2',
  topik: 'DELE B2',
  color: '#862e9c',
  description: 'Exprimer l’hypothèse avec le conditionnel et le subjonctif imparfait, rapporter les paroles des autres, utiliser la voix passive et argumenter avec les bons connecteurs.',
  lessons: [
    {
      id: 'es-b2-1',
      title: 'Le conditionnel',
      subtitle: 'me gustaría · podrías · deberías',
      duration: 25,
      objectives: ['Former le conditionnel', 'Être poli, conseiller, imaginer'],
      sections: [
        {
          title: 'Formation',
          body: 'Infinitif + **-ía, -ías, -ía, -íamos, -íais, -ían**. Mêmes radicaux irréguliers qu’au futur : tendría, haría, podría, saldría, diría, querría.',
          examples: ex(`
            Me gustaría viajar a Perú. | J’aimerais voyager au Pérou.
            ¿Podrías cerrar la ventana? | Pourrais-tu fermer la fenêtre ?
            Deberías descansar más. | Tu devrais te reposer davantage.
            Yo en tu lugar, no lo haría. | À ta place, je ne le ferais pas.
          `),
        },
      ],
      vocab: vocab(`
        me gustaría | j’aimerais
        podría | je pourrais
        debería | je devrais
        en tu lugar | à ta place
        la ventana | la fenêtre
        el consejo | le conseil
        descansar | se reposer
        quizás | peut-être
      `),
      exercises: [
        qcm('Conditionnel de « tener » (yo) :', 'tendría', ['tenería', 'tenría', 'tuviera']),
        qcm('« Tu devrais dormir » :', 'Deberías dormir.', ['Debías dormir.', 'Deberás dormir.', 'Debes de dormir tú.']),
        qcm('« J’aimerais un café » :', 'Me gustaría un café.', ['Me gustará un café.', 'Yo gustaría un café.', 'Me gustaba un café.']),
        type('Conditionnel de « hacer » (yo)', 'haría'),
        order('Remets dans l’ordre : « Pourrais-tu fermer la fenêtre ? »', '¿Podrías cerrar la ventana?', 'Pourrais-tu fermer la fenêtre ?'),
        qcm('« Yo en tu lugar, no lo haría » veut dire…', 'À ta place, je ne le ferais pas.', ['Je ne suis pas à ta place.', 'Je ne l’ai pas fait à ta place.', 'Fais-le à ma place.']),
      ],
    },
    {
      id: 'es-b2-2',
      title: 'L’hypothèse : si + subjonctif imparfait',
      subtitle: 'si tuviera · si pudiera · como si',
      duration: 35,
      objectives: ['Former le subjonctif imparfait', 'Construire une hypothèse irréelle'],
      sections: [
        {
          title: 'Formation',
          body: 'On part de la 3e personne du pluriel de l’indefinido, on enlève **-ron** et on ajoute **-ra, -ras, -ra, -ramos, -rais, -ran**. tuvieron → **tuviera**, fueron → **fuera**, hicieron → **hiciera**.',
        },
        {
          title: 'Si + subj. imparfait → conditionnel',
          examples: ex(`
            Si tuviera dinero, viajaría por el mundo. | Si j’avais de l’argent, je voyagerais autour du monde.
            Si fuera tú, aceptaría. | Si j’étais toi, j’accepterais.
            Habla como si fuera el jefe. | Il parle comme s’il était le chef.
          `),
          tip: 'Jamais de conditionnel après **si** : « si tendría » est une faute classique.',
        },
      ],
      vocab: vocab(`
        el dinero | l’argent
        aceptar | accepter
        el jefe | le chef
        como si | comme si
        el mundo | le monde
        ganar | gagner
        la lotería | la loterie
        mudarse | déménager
      `),
      exercises: [
        qcm('Subjonctif imparfait de « tener » (yo) :', 'tuviera', ['teniera', 'tendría', 'tuve']),
        qcm('« Si j’étais riche… » :', 'Si fuera rico…', ['Si sería rico…', 'Si era rico…', 'Si fuese sería rico…']),
        qcm('La principale après « si + subj. imparfait » est au…', 'conditionnel', ['subjonctif', 'futur', 'présent']),
        type('Subjonctif imparfait de « poder » (yo)', 'pudiera'),
        order('Remets dans l’ordre : « Si j’avais de l’argent, je voyagerais. »', 'Si tuviera dinero, viajaría.', 'Si j’avais de l’argent, je voyagerais.'),
        qcm('« como si fuera el jefe » veut dire…', 'comme s’il était le chef', ['comme il est le chef', 's’il était le chef', 'quand il sera le chef']),
      ],
    },
    {
      id: 'es-b2-3',
      title: 'Le discours rapporté',
      subtitle: 'dijo que · me preguntó si · me pidió que',
      duration: 30,
      objectives: ['Rapporter une affirmation, une question, un ordre', 'Faire la concordance des temps'],
      sections: [
        {
          title: 'La concordance',
          table: table(`
            Direct | Rapporté (passé)
            « Estoy cansado. » | Dijo que estaba cansado.
            « He terminado. » | Dijo que había terminado.
            « Iré mañana. » | Dijo que iría al día siguiente.
            « ¿Vienes? » | Me preguntó si iba.
            « ¡Ven! » | Me pidió que fuera.
          `),
          tip: 'Pensez aussi aux repères : hoy → **aquel día**, mañana → **al día siguiente**, aquí → **allí**.',
        },
      ],
      vocab: vocab(`
        decir que | dire que
        preguntar si | demander si
        pedir que | demander de
        contar | raconter
        explicar | expliquer
        al día siguiente | le lendemain
        aquel día | ce jour-là
        allí | là-bas
      `),
      exercises: [
        qcm('« Estoy cansado » → Dijo que…', 'estaba cansado', ['está cansado', 'estuviera cansado', 'estará cansado']),
        qcm('« Iré mañana » → Dijo que…', 'iría al día siguiente', ['irá mañana', 'fue mañana', 'iba mañana']),
        qcm('« ¡Ven! » → Me pidió que…', 'fuera', ['iba', 'vaya', 'iría']),
        qcm('« ¿Vienes? » → Me preguntó…', 'si iba', ['que iba', 'si vaya', 'qué iba']),
        type('« He terminado » → Dijo que ___ terminado.', 'había'),
        match('Associe', [['al día siguiente', 'le lendemain'], ['aquel día', 'ce jour-là'], ['allí', 'là-bas'], ['contar', 'raconter']]),
      ],
    },
    {
      id: 'es-b2-4',
      title: 'Voix passive et « se » impersonnel',
      subtitle: 'fue construido · se habla español · se venden pisos',
      duration: 25,
      objectives: ['Former la voix passive', 'Utiliser se impersonnel et passif'],
      sections: [
        {
          title: 'La passive avec ser',
          examples: ex(`
            La Alhambra fue construida en el siglo XIII. | L’Alhambra a été construite au XIIIe siècle.
            El libro fue escrito por Cervantes. | Le livre a été écrit par Cervantes.
          `),
          body: 'Plus fréquente à l’écrit (presse, histoire). Le participe s’accorde avec le sujet.',
        },
        {
          title: 'Le « se » très courant à l’oral',
          examples: ex(`
            Aquí se habla español. | Ici, on parle espagnol.
            Se venden pisos. | Appartements à vendre.
            ¿Cómo se dice « merci » en español? | Comment dit-on « merci » en espagnol ?
            Se prohíbe fumar. | Il est interdit de fumer.
          `),
          tip: 'Le verbe s’accorde avec la chose : se **vende** un piso / se **venden** pisos.',
        },
      ],
      vocab: vocab(`
        construir | construire
        el siglo | le siècle
        vender | vendre
        el piso | l’appartement
        alquilar | louer
        prohibir | interdire
        descubrir | découvrir
        publicar | publier
      `),
      exercises: [
        qcm('« La maison a été vendue » :', 'La casa fue vendida.', ['La casa fue vendido.', 'La casa era vendiendo.', 'La casa se fue vendida.']),
        qcm('« Appartements à louer » :', 'Se alquilan pisos.', ['Se alquila pisos.', 'Alquilan se pisos.', 'Son alquilan pisos.']),
        qcm('« Comment dit-on… ? » :', '¿Cómo se dice…?', ['¿Cómo dice se…?', '¿Cómo se dicen…?', '¿Cómo es dicho…?']),
        type('Complète : Aquí se ___ español. (hablar)', 'habla'),
        match('Associe', [['vender', 'vendre'], ['alquilar', 'louer'], ['el siglo', 'le siècle'], ['descubrir', 'découvrir']]),
        order('Remets dans l’ordre : « Le livre a été écrit par Cervantes. »', 'El libro fue escrito por Cervantes.', 'Le livre a été écrit par Cervantes.'),
      ],
    },
    {
      id: 'es-b2-5',
      title: 'Argumenter',
      subtitle: 'en primer lugar · no obstante · por lo tanto',
      duration: 30,
      objectives: ['Structurer une argumentation', 'Nuancer et conclure'],
      sections: [
        {
          title: 'Les connecteurs',
          table: table(`
            Connecteur | Sens
            en primer lugar | premièrement
            además | de plus
            por un lado… por otro | d’un côté… de l’autre
            no obstante | néanmoins
            aunque | bien que, même si
            por lo tanto | par conséquent
            en resumen | en résumé
          `),
        },
        {
          title: 'Mini-argumentation',
          examples: ex(`
            En primer lugar, el teletrabajo ahorra tiempo. | Premièrement, le télétravail fait gagner du temps.
            Además, reduce la contaminación. | De plus, il réduit la pollution.
            No obstante, puede aislar a los empleados. | Néanmoins, il peut isoler les employés.
            Por lo tanto, lo ideal sería un modelo mixto. | Par conséquent, l’idéal serait un modèle mixte.
          `),
        },
      ],
      vocab: vocab(`
        el teletrabajo | le télétravail
        ahorrar | économiser
        la contaminación | la pollution
        aislar | isoler
        la ventaja | l’avantage
        el inconveniente | l’inconvénient
        estar de acuerdo | être d’accord
        en cambio | en revanche
      `),
      exercises: [
        qcm('« Néanmoins » :', 'no obstante', ['además', 'por lo tanto', 'en primer lugar']),
        qcm('« Par conséquent » :', 'por lo tanto', ['sin embargo', 'aunque', 'en cambio']),
        qcm('« el inconveniente » veut dire…', 'l’inconvénient', ['ce qui convient', 'l’avantage', 'l’accord']),
        match('Associe', [['además', 'de plus'], ['en resumen', 'en résumé'], ['en cambio', 'en revanche'], ['la ventaja', 'l’avantage']]),
        type('Traduis : « être d’accord »', 'estar de acuerdo'),
        order('Remets dans l’ordre : « De plus, il réduit la pollution. »', 'Además, reduce la contaminación.', 'De plus, il réduit la pollution.'),
      ],
    },
  ],
  test: [
    qcm('Conditionnel de « salir » (nosotros) :', 'saldríamos', ['saliríamos', 'saldremos', 'salíamos']),
    qcm('« Tu devrais l’appeler » :', 'Deberías llamarlo.', ['Debes llamarlo ayer.', 'Deberás lo llamar.', 'Debías a llamarlo.']),
    qcm('Subjonctif imparfait de « ser » (yo) :', 'fuera', ['sería', 'era', 'sea']),
    qcm('« Si je pouvais, je viendrais » :', 'Si pudiera, vendría.', ['Si podría, vendría.', 'Si puedo, vendría.', 'Si pudiera, vendré.']),
    qcm('« Estoy aquí » → Dijo que…', 'estaba allí', ['está aquí', 'estuvo aquí', 'estará allí']),
    qcm('« ¡Cállate! » → Me pidió que…', 'me callara', ['me callo', 'me callaba', 'me callaría']),
    qcm('« On vend des voitures » :', 'Se venden coches.', ['Se vende coches.', 'Venden se coches.', 'Son vendido coches.']),
    qcm('« Bien que » :', 'aunque', ['además', 'por lo tanto', 'en resumen']),
    match('Associe', [['me gustaría', 'j’aimerais'], ['como si', 'comme si'], ['no obstante', 'néanmoins'], ['al día siguiente', 'le lendemain']]),
    order('Remets dans l’ordre : « Si j’étais toi, j’accepterais. »', 'Si fuera tú, aceptaría.', 'Si j’étais toi, j’accepterais.'),
    type('Conditionnel de « decir » (yo)', 'diría'),
    type('Subjonctif imparfait de « hacer » (yo)', 'hiciera'),
  ],
}

export const esC1: Level = {
  id: 'es-c1',
  index: 5,
  name: 'Niveau 5 — Avancé & courant',
  korean: 'Avanzado',
  cefr: 'C1-C2',
  topik: 'DELE C1 / C2',
  color: '#364fc7',
  description: 'Parler comme un natif : expressions idiomatiques, différences Espagne / Amérique latine, subjonctif avancé, faux amis et stratégies pour réussir le DELE.',
  lessons: [
    {
      id: 'es-c1-1',
      title: 'Expressions idiomatiques',
      subtitle: 'estar en las nubes · tomar el pelo · ser pan comido',
      duration: 25,
      objectives: ['Comprendre 10 expressions très courantes', 'Les placer dans une conversation'],
      sections: [
        {
          title: 'À connaître absolument',
          table: table(`
            Expression | Littéralement | Sens
            estar en las nubes | être dans les nuages | être dans la lune
            tomar el pelo | prendre les cheveux | se moquer de quelqu’un
            ser pan comido | être du pain mangé | être du gâteau
            costar un ojo de la cara | coûter un œil du visage | coûter les yeux de la tête
            meter la pata | mettre la patte | faire une gaffe
            no tener pelos en la lengua | ne pas avoir de poils sur la langue | ne pas mâcher ses mots
            estar hasta las narices | en avoir jusqu’au nez | en avoir ras-le-bol
          `),
        },
        {
          title: 'En situation',
          examples: ex(`
            ¡Me estás tomando el pelo! | Tu te moques de moi !
            El examen fue pan comido. | L’examen, c’était du gâteau.
            Metí la pata con su novia. | J’ai fait une gaffe avec sa copine.
          `),
        },
      ],
      vocab: vocab(`
        la nube | le nuage
        el pelo | les cheveux
        la pata | la patte
        la lengua | la langue
        las narices | le nez (familier)
        el ojo | l’œil
        la cara | le visage
        comido | mangé
      `),
      exercises: [
        qcm('« Meter la pata » veut dire…', 'faire une gaffe', ['marcher vite', 'se blesser', 'danser']),
        qcm('« Costar un ojo de la cara » veut dire…', 'coûter très cher', ['faire mal aux yeux', 'être gratuit', 'être moche']),
        qcm('« Estar en las nubes » veut dire…', 'être dans la lune', ['voyager en avion', 'être très content', 'être malade']),
        match('Associe', [['ser pan comido', 'être facile'], ['tomar el pelo', 'se moquer'], ['estar hasta las narices', 'en avoir marre'], ['no tener pelos en la lengua', 'dire les choses franchement']]),
        type('Complète : ¡Me estás tomando el ___! (tu te moques de moi)', 'pelo'),
        qcm('« El examen fue pan comido » veut dire…', 'L’examen était très facile.', ['L’examen était long.', 'J’ai mangé pendant l’examen.', 'L’examen était raté.']),
      ],
    },
    {
      id: 'es-c1-2',
      title: 'Espagne et Amérique latine',
      subtitle: 'vosotros / ustedes · vos · coche / carro',
      duration: 25,
      objectives: ['Comprendre les grandes variantes', 'Adapter son vocabulaire selon le pays'],
      sections: [
        {
          title: 'La grammaire qui change',
          body: 'En Amérique latine, **vosotros n’existe pas** : on dit **ustedes** à tout le monde. En Argentine, Uruguay et une partie de l’Amérique centrale, on tutoie avec **vos** : vos **tenés**, vos **sos**, vos **hablás**.',
          examples: ex(`
            ¿Vosotros venís? | Vous venez ? (Espagne)
            ¿Ustedes vienen? | Vous venez ? (Amérique latine)
            ¿Vos sos de acá? | Tu es d’ici ? (Argentine)
          `),
        },
        {
          title: 'Le vocabulaire qui change',
          table: table(`
            Espagne | Amérique latine | Sens
            coche | carro / auto | voiture
            móvil | celular | téléphone portable
            ordenador | computadora | ordinateur
            zumo | jugo | jus
            gafas | lentes / anteojos | lunettes
            coger el autobús | tomar el camión / el bus | prendre le bus
          `),
          tip: 'Au Mexique on dit **¿Mande?** pour « Pardon ? », en Espagne **¿Perdona?** ou **¿Cómo?**',
        },
      ],
      vocab: vocab(`
        el coche / el carro | la voiture
        el móvil / el celular | le portable
        el ordenador / la computadora | l’ordinateur
        el zumo / el jugo | le jus
        vos | tu (Argentine)
        ustedes | vous (pluriel)
        acá | ici (Amérique latine)
        ahorita | tout de suite (Mexique)
      `),
      exercises: [
        qcm('En Amérique latine, « vous » (pluriel) se dit…', 'ustedes', ['vosotros', 'vos', 'usted']),
        qcm('En Argentine, « tu es » se dit…', 'vos sos', ['tú eres', 'vos eres', 'vosotros sois']),
        qcm('« celular » veut dire…', 'téléphone portable', ['cellule', 'ordinateur', 'voiture']),
        match('Associe (Espagne → Amérique latine)', [['coche', 'carro'], ['zumo', 'jugo'], ['ordenador', 'computadora'], ['móvil', 'celular']]),
        type('En Argentine, « tu as » se dit : vos ___', 'tenés'),
        qcm('Au Mexique, « ¿Mande? » veut dire…', 'Pardon ? / Vous dites ?', ['Envoyez !', 'Combien ?', 'D’accord']),
      ],
    },
    {
      id: 'es-c1-3',
      title: 'Subjonctif avancé',
      subtitle: 'cuando llegues · aunque llueva · el que quieras',
      duration: 35,
      objectives: ['Subjonctif après cuando, aunque, antes de que', 'Subjonctif dans les relatives'],
      sections: [
        {
          title: 'Temps et concession',
          body: 'Après **cuando, en cuanto, hasta que** : subjonctif si l’action est **future**, indicatif si elle est habituelle ou passée. Après **antes de que, para que, sin que** : toujours subjonctif. **Aunque** + subjonctif = « même si » (hypothèse), + indicatif = « bien que » (fait).',
          examples: ex(`
            Llámame cuando llegues. | Appelle-moi quand tu arriveras.
            Cuando llego, siempre te llamo. | Quand j’arrive, je t’appelle toujours.
            Iré aunque llueva. | J’irai même s’il pleut.
            Aunque llueve, voy a salir. | Bien qu’il pleuve (c’est le cas), je vais sortir.
            Te lo explico para que lo entiendas. | Je te l’explique pour que tu le comprennes.
          `),
        },
        {
          title: 'Dans les relatives',
          examples: ex(`
            Busco un piso que tenga terraza. | Je cherche un appartement qui ait une terrasse. (on ne sait pas s’il existe)
            Tengo un piso que tiene terraza. | J’ai un appartement qui a une terrasse.
            Haz lo que quieras. | Fais ce que tu veux.
          `),
        },
      ],
      vocab: vocab(`
        en cuanto | dès que
        hasta que | jusqu’à ce que
        antes de que | avant que
        para que | pour que
        sin que | sans que
        aunque | même si, bien que
        la terraza | la terrasse
        lo que quieras | ce que tu veux
      `),
      exercises: [
        qcm('« Appelle-moi quand tu arriveras » :', 'Llámame cuando llegues.', ['Llámame cuando llegarás.', 'Llámame cuando llegas.', 'Llámame cuando llegaras.']),
        qcm('« J’irai même s’il pleut » :', 'Iré aunque llueva.', ['Iré aunque llueve.', 'Iré aunque lloverá.', 'Iré si llueva.']),
        qcm('Après « antes de que », on met…', 'toujours le subjonctif', ['toujours l’indicatif', 'l’infinitif', 'le futur']),
        qcm('« Busco un piso que tenga terraza » : pourquoi le subjonctif ?', 'L’appartement n’est pas identifié.', ['C’est une obligation.', 'C’est au passé.', 'C’est une question.']),
        type('Complète : Haz lo que ___. (querer, tú)', 'quieras'),
        order('Remets dans l’ordre : « Je te l’explique pour que tu le comprennes. »', 'Te lo explico para que lo entiendas.', 'Je te l’explique pour que tu le comprennes.'),
      ],
    },
    {
      id: 'es-c1-4',
      title: 'Les faux amis',
      subtitle: 'embarazada · constipado · éxito',
      duration: 20,
      objectives: ['Éviter les pièges français / espagnol les plus fréquents'],
      sections: [
        {
          title: 'Les pièges classiques',
          table: table(`
            Espagnol | Sens réel | À ne pas confondre avec
            embarazada | enceinte | embarrassée (avergonzada)
            constipado | enrhumé | constipé (estreñido)
            éxito | succès | sortie (salida)
            largo | long | large (ancho)
            salir | sortir | salir (ensuciar)
            la carpeta | la chemise, le classeur | la carpette (alfombra)
            recordar | se souvenir | enregistrer (grabar)
            molestar | déranger | molester (maltratar)
          `),
          tip: 'L’erreur la plus célèbre : « Estoy muy embarazada » pour dire qu’on est gêné… elle annonce une grossesse !',
        },
      ],
      vocab: vocab(`
        embarazada | enceinte
        avergonzado | gêné, embarrassé
        constipado | enrhumé
        el éxito | le succès
        la salida | la sortie
        largo | long
        ancho | large
        molestar | déranger
      `),
      exercises: [
        qcm('« Estoy constipado » veut dire…', 'Je suis enrhumé.', ['Je suis constipé.', 'Je suis content.', 'Je suis coincé.']),
        qcm('« Sortie » (d’un bâtiment) se dit…', 'la salida', ['el éxito', 'la sortida', 'el salido']),
        qcm('« ¿Te molesta si abro la ventana? » veut dire…', 'Ça te dérange si j’ouvre la fenêtre ?', ['Ça te fait mal si j’ouvre ?', 'Tu m’en veux ?', 'Tu as froid ?']),
        match('Associe', [['largo', 'long'], ['ancho', 'large'], ['recordar', 'se souvenir'], ['embarazada', 'enceinte']]),
        type('Comment dit-on « gêné, embarrassé » (masculin) ?', 'avergonzado'),
        qcm('« La película fue un éxito » veut dire…', 'Le film a été un succès.', ['Le film est sorti.', 'Le film est fini.', 'Le film a échoué.']),
      ],
    },
    {
      id: 'es-c1-5',
      title: 'Réussir le DELE C1',
      subtitle: 'comprensión · expresión · interacción',
      duration: 30,
      objectives: ['Connaître les épreuves', 'Utiliser les formules de l’écrit formel'],
      sections: [
        {
          title: 'Les épreuves',
          body: 'Le DELE C1 comporte 4 épreuves : **compréhension écrite** et **usage de la langue**, **compréhension orale**, **expression et interaction écrites** (2 tâches), **expression et interaction orales** (présentation + débat). Il faut 60 % dans chaque groupe.',
        },
        {
          title: 'Formules pour l’écrit formel',
          examples: ex(`
            Estimado señor / Estimada señora: | Monsieur / Madame,
            Me dirijo a usted para… | Je m’adresse à vous afin de…
            Cabe destacar que… | Il convient de souligner que…
            Desde mi punto de vista… | De mon point de vue…
            Quedo a la espera de su respuesta. | Dans l’attente de votre réponse.
            Atentamente, | Cordialement,
          `),
          tip: 'À l’oral, gagne du temps avec des amorces naturelles : « Pues, a ver… », « Lo que quiero decir es que… », « Es una buena pregunta… ».',
        },
      ],
      vocab: vocab(`
        estimado / estimada | cher / chère (formel)
        atentamente | cordialement
        dirigirse a | s’adresser à
        cabe destacar | il convient de souligner
        el punto de vista | le point de vue
        la respuesta | la réponse
        a ver | voyons
        la prueba | l’épreuve
      `),
      exercises: [
        qcm('Formule d’ouverture d’une lettre formelle :', 'Estimado señor:', ['¡Hola, señor!', 'Querido amigo:', 'Oye, señor:']),
        qcm('« Atentamente » correspond à…', 'Cordialement', ['Attentivement, je lis', 'Bisous', 'À bientôt']),
        qcm('« Cabe destacar que… » veut dire…', 'Il convient de souligner que…', ['Il faut couper que…', 'Il est interdit de…', 'On peut douter que…']),
        match('Associe', [['el punto de vista', 'le point de vue'], ['la respuesta', 'la réponse'], ['la prueba', 'l’épreuve'], ['a ver', 'voyons']]),
        type('Complète : Quedo a la espera de su ___. (réponse)', 'respuesta'),
        order('Remets dans l’ordre : « Je m’adresse à vous pour… »', 'Me dirijo a usted para…', 'Je m’adresse à vous pour…'),
      ],
    },
  ],
  test: [
    qcm('« Faire une gaffe » :', 'meter la pata', ['tomar el pelo', 'estar en las nubes', 'ser pan comido']),
    qcm('« No tener pelos en la lengua » veut dire…', 'ne pas mâcher ses mots', ['être chauve', 'ne rien dire', 'parler plusieurs langues']),
    qcm('En Argentine, « tu parles » :', 'vos hablás', ['tú hablas', 'vos hablas', 'vosotros habláis']),
    qcm('« ordinateur » en Amérique latine :', 'computadora', ['ordenador', 'computador de mesa', 'celular']),
    qcm('« Dès que tu sauras, dis-le-moi » :', 'En cuanto lo sepas, dímelo.', ['En cuanto lo sabes, dímelo.', 'En cuanto lo sabrás, dímelo.', 'En cuanto sepas, dílo.']),
    qcm('« Aunque llueva » veut dire…', 'même s’il pleut', ['bien qu’il pleuve (c’est le cas)', 'parce qu’il pleut', 'quand il pleut']),
    qcm('« Estoy embarazada » veut dire…', 'Je suis enceinte.', ['Je suis gênée.', 'Je suis embarrassée.', 'Je suis fatiguée.']),
    qcm('« largo » veut dire…', 'long', ['large', 'lent', 'lourd']),
    match('Associe', [['éxito', 'succès'], ['salida', 'sortie'], ['constipado', 'enrhumé'], ['molestar', 'déranger']]),
    order('Remets dans l’ordre : « Appelle-moi quand tu arriveras. »', 'Llámame cuando llegues.', 'Appelle-moi quand tu arriveras.'),
    type('Complète : Te lo explico para que lo ___. (entender, tú)', 'entiendas'),
    type('Formule de clôture formelle (« Cordialement »)', 'Atentamente'),
  ],
}
