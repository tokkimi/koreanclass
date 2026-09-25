import { qcm } from './helpers.js'
import type { Lesson } from './types.js'
export const colors = [
 ['빨간색','rouge','#e44654'],['파란색','bleu','#316bea'],['노란색','jaune','#f4d647'],['초록색','vert','#42a96b'],['주황색','orange','#f08e40'],['보라색','violet','#9865cc'],['분홍색','rose','#ef9ec1'],['갈색','marron','#885539'],['검은색','noir','#202328'],['흰색','blanc','#ffffff'],['회색','gris','#92969c'],['하늘색','bleu ciel','#91cef1'],['남색','bleu marine','#263565'],['베이지색','beige','#dfceb0'],['금색','doré','#c4a244'],['은색','argenté','#bfc5ce']
]
export const colorLesson: Lesson = {
 id:'v-colors',title:'Les couleurs',subtitle:'색 · Décrire ce que tu vois',duration:20,
 objectives:['Nommer 16 couleurs','Décrire la couleur d’un objet'],
 sections:[{title:'Une couleur devant un nom',body:'색 signifie couleur. 파란색 가방 = un sac bleu ; 초록색 옷 = des vêtements verts. Pour dire « c’est bleu », on peut dire 파란색이에요. Certaines couleurs ont aussi une forme adjectivale : 빨간 사과 (une pomme rouge), 하얀 눈 (la neige blanche). Ces formes s’apprennent avec leurs adjectifs ; on ne retire pas simplement 색 de tous les mots.'}],
 vocab:colors.map(([ko,fr])=>({ko,fr,rom:''})),
 exercises:colors.map(([ko,fr],i)=>qcm('Comment dit-on « '+fr+' » ?',ko,[1,3,5].map(n=>colors[(i+n)%colors.length][0]),ko+' signifie '+fr+'.'))
}
