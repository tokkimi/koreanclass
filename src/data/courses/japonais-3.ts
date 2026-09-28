import type { Level } from '../types.js'
import { qcm, match, order } from '../helpers.js'
import { dlg, ex, table, type, vocab } from './dsl.js'

export const jaN2: Level = {
  id: 'ja-n2',
  index: 4,
  name: 'Niveau 4 — Intermédiaire avancé',
  korean: 'ちゅうじょうきゅう',
  cefr: 'B2',
  topik: 'JLPT N2',
  color: '#5f3dc4',
  description:
    'Maîtriser le keigo (langage honorifique) pour le travail et les services, faire faire quelque chose, exprimer des nuances logiques et lire des textes structurés. C’est le niveau demandé par beaucoup d’entreprises japonaises.',
  lessons: [
    {
      id: 'ja-n2-1',
      title: 'Le keigo respectueux (sonkeigo)',
      subtitle: 'いらっしゃる · めしあがる · お〜になる',
      duration: 35,
      objectives: ['Élever les actions de l’interlocuteur', 'Connaître les verbes honorifiques spéciaux'],
      sections: [
        {
          title: 'Pourquoi le keigo ?',
          body: 'Le **尊敬語 (sonkeigo)** élève les actions d’une personne respectée (client, supérieur). Le **謙譲語 (kenjōgo)** abaisse les siennes. Le **丁寧語** est simplement le style です / ます.',
        },
        {
          title: 'Verbes spéciaux',
          table: table(`
            Verbe courant | Sonkeigo | Sens
            いる / いく / くる | いらっしゃる | être, aller, venir
            たべる / のむ | めしあがる | manger, boire
            いう | おっしゃる | dire
            みる | ごらんになる | regarder
            する | なさる | faire
            しっている | ごぞんじだ | savoir, connaître
          `),
        },
        {
          title: 'Forme générale : お + radical + になる',
          examples: ex(`
            しゃちょうは もう おかえりに なりました。| shachō wa mō okaeri ni narimashita | Le directeur est déjà rentré.
            どうぞ おかけ ください。| dōzo okake kudasai | Asseyez-vous, je vous en prie.
            なにを めしあがりますか。| nani o meshiagarimasu ka | Que désirez-vous manger ?
          `),
        },
      ],
      vocab: vocab(`
        いらっしゃる | irassharu | être / aller / venir (resp.)
        めしあがる | meshiagaru | manger / boire (resp.)
        おっしゃる | ossharu | dire (resp.)
        ごらんになる | goran ni naru | regarder (resp.)
        なさる | nasaru | faire (resp.)
        しゃちょう | shachō | directeur, PDG
        おきゃくさま | okyakusama | client (très poli)
        ぶちょう | buchō | chef de service
      `),
      dialogue: dlg(`
        受付: いらっしゃいませ。おなまえを うかがっても よろしいでしょうか。| Bienvenue. Puis-je vous demander votre nom ?
        客: デュポンです。たなか ぶちょうは いらっしゃいますか。| Dupont. Monsieur Tanaka est-il là ?
        受付: はい、しょうしょう おまち ください。| Oui, veuillez patienter un instant.
      `),
      exercises: [
        qcm('Sonkeigo de « いう » ?', 'おっしゃる', ['もうす', 'いわれる', 'いらっしゃる']),
        qcm('Sonkeigo de « たべる » ?', 'めしあがる', ['いただく', 'たべられる', 'おたべする']),
        qcm('Le sonkeigo sert à…', 'élever les actions de l’autre', ['abaisser ses propres actions', 'parler entre amis', 'donner un ordre']),
        match('Associe', [['いらっしゃる', 'être / aller / venir'], ['ごらんになる', 'regarder'], ['なさる', 'faire'], ['ごぞんじだ', 'savoir']]),
        type('Complète : どうぞ お___ ください。(asseyez-vous — かける)', 'かけ'),
        qcm('« しゃちょうは おかえりに なりました » veut dire…', 'Le directeur est rentré.', ['Je suis rentré chez le directeur.', 'Le directeur va rentrer.', 'Rentrez, monsieur le directeur.']),
      ],
    },
    {
      id: 'ja-n2-2',
      title: 'Le keigo modeste (kenjōgo)',
      subtitle: 'まいる · いただく · もうす · お〜する',
      duration: 35,
      objectives: ['Parler humblement de soi', 'Rédiger des formules de service'],
      sections: [
        {
          title: 'Verbes spéciaux',
          table: table(`
            Verbe courant | Kenjōgo | Sens
            いく / くる | まいる / うかがう | aller, venir
            いる | おる | être
            たべる / もらう | いただく | manger, recevoir
            いう | もうす / もうしあげる | dire
            する | いたす | faire
            みる | はいけんする | voir
          `),
        },
        {
          title: 'Forme générale : お + radical + する',
          examples: ex(`
            おにもつを おもちします。| onimotsu o omochi shimasu | Je vais porter vos bagages.
            デュポンと もうします。| dyupon to mōshimasu | Je m’appelle Dupont.
            あした 10じに うかがいます。| ashita jūji ni ukagaimasu | Je viendrai demain à 10 h.
            しょうしょう おまち ください。| shōshō omachi kudasai | Veuillez patienter un instant.
          `),
          tip: 'Ne jamais utiliser le kenjōgo pour les actions du client : 「いただいて ください」 est une faute fréquente, on dit 「めしあがって ください」.',
        },
      ],
      vocab: vocab(`
        まいる | mairu | aller / venir (humble)
        うかがう | ukagau | visiter, demander (humble)
        いただく | itadaku | recevoir, manger (humble)
        もうす | mōsu | dire, s’appeler (humble)
        いたす | itasu | faire (humble)
        はいけんする | haiken suru | voir (humble)
        しょうしょう | shōshō | un peu (formel)
        かしこまりました | kashikomarimashita | entendu, bien reçu
      `),
      exercises: [
        qcm('Kenjōgo de « いう » ?', 'もうす', ['おっしゃる', 'いわれる', 'いたす']),
        qcm('Kenjōgo de « する » ?', 'いたす', ['なさる', 'される', 'おする']),
        qcm('Que dit un serveur pour « je vais porter vos bagages » ?', 'おにもつを おもちします', ['おにもつを おもちに なります', 'おにもつを もって ください', 'おにもつを もたれます']),
        match('Associe', [['いただく', 'recevoir, manger'], ['まいる', 'aller, venir'], ['おる', 'être'], ['はいけんする', 'voir']]),
        type('Complète : デュポンと ___。(je m’appelle Dupont — humble, poli)', 'もうします'),
        qcm('« かしこまりました » veut dire…', 'Bien reçu, entendu.', ['Excusez-moi.', 'Veuillez patienter.', 'Bienvenue.']),
      ],
    },
    {
      id: 'ja-n2-3',
      title: 'Faire faire : causatif et causatif-passif',
      subtitle: '〜させる · 〜させられる · 〜させて ください',
      duration: 30,
      objectives: ['Faire faire / laisser faire', 'Dire qu’on a été forcé', 'Demander la permission poliment'],
      sections: [
        {
          title: 'Le causatif',
          body: 'Groupe 2 : る → **させる**. Groupe 1 : u → **aseru** (いく → いかせる). する → **させる**, くる → **こさせる**. Selon le contexte : **faire faire** ou **laisser faire**.',
          examples: ex(`
            ははは こどもに やさいを たべさせました。| haha wa kodomo ni yasai o tabesasemashita | La mère a fait manger des légumes à l’enfant.
            すこし かんがえさせて ください。| sukoshi kangaesasete kudasai | Laissez-moi réfléchir un peu.
          `),
        },
        {
          title: 'Causatif-passif : « être obligé de »',
          body: 'Groupe 2 : **させられる**. Groupe 1 : **aserareru** ou forme courte **asareru** (のむ → のまされる).',
          examples: ex(`
            ぶちょうに おさけを のまされました。| buchō ni osake o nomasaremashita | Mon chef m’a forcé à boire de l’alcool.
            こどもの ころ、ピアノを ならわされました。| kodomo no koro, piano o narawasaremashita | Enfant, on m’a obligé à apprendre le piano.
          `),
        },
      ],
      vocab: vocab(`
        かんがえる | kangaeru | réfléchir
        ならう | narau | apprendre (avec quelqu’un)
        まつ | matsu | attendre
        ざんぎょう | zangyō | heures supplémentaires
        むりやり | muriyari | de force
        やめる | yameru | arrêter, quitter
        まかせる | makaseru | confier
        よろこぶ | yorokobu | se réjouir
      `),
      exercises: [
        qcm('Causatif de « いく » ?', 'いかせる', ['いかれる', 'いけさせる', 'いかさる']),
        qcm('Causatif de « たべる » ?', 'たべさせる', ['たべられる', 'たべさる', 'たべかせる']),
        qcm('« かんがえさせて ください » veut dire…', 'Laissez-moi réfléchir.', ['Réfléchissez, s’il vous plaît.', 'Faites-le réfléchir.', 'J’ai été forcé de réfléchir.']),
        qcm('« ざんぎょうさせられた » veut dire…', 'On m’a obligé à faire des heures sup.', ['J’ai fait faire des heures sup.', 'Je veux faire des heures sup.', 'Je n’ai pas fait d’heures sup.']),
        type('Causatif de « する »', 'させる'),
        order('Remets dans l’ordre : « Laissez-moi réfléchir un peu. »', 'すこし かんがえさせて ください', 'Laissez-moi réfléchir un peu.'),
      ],
    },
    {
      id: 'ja-n2-4',
      title: 'Nuances logiques',
      subtitle: '〜わけ · 〜はず · 〜ものの · 〜にもかかわらず',
      duration: 35,
      objectives: ['Exprimer l’évidence et la déduction', 'Exprimer la concession'],
      sections: [
        {
          title: 'はず et わけ',
          table: table(`
            Forme | Sens | Exemple
            〜はずだ | normalement, ça devrait | かれは もう ついた はずです。
            〜はずがない | impossible que | そんな はずが ない。
            〜わけだ | c’est donc pour ça que | だから げんきが ない わけだ。
            〜わけではない | ce n’est pas que | きらいな わけでは ない。
            〜わけにはいかない | je ne peux pas me permettre | やすむ わけには いかない。
          `),
        },
        {
          title: 'Concession',
          examples: ex(`
            がんばった ものの、ごうかくできなかった。| ganbatta mono no, gōkaku dekinakatta | Bien que j’aie fait des efforts, je n’ai pas réussi.
            あめにも かかわらず、おおぜい きました。| ame ni mo kakawarazu, ōzei kimashita | Malgré la pluie, beaucoup de gens sont venus.
            たかい わりに おいしくない。| takai wari ni oishikunai | Pour le prix, ce n’est pas bon.
          `),
        },
      ],
      vocab: vocab(`
        ごうかく | gōkaku | réussite (examen)
        おおぜい | ōzei | beaucoup de monde
        けっか | kekka | résultat
        りゆう | riyū | raison
        とうぜん | tōzen | évidemment
        かならず | kanarazu | sans faute
        じつは | jitsu wa | en fait
        たしかに | tashika ni | certes
      `),
      exercises: [
        qcm('« もう ついた はずです » veut dire…', 'Il devrait déjà être arrivé.', ['Il est sûrement parti.', 'Il ne peut pas arriver.', 'C’est pour ça qu’il est arrivé.']),
        qcm('« きらいな わけでは ない » veut dire…', 'Ce n’est pas que je n’aime pas.', ['Je déteste ça.', 'Je ne peux pas aimer.', 'C’est pour ça que je n’aime pas.']),
        qcm('Quelle forme exprime « malgré » ?', '〜にもかかわらず', ['〜はずだ', '〜わけだ', '〜ために']),
        qcm('« やすむ わけには いかない » veut dire…', 'Je ne peux pas me permettre de m’absenter.', ['Je n’ai pas envie de me reposer.', 'Il est impossible qu’il se repose.', 'Je dois me reposer.']),
        match('Associe', [['りゆう', 'raison'], ['けっか', 'résultat'], ['とうぜん', 'évidemment'], ['じつは', 'en fait']]),
        type('Complète : そんな ___が ない。(c’est impossible)', 'はず'),
      ],
    },
    {
      id: 'ja-n2-5',
      title: 'Lire un texte structuré',
      subtitle: 'しかし · したがって · 一方 · つまり',
      duration: 30,
      objectives: ['Repérer les connecteurs d’un article', 'Résumer une idée'],
      sections: [
        {
          title: 'Les connecteurs de l’écrit',
          table: table(`
            Connecteur | Lecture | Sens
            しかし | shikashi | cependant
            したがって | shitagatte | par conséquent
            一方 | ippō | en revanche, d’un autre côté
            つまり | tsumari | autrement dit
            さらに | sarani | de plus
            たとえば | tatoeba | par exemple
          `),
        },
        {
          title: 'Mini-texte',
          examples: ex(`
            日本では 高齢化が 進んでいる。| Nihon de wa kōreika ga susunde iru | Au Japon, le vieillissement progresse.
            一方、子どもの 数は 減っている。| ippō, kodomo no kazu wa hette iru | En revanche, le nombre d’enfants diminue.
            したがって、働く 人が 足りなくなる。| shitagatte, hataraku hito ga tarinaku naru | Par conséquent, on manque de main-d’œuvre.
          `),
          tip: 'Au JLPT N2, repère d’abord les connecteurs : ils indiquent où se trouve l’idée principale (souvent après しかし ou つまり).',
        },
      ],
      vocab: vocab(`
        高齢化 | こうれいか | vieillissement
        進む | すすむ | progresser
        減る | へる | diminuer
        増える | ふえる | augmenter
        足りる | たりる | suffire
        社会 | しゃかい | société
        問題 | もんだい | problème
        影響 | えいきょう | influence
      `),
      exercises: [
        qcm('Que veut dire « したがって » ?', 'par conséquent', ['cependant', 'par exemple', 'de plus']),
        qcm('Quel connecteur introduit un contraste ?', 'しかし', ['さらに', 'たとえば', 'したがって']),
        qcm('Que veut dire « 減る » ?', 'diminuer', ['augmenter', 'progresser', 'suffire']),
        match('Associe', [['つまり', 'autrement dit'], ['さらに', 'de plus'], ['たとえば', 'par exemple'], ['一方', 'en revanche']]),
        type('Écris en hiragana la lecture de « 問題 »', 'もんだい'),
        qcm('Où se trouve souvent l’idée principale ?', 'après しかし ou つまり', ['dans la première phrase', 'dans les exemples', 'après たとえば']),
      ],
    },
  ],
  test: [
    qcm('Sonkeigo de « みる » ?', 'ごらんになる', ['はいけんする', 'みられる', 'おみする']),
    qcm('Kenjōgo de « いく » ?', 'まいる', ['いらっしゃる', 'おいきになる', 'いかれる']),
    qcm('Au client, on dit…', 'めしあがって ください', ['いただいて ください', 'たべさせて ください', 'おたべして ください']),
    qcm('Kenjōgo de « もらう » ?', 'いただく', ['くださる', 'もらわれる', 'おもらいになる']),
    qcm('Causatif de « まつ » ?', 'またせる', ['まてる', 'またれる', 'まちさせる']),
    qcm('« のまされた » veut dire…', 'on m’a forcé à boire', ['j’ai fait boire', 'j’ai pu boire', 'on m’a bu']),
    qcm('« きらいな わけではない » exprime…', 'une négation partielle', ['une obligation', 'une certitude', 'un souhait']),
    qcm('« 一方 » veut dire…', 'en revanche', ['par conséquent', 'autrement dit', 'enfin']),
    match('Associe', [['おっしゃる', 'dire (resp.)'], ['もうす', 'dire (humble)'], ['なさる', 'faire (resp.)'], ['いたす', 'faire (humble)']]),
    order('Remets dans l’ordre : « Veuillez patienter un instant. »', 'しょうしょう おまち ください', 'Veuillez patienter un instant.'),
    type('Kenjōgo de « いる » (forme neutre)', 'おる'),
    type('Complète : 今日は 休む わけには ___。(je ne peux pas me permettre)', 'いかない'),
  ],
}

export const jaN1: Level = {
  id: 'ja-n1',
  index: 5,
  name: 'Niveau 5 — Avancé & courant',
  korean: 'じょうきゅう',
  cefr: 'C1-C2',
  topik: 'JLPT N1',
  color: '#364fc7',
  description:
    'Lire la presse et les essais, utiliser les tournures écrites du JLPT N1, jouer avec les onomatopées et les expressions à quatre kanji, et écrire un e-mail professionnel impeccable.',
  lessons: [
    {
      id: 'ja-n1-1',
      title: 'Le style écrit である',
      subtitle: '〜である · 〜ではない · 〜であろう',
      duration: 30,
      objectives: ['Reconnaître le style des essais et journaux', 'Transformer une phrase orale en écrit'],
      sections: [
        {
          title: 'だ / です → である',
          body: 'Les articles, mémoires et essais utilisent **である** : neutre, objectif, sans politesse. On évite les contractions orales (〜ちゃう, 〜てる).',
          table: table(`
            Oral | Écrit | Sens
            問題だ | 問題である | c’est un problème
            問題じゃない | 問題ではない | ce n’est pas un problème
            問題だろう | 問題であろう | ce sera sans doute un problème
            だから | したがって / ゆえに | donc
            でも | しかしながら | toutefois
          `),
        },
        {
          title: 'Exemples',
          examples: ex(`
            言語は 文化の 鏡である。| gengo wa bunka no kagami de aru | La langue est le miroir de la culture.
            この 問題は 容易ではない。| kono mondai wa yōi de wa nai | Ce problème n’est pas simple.
          `),
        },
      ],
      vocab: vocab(`
        言語 | げんご | langue, langage
        文化 | ぶんか | culture
        鏡 | かがみ | miroir
        容易 | ようい | facile
        論文 | ろんぶん | article scientifique, thèse
        筆者 | ひっしゃ | l’auteur
        主張 | しゅちょう | thèse, affirmation
        述べる | のべる | exposer, énoncer
      `),
      exercises: [
        qcm('Équivalent écrit de « 問題じゃない » ?', '問題ではない', ['問題でない', '問題じゃありません', '問題であらない']),
        qcm('Équivalent écrit de « でも » ?', 'しかしながら', ['だから', 'つまり', 'けど']),
        qcm('Que veut dire « 筆者 » ?', 'l’auteur', ['le lecteur', 'le journal', 'le stylo']),
        match('Associe', [['主張', 'thèse'], ['論文', 'article scientifique'], ['述べる', 'énoncer'], ['容易', 'facile']]),
        type('Transforme en style écrit : 大切だ', '大切である'),
        qcm('Le style である s’emploie surtout…', 'dans les essais et la presse', ['entre amis', 'avec un client', 'dans les SMS']),
      ],
    },
    {
      id: 'ja-n1-2',
      title: 'Tournures du JLPT N1',
      subtitle: '〜ならでは · 〜をもって · 〜に至る · 〜ずにはいられない',
      duration: 35,
      objectives: ['Comprendre les structures typiques du N1', 'Les réemployer dans un texte'],
      sections: [
        {
          title: 'Structures clés',
          table: table(`
            Structure | Sens | Exemple
            〜ならでは | propre à, typique de | 京都ならではの 景色
            〜をもって | à compter de ; au moyen de | 本日をもって 閉店いたします。
            〜に至る | aller jusqu’à | 死に至る 病
            〜ずにはいられない | ne pas pouvoir s’empêcher de | 笑わずには いられない。
            〜まじき | inadmissible pour | 教師に あるまじき 行為
            〜をよそに | au mépris de | 心配を よそに 出かけた。
          `),
        },
        {
          title: 'En contexte',
          examples: ex(`
            この 味は 老舗ならではだ。| kono aji wa shinise nara de wa da | Ce goût est propre aux vieilles maisons.
            三月末をもって 退職する。| sangatsu-matsu o motte taishoku suru | Je quitte l’entreprise fin mars.
            あの 映画は 泣かずには いられなかった。| ano eiga wa nakazu ni wa irarenakatta | Je n’ai pas pu m’empêcher de pleurer devant ce film.
          `),
        },
      ],
      vocab: vocab(`
        景色 | けしき | paysage
        閉店 | へいてん | fermeture du magasin
        老舗 | しにせ | maison ancienne (commerce)
        退職 | たいしょく | départ, démission
        行為 | こうい | acte
        病 | やまい | maladie (écrit)
        心配 | しんぱい | inquiétude
        本日 | ほんじつ | aujourd’hui (formel)
      `),
      exercises: [
        qcm('« 京都ならではの 景色 » veut dire…', 'un paysage typique de Kyoto', ['un paysage sauf Kyoto', 'un paysage près de Kyoto', 'un paysage comme Kyoto']),
        qcm('« 本日をもって 閉店いたします » veut dire…', 'Nous fermons définitivement à compter d’aujourd’hui.', ['Nous ouvrons aujourd’hui.', 'Nous fermons tôt aujourd’hui.', 'Le magasin est fermé demain.']),
        qcm('« 笑わずには いられない » veut dire…', 'ne pas pouvoir s’empêcher de rire', ['ne pas pouvoir rire', 'il ne faut pas rire', 'rire sans raison']),
        match('Associe', [['〜に至る', 'aller jusqu’à'], ['〜をよそに', 'au mépris de'], ['〜まじき', 'inadmissible'], ['〜ならでは', 'typique de']]),
        type('Écris en hiragana la lecture de « 本日 »', 'ほんじつ'),
        qcm('Que veut dire « 老舗 » ?', 'une maison de commerce ancienne', ['un vieux quartier', 'un magasin fermé', 'une personne âgée']),
      ],
    },
    {
      id: 'ja-n1-3',
      title: 'Onomatopées et mimétiques',
      subtitle: 'わくわく · どきどき · ぺらぺら · ぐっすり',
      duration: 25,
      objectives: ['Comprendre les giongo / gitaigo courants', 'Les utiliser naturellement à l’oral'],
      sections: [
        {
          title: 'Des sons pour décrire',
          body: 'Le japonais a des centaines de mots qui imitent des sons (**擬音語**) ou des états (**擬態語**). Ils sont partout : manga, conversation, publicité.',
          table: table(`
            Mot | Sens | Exemple
            わくわく | excité, impatient | 明日の 旅行が わくわくする。
            どきどき | cœur qui bat | 面接の 前は どきどきする。
            ぺらぺら | parler couramment | 日本語が ぺらぺらだ。
            ぐっすり | (dormir) profondément | ぐっすり 眠った。
            いらいら | agacé | 待たされて いらいらする。
            にこにこ | sourire | いつも にこにこ している。
          `),
        },
      ],
      vocab: vocab(`
        わくわく | wakuwaku | excité, impatient
        どきどき | dokidoki | le cœur qui bat
        ぺらぺら | perapera | couramment
        ぐっすり | gussuri | profondément (sommeil)
        いらいら | iraira | agacé
        にこにこ | nikoniko | souriant
        ざあざあ | zāzā | pluie battante
        ぴかぴか | pikapika | étincelant
      `),
      dialogue: dlg(`
        ゆき: レアさん、日本語 ぺらぺらだね！| Léa, tu parles japonais couramment !
        レア: まだまだだよ。でも 来月の 旅行、わくわくしてる。| Pas encore. Mais j’ai hâte du voyage le mois prochain.
      `),
      exercises: [
        qcm('« ぺらぺら » s’utilise pour…', 'parler une langue couramment', ['dormir profondément', 'être en colère', 'briller']),
        qcm('Avant un entretien, le cœur fait…', 'どきどき', ['ぐっすり', 'にこにこ', 'ざあざあ']),
        qcm('« いらいらする » veut dire…', 'être agacé', ['être impatient (joie)', 'avoir sommeil', 'rire']),
        match('Associe', [['ぐっすり', 'dormir profondément'], ['にこにこ', 'souriant'], ['ざあざあ', 'pluie battante'], ['ぴかぴか', 'étincelant']]),
        type('Quelle onomatopée pour « excité, impatient (joyeusement) » ?', 'わくわく'),
        qcm('« 雨が ざあざあ 降っている » veut dire…', 'Il pleut à verse.', ['Il bruine.', 'Il a arrêté de pleuvoir.', 'Il va pleuvoir.']),
      ],
    },
    {
      id: 'ja-n1-4',
      title: 'Proverbes et expressions à quatre kanji',
      subtitle: '一石二鳥 · 猿も木から落ちる',
      duration: 25,
      objectives: ['Comprendre les yojijukugo courants', 'Citer quelques proverbes'],
      sections: [
        {
          title: '四字熟語 (yojijukugo)',
          table: table(`
            Expression | Lecture | Sens
            一石二鳥 | いっせきにちょう | faire d’une pierre deux coups
            一期一会 | いちごいちえ | chaque rencontre est unique
            十人十色 | じゅうにんといろ | à chacun ses goûts
            自業自得 | じごうじとく | on récolte ce qu’on sème
            七転八起 | しちてんはっき | tomber sept fois, se relever huit
          `),
        },
        {
          title: 'Proverbes (ことわざ)',
          examples: ex(`
            猿も木から落ちる | saru mo ki kara ochiru | Même les singes tombent des arbres (tout le monde se trompe).
            花より団子 | hana yori dango | Les dango plutôt que les fleurs (le concret avant l’esthétique).
            石の上にも三年 | ishi no ue ni mo sannen | Trois ans même sur une pierre (la persévérance paie).
          `),
        },
      ],
      vocab: vocab(`
        一石二鳥 | いっせきにちょう | d’une pierre deux coups
        一期一会 | いちごいちえ | rencontre unique
        十人十色 | じゅうにんといろ | à chacun ses goûts
        自業自得 | じごうじとく | bien fait pour toi
        ことわざ | kotowaza | proverbe
        猿 | さる | singe
        団子 | だんご | boulette de riz
        石 | いし | pierre
      `),
      exercises: [
        qcm('« 一石二鳥 » veut dire…', 'faire d’une pierre deux coups', ['une rencontre unique', 'à chacun ses goûts', 'la persévérance paie']),
        qcm('« 猿も木から落ちる » veut dire…', 'Tout le monde peut se tromper.', ['Les singes sont maladroits.', 'Il faut grimper haut.', 'La chance tourne.']),
        qcm('Quel proverbe parle de persévérance ?', '石の上にも三年', ['花より団子', '十人十色', '自業自得']),
        match('Associe', [['一期一会', 'rencontre unique'], ['十人十色', 'à chacun ses goûts'], ['自業自得', 'on récolte ce qu’on sème'], ['七転八起', 'se relever toujours']]),
        type('Écris en hiragana la lecture de « 一期一会 »', 'いちごいちえ'),
        qcm('« 花より団子 » veut dire…', 'le concret avant l’esthétique', ['les fleurs sont belles', 'manger sous les cerisiers', 'offrir des fleurs']),
      ],
    },
    {
      id: 'ja-n1-5',
      title: 'L’e-mail professionnel',
      subtitle: 'お世話になっております · 何卒よろしくお願い申し上げます',
      duration: 30,
      objectives: ['Structurer un e-mail formel', 'Utiliser les formules d’ouverture et de clôture'],
      sections: [
        {
          title: 'La structure type',
          table: table(`
            Partie | Formule | Rôle
            Destinataire | 株式会社〇〇 田中様 | nom + 様
            Ouverture | いつも お世話に なっております。| formule de politesse
            Présentation | ABC社の デュポンでございます。| qui écrit
            Objet | 〜の件で ご連絡いたしました。| pourquoi
            Clôture | 何卒 よろしく お願い申し上げます。| salutations
          `),
        },
        {
          title: 'Formules utiles',
          examples: ex(`
            ご確認の ほど、よろしく お願いいたします。| gokakunin no hodo, yoroshiku onegai itashimasu | Merci de bien vouloir vérifier.
            ご多忙の ところ 恐れ入りますが…| gotabō no tokoro osoreirimasu ga | Désolé de vous déranger alors que vous êtes occupé…
            ご返信が 遅くなり、申し訳ございません。| gohenshin ga osoku nari, mōshiwake gozaimasen | Toutes mes excuses pour ma réponse tardive.
          `),
          tip: 'Au Japon, on n’entre jamais directement dans le sujet : l’ouverture お世話になっております est quasiment obligatoire.',
        },
      ],
      vocab: vocab(`
        件 | けん | affaire, sujet
        確認 | かくにん | vérification
        返信 | へんしん | réponse (e-mail)
        添付 | てんぷ | pièce jointe
        申し訳ございません | もうしわけございません | je suis vraiment désolé
        恐れ入ります | おそれいります | je suis confus (merci/excuses)
        様 | さま | M. / Mme (très poli)
        何卒 | なにとぞ | je vous en prie (formel)
      `),
      exercises: [
        qcm('Quelle formule ouvre presque toujours un e-mail pro ?', 'いつも お世話に なっております', ['おはようございます', 'はじめまして', 'よろしくね']),
        qcm('Comment s’adresser à M. Tanaka par écrit ?', '田中様', ['田中くん', '田中ちゃん', '田中']),
        qcm('« 添付 » veut dire…', 'pièce jointe', ['réponse', 'objet', 'signature']),
        match('Associe', [['確認', 'vérification'], ['返信', 'réponse'], ['件', 'sujet'], ['何卒', 'je vous en prie']]),
        type('Écris en hiragana la lecture de « 返信 »', 'へんしん'),
        qcm('« ご返信が 遅くなり、申し訳ございません » veut dire…', 'Pardon pour ma réponse tardive.', ['Merci pour votre réponse rapide.', 'Répondez vite, s’il vous plaît.', 'Je n’ai pas reçu de réponse.']),
      ],
    },
  ],
  test: [
    qcm('Équivalent écrit de « だろう » ?', 'であろう', ['でしょう', 'であるだろう', 'だろうである']),
    qcm('« 〜ならでは » veut dire…', 'propre à, typique de', ['sauf', 'au mépris de', 'jusqu’à']),
    qcm('« 〜ずにはいられない » veut dire…', 'ne pas pouvoir s’empêcher de', ['ne pas avoir le droit de', 'ne pas vouloir', 'devoir']),
    qcm('« ぐっすり 眠った » veut dire…', 'j’ai dormi profondément', ['j’ai mal dormi', 'je me suis endormi vite', 'j’ai fait la sieste']),
    qcm('« 十人十色 » veut dire…', 'à chacun ses goûts', ['dix couleurs', 'tout le monde est pareil', 'faire deux choses à la fois']),
    qcm('Formule de clôture d’un e-mail formel ?', '何卒 よろしく お願い申し上げます', ['じゃあね', 'お世話に なっております', 'はじめまして']),
    qcm('« 筆者の 主張 » veut dire…', 'la thèse de l’auteur', ['le stylo de l’auteur', 'le résumé du lecteur', 'le titre de l’article']),
    qcm('« 恐れ入りますが » sert à…', 'introduire poliment une demande', ['refuser', 'se féliciter', 'terminer un e-mail']),
    match('Associe', [['わくわく', 'excité'], ['いらいら', 'agacé'], ['どきどき', 'cœur qui bat'], ['にこにこ', 'souriant']]),
    order('Remets dans l’ordre : « La langue est le miroir de la culture. »', '言語は 文化の 鏡である', 'La langue est le miroir de la culture.'),
    type('Écris en hiragana la lecture de « 一石二鳥 »', 'いっせきにちょう'),
    type('Transforme en style écrit : 簡単じゃない', '簡単ではない'),
  ],
}
