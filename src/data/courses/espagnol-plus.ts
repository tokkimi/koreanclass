import type { Lesson } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

/** Leçons supplémentaires du cursus espagnol, ajoutées à la fin de chaque niveau. */
export const esExtra: Record<string, Lesson[]> = {
  'es-0': [
    {
      id: 'es-0-6',
      title: 'Les couleurs et l’accord des adjectifs',
      subtitle: 'rojo · roja · verde · azules',
      duration: 25,
      objectives: ['Nommer les couleurs', 'Accorder l’adjectif en genre et en nombre', 'Placer l’adjectif après le nom'],
      sections: [
        {
          title: 'Les couleurs',
          table: table(`
            Espagnol | Sens
            rojo / roja | rouge
            azul | bleu
            amarillo / amarilla | jaune
            verde | vert
            negro / negra | noir
            blanco / blanca | blanc
            gris | gris
            rosa | rose
            naranja | orange
            marrón | marron
          `),
        },
        {
          title: 'Accord et place',
          body: 'L’adjectif se place **après le nom** et s’accorde : -o → -a au féminin, +s / +es au pluriel. Les adjectifs en **-e** ou en consonne ne changent pas au féminin : una casa verde, un coche azul → coches azul**es**.',
          examples: ex(`
            un coche rojo | une voiture rouge
            una camisa blanca | une chemise blanche
            unos zapatos negros | des chaussures noires
            ¿De qué color es? | De quelle couleur est-ce ?
          `),
          tip: 'Rosa et naranja restent souvent invariables : unas flores **rosa**.',
        },
      ],
      vocab: vocab(`
        rojo | rouge
        azul | bleu
        amarillo | jaune
        verde | vert
        negro | noir
        blanco | blanc
        el color | la couleur
        la camisa | la chemise
      `),
      exercises: [
        qcm('« une chemise blanche » :', 'una camisa blanca', ['una camisa blanco', 'una blanca camisa', 'un camisa blanca']),
        qcm('Pluriel de « azul » :', 'azules', ['azuls', 'azulas', 'azul']),
        qcm('« verde » au féminin :', 'verde', ['verda', 'verdea', 'verdes']),
        qcm('« ¿De qué color es? » veut dire…', 'De quelle couleur est-ce ?', ['Quelle heure est-il ?', 'Où est la couleur ?', 'C’est quelle taille ?']),
        match('Associe', [['rojo', 'rouge'], ['amarillo', 'jaune'], ['negro', 'noir'], ['gris', 'gris']]),
        order('Remets dans l’ordre : « des chaussures noires »', 'unos zapatos negros', 'des chaussures noires'),
        type('Traduis : « une voiture rouge » (coche)', 'un coche rojo'),
        type('Féminin de « amarillo »', 'amarilla'),
      ],
    },
    {
      id: 'es-0-7',
      title: 'La famille et les possessifs',
      subtitle: 'mi padre · tu madre · nuestros abuelos',
      duration: 25,
      objectives: ['Présenter sa famille', 'Utiliser mi, tu, su, nuestro'],
      sections: [
        {
          title: 'La famille',
          table: table(`
            Espagnol | Sens
            el padre / la madre | le père / la mère
            los padres | les parents
            el hermano / la hermana | le frère / la sœur
            el hijo / la hija | le fils / la fille
            el abuelo / la abuela | le grand-père / la grand-mère
            el tío / la tía | l’oncle / la tante
            el primo / la prima | le cousin / la cousine
          `),
          tip: 'Le masculin pluriel englobe les deux : **los padres** = les parents, **los hermanos** = les frères et sœurs.',
        },
        {
          title: 'Les possessifs',
          body: '**mi / mis** (mon, mes), **tu / tus** (ton, tes), **su / sus** (son, sa, leur, votre), **nuestro / nuestra / nuestros / nuestras** (notre, nos).',
          examples: ex(`
            Mi madre se llama Carmen. | Ma mère s’appelle Carmen.
            ¿Tienes hermanos? | As-tu des frères et sœurs ?
            Tengo una hermana y dos primos. | J’ai une sœur et deux cousins.
            Nuestros abuelos viven en Málaga. | Nos grands-parents vivent à Málaga.
          `),
        },
      ],
      vocab: vocab(`
        el padre | le père
        la madre | la mère
        el hermano | le frère
        la hermana | la sœur
        los abuelos | les grands-parents
        el hijo | le fils
        la familia | la famille
        mayor / menor | aîné / cadet
      `),
      dialogue: dlg(`
        Ana: ¿Tienes hermanos? | Tu as des frères et sœurs ?
        Léo: Sí, tengo un hermano mayor. Se llama Hugo. | Oui, j’ai un grand frère. Il s’appelle Hugo.
        Ana: Yo soy hija única. | Moi, je suis fille unique.
      `),
      exercises: [
        qcm('« les parents » :', 'los padres', ['los parientes', 'las madres', 'los padras']),
        qcm('« mes frères et sœurs » :', 'mis hermanos', ['mi hermanos', 'mis hermanas y hermanos', 'mios hermanos']),
        qcm('« notre maison » :', 'nuestra casa', ['nuestro casa', 'nuestras casa', 'nosotros casa']),
        qcm('« Tengo un hermano mayor » veut dire…', 'J’ai un grand frère.', ['J’ai un petit frère.', 'J’ai un frère majeur.', 'Mon frère est grand.']),
        match('Associe', [['el tío', 'l’oncle'], ['la prima', 'la cousine'], ['el abuelo', 'le grand-père'], ['la hija', 'la fille']]),
        order('Remets dans l’ordre : « Ma mère s’appelle Carmen. »', 'Mi madre se llama Carmen.', 'Ma mère s’appelle Carmen.'),
        type('Traduis : « la famille »', 'la familia'),
        type('Complète : ___ padre es médico. (mon)', 'Mi'),
      ],
    },
    {
      id: 'es-0-8',
      title: 'Jours, mois et météo',
      subtitle: 'lunes · enero · hace calor · llueve',
      duration: 25,
      objectives: ['Dire la date', 'Parler du temps qu’il fait'],
      sections: [
        {
          title: 'Jours et mois',
          body: 'Jours : **lunes, martes, miércoles, jueves, viernes, sábado, domingo**. Mois : enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre. Pas de majuscule !',
          examples: ex(`
            Hoy es lunes. | Aujourd’hui, c’est lundi.
            Mi cumpleaños es el 3 de mayo. | Mon anniversaire est le 3 mai.
            El sábado voy al cine. | Samedi, je vais au cinéma.
          `),
        },
        {
          title: 'La météo',
          table: table(`
            Espagnol | Sens
            Hace calor. | Il fait chaud.
            Hace frío. | Il fait froid.
            Hace sol. | Il y a du soleil.
            Hace viento. | Il y a du vent.
            Llueve. | Il pleut.
            Nieva. | Il neige.
            Está nublado. | C’est nuageux.
          `),
          tip: 'La météo utilise surtout **hacer** (faire), comme en français.',
        },
      ],
      vocab: vocab(`
        lunes | lundi
        domingo | dimanche
        enero | janvier
        agosto | août
        el cumpleaños | l’anniversaire
        hace calor | il fait chaud
        llueve | il pleut
        el tiempo | le temps (météo)
      `),
      exercises: [
        qcm('« mercredi » :', 'miércoles', ['martes', 'jueves', 'sábado']),
        qcm('« Il fait froid » :', 'Hace frío.', ['Es frío.', 'Está frío.', 'Tiene frío.']),
        qcm('« Il pleut » :', 'Llueve.', ['Hace lluvia.', 'Es lluvia.', 'Lluvia.']),
        qcm('Les mois en espagnol prennent…', 'une minuscule', ['une majuscule', 'un article', 'un accent']),
        match('Associe', [['enero', 'janvier'], ['julio', 'juillet'], ['octubre', 'octobre'], ['diciembre', 'décembre']]),
        order('Remets dans l’ordre : « Mon anniversaire est le 3 mai. »', 'Mi cumpleaños es el 3 de mayo.', 'Mon anniversaire est le 3 mai.'),
        type('Traduis : « dimanche »', 'domingo'),
        type('Traduis : « Il fait chaud. »', 'Hace calor'),
      ],
    },
  ],
  'es-a1': [
    {
      id: 'es-a1-6',
      title: 'Au restaurant',
      subtitle: 'para mí · la cuenta · ¿qué me recomienda?',
      duration: 30,
      objectives: ['Commander un repas', 'Demander l’addition', 'Connaître les plats typiques'],
      sections: [
        {
          title: 'Commander',
          examples: ex(`
            Una mesa para dos, por favor. | Une table pour deux, s’il vous plaît.
            ¿Qué me recomienda? | Que me recommandez-vous ?
            De primero, una ensalada. | En entrée, une salade.
            Para mí, la paella. | Pour moi, la paella.
            ¿Me trae agua, por favor? | Vous m’apportez de l’eau, s’il vous plaît ?
            La cuenta, por favor. | L’addition, s’il vous plaît.
          `),
        },
        {
          title: 'Les plats typiques',
          table: table(`
            Plat | Description
            la paella | riz au safran, fruits de mer ou viande
            la tortilla española | omelette aux pommes de terre
            el gazpacho | soupe froide de tomates
            las tapas | petites portions à partager
            los churros | beignets (souvent avec du chocolat)
          `),
          tip: 'En Espagne, on déjeune tard (vers **14 h**) et on dîne vers **21 h-22 h**.',
        },
      ],
      vocab: vocab(`
        la mesa | la table
        el camarero | le serveur
        la carta | le menu
        la cuenta | l’addition
        el agua | l’eau
        el postre | le dessert
        la ensalada | la salade
        pedir | commander
      `),
      dialogue: dlg(`
        Camarero: ¿Qué van a tomar? | Qu’allez-vous prendre ?
        Laura: Para mí, una tortilla y un agua. | Pour moi, une tortilla et une eau.
        Pablo: Yo quiero la paella, por favor. | Moi, je voudrais la paella, s’il vous plaît.
        Camarero: Muy bien. ¿Y de postre? | Très bien. Et en dessert ?
      `),
      exercises: [
        qcm('« L’addition, s’il vous plaît » :', 'La cuenta, por favor.', ['La carta, por favor.', 'La cuenta, gracias por.', 'El pago, por favor.']),
        qcm('« la carta » au restaurant, c’est…', 'le menu', ['la carte bancaire', 'la lettre', 'l’addition']),
        qcm('Le gazpacho est…', 'une soupe froide de tomates', ['un dessert', 'un plat de riz', 'une omelette']),
        qcm('« Para mí, la paella » veut dire…', 'Pour moi, la paella.', ['La paella est à moi.', 'Je n’aime pas la paella.', 'Une paella pour lui.']),
        match('Associe', [['el postre', 'le dessert'], ['el camarero', 'le serveur'], ['la mesa', 'la table'], ['pedir', 'commander']]),
        order('Remets dans l’ordre : « Que me recommandez-vous ? »', '¿Qué me recomienda?', 'Que me recommandez-vous ?'),
        type('Traduis : « l’eau »', 'el agua'),
        type('Complète : Una mesa ___ dos, por favor.', 'para'),
      ],
    },
    {
      id: 'es-a1-7',
      title: 'En ville : demander son chemin',
      subtitle: '¿Dónde está…? · hay · a la derecha',
      duration: 30,
      objectives: ['Demander où se trouve un lieu', 'Distinguer hay et está', 'Comprendre un itinéraire'],
      sections: [
        {
          title: 'hay ou está ?',
          body: '**hay** = il y a (pour présenter quelque chose d’indéfini). **está / están** = se trouve(nt) (pour situer quelque chose de précis).',
          examples: ex(`
            ¿Hay una farmacia por aquí? | Y a-t-il une pharmacie par ici ?
            ¿Dónde está la estación? | Où est la gare ?
            El museo está al lado del parque. | Le musée est à côté du parc.
            Hay dos bancos en esta calle. | Il y a deux banques dans cette rue.
          `),
        },
        {
          title: 'Les indications',
          table: table(`
            Espagnol | Sens
            todo recto | tout droit
            a la derecha | à droite
            a la izquierda | à gauche
            al lado de | à côté de
            enfrente de | en face de
            cerca de / lejos de | près de / loin de
            la primera calle | la première rue
          `),
        },
      ],
      vocab: vocab(`
        la calle | la rue
        la plaza | la place
        la estación | la gare
        la farmacia | la pharmacie
        el museo | le musée
        cerca | près
        lejos | loin
        la esquina | le coin (de rue)
      `),
      exercises: [
        qcm('« Y a-t-il un distributeur par ici ? » :', '¿Hay un cajero por aquí?', ['¿Está un cajero por aquí?', '¿Es un cajero por aquí?', '¿Hay el cajero aquí por?']),
        qcm('« Où est la gare ? » :', '¿Dónde está la estación?', ['¿Dónde hay la estación?', '¿Dónde es la estación?', '¿Qué está la estación?']),
        qcm('« enfrente de » veut dire…', 'en face de', ['devant', 'à côté de', 'derrière']),
        qcm('« todo recto » veut dire…', 'tout droit', ['tout de suite', 'à droite', 'tout près']),
        match('Associe', [['la plaza', 'la place'], ['la esquina', 'le coin'], ['lejos', 'loin'], ['cerca', 'près']]),
        order('Remets dans l’ordre : « Le musée est à côté du parc. »', 'El museo está al lado del parque.', 'Le musée est à côté du parc.'),
        type('Traduis : « à gauche »', 'a la izquierda'),
        type('Traduis : « la pharmacie »', 'la farmacia'),
      ],
    },
    {
      id: 'es-a1-8',
      title: 'Faire du shopping',
      subtitle: 'este · ese · aquel · ¿cuánto cuesta?',
      duration: 30,
      objectives: ['Utiliser les démonstratifs', 'Demander une taille et un prix', 'Nommer les vêtements'],
      sections: [
        {
          title: 'Trois démonstratifs',
          table: table(`
            Espagnol | Distance
            este / esta / estos / estas | ici (près de moi)
            ese / esa / esos / esas | là (près de toi)
            aquel / aquella / aquellos / aquellas | là-bas
          `),
        },
        {
          title: 'Dans un magasin',
          examples: ex(`
            ¿Cuánto cuesta esta camiseta? | Combien coûte ce T-shirt ?
            ¿Tiene esta falda en la talla M? | Vous avez cette jupe en M ?
            ¿Puedo probármelo? | Je peux l’essayer ?
            Me lo llevo. | Je le prends.
            ¿Se puede pagar con tarjeta? | On peut payer par carte ?
          `),
        },
      ],
      vocab: vocab(`
        la camiseta | le T-shirt
        los pantalones | le pantalon
        la falda | la jupe
        los zapatos | les chaussures
        el abrigo | le manteau
        la talla | la taille
        barato / caro | bon marché / cher
        la tarjeta | la carte (bancaire)
      `),
      dialogue: dlg(`
        Clienta: Perdone, ¿cuánto cuestan esos zapatos? | Pardon, combien coûtent ces chaussures ?
        Dependiente: Cuarenta euros. ¿Qué número tiene? | Quarante euros. Quelle pointure faites-vous ?
        Clienta: El treinta y ocho. ¿Puedo probármelos? | Du 38. Je peux les essayer ?
      `),
      exercises: [
        qcm('« ce T-shirt-ci » :', 'esta camiseta', ['este camiseta', 'esa camiseta aquí', 'aquella camiseta']),
        qcm('« ces chaussures-là (là-bas) » :', 'aquellos zapatos', ['estos zapatos', 'aquellas zapatos', 'esos zapatas']),
        qcm('« Je le prends » :', 'Me lo llevo.', ['Lo tomo me.', 'Me llevo lo.', 'Yo lo llevar.']),
        qcm('« la talla » veut dire…', 'la taille (vêtement)', ['la taxe', 'le tissu', 'la caisse']),
        match('Associe', [['la falda', 'la jupe'], ['el abrigo', 'le manteau'], ['barato', 'bon marché'], ['caro', 'cher']]),
        order('Remets dans l’ordre : « Combien coûte ce T-shirt ? »', '¿Cuánto cuesta esta camiseta?', 'Combien coûte ce T-shirt ?'),
        type('Traduis : « les chaussures »', 'los zapatos'),
        type('Complète : ¿Se puede pagar con ___? (carte)', 'tarjeta'),
      ],
    },
  ],
  'es-a2': [
    {
      id: 'es-a2-6',
      title: 'Comparer',
      subtitle: 'más… que · tan… como · el mejor',
      duration: 25,
      objectives: ['Comparer deux éléments', 'Former le superlatif', 'Connaître mejor, peor, mayor, menor'],
      sections: [
        {
          title: 'Les comparatifs',
          table: table(`
            Structure | Sens | Exemple
            más + adj. + que | plus… que | Madrid es más grande que Sevilla.
            menos + adj. + que | moins… que | El tren es menos caro que el avión.
            tan + adj. + como | aussi… que | Eres tan alto como tu padre.
            tanto/a/os/as + nom + como | autant de… que | Tengo tantos libros como tú.
          `),
        },
        {
          title: 'Irréguliers et superlatif',
          body: '**bueno → mejor**, **malo → peor**, **grande (âge) → mayor**, **pequeño (âge) → menor**. Superlatif : **el / la más + adj. + de** ; absolu : **-ísimo** (guapísimo, carísimo).',
          examples: ex(`
            Es el mejor restaurante de la ciudad. | C’est le meilleur restaurant de la ville.
            Mi hermana es mayor que yo. | Ma sœur est plus âgée que moi.
            Este vestido es carísimo. | Cette robe est hyper chère.
          `),
        },
      ],
      vocab: vocab(`
        más | plus
        menos | moins
        mejor | meilleur
        peor | pire
        mayor | plus âgé
        menor | plus jeune
        alto | grand (taille)
        guapo | beau
      `),
      exercises: [
        qcm('« plus grand que » :', 'más grande que', ['más grande de', 'tan grande que', 'mayor que grande']),
        qcm('« aussi intelligent que » :', 'tan inteligente como', ['tanto inteligente como', 'tan inteligente que', 'más inteligente como']),
        qcm('Comparatif de « bueno » :', 'mejor', ['más bueno', 'buenísimo', 'bueníssimo']),
        qcm('« carísimo » veut dire…', 'très très cher', ['un peu cher', 'pas cher', 'le plus cher de tous']),
        match('Associe', [['mejor', 'meilleur'], ['peor', 'pire'], ['mayor', 'plus âgé'], ['menor', 'plus jeune']]),
        order('Remets dans l’ordre : « C’est le meilleur restaurant de la ville. »', 'Es el mejor restaurante de la ciudad.', 'C’est le meilleur restaurant de la ville.'),
        type('Complète : El tren es ___ caro que el avión. (moins)', 'menos'),
        type('Complète : Tengo ___ libros como tú. (autant de)', 'tantos'),
      ],
    },
    {
      id: 'es-a2-7',
      title: 'La santé et le corps',
      subtitle: 'me duele · tengo fiebre · el médico',
      duration: 30,
      objectives: ['Nommer les parties du corps', 'Dire où on a mal', 'Parler au médecin'],
      sections: [
        {
          title: 'doler : comme gustar',
          body: '**Me duele** + singulier, **me duelen** + pluriel. On utilise l’article (pas le possessif) : me duele **la** cabeza.',
          examples: ex(`
            Me duele la cabeza. | J’ai mal à la tête.
            Me duelen los pies. | J’ai mal aux pieds.
            ¿Qué te pasa? | Qu’est-ce qui t’arrive ?
            Tengo fiebre y tos. | J’ai de la fièvre et je tousse.
          `),
        },
        {
          title: 'Le corps',
          table: table(`
            Espagnol | Sens
            la cabeza | la tête
            el estómago | l’estomac
            la espalda | le dos
            la garganta | la gorge
            el brazo | le bras
            la pierna | la jambe
            el pie | le pied
            los ojos | les yeux
          `),
          tip: 'Pour une urgence en Espagne : **112**. À la pharmacie : « ¿Tiene algo para el dolor de cabeza? »',
        },
      ],
      vocab: vocab(`
        la cabeza | la tête
        la espalda | le dos
        la garganta | la gorge
        doler | faire mal
        la fiebre | la fièvre
        el médico | le médecin
        la receta | l’ordonnance
        resfriado | enrhumé
      `),
      dialogue: dlg(`
        Médica: ¿Qué le pasa? | Qu’est-ce qui vous arrive ?
        Paciente: Me duele la garganta y tengo fiebre. | J’ai mal à la gorge et j’ai de la fièvre.
        Médica: Tiene gripe. Le voy a dar una receta. | Vous avez la grippe. Je vais vous faire une ordonnance.
      `),
      exercises: [
        qcm('« J’ai mal au dos » :', 'Me duele la espalda.', ['Me duelen la espalda.', 'Tengo dolor mi espalda duele.', 'Me duele mi espalda.']),
        qcm('« J’ai mal aux yeux » :', 'Me duelen los ojos.', ['Me duele los ojos.', 'Me duelen mis ojo.', 'Tengo duele ojos.']),
        qcm('« la receta » chez le médecin :', 'l’ordonnance', ['la recette', 'la réception', 'le reçu']),
        qcm('Numéro d’urgence en Espagne :', '112', ['15', '911', '18']),
        match('Associe', [['la pierna', 'la jambe'], ['el brazo', 'le bras'], ['el pie', 'le pied'], ['la cabeza', 'la tête']]),
        order('Remets dans l’ordre : « J’ai de la fièvre et je tousse. »', 'Tengo fiebre y tos.', 'J’ai de la fièvre et je tousse.'),
        type('Traduis : « le médecin »', 'el médico'),
        type('Complète : Me ___ la cabeza.', 'duele'),
      ],
    },
    {
      id: 'es-a2-8',
      title: 'Estar + gérondif et périphrases',
      subtitle: 'estoy comiendo · acabo de · vuelvo a · sigo',
      duration: 30,
      objectives: ['Dire ce qu’on est en train de faire', 'Utiliser acabar de, volver a, seguir + gérondif'],
      sections: [
        {
          title: 'estar + gérondif',
          body: 'Gérondif : **-ar → -ando**, **-er / -ir → -iendo**. Irréguliers : leer → **leyendo**, dormir → **durmiendo**, decir → **diciendo**.',
          examples: ex(`
            Estoy comiendo. | Je suis en train de manger.
            ¿Qué estás haciendo? | Qu’est-ce que tu fais ?
            Los niños están durmiendo. | Les enfants dorment.
          `),
        },
        {
          title: 'Les périphrases utiles',
          table: table(`
            Périphrase | Sens | Exemple
            acabar de + inf. | venir de | Acabo de llegar.
            volver a + inf. | refaire | Vuelvo a intentarlo.
            seguir + gérondif | continuer à | Sigo estudiando español.
            dejar de + inf. | arrêter de | He dejado de fumar.
            empezar a + inf. | commencer à | Empieza a llover.
          `),
        },
      ],
      vocab: vocab(`
        acabar de | venir de
        volver a | refaire, recommencer
        seguir | continuer
        dejar de | arrêter de
        empezar a | commencer à
        llegar | arriver
        intentar | essayer
        durmiendo | en train de dormir
      `),
      exercises: [
        qcm('« Je suis en train de lire » :', 'Estoy leyendo.', ['Estoy leendo.', 'Soy leyendo.', 'Estoy leer.']),
        qcm('« Je viens d’arriver » :', 'Acabo de llegar.', ['Vengo de llegar.', 'Acabo llegar.', 'Estoy llegado.']),
        qcm('« J’ai arrêté de fumer » :', 'He dejado de fumar.', ['He parado fumar.', 'He dejado fumar.', 'Dejo a fumar.']),
        qcm('« Sigo estudiando » veut dire…', 'Je continue à étudier.', ['Je suis l’étudiant.', 'J’ai fini d’étudier.', 'Je recommence à étudier.']),
        match('Associe', [['volver a', 'refaire'], ['empezar a', 'commencer à'], ['dejar de', 'arrêter de'], ['acabar de', 'venir de']]),
        order('Remets dans l’ordre : « Qu’est-ce que tu fais ? »', '¿Qué estás haciendo?', 'Qu’est-ce que tu fais ?'),
        type('Gérondif de « dormir »', 'durmiendo'),
        type('Gérondif de « hablar »', 'hablando'),
      ],
    },
  ],
  'es-b1': [
    {
      id: 'es-b1-6',
      title: 'Le plus-que-parfait',
      subtitle: 'había comido · cuando llegué, ya se había ido',
      duration: 25,
      objectives: ['Former le plus-que-parfait', 'Situer une action antérieure dans un récit'],
      sections: [
        {
          title: 'haber à l’imparfait + participe',
          table: table(`
            Pronom | haber | + participe
            yo | había | comido
            tú | habías | visto
            él / ella | había | salido
            nosotros | habíamos | terminado
            ellos | habían | llegado
          `),
          examples: ex(`
            Cuando llegué, la película ya había empezado. | Quand je suis arrivé, le film avait déjà commencé.
            Nunca había visto el mar. | Je n’avais jamais vu la mer.
            Me dijo que había perdido las llaves. | Il m’a dit qu’il avait perdu les clés.
          `),
          tip: 'Mot-signal : **ya** (déjà) et **nunca… antes** (jamais auparavant).',
        },
      ],
      vocab: vocab(`
        ya | déjà
        antes | avant
        perder | perdre
        empezar | commencer
        el mar | la mer
        la llave | la clé
        todavía | encore
        irse | s’en aller
      `),
      exercises: [
        qcm('« J’avais mangé » :', 'Había comido.', ['He comido.', 'Comía.', 'Hube comido.']),
        qcm('« Quand je suis arrivé, il était parti » :', 'Cuando llegué, se había ido.', ['Cuando llegaba, se ha ido.', 'Cuando llegué, se iba.', 'Cuando había llegado, se fue.']),
        qcm('Le plus-que-parfait exprime…', 'une action antérieure à une autre action passée', ['une habitude', 'un futur', 'une action en cours']),
        qcm('« Nunca había visto el mar » veut dire…', 'Je n’avais jamais vu la mer.', ['Je ne verrai jamais la mer.', 'Je n’ai jamais vu la mer.', 'Je ne voyais jamais la mer.']),
        match('Associe', [['ya', 'déjà'], ['antes', 'avant'], ['perder', 'perdre'], ['la llave', 'la clé']]),
        order('Remets dans l’ordre : « Le film avait déjà commencé. »', 'La película ya había empezado.', 'Le film avait déjà commencé.'),
        type('Complète : Nosotros ___ terminado. (haber, imparfait)', 'habíamos'),
        type('Complète : Ellos ya ___ llegado.', 'habían'),
      ],
    },
    {
      id: 'es-b1-7',
      title: 'Les pronoms relatifs',
      subtitle: 'que · quien · donde · lo que · cuyo',
      duration: 30,
      objectives: ['Relier deux phrases', 'Utiliser lo que et cuyo'],
      sections: [
        {
          title: 'Les relatifs',
          table: table(`
            Relatif | Usage | Exemple
            que | le plus courant (qui, que) | El chico que vive aquí es médico.
            quien / quienes | personnes après une préposition | La persona con quien hablé…
            donde | lieu | La ciudad donde nací…
            lo que | ce qui, ce que | No entiendo lo que dices.
            cuyo / cuya | dont (possession) | El autor cuya novela leí…
          `),
          tip: '**cuyo** s’accorde avec ce qui est possédé : la mujer **cuyos** hijos…',
        },
      ],
      vocab: vocab(`
        que | qui, que
        quien | qui (personne)
        donde | où
        lo que | ce que
        cuyo | dont
        nacer | naître
        la novela | le roman
        el autor | l’auteur
      `),
      exercises: [
        qcm('« Je ne comprends pas ce que tu dis » :', 'No entiendo lo que dices.', ['No entiendo que dices.', 'No entiendo el que dices.', 'No entiendo qué dices lo.']),
        qcm('« La ville où je suis né » :', 'La ciudad donde nací', ['La ciudad que nací', 'La ciudad quien nací', 'La ciudad cuya nací']),
        qcm('« L’auteur dont j’ai lu le roman » :', 'El autor cuya novela leí', ['El autor cuyo novela leí', 'El autor que su novela leí', 'El autor donde novela leí']),
        qcm('« La personne avec qui j’ai parlé » :', 'La persona con quien hablé', ['La persona con que quien hablé', 'La persona quien hablé con', 'La persona donde hablé']),
        match('Associe', [['donde', 'lieu'], ['cuyo', 'possession'], ['lo que', 'ce que'], ['quien', 'personne']]),
        order('Remets dans l’ordre : « Le garçon qui habite ici est médecin. »', 'El chico que vive aquí es médico.', 'Le garçon qui habite ici est médecin.'),
        type('Complète : Haz ___ quieras. (ce que)', 'lo que'),
        type('Complète : El pueblo ___ vivo es pequeño. (où)', 'donde'),
      ],
    },
    {
      id: 'es-b1-8',
      title: 'Le monde du travail',
      subtitle: 'el currículum · la entrevista · el puesto',
      duration: 30,
      objectives: ['Parler de son métier', 'Réussir un entretien d’embauche', 'Écrire un e-mail simple'],
      sections: [
        {
          title: 'Vocabulaire du travail',
          table: table(`
            Espagnol | Sens
            el puesto de trabajo | le poste
            el sueldo | le salaire
            la empresa | l’entreprise
            el jefe / la jefa | le / la chef
            el compañero | le collègue
            la entrevista | l’entretien
            el currículum | le CV
            estar en paro | être au chômage
          `),
        },
        {
          title: 'Pendant l’entretien',
          examples: ex(`
            ¿Por qué quiere trabajar con nosotros? | Pourquoi voulez-vous travailler avec nous ?
            Tengo tres años de experiencia en ventas. | J’ai trois ans d’expérience dans la vente.
            Me considero una persona organizada. | Je me considère comme une personne organisée.
            ¿Cuándo podría empezar? | Quand pourriez-vous commencer ?
          `),
          tip: 'Au Mexique, le travail se dit souvent **la chamba** ; en Espagne, familier : **el curro**.',
        },
      ],
      vocab: vocab(`
        la empresa | l’entreprise
        el sueldo | le salaire
        el puesto | le poste
        la entrevista | l’entretien
        la experiencia | l’expérience
        el compañero | le collègue
        contratar | embaucher
        el paro | le chômage
      `),
      dialogue: dlg(`
        Entrevistadora: Hábleme de su experiencia. | Parlez-moi de votre expérience.
        Candidato: Trabajé dos años como recepcionista en un hotel. | J’ai travaillé deux ans comme réceptionniste dans un hôtel.
        Entrevistadora: ¿Habla idiomas? | Vous parlez des langues ?
        Candidato: Sí, francés, español e inglés. | Oui, français, espagnol et anglais.
      `),
      exercises: [
        qcm('« le salaire » :', 'el sueldo', ['el salario de paro', 'la paga de jefe', 'el suelo']),
        qcm('« estar en paro » veut dire…', 'être au chômage', ['être en pause', 'être à l’arrêt de bus', 'être en grève']),
        qcm('« contratar » veut dire…', 'embaucher', ['contracter une maladie', 'contredire', 'négocier']),
        qcm('« ¿Cuándo podría empezar? » veut dire…', 'Quand pourriez-vous commencer ?', ['Quand avez-vous commencé ?', 'Pourquoi commencer ?', 'Pouvez-vous finir ?']),
        match('Associe', [['la empresa', 'l’entreprise'], ['el puesto', 'le poste'], ['la entrevista', 'l’entretien'], ['el compañero', 'le collègue']]),
        order('Remets dans l’ordre : « J’ai trois ans d’expérience. »', 'Tengo tres años de experiencia.', 'J’ai trois ans d’expérience.'),
        type('Traduis : « le CV »', ['el currículum', 'el currículo']),
        type('Traduis : « l’entreprise »', 'la empresa'),
      ],
    },
  ],
  'es-b2': [
    {
      id: 'es-b2-6',
      title: 'Le subjonctif imparfait dans le récit',
      subtitle: 'quería que vinieras · me pidió que fuera',
      duration: 30,
      objectives: ['Appliquer la concordance des temps au subjonctif', 'Exprimer souhaits et demandes passés'],
      sections: [
        {
          title: 'Concordance',
          body: 'Si le verbe principal est au **passé** ou au **conditionnel**, la subordonnée au subjonctif passe à l’**imparfait du subjonctif**.',
          table: table(`
            Présent | Passé
            Quiero que vengas. | Quería que vinieras.
            Me pide que lo haga. | Me pidió que lo hiciera.
            Es importante que estudies. | Era importante que estudiaras.
            Me gusta que me llames. | Me gustaría que me llamaras.
          `),
          tip: 'Il existe une seconde forme en **-se** (viniese, hiciese), équivalente, plus fréquente à l’écrit en Espagne.',
        },
      ],
      vocab: vocab(`
        quería que | je voulais que
        me pidió que | il m’a demandé de
        vinieras | que tu viennes (imparf.)
        hiciera | que je fasse (imparf.)
        estudiaras | que tu étudies (imparf.)
        me gustaría que | j’aimerais que
        ojalá pudiera | si seulement je pouvais
        era necesario que | il fallait que
      `),
      exercises: [
        qcm('« Je voulais que tu viennes » :', 'Quería que vinieras.', ['Quería que vengas.', 'Quiero que vinieras.', 'Quería que venías.']),
        qcm('« Il m’a demandé de le faire » :', 'Me pidió que lo hiciera.', ['Me pidió que lo haga.', 'Me pidió hacerlo que.', 'Me pidió que lo hacía.']),
        qcm('« J’aimerais que tu m’appelles » :', 'Me gustaría que me llamaras.', ['Me gustaría que me llames.', 'Me gusta que me llamaras.', 'Me gustaría que me llamarías.']),
        qcm('Forme en -se de « viniera » :', 'viniese', ['venise', 'vinise', 'venisse']),
        match('Associe', [['quiero que vengas', 'quería que vinieras'], ['me pide que lo haga', 'me pidió que lo hiciera'], ['es importante que estudies', 'era importante que estudiaras']]),
        order('Remets dans l’ordre : « Il fallait que nous partions. »', 'Era necesario que nos fuéramos.', 'Il fallait que nous partions.'),
        type('Subjonctif imparfait de « estar » (yo)', 'estuviera'),
        type('Subjonctif imparfait de « decir » (tú)', 'dijeras'),
      ],
    },
    {
      id: 'es-b2-7',
      title: 'Futur antérieur et hypothèses',
      subtitle: 'habrá salido · serán las diez · habría sido',
      duration: 30,
      objectives: ['Former le futur antérieur', 'Exprimer une supposition avec le futur'],
      sections: [
        {
          title: 'Futur antérieur',
          body: '**habré, habrás, habrá, habremos, habréis, habrán + participe**. Action terminée avant un moment futur.',
          examples: ex(`
            Para junio habré terminado la carrera. | D’ici juin, j’aurai terminé mes études.
            Cuando llegues, ya habremos cenado. | Quand tu arriveras, nous aurons déjà dîné.
          `),
        },
        {
          title: 'Le futur de probabilité',
          body: 'En espagnol, le futur sert aussi à **supposer** : futur simple pour le présent, futur antérieur pour le passé, conditionnel pour un passé plus lointain.',
          examples: ex(`
            ¿Qué hora es? — Serán las diez. | Quelle heure est-il ? — Il doit être dix heures.
            No contesta. Habrá salido. | Il ne répond pas. Il a dû sortir.
            Tendría unos veinte años cuando se fue. | Il devait avoir une vingtaine d’années quand il est parti.
          `),
        },
      ],
      vocab: vocab(`
        habré terminado | j’aurai terminé
        habrá salido | il a dû sortir
        serán las diez | il doit être 10 h
        para junio | d’ici juin
        la carrera | les études (universitaires)
        contestar | répondre
        suponer | supposer
        quizás | peut-être
      `),
      exercises: [
        qcm('« D’ici juin, j’aurai fini » :', 'Para junio habré terminado.', ['Para junio he terminado.', 'Para junio terminaré habido.', 'Para junio había terminado.']),
        qcm('« Il doit être malade » (supposition) :', 'Estará enfermo.', ['Está enfermo seguro.', 'Estaba enfermo.', 'Ha estado enfermo.']),
        qcm('« Habrá salido » veut dire…', 'Il a dû sortir.', ['Il sortira.', 'Il est sorti hier.', 'Il faut sortir.']),
        qcm('« Serán las diez » veut dire…', 'Il doit être dix heures.', ['Ils seront dix.', 'Il sera dix heures demain.', 'Ce sont dix heures.']),
        match('Associe', [['suponer', 'supposer'], ['contestar', 'répondre'], ['la carrera', 'les études'], ['quizás', 'peut-être']]),
        order('Remets dans l’ordre : « Quand tu arriveras, nous aurons dîné. »', 'Cuando llegues, habremos cenado.', 'Quand tu arriveras, nous aurons dîné.'),
        type('Futur antérieur : ellos ___ llegado.', 'habrán'),
        type('Futur de « tener » (él) pour une supposition', 'tendrá'),
      ],
    },
    {
      id: 'es-b2-8',
      title: 'Débattre : accord et désaccord',
      subtitle: 'estoy de acuerdo · no comparto · depende',
      duration: 30,
      objectives: ['Exprimer l’accord, le désaccord, la nuance', 'Parler des médias et de l’actualité'],
      sections: [
        {
          title: 'Réagir à une opinion',
          table: table(`
            Espagnol | Sens
            Estoy totalmente de acuerdo. | Je suis tout à fait d’accord.
            Tienes toda la razón. | Tu as entièrement raison.
            No comparto tu opinión. | Je ne partage pas ton avis.
            Depende de cómo lo mires. | Ça dépend de comment on voit les choses.
            Hasta cierto punto… | Jusqu’à un certain point…
            Eso no tiene nada que ver. | Ça n’a rien à voir.
          `),
        },
        {
          title: 'Les médias',
          examples: ex(`
            Según las noticias, el paro ha bajado. | D’après les informations, le chômage a baissé.
            Las redes sociales influyen mucho en los jóvenes. | Les réseaux sociaux influencent beaucoup les jeunes.
            Hay que contrastar la información. | Il faut vérifier l’information.
          `),
          tip: 'Au DELE B2, on te demande de défendre une position : utilise **por un lado… por otro**, **sin embargo**, **en mi opinión**.',
        },
      ],
      vocab: vocab(`
        estar de acuerdo | être d’accord
        compartir | partager
        depender | dépendre
        las noticias | les informations
        las redes sociales | les réseaux sociaux
        el periódico | le journal
        según | selon
        influir | influencer
      `),
      exercises: [
        qcm('« Je ne partage pas ton avis » :', 'No comparto tu opinión.', ['No parto tu opinión.', 'No estoy tu opinión.', 'No comparo tu opinión.']),
        qcm('« Ça dépend » :', 'Depende.', ['Es depende.', 'Está dependido.', 'Dependo.']),
        qcm('« Eso no tiene nada que ver » veut dire…', 'Ça n’a rien à voir.', ['Je n’ai rien vu.', 'Il n’y a rien à voir.', 'Ça ne se voit pas.']),
        qcm('« según » veut dire…', 'selon', ['second', 'sans', 'sûrement']),
        match('Associe', [['las noticias', 'les informations'], ['el periódico', 'le journal'], ['las redes sociales', 'les réseaux sociaux'], ['influir', 'influencer']]),
        order('Remets dans l’ordre : « Je suis tout à fait d’accord. »', 'Estoy totalmente de acuerdo.', 'Je suis tout à fait d’accord.'),
        type('Complète : Tienes toda la ___. (raison)', 'razón'),
        type('Traduis : « le journal » (quotidien)', 'el periódico'),
      ],
    },
  ],
  'es-c1': [
    {
      id: 'es-c1-6',
      title: 'Diminutifs et augmentatifs',
      subtitle: '-ito · -illo · -ón · -azo',
      duration: 25,
      objectives: ['Former et comprendre les diminutifs', 'Reconnaître les augmentatifs et leur nuance'],
      sections: [
        {
          title: 'Les diminutifs : petitesse et affection',
          body: '**-ito / -ita** est le plus courant (casa → casita). **-illo** est typique d’Andalousie, **-ico** d’Aragon et de certains pays d’Amérique. Le diminutif exprime souvent la **tendresse** : abuelita, cafecito.',
          examples: ex(`
            un momentito | un petit instant
            ahorita | tout de suite (Mexique)
            un cafecito | un petit café
            mi hermanita | ma petite sœur
          `),
        },
        {
          title: 'Les augmentatifs',
          table: table(`
            Suffixe | Nuance | Exemple
            -ón / -ona | grand, parfois péjoratif | un cabezón (une grosse tête, un têtu)
            -azo | grand ou coup | un golazo (un superbe but), un portazo (un claquement de porte)
            -ote | grand, familier | grandote
          `),
        },
      ],
      vocab: vocab(`
        un momentito | un petit instant
        la casita | la maisonnette
        el cafecito | le petit café
        cabezón | têtu
        el golazo | le but magnifique
        el portazo | le claquement de porte
        la abuelita | la mamie
        grandote | très grand
      `),
      exercises: [
        qcm('Diminutif de « casa » :', 'casita', ['casilla ita', 'casona', 'casazo']),
        qcm('« un portazo » est…', 'un claquement de porte', ['une grande porte', 'un portier', 'une petite porte']),
        qcm('« ahorita » au Mexique :', 'tout de suite (ou bientôt)', ['il y a longtemps', 'jamais', 'maintenant exactement à la seconde']),
        qcm('Le diminutif exprime souvent…', 'l’affection', ['la colère', 'le mépris', 'la politesse formelle']),
        match('Associe', [['cabezón', 'têtu'], ['golazo', 'superbe but'], ['abuelita', 'mamie'], ['grandote', 'très grand']]),
        order('Remets dans l’ordre : « Attends un petit instant. »', 'Espera un momentito.', 'Attends un petit instant.'),
        type('Diminutif de « café »', 'cafecito'),
        type('Diminutif de « perro »', ['perrito', 'perrillo']),
      ],
    },
    {
      id: 'es-c1-7',
      title: 'Verbes de changement et expressions verbales',
      subtitle: 'ponerse · volverse · hacerse · echar de menos',
      duration: 30,
      objectives: ['Traduire « devenir » selon le contexte', 'Maîtriser les expressions verbales courantes'],
      sections: [
        {
          title: 'Devenir',
          table: table(`
            Verbe | Changement | Exemple
            ponerse | passager (émotion, apparence) | Se puso rojo.
            volverse | profond, souvent soudain | Se volvió loco.
            hacerse | volontaire, progressif | Se hizo médico.
            llegar a ser | après un long effort | Llegó a ser presidente.
            quedarse | résultat (souvent négatif) | Se quedó ciego.
          `),
        },
        {
          title: 'Expressions verbales',
          examples: ex(`
            Te echo de menos. | Tu me manques.
            Me di cuenta de mi error. | Je me suis rendu compte de mon erreur.
            Tengo ganas de verte. | J’ai envie de te voir.
            Hace falta más tiempo. | Il faut plus de temps.
            Se me olvidó. | J’ai oublié (ça m’est sorti de la tête).
          `),
        },
      ],
      vocab: vocab(`
        ponerse | devenir (passager)
        volverse | devenir (profond)
        hacerse | devenir (volontaire)
        echar de menos | manquer (quelqu’un)
        darse cuenta | se rendre compte
        tener ganas de | avoir envie de
        hacer falta | falloir, manquer
        quedarse | rester, devenir
      `),
      exercises: [
        qcm('« Il est devenu rouge (de honte) » :', 'Se puso rojo.', ['Se volvió rojo.', 'Se hizo rojo.', 'Llegó a ser rojo.']),
        qcm('« Elle est devenue avocate » :', 'Se hizo abogada.', ['Se puso abogada.', 'Se quedó abogada.', 'Se volvió abogada rápido.']),
        qcm('« Tu me manques » :', 'Te echo de menos.', ['Me faltas mucho de menos.', 'Te echo menos.', 'Me echo de ti.']),
        qcm('« Me di cuenta » veut dire…', 'Je me suis rendu compte.', ['J’ai donné le compte.', 'Je me suis donné.', 'J’ai compté.']),
        match('Associe', [['tener ganas de', 'avoir envie de'], ['hacer falta', 'falloir'], ['darse cuenta', 'se rendre compte'], ['echar de menos', 'manquer']]),
        order('Remets dans l’ordre : « J’ai envie de te voir. »', 'Tengo ganas de verte.', 'J’ai envie de te voir.'),
        type('Complète : Se ___ loco. (volverse, passé)', 'volvió'),
        type('Complète : Te echo de ___.', 'menos'),
      ],
    },
    {
      id: 'es-c1-8',
      title: 'Proverbes et culture',
      subtitle: 'refranes · más vale tarde que nunca',
      duration: 25,
      objectives: ['Comprendre les proverbes (refranes) les plus cités', 'Les utiliser à bon escient'],
      sections: [
        {
          title: 'Les refranes incontournables',
          table: table(`
            Refrán | Sens
            Más vale tarde que nunca. | Mieux vaut tard que jamais.
            En boca cerrada no entran moscas. | La parole est d’argent, le silence est d’or.
            Dime con quién andas y te diré quién eres. | Dis-moi qui tu fréquentes, je te dirai qui tu es.
            A quien madruga, Dios le ayuda. | L’avenir appartient à ceux qui se lèvent tôt.
            No hay mal que por bien no venga. | À quelque chose malheur est bon.
            Más vale pájaro en mano que ciento volando. | Un tiens vaut mieux que deux tu l’auras.
          `),
          tip: 'On cite souvent seulement le début : « **Más vale tarde…** » suffit.',
        },
      ],
      vocab: vocab(`
        el refrán | le proverbe
        madrugar | se lever tôt
        la mosca | la mouche
        el pájaro | l’oiseau
        valer | valoir
        andar | marcher, fréquenter
        el mal | le mal, le malheur
        volar | voler (dans les airs)
      `),
      exercises: [
        qcm('« Más vale tarde que nunca » :', 'Mieux vaut tard que jamais.', ['Il vaut mieux partir tôt.', 'Le temps, c’est de l’argent.', 'Jamais deux sans trois.']),
        qcm('« A quien madruga, Dios le ayuda » :', 'L’avenir appartient à ceux qui se lèvent tôt.', ['Aide-toi, le ciel t’aidera.', 'Dieu aide les pauvres.', 'Qui dort dîne.']),
        qcm('« En boca cerrada no entran moscas » conseille de…', 'se taire', ['manger lentement', 'fermer la fenêtre', 'parler franchement']),
        qcm('« No hay mal que por bien no venga » :', 'À quelque chose malheur est bon.', ['Le mal est partout.', 'Rien ne va plus.', 'Qui sème le vent récolte la tempête.']),
        match('Associe', [['madrugar', 'se lever tôt'], ['la mosca', 'la mouche'], ['el pájaro', 'l’oiseau'], ['el refrán', 'le proverbe']]),
        order('Remets dans l’ordre le proverbe : « Mieux vaut tard que jamais. »', 'Más vale tarde que nunca.', 'Mieux vaut tard que jamais.'),
        type('Complète : Dime con quién ___ y te diré quién eres.', 'andas'),
        type('Complète : Más vale pájaro en ___ que ciento volando.', 'mano'),
      ],
    },
  ],
}
