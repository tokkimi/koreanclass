import { words } from './vocabulary'
import { passage, readingQuestion as Q, type KoreanReading } from './koreanReading'

type ThemeText = [title: string, lines: [string, string, string][], questions: [string, string, string, string, string][]]
/** Original short texts. Unknown connecting words are explained beside the text.
 * Questions ask only what the passage states, not general knowledge. */
const texts: Record<string, ThemeText> = {
  'Cuisine & ustensiles': ['Préparer la table', [
    ['식탁에 접시와 그릇이 있어요.', 'Il y a une assiette et un bol sur la table.', '에 situe les objets ; 와 relie deux noms : assiette et bol.'],
    ['저는 그릇에 국을 담아요.', 'Je mets de la soupe dans le bol.', '담다 = mettre dans un récipient ; 그릇에 indique le contenant.'],
    ['숟가락으로 국을 먹어요.', 'Je mange la soupe avec une cuillère.', '으로 indique l’instrument ; 국을 est l’objet de 먹어요.'],
  ], [['Dans quel récipient est la soupe ?', 'Dans le bol.', 'Dans la casserole.', 'Dans la tasse.', '그릇에 국을 담아요 : la soupe est mise dans le bol.'], ['Avec quoi mange-t-on la soupe ?', 'Une cuillère.', 'Un couteau.', 'Une fourchette.', '숟가락으로 indique l’instrument : avec une cuillère.']]],
  'Voyage & sorties': ['À l’hôtel', [
    ['저는 오늘 서울에 가요.', 'Aujourd’hui, je vais à Séoul.', '오늘 = aujourd’hui ; 에 indique la destination.'],
    ['가방에 여권과 표가 있어요.', 'Il y a un passeport et un billet dans le sac.', '가방에 indique le lieu ; 과 relie 여권 et 표.'],
    ['호텔에서 지도를 봐요.', 'Je regarde la carte à l’hôtel.', '에서 situe l’action ; 지도 = carte géographique.'],
  ], [['Où sont le passeport et le billet ?', 'Dans le sac.', 'Au cinéma.', 'Sur la carte.', '가방에…있어요 : ils se trouvent dans le sac.'], ['Que fait la personne à l’hôtel ?', 'Elle regarde la carte.', 'Elle achète un passeport.', 'Elle regarde un film.', '지도를 봐요 signifie regarder la carte.']]],
  'Loisirs & musique': ['Un après-midi musical', [
    ['저는 음악을 좋아해요.', 'J’aime la musique.', '을 marque l’objet de 좋아해요.'],
    ['집에서 기타를 쳐요.', 'Je joue de la guitare à la maison.', '기타를 치다 = jouer de la guitare.'],
    ['친구는 노래를 불러요.', 'Mon ami chante.', '노래를 부르다 = chanter ; 불러요 est la forme au présent poli.'],
  ], [['De quel instrument joue le narrateur ?', 'De la guitare.', 'Du piano.', 'Du violon.', '기타를 쳐요 : il joue de la guitare.'], ['Qui chante ?', 'L’ami.', 'Le professeur.', 'Personne.', '친구는 est le thème de la dernière phrase.']]],
  'Temps & saisons': ['Un week-end d’hiver', [
    ['지금은 겨울이에요.', 'C’est l’hiver en ce moment.', '지금 = maintenant ; 겨울 finit par une consonne, donc 이에요.'],
    ['오늘 아침에는 눈이 와요.', 'Il neige ce matin.', '눈이 오다 = neiger, littéralement « la neige vient ».'],
    ['내일 저녁에 친구를 만나요.', 'Je retrouve un ami demain soir.', '내일 저녁에 situe l’action dans le temps ; 만나다 = rencontrer.'],
  ], [['Quelle est la saison ?', 'L’hiver.', 'L’été.', 'Le printemps.', '겨울이에요 annonce la saison.'], ['Quand la personne voit-elle son ami ?', 'Demain soir.', 'Hier matin.', 'Aujourd’hui à midi.', '내일 = demain, 저녁 = soir.']]],
  'Fruits & légumes': ['Au marché', [
    ['오늘 시장에서 과일을 사요.', 'Aujourd’hui, j’achète des fruits au marché.', '시장에서 indique le lieu de l’achat ; 사다 = acheter.'],
    ['포도와 복숭아를 사요.', 'J’achète du raisin et des pêches.', '와 relie les deux fruits.'],
    ['양파는 사지 않아요.', 'Je n’achète pas d’oignons.', '-지 않아요 nie l’action ; 양파는 met les oignons en contraste.'],
  ], [['Quels fruits sont achetés ?', 'Du raisin et des pêches.', 'Des oranges et des citrons.', 'Des poires et des tomates.', '포도 = raisin ; 복숭아 = pêche.'], ['Qu’est-ce qui n’est pas acheté ?', 'Des oignons.', 'Du raisin.', 'Des pêches.', '사지 않아요 signifie « je n’achète pas ».']]],
  'À table': ['Le repas', [
    ['식탁에 밥과 국이 있어요.', 'Il y a du riz et de la soupe sur la table.', '밥 désigne ici le riz cuit ; 국 = soupe.'],
    ['저는 김치도 먹어요.', 'Je mange aussi du kimchi.', '도 ajoute « aussi ».'],
    ['동생은 우유를 마셔요.', 'Mon petit frère ou ma petite sœur boit du lait.', '동생 ne précise pas le genre ; 마시다 = boire.'],
  ], [['Qu’y a-t-il sur la table ?', 'Du riz et de la soupe.', 'Du fromage et du jus.', 'Seulement du sel.', '밥과 국이 있어요 énumère les deux aliments.'], ['Que boit 동생 ?', 'Du lait.', 'Du jus.', 'De la soupe.', '우유를 마셔요 : 우유 est le lait.']]],
  Animaux: ['Au zoo', [
    ['동물원에 코끼리와 원숭이가 있어요.', 'Il y a un éléphant et un singe au zoo.', '동물원 = zoo ; 와 relie les animaux.'],
    ['코끼리는 커요.', 'L’éléphant est grand.', '크다 = être grand ; 커요 est le présent poli.'],
    ['원숭이는 나무 위에 있어요.', 'Le singe est dans l’arbre.', '나무 위에 signifie sur l’arbre, en hauteur.'],
  ], [['Quel animal est grand ?', 'L’éléphant.', 'Le lapin.', 'Le mouton.', '코끼리는 커요 l’affirme explicitement.'], ['Où est le singe ?', 'Dans l’arbre.', 'Dans l’eau.', 'Sous la table.', '나무 위에 situe le singe en hauteur sur l’arbre.']]],
  'Nature & météo': ['Près de la rivière', [
    ['오늘은 하늘에 구름이 많아요.', 'Aujourd’hui, il y a beaucoup de nuages dans le ciel.', '많다 = être nombreux ; 하늘에 = dans le ciel.'],
    ['강 옆에 꽃이 있어요.', 'Il y a des fleurs à côté de la rivière.', '옆 = côté ; 강 옆에 situe les fleurs.'],
    ['바람이 불지만 비는 오지 않아요.', 'Le vent souffle, mais il ne pleut pas.', '-지만 oppose deux propositions ; -지 않아요 est la négation.'],
  ], [['Où sont les fleurs ?', 'À côté de la rivière.', 'Dans le lac.', 'Au sommet de la montagne.', '강 옆에 : à côté de la rivière.'], ['Pleut-il ?', 'Non.', 'Oui, beaucoup.', 'Le texte dit qu’il neige.', '비는 오지 않아요 : il ne pleut pas.']]],
  'À la maison': ['Dans la chambre', [
    ['제 방에 침대와 책상이 있어요.', 'Dans ma chambre, il y a un lit et un bureau.', '제 = mon / ma, forme polie ; 방에 = dans la chambre.'],
    ['책상 앞에 의자가 있어요.', 'Il y a une chaise devant le bureau.', '앞에 signifie devant.'],
    ['저는 창문을 열어요.', 'J’ouvre la fenêtre.', '열다 = ouvrir ; 을 marque l’objet.'],
  ], [['Où est la chaise ?', 'Devant le bureau.', 'Sur le lit.', 'Derrière le miroir.', '책상 앞에 : devant le bureau.'], ['Qu’ouvre la personne ?', 'La fenêtre.', 'Le réfrigérateur.', 'La porte.', '창문을 열어요 : elle ouvre la fenêtre.']]],
  'École & objets': ['Avant le cours', [
    ['저는 학생이에요.', 'Je suis élève.', '학생 finit par une consonne : 학생이에요.'],
    ['가방에 공책과 연필이 있어요.', 'Il y a un cahier et un crayon dans le sac.', '공책 = cahier ; 연필 = crayon.'],
    ['교실에서 선생님을 기다려요.', 'J’attends le professeur dans la salle de classe.', '기다리다 = attendre ; 에서 indique le lieu de l’action.'],
  ], [['Que contient le sac ?', 'Un cahier et un crayon.', 'Un téléphone et un ordinateur.', 'Un stylo et une gomme.', '공책과 연필이 있어요 donne les deux objets.'], ['Qui attend-on ?', 'Le professeur.', 'Le médecin.', 'Les parents.', '선생님을 est l’objet de 기다려요.']]],
  'Ville & transports': ['Aller à l’aéroport', [
    ['내일 공항에 가요.', 'Demain, je vais à l’aéroport.', '공항에 : destination ; 내일 : demain.'],
    ['집에서 역까지 버스를 타요.', 'Je prends le bus de chez moi jusqu’à la gare.', '에서…까지 marque le point de départ et l’arrivée.'],
    ['역에서 기차를 타요.', 'Je prends le train à la gare.', '기차 = train ; 타다 = prendre un moyen de transport.'],
  ], [['Quel transport mène de la maison à la gare ?', 'Le bus.', 'L’avion.', 'Le métro.', '집에서 역까지 버스를 타요 : cette étape se fait en bus.'], ['Où se rend la personne demain ?', 'À l’aéroport.', 'À la pharmacie.', 'Au parc.', '내일 공항에 가요 donne la destination finale annoncée.']]],
  Vêtements: ['S’habiller pour le froid', [
    ['오늘은 추워요.', 'Il fait froid aujourd’hui.', '춥다 devient 추워요 au présent poli.'],
    ['저는 코트와 바지를 입어요.', 'Je mets un manteau et un pantalon.', '입다 s’utilise pour ces vêtements.'],
    ['장갑도 끼고 목도리도 해요.', 'Je mets aussi des gants et une écharpe.', 'On dit 장갑을 끼다 et 목도리를 하다 ; un même verbe français ne se traduit pas toujours pareil.'],
  ], [['Pourquoi choisit-on ces vêtements ?', 'Il fait froid.', 'Il fait très chaud.', 'Il y a un mariage.', '오늘은 추워요 donne le contexte du choix.'], ['Quels accessoires sont mentionnés ?', 'Des gants et une écharpe.', 'Un chapeau et des lunettes.', 'Une bague et un collier.', '장갑 et 목도리 sont les deux accessoires.']]],
  Corps: ['Une petite douleur', [
    ['오늘은 목이 아파요.', 'Aujourd’hui, j’ai mal à la gorge.', '목 désigne le cou ou la gorge selon le contexte ; 아프다 = avoir mal.'],
    ['머리는 아프지 않아요.', 'Je n’ai pas mal à la tête.', '-지 않아요 nie la douleur pour 머리.'],
    ['물을 마시고 쉬어요.', 'Je bois de l’eau et je me repose.', '-고 relie les actions ; 쉬다 = se reposer.'],
  ], [['Où la personne a-t-elle mal ?', 'À la gorge.', 'À la tête.', 'Au pied.', '목이 아파요 indique la gorge ; la phrase suivante nie le mal de tête.'], ['Que fait-elle ensuite ?', 'Elle boit de l’eau et se repose.', 'Elle court.', 'Elle se lave les mains.', '물을 마시고 쉬어요 décrit les deux actions, sans constituer un conseil médical.']]],
  'Famille & personnes': ['Le dimanche en famille', [
    ['우리 가족은 일요일에 할머니 집에 가요.', 'Ma famille va chez ma grand-mère le dimanche.', '우리 가족 = ma / notre famille ; 일요일에 = le dimanche.'],
    ['어머니와 아버지는 음식을 만들어요.', 'Ma mère et mon père préparent à manger.', '음식을 만들다 = préparer de la nourriture.'],
    ['저는 동생과 이야기해요.', 'Je discute avec mon petit frère ou ma petite sœur.', '과 signifie ici avec ; 동생 ne précise pas le genre.'],
  ], [['Chez qui va la famille ?', 'Chez la grand-mère.', 'Chez le professeur.', 'Chez un collègue.', '할머니 집에 : chez la grand-mère.'], ['Qui prépare à manger ?', 'La mère et le père.', 'Le narrateur seul.', 'Le petit frère ou la petite sœur.', '어머니와 아버지는 forme le thème de 만들어요.']]],
  'Mode & accessoires': ['Avant de sortir', [
    ['오늘 청바지를 입고 운동화를 신어요.', 'Aujourd’hui, je mets un jean et des baskets.', '입다 pour le jean, 신다 pour les chaussures.'],
    ['지갑은 가방 안에 있어요.', 'Le portefeuille est dans le sac.', '안에 = à l’intérieur de.'],
    ['비가 와서 우산도 가져가요.', 'Comme il pleut, j’emporte aussi un parapluie.', '-아/어서 donne la cause ; 가져가다 = emporter.'],
  ], [['Où est le portefeuille ?', 'Dans le sac.', 'Dans la poche du manteau.', 'Sur les lunettes.', '가방 안에 있어요 : il est dans le sac.'], ['Pourquoi emporter un parapluie ?', 'Parce qu’il pleut.', 'Parce qu’il fait beau.', 'Pour acheter des chaussures.', '비가 와서 exprime la raison.']]],
  'Couple & amour': ['Un anniversaire', [
    ['오늘은 우리 기념일이에요.', 'Aujourd’hui, c’est notre anniversaire de couple.', '기념일 désigne ici la date célébrée par le couple.'],
    ['저는 애인에게 선물을 줘요.', 'J’offre un cadeau à la personne que j’aime.', '에게 marque le destinataire ; 주다 devient 줘요.'],
    ['저녁에 같이 식당에 가요.', 'Le soir, nous allons ensemble au restaurant.', '같이 = ensemble ; le sujet se comprend dans le contexte.'],
  ], [['Que célèbre-t-on ?', 'Un anniversaire de couple.', 'Un examen réussi.', 'Une naissance.', '우리 기념일 dans ce contexte renvoie à l’anniversaire du couple.'], ['Qui reçoit le cadeau ?', 'La personne aimée.', 'Le serveur.', 'Un collègue.', '애인에게 indique la personne destinataire du cadeau.']]],
  'Pièces de la maison': ['Une visite de la maison', [
    ['현관 옆에 거실이 있어요.', 'Le salon est à côté de l’entrée.', '옆에 situe une pièce par rapport à une autre.'],
    ['거실에서 책을 읽어요.', 'Je lis un livre dans le salon.', '에서 indique le lieu de l’action.'],
    ['마당에는 작은 나무가 있어요.', 'Il y a un petit arbre dans la cour.', '작은 est la forme de 작다 devant un nom ; 에는 marque le lieu comme thème.'],
  ], [['Quelle pièce est à côté de l’entrée ?', 'Le salon.', 'La salle de bain.', 'Le garage.', '현관 옆에 거실이 있어요.'], ['Qu’y a-t-il dans la cour ?', 'Un petit arbre.', 'Un lit.', 'Un escalier.', '작은 나무가 있어요 : un petit arbre est présent.']]],
  'Objets de la maison': ['La lessive', [
    ['욕실에 수건과 비누가 있어요.', 'Il y a une serviette et du savon dans la salle de bain.', '욕실 = salle de bain ; 과 = et.'],
    ['저는 세탁기에 수건을 넣어요.', 'Je mets la serviette dans le lave-linge.', '넣다 = mettre à l’intérieur ; 에 indique le contenant.'],
    ['침대 위에는 베개와 이불이 있어요.', 'Sur le lit, il y a un oreiller et une couette.', '위에 = sur ; 베개 et 이불 sont les objets posés sur le lit.'],
  ], [['Quel objet est mis dans le lave-linge ?', 'La serviette.', 'Le savon.', 'L’oreiller.', '수건을 넣어요 : 수건 est l’objet de l’action.'], ['Où est la couette ?', 'Sur le lit.', 'Dans le lave-linge.', 'Dans la salle de bain.', '침대 위에는…이불이 있어요 la situe sur le lit.']]],
  Émotions: ['Avant et après le cours', [
    ['아침에는 조금 피곤했어요.', 'Le matin, j’étais un peu fatigué.', '피곤했어요 est au passé ; 조금 = un peu.'],
    ['어려운 시험이 있어서 걱정했어요.', 'J’étais inquiet parce qu’il y avait un examen difficile.', '-아서 relie la présence de l’examen à l’inquiétude.'],
    ['시험이 끝나서 지금은 기뻐요.', 'L’examen est terminé, donc je suis content maintenant.', '끝나다 = se terminer ; 지금 oppose maintenant au matin.'],
  ], [['Comment la personne se sent-elle au début ?', 'Un peu fatiguée et inquiète.', 'En colère.', 'Très heureuse sans inquiétude.', '피곤했어요 puis 걱정했어요 décrivent l’état initial.'], ['Pourquoi est-elle contente maintenant ?', 'L’examen est terminé.', 'L’examen est demain.', 'Le cours est annulé.', '시험이 끝나서 donne la raison de 기뻐요.']]],
  Métiers: ['Les métiers de la famille', [
    ['제 어머니는 간호사예요.', 'Ma mère est infirmière.', '간호사 n’a pas de consonne finale : 예요.'],
    ['병원에서 일해요.', 'Elle travaille à l’hôpital.', 'Le sujet reste la mère ; 에서 situe 일해요.'],
    ['아버지는 요리사이고 식당에서 일해요.', 'Mon père est cuisinier et travaille au restaurant.', '-이고 relie l’identité professionnelle à l’autre information.'],
  ], [['Quel est le métier de la mère ?', 'Infirmière.', 'Journaliste.', 'Avocate.', '간호사예요 donne son métier.'], ['Où travaille le père ?', 'Dans un restaurant.', 'À l’hôpital.', 'Dans un commissariat.', '식당에서 일해요 situe le travail du père.']]],
  Sport: ['Le week-end sportif', [
    ['저는 토요일에 헬스장에 가요.', 'Le samedi, je vais à la salle de sport.', '토요일에 situe le jour ; 헬스장에 indique la destination.'],
    ['친구는 태권도를 배워요.', 'Mon ami apprend le taekwondo.', '배우다 = apprendre ; 태권도를 est l’objet.'],
    ['일요일에는 같이 등산을 해요.', 'Le dimanche, nous faisons de la randonnée ensemble.', '등산을 하다 = faire de la randonnée en montagne.'],
  ], [['Qu’apprend l’ami ?', 'Le taekwondo.', 'Le ski.', 'Le tennis.', '태권도를 배워요 l’indique.'], ['Que font-ils ensemble le dimanche ?', 'De la randonnée.', 'Du baseball.', 'Du ping-pong.', '일요일에는 같이 등산을 해요 : jour + ensemble + randonnée.']]],
  Shopping: ['À la caisse', [
    ['저는 가게에서 가방을 사요.', 'J’achète un sac dans un magasin.', '가게에서 = dans le magasin ; 가방을 = un sac, objet de 사요.'],
    ['가방은 이만 원이에요.', 'Le sac coûte vingt mille wons.', '이만 = deux fois dix mille, donc 20 000.'],
    ['카드로 계산하고 영수증을 받아요.', 'Je paie par carte et je reçois le ticket de caisse.', '로 indique le moyen ; 받다 = recevoir.'],
  ], [['Combien coûte le sac ?', '20 000 wons.', '2 000 wons.', '10 000 wons.', '이만 원 = 2 × 10 000 wons.'], ['Comment la personne paie-t-elle ?', 'Par carte.', 'En espèces.', 'Le texte ne dit pas qu’elle paie.', '카드로 계산하다 signifie payer par carte.']]],
  'Relations & entourage': ['Au bureau', [
    ['오늘 회사에서 새 동료를 만나요.', 'Aujourd’hui, je rencontre un nouveau collègue au bureau.', '새 = nouveau ; 동료 = collègue ; 만나다 = rencontrer.'],
    ['선배가 일을 설명해 줘요.', 'Une personne plus ancienne m’explique le travail.', '선배 indique l’ancienneté relative dans le groupe, pas nécessairement l’âge.'],
    ['저는 동료와 같이 점심을 먹어요.', 'Je déjeune avec mon collègue.', '와 signifie avec ; 점심을 먹다 = déjeuner.'],
  ], [['Qui explique le travail ?', 'Une personne plus ancienne dans le groupe.', 'Un voisin.', 'Un cousin.', '선배가 est le sujet de 설명해 줘요.'], ['Avec qui le narrateur déjeune-t-il ?', 'Avec son collègue.', 'Seul.', 'Avec son oncle.', '동료와 같이 indique avec qui il déjeune.']]],
  'Manger & boire': ['Une pause au café', [
    ['카페에서 커피 한 잔을 주문해요.', 'Je commande une tasse de café au café.', '한 잔 compte une tasse ; 주문하다 = commander.'],
    ['빵도 먹어요.', 'Je mange aussi du pain.', '도 = aussi ; 빵 = pain.'],
    ['물은 마시지만 우유는 마시지 않아요.', 'Je bois de l’eau, mais je ne bois pas de lait.', '-지만 marque le contraste ; -지 않아요 nie la seconde action.'],
  ], [['Que mange la personne ?', 'Du pain.', 'Une pomme.', 'Une fraise.', '빵도 먹어요 : elle mange aussi du pain.'], ['Quelle boisson n’est pas bue ?', 'Le lait.', 'L’eau.', 'Le café commandé.', '우유는 마시지 않아요 nie la consommation de lait.']]],
  'Animaux & nature': ['Dans le jardin', [
    ['정원에 큰 나무가 있어요.', 'Il y a un grand arbre dans le jardin.', '정원 = jardin ; 큰 qualifie 나무.'],
    ['고양이는 나무 아래에 있어요.', 'Le chat est sous l’arbre.', '아래에 = sous.'],
    ['개는 정원에서 뛰어요.', 'Le chien court dans le jardin.', '뛰다 = courir ; 에서 indique le lieu de l’action.'],
  ], [['Où est le chat ?', 'Sous l’arbre.', 'Dans la mer.', 'Sur le toit.', '나무 아래에 : sous l’arbre.'], ['Quel animal court ?', 'Le chien.', 'Le chat.', 'Un oiseau.', '개는…뛰어요 attribue l’action au chien.']]],
  'Au quotidien': ['Lire et se déplacer', [
    ['아침에 책을 읽어요.', 'Le matin, je lis un livre.', '아침에 indique le moment.'],
    ['오후에는 자전거를 타요.', 'L’après-midi, je fais du vélo.', '자전거를 타다 = faire du vélo.'],
    ['저녁에는 집에서 쉬어요.', 'Le soir, je me repose chez moi.', '집에서 = chez moi, lieu de l’action 쉬어요.'],
  ], [['Quand la personne lit-elle ?', 'Le matin.', 'Le soir.', 'À minuit.', '아침에 situe la lecture.'], ['Que fait-elle l’après-midi ?', 'Du vélo.', 'Elle lit.', 'Elle travaille.', '오후에는 자전거를 타요 annonce le vélo.']]],
}

export const themeReadings: Record<string, KoreanReading> = Object.fromEntries(Object.entries(texts).map(([theme, [title, lines, questions]], index) => [theme,
  passage(`theme-${index}`, title, ['Émotions', 'Mode & accessoires', 'Nature & météo'].includes(theme) ? 2 : 1,
    `Lecture du thème « ${theme} ». Les mots de liaison ou verbes nouveaux sont expliqués : tu peux consulter ces aides avant de répondre.`,
    lines.map(([ko, fr, note]) => ({ ko, fr, note })),
    theme === 'Émotions' ? [{ ko: '피곤했어요', fr: 'j’étais fatigué(e)' }, { ko: '걱정했어요', fr: 'j’étais inquiet / inquiète' }, { ko: '기뻐요', fr: 'je suis content(e)' }] : words.filter((w) => w[0] === theme && lines.some((line) => line[0].includes(w[1]))).map((w) => ({ ko: w[1], fr: w[3] })),
    questions.map(([q, correct, wrong1, wrong2, explanation]) => Q(q, correct, [wrong1, wrong2], explanation)),
    'Commence par reconnaître les mots du thème, puis les lieux, les moments et les personnes. Appuie tes réponses sur une phrase précise du texte.'),
]))
