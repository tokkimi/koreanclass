import { words } from './vocabulary.js'
import { qcm } from './helpers.js'
import type { Lesson } from './types.js'
export const vocabularyLessons: Lesson[] = [...new Set(words.map(w=>w[0]))].map((theme)=>{
 const legacy=['Fruits & légumes','À table','Animaux','Nature & météo','À la maison','École & objets','Ville & transports','Vêtements','Corps','Famille & personnes','Manger & boire','Animaux & nature','Au quotidien']
 const index=legacy.includes(theme)?legacy.indexOf(theme):['Cuisine & ustensiles','Voyage & sorties','Loisirs & musique','Temps & saisons'].indexOf(theme)+13
 const items=words.filter(w=>w[0]===theme)
 const exercises=items.flatMap(w=>{
 const alternatives=words.filter(x=>x[1]!==w[1]&&x[3]!==w[3])
 const wrongKo=[...new Set(alternatives.map(x=>x[1]))].slice(0,3)
 const wrongFr=[...new Set(alternatives.map(x=>x[3]))].slice(0,3)
 return [qcm('Dans le thème « '+theme+' », que signifie '+w[1]+' ?',w[3],wrongFr,w[1]+' : '+w[3]+'. '+w[4]+' — '+w[5]),qcm('Comment dit-on « '+w[3]+' » ?',w[1],wrongKo,w[1]+' signifie '+w[3]+'.')]
 })
 if(exercises.length<5)exercises.push(qcm('Quel mot signifie « '+items[0][3]+' » ?',items[0][1],words.filter(w=>w[1]!==items[0][1]).slice(0,3).map(w=>w[1]),items[0][1]+' : '+items[0][3]))
 return {id:'v-theme-'+index,title:'Vocabulaire : '+theme,subtitle:theme,duration:15,objectives:['Comprendre et retrouver les mots du thème'],sections:[{title:'Les mots en contexte',examples:items.map(w=>({ko:w[4],fr:w[5]}))}],vocab:items.map(w=>({ko:w[1],rom:w[2],fr:w[3]})),exercises}
})
