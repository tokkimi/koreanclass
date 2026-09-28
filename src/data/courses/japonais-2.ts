import type { Level } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

export const jaN4: Level = {
  id: 'ja-n4',
  index: 2,
  name: 'Niveau 2 — Élémentaire',
  korean: 'しょきゅう２',
  cefr: 'A2',
  topik: 'JLPT N4',
  color: '#a61e4d',
  description:
    'Raconter au passé, demander un service avec la forme en て, parler de ce qu’on veut faire, lire tes premiers kanji et échanger des cadeaux. Tu passes de phrases isolées à de vraies petites conversations.',
  lessons: [
    {
      id: 'ja-n4-1',
      title: 'Le passé poli',
      subtitle: '〜ました · 〜ませんでした · 〜でした',
      duration: 25,
      objectives: ['Mettre un verbe au passé poli', 'Mettre です et les adjectifs au passé'],
      sections: [
        {
          title: 'Verbes : ます → ました',
          table: table(`
            Présent | Passé | Passé négatif
            たべます | たべました | たべませんでした
            いきます | いきました | いきませんでした
            します | しました | しませんでした
          `),
        },
        {
          title: 'Adjectifs et です au passé',
          body: 'Adjectif en い : い → **かったです** (たかい → たかかったです). Adjectif en な et nom : です → **でした** (しずかでした, あめでした).',
          examples: ex(`
            きのう えいがを みました。| kinō eiga o mimashita | Hier, j’ai vu un film.
            えいがは おもしろかったです。| eiga wa omoshirokatta desu | Le film était intéressant.
            ホテルは きれいでした。| hoteru wa kirei deshita | L’hôtel était propre.
            きのうは あめでした。| kinō wa ame deshita | Hier, il pleuvait.
          `),
          tip: 'いい au passé devient **よかったです** : 「りょこうは どうでしたか。」「とても よかったです。」',
        },
      ],
      vocab: vocab(`
        きのう | kinō | hier
        せんしゅう | senshū | la semaine dernière
        えいが | eiga | film
        りょこう | ryokō | voyage
        あめ | ame | pluie
        おもしろい | omoshiroi | intéressant, drôle
        たのしい | tanoshii | amusant, agréable
        どうでしたか | dō deshita ka | comment c’était ?
      `),
      dialogue: dlg(`
        ゆき: しゅうまつ、なにを しましたか。| Qu’as-tu fait ce week-end ?
        レア: ともだちと おおさかへ いきました。| Je suis allée à Osaka avec des amis.
        ゆき: どうでしたか。| C’était comment ?
        レア: とても たのしかったです。たこやきも たべました。| Très sympa. On a aussi mangé des takoyaki.
      `),
      exercises: [
        qcm('Passé de « のみます » ?', 'のみました', ['のみません', 'のみましたか', 'のんだです']),
        qcm('Passé de « たのしい » (poli) ?', 'たのしかったです', ['たのしいでした', 'たのしでした', 'たのしくないです']),
        qcm('Passé de « きれいです » ?', 'きれいでした', ['きれいかったです', 'きれくかったです', 'きれいました']),
        type('Passé négatif poli de « いきます »', 'いきませんでした'),
        order('Remets dans l’ordre : « Hier, j’ai vu un film. »', 'きのう えいがを みました', 'Hier, j’ai vu un film.'),
        qcm('« いい » au passé poli ?', 'よかったです', ['いかったです', 'いいでした', 'よいでした']),
      ],
    },
    {
      id: 'ja-n4-2',
      title: 'La forme en て',
      subtitle: '〜てください · 〜ています · 〜てもいいですか',
      duration: 35,
      objectives: ['Former la forme en て', 'Demander poliment', 'Dire ce qu’on est en train de faire'],
      sections: [
        {
          title: 'Trois groupes de verbes',
          body: '**Groupe 2** (ichidan, souvent en -eru/-iru) : on enlève る → たべる → **たべて**. **Groupe 1** (godan) : la terminaison change selon la dernière syllabe. **Irréguliers** : する → **して**, くる → **きて**.',
          table: table(`
            Terminaison | Forme て | Exemple
            う つ る | って | かう → かって (acheter)
            む ぶ ぬ | んで | よむ → よんで (lire)
            く | いて | かく → かいて (écrire)
            ぐ | いで | およぐ → およいで (nager)
            す | して | はなす → はなして (parler)
          `),
          tip: 'Exception à retenir : いく → **いって** (aller).',
        },
        {
          title: 'Usages de base',
          examples: ex(`
            ちょっと まって ください。| chotto matte kudasai | Attendez un instant, s’il vous plaît.
            いま ごはんを たべて います。| ima gohan o tabete imasu | Je suis en train de manger.
            とうきょうに すんで います。| tōkyō ni sunde imasu | J’habite à Tokyo.
            しゃしんを とっても いいですか。| shashin o tottemo ii desu ka | Je peux prendre une photo ?
            ここで たばこを すっては いけません。| koko de tabako o sutte wa ikemasen | Interdit de fumer ici.
          `),
        },
      ],
      vocab: vocab(`
        まつ | matsu | attendre
        よむ | yomu | lire
        かく | kaku | écrire
        はなす | hanasu | parler
        すむ | sumu | habiter
        とる | toru | prendre (photo)
        あける | akeru | ouvrir
        ちょっと | chotto | un peu, un instant
      `),
      dialogue: dlg(`
        トム: すみません、もう いちど いって ください。| Pardon, pouvez-vous répéter ?
        店員: この かみに なまえを かいて ください。| Écrivez votre nom sur ce papier, s’il vous plaît.
        トム: えんぴつを つかっても いいですか。| Je peux utiliser un crayon ?
        店員: はい、どうぞ。| Oui, allez-y.
      `),
      exercises: [
        qcm('Forme て de « たべる » ?', 'たべて', ['たべって', 'たべいて', 'たべんで']),
        qcm('Forme て de « よむ » ?', 'よんで', ['よって', 'よみて', 'よいで']),
        qcm('Forme て de « いく » ?', 'いって', ['いいて', 'いきて', 'いんで']),
        qcm('« たべて います » veut dire…', 'je suis en train de manger', ['mangez, s’il vous plaît', 'j’ai mangé', 'je peux manger ?']),
        type('Forme て de « かく » (écrire)', 'かいて'),
        order('Remets dans l’ordre : « Attendez un instant, s’il vous plaît. »', 'ちょっと まって ください', 'Attendez un instant, s’il vous plaît.'),
      ],
    },
    {
      id: 'ja-n4-3',
      title: 'Forme du dictionnaire, forme ない et envies',
      subtitle: 'たべる · たべない · たべたい',
      duration: 30,
      objectives: ['Reconnaître la forme du dictionnaire', 'Former la forme ない', 'Dire ce qu’on veut faire avec 〜たい'],
      sections: [
        {
          title: 'La forme ない (négatif neutre)',
          body: 'Groupe 2 : る → **ない** (たべる → たべない). Groupe 1 : la voyelle finale **u → a** + ない (かく → かかない, のむ → のまない). Attention : う → **わ**ない (かう → かわない). する → しない, くる → こない.',
          examples: ex(`
            にくを たべないで ください。| niku o tabenaide kudasai | Ne mangez pas de viande, s’il vous plaît.
            あした はやく おきなければ なりません。| ashita hayaku okinakereba narimasen | Demain, je dois me lever tôt.
          `),
        },
        {
          title: 'Vouloir faire : 〜たい',
          body: 'Radical du verbe (forme ます sans ます) + **たい** : いきます → **いきたい**. Ça se conjugue comme un adjectif en い : いきたくない (je ne veux pas y aller).',
          examples: ex(`
            にほんへ いきたいです。| nihon e ikitai desu | Je veux aller au Japon.
            なにが たべたいですか。| nani ga tabetai desu ka | Qu’est-ce que tu veux manger ?
            きょうは なにも したくないです。| kyō wa nani mo shitakunai desu | Aujourd’hui, je ne veux rien faire.
          `),
        },
      ],
      vocab: vocab(`
        はやく | hayaku | tôt, vite
        にく | niku | viande
        やさい | yasai | légumes
        かう | kau | acheter
        あそぶ | asobu | s’amuser
        やすむ | yasumu | se reposer
        つくる | tsukuru | fabriquer, cuisiner
        ほしい | hoshii | vouloir (un objet)
      `),
      dialogue: dlg(`
        ゆき: なつやすみは なにを したいですか。| Que veux-tu faire pendant les vacances d’été ?
        トム: うみで およぎたいです。ゆきさんは？| Je veux nager à la mer. Et toi ?
        ゆき: わたしは うちで やすみたいです。| Moi, je veux me reposer à la maison.
      `),
      exercises: [
        qcm('Forme ない de « のむ » ?', 'のまない', ['のむない', 'のみない', 'のめない']),
        qcm('Forme ない de « かう » ?', 'かわない', ['かあない', 'かない', 'かいない']),
        qcm('Forme ない de « くる » ?', 'こない', ['くない', 'きない', 'くらない']),
        qcm('« いきたいです » veut dire…', 'je veux y aller', ['j’y suis allé', 'j’y vais', 'allons-y']),
        type('Transforme « たべます » en « je veux manger » (sans です)', 'たべたい'),
        match('Associe', [['やすむ', 'se reposer'], ['あそぶ', 's’amuser'], ['つくる', 'fabriquer'], ['かう', 'acheter']]),
      ],
    },
    {
      id: 'ja-n4-4',
      title: 'Tes premiers kanji',
      subtitle: '日 月 火 水 木 金 土 · 人 大 小 山 川',
      duration: 30,
      objectives: ['Lire les jours de la semaine', 'Comprendre lecture on / kun', 'Lire 15 kanji de base'],
      sections: [
        {
          title: 'Un kanji, plusieurs lectures',
          body: 'Chaque kanji a en général une **lecture japonaise** (kun’yomi, souvent seule) et une **lecture chinoise** (on’yomi, souvent dans les composés). 人 : **ひと** (une personne) mais **じん** dans フランス人.',
        },
        {
          title: 'Les jours de la semaine',
          table: table(`
            Kanji | Lecture | Sens | Élément
            月曜日 | げつようび | lundi | lune
            火曜日 | かようび | mardi | feu
            水曜日 | すいようび | mercredi | eau
            木曜日 | もくようび | jeudi | arbre
            金曜日 | きんようび | vendredi | or, métal
            土曜日 | どようび | samedi | terre
            日曜日 | にちようび | dimanche | soleil
          `),
        },
        {
          title: 'Kanji du quotidien',
          examples: ex(`
            山 | やま | montagne
            川 | かわ | rivière
            大きい | おおきい | grand
            小さい | ちいさい | petit
            日本 | にほん | Japon
            先生 | せんせい | professeur
          `),
        },
      ],
      vocab: vocab(`
        月曜日 | げつようび | lundi
        金曜日 | きんようび | vendredi
        日曜日 | にちようび | dimanche
        人 | ひと | personne
        山 | やま | montagne
        川 | かわ | rivière
        水 | みず | eau
        日本 | にほん | Japon
      `),
      exercises: [
        qcm('Que veut dire « 水曜日 » ?', 'mercredi', ['lundi', 'jeudi', 'samedi']),
        qcm('Comment se lit « 山 » seul ?', 'やま', ['さん', 'かわ', 'ひと']),
        qcm('Quel kanji veut dire « feu » ?', '火', ['水', '木', '土']),
        match('Associe', [['月', 'lune'], ['木', 'arbre'], ['金', 'or, métal'], ['日', 'soleil, jour']]),
        type('Écris en hiragana la lecture de « 日本 »', 'にほん'),
        qcm('Dans « フランス人 », 人 se lit…', 'じん', ['ひと', 'にん', 'びと']),
      ],
    },
    {
      id: 'ja-n4-5',
      title: 'Donner, recevoir et énumérer',
      subtitle: 'あげる · くれる · もらう · 〜たり〜たり',
      duration: 30,
      objectives: ['Choisir entre あげる, くれる, もらう', 'Énumérer des activités'],
      sections: [
        {
          title: 'Trois verbes selon le point de vue',
          table: table(`
            Verbe | Sens | Exemple
            あげる | donner (moi → autre) | ともだちに はなを あげました。
            くれる | donner (autre → moi) | ともだちが はなを くれました。
            もらう | recevoir | ともだちに はなを もらいました。
          `),
          tip: 'Avec la forme て, ces verbes parlent de **services rendus** : しゅくだいを てつだって くれました (il m’a aidé pour mes devoirs).',
        },
        {
          title: 'Faire des choses comme… : 〜たり〜たり します',
          body: 'Pour donner des exemples d’activités, on met les verbes au passé neutre + **り**, et on finit par します.',
          examples: ex(`
            やすみの ひは えいがを みたり、ほんを よんだり します。| yasumi no hi wa eiga o mitari, hon o yondari shimasu | Mes jours de repos, je regarde des films, je lis…
          `),
        },
      ],
      vocab: vocab(`
        プレゼント | purezento | cadeau
        はな | hana | fleurs
        たんじょうび | tanjōbi | anniversaire
        てつだう | tetsudau | aider
        おしえる | oshieru | enseigner
        かす | kasu | prêter
        かりる | kariru | emprunter
        ともだち | tomodachi | ami(e)
      `),
      dialogue: dlg(`
        ゆき: その とけい、すてきですね。| Elle est jolie, cette montre.
        レア: たんじょうびに ははが くれました。| Ma mère me l’a offerte pour mon anniversaire.
        ゆき: いいですね。わたしは ちちに ほんを もらいました。| Super. Moi, mon père m’a offert un livre.
      `),
      exercises: [
        qcm('« Mon ami m’a donné des fleurs » : quel verbe ?', 'くれました', ['あげました', 'もらいました', 'かしました']),
        qcm('« J’ai offert un cadeau à Yuki » : quel verbe ?', 'あげました', ['くれました', 'もらいました', 'かりました']),
        qcm('« 〜たり〜たり します » sert à…', 'donner des exemples d’activités', ['exprimer une obligation', 'demander une permission', 'parler au futur']),
        match('Associe', [['かす', 'prêter'], ['かりる', 'emprunter'], ['おしえる', 'enseigner'], ['てつだう', 'aider']]),
        order('Remets dans l’ordre : « J’ai reçu un cadeau de mon ami. »', 'ともだちに プレゼントを もらいました', 'J’ai reçu un cadeau de mon ami.'),
        type('Complète : ははが とけいを ___。(ma mère m’a offert une montre — passé poli)', 'くれました'),
      ],
    },
  ],
  test: [
    qcm('Passé poli de « みます » ?', 'みました', ['みませんでした', 'みた', 'みましたか']),
    qcm('Passé poli de « さむい » ?', 'さむかったです', ['さむいでした', 'さむくないです', 'さむかったでした']),
    qcm('Forme て de « かう » ?', 'かって', ['かいて', 'かんで', 'かうて']),
    qcm('Forme て de « はなす » ?', 'はなして', ['はなって', 'はないて', 'はなすて']),
    qcm('« ここで しゃしんを とっても いいですか » veut dire…', 'Je peux prendre une photo ici ?', ['Prenez une photo ici.', 'Il est interdit de photographier.', 'J’ai pris une photo ici.']),
    qcm('Forme ない de « する » ?', 'しない', ['すない', 'さない', 'せない']),
    qcm('Que veut dire « 土曜日 » ?', 'samedi', ['dimanche', 'vendredi', 'mardi']),
    qcm('« せんせいが おしえて くれました » veut dire…', 'Le professeur m’a appris (gentiment).', ['J’ai appris au professeur.', 'Le professeur a appris.', 'J’ai enseigné.']),
    match('Associe', [['月', 'lune'], ['火', 'feu'], ['水', 'eau'], ['木', 'arbre']]),
    order('Remets dans l’ordre : « Je veux aller au Japon. »', 'にほんへ いきたい です', 'Je veux aller au Japon.'),
    type('Forme て de « たべる »', 'たべて'),
    type('Forme ない de « いく »', 'いかない'),
  ],
}

export const jaN3: Level = {
  id: 'ja-n3',
  index: 3,
  name: 'Niveau 3 — Intermédiaire',
  korean: 'ちゅうきゅう',
  cefr: 'B1',
  topik: 'JLPT N3',
  color: '#862e9c',
  description:
    'Parler naturellement entre amis avec la forme neutre, poser des conditions, dire ce qu’on peut faire, faire des projets, utiliser le passif et nuancer avec « on dirait que ». C’est le niveau des vraies conversations.',
  lessons: [
    {
      id: 'ja-n3-1',
      title: 'La forme neutre et le style familier',
      subtitle: 'たべる · たべた · たべなかった · だ',
      duration: 30,
      objectives: ['Conjuguer à la forme neutre', 'Parler de façon familière', 'Comprendre quand l’utiliser'],
      sections: [
        {
          title: 'Poli ↔ neutre',
          body: 'Entre amis, en famille, et **dans les phrases subordonnées**, on utilise la forme neutre (普通形). です devient **だ** (souvent omis à l’oral).',
          table: table(`
            Poli | Neutre | Sens
            たべます | たべる | je mange
            たべません | たべない | je ne mange pas
            たべました | たべた | j’ai mangé
            たべませんでした | たべなかった | je n’ai pas mangé
            がくせいです | がくせいだ | c’est un étudiant
          `),
        },
        {
          title: 'À l’oral',
          examples: ex(`
            あした ひま？| ashita hima? | T’es libre demain ?
            うん、ひまだよ。| un, hima da yo | Ouais, je suis libre.
            もう たべた？| mō tabeta? | T’as déjà mangé ?
            ううん、まだ。| uun, mada | Non, pas encore.
          `),
          tip: 'Les particules de fin **よ** (j’informe) et **ね** (n’est-ce pas) rendent la conversation vivante.',
        },
      ],
      vocab: vocab(`
        ひま | hima | libre, disponible
        いそがしい | isogashii | occupé
        うん | un | ouais (familier)
        ううん | uun | non (familier)
        もう | mō | déjà
        まだ | mada | pas encore
        いっしょに | issho ni | ensemble
        だいじょうぶ | daijōbu | ça va, pas de problème
      `),
      dialogue: dlg(`
        けん: ねえ、こんど の どようび、ひま？| Dis, t’es libre samedi prochain ?
        ゆき: うん、ひまだよ。どうして？| Oui, je suis libre. Pourquoi ?
        けん: いっしょに えいが みない？| On va voir un film ensemble ?
        ゆき: いいね！| Bonne idée !
      `),
      exercises: [
        qcm('Forme neutre de « たべませんでした » ?', 'たべなかった', ['たべない', 'たべた', 'たべませんだ']),
        qcm('Forme neutre de « いきました » ?', 'いった', ['いきた', 'いいた', 'いきった']),
        qcm('Forme neutre de « がくせいです » ?', 'がくせいだ', ['がくせいる', 'がくせいな', 'がくせいする']),
        qcm('« もう たべた？ » veut dire…', 'Tu as déjà mangé ?', ['Tu veux manger ?', 'Mange encore !', 'Tu ne manges pas ?']),
        type('Forme neutre de « のみません »', 'のまない'),
        match('Associe', [['うん', 'ouais'], ['ううん', 'non'], ['まだ', 'pas encore'], ['もう', 'déjà']]),
      ],
    },
    {
      id: 'ja-n3-2',
      title: 'Les conditions',
      subtitle: '〜と · 〜ば · 〜たら · 〜なら',
      duration: 35,
      objectives: ['Distinguer les 4 conditionnels', 'Choisir le plus naturel à l’oral'],
      sections: [
        {
          title: 'Quatre façons de dire « si »',
          table: table(`
            Forme | Usage | Exemple
            〜と | conséquence automatique | はるに なると、さくらが さきます。
            〜ば | condition générale | やすければ、かいます。
            〜たら | « si / quand » (le plus polyvalent) | えきに ついたら、でんわして ください。
            〜なら | « si c’est le cas » (reprend ce que dit l’autre) | きょうとへ いくなら、きんかくじが いいですよ。
          `),
          tip: 'Dans le doute, **〜たら** marche presque toujours à l’oral.',
        },
        {
          title: 'Formation',
          body: '**たら** : passé neutre + ら (たべた → たべたら). **ば** : u → **eba** (いく → いけば), adjectif い → **ければ** (やすい → やすければ).',
          examples: ex(`
            あめが ふったら、いきません。| ame ga futtara, ikimasen | S’il pleut, je n’y vais pas.
            じかんが あれば、てつだいます。| jikan ga areba, tetsudaimasu | Si j’ai le temps, je t’aide.
          `),
        },
      ],
      vocab: vocab(`
        さくら | sakura | cerisier en fleurs
        さく | saku | fleurir
        つく | tsuku | arriver
        ふる | furu | tomber (pluie)
        じかん | jikan | temps
        でんわする | denwa suru | téléphoner
        やすい | yasui | bon marché
        おすすめ | osusume | recommandation
      `),
      dialogue: dlg(`
        トム: らいしゅう、ほっかいどうへ いきます。| Je vais à Hokkaidō la semaine prochaine.
        ゆき: ほっかいどうへ いくなら、ラーメンを たべて ください！| Si tu vas à Hokkaidō, mange des ramen !
        トム: じかんが あれば、さっぽろにも いきたいです。| Si j’ai le temps, je veux aussi aller à Sapporo.
      `),
      exercises: [
        qcm('Quel conditionnel exprime une conséquence automatique ?', '〜と', ['〜なら', '〜たら', '〜ても']),
        qcm('Forme ば de « いく » ?', 'いけば', ['いくば', 'いきば', 'いかば']),
        qcm('Forme ば de « やすい » ?', 'やすければ', ['やすいば', 'やすくば', 'やすいなら']),
        qcm('« えきに ついたら、でんわして » veut dire…', 'Quand tu arrives à la gare, appelle-moi.', ['Si tu téléphones, va à la gare.', 'J’ai appelé depuis la gare.', 'Je suis arrivé à la gare.']),
        type('Forme たら de « たべる »', 'たべたら'),
        order('Remets dans l’ordre : « S’il pleut, je n’y vais pas. »', 'あめが ふったら いきません', 'S’il pleut, je n’y vais pas.'),
      ],
    },
    {
      id: 'ja-n3-3',
      title: 'Pouvoir et projeter',
      subtitle: 'たべられる · いこう · 〜つもり',
      duration: 30,
      objectives: ['Dire ce qu’on sait / peut faire', 'Proposer « allons-y »', 'Parler de ses intentions'],
      sections: [
        {
          title: 'La forme potentielle',
          body: 'Groupe 2 : る → **られる** (たべる → たべられる). Groupe 1 : u → **eru** (はなす → はなせる). する → **できる**, くる → こられる. L’objet prend souvent **が**.',
          examples: ex(`
            にほんごが はなせます。| nihongo ga hanasemasu | Je sais parler japonais.
            さしみが たべられますか。| sashimi ga taberaremasu ka | Tu peux manger des sashimis ?
            ピアノが できます。| piano ga dekimasu | Je sais jouer du piano.
          `),
        },
        {
          title: 'Volitif et intention',
          body: 'Forme volitive : **いこう** (allons-y), **たべよう** (mangeons). Poli : いきましょう. Avec **と おもって います** : « je pense faire ». **つもり** exprime une intention ferme.',
          examples: ex(`
            いっしょに かえろう。| issho ni kaerō | Rentrons ensemble.
            らいねん、にほんで はたらこうと おもって います。| rainen, nihon de hatarakō to omotte imasu | Je pense travailler au Japon l’an prochain.
            なつに ひっこす つもりです。| natsu ni hikkosu tsumori desu | J’ai l’intention de déménager cet été.
          `),
        },
      ],
      vocab: vocab(`
        できる | dekiru | pouvoir, savoir faire
        はたらく | hataraku | travailler
        かえる | kaeru | rentrer
        ひっこす | hikkosu | déménager
        らいねん | rainen | l’an prochain
        つもり | tsumori | intention
        うんてん | unten | conduite
        およぐ | oyogu | nager
      `),
      exercises: [
        qcm('Forme potentielle de « はなす » ?', 'はなせる', ['はなられる', 'はなさせる', 'はなしれる']),
        qcm('Forme potentielle de « する » ?', 'できる', ['しられる', 'される', 'すれる']),
        qcm('Forme volitive de « たべる » ?', 'たべよう', ['たべろう', 'たべおう', 'たべましょ']),
        qcm('« ひっこす つもりです » exprime…', 'une intention', ['une obligation', 'une interdiction', 'une supposition']),
        type('Forme volitive de « いく »', 'いこう'),
        match('Associe', [['はたらく', 'travailler'], ['かえる', 'rentrer'], ['ひっこす', 'déménager'], ['およぐ', 'nager']]),
      ],
    },
    {
      id: 'ja-n3-4',
      title: 'Le passif',
      subtitle: '〜られる · 〜に〜される',
      duration: 30,
      objectives: ['Former le passif', 'Comprendre le « passif de désagrément »'],
      sections: [
        {
          title: 'Formation',
          body: 'Groupe 2 : る → **られる** (même forme que le potentiel !). Groupe 1 : u → **areru** (よむ → よまれる, いう → いわれる). する → **される**. L’auteur de l’action prend **に**.',
          examples: ex(`
            せんせいに ほめられました。| sensei ni homeraremashita | J’ai été félicité par le professeur.
            この ほんは せかいじゅうで よまれて います。| kono hon wa sekaijū de yomarete imasu | Ce livre est lu dans le monde entier.
          `),
        },
        {
          title: 'Le passif qui exprime une gêne',
          body: 'En japonais, le passif sert souvent à dire qu’on a **subi** quelque chose de désagréable.',
          examples: ex(`
            あめに ふられました。| ame ni furaremashita | Je me suis fait surprendre par la pluie.
            でんしゃで あしを ふまれました。| densha de ashi o fumaremashita | Quelqu’un m’a marché sur le pied dans le train.
            さいふを ぬすまれました。| saifu o nusumaremashita | On m’a volé mon portefeuille.
          `),
        },
      ],
      vocab: vocab(`
        ほめる | homeru | féliciter
        しかる | shikaru | gronder
        ふむ | fumu | marcher sur
        ぬすむ | nusumu | voler (dérober)
        さいふ | saifu | portefeuille
        たのむ | tanomu | demander (un service)
        せかいじゅう | sekaijū | dans le monde entier
        つくられる | tsukurareru | être fabriqué
      `),
      exercises: [
        qcm('Passif de « よむ » ?', 'よまれる', ['よめる', 'よませる', 'よむられる']),
        qcm('Passif de « する » ?', 'される', ['できる', 'させる', 'しられる']),
        qcm('Dans « せんせいに ほめられた », qui félicite ?', 'le professeur', ['moi', 'personne', 'un ami']),
        qcm('« さいふを ぬすまれました » veut dire…', 'On m’a volé mon portefeuille.', ['J’ai volé un portefeuille.', 'J’ai perdu mon portefeuille.', 'J’ai trouvé un portefeuille.']),
        type('Passif de « いう » (dire)', 'いわれる'),
        order('Remets dans l’ordre : « J’ai été grondé par ma mère. »', 'ははに しかられました', 'J’ai été grondé par ma mère.'),
      ],
    },
    {
      id: 'ja-n3-5',
      title: 'Apparences et rumeurs',
      subtitle: '〜そうだ · 〜ようだ · 〜らしい · 〜みたい',
      duration: 30,
      objectives: ['Dire « on dirait que »', 'Rapporter une information entendue'],
      sections: [
        {
          title: 'Ce que je vois : 〜そう',
          body: 'Radical + **そう** : « ça a l’air ». おいしい → **おいしそう** (ça a l’air bon), ふる → **ふりそう** (on dirait qu’il va pleuvoir).',
        },
        {
          title: 'Ce que j’entends / déduis',
          table: table(`
            Forme | Nuance | Exemple
            neutre + そうだ | j’ai entendu dire que | あした ゆきが ふるそうです。
            〜ようだ / 〜みたい | il semble que (déduction) | だれも いない ようです。
            〜らしい | il paraît que / typique de | かれは けっこんした らしい。
          `),
          tip: '**みたい** est la version orale et familière de ようだ.',
        },
      ],
      vocab: vocab(`
        ゆき | yuki | neige
        けっこんする | kekkon suru | se marier
        うわさ | uwasa | rumeur
        ニュース | nyūsu | informations
        てんきよほう | tenki yohō | météo
        つかれる | tsukareru | être fatigué
        ねむい | nemui | avoir sommeil
        たいへん | taihen | dur, pénible
      `),
      dialogue: dlg(`
        けん: その ケーキ、おいしそうだね。| Ce gâteau a l’air bon.
        ゆき: うん。この みせ、テレビで しょうかいされた らしいよ。| Oui. Il paraît que ce café est passé à la télé.
        けん: そうなんだ。いつも こんでる みたいだね。| Ah bon. On dirait qu’il est toujours bondé.
      `),
      exercises: [
        qcm('« おいしそう » veut dire…', 'ça a l’air bon', ['c’était bon', 'il paraît que c’est bon', 'ce n’est pas bon']),
        qcm('« ゆきが ふるそうです » (forme neutre + そう) veut dire…', 'J’ai entendu dire qu’il va neiger.', ['On dirait qu’il neige.', 'Il neige.', 'Il faut qu’il neige.']),
        qcm('Quelle forme est la plus familière pour « il semble que » ?', '〜みたい', ['〜ようだ', '〜らしい', '〜そうです']),
        match('Associe', [['うわさ', 'rumeur'], ['てんきよほう', 'météo'], ['ねむい', 'avoir sommeil'], ['つかれる', 'être fatigué']]),
        type('Transforme « たかい » en « ça a l’air cher »', 'たかそう'),
        qcm('« かれは けっこんした らしい » veut dire…', 'Il paraît qu’il s’est marié.', ['Il va se marier.', 'Il ressemble à un marié.', 'Il veut se marier.']),
      ],
    },
  ],
  test: [
    qcm('Forme neutre de « いきませんでした » ?', 'いかなかった', ['いかない', 'いった', 'いきなかった']),
    qcm('Forme neutre de « まちます » ?', 'まつ', ['まち', 'まって', 'まった']),
    qcm('Quel conditionnel reprend ce que dit l’interlocuteur ?', '〜なら', ['〜と', '〜ば', '〜たら']),
    qcm('Forme ば de « ある » ?', 'あれば', ['あるば', 'あらば', 'ありば']),
    qcm('Potentiel de « みる » ?', 'みられる', ['みさせる', 'みせる', 'みえる']),
    qcm('Volitif poli de « かえる » (rentrer) ?', 'かえりましょう', ['かえろう', 'かえましょう', 'かえるましょう']),
    qcm('Passif de « しかる » ?', 'しかられる', ['しかれる', 'しからせる', 'しかりる']),
    qcm('« ふりそう » veut dire…', 'on dirait qu’il va pleuvoir', ['il paraît qu’il a plu', 'il pleut', 'il ne pleuvra pas']),
    match('Associe', [['〜と', 'conséquence automatique'], ['〜なら', 'si c’est le cas'], ['〜たら', 'si / quand'], ['〜ば', 'condition générale']]),
    order('Remets dans l’ordre : « Je sais parler japonais. »', 'にほんごが はなせます', 'Je sais parler japonais.'),
    type('Forme たら de « いく »', 'いったら'),
    type('Passif de « ほめる »', 'ほめられる'),
  ],
}
