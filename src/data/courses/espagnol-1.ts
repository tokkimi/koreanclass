import type { Level } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

export const es0: Level = {
  id: 'es-0',
  index: 0,
  name: 'Niveau 0 — Premiers pas',
  korean: 'Primeros pasos',
  cefr: 'Pré-A1',
  topik: 'Avant le DELE A1',
  color: '#e8590c',
  description: 'Prononcer l’espagnol, saluer, te présenter, compter jusqu’à 20 et comprendre le genre des mots. Tout ce qu’il faut pour tes premières phrases.',
  lessons: [
    {
      id: 'es-0-1',
      title: 'L’alphabet et les sons',
      subtitle: 'a e i o u · ñ · j · ll · rr',
      duration: 25,
      objectives: ['Prononcer les 5 voyelles', 'Maîtriser ñ, j, ll, rr', 'Savoir où placer l’accent tonique'],
      sections: [
        {
          title: 'Une langue qui se lit comme elle s’écrit',
          body: 'En espagnol, **toutes les lettres se prononcent** (sauf le h, toujours muet). Les 5 voyelles sont pures et courtes : **u** se dit « ou », **e** se dit « é ».',
          table: table(`
            Lettre | Son | Exemple
            ñ | « gn » de montagne | España
            j | « r » raclé du fond de la gorge | jamón
            ll / y | « y » de yaourt | llamar, yo
            rr | r roulé fort | perro
            c + e/i, z | « th » anglais (en Espagne) | cena, zapato
            h | muet | hola
            v | comme b | vino
          `),
        },
        {
          title: 'L’accent tonique',
          body: 'Mot terminé par **voyelle, n ou s** : accent sur l’avant-dernière syllabe (ca**sa**, **ha**blan). Sinon : sur la dernière (ha**blar**, ciu**dad**). Un **accent écrit** (á, é, í, ó, ú) signale une exception : ca**fé**, **mú**sica.',
          examples: ex(`
            casa | maison
            ciudad | ville
            café | café
            música | musique
          `),
        },
      ],
      vocab: vocab(`
        hola | bonjour, salut
        España | Espagne
        jamón | jambon
        perro | chien
        pero | mais
        llamar | appeler
        vino | vin
        música | musique
      `),
      exercises: [
        qcm('Comment se prononce le « j » de « jamón » ?', 'comme un r raclé de la gorge', ['comme le j français', 'comme un y', 'il est muet']),
        qcm('Quelle lettre est toujours muette ?', 'h', ['j', 'v', 'ñ']),
        qcm('« perro » (chien) et « pero » (mais) se distinguent par…', 'le r roulé fort', ['l’accent écrit', 'le e', 'rien du tout']),
        qcm('Où tombe l’accent dans « ciudad » ?', 'sur la dernière syllabe', ['sur la première', 'sur l’avant-dernière', 'nulle part']),
        match('Associe', [['perro', 'chien'], ['casa', 'maison'], ['vino', 'vin'], ['ciudad', 'ville']]),
        type('Écris le mot espagnol pour « Espagne »', 'España'),
      ],
    },
    {
      id: 'es-0-2',
      title: 'Saluer et prendre congé',
      subtitle: '¡Hola! · Buenos días · ¿Qué tal? · Adiós',
      duration: 20,
      objectives: ['Saluer selon le moment', 'Demander comment ça va', 'Prendre congé'],
      sections: [
        {
          title: 'Les salutations',
          table: table(`
            Espagnol | Sens | Quand
            ¡Hola! | Salut / bonjour | toujours
            Buenos días | Bonjour | le matin
            Buenas tardes | Bon après-midi | l’après-midi
            Buenas noches | Bonsoir / bonne nuit | le soir
            Adiós | Au revoir | départ
            Hasta luego | À plus tard | départ
          `),
          tip: 'En espagnol, les questions et exclamations s’ouvrent avec un signe à l’envers : **¿…?** et **¡…!**',
        },
        {
          title: 'Comment ça va ?',
          examples: ex(`
            ¿Qué tal? | Ça va ?
            ¿Cómo estás? | Comment vas-tu ?
            Muy bien, gracias. ¿Y tú? | Très bien, merci. Et toi ?
            Más o menos. | Comme ci comme ça.
            Encantado / Encantada. | Enchanté / Enchantée.
          `),
        },
      ],
      vocab: vocab(`
        buenos días | bonjour (matin)
        buenas tardes | bon après-midi
        buenas noches | bonsoir, bonne nuit
        gracias | merci
        por favor | s’il te plaît / s’il vous plaît
        de nada | de rien
        adiós | au revoir
        hasta luego | à plus tard
      `),
      dialogue: dlg(`
        Lucía: ¡Hola! ¿Qué tal? | Salut ! Ça va ?
        Marc: Muy bien, gracias. ¿Y tú? | Très bien, merci. Et toi ?
        Lucía: Bien también. ¡Hasta luego! | Bien aussi. À plus !
        Marc: ¡Adiós! | Au revoir !
      `),
      exercises: [
        qcm('À 21 h, tu dis…', 'Buenas noches', ['Buenos días', 'Buenas tardes', 'Hasta mañana días']),
        qcm('Comment dit-on « de rien » ?', 'De nada', ['Por favor', 'Gracias', 'Más o menos']),
        qcm('« Más o menos » veut dire…', 'comme ci comme ça', ['plus ou moins cher', 'très bien', 'à plus tard']),
        order('Remets dans l’ordre : « Très bien, merci. »', 'Muy bien, gracias.', 'Très bien, merci.'),
        match('Associe', [['gracias', 'merci'], ['por favor', 's’il vous plaît'], ['adiós', 'au revoir'], ['hola', 'salut']]),
        type('Traduis : « à plus tard »', 'hasta luego'),
      ],
    },
    {
      id: 'es-0-3',
      title: 'Se présenter',
      subtitle: 'Me llamo… · Soy de… · Tengo… años',
      duration: 25,
      objectives: ['Dire son nom, son origine, son âge', 'Poser les mêmes questions'],
      sections: [
        {
          title: 'Les phrases clés',
          examples: ex(`
            ¿Cómo te llamas? | Comment t’appelles-tu ?
            Me llamo Marc. | Je m’appelle Marc.
            ¿De dónde eres? | D’où viens-tu ?
            Soy de Francia. Soy francés. | Je viens de France. Je suis français.
            ¿Cuántos años tienes? | Quel âge as-tu ?
            Tengo veinte años. | J’ai vingt ans.
          `),
          tip: 'L’âge se dit avec **tener** (avoir) comme en français : tengo 20 años.',
        },
        {
          title: 'Nationalités : masculin / féminin',
          table: table(`
            Masculin | Féminin | Sens
            francés | francesa | français(e)
            español | española | espagnol(e)
            belga | belga | belge
            mexicano | mexicana | mexicain(e)
          `),
        },
      ],
      vocab: vocab(`
        me llamo | je m’appelle
        soy | je suis
        de dónde | d’où
        tengo… años | j’ai… ans
        francés / francesa | français(e)
        Francia | France
        estudiante | étudiant(e)
        encantado / encantada | enchanté(e)
      `),
      dialogue: dlg(`
        Pablo: Hola, me llamo Pablo. ¿Y tú? | Salut, je m’appelle Pablo. Et toi ?
        Léa: Me llamo Léa. Soy de París. | Je m’appelle Léa. Je viens de Paris.
        Pablo: ¡Encantado! ¿Eres estudiante? | Enchanté ! Tu es étudiante ?
        Léa: Sí, tengo diecinueve años. | Oui, j’ai dix-neuf ans.
      `),
      exercises: [
        qcm('Comment dit-on « je m’appelle » ?', 'me llamo', ['yo llamo', 'mi nombre llamo', 'soy llamo']),
        qcm('Pour l’âge, on utilise le verbe…', 'tener', ['ser', 'estar', 'hacer']),
        qcm('Le féminin de « francés » est…', 'francesa', ['francésa', 'francesita', 'frances']),
        order('Remets dans l’ordre : « D’où viens-tu ? »', '¿De dónde eres?', 'D’où viens-tu ?'),
        type('Complète : ___ veinte años. (j’ai)', 'Tengo'),
        match('Associe', [['soy', 'je suis'], ['tengo', 'j’ai'], ['me llamo', 'je m’appelle'], ['eres', 'tu es']]),
      ],
    },
    {
      id: 'es-0-4',
      title: 'Les nombres de 0 à 20',
      subtitle: 'cero · uno · dos · tres …',
      duration: 20,
      objectives: ['Compter de 0 à 20', 'Donner un numéro de téléphone'],
      sections: [
        {
          title: 'De 0 à 20',
          table: table(`
            Espagnol | Nombre
            cero | 0
            uno | 1
            dos | 2
            tres | 3
            cuatro | 4
            cinco | 5
            seis | 6
            siete | 7
            ocho | 8
            nueve | 9
            diez | 10
            once | 11
            doce | 12
            quince | 15
            dieciséis | 16
            veinte | 20
          `),
          tip: 'De 16 à 19 : **dieci** + unité, en un seul mot : dieciséis, diecisiete, dieciocho, diecinueve.',
        },
        {
          title: 'En contexte',
          examples: ex(`
            Mi número es el seis, uno, dos… | Mon numéro, c’est le 6, 1, 2…
            Tengo dos hermanos. | J’ai deux frères et sœurs.
            Son quince euros. | Ça fait quinze euros.
          `),
        },
      ],
      vocab: vocab(`
        uno | un
        dos | deux
        tres | trois
        cinco | cinq
        diez | dix
        quince | quinze
        veinte | vingt
        número | numéro
      `),
      exercises: [
        qcm('Comment dit-on 7 ?', 'siete', ['seis', 'nueve', 'diez']),
        qcm('Comment dit-on 12 ?', 'doce', ['dos', 'diez y dos', 'doze']),
        qcm('« dieciocho » =', '18', ['16', '19', '8']),
        match('Associe', [['cuatro', '4'], ['ocho', '8'], ['once', '11'], ['veinte', '20']]),
        type('Écris en lettres : 5', 'cinco'),
        type('Écris en lettres : 16', 'dieciséis'),
      ],
    },
    {
      id: 'es-0-5',
      title: 'Genre et articles',
      subtitle: 'el · la · los · las · un · una',
      duration: 25,
      objectives: ['Reconnaître masculin et féminin', 'Utiliser les articles', 'Former le pluriel'],
      sections: [
        {
          title: 'Masculin en -o, féminin en -a',
          body: 'La plupart des mots en **-o** sont masculins (el libro), ceux en **-a** féminins (la casa). Exceptions fréquentes : **el día**, **el problema**, **la mano**.',
          table: table(`
            Article | Masculin | Féminin
            défini singulier | el chico | la chica
            défini pluriel | los chicos | las chicas
            indéfini singulier | un libro | una mesa
            indéfini pluriel | unos libros | unas mesas
          `),
        },
        {
          title: 'Le pluriel',
          body: 'Après une voyelle : **+s** (casa → casas). Après une consonne : **+es** (ciudad → ciudades). Le z devient c : lápiz → **lápices**.',
        },
      ],
      vocab: vocab(`
        el libro | le livre
        la casa | la maison
        el día | le jour
        la mano | la main
        el problema | le problème
        la ciudad | la ville
        el chico / la chica | le garçon / la fille
        la mesa | la table
      `),
      exercises: [
        qcm('Quel article pour « día » ?', 'el', ['la', 'los', 'una']),
        qcm('Quel article pour « mano » ?', 'la', ['el', 'lo', 'un']),
        qcm('Pluriel de « ciudad » ?', 'ciudades', ['ciudads', 'ciudadas', 'ciudad']),
        qcm('Pluriel de « lápiz » ?', 'lápices', ['lápizes', 'lápizs', 'lápiz']),
        type('Complète avec l’article défini : ___ casas', 'las'),
        match('Associe', [['el libro', 'le livre'], ['la mesa', 'la table'], ['el problema', 'le problème'], ['la mano', 'la main']]),
      ],
    },
  ],
  test: [
    qcm('Comment se prononce « ll » dans « llamar » ?', 'comme un y', ['comme un l double', 'comme un j', 'il est muet']),
    qcm('Le matin, tu dis…', 'Buenos días', ['Buenas noches', 'Buenas tardes', 'Hasta luego']),
    qcm('« ¿Cómo te llamas? » veut dire…', 'Comment t’appelles-tu ?', ['Comment vas-tu ?', 'D’où viens-tu ?', 'Quel âge as-tu ?']),
    qcm('« Tengo veinte años » veut dire…', 'J’ai vingt ans.', ['Je suis vingt ans.', 'J’ai deux ans.', 'Il a vingt ans.']),
    qcm('Comment dit-on 15 ?', 'quince', ['cinco', 'cincuenta', 'diez y cinco']),
    qcm('Quel article pour « problema » ?', 'el', ['la', 'una', 'las']),
    qcm('Le féminin de « español » est…', 'española', ['españala', 'españolo', 'español']),
    match('Associe', [['gracias', 'merci'], ['de nada', 'de rien'], ['por favor', 's’il te plaît'], ['adiós', 'au revoir']]),
    match('Associe', [['tres', '3'], ['seis', '6'], ['nueve', '9'], ['doce', '12']]),
    order('Remets dans l’ordre : « Je m’appelle Léa. »', 'Me llamo Léa.', 'Je m’appelle Léa.'),
    type('Écris en lettres : 10', 'diez'),
    type('Pluriel de « la casa »', 'las casas'),
  ],
}

export const esA1: Level = {
  id: 'es-a1',
  index: 1,
  name: 'Niveau 1 — Débutant',
  korean: 'Principiante',
  cefr: 'A1',
  topik: 'DELE A1',
  color: '#d9480f',
  description: 'Distinguer ser et estar, conjuguer au présent, utiliser les grands verbes irréguliers, dire ce que tu aimes avec gustar et raconter ta journée.',
  lessons: [
    {
      id: 'es-a1-1',
      title: 'Ser et estar',
      subtitle: 'soy · estoy · es · está',
      duration: 30,
      objectives: ['Conjuguer ser et estar', 'Choisir le bon verbe « être »'],
      sections: [
        {
          title: 'Deux verbes « être »',
          table: table(`
            Pronom | ser | estar
            yo | soy | estoy
            tú | eres | estás
            él / ella / usted | es | está
            nosotros | somos | estamos
            vosotros | sois | estáis
            ellos / ustedes | son | están
          `),
        },
        {
          title: 'Quand utiliser lequel ?',
          body: '**Ser** : identité, nationalité, métier, caractère, heure — ce qui **définit**. **Estar** : lieu, état passager, humeur — ce qui **est situé ou change**.',
          examples: ex(`
            Soy profesora. | Je suis professeure.
            Estoy cansada. | Je suis fatiguée.
            Madrid está en España. | Madrid est en Espagne.
            Es muy simpático. | Il est très sympathique.
            Hoy estoy contento. | Aujourd’hui je suis content.
          `),
          tip: 'Piège : « **es** aburrido » = il est ennuyeux ; « **está** aburrido » = il s’ennuie.',
        },
      ],
      vocab: vocab(`
        cansado / cansada | fatigué(e)
        contento / contenta | content(e)
        simpático | sympathique
        profesor / profesora | professeur
        enfermo | malade
        aburrido | ennuyeux / qui s’ennuie
        aquí | ici
        hoy | aujourd’hui
      `),
      exercises: [
        qcm('« Je suis français » :', 'Soy francés.', ['Estoy francés.', 'Es francés.', 'Estoy de francés.']),
        qcm('« Je suis fatigué » :', 'Estoy cansado.', ['Soy cansado.', 'Es cansado.', 'Tengo cansado.']),
        qcm('« Madrid est en Espagne » :', 'Madrid está en España.', ['Madrid es en España.', 'Madrid son en España.', 'Madrid estás en España.']),
        qcm('« Está aburrido » veut dire…', 'il s’ennuie', ['il est ennuyeux', 'il est fatigué', 'il est ici']),
        type('Complète : Nosotros ___ estudiantes. (ser)', 'somos'),
        type('Complète : ¿Dónde ___ tú? (estar)', 'estás'),
      ],
    },
    {
      id: 'es-a1-2',
      title: 'Le présent des verbes réguliers',
      subtitle: 'hablar · comer · vivir',
      duration: 30,
      objectives: ['Conjuguer les verbes en -ar, -er, -ir', 'Se passer du pronom sujet'],
      sections: [
        {
          title: 'Trois groupes',
          table: table(`
            Pronom | hablar (parler) | comer (manger) | vivir (vivre)
            yo | hablo | como | vivo
            tú | hablas | comes | vives
            él / ella | habla | come | vive
            nosotros | hablamos | comemos | vivimos
            vosotros | habláis | coméis | vivís
            ellos | hablan | comen | viven
          `),
          tip: 'On omet souvent le pronom : la terminaison suffit. **Hablo** español = je parle espagnol.',
        },
        {
          title: 'En contexte',
          examples: ex(`
            Hablo un poco de español. | Je parle un peu espagnol.
            ¿Dónde vives? | Où habites-tu ?
            Vivimos en Lyon. | Nous habitons à Lyon.
            Comen a las dos. | Ils déjeunent à deux heures.
          `),
        },
      ],
      vocab: vocab(`
        hablar | parler
        comer | manger
        vivir | vivre, habiter
        trabajar | travailler
        estudiar | étudier
        beber | boire
        escribir | écrire
        un poco | un peu
      `),
      dialogue: dlg(`
        Ana: ¿Hablas español? | Tu parles espagnol ?
        Tom: Sí, un poco. Estudio en una academia. | Oui, un peu. J’étudie dans une école.
        Ana: ¿Y dónde trabajas? | Et où travailles-tu ?
        Tom: Trabajo en un restaurante. | Je travaille dans un restaurant.
      `),
      exercises: [
        qcm('« nosotros » + comer :', 'comemos', ['comamos', 'comimos', 'comen']),
        qcm('« tú » + vivir :', 'vives', ['vivas', 'vivís', 'vive']),
        qcm('« ellos » + trabajar :', 'trabajan', ['trabajen', 'trabajamos', 'trabajas']),
        order('Remets dans l’ordre : « Nous habitons à Lyon. »', 'Vivimos en Lyon.', 'Nous habitons à Lyon.'),
        type('Conjugue : yo ___ (hablar)', 'hablo'),
        match('Associe', [['beber', 'boire'], ['escribir', 'écrire'], ['estudiar', 'étudier'], ['trabajar', 'travailler']]),
      ],
    },
    {
      id: 'es-a1-3',
      title: 'Les verbes irréguliers essentiels',
      subtitle: 'tener · ir · hacer · querer · poder',
      duration: 35,
      objectives: ['Conjuguer 5 verbes irréguliers indispensables', 'Comprendre les changements e → ie, o → ue'],
      sections: [
        {
          title: 'Les incontournables',
          table: table(`
            Pronom | tener | ir | hacer
            yo | tengo | voy | hago
            tú | tienes | vas | haces
            él / ella | tiene | va | hace
            nosotros | tenemos | vamos | hacemos
            ellos | tienen | van | hacen
          `),
        },
        {
          title: 'Verbes à diphtongue',
          body: 'Certains verbes changent de voyelle **sauf avec nosotros et vosotros** : querer → **quiero**, poder → **puedo**, dormir → **duermo**.',
          examples: ex(`
            Quiero un café, por favor. | Je voudrais un café, s’il vous plaît.
            ¿Puedes ayudarme? | Tu peux m’aider ?
            Queremos ir a la playa. | Nous voulons aller à la plage.
            Tengo que trabajar. | Je dois travailler.
          `),
          tip: '**Tener que** + infinitif = devoir (obligation).',
        },
      ],
      vocab: vocab(`
        tener | avoir
        ir | aller
        hacer | faire
        querer | vouloir, aimer
        poder | pouvoir
        dormir | dormir
        la playa | la plage
        tener que | devoir
      `),
      exercises: [
        qcm('« yo » + ir :', 'voy', ['vo', 'iro', 'va']),
        qcm('« yo » + hacer :', 'hago', ['haco', 'hazo', 'hace']),
        qcm('« tú » + querer :', 'quieres', ['queres', 'quieras', 'quiere']),
        qcm('« nosotros » + poder :', 'podemos', ['puedemos', 'pueden', 'podamos']),
        type('Conjugue : yo ___ (tener)', 'tengo'),
        order('Remets dans l’ordre : « Je dois travailler. »', 'Tengo que trabajar.', 'Je dois travailler.'),
      ],
    },
    {
      id: 'es-a1-4',
      title: 'Dire ce qu’on aime : gustar',
      subtitle: 'me gusta · me gustan · a mí también',
      duration: 25,
      objectives: ['Utiliser gustar', 'Réagir : moi aussi / moi non plus'],
      sections: [
        {
          title: 'Une construction à l’envers',
          body: 'Gustar se construit comme « **plaire** » : la chose aimée est le sujet. **Me gusta** + singulier / infinitif, **me gustan** + pluriel.',
          table: table(`
            Pronom | Espagnol | Sens
            me | me gusta el chocolate | j’aime le chocolat
            te | te gustan los perros | tu aimes les chiens
            le | le gusta bailar | il / elle aime danser
            nos | nos gusta viajar | nous aimons voyager
            les | les gustan las películas | ils aiment les films
          `),
        },
        {
          title: 'Réagir',
          examples: ex(`
            Me encanta la música. | J’adore la musique.
            No me gusta nada. | Je n’aime pas du tout.
            A mí también. | Moi aussi.
            A mí tampoco. | Moi non plus.
          `),
        },
      ],
      vocab: vocab(`
        gustar | plaire, aimer
        encantar | adorer
        bailar | danser
        viajar | voyager
        leer | lire
        la película | le film
        también | aussi
        tampoco | non plus
      `),
      dialogue: dlg(`
        Sara: ¿Te gusta el cine? | Tu aimes le cinéma ?
        Hugo: Sí, me encanta. Y me gustan mucho las películas españolas. | Oui, j’adore. Et j’aime beaucoup les films espagnols.
        Sara: ¡A mí también! | Moi aussi !
      `),
      exercises: [
        qcm('« J’aime les chiens » :', 'Me gustan los perros.', ['Me gusta los perros.', 'Yo gusto los perros.', 'Me gustan el perro.']),
        qcm('« Nous aimons voyager » :', 'Nos gusta viajar.', ['Nos gustan viajar.', 'Nosotros gustamos viajar.', 'Nos gusta viajamos.']),
        qcm('Réponse à « No me gusta el café » si tu es d’accord :', 'A mí tampoco.', ['A mí también.', 'Yo también.', 'Sí, me gusta.']),
        type('Complète : Me ___ las películas. (gustar)', 'gustan'),
        match('Associe', [['bailar', 'danser'], ['leer', 'lire'], ['viajar', 'voyager'], ['encantar', 'adorer']]),
        order('Remets dans l’ordre : « J’adore la musique. »', 'Me encanta la música.', 'J’adore la musique.'),
      ],
    },
    {
      id: 'es-a1-5',
      title: 'L’heure et la routine',
      subtitle: '¿Qué hora es? · me levanto · me acuesto',
      duration: 30,
      objectives: ['Dire l’heure', 'Utiliser les verbes pronominaux', 'Raconter sa journée'],
      sections: [
        {
          title: 'L’heure',
          examples: ex(`
            ¿Qué hora es? | Quelle heure est-il ?
            Es la una. | Il est une heure.
            Son las tres y media. | Il est trois heures et demie.
            Son las cinco menos cuarto. | Il est cinq heures moins le quart.
            A las ocho. | À huit heures.
          `),
        },
        {
          title: 'Les verbes pronominaux',
          body: 'Comme en français, certains verbes ont un pronom : **levantarse** (se lever) → **me** levanto, **te** levantas, **se** levanta, **nos** levantamos, **se** levantan.',
          examples: ex(`
            Me levanto a las siete. | Je me lève à sept heures.
            Me ducho y desayuno. | Je me douche et je prends le petit-déjeuner.
            Me acuesto a las once. | Je me couche à onze heures.
          `),
        },
      ],
      vocab: vocab(`
        levantarse | se lever
        ducharse | se doucher
        acostarse | se coucher
        desayunar | prendre le petit-déjeuner
        cenar | dîner
        lunes | lundi
        viernes | vendredi
        el fin de semana | le week-end
      `),
      exercises: [
        qcm('« Il est une heure » :', 'Es la una.', ['Son la una.', 'Es las una.', 'Son las uno.']),
        qcm('« Son las tres y media » =', '3 h 30', ['3 h 15', '2 h 30', '3 h 45']),
        qcm('« Je me couche » :', 'Me acuesto.', ['Me acosto.', 'Acuesto.', 'Me acostamos.']),
        type('Complète : ___ levanto a las siete.', 'Me'),
        match('Associe', [['lunes', 'lundi'], ['viernes', 'vendredi'], ['cenar', 'dîner'], ['desayunar', 'petit-déjeuner']]),
        order('Remets dans l’ordre : « Je me lève à sept heures. »', 'Me levanto a las siete.', 'Je me lève à sept heures.'),
      ],
    },
  ],
  test: [
    qcm('« Je suis malade » :', 'Estoy enfermo.', ['Soy enfermo.', 'Tengo enfermo.', 'Es enfermo.']),
    qcm('« Elle est médecin » :', 'Es médica.', ['Está médica.', 'Estás médica.', 'Soy médica.']),
    qcm('« vosotros » + hablar :', 'habláis', ['hablan', 'hablamos', 'hablás']),
    qcm('« yo » + poder :', 'puedo', ['podo', 'pudo', 'puede']),
    qcm('« Tengo que estudiar » veut dire…', 'Je dois étudier.', ['J’ai étudié.', 'Je veux étudier.', 'J’aime étudier.']),
    qcm('« Il aime les chats » :', 'Le gustan los gatos.', ['Le gusta los gatos.', 'Él gusta los gatos.', 'Se gustan los gatos.']),
    qcm('« Son las diez menos cuarto » =', '9 h 45', ['10 h 15', '10 h 45', '9 h 15']),
    match('Associe', [['ir', 'aller'], ['hacer', 'faire'], ['querer', 'vouloir'], ['tener', 'avoir']]),
    order('Remets dans l’ordre : « Nous voulons aller à la plage. »', 'Queremos ir a la playa.', 'Nous voulons aller à la plage.'),
    type('Conjugue : ellos ___ (vivir)', 'viven'),
    type('Conjugue : yo ___ (ir)', 'voy'),
    type('Traduis : « moi non plus »', 'a mí tampoco'),
  ],
}

export const esA2: Level = {
  id: 'es-a2',
  index: 2,
  name: 'Niveau 2 — Élémentaire',
  korean: 'Elemental',
  cefr: 'A2',
  topik: 'DELE A2',
  color: '#c92a2a',
  description: 'Raconter au passé avec les trois temps (perfecto, indefinido, imperfecto), parler de tes projets et remplacer les noms par des pronoms.',
  lessons: [
    {
      id: 'es-a2-1',
      title: 'Le passé composé (pretérito perfecto)',
      subtitle: 'he comido · hemos viajado',
      duration: 30,
      objectives: ['Former le pretérito perfecto', 'L’utiliser avec hoy, esta semana, ya, nunca'],
      sections: [
        {
          title: 'haber + participe',
          table: table(`
            Pronom | haber | + participe
            yo | he | hablado
            tú | has | comido
            él / ella | ha | vivido
            nosotros | hemos | viajado
            ellos | han | terminado
          `),
          body: 'Participe : **-ar → -ado**, **-er / -ir → -ido**. Irréguliers : hacer → **hecho**, ver → **visto**, escribir → **escrito**, decir → **dicho**, poner → **puesto**, volver → **vuelto**.',
        },
        {
          title: 'Quand l’utiliser',
          body: 'Pour une action passée dans une période **pas encore terminée** ou reliée au présent : hoy, esta mañana, este año, ya (déjà), todavía no (pas encore), nunca (jamais).',
          examples: ex(`
            Hoy he comido paella. | Aujourd’hui, j’ai mangé une paella.
            ¿Has estado en México? | Tu es déjà allé au Mexique ?
            Todavía no he terminado. | Je n’ai pas encore fini.
          `),
        },
      ],
      vocab: vocab(`
        ya | déjà
        todavía no | pas encore
        nunca | jamais
        esta semana | cette semaine
        hecho | fait (participe)
        visto | vu
        escrito | écrit
        dicho | dit
      `),
      exercises: [
        qcm('« Nous avons voyagé » :', 'Hemos viajado.', ['Habemos viajado.', 'Hemos viajando.', 'Han viajado.']),
        qcm('Participe de « hacer » :', 'hecho', ['hacido', 'hacho', 'hizo']),
        qcm('Participe de « ver » :', 'visto', ['vido', 'veído', 'viste']),
        qcm('« Todavía no he terminado » veut dire…', 'Je n’ai pas encore fini.', ['J’ai déjà fini.', 'Je ne finirai jamais.', 'J’ai fini hier.']),
        type('Complète : ¿___ estado en México? (tú)', 'Has'),
        type('Participe de « escribir »', 'escrito'),
      ],
    },
    {
      id: 'es-a2-2',
      title: 'Le passé simple (pretérito indefinido)',
      subtitle: 'ayer comí · el año pasado fui',
      duration: 35,
      objectives: ['Conjuguer l’indefinido régulier', 'Connaître ser/ir, hacer, tener', 'L’employer avec ayer, el año pasado'],
      sections: [
        {
          title: 'Formes régulières',
          table: table(`
            Pronom | hablar | comer / vivir
            yo | hablé | comí
            tú | hablaste | comiste
            él / ella | habló | comió
            nosotros | hablamos | comimos
            ellos | hablaron | comieron
          `),
          body: 'On l’utilise pour une action **terminée dans une période terminée** : ayer, anoche, el lunes pasado, en 2019.',
        },
        {
          title: 'Irréguliers très fréquents',
          table: table(`
            Pronom | ser / ir | hacer | tener
            yo | fui | hice | tuve
            tú | fuiste | hiciste | tuviste
            él / ella | fue | hizo | tuvo
            nosotros | fuimos | hicimos | tuvimos
            ellos | fueron | hicieron | tuvieron
          `),
          tip: '**Fui** veut dire « je suis allé » **ou** « j’ai été » : le contexte tranche.',
        },
      ],
      vocab: vocab(`
        ayer | hier
        anoche | hier soir
        el año pasado | l’année dernière
        la semana pasada | la semaine dernière
        llegar | arriver
        salir | sortir
        conocer | connaître, rencontrer
        nacer | naître
      `),
      dialogue: dlg(`
        Iván: ¿Qué hiciste ayer? | Qu’as-tu fait hier ?
        Clara: Fui al cine con mi hermana. | Je suis allée au cinéma avec ma sœur.
        Iván: ¿Y te gustó la película? | Et le film t’a plu ?
        Clara: Sí, mucho. Luego cenamos en un bar. | Oui, beaucoup. Ensuite, on a dîné dans un bar.
      `),
      exercises: [
        qcm('« yo » + comer (indefinido) :', 'comí', ['comé', 'comió', 'comí yo']),
        qcm('« él » + hacer (indefinido) :', 'hizo', ['hació', 'hice', 'hizó']),
        qcm('« Ayer fui al cine » veut dire…', 'Hier, je suis allé au cinéma.', ['Hier, j’étais au cinéma.', 'Demain, j’irai au cinéma.', 'Hier, il est allé au cinéma.']),
        qcm('Avec « el año pasado », on utilise…', 'l’indefinido', ['le perfecto', 'le présent', 'le futur']),
        type('Conjugue à l’indefinido : ellos ___ (hablar)', 'hablaron'),
        order('Remets dans l’ordre : « Qu’as-tu fait hier ? »', '¿Qué hiciste ayer?', 'Qu’as-tu fait hier ?'),
      ],
    },
    {
      id: 'es-a2-3',
      title: 'L’imparfait (pretérito imperfecto)',
      subtitle: 'cuando era niño · siempre jugaba',
      duration: 30,
      objectives: ['Conjuguer l’imparfait', 'Décrire le passé et les habitudes', 'Combiner imparfait et indefinido'],
      sections: [
        {
          title: 'Formation (presque tout est régulier)',
          table: table(`
            Pronom | hablar | comer / vivir | ser
            yo | hablaba | comía | era
            tú | hablabas | comías | eras
            él / ella | hablaba | comía | era
            nosotros | hablábamos | comíamos | éramos
            ellos | hablaban | comían | eran
          `),
          tip: 'Seuls 3 irréguliers : **ser** (era), **ir** (iba), **ver** (veía).',
        },
        {
          title: 'Décor et action',
          body: 'L’**imparfait** pose le décor, les habitudes, les descriptions. L’**indefinido** raconte l’action ponctuelle qui survient.',
          examples: ex(`
            Cuando era niño, vivía en Sevilla. | Quand j’étais enfant, je vivais à Séville.
            Siempre jugábamos en la calle. | Nous jouions toujours dans la rue.
            Llovía cuando salí de casa. | Il pleuvait quand je suis sorti de chez moi.
          `),
        },
      ],
      vocab: vocab(`
        cuando | quand
        siempre | toujours
        a menudo | souvent
        de pequeño | petit (enfant)
        jugar | jouer
        llover | pleuvoir
        la calle | la rue
        el pueblo | le village
      `),
      exercises: [
        qcm('« nosotros » + vivir (imparfait) :', 'vivíamos', ['vivimos', 'vivábamos', 'viviamos']),
        qcm('« yo » + ir (imparfait) :', 'iba', ['fui', 'ía', 'iría']),
        qcm('« Llovía cuando salí » : quel temps pose le décor ?', 'llovía (imparfait)', ['salí (indefinido)', 'les deux', 'aucun']),
        qcm('« Cuando era niño » veut dire…', 'Quand j’étais enfant', ['Quand je serai enfant', 'Quand j’ai été enfant une fois', 'Quand il est enfant']),
        type('Conjugue à l’imparfait : tú ___ (hablar)', 'hablabas'),
        order('Remets dans l’ordre : « Nous jouions toujours dans la rue. »', 'Siempre jugábamos en la calle.', 'Nous jouions toujours dans la rue.'),
      ],
    },
    {
      id: 'es-a2-4',
      title: 'Parler de l’avenir',
      subtitle: 'voy a viajar · viajaré',
      duration: 25,
      objectives: ['Utiliser ir a + infinitif', 'Former le futur simple'],
      sections: [
        {
          title: 'Le futur proche : ir a + infinitif',
          examples: ex(`
            Voy a estudiar esta tarde. | Je vais étudier cet après-midi.
            ¿Qué vas a hacer este verano? | Qu’est-ce que tu vas faire cet été ?
            Vamos a comer juntos. | Nous allons manger ensemble.
          `),
        },
        {
          title: 'Le futur simple',
          body: 'Infinitif + **-é, -ás, -á, -emos, -éis, -án** (pour tous les verbes). Irréguliers : tener → **tendré**, hacer → **haré**, poder → **podré**, salir → **saldré**, decir → **diré**.',
          examples: ex(`
            Mañana lloverá. | Demain, il pleuvra.
            Algún día viviré en Barcelona. | Un jour, je vivrai à Barcelone.
            Te lo diré mañana. | Je te le dirai demain.
          `),
        },
      ],
      vocab: vocab(`
        mañana | demain
        la próxima semana | la semaine prochaine
        el verano | l’été
        algún día | un jour
        juntos | ensemble
        pronto | bientôt
        el viaje | le voyage
        la tarde | l’après-midi
      `),
      exercises: [
        qcm('« Je vais étudier » :', 'Voy a estudiar.', ['Voy estudiar.', 'Voy a estudio.', 'Iré a estudiar.']),
        qcm('Futur de « tener » (yo) :', 'tendré', ['teneré', 'tenré', 'tendría']),
        qcm('Futur de « hacer » (nosotros) :', 'haremos', ['haceremos', 'hacemos', 'haríamos']),
        qcm('« Mañana lloverá » veut dire…', 'Demain il pleuvra.', ['Demain il a plu.', 'Ce matin il pleut.', 'Demain il pleuvrait.']),
        type('Futur simple : ellos ___ (vivir)', 'vivirán'),
        order('Remets dans l’ordre : « Qu’est-ce que tu vas faire cet été ? »', '¿Qué vas a hacer este verano?', 'Qu’est-ce que tu vas faire cet été ?'),
      ],
    },
    {
      id: 'es-a2-5',
      title: 'Les pronoms compléments',
      subtitle: 'lo · la · le · se lo',
      duration: 30,
      objectives: ['Utiliser les pronoms COD et COI', 'Les combiner (se lo)', 'Les placer correctement'],
      sections: [
        {
          title: 'COD et COI',
          table: table(`
            Personne | COD | COI
            yo | me | me
            tú | te | te
            él / ella / usted | lo / la | le
            nosotros | nos | nos
            ellos / ustedes | los / las | les
          `),
          examples: ex(`
            ¿El libro? Lo tengo. | Le livre ? Je l’ai.
            Le escribo una carta. | Je lui écris une lettre.
          `),
        },
        {
          title: 'Combinaison et place',
          body: 'COI avant COD. **le / les + lo / la → se lo / se la**. Avec un infinitif ou un impératif affirmatif, le pronom s’accroche à la fin.',
          examples: ex(`
            Se lo doy. | Je le lui donne.
            Voy a comprarlo. | Je vais l’acheter.
            ¡Dímelo! | Dis-le-moi !
          `),
          tip: 'Jamais « le lo » : on dit toujours **se lo**.',
        },
      ],
      vocab: vocab(`
        dar | donner
        comprar | acheter
        la carta | la lettre
        el regalo | le cadeau
        decir | dire
        prestar | prêter
        enviar | envoyer
        las llaves | les clés
      `),
      exercises: [
        qcm('« La pizza ? Je la mange » :', 'La como.', ['Lo como.', 'Le como.', 'Como la.']),
        qcm('« Je lui donne le cadeau » (avec pronoms) :', 'Se lo doy.', ['Le lo doy.', 'Lo le doy.', 'Se le doy.']),
        qcm('« Je vais l’acheter » (le livre) :', 'Voy a comprarlo.', ['Voy a lo comprar.', 'Lo voy comprar.', 'Voy comprarlo a.']),
        qcm('Quel pronom COI pour « ellos » ?', 'les', ['los', 'las', 'se']),
        type('Complète : ¿Las llaves? ___ tengo yo.', 'Las'),
        order('Remets dans l’ordre : « Je lui écris une lettre. »', 'Le escribo una carta.', 'Je lui écris une lettre.'),
      ],
    },
  ],
  test: [
    qcm('« Tu as déjà vu ce film ? » :', '¿Ya has visto esta película?', ['¿Ya viste esta película mañana?', '¿Ya has veído esta película?', '¿Ya has ver esta película?']),
    qcm('Participe de « decir » :', 'dicho', ['decido', 'dició', 'decho']),
    qcm('« ellos » + ser (indefinido) :', 'fueron', ['eran', 'serón', 'fuieron']),
    qcm('« yo » + tener (indefinido) :', 'tuve', ['tení', 'tenía', 'tuvo']),
    qcm('Pour une habitude passée, on utilise…', 'l’imparfait', ['l’indefinido', 'le futur', 'le présent']),
    qcm('« yo » + ver (imparfait) :', 'veía', ['vía', 'vi', 'veré']),
    qcm('Futur de « poder » (tú) :', 'podrás', ['poderás', 'puedrás', 'podrías']),
    qcm('« Dis-le-moi ! » :', '¡Dímelo!', ['¡Me lo di!', '¡Di lo me!', '¡Dilome!']),
    match('Associe', [['ayer', 'hier'], ['mañana', 'demain'], ['nunca', 'jamais'], ['siempre', 'toujours']]),
    order('Remets dans l’ordre : « Je vais étudier cet après-midi. »', 'Voy a estudiar esta tarde.', 'Je vais étudier cet après-midi.'),
    type('Conjugue à l’indefinido : nosotros ___ (comer)', 'comimos'),
    type('Complète : Se ___ doy. (le livre)', 'lo'),
  ],
}
