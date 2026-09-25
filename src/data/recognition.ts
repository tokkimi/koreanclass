import type { Lesson } from './types.js'
import { qcm } from './helpers.js'
export const recognition: Lesson = {
 id: 'h-recognition', title: 'Reconnaître les lettres et leurs associations', subtitle: 'Observer · assembler · lire', duration: 20,
 objectives: ['Distinguer les lettres proches', 'Assembler et décomposer une syllabe'],
 sections: [{title:'Regarder chaque partie',body:'Repère la consonne initiale, puis la voyelle, puis la finale éventuelle. ㄴ + ㅏ donne 나 ; ㄴ + ㅜ donne 누. Une finale se place sous le reste du bloc : ㄴ + ㅏ + ㄴ donne 난.'}],
 vocab:[{ko:'나무',rom:'namu',fr:'arbre'}],
 exercises:[
 qcm('Quelle lettre représente le son n ?', 'ㄴ',['ㄱ','ㅁ','ㄹ'],'ㄴ représente n. Observe son angle en bas à gauche.'),
 qcm('Quelle voyelle se lit a ?', 'ㅏ',['ㅓ','ㅗ','ㅜ'],'Le petit trait de ㅏ pointe vers la droite.'),
 qcm('Quelle voyelle se lit o ?', 'ㅗ',['ㅜ','ㅡ','ㅓ'],'Le petit trait de ㅗ pointe vers le haut.'),
 qcm('Retrouve la consonne ㅁ.', 'ㅁ',['ㅂ','ㅇ','ㄷ'],'ㅁ forme un carré fermé.'),
 qcm('Quelle voyelle se lit ya ?', 'ㅑ',['ㅏ','ㅕ','ㅛ'],'ㅑ a deux petits traits vers la droite.'),
 qcm('Quelle est la consonne double de ㄱ ?', 'ㄲ',['ㅋ','ㄸ','ㅆ'],'ㄲ est la consonne tendue de cette famille.'),
 qcm('ㄴ + ㅏ = ?', '나',['너','누','마'],'ㄴ est à gauche, ㅏ à droite : 나.'),
 qcm('ㅁ + ㅜ = ?', '무',['모','누','마'],'ㅜ se place sous ㅁ : 무.'),
 qcm('ㅇ + ㅣ = ?', '이',['아','으','우'],'ㅇ est muet au début ; 이 se lit i.'),
 qcm('ㅎ + ㅏ + ㄴ = ?', '한',['하','항','난'],'ㄴ est la finale, tout en bas de 한.'),
 qcm('Décompose 국.', 'ㄱ + ㅜ + ㄱ',['ㄱ + ㅗ + ㄱ','ㄴ + ㅜ + ㄱ','ㄱ + ㅜ + ㄴ'],'국 contient une initiale ㄱ, une voyelle ㅜ et une finale ㄱ.'),
 qcm('Quelle est la finale de 강 ?', 'ㅇ',['ㄱ','ㅏ','Aucune'],'En bas du bloc, ㅇ représente le son ng.'),
 qcm('ㅗ + ㅏ forment quelle voyelle ?', 'ㅘ',['ㅝ','ㅟ','ㅢ'],'ㅘ combine ㅗ et ㅏ ; avec ㄱ, cela donne 과.'),
 qcm('ㅜ + ㅓ forment quelle voyelle ?', 'ㅝ',['ㅘ','ㅚ','ㅐ'],'ㅝ combine ㅜ et ㅓ ; avec ㅇ, cela donne 워.'),
 qcm('Quels blocs forment 나무 (arbre) ?', '나 + 무',['나 + 모','너 + 무','마 + 누'],'나 = ㄴ + ㅏ ; 무 = ㅁ + ㅜ.'),
 qcm('Quel mot correspond à ㅇ+ㅜ puis ㅇ+ㅠ ?', '우유',['우우','유우','오유'],'우 + 유 donne 우유, le lait.')]
}
