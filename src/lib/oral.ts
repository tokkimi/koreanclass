export interface OralComparison { similarity: number; expected: string[]; heard: string[]; missing: string[]; extra: string[] }
export const cleanKorean = (s:string) => s.normalize('NFC').replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/g,'').toLowerCase()
export function compareSpeech(expected:string,heard:string):OralComparison {
 const a=Array.from(cleanKorean(expected)), b=Array.from(cleanKorean(heard))
 const previous=Array.from({length:b.length+1},(_,i)=>i)
 for(let i=1;i<=a.length;i++) { let diagonal=previous[0];previous[0]=i;for(let j=1;j<=b.length;j++){const old=previous[j];previous[j]=Math.min(previous[j]+1,previous[j-1]+1,diagonal+(a[i-1]===b[j-1]?0:1));diagonal=old} }
 const words=expected.replace(/[.!?,。]/g,'').split(/\s+/).filter(Boolean)
 const heardWords=heard.replace(/[.!?,。]/g,'').split(/\s+/).filter(Boolean)
 const compact=cleanKorean(heard), target=cleanKorean(expected)
 return {similarity: Math.max(0,Math.round((1-previous[b.length]/Math.max(a.length,b.length,1))*100)),expected:words,heard:heardWords,missing:words.filter(w=>!compact.includes(cleanKorean(w))),extra:heardWords.filter(w=>!target.includes(cleanKorean(w)))}
}
