export interface OralComparison { similarity: number; expected: string[]; heard: string[]; missing: string[]; extra: string[] }
/** Garde toutes les lettres et chiffres (hangeul, kana, kanji, accents…), sans ponctuation ni espaces. */
export const cleanSpeech = (s:string) => s.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'')
/** @deprecated nom historique */
export const cleanKorean = cleanSpeech
export function compareSpeech(expected:string,heard:string):OralComparison {
 const a=Array.from(cleanSpeech(expected)), b=Array.from(cleanSpeech(heard))
 const previous=Array.from({length:b.length+1},(_,i)=>i)
 for(let i=1;i<=a.length;i++) { let diagonal=previous[0];previous[0]=i;for(let j=1;j<=b.length;j++){const old=previous[j];previous[j]=Math.min(previous[j]+1,previous[j-1]+1,diagonal+(a[i-1]===b[j-1]?0:1));diagonal=old} }
 const words=expected.replace(/[.!?,。、！？¡¿]/g,'').split(/\s+/).filter(Boolean)
 const heardWords=heard.replace(/[.!?,。、！？¡¿]/g,'').split(/\s+/).filter(Boolean)
 const compact=cleanSpeech(heard), target=cleanSpeech(expected)
 return {similarity: Math.max(0,Math.round((1-previous[b.length]/Math.max(a.length,b.length,1))*100)),expected:words,heard:heardWords,missing:words.filter(w=>!compact.includes(cleanSpeech(w))),extra:heardWords.filter(w=>!target.includes(cleanSpeech(w)))}
}
