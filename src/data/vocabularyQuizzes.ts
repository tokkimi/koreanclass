import { words } from './vocabulary.js'
import { qcm } from './helpers.js'
import type { Lesson } from './types.js'
export const vocabularyLessons: Lesson[] = [...new Set(words.map(w=>w[0]))].map((theme)=>{
 const legacy=['Fruits & légumes','À table','Animaux','Nature & météo','À la maison','École & objets','Ville & transports','Vêtements','Corps','Famille & personnes','Manger & boire','Animaux & nature','Au quotidien']
 const index=legacy.includes(theme)?legacy.indexOf(theme):['Cuisine & ustensiles','Voyage & sorties','Loisirs & musique','Temps & saisons','Mode & accessoires','Couple & amour','Pièces de la maison','Objets de la maison','Émotions','Métiers','Sport','Shopping','Relations & entourage'].indexOf(theme)+13
 const items=words.filter(w=>w[0]===theme)
 // Petits thèmes : on complète les choix avec le thème le plus proche.
 const near:Record<string,string>={'Manger & boire':'À table','Animaux & nature':'Animaux','Au quotidien':'École & objets'}
 const pool=items.length>=4?items:[...items,...words.filter(w=>w[0]===near[theme])]
 // Les mauvaises réponses viennent du même thème (en tournant), pour des QCM cohérents.
 const pick=(list:string[],from:number,exclude:string)=>{
  const uniq=[...new Set(list)].filter(x=>x!==exclude)
  return Array.from({length:Math.min(3,uniq.length)},(_,k)=>uniq[(from+k)%uniq.length])
 }
 const exercises=items.flatMap((w,i)=>{
 const same=pool.filter(x=>x[1]!==w[1]&&x[3]!==w[3])
 const wrongKo=pick(same.map(x=>x[1]),i,w[1])
 const wrongFr=pick(same.map(x=>x[3]),i,w[3])
 return [qcm('Dans le thème « '+theme+' », que signifie '+w[1]+' ?',w[3],wrongFr,w[1]+' : '+w[3]+'. '+w[4]+' — '+w[5]),qcm('Comment dit-on « '+w[3]+' » ?',w[1],wrongKo,w[1]+' signifie '+w[3]+'.')]
 })
 if(exercises.length<5)exercises.push(qcm('Quel mot signifie « '+items[0][3]+' » ?',items[0][1],pool.filter(w=>w[1]!==items[0][1]).slice(0,3).map(w=>w[1]),items[0][1]+' : '+items[0][3]))
 return {id:'v-theme-'+index,title:'Vocabulaire : '+theme,subtitle:theme,duration:15,objectives:['Comprendre et retrouver les mots du thème'],sections:[{title:'Les mots en contexte',examples:items.map(w=>({ko:w[4],fr:w[5]}))}],vocab:items.map(w=>({ko:w[1],rom:w[2],fr:w[3]})),exercises}
})
