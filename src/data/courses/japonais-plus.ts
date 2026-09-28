import type { Lesson } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

/** Leçons supplémentaires du cursus japonais, ajoutées à la fin de chaque niveau. */
export const jaExtra: Record<string, Lesson[]> = {
  'ja-kana': [
    {
      id: 'ja-k6',
      title: 'Katakana étendus',
      subtitle: 'ティ · ファ · ウィ · ヴ · シェ',
      duration: 25,
      objectives: ['Lire les combinaisons créées pour les sons étrangers', 'Lire des noms de marques et de pays'],
      sections: [
        {
          title: 'Des sons qui n’existaient pas',
          body: 'Pour noter des sons étrangers, les katakana combinent un signe normal et une **petite voyelle** (ァ ィ ゥ ェ ォ). ティ = « ti » (pas « chi »), ファ = « fa ».',
          table: table(`
            Katakana | Son | Exemple
            ティ | ti | パーティー (fête)
            ディ | di | ディズニー (Disney)
            ファ フィ フェ フォ | fa fi fe fo | フォーク (fourchette)
            ウィ ウェ ウォ | wi we wo | ウィーン (Vienne)
            シェ ジェ チェ | she je che | シェフ (chef)
            ヴァ ヴィ ヴ | va vi vu | ヴァイオリン (violon)
          `),
        },
        {
          title: 'Adapter un mot',
          body: 'Chaque consonne finale reçoit une voyelle : « bus » → **バス** (basu), « McDonald’s » → **マクドナルド**. Les **r** et **l** deviennent tous la ligne R.',
          examples: ex(`
            パーティー | pātī | fête (party)
            フォーク | fōku | fourchette
            シェフ | shefu | chef cuisinier
            マクドナルド | makudonarudo | McDonald’s
          `),
          tip: 'Beaucoup de Japonais raccourcissent les mots longs : スマートフォン → **スマホ** (smartphone), パーソナルコンピューター → **パソコン**.',
        },
      ],
      vocab: vocab(`
        パーティー | pātī | fête
        フォーク | fōku | fourchette
        シェフ | shefu | chef
        スマホ | sumaho | smartphone
        パソコン | pasokon | ordinateur
        ビール | bīru | bière
        ワイン | wain | vin
        チーズ | chīzu | fromage
      `),
      exercises: [
        qcm('Comment se lit « ティ » ?', 'ti', ['chi', 'tei', 'tsu']),
        qcm('Comment se lit « ファ » ?', 'fa', ['hua', 'fua', 'ha']),
        qcm('Que veut dire « スマホ » ?', 'smartphone', ['maison', 'montre', 'ordinateur']),
        qcm('En katakana, « l » et « r » deviennent…', 'la ligne R', ['la ligne L', 'la ligne N', 'un petit っ']),
        match('Associe', [['ビール', 'bière'], ['ワイン', 'vin'], ['チーズ', 'fromage'], ['フォーク', 'fourchette']]),
        type('Écris en romaji : パーティー', ['pati', 'pātī', 'paatii', 'party']),
        order('Remets les syllabes dans l’ordre pour « McDonald’s »', 'マ ク ド ナ ル ド'),
        qcm('Quel mot veut dire « chef cuisinier » ?', 'シェフ', ['セフ', 'シエフ', 'ジェフ']),
      ],
    },
    {
      id: 'ja-k7',
      title: 'Écrire son prénom et la ponctuation',
      subtitle: 'レア · トマ · 。、「」',
      duration: 25,
      objectives: ['Transcrire un prénom français en katakana', 'Connaître la ponctuation japonaise', 'Lire à la verticale'],
      sections: [
        {
          title: 'Ton prénom en katakana',
          body: 'On transcrit le **son**, pas l’orthographe. Les voyelles longues prennent ー.',
          table: table(`
            Prénom | Katakana | Lecture
            Léa | レア | rea
            Thomas | トマ | toma
            Camille | カミーユ | kamīyu
            Julien | ジュリアン | jurian
            Chloé | クロエ | kuroe
            Marie | マリー | marī
          `),
        },
        {
          title: 'Ponctuation et sens de lecture',
          body: '**。** = point, **、** = virgule, **「 」** = guillemets, **？！** existent aussi. Il n’y a **pas d’espaces** entre les mots. Les livres et journaux s’écrivent souvent **à la verticale**, de haut en bas et de **droite à gauche**.',
          examples: ex(`
            「こんにちは」と いいました。| 'konnichiwa' to iimashita | Il a dit « bonjour ».
            わたしは、レアです。| watashi wa, rea desu | Moi, je suis Léa.
          `),
          tip: 'Dans ce cours, on met des espaces entre les groupes de mots pour t’aider à lire. Dans la vraie vie, il n’y en a pas !',
        },
      ],
      vocab: vocab(`
        なまえ | namae | prénom, nom
        かく | kaku | écrire
        よむ | yomu | lire
        たてがき | tategaki | écriture verticale
        よこがき | yokogaki | écriture horizontale
        まる | maru | point (。)
        てん | ten | virgule (、)
        かぎかっこ | kagikakko | guillemets 「」
      `),
      exercises: [
        qcm('Comment écrit-on « Léa » ?', 'レア', ['リア', 'レイア', 'ルア']),
        qcm('Comment écrit-on « Marie » ?', 'マリー', ['マリ', 'メリー', 'マーリ']),
        qcm('Que signifie « 。 » ?', 'un point', ['une virgule', 'des guillemets', 'un point d’interrogation']),
        qcm('En écriture verticale, on lit les colonnes…', 'de droite à gauche', ['de gauche à droite', 'de bas en haut', 'dans n’importe quel ordre']),
        match('Associe', [['。', 'point'], ['、', 'virgule'], ['「」', 'guillemets'], ['ー', 'voyelle longue']]),
        type('Écris en katakana : Thomas (トマ)', 'トマ'),
        qcm('Y a-t-il des espaces entre les mots en japonais ?', 'Non, jamais', ['Oui, toujours', 'Seulement en katakana', 'Seulement après は']),
        qcm('« Chloé » s’écrit…', 'クロエ', ['チロエ', 'クロイ', 'シロエ']),
      ],
    },
    {
      id: 'ja-k8',
      title: 'Lire un vrai menu',
      subtitle: 'ラーメン · すし · てんぷら · おちゃ',
      duration: 25,
      objectives: ['Lire hiragana et katakana mélangés', 'Commander simplement'],
      sections: [
        {
          title: 'Au restaurant',
          table: table(`
            Plat | Lecture | Sens
            ラーメン | rāmen | ramen
            うどん | udon | nouilles épaisses
            そば | soba | nouilles de sarrasin
            カレーライス | karē raisu | riz au curry
            おにぎり | onigiri | boule de riz
            みそしる | misoshiru | soupe miso
            おちゃ | ocha | thé vert
          `),
        },
        {
          title: 'Commander',
          examples: ex(`
            ラーメンを ひとつ ください。| rāmen o hitotsu kudasai | Un ramen, s’il vous plaît.
            おみずを ください。| omizu o kudasai | De l’eau, s’il vous plaît.
            おかいけい おねがいします。| okaikei onegai shimasu | L’addition, s’il vous plaît.
            ごちそうさまでした。| gochisōsama deshita | Merci pour le repas (en partant).
          `),
          tip: 'Avant de manger, on dit **いただきます** ; après, **ごちそうさまでした**.',
        },
      ],
      vocab: vocab(`
        ラーメン | rāmen | ramen
        うどん | udon | udon
        おにぎり | onigiri | boule de riz
        みそしる | misoshiru | soupe miso
        ひとつ | hitotsu | un (objet)
        ふたつ | futatsu | deux (objets)
        いただきます | itadakimasu | bon appétit (avant)
        おかいけい | okaikei | l’addition
      `),
      dialogue: dlg(`
        店員: いらっしゃいませ。なんめいさまですか。| Bienvenue. Combien de personnes ?
        レア: ふたりです。| Deux.
        店員: ごちゅうもんは？| Votre commande ?
        レア: ラーメンと おにぎりを ください。| Un ramen et un onigiri, s’il vous plaît.
      `),
      exercises: [
        qcm('Que dit-on avant de manger ?', 'いただきます', ['ごちそうさま', 'いらっしゃいませ', 'すみません']),
        qcm('Comment demande-t-on l’addition ?', 'おかいけい おねがいします', ['おみず ください', 'いただきます', 'ごちそうさまでした']),
        qcm('Que veut dire « みそしる » ?', 'soupe miso', ['riz au curry', 'thé vert', 'nouilles']),
        match('Associe', [['うどん', 'nouilles épaisses'], ['そば', 'nouilles de sarrasin'], ['おにぎり', 'boule de riz'], ['おちゃ', 'thé vert']]),
        order('Remets dans l’ordre : « Un ramen, s’il vous plaît. »', 'ラーメンを ひとつ ください', 'Un ramen, s’il vous plaît.'),
        type('Écris en romaji : うどん', 'udon'),
        qcm('« ふたつ » veut dire…', 'deux (objets)', ['un', 'trois', 'beaucoup']),
        qcm('« カレーライス » est…', 'du riz au curry', ['une glace', 'une salade', 'du pain']),
      ],
    },
  ],
  'ja-n5': [
    {
      id: 'ja-n5-6',
      title: 'La famille',
      subtitle: 'ちち · はは · おとうさん · おかあさん',
      duration: 25,
      objectives: ['Nommer sa famille', 'Distinguer « ma famille » et « la famille des autres »', 'Compter les personnes'],
      sections: [
        {
          title: 'Deux séries de mots',
          body: 'Pour **sa propre famille** (quand on parle à quelqu’un d’extérieur), on utilise des mots modestes. Pour la famille **des autres**, des mots respectueux.',
          table: table(`
            Ma famille | Famille de l’autre | Sens
            ちち | おとうさん | père
            はは | おかあさん | mère
            あに | おにいさん | grand frère
            あね | おねえさん | grande sœur
            おとうと | おとうとさん | petit frère
            いもうと | いもうとさん | petite sœur
          `),
        },
        {
          title: 'Compter les personnes : 〜にん',
          body: '1 personne = **ひとり**, 2 = **ふたり**, puis nombre + **にん** : さんにん, よにん (4 !), ごにん…',
          examples: ex(`
            なんにん かぞくですか。| nannin kazoku desu ka | Vous êtes combien dans votre famille ?
            よにん かぞくです。| yonin kazoku desu | Nous sommes quatre.
            あにが ひとり います。| ani ga hitori imasu | J’ai un grand frère.
          `),
        },
      ],
      vocab: vocab(`
        かぞく | kazoku | famille
        ちち | chichi | (mon) père
        はは | haha | (ma) mère
        あに | ani | (mon) grand frère
        あね | ane | (ma) grande sœur
        おとうと | otōto | petit frère
        いもうと | imōto | petite sœur
        きょうだい | kyōdai | frères et sœurs
      `),
      dialogue: dlg(`
        ゆき: レアさんは なんにん かぞくですか。| Léa, vous êtes combien dans ta famille ?
        レア: ごにん かぞくです。ちちと ははと あにと いもうとが います。| Cinq : mon père, ma mère, mon grand frère et ma petite sœur.
        ゆき: おにいさんは なんさいですか。| Quel âge a ton grand frère ?
        レア: にじゅうごさいです。| 25 ans.
      `),
      exercises: [
        qcm('Tu parles de TON père à un collègue :', 'ちち', ['おとうさん', 'はは', 'あに']),
        qcm('Tu parles de la mère de ton ami :', 'おかあさん', ['はは', 'あね', 'ちち']),
        qcm('« 4 personnes » se dit…', 'よにん', ['しにん', 'よんにん', 'よったり']),
        qcm('« ふたり » veut dire…', 'deux personnes', ['une personne', 'deux objets', 'deuxième']),
        match('Associe', [['あに', 'grand frère'], ['あね', 'grande sœur'], ['おとうと', 'petit frère'], ['いもうと', 'petite sœur']]),
        order('Remets dans l’ordre : « J’ai un grand frère. »', 'あにが ひとり います', 'J’ai un grand frère.'),
        type('Écris en hiragana : famille', 'かぞく'),
        qcm('« なんにん かぞくですか » veut dire…', 'Vous êtes combien dans la famille ?', ['Qui est dans ta famille ?', 'Où habite ta famille ?', 'Ta famille va bien ?']),
      ],
    },
    {
      id: 'ja-n5-7',
      title: 'Où est-ce ? Lieux et positions',
      subtitle: 'うえ · した · なか · となり · どこ',
      duration: 30,
      objectives: ['Situer un objet', 'Demander et indiquer un lieu', 'Utiliser ここ・そこ・あそこ'],
      sections: [
        {
          title: 'ここ・そこ・あそこ・どこ',
          table: table(`
            Japonais | Sens
            ここ | ici
            そこ | là (près de toi)
            あそこ | là-bas
            どこ | où ?
          `),
          examples: ex(`
            トイレは どこですか。| toire wa doko desu ka | Où sont les toilettes ?
            あそこです。| asoko desu | C’est là-bas.
          `),
        },
        {
          title: 'Positions : A の うえ',
          body: 'On dit « **le dessus de** la table » : つくえ**の うえ**. Puis に + あります / います.',
          table: table(`
            Japonais | Sens
            うえ | sur, au-dessus
            した | sous
            なか | dans
            まえ | devant
            うしろ | derrière
            となり | à côté de
            ちかく | près de
          `),
          examples: ex(`
            ねこは はこの なかに います。| neko wa hako no naka ni imasu | Le chat est dans la boîte.
            ぎんこうは えきの まえに あります。| ginkō wa eki no mae ni arimasu | La banque est devant la gare.
          `),
        },
      ],
      vocab: vocab(`
        えき | eki | gare
        ぎんこう | ginkō | banque
        トイレ | toire | toilettes
        コンビニ | konbini | supérette
        はこ | hako | boîte
        つくえ | tsukue | bureau (meuble)
        となり | tonari | à côté
        まえ | mae | devant
      `),
      exercises: [
        qcm('Comment demande-t-on « Où est la gare ? »', 'えきは どこですか', ['えきは なんですか', 'えきは だれですか', 'えきは いくらですか']),
        qcm('« はこの なか » veut dire…', 'dans la boîte', ['sur la boîte', 'sous la boîte', 'à côté de la boîte']),
        qcm('« あそこ » veut dire…', 'là-bas', ['ici', 'où', 'là (près de toi)']),
        match('Associe', [['うえ', 'sur'], ['した', 'sous'], ['まえ', 'devant'], ['うしろ', 'derrière']]),
        order('Remets dans l’ordre : « La banque est devant la gare. »', 'ぎんこうは えきの まえに あります', 'La banque est devant la gare.'),
        type('Complète : ねこは つくえの ___に います。(sous)', 'した'),
        qcm('Pour situer un chien, on finit par…', 'います', ['あります', 'です', 'ありません']),
        qcm('« コンビニ » est…', 'une supérette', ['une gare', 'une banque', 'un hôpital']),
      ],
    },
    {
      id: 'ja-n5-8',
      title: 'Inviter et proposer',
      subtitle: '〜ませんか · 〜ましょう · なんようび',
      duration: 25,
      objectives: ['Inviter quelqu’un', 'Accepter ou refuser poliment', 'Parler des jours et des dates'],
      sections: [
        {
          title: 'Inviter : 〜ませんか',
          body: 'Littéralement « vous ne … pas ? », c’est la façon **polie d’inviter**. Pour dire « faisons ! » : **〜ましょう**.',
          examples: ex(`
            いっしょに えいがを みませんか。| issho ni eiga o mimasen ka | Vous ne voulez pas voir un film avec moi ?
            いいですね。みましょう！| ii desu ne. mimashō | Bonne idée. Allons-y !
            すみません、その ひは ちょっと…| sumimasen, sono hi wa chotto… | Désolé, ce jour-là, c’est un peu…
          `),
          tip: 'Pour refuser, les Japonais disent rarement « non » : **ちょっと…** suffit à faire comprendre.',
        },
        {
          title: 'Jours et dates',
          examples: ex(`
            きょうは なんようびですか。| kyō wa nan’yōbi desu ka | Quel jour sommes-nous ?
            きんようびです。| kin’yōbi desu | Vendredi.
            たんじょうびは なんがつ なんにちですか。| tanjōbi wa nangatsu nannichi desu ka | Ton anniversaire, c’est quand ?
            しがつ ついたちです。| shigatsu tsuitachi desu | Le 1er avril.
          `),
          body: 'Mois : nombre + **がつ** (いちがつ, にがつ… attention **しがつ** = avril, **しちがつ** = juillet, **くがつ** = septembre).',
        },
      ],
      vocab: vocab(`
        いっしょに | issho ni | ensemble
        あした | ashita | demain
        こんど | kondo | la prochaine fois
        しゅうまつ | shūmatsu | week-end
        なんようび | nan’yōbi | quel jour
        なんがつ | nangatsu | quel mois
        ついたち | tsuitachi | le 1er (du mois)
        ざんねん | zannen | dommage
      `),
      dialogue: dlg(`
        トム: しゅうまつ、いっしょに カラオケに いきませんか。| Ce week-end, on va au karaoké ensemble ?
        ゆき: いいですね。なんようびですか。| Bonne idée. Quel jour ?
        トム: どようびは どうですか。| Samedi, ça te va ?
        ゆき: どようびは ちょっと…。にちようびは？| Samedi, c’est un peu… Et dimanche ?
      `),
      exercises: [
        qcm('Comment invite-t-on poliment à manger ?', 'たべませんか', ['たべません', 'たべましょう か', 'たべてください']),
        qcm('« いきましょう » veut dire…', 'allons-y', ['je n’y vais pas', 'vous y allez ?', 'je suis allé']),
        qcm('Comment dit-on « avril » ?', 'しがつ', ['よんがつ', 'しちがつ', 'よがつ']),
        qcm('« その ひは ちょっと… » signifie…', 'un refus poli', ['un accord enthousiaste', 'une question', 'un remerciement']),
        match('Associe', [['あした', 'demain'], ['しゅうまつ', 'week-end'], ['こんど', 'la prochaine fois'], ['ざんねん', 'dommage']]),
        order('Remets dans l’ordre : « On va voir un film ensemble ? »', 'いっしょに えいがを みませんか', 'On va voir un film ensemble ?'),
        type('Transforme « のみます » en invitation polie', 'のみませんか'),
        qcm('« ついたち » c’est…', 'le 1er du mois', ['le jeudi', 'le 10', 'le mois prochain']),
      ],
    },
  ],
  'ja-n4': [
    {
      id: 'ja-n4-6',
      title: 'Comparer',
      subtitle: 'AはBより · いちばん · どちら',
      duration: 25,
      objectives: ['Comparer deux choses', 'Exprimer le superlatif', 'Demander « lequel des deux »'],
      sections: [
        {
          title: 'A は B より + adjectif',
          body: '**より** = « plus que » (placé après l’élément de comparaison). Pour demander : **AとBと どちらが〜ですか**.',
          examples: ex(`
            とうきょうは パリより おおきいです。| tōkyō wa pari yori ōkii desu | Tokyo est plus grand que Paris.
            コーヒーと おちゃと どちらが すきですか。| kōhī to ocha to dochira ga suki desu ka | Tu préfères le café ou le thé ?
            おちゃの ほうが すきです。| ocha no hō ga suki desu | Je préfère le thé.
          `),
        },
        {
          title: 'Le superlatif : いちばん',
          examples: ex(`
            くだものの なかで なにが いちばん すきですか。| kudamono no naka de nani ga ichiban suki desu ka | Parmi les fruits, lequel préfères-tu ?
            いちごが いちばん すきです。| ichigo ga ichiban suki desu | Je préfère les fraises.
            ふじさんは にほんで いちばん たかい やまです。| fujisan wa nihon de ichiban takai yama desu | Le mont Fuji est la plus haute montagne du Japon.
          `),
        },
      ],
      vocab: vocab(`
        より | yori | plus que
        いちばん | ichiban | le plus
        どちら | dochira | lequel (des deux)
        ほう | hō | côté (préférence)
        くだもの | kudamono | fruit
        いちご | ichigo | fraise
        すき | suki | aimer
        きらい | kirai | ne pas aimer
      `),
      exercises: [
        qcm('« Tokyo est plus grand que Paris » :', 'とうきょうは パリより おおきいです', ['パリは とうきょうより おおきいです', 'とうきょうより パリは おおきいです', 'とうきょうは パリの おおきいです']),
        qcm('« le plus » se dit…', 'いちばん', ['より', 'ほう', 'どちら']),
        qcm('« AとBと どちらが〜 » sert à…', 'demander lequel des deux', ['comparer trois choses', 'dire qu’on aime les deux', 'refuser']),
        qcm('« おちゃの ほうが すきです » veut dire…', 'Je préfère le thé.', ['Je n’aime pas le thé.', 'J’aime le thé et le café.', 'Le thé est cher.']),
        match('Associe', [['すき', 'aimer'], ['きらい', 'ne pas aimer'], ['くだもの', 'fruit'], ['いちご', 'fraise']]),
        order('Remets dans l’ordre : « Je préfère les fraises. »', 'いちごが いちばん すきです', 'Je préfère les fraises.'),
        type('Complète : なつは ふゆ___ あついです。(plus que)', 'より'),
        qcm('Que veut dire « ふじさんは にほんで いちばん たかい やまです » ?', 'Le mont Fuji est la plus haute montagne du Japon.', ['Le mont Fuji est plus haut que Tokyo.', 'Le mont Fuji est cher.', 'Le mont Fuji est au Japon.']),
      ],
    },
    {
      id: 'ja-n4-7',
      title: 'Expériences et conseils',
      subtitle: '〜たことが あります · 〜たほうが いい',
      duration: 30,
      objectives: ['Parler de ses expériences', 'Donner un conseil'],
      sections: [
        {
          title: 'J’ai déjà… : た形 + ことが あります',
          body: 'La forme en **た** (passé neutre) se forme comme la forme en て : たべて → **たべた**, いって → **いった**.',
          examples: ex(`
            すしを たべたことが ありますか。| sushi o tabeta koto ga arimasu ka | Tu as déjà mangé des sushis ?
            はい、なんども あります。| hai, nando mo arimasu | Oui, plusieurs fois.
            ふじさんに のぼったことが ありません。| fujisan ni nobotta koto ga arimasen | Je n’ai jamais gravi le mont Fuji.
          `),
        },
        {
          title: 'Conseiller : 〜たほうが いい',
          examples: ex(`
            はやく ねたほうが いいですよ。| hayaku neta hō ga ii desu yo | Tu ferais mieux de te coucher tôt.
            あまり のまないほうが いいです。| amari nomanai hō ga ii desu | Il vaut mieux ne pas trop boire.
          `),
          tip: 'Au négatif, on utilise la **forme ない** : 〜ないほうが いい.',
        },
      ],
      vocab: vocab(`
        ことが ある | koto ga aru | avoir déjà fait
        なんども | nando mo | plusieurs fois
        いちども | ichido mo | jamais (avec négatif)
        のぼる | noboru | gravir
        くすり | kusuri | médicament
        びょういん | byōin | hôpital
        かぜ | kaze | rhume
        ほうが いい | hō ga ii | il vaut mieux
      `),
      exercises: [
        qcm('Forme た de « いく » :', 'いった', ['いきた', 'いいた', 'いくた']),
        qcm('« Tu as déjà vu un sumo ? »', 'すもうを みたことが ありますか', ['すもうを みますか', 'すもうを みたいですか', 'すもうを みていますか']),
        qcm('« Il vaut mieux prendre un médicament » :', 'くすりを のんだほうが いいです', ['くすりを のむほうが いいでした', 'くすりを のんでください ほう', 'くすりを のまない ことが あります']),
        qcm('« Il vaut mieux ne pas fumer » :', 'たばこを すわないほうが いい', ['たばこを すったほうが いい', 'たばこを すわないことが ある', 'たばこを すいません ほう']),
        match('Associe', [['かぜ', 'rhume'], ['くすり', 'médicament'], ['びょういん', 'hôpital'], ['なんども', 'plusieurs fois']]),
        order('Remets dans l’ordre : « Je n’ai jamais gravi le mont Fuji. »', 'ふじさんに のぼったことが ありません', 'Je n’ai jamais gravi le mont Fuji.'),
        type('Forme た de « たべる »', 'たべた'),
        qcm('« はやく ねたほうが いいですよ » est…', 'un conseil', ['un ordre strict', 'une invitation', 'une expérience']),
      ],
    },
    {
      id: 'ja-n4-8',
      title: 'Donner une raison et son avis',
      subtitle: '〜から · 〜ので · 〜と おもいます',
      duration: 30,
      objectives: ['Expliquer pourquoi', 'Donner son opinion'],
      sections: [
        {
          title: 'Parce que : から et ので',
          body: 'La cause se place **avant** から / ので. **から** est plus direct, **ので** plus doux et poli (idéal pour s’excuser).',
          examples: ex(`
            あついですから、まどを あけましょう。| atsui desu kara, mado o akemashō | Il fait chaud, ouvrons la fenêtre.
            でんしゃが おくれたので、ちこくしました。| densha ga okureta node, chikoku shimashita | Le train avait du retard, donc je suis arrivé en retard.
            どうして にほんごを べんきょうしますか。| dōshite nihongo o benkyō shimasu ka | Pourquoi étudies-tu le japonais ?
            アニメが すきだからです。| anime ga suki da kara desu | Parce que j’aime les animés.
          `),
        },
        {
          title: 'Je pense que : 〜と おもいます',
          body: 'Forme neutre + **と おもいます**. Avec un nom ou un adjectif en な, on ajoute **だ** : いい**だ**… non ! → いいと おもいます ; しずか**だ**と おもいます.',
          examples: ex(`
            あしたは あめが ふると おもいます。| ashita wa ame ga furu to omoimasu | Je pense qu’il pleuvra demain.
            この えいがは おもしろいと おもいます。| kono eiga wa omoshiroi to omoimasu | Je trouve ce film intéressant.
          `),
        },
      ],
      vocab: vocab(`
        から | kara | parce que
        ので | node | comme, étant donné que
        どうして | dōshite | pourquoi
        おもう | omou | penser
        おくれる | okureru | être en retard (train)
        ちこく | chikoku | retard (personne)
        まど | mado | fenêtre
        べんきょう | benkyō | études
      `),
      exercises: [
        qcm('Laquelle est la plus polie pour s’excuser ?', 'ので', ['から', 'だから', 'けど']),
        qcm('« Pourquoi ? » se dit…', 'どうして', ['どこ', 'いつ', 'どれ']),
        qcm('« Je pense qu’il pleuvra » :', 'あめが ふると おもいます', ['あめが ふりますと おもいます', 'あめと おもいます ふる', 'あめが ふったら おもう']),
        qcm('Dans « AからB », la cause est…', 'A', ['B', 'les deux', 'aucune']),
        match('Associe', [['まど', 'fenêtre'], ['ちこく', 'retard (personne)'], ['べんきょう', 'études'], ['おもう', 'penser']]),
        order('Remets dans l’ordre : « Je trouve ce film intéressant. »', 'この えいがは おもしろいと おもいます', 'Je trouve ce film intéressant.'),
        type('Complète : アニメが すきだ___です。(parce que)', 'から'),
        qcm('« でんしゃが おくれたので、ちこくしました » veut dire…', 'Le train avait du retard, donc je suis arrivé en retard.', ['Je suis en retard, donc le train aussi.', 'Le train est parti à l’heure.', 'J’ai pris le train en retard exprès.']),
      ],
    },
  ],
  'ja-n3': [
    {
      id: 'ja-n3-6',
      title: 'Obligation et permission',
      subtitle: '〜なければ ならない · 〜なくても いい',
      duration: 30,
      objectives: ['Dire ce qu’on doit faire', 'Dire ce qu’on n’est pas obligé de faire', 'Comprendre les formes orales'],
      sections: [
        {
          title: 'Devoir',
          body: 'Forme ない sans い + **ければ なりません** (ou **ければ いけません**). À l’oral : **〜なきゃ** / **〜なくちゃ**.',
          examples: ex(`
            あした はやく おきなければ なりません。| ashita hayaku okinakereba narimasen | Je dois me lever tôt demain.
            もう かえらなきゃ。| mō kaeranakya | Faut que je rentre.
            くすりを のまなくちゃ。| kusuri o nomanakucha | Faut que je prenne mon médicament.
          `),
        },
        {
          title: 'Ne pas être obligé',
          body: 'Forme ない sans い + **くても いいです**.',
          examples: ex(`
            あしたは こなくても いいです。| ashita wa konakute mo ii desu | Tu n’es pas obligé de venir demain.
            くつを ぬがなくても いいですか。| kutsu o nuganakute mo ii desu ka | Je ne suis pas obligé d’enlever mes chaussures ?
          `),
          tip: 'Au Japon, on enlève souvent ses chaussures en entrant chez quelqu’un : くつを **ぬがなければ なりません**.',
        },
      ],
      vocab: vocab(`
        ならない | naranai | il faut (dans 〜なければ)
        いけない | ikenai | il ne faut pas
        ぬぐ | nugu | enlever (vêtement)
        しめきり | shimekiri | date limite
        しゅくだい | shukudai | devoirs
        はらう | harau | payer
        なきゃ | nakya | faut que (oral)
        ひつよう | hitsuyō | nécessaire
      `),
      exercises: [
        qcm('« Je dois payer » :', 'はらわなければ なりません', ['はらわなくても いいです', 'はらっては いけません', 'はらいたいです']),
        qcm('« Tu n’es pas obligé de venir » :', 'こなくても いいです', ['こなければ なりません', 'きては いけません', 'こないで ください']),
        qcm('« 〜なきゃ » est…', 'la forme orale de « devoir »', ['un conditionnel', 'une interdiction', 'un souhait']),
        match('Associe', [['しゅくだい', 'devoirs'], ['しめきり', 'date limite'], ['ぬぐ', 'enlever'], ['ひつよう', 'nécessaire']]),
        order('Remets dans l’ordre : « Je dois me lever tôt demain. »', 'あした はやく おきなければ なりません', 'Je dois me lever tôt demain.'),
        type('« Il faut que je rentre » (oral, かえる)', 'かえらなきゃ'),
        qcm('« くつを ぬがなくても いいですか » demande…', 'si on peut garder ses chaussures', ['où sont les chaussures', 'si les chaussures sont chères', 'd’enlever ses chaussures']),
        type('Forme ない de « いく » + くても いい', 'いかなくてもいい'),
      ],
    },
    {
      id: 'ja-n3-7',
      title: 'Simultanéité et but',
      subtitle: '〜ながら · 〜ために · 〜ように',
      duration: 30,
      objectives: ['Faire deux choses en même temps', 'Exprimer le but'],
      sections: [
        {
          title: 'En même temps : radical + ながら',
          examples: ex(`
            おんがくを ききながら べんきょうします。| ongaku o kikinagara benkyō shimasu | J’étudie en écoutant de la musique.
            あるきながら スマホを みないで。| arukinagara sumaho o minaide | Ne regarde pas ton téléphone en marchant.
          `),
          tip: 'L’action **principale** est la deuxième.',
        },
        {
          title: 'Pour : ために / ように',
          body: '**ために** : but volontaire, même sujet (verbe d’action). **ように** : pour que quelque chose devienne possible (verbe potentiel, négatif, ou sujet différent).',
          examples: ex(`
            にほんで はたらくために、にほんごを べんきょうしています。| nihon de hataraku tame ni, nihongo o benkyō shite imasu | J’étudie le japonais pour travailler au Japon.
            かんじが よめるように、まいにち れんしゅうします。| kanji ga yomeru yō ni, mainichi renshū shimasu | Je m’entraîne tous les jours pour pouvoir lire les kanji.
            わすれないように メモします。| wasurenai yō ni memo shimasu | Je note pour ne pas oublier.
          `),
        },
      ],
      vocab: vocab(`
        ながら | nagara | tout en
        ために | tame ni | pour, dans le but de
        ように | yō ni | pour que
        れんしゅう | renshū | entraînement
        わすれる | wasureru | oublier
        あるく | aruku | marcher
        きく | kiku | écouter
        まいにち | mainichi | tous les jours
      `),
      exercises: [
        qcm('« J’étudie en écoutant de la musique » :', 'おんがくを ききながら べんきょうします', ['べんきょうしながら おんがくを ききます', 'おんがくを きくために べんきょうします', 'おんがくを きいて べんきょうしました']),
        qcm('« Pour ne pas oublier » :', 'わすれないように', ['わすれないために', 'わすれながら', 'わすれたら']),
        qcm('« 〜ために » s’utilise avec…', 'un but volontaire', ['une capacité', 'un souhait pour autrui', 'un passé']),
        qcm('Radical de « のむ » + ながら :', 'のみながら', ['のむながら', 'のんながら', 'のまながら']),
        match('Associe', [['れんしゅう', 'entraînement'], ['わすれる', 'oublier'], ['あるく', 'marcher'], ['まいにち', 'tous les jours']]),
        order('Remets dans l’ordre : « Je note pour ne pas oublier. »', 'わすれないように メモします', 'Je note pour ne pas oublier.'),
        type('Radical de « たべる » + ながら', 'たべながら'),
        qcm('« かんじが よめるように » veut dire…', 'pour pouvoir lire les kanji', ['en lisant les kanji', 'parce que je lis les kanji', 'si je lis les kanji']),
      ],
    },
    {
      id: 'ja-n3-8',
      title: 'Verbes transitifs et intransitifs',
      subtitle: 'あける / あく · 〜てしまう · 〜ておく',
      duration: 35,
      objectives: ['Distinguer « ouvrir » et « s’ouvrir »', 'Exprimer le regret ou l’action complète', 'Préparer à l’avance'],
      sections: [
        {
          title: 'Les paires',
          table: table(`
            Transitif (を) | Intransitif (が) | Sens
            あける | あく | ouvrir / s’ouvrir
            しめる | しまる | fermer / se fermer
            つける | つく | allumer / s’allumer
            けす | きえる | éteindre / s’éteindre
            こわす | こわれる | casser / se casser
          `),
          examples: ex(`
            ドアを あけます。| doa o akemasu | J’ouvre la porte.
            ドアが あいて います。| doa ga aite imasu | La porte est ouverte.
          `),
        },
        {
          title: '〜てしまう et 〜ておく',
          body: '**〜てしまう** : action terminée complètement, souvent avec **regret** (oral : 〜ちゃう). **〜ておく** : faire quelque chose **à l’avance** (oral : 〜とく).',
          examples: ex(`
            さいふを わすれて しまいました。| saifu o wasurete shimaimashita | J’ai oublié mon portefeuille (zut).
            ケーキを ぜんぶ たべちゃった。| kēki o zenbu tabechatta | J’ai mangé tout le gâteau (oups).
            パーティーの まえに のみものを かって おきます。| pātī no mae ni nomimono o katte okimasu | J’achète les boissons avant la fête.
          `),
        },
      ],
      vocab: vocab(`
        あける / あく | akeru / aku | ouvrir / s’ouvrir
        しめる / しまる | shimeru / shimaru | fermer / se fermer
        つける / つく | tsukeru / tsuku | allumer / s’allumer
        こわれる | kowareru | se casser
        ぜんぶ | zenbu | tout
        のみもの | nomimono | boisson
        よやく | yoyaku | réservation
        わすれもの | wasuremono | objet oublié
      `),
      exercises: [
        qcm('« La lumière s’est allumée » :', 'でんきが つきました', ['でんきを つきました', 'でんきが つけました', 'でんきを つけられました']),
        qcm('« J’ai fermé la fenêtre » :', 'まどを しめました', ['まどが しまりました', 'まどを しまりました', 'まどが しめました']),
        qcm('« 〜てしまう » exprime souvent…', 'le regret ou l’achèvement', ['une préparation', 'une permission', 'une obligation']),
        qcm('« よやくして おきます » veut dire…', 'Je réserve à l’avance.', ['J’ai raté la réservation.', 'Je dois réserver.', 'J’ai déjà réservé par erreur.']),
        match('Associe (transitif → intransitif)', [['あける', 'あく'], ['しめる', 'しまる'], ['けす', 'きえる'], ['こわす', 'こわれる']]),
        order('Remets dans l’ordre : « J’ai oublié mon portefeuille. »', 'さいふを わすれて しまいました', 'J’ai oublié mon portefeuille.'),
        type('Forme orale de « たべて しまった »', 'たべちゃった'),
        qcm('« ドアが あいて います » veut dire…', 'La porte est ouverte.', ['J’ouvre la porte.', 'Ouvrez la porte.', 'La porte va s’ouvrir.']),
      ],
    },
  ],
  'ja-n2': [
    {
      id: 'ja-n2-6',
      title: 'Proportion, sujet et contraste',
      subtitle: '〜ば〜ほど · 〜について · 〜に対して',
      duration: 30,
      objectives: ['Dire « plus… plus… »', 'Introduire un sujet', 'Mettre en contraste'],
      sections: [
        {
          title: 'Plus… plus… : 〜ば〜ほど',
          examples: ex(`
            れんしゅうすれば するほど じょうずに なります。| renshū sureba suru hodo jōzu ni narimasu | Plus on s’entraîne, plus on progresse.
            かんがえれば かんがえるほど わからなく なる。| kangaereba kangaeru hodo wakaranaku naru | Plus j’y pense, moins je comprends.
          `),
        },
        {
          title: 'Structures de l’écrit',
          table: table(`
            Structure | Sens | Exemple
            〜について | au sujet de | 環境問題について 話します。
            〜に対して | envers ; par contraste avec | 兄は 静かなのに対して、弟は 元気だ。
            〜によって | selon ; par | 人によって 考え方が 違う。
            〜にとって | pour (du point de vue de) | 私にとって 家族が 一番 大切だ。
          `),
        },
      ],
      vocab: vocab(`
        環境 | かんきょう | environnement
        考え方 | かんがえかた | façon de penser
        違う | ちがう | être différent
        大切 | たいせつ | important, précieux
        上手 | じょうず | doué
        〜について | ni tsuite | au sujet de
        〜にとって | ni totte | pour (point de vue)
        〜によって | ni yotte | selon
      `),
      exercises: [
        qcm('« Plus on lit, plus on apprend » :', '読めば 読むほど 学べる', ['読むほど 読めば 学べる', '読んだら 読むまで 学べる', '読めば 読んだほど 学ぶ']),
        qcm('« 私にとって » veut dire…', 'pour moi', ['à cause de moi', 'selon moi, par moi', 'au sujet de moi']),
        qcm('« 人によって 違う » veut dire…', 'Ça dépend des gens.', ['Les gens sont différents de moi.', 'Les gens se disputent.', 'Personne n’est différent.']),
        qcm('Pour « au sujet de », on utilise…', '〜について', ['〜に対して', '〜にとって', '〜ほど']),
        match('Associe', [['環境', 'environnement'], ['大切', 'important'], ['違う', 'être différent'], ['上手', 'doué']]),
        order('Remets dans l’ordre : « Plus on s’entraîne, plus on progresse. »', '練習すれば するほど 上手に なる', 'Plus on s’entraîne, plus on progresse.'),
        type('Écris en hiragana la lecture de « 大切 »', 'たいせつ'),
        qcm('« 兄は 静かなのに対して、弟は 元気だ » exprime…', 'un contraste', ['une cause', 'une condition', 'un but']),
      ],
    },
    {
      id: 'ja-n2-7',
      title: 'Lire la presse',
      subtitle: '政府 · 経済 · 発表 · 増加',
      duration: 35,
      objectives: ['Reconnaître le vocabulaire des journaux', 'Comprendre un titre d’article'],
      sections: [
        {
          title: 'Le style des titres',
          body: 'Les titres suppriment particules et verbes : 「円安 進む」 = « le yen continue de baisser ». Les mots **sino-japonais** (deux kanji, lecture on) dominent.',
          table: table(`
            Mot | Lecture | Sens
            政府 | せいふ | gouvernement
            経済 | けいざい | économie
            発表 | はっぴょう | annonce
            増加 | ぞうか | augmentation
            減少 | げんしょう | diminution
            調査 | ちょうさ | enquête
            首相 | しゅしょう | Premier ministre
            事故 | じこ | accident
          `),
        },
        {
          title: 'Exemples de titres',
          examples: ex(`
            観光客 過去最多に | kankōkyaku kako saita ni | Nombre record de touristes
            政府 新たな 対策を 発表 | seifu arata na taisaku o happyō | Le gouvernement annonce de nouvelles mesures
            出生数 5年連続 減少 | shusshōsū gonen renzoku genshō | Les naissances baissent pour la 5e année consécutive
          `),
          tip: 'Repère les mots-clés 増加 / 減少, 発表, 調査 : ils donnent le sens général même sans tout comprendre.',
        },
      ],
      vocab: vocab(`
        政府 | せいふ | gouvernement
        経済 | けいざい | économie
        発表 | はっぴょう | annonce
        増加 | ぞうか | augmentation
        減少 | げんしょう | diminution
        調査 | ちょうさ | enquête
        観光客 | かんこうきゃく | touriste
        対策 | たいさく | mesure (contre)
      `),
      exercises: [
        qcm('Que veut dire « 経済 » ?', 'économie', ['gouvernement', 'accident', 'enquête']),
        qcm('Contraire de « 増加 » :', '減少', ['発表', '調査', '対策']),
        qcm('« 政府 新たな 対策を 発表 » veut dire…', 'Le gouvernement annonce de nouvelles mesures.', ['Le gouvernement démissionne.', 'Une enquête sur le gouvernement.', 'Le gouvernement augmente les impôts.']),
        qcm('« 過去最多 » veut dire…', 'record historique (le plus grand nombre)', ['le moins de tous les temps', 'le passé récent', 'plusieurs fois']),
        match('Associe', [['首相', 'Premier ministre'], ['事故', 'accident'], ['調査', 'enquête'], ['観光客', 'touriste']]),
        type('Écris en hiragana la lecture de « 発表 »', 'はっぴょう'),
        type('Écris en hiragana la lecture de « 政府 »', 'せいふ'),
        order('Remets dans l’ordre le titre : « Les naissances baissent 5 ans de suite »', '出生数 5年連続 減少'),
      ],
    },
    {
      id: 'ja-n2-8',
      title: 'Au bureau : téléphone et réunion',
      subtitle: '〜でございます · 席を外しております · 会議',
      duration: 30,
      objectives: ['Répondre au téléphone au travail', 'Participer à une réunion'],
      sections: [
        {
          title: 'Au téléphone',
          examples: ex(`
            はい、ABC商事でございます。| hai, ABC shōji de gozaimasu | Oui, ici la société ABC.
            いつも お世話に なっております。| itsumo osewa ni natte orimasu | Merci pour votre fidélité.
            田中は ただいま 席を 外しております。| Tanaka wa tadaima seki o hazushite orimasu | M. Tanaka n’est pas à son poste pour le moment.
            折り返し お電話いたします。| orikaeshi odenwa itashimasu | Je vous rappelle.
          `),
          tip: 'On parle de ses **propres collègues** sans さん face à un client : 「田中は…」, jamais 「田中さんは…」.',
        },
        {
          title: 'En réunion',
          examples: ex(`
            では、会議を 始めます。| dewa, kaigi o hajimemasu | Commençons la réunion.
            ご意見は ありますか。| goiken wa arimasu ka | Avez-vous des remarques ?
            一つ 質問しても よろしいでしょうか。| hitotsu shitsumon shite mo yoroshii deshō ka | Puis-je poser une question ?
            検討させて いただきます。| kentō sasete itadakimasu | Nous allons étudier la question.
          `),
        },
      ],
      vocab: vocab(`
        会議 | かいぎ | réunion
        意見 | いけん | avis, remarque
        質問 | しつもん | question
        検討 | けんとう | examen, étude
        席を外す | せきをはずす | s’absenter de son poste
        折り返し | おりかえし | en retour (rappeler)
        商事 | しょうじ | société commerciale
        資料 | しりょう | documents
      `),
      exercises: [
        qcm('Face à un client, on parle de son collègue Tanaka ainsi :', '田中は…', ['田中さんは…', '田中様は…', '田中くんは…']),
        qcm('« 席を 外しております » veut dire…', 'Il n’est pas à son poste.', ['Il a démissionné.', 'Il est en réunion.', 'Il est malade.']),
        qcm('« 検討させて いただきます » signifie…', 'Nous allons étudier la question (souvent un refus poli).', ['C’est accepté.', 'Nous refusons clairement.', 'Merci pour votre question.']),
        qcm('« 折り返し お電話いたします » :', 'Je vous rappelle.', ['Veuillez rappeler.', 'Ne raccrochez pas.', 'Le numéro est faux.']),
        match('Associe', [['会議', 'réunion'], ['意見', 'avis'], ['質問', 'question'], ['資料', 'documents']]),
        type('Écris en hiragana la lecture de « 会議 »', 'かいぎ'),
        order('Remets dans l’ordre : « Commençons la réunion. »', 'では、会議を 始めます', 'Commençons la réunion.'),
        qcm('Comment se présente-t-on au téléphone pour sa société ?', '〜でございます', ['〜だよ', '〜です か', '〜と申し上げてください']),
      ],
    },
  ],
  'ja-n1': [
    {
      id: 'ja-n1-6',
      title: 'Kanji avancés et lectures multiples',
      subtitle: '生 · 上 · 下 · 行',
      duration: 30,
      objectives: ['Comprendre qu’un kanji a plusieurs lectures', 'Deviner la lecture grâce au contexte'],
      sections: [
        {
          title: 'Un kanji, beaucoup de lectures',
          table: table(`
            Mot | Lecture | Sens
            生きる | いきる | vivre
            生まれる | うまれる | naître
            学生 | がくせい | étudiant
            一生 | いっしょう | toute la vie
            生ビール | なまビール | bière pression
            芝生 | しばふ | pelouse
          `),
          tip: '生 a plus de 10 lectures ! La lecture **kun** va avec les okurigana (生**きる**), la lecture **on** dans les composés (学**生**).',
        },
        {
          title: 'Autres kanji piégeux',
          examples: ex(`
            上手 | じょうず | doué
            下手 | へた | maladroit
            行う | おこなう | réaliser, mener
            銀行 | ぎんこう | banque
            大人 | おとな | adulte (lecture spéciale)
            今日 | きょう | aujourd’hui (lecture spéciale)
          `),
        },
      ],
      vocab: vocab(`
        生きる | いきる | vivre
        一生 | いっしょう | toute la vie
        下手 | へた | maladroit
        行う | おこなう | mener, réaliser
        大人 | おとな | adulte
        今日 | きょう | aujourd’hui
        明日 | あした | demain
        お土産 | おみやげ | souvenir (cadeau)
      `),
      exercises: [
        qcm('Lecture de « 学生 » :', 'がくせい', ['がくしょう', 'まなびせい', 'がくなま']),
        qcm('Lecture de « 大人 » :', 'おとな', ['だいじん', 'たいじん', 'おおひと']),
        qcm('Sens de « 下手 » :', 'maladroit', ['la main', 'en bas', 'doué']),
        qcm('La lecture on s’utilise surtout…', 'dans les composés de kanji', ['avec les okurigana', 'dans les noms propres uniquement', 'jamais']),
        match('Associe', [['一生', 'toute la vie'], ['生ビール', 'bière pression'], ['行う', 'mener'], ['お土産', 'souvenir']]),
        type('Écris en hiragana la lecture de « 今日 »', 'きょう'),
        type('Écris en hiragana la lecture de « 上手 »', 'じょうず'),
        qcm('Lecture de « 生まれる » :', 'うまれる', ['いまれる', 'なまれる', 'せいまれる']),
      ],
    },
    {
      id: 'ja-n1-7',
      title: 'Nuances de fin de phrase',
      subtitle: '〜ものだ · 〜ことだ · 〜わけがない · 〜にすぎない',
      duration: 30,
      objectives: ['Exprimer la nostalgie, le conseil, l’impossibilité', 'Minimiser'],
      sections: [
        {
          title: 'Des fins de phrase très riches',
          table: table(`
            Forme | Nuance | Exemple
            〜ものだ | vérité générale ; nostalgie (passé) | 子供の頃は よく 遊んだものだ。
            〜ことだ | conseil fort | 合格したいなら、毎日 勉強することだ。
            〜わけがない | c’est impossible | 彼が 知らないわけがない。
            〜にすぎない | ce n’est que | それは 噂にすぎない。
            〜ざるを得ない | ne pas pouvoir faire autrement | 認めざるを得ない。
          `),
        },
        {
          title: 'En contexte',
          examples: ex(`
            人生とは 不思議なものだ。| jinsei to wa fushigi na mono da | La vie est une chose étrange.
            無理を しないことだ。| muri o shinai koto da | Surtout, ne force pas.
            中止せざるを得なかった。| chūshi sezaru o enakatta | Nous avons dû annuler.
          `),
        },
      ],
      vocab: vocab(`
        人生 | じんせい | la vie
        不思議 | ふしぎ | étrange, mystérieux
        噂 | うわさ | rumeur
        認める | みとめる | admettre
        中止 | ちゅうし | annulation
        無理 | むり | impossible, excessif
        合格 | ごうかく | réussite (examen)
        頃 | ころ | époque, moment
      `),
      exercises: [
        qcm('« よく 遊んだものだ » exprime…', 'la nostalgie', ['un conseil', 'une impossibilité', 'une obligation']),
        qcm('« 毎日 練習することだ » est…', 'un conseil fort', ['un souvenir', 'une rumeur', 'un refus']),
        qcm('« 彼が 知らないわけがない » veut dire…', 'Il est impossible qu’il ne le sache pas.', ['Il ne sait pas pourquoi.', 'Il n’y a pas de raison de savoir.', 'Il ne veut pas savoir.']),
        qcm('« 噂にすぎない » veut dire…', 'Ce n’est qu’une rumeur.', ['C’est plus qu’une rumeur.', 'La rumeur est vraie.', 'Il faut écouter la rumeur.']),
        match('Associe', [['人生', 'la vie'], ['中止', 'annulation'], ['認める', 'admettre'], ['不思議', 'étrange']]),
        order('Remets dans l’ordre : « Nous avons dû annuler. »', '中止せざるを 得なかった', 'Nous avons dû annuler.'),
        type('Écris en hiragana la lecture de « 噂 »', 'うわさ'),
        qcm('« 〜ざるを得ない » veut dire…', 'ne pas pouvoir faire autrement que', ['ne pas avoir le droit de', 'faire exprès', 'refuser de']),
      ],
    },
    {
      id: 'ja-n1-8',
      title: 'Saisons et lettres traditionnelles',
      subtitle: '時候の挨拶 · 拝啓 · 敬具',
      duration: 25,
      objectives: ['Comprendre les formules saisonnières', 'Structurer une lettre traditionnelle'],
      sections: [
        {
          title: 'Le cadre d’une lettre',
          body: 'Une lettre formelle commence par **拝啓** (はいけい) et se termine par **敬具** (けいぐ). Juste après 拝啓, on place une **formule de saison** (時候の挨拶).',
          table: table(`
            Mois | Formule | Sens
            1月 | 新春の候 | en ce début d’année
            4月 | 春暖の候 | en cette douceur printanière
            7月 | 盛夏の候 | au cœur de l’été
            10月 | 秋晴れの候 | par ce beau temps d’automne
            12月 | 師走の候 | en ce mois de décembre affairé
          `),
        },
        {
          title: 'Formules d’usage',
          examples: ex(`
            皆様には ますます ご清栄のことと お慶び申し上げます。| minasama ni wa masumasu goseiei no koto to oyorokobi mōshiagemasu | Je me réjouis de votre prospérité.
            時節柄、ご自愛ください。| jisetsugara, gojiai kudasai | Prenez soin de vous en cette saison.
          `),
          tip: '**師走** (しわす), le nom ancien de décembre, signifie « les maîtres courent » : même les moines sont pressés en fin d’année !',
        },
      ],
      vocab: vocab(`
        拝啓 | はいけい | Madame, Monsieur (ouverture)
        敬具 | けいぐ | salutations (clôture)
        候 | こう | saison, période (écrit)
        自愛 | じあい | prendre soin de soi
        師走 | しわす | décembre (ancien)
        挨拶 | あいさつ | salutation
        季節 | きせつ | saison
        手紙 | てがみ | lettre
      `),
      exercises: [
        qcm('Une lettre formelle commence par…', '拝啓', ['敬具', '以上', 'よろしく']),
        qcm('Et se termine par…', '敬具', ['拝啓', '候', '挨拶']),
        qcm('« 師走 » est l’ancien nom de…', 'décembre', ['janvier', 'avril', 'juillet']),
        qcm('« ご自愛ください » veut dire…', 'Prenez soin de vous.', ['Aimez-vous les uns les autres.', 'Répondez vite.', 'Bonne année.']),
        match('Associe', [['手紙', 'lettre'], ['季節', 'saison'], ['挨拶', 'salutation'], ['盛夏', 'plein été']]),
        type('Écris en hiragana la lecture de « 手紙 »', 'てがみ'),
        type('Écris en hiragana la lecture de « 拝啓 »', 'はいけい'),
        qcm('Où place-t-on la formule de saison ?', 'juste après 拝啓', ['à la fin', 'dans la signature', 'sur l’enveloppe']),
      ],
    },
  ],
}
