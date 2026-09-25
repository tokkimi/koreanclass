export const vocabularyThemes = [
 {name:'Fruits & légumes',photo:'photo-1560806887-1e4cd0b6cbd6',items:'포도|raisin;수박|pastèque;오렌지|orange;레몬|citron;복숭아|pêche;배|poire;토마토|tomate;감자|pomme de terre;당근|carotte;양파|oignon;오이|concombre;배추|chou chinois'},
 {name:'À table',photo:'photo-1509440159596-0249088772ff',items:'밥|riz cuit, repas;쌀|riz cru;김치|kimchi;고기|viande;생선|poisson (aliment);달걀|œuf;우유|lait;치즈|fromage;국|soupe;소금|sel;설탕|sucre;주스|jus'},
 {name:'Animaux',photo:'photo-1514888286974-6c03e2ca1dba',items:'새|oiseau;물고기|poisson (animal);말|cheval;소|vache;돼지|cochon;양|mouton;토끼|lapin;곰|ours;호랑이|tigre;사자|lion;코끼리|éléphant;원숭이|singe'},
 {name:'Nature & météo',photo:'photo-1441974231531-c6227db76b6e',items:'꽃|fleur;풀|herbe;산|montagne;강|rivière;호수|lac;숲|forêt;하늘|ciel;구름|nuage;비|pluie;눈|neige;바람|vent;별|étoile'},
 {name:'À la maison',photo:'photo-1495446815901-a7297e633e8d',items:'집|maison;방|chambre;문|porte;창문|fenêtre;침대|lit;의자|chaise;책상|bureau (meuble);식탁|table à manger;소파|canapé;냉장고|réfrigérateur;거울|miroir;시계|horloge, montre'},
 {name:'École & objets',photo:'photo-1495446815901-a7297e633e8d',items:'학교|école;교실|salle de classe;선생님|professeur;학생|élève;친구|ami;연필|crayon;볼펜|stylo à bille;공책|cahier;지우개|gomme;가방|sac;컴퓨터|ordinateur;휴대폰|téléphone portable'},
 {name:'Ville & transports',photo:'photo-1485965120184-e220f721d03e',items:'버스|bus;지하철|métro;기차|train;택시|taxi;자동차|voiture;비행기|avion;역|gare, station;공항|aéroport;병원|hôpital;약국|pharmacie;은행|banque;공원|parc'},
 {name:'Vêtements',photo:'photo-1445205170230-053b83016050',items:'옷|vêtements;셔츠|chemise;티셔츠|t-shirt;바지|pantalon;치마|jupe;원피스|robe;코트|manteau;신발|chaussures;양말|chaussettes;모자|chapeau;장갑|gants;목도리|écharpe'},
 {name:'Corps',photo:'photo-1506794778202-cad84cf45f1d',items:'머리|tête;얼굴|visage;눈|œil;코|nez;입|bouche;귀|oreille;이|dent;목|cou;어깨|épaule;팔|bras;손|main;발|pied'},
 {name:'Famille & personnes',photo:'photo-1511895426328-dc8714191300',items:'가족|famille;부모님|parents;어머니|mère;아버지|père;엄마|maman;아빠|papa;할머니|grand-mère;할아버지|grand-père;아이|enfant;아기|bébé;동생|petit frère ou petite sœur;사람|personne'},
]
export const extraWords = vocabularyThemes.flatMap(theme=>theme.items.split(';').map(item=>{
 const [ko,fr]=item.split('|')
 const final = (ko.charCodeAt(ko.length-1)-0xac00)%28
 return [theme.name,ko,'',fr,ko+(final?'이에요.':'예요.'),'C’est : '+fr+'.','']
}))

export const words = [...extraWords,
 ['Manger & boire','사과','sagwa','pomme','사과를 먹어요.','Je mange une pomme.','photo-1560806887-1e4cd0b6cbd6'],
 ['Manger & boire','바나나','banana','banane','바나나가 있어요.','Il y a une banane.','photo-1571771894821-ce9b6c11b08e'],
 ['Manger & boire','딸기','ttalgi','fraise','딸기를 좋아해요.','J’aime les fraises.','photo-1464965911861-746a04b4bca6'],
 ['Manger & boire','커피','keopi','café','커피 한 잔 주세요.','Un café, s’il vous plaît.','photo-1509042239860-f550ce710b93'],
 ['Manger & boire','빵','ppang','pain','빵을 먹어요.','Je mange du pain.','photo-1509440159596-0249088772ff'],
 ['Manger & boire','물','mul','eau','물을 마셔요.','Je bois de l’eau.','photo-1548839140-29a749e1cf4d'],
 ['Animaux & nature','고양이','goyangi','chat','고양이가 귀여워요.','Le chat est mignon.','photo-1514888286974-6c03e2ca1dba'],
 ['Animaux & nature','개','gae','chien','개가 있어요.','Il y a un chien.','photo-1552053831-71594a27632d'],
 ['Animaux & nature','나무','namu','arbre','나무가 커요.','L’arbre est grand.','photo-1441974231531-c6227db76b6e'],
 ['Animaux & nature','바다','bada','mer','바다가 예뻐요.','La mer est belle.','photo-1507525428034-b723cf961d3e'],
 ['Au quotidien','책','chaek','livre','책을 읽어요.','Je lis un livre.','photo-1495446815901-a7297e633e8d'],
 ['Au quotidien','자전거','jajeongeo','vélo','자전거를 타요.','Je fais du vélo.','photo-1485965120184-e220f721d03e'],
]
