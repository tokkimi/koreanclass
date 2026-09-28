import type { PortalContent } from './types.js'

export const espagnol: PortalContent = {
  writing: {
    title: 'Alphabet et prononciation',
    lead: 'Touche une lettre pour entendre son nom. Pour apprendre pas à pas, suis le Niveau 0 — Premiers pas.',
    grids: [
      {
        title: 'L’alphabet (27 lettres)',
        items: [
          ['A', 'a'], ['B', 'be'], ['C', 'ce'], ['D', 'de'], ['E', 'e'], ['F', 'efe'], ['G', 'ge'], ['H', 'hache', 'muet'], ['I', 'i'],
          ['J', 'jota', 'r raclé'], ['K', 'ka'], ['L', 'ele'], ['M', 'eme'], ['N', 'ene'], ['Ñ', 'eñe', 'gn'], ['O', 'o'], ['P', 'pe'], ['Q', 'cu'],
          ['R', 'erre'], ['S', 'ese'], ['T', 'te'], ['U', 'u', 'ou'], ['V', 'uve', 'comme b'], ['W', 'uve doble'], ['X', 'equis'], ['Y', 'ye'], ['Z', 'zeta', 'th anglais'],
        ].map(([ch, name, note]) => [ch, name, note, name] as [string, string, string?, string?]),
      },
      {
        title: 'Les sons clés',
        items: [
          ['ll', 'y', 'llamar', 'llamar'], ['rr', 'r roulé', 'perro', 'perro'], ['ch', 'tch', 'chico', 'chico'], ['j', 'r raclé', 'jamón', 'jamón'],
          ['ge / gi', 'r raclé', 'gente', 'gente'], ['ce / ci', 'th / s', 'cena', 'cena'], ['qu', 'k', 'queso', 'queso'], ['gue / gui', 'gu dur', 'guitarra', 'guitarra'],
        ],
      },
    ],
    sections: [
      {
        id: 'lettres',
        title: '1. Une langue qui se lit comme elle s’écrit',
        body: 'Bonne nouvelle : en espagnol, **chaque lettre se prononce**, toujours de la même façon (sauf le **h**, toujours muet). Une fois les règles connues, tu peux lire n’importe quel mot à voix haute.\nL’alphabet a **27 lettres** : les 26 du français + **ñ**. Les digrammes **ch**, **ll** et **rr** représentent un seul son.',
      },
      {
        id: 'voyelles',
        title: '2. Cinq voyelles, toujours pures',
        body: 'Pas de voyelles nasales, pas de « e » muet : chaque voyelle est courte et nette.',
        table: {
          head: ['Voyelle', 'Comment l’aborder', 'Exemple'],
          rows: [
            ['a', 'a ouvert, comme « papa ».', 'casa'],
            ['e', 'é, jamais muet.', 'leche'],
            ['i', 'i, comme « midi ».', 'vino'],
            ['o', 'o fermé, comme « mot ».', 'todo'],
            ['u', 'ou, comme « loup ».', 'luna'],
          ],
        },
      },
      {
        id: 'consonnes',
        title: '3. Les consonnes qui changent',
        body: '**j** et **g** devant e/i : un « r » raclé du fond de la gorge. **c** devant e/i et **z** : « th » anglais en Espagne, « s » en Amérique latine. **ll** et **y** : « y ». **r** simple : un battement de langue ; **rr** ou r initial : roulé fort. **v** se prononce comme **b**.',
        table: {
          head: ['Mot', 'Son clé', 'Sens'],
          rows: [
            ['jamón', 'j raclé', 'jambon'],
            ['gente', 'g raclé', 'les gens'],
            ['cena', 'c = th / s', 'dîner'],
            ['calle', 'll = y', 'rue'],
            ['perro', 'rr roulé', 'chien'],
          ],
        },
      },
      {
        id: 'accent',
        title: '4. L’accent tonique et l’accent écrit',
        body: 'Mot terminé par **voyelle, n ou s** : accent sur l’**avant-dernière** syllabe (ca-sa, ha-blan). Sinon : sur la **dernière** (ha-blar, ciu-dad). L’**accent écrit** (á é í ó ú) signale une exception : ca-**fé**, **mú**-si-ca. Il distingue aussi des mots : **sí** (oui) / si (si), **tú** (toi) / tu (ton).',
      },
      {
        id: 'mots',
        title: '5. Lire ses premiers mots, pas à pas',
        body: 'Lis chaque syllabe, repère l’accent, puis dis le mot d’un seul souffle.',
        words: [
          ['hola', 'h muet + o-la, accent sur « o ».', 'salut'],
          ['España', 'es-pa-ña : ñ = gn, accent sur « pa ».', 'Espagne'],
          ['ciudad', 'ciu-dad : c = th/s, accent sur la fin.', 'ville'],
          ['guitarra', 'gui-ta-rra : u muet après g, rr roulé.', 'guitare'],
        ],
      },
    ],
    quizTitle: 'À toi : reconnaître les lettres et les sons',
    quiz: [
      ['Quelle lettre est toujours muette ?', 'h', 'j', 'v', 'z'],
      ['Comment se prononce « ñ » ?', 'comme « gn »', 'comme « n »', 'comme « ni » séparé', 'comme « y »'],
      ['Comment se prononce le « j » de « jamón » ?', 'r raclé de la gorge', 'j français', 'y', 'h muet'],
      ['« ll » se prononce le plus souvent…', 'comme « y »', 'comme « l »', 'comme « j »', 'il est muet'],
      ['« v » se prononce…', 'comme « b »', 'comme en français', 'comme « f »', 'comme « w »'],
      ['« perro » (chien) a un…', 'r roulé fort', 'r muet', 'r raclé', 'r anglais'],
      ['Combien de lettres dans l’alphabet espagnol ?', '27', '26', '28', '30'],
      ['Où tombe l’accent dans « hablan » ?', 'sur « ha »', 'sur « blan »', 'nulle part', 'sur les deux'],
      ['Où tombe l’accent dans « hablar » ?', 'sur « blar »', 'sur « ha »', 'nulle part', 'sur « a » final'],
      ['Pourquoi « café » a-t-il un accent écrit ?', 'C’est une exception à la règle', 'Pour faire joli', 'Parce qu’il est féminin', 'Parce qu’il est étranger'],
      ['« sí » avec accent veut dire…', 'oui', 'si (condition)', 'soi', 'six'],
      ['Dans « queso », le « u »…', 'ne se prononce pas', 'se prononce « ou »', 'se prononce « u » français', 'se prononce « w »'],
      ['Comment se dit la lettre « z » ?', 'zeta', 'zède', 'zi', 'ceta'],
      ['« ce » et « ci » en Amérique latine se prononcent…', 'comme « s »', 'comme « k »', 'comme « tch »', 'comme « th »'],
      ['Que veut dire « ciudad » ?', 'ville', 'citadelle', 'ciel', 'cidre'],
      ['Combien de voyelles sonores en espagnol ?', '5', '7', '12', '16'],
    ],
    next: [
      ['L’alphabet et les sons', 'es-0', 'es-0-1'],
      ['Saluer', 'es-0', 'es-0-2'],
      ['Se présenter', 'es-0', 'es-0-3'],
    ],
  },
  numbers: {
    title: 'Chiffres & nombres',
    lead: 'Les nombres espagnols, expliqués pas à pas. Lis et écoute d’abord ; les exercices viennent ensuite.',
    why: {
      title: 'Des nombres logiques… avec quelques pièges',
      paragraphs: [
        'De 16 à 29, les nombres s’écrivent **en un seul mot** : dieciséis, veintiuno, veinticinco. À partir de 31, on utilise **y** : treinta **y** uno.',
        '**uno** devient **un** devant un nom masculin (un libro, veintiún años) et **una** devant un nom féminin (veintiuna personas).',
        'Les centaines s’accordent : doscient**os** euros, doscient**as** personas. **cien** tout seul, mais **ciento** dans 101-199.',
      ],
    },
    table: {
      title: 'Écouter et apprendre de 0 à 10',
      head: ['Nombre', 'Espagnol', 'Ordinal'],
      rows: [
        ['0', 'cero', '—'],
        ['1', 'uno', 'primero'],
        ['2', 'dos', 'segundo'],
        ['3', 'tres', 'tercero'],
        ['4', 'cuatro', 'cuarto'],
        ['5', 'cinco', 'quinto'],
        ['6', 'seis', 'sexto'],
        ['7', 'siete', 'séptimo'],
        ['8', 'ocho', 'octavo'],
        ['9', 'nueve', 'noveno'],
        ['10', 'diez', 'décimo'],
      ],
      note: 'Devant un nom masculin, primero et tercero perdent leur o : el primer día, el tercer piso.',
    },
    build: {
      title: 'Construire un nombre',
      paragraphs: [
        '**11-15 :** once, doce, trece, catorce, quince. **16-19 :** dieciséis, diecisiete, dieciocho, diecinueve. **20-29 :** veinte, veintiuno, veintidós… **Dizaines :** treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa.',
        '**Centaines :** cien, doscientos, trescientos, cuatrocientos, **quinientos**, seiscientos, **setecientos**, ochocientos, **novecientos**. **Mille :** mil, dos mil. **Million :** un millón **de** euros.',
      ],
    },
    sentences: {
      title: 'Une phrase, morceau par morceau',
      items: [
        { text: 'Dos cafés, por favor.', explain: 'Dos = deux · cafés = cafés · por favor = s’il vous plaît. → « Deux cafés, s’il vous plaît. »' },
        { text: 'Son las tres y veinte.', explain: 'Son las tres = il est trois heures · y veinte = et vingt. → « Il est 15 h 20. »' },
      ],
    },
    units: [
      {
        id: 'age',
        title: 'Dire et demander l’âge',
        body: 'L’âge se dit avec **tener** : tengo 25 años. Devant **años** (masculin), **uno** devient **un** : veinti**ún** años, treinta y **un** años.',
        examples: [
          { ko: 'Tengo dieciséis años.', fr: 'Tengo = j’ai · dieciséis = 16 · años = ans. → J’ai 16 ans.' },
          { ko: '¿Cuántos años tienes?', fr: 'Cuántos = combien · años = ans · tienes = tu as. → Quel âge as-tu ?' },
        ],
        qs: [
          ['16 ans ?', 'dieciséis años', 'diez y seis años', 'sesenta años', 'dieciseis año'],
          ['21 ans ?', 'veintiún años', 'veintiuno años', 'veinte y uno años', 'veintiuna años'],
          ['Quel verbe pour l’âge ?', 'tener', 'ser', 'estar', 'hacer'],
          ['31 ans ?', 'treinta y un años', 'treintaiuno años', 'treinta uno años', 'trece y un años'],
          ['« ¿Cuántos años tienes? » demande…', 'l’âge', 'le prix', 'l’heure', 'la date'],
          ['15 ans ?', 'quince años', 'cinco años', 'cincuenta años', 'diez y cinco años'],
        ],
      },
      {
        id: 'time',
        title: 'Lire l’heure',
        body: '**Es la una** (1 h) mais **son las** + autres heures. Minutes : **y** (et) jusqu’à la demie, **menos** (moins) après : son las cinco **menos cuarto** = 4 h 45. **y cuarto** = et quart, **y media** = et demie. **de la mañana / de la tarde / de la noche**.',
        examples: [
          { ko: 'Son las nueve y cinco de la mañana.', fr: 'Son las nueve = il est neuf heures · y cinco = et cinq · de la mañana = du matin. → 9 h 05.' },
          { ko: '¿A qué hora empieza?', fr: 'A qué hora = à quelle heure · empieza = ça commence. → À quelle heure ça commence ?' },
        ],
        qs: [
          ['Il est 1 h :', 'Es la una.', 'Son las una.', 'Es las uno.', 'Son la uno.'],
          ['3 h 30 :', 'las tres y media', 'las tres y treinta y media', 'las media tres', 'las tres menos media'],
          ['4 h 45 :', 'las cinco menos cuarto', 'las cuatro menos cuarto', 'las cuatro y cuarto', 'las cinco y cuarto'],
          ['« y cuarto » veut dire…', 'et quart', 'moins le quart', 'et demie', 'quatre'],
          ['« de la tarde » :', 'de l’après-midi', 'du matin', 'de la nuit', 'en retard'],
          ['« ¿A qué hora…? » demande…', 'à quelle heure', 'combien de temps', 'quel jour', 'quelle date'],
        ],
      },
      {
        id: 'money',
        title: 'L’euro, les prix et la monnaie',
        body: 'En Espagne : **el euro** (€) et **los céntimos**. 1,50 € = **un euro con cincuenta**. Attention aux centaines irrégulières : **quinientos** (500), **setecientos** (700), **novecientos** (900). 100 = **cien**, mais 120 = **ciento veinte**.',
        examples: [
          { ko: '¿Cuánto cuesta? — Cuesta doce euros con cincuenta.', fr: 'Cuánto cuesta = combien ça coûte · doce euros con cincuenta = 12,50 €.' },
          { ko: 'Aquí tiene el cambio.', fr: 'Aquí tiene = voici · el cambio = la monnaie. → Voici votre monnaie.' },
        ],
        qs: [
          ['500 :', 'quinientos', 'cincocientos', 'cincuenta', 'quincientos'],
          ['100 € :', 'cien euros', 'ciento euros', 'un ciento euros', 'cientos euros'],
          ['120 :', 'ciento veinte', 'cien veinte', 'cien y veinte', 'ciento y veinte'],
          ['700 :', 'setecientos', 'sietecientos', 'setenta', 'setecentos'],
          ['« el cambio » dans une boutique :', 'la monnaie rendue', 'le changement de taille', 'l’échange', 'la caisse'],
          ['« ¿Cuánto cuesta? » :', 'Combien ça coûte ?', 'Combien de temps ?', 'Combien de personnes ?', 'Quelle heure est-il ?'],
        ],
      },
      {
        id: 'dates',
        title: 'Dates, téléphone et ordinaux',
        body: 'La date : **el** + nombre + **de** + mois : el 3 de mayo. Le 1er : **el uno** (Espagne) ou **el primero** (Amérique latine). Les années se lisent comme des nombres : 2025 = **dos mil veinticinco**. Les numéros de téléphone se lisent souvent **par paires**.',
        examples: [
          { ko: 'Hoy es el quince de junio.', fr: 'Hoy es = aujourd’hui c’est · el quince de junio = le 15 juin.' },
          { ko: 'Vivo en el tercer piso.', fr: 'Vivo = j’habite · en el tercer piso = au troisième étage.' },
        ],
        qs: [
          ['Le 15 juin :', 'el quince de junio', 'el junio quince', 'quince junio de', 'el de junio quince'],
          ['2025 :', 'dos mil veinticinco', 'veinte veinticinco', 'dos mil y veinticinco', 'dosmil veinte cinco'],
          ['« au troisième étage » :', 'en el tercer piso', 'en el tercero piso', 'en el tres piso', 'en la tercera piso'],
          ['Le 1er mai en Amérique latine :', 'el primero de mayo', 'el primer mayo', 'el uno mayo', 'la primera de mayo'],
          ['« segundo » veut dire…', 'deuxième (ou seconde)', 'second de cuisine', 'deux', 'seize'],
          ['Les numéros de téléphone se lisent souvent…', 'par paires', 'lettre par lettre', 'à l’envers', 'en anglais'],
        ],
      },
    ],
    next: [
      ['Étape 1 · cours + exercices', 'Les nombres de 0 à 20', 'es-0', 'es-0-4'],
      ['Étape 2 · cours + exercices', 'L’heure et la routine', 'es-a1', 'es-a1-5'],
    ],
  },
  colors: {
    title: 'Les couleurs · los colores',
    lead: 'Observe les 16 couleurs, écoute leur nom, puis entraîne-toi avec le QCM.',
    colors: [
      ['rojo', '', 'rouge', '#e44654'],
      ['azul', '', 'bleu', '#316bea'],
      ['amarillo', '', 'jaune', '#f4d647'],
      ['verde', '', 'vert', '#42a96b'],
      ['naranja', '', 'orange', '#f08e40'],
      ['morado', '', 'violet', '#9865cc'],
      ['rosa', '', 'rose', '#ef9ec1'],
      ['marrón', '', 'marron', '#885539'],
      ['negro', '', 'noir', '#202328'],
      ['blanco', '', 'blanc', '#ffffff'],
      ['gris', '', 'gris', '#92969c'],
      ['celeste', '', 'bleu ciel', '#91cef1'],
      ['azul marino', '', 'bleu marine', '#263565'],
      ['beis', '', 'beige', '#dfceb0'],
      ['dorado', '', 'doré', '#c4a244'],
      ['plateado', '', 'argenté', '#bfc5ce'],
    ],
    sentence: {
      title: 'Mettre une couleur dans une phrase',
      paragraphs: [
        { text: 'La couleur se place **après** le nom et s’accorde : un coche **rojo**, una casa **roja**, unos zapatos **rojos**. Les couleurs en -e ou en consonne (verde, azul, gris) ne changent pas au féminin.' },
        { text: 'La camisa es azul.', say: 'La camisa es azul.' },
        { text: 'La camisa (la chemise) + es (est) + azul (bleue) → La chemise est bleue.' },
        { text: '¿De qué color es?', say: '¿De qué color es?' },
        { text: 'De qué (de quelle) + color (couleur) + es (est) → C’est de quelle couleur ?' },
        { text: 'Pour nuancer : azul **claro** (bleu clair), verde **oscuro** (vert foncé).' },
      ],
    },
  },
}
