import type { Level } from './types.js'
import { qcm, fill, match, order } from './helpers.js'

export const level4: Level = {
  id: 'intermediaire-avance',
  index: 4,
  name: 'Niveau 4 — Intermédiaire avancé',
  korean: '중급 2',
  cefr: 'B2',
  topik: 'TOPIK II — niveau 4',
  color: '#4a4a4f',
  description:
    "Rapporter des paroles, faire des suppositions, raconter ce qu'on a observé, nuancer ses propos (거든요, 잖아요), maîtriser le passif et le causatif. Vous devenez autonome dans la plupart des situations.",
  lessons: [
    {
      id: 'a1',
      title: 'Le discours indirect',
      subtitle: '-다고 하다 · -냐고 하다 · -자고 하다 · -(으)라고 하다',
      duration: 50,
      objectives: ['Rapporter une affirmation, une question, une proposition, un ordre', 'Utiliser les formes contractées de l’oral (-대요, -래요)'],
      sections: [
        {
          title: 'Affirmations : -다고 하다',
          table: {
            head: ['Type', 'Forme', 'Exemple'],
            rows: [
              ['Verbe (présent)', '-ㄴ/는다고', '간다고 했어요, 먹는다고 했어요'],
              ['Adjectif', '-다고', '바쁘다고 했어요'],
              ['Nom', '-(이)라고', '학생이라고 했어요'],
              ['Passé', '-았/었다고', '갔다고 했어요'],
              ['Futur', '-(으)ㄹ 거라고', '갈 거라고 했어요'],
            ],
          },
          examples: [{ ko: '민수 씨가 내일 바쁘다고 했어요.', fr: 'Minsu a dit qu’il était occupé demain.' }],
        },
        {
          title: 'Questions, propositions, ordres',
          table: {
            head: ['Type', 'Forme', 'Exemple'],
            rows: [
              ['Question', '-(느)냐고', '어디 가냐고 물어봤어요'],
              ['Proposition', '-자고', '같이 가자고 했어요'],
              ['Ordre / demande', '-(으)라고', '빨리 오라고 했어요'],
              ['Demande « me donner »', '-아/어 달라고', '도와 달라고 했어요'],
            ],
          },
        },
        {
          title: 'Contractions de l’oral',
          body: "-다고 해요 → **-대요** · -(이)라고 해요 → **-(이)래요** · -냐고 해요 → **-냬요** · -자고 해요 → **-재요** · -(으)라고 해요 → **-(으)래요**",
          examples: [
            { ko: '내일 비가 온대요.', fr: 'Il paraît qu’il va pleuvoir demain.' },
            { ko: '선생님이 숙제를 내래요.', fr: 'Le prof dit de rendre les devoirs.' },
            { ko: '그 식당이 맛있대요.', fr: 'Il paraît que ce restaurant est bon.' },
          ],
        },
      ],
      vocab: [
        { ko: '물어보다', rom: 'mureoboda', fr: 'demander, poser une question' },
        { ko: '전하다', rom: 'jeonhada', fr: 'transmettre' },
        { ko: '소문', rom: 'somun', fr: 'rumeur' },
        { ko: '뉴스', rom: 'nyuseu', fr: 'informations' },
        { ko: '빨리', rom: 'ppalli', fr: 'vite' },
        { ko: '내다', rom: 'naeda', fr: 'rendre, remettre, payer' },
      ],
      exercises: [
        qcm('Il a dit : « 저는 학생이에요 » →', '학생이라고 했어요.', ['학생이다고 했어요.', '학생이냐고 했어요.', '학생자고 했어요.']),
        qcm('Elle a dit : « 같이 먹어요! » (proposition) →', '같이 먹자고 했어요.', ['같이 먹는다고 했어요.', '같이 먹으라고 했어요.', '같이 먹냐고 했어요.']),
        qcm('Le prof a dit : « 조용히 하세요 » →', '조용히 하라고 했어요.', ['조용히 한다고 했어요.', '조용히 하자고 했어요.', '조용히 하냐고 했어요.']),
        qcm('Il a demandé : « 어디 살아요? » →', '어디 사냐고 물어봤어요.', ['어디 산다고 물어봤어요.', '어디 살자고 물어봤어요.', '어디 살라고 물어봤어요.']),
        qcm('Contraction de 춥다고 해요 :', '춥대요', ['춥래요', '춥재요', '춥냬요']),
        fill('Discours indirect de 먹다 (présent) + 고 했어요 :', ['먹는다고 했어요', '먹는다고 했어요.']),
        fill('Contraction de « 간다고 해요 » :', '간대요'),
        order('Remettez dans l’ordre', '내일 비가 온대요.', 'Il paraît qu’il va pleuvoir demain.'),
      ],
    },
    {
      id: 'a2',
      title: 'Suppositions',
      subtitle: '-는 것 같다 · -(으)ㄹ 것 같다 · -나 보다 · -(으)ㄴ/는 모양이다',
      duration: 40,
      objectives: ['Exprimer une impression', 'Faire une déduction à partir d’indices', 'Adoucir ses opinions'],
      sections: [
        {
          title: '-(으)ㄴ/는/(으)ㄹ 것 같다 : il semble que, je crois que',
          table: {
            head: ['Temps', 'Verbe', 'Adjectif'],
            rows: [
              ['Présent', '가는 것 같아요', '바쁜 것 같아요'],
              ['Passé', '간 것 같아요', '바빴던 것 같아요'],
              ['Futur / conjecture', '갈 것 같아요', '바쁠 것 같아요'],
            ],
          },
          examples: [
            { ko: '비가 올 것 같아요.', fr: 'On dirait qu’il va pleuvoir.' },
            { ko: '제 생각에는 이게 더 좋은 것 같아요.', fr: 'Je trouve que celui-ci est mieux.' },
          ],
          tip: "Les Coréens utilisent -것 같아요 pour adoucir une opinion, même quand ils en sont sûrs : 맛있는 것 같아요 = « c'est bon, je trouve ».",
        },
        {
          title: '-나 보다 / -(으)ㄴ가 보다 : déduction',
          body: "Déduction à partir d'un **indice observé** (pas pour soi-même). Verbe : **-나 봐요** ; adjectif : **-(으)ㄴ가 봐요**.",
          examples: [
            { ko: '불이 꺼져 있네요. 아무도 없나 봐요.', fr: 'La lumière est éteinte. Il n’y a personne, on dirait.' },
            { ko: '사람이 많네요. 유명한가 봐요.', fr: 'Il y a du monde. Ça doit être célèbre.' },
          ],
        },
        {
          title: '-(으)ㄴ/는 모양이다 : apparemment (plus formel)',
          examples: [{ ko: '길이 막히는 모양이에요.', fr: 'Apparemment, la route est bouchée.' }],
        },
      ],
      vocab: [
        { ko: '생각', rom: 'saenggak', fr: 'pensée, idée' },
        { ko: '불', rom: 'bul', fr: 'lumière ; feu' },
        { ko: '꺼지다', rom: 'kkeojida', fr: 's’éteindre' },
        { ko: '아무도', rom: 'amudo', fr: 'personne (+ négation)' },
        { ko: '길이 막히다', rom: 'giri makhida', fr: 'être embouteillé' },
        { ko: '피곤하다', rom: 'pigonhada', fr: 'être fatigué' },
      ],
      exercises: [
        qcm('« On dirait qu’il va neiger » :', '눈이 올 것 같아요.', ['눈이 온 것 같아요.', '눈이 오는가 봐요.', '눈이 올 모양이 있어요.']),
        qcm('« Il semble être occupé (maintenant) » :', '바쁜 것 같아요.', ['바쁘는 것 같아요.', '바쁠 것 같았어요.', '바쁜나 봐요.']),
        qcm('Déduction : il bâille → « Il doit être fatigué »', '피곤한가 봐요.', ['피곤하나 봐요.', '피곤할게요.', '피곤하려고 해요.']),
        qcm('Déduction : il mange beaucoup → « Il devait avoir faim »', '배가 고팠나 봐요.', ['배가 고픈가 했어요.', '배가 고프는 것 같아요.', '배가 고플게요.']),
        fill('« Il semble qu’il soit parti » (가다, passé) + 것 같아요 :', ['간 것 같아요', '간 것 같아요.']),
        order('Remettez dans l’ordre', '제 생각에는 이게 더 좋은 것 같아요.', 'Je trouve que celui-ci est mieux.'),
      ],
    },
    {
      id: 'a3',
      title: 'Raconter ce qu’on a vu',
      subtitle: '-더라고요 · -던 · -았/었던',
      duration: 40,
      objectives: ['Rapporter une expérience personnelle observée', 'Évoquer une habitude passée', 'Parler de souvenirs'],
      sections: [
        {
          title: '-더라고요 : j’ai constaté que...',
          body: "Rapporte ce que le locuteur a **personnellement vu ou ressenti** dans le passé, avec une nuance de découverte.",
          examples: [
            { ko: '한국 사람들은 정말 빨리 걷더라고요.', fr: 'Les Coréens marchent vraiment vite (j’ai remarqué).' },
            { ko: '그 영화 진짜 재미있더라고요.', fr: 'Ce film était vraiment bien (je l’ai vu).' },
          ],
        },
        {
          title: '-던 : action passée répétée ou interrompue',
          examples: [
            { ko: '제가 자주 가던 카페가 없어졌어요.', fr: 'Le café où j’allais souvent a disparu.' },
            { ko: '먹던 빵 어디 있어?', fr: 'Où est le pain que je mangeais (pas fini) ?' },
          ],
        },
        {
          title: '-았/었던 : action passée terminée (souvenir)',
          examples: [
            { ko: '작년에 갔던 제주도가 생각나요.', fr: 'Je repense à Jeju où je suis allé l’an dernier.' },
            { ko: '어렸을 때 살았던 집', fr: 'la maison où j’ai vécu enfant' },
          ],
        },
      ],
      vocab: [
        { ko: '진짜', rom: 'jinjja', fr: 'vraiment (oral)' },
        { ko: '자주', rom: 'jaju', fr: 'souvent' },
        { ko: '없어지다', rom: 'eopseojida', fr: 'disparaître' },
        { ko: '생각나다', rom: 'saenggangnada', fr: 'revenir en mémoire' },
        { ko: '어렸을 때', rom: 'eoryeosseul ttae', fr: 'quand j’étais petit' },
        { ko: '추억', rom: 'chueok', fr: 'souvenir' },
      ],
      exercises: [
        qcm('« (J’ai vu que) le métro de Séoul est très propre » :', '서울 지하철이 아주 깨끗하더라고요.', ['서울 지하철이 아주 깨끗할게요.', '서울 지하철이 아주 깨끗하자고요.', '서울 지하철이 아주 깨끗하려고요.']),
        qcm('« Le livre que je lisais (pas fini) » :', '읽던 책', ['읽을 책', '읽는다 책', '읽자 책']),
        qcm('« Le restaurant où nous sommes allés l’an dernier » :', '작년에 갔던 식당', ['작년에 가는 식당', '작년에 갈 식당', '작년에 가던다 식당']),
        qcm('-더라고요 exprime :', 'une chose que j’ai moi-même constatée', ['un ordre', 'une rumeur', 'un projet futur']),
        fill('Forme -더라고요 de 맛있다 :', '맛있더라고요'),
        order('Remettez dans l’ordre', '제가 자주 가던 카페가 없어졌어요.', 'Le café où j’allais souvent a disparu.'),
      ],
    },
    {
      id: 'a4',
      title: 'Causes avancées',
      subtitle: '-기 때문에 · -는 바람에 · -(으)ㄴ 덕분에 · -느라고',
      duration: 40,
      objectives: ['Nuancer la cause', 'Exprimer un résultat négatif inattendu', 'Remercier pour un effet positif'],
      sections: [
        {
          title: '-기 때문에 / N 때문에 : parce que (neutre, formel)',
          examples: [
            { ko: '길이 막히기 때문에 지하철을 타요.', fr: 'Comme la route est bouchée, je prends le métro.' },
            { ko: '감기 때문에 학교에 못 갔어요.', fr: 'À cause d’un rhume, je n’ai pas pu aller à l’école.' },
          ],
        },
        {
          title: '-는 바람에 : à cause d’un imprévu (résultat négatif)',
          body: 'Toujours suivi d’un **passé**, souvent négatif.',
          examples: [{ ko: '늦잠을 자는 바람에 비행기를 놓쳤어요.', fr: 'J’ai trop dormi, du coup j’ai raté l’avion.' }],
        },
        {
          title: '-(으)ㄴ 덕분에 / N 덕분에 : grâce à',
          examples: [
            { ko: '선생님 덕분에 시험에 합격했어요.', fr: 'Grâce à vous, j’ai réussi l’examen.' },
            { ko: '친구가 도와준 덕분에 빨리 끝났어요.', fr: 'Grâce à l’aide de mon ami, j’ai fini vite.' },
          ],
        },
        {
          title: '-느라고 : occupé à ... (donc pas pu)',
          body: 'Même sujet dans les deux propositions, verbe d’action, résultat souvent négatif.',
          examples: [{ ko: '게임하느라고 숙제를 못 했어요.', fr: 'Occupé à jouer, je n’ai pas fait mes devoirs.' }],
        },
      ],
      vocab: [
        { ko: '감기', rom: 'gamgi', fr: 'rhume' },
        { ko: '늦잠', rom: 'neutjam', fr: 'grasse matinée' },
        { ko: '놓치다', rom: 'nochida', fr: 'rater, manquer' },
        { ko: '합격하다', rom: 'hapgyeokhada', fr: 'réussir (un examen)' },
        { ko: '끝나다', rom: 'kkeunnada', fr: 'se terminer' },
        { ko: '비행기', rom: 'bihaenggi', fr: 'avion' },
      ],
      exercises: [
        qcm('« Grâce à toi, je me suis bien amusé » :', '네 덕분에 재미있게 놀았어.', ['너 때문에 재미있게 놀았어.', '너 바람에 재미있게 놀았어.', '너느라고 재미있게 놀았어.']),
        qcm('« Le bus est parti (imprévu), donc je suis en retard » :', '버스가 떠나는 바람에 늦었어요.', ['버스가 떠난 덕분에 늦었어요.', '버스가 떠나느라고 늦었어요.', '버스가 떠나니까 늦을게요.']),
        qcm('« Occupé à travailler, je n’ai pas mangé » :', '일하느라고 밥을 못 먹었어요.', ['일하는 덕분에 밥을 못 먹었어요.', '일하기 덕분에 밥을 먹었어요.', '일하느라고 밥을 먹으세요.']),
        qcm('Quelle forme est incompatible avec un impératif ?', 'Toutes les trois : -기 때문에, -는 바람에, -느라고', ['-(으)니까', 'Aucune', '-(으)면']),
        fill('« À cause de la pluie » (비 + 때문에) :', ['비 때문에']),
        order('Remettez dans l’ordre', '늦잠을 자는 바람에 비행기를 놓쳤어요.', 'J’ai trop dormi et j’ai raté l’avion.'),
      ],
    },
    {
      id: 'a5',
      title: 'Passif et causatif',
      subtitle: '-이/히/리/기- · -게 하다 · -아/어지다',
      duration: 45,
      objectives: ['Reconnaître les verbes passifs', 'Faire faire quelque chose à quelqu’un', 'Exprimer un changement d’état'],
      sections: [
        {
          title: 'Le passif lexical',
          table: {
            head: ['Actif', 'Passif', 'Sens'],
            rows: [
              ['보다', '보이다', 'être vu / se voir'],
              ['쓰다', '쓰이다', 'être écrit / utilisé'],
              ['닫다', '닫히다', 'se fermer'],
              ['잡다', '잡히다', 'être attrapé'],
              ['열다', '열리다', 's’ouvrir'],
              ['듣다', '들리다', 's’entendre'],
              ['팔다', '팔리다', 'se vendre'],
              ['안다', '안기다', 'être pris dans les bras'],
              ['끊다', '끊기다', 'être coupé'],
            ],
          },
          examples: [
            { ko: '여기서 바다가 보여요.', fr: 'D’ici, on voit la mer.' },
            { ko: '음악 소리가 들려요.', fr: 'On entend de la musique.' },
            { ko: '전화가 끊겼어요.', fr: 'L’appel a été coupé.' },
          ],
        },
        {
          title: 'Le causatif lexical',
          table: {
            head: ['Verbe', 'Causatif', 'Sens'],
            rows: [
              ['먹다', '먹이다', 'nourrir'],
              ['입다', '입히다', 'habiller'],
              ['울다', '울리다', 'faire pleurer'],
              ['웃다', '웃기다', 'faire rire'],
              ['자다', '재우다', 'endormir'],
              ['타다', '태우다', 'faire monter'],
            ],
          },
        },
        {
          title: '-게 하다 : faire faire, laisser faire',
          examples: [
            { ko: '엄마가 동생에게 채소를 먹게 했어요.', fr: 'Maman a fait manger des légumes à mon petit frère.' },
            { ko: '기다리게 해서 미안해요.', fr: 'Désolé de t’avoir fait attendre.' },
          ],
        },
        {
          title: '-아/어지다 : devenir, être rendu',
          examples: [
            { ko: '날씨가 따뜻해졌어요.', fr: 'Le temps s’est réchauffé.' },
            { ko: '한국어 실력이 좋아졌어요.', fr: 'Mon niveau de coréen s’est amélioré.' },
          ],
        },
      ],
      vocab: [
        { ko: '보이다', rom: 'boida', fr: 'être visible' },
        { ko: '들리다', rom: 'deullida', fr: 'être audible' },
        { ko: '팔리다', rom: 'pallida', fr: 'se vendre' },
        { ko: '웃기다', rom: 'utgida', fr: 'être drôle, faire rire' },
        { ko: '따뜻하다', rom: 'ttatteuthada', fr: 'être tiède, doux' },
        { ko: '실력', rom: 'sillyeok', fr: 'niveau, compétence' },
      ],
      exercises: [
        qcm('Passif de 열다 :', '열리다', ['열히다', '열이다', '열기다']),
        qcm('Passif de 듣다 :', '들리다', ['듣히다', '듣기다', '들이다']),
        qcm('Causatif de 먹다 :', '먹이다', ['먹히다', '먹리다', '먹기다'], '먹히다 = être mangé (passif).'),
        qcm('« Le temps s’est rafraîchi » :', '날씨가 시원해졌어요.', ['날씨가 시원하게 했어요.', '날씨가 시원해 있어요.', '날씨가 시원히 됐어요.']),
        qcm('« Ce produit se vend bien » :', '이 제품은 잘 팔려요.', ['이 제품은 잘 팔아요.', '이 제품은 잘 팔게 해요.', '이 제품은 잘 팔아져요.']),
        match('Associez', [
          ['보이다', 'être visible'],
          ['웃기다', 'faire rire'],
          ['닫히다', 'se fermer'],
          ['재우다', 'endormir'],
        ]),
        fill('« Mon coréen s’est amélioré » (좋다 + 아/어지다, passé) :', ['한국어 실력이 좋아졌어요', '한국어 실력이 좋아졌어요.', '한국어가 좋아졌어요', '한국어가 좋아졌어요.']),
      ],
    },
    {
      id: 'a6',
      title: 'Les nuances de fin de phrase',
      subtitle: '-거든요 · -잖아요 · -네요 · -군요',
      duration: 35,
      objectives: ['Justifier naturellement', 'Rappeler une évidence partagée', 'Exprimer la surprise ou la découverte'],
      sections: [
        {
          title: '-거든요 : c’est que... (explication)',
          examples: [
            { ko: '오늘 못 가요. 약속이 있거든요.', fr: 'Je ne peux pas venir aujourd’hui. C’est que j’ai un rendez-vous.' },
          ],
        },
        {
          title: '-잖아요 : tu sais bien que...',
          examples: [
            { ko: '제가 말했잖아요!', fr: 'Je te l’avais bien dit !' },
            { ko: '오늘 일요일이잖아요.', fr: 'On est dimanche, voyons.' },
          ],
        },
        {
          title: '-네요 : surprise immédiate',
          examples: [
            { ko: '한국어를 정말 잘하시네요!', fr: 'Vous parlez vraiment bien coréen !' },
            { ko: '비가 오네요.', fr: 'Tiens, il pleut.' },
          ],
        },
        {
          title: '-군요 / -구나 : je comprends (découverte)',
          examples: [
            { ko: '아, 프랑스에서 오셨군요.', fr: 'Ah, vous venez de France, je vois.' },
            { ko: '그렇구나!', fr: 'Ah d’accord ! (familier)' },
          ],
        },
      ],
      vocab: [
        { ko: '그렇다', rom: 'geureota', fr: 'être ainsi' },
        { ko: '정말', rom: 'jeongmal', fr: 'vraiment' },
        { ko: '잘하다', rom: 'jalhada', fr: 'être doué' },
        { ko: '역시', rom: 'yeoksi', fr: 'comme prévu, décidément' },
      ],
      exercises: [
        qcm('Vous justifiez votre fatigue : « J’ai travaillé tard hier, (c’est que...) »', '어제 늦게까지 일했거든요.', ['어제 늦게까지 일했잖아요.', '어제 늦게까지 일했네요.', '어제 늦게까지 일했군요.']),
        qcm('Vous voyez la neige en ouvrant la fenêtre :', '눈이 오네요!', ['눈이 오거든요!', '눈이 오잖아요!', '눈이 올게요!']),
        qcm('« Je te l’avais dit, non ? » :', '말했잖아요.', ['말했거든요.', '말했네요.', '말할게요.']),
        qcm('-군요 exprime :', 'la prise de conscience d’une information', ['un ordre', 'une promesse', 'une proposition']),
        fill('Forme -잖아요 de 알다 :', ['알잖아요']),
        order('Remettez dans l’ordre', '한국어를 정말 잘하시네요!', 'Vous parlez vraiment bien coréen !'),
      ],
    },
    {
      id: 'a7',
      title: 'Hypothèses et regrets',
      subtitle: '-(ㄴ/는)다면 · -았/었더라면 · -(으)ㄹ 텐데',
      duration: 40,
      objectives: ['Formuler une hypothèse irréelle', 'Exprimer un regret', 'Exprimer une attente ou un souhait'],
      sections: [
        {
          title: '-(ㄴ/는)다면 : si jamais (hypothèse)',
          examples: [
            { ko: '복권에 당첨된다면 세계 여행을 할 거예요.', fr: 'Si je gagnais au loto, je ferais le tour du monde.' },
            { ko: '내가 너라면 그렇게 안 할 거야.', fr: 'Si j’étais toi, je ne ferais pas ça.' },
          ],
        },
        {
          title: '-았/었더라면 : si seulement (regret)',
          examples: [
            { ko: '조금 더 일찍 출발했더라면 늦지 않았을 거예요.', fr: 'Si j’étais parti un peu plus tôt, je n’aurais pas été en retard.' },
          ],
        },
        {
          title: '-(으)ㄹ 텐데 : ce serait... (attente, souhait)',
          examples: [
            { ko: '피곤할 텐데 좀 쉬세요.', fr: 'Vous devez être fatigué, reposez-vous un peu.' },
            { ko: '시간이 있으면 좋을 텐데...', fr: 'Ce serait bien si j’avais le temps...' },
          ],
        },
      ],
      vocab: [
        { ko: '복권', rom: 'bokgwon', fr: 'loterie' },
        { ko: '당첨되다', rom: 'dangcheomdoeda', fr: 'gagner (tirage)' },
        { ko: '세계', rom: 'segye', fr: 'monde' },
        { ko: '출발하다', rom: 'chulbalhada', fr: 'partir' },
        { ko: '후회하다', rom: 'huhoehada', fr: 'regretter' },
      ],
      exercises: [
        qcm('« Si j’étais riche... » :', '부자라면', ['부자면서', '부자더라면', '부자니까']),
        qcm('« Si j’avais étudié, j’aurais réussi » :', '공부했더라면 합격했을 거예요.', ['공부한다면 합격해요.', '공부해서 합격했어요.', '공부하느라고 합격했어요.']),
        qcm('« Tu dois avoir faim, mange » :', '배고플 텐데 드세요.', ['배고프더라면 드세요.', '배고프는 바람에 드세요.', '배고팠잖아요 드세요.']),
        fill('Forme -는다면 de 가다 :', '간다면'),
        order('Remettez dans l’ordre', '내가 너라면 그렇게 안 할 거야.', 'Si j’étais toi, je ne ferais pas ça.'),
      ],
    },
  ],
  test: [
    qcm('Discours indirect : « 배고파요 » →', '배고프다고 했어요.', ['배고픈다고 했어요.', '배고프라고 했어요.', '배고프자고 했어요.']),
    qcm('Contraction de « 오라고 해요 » :', '오래요', ['온대요', '오재요', '오냬요']),
    qcm('« On dirait qu’il va pleuvoir » :', '비가 올 것 같아요.', ['비가 오는가 봐요.', '비가 오더라고요.', '비가 왔던 것 같아요.']),
    qcm('« (J’ai constaté que) c’était cher » :', '비싸더라고요.', ['비싸거든요.', '비쌀게요.', '비싸자고요.']),
    qcm('« La chanson que j’écoutais souvent » :', '자주 듣던 노래', ['자주 들을 노래', '자주 듣는다 노래', '자주 들려 노래']),
    qcm('« Grâce à mes parents » :', '부모님 덕분에', ['부모님 때문에', '부모님 바람에', '부모님느라고']),
    qcm('Passif de 잡다 :', '잡히다', ['잡이다', '잡리다', '잡기다']),
    qcm('« Il fait plus froid (c’est devenu froid) » :', '추워졌어요.', ['춥게 했어요.', '추워 있어요.', '추운 것 같았어요.']),
    qcm('« C’est que je suis malade » :', '아프거든요.', ['아프잖아요.', '아프네요.', '아플까요.']),
    qcm('« Si seulement j’avais su... » :', '알았더라면...', ['안다면...', '알면서...', '알거든요...']),
    match('Associez', [
      ['-잖아요', 'tu sais bien'],
      ['-네요', 'surprise'],
      ['-거든요', 'explication'],
      ['-더라고요', 'constat vécu'],
    ]),
    fill('Contraction de « 맛있다고 해요 » :', '맛있대요'),
    order('Remettez dans l’ordre', '선생님 덕분에 시험에 합격했어요.', 'Grâce à vous, j’ai réussi l’examen.'),
    qcm('Il a demandé : « 몇 살이에요? » →', '몇 살이냐고 물어봤어요.', ['몇 살이라고 물어봤어요.', '몇 살이자고 물어봤어요.', '몇 살이다고 물어봤어요.']),
    qcm('Causatif de 입다 :', '입히다', ['입이다', '입리다', '입기다']),
  ],
}
