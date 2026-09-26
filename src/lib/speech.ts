type Options = {rate?:number;onEnd?:()=>void;onError?:(message:string)=>void}
export function koreanVoices():SpeechSynthesisVoice[] {
 if(typeof window==='undefined'||!('speechSynthesis' in window))return []
 return window.speechSynthesis.getVoices().filter(v=>v.lang.toLowerCase().startsWith('ko')).sort((a,b)=>rank(b)-rank(a))
}
function rank(v:SpeechSynthesisVoice) { return (/natural|neural|premium|enhanced/i.test(v.name)?8:0)+(/Google|SunHi|InJoon|Yuna/i.test(v.name)?4:0)+(!v.localService?1:0) }
export function canSpeak(){return typeof window!=='undefined'&&'speechSynthesis' in window}
export function speechPreference(){try{return JSON.parse(localStorage.getItem('kc:voice')||'{}') as {voice?:string;rate?:number}}catch{return {}}}
export function saveSpeechPreference(voice:string,rate:number){try{localStorage.setItem('kc:voice',JSON.stringify({voice,rate}))}catch{/* Preferences are optional */}}
export function stopSpeaking(){if(canSpeak())window.speechSynthesis.cancel()}
/** Demande tôt la liste de voix : certains navigateurs ne la fournissent qu'après voiceschanged. */
export function prepareSpeech(){if(canSpeak())window.speechSynthesis.getVoices()}
export function speak(text:string,rateOrOptions:number|Options={}) {
 const options:Options=typeof rateOrOptions==='number'?{rate:rateOrOptions}:rateOrOptions
 if(!canSpeak()){options.onError?.('La lecture audio n’est pas disponible sur ce navigateur.');return}
 const pref=speechPreference()
 const play=(voice?:SpeechSynthesisVoice)=>{
  const u=new SpeechSynthesisUtterance(text.replace(/\[[^\]]*\]/g,'').replace(/\([^)]*\)/g,''))
  u.lang='ko-KR';if(voice)u.voice=voice;u.rate=options.rate??pref.rate??.9;u.pitch=1;u.volume=1
  u.onend=()=>options.onEnd?.()
  u.onerror=e=>{if(!['interrupted','canceled'].includes(e.error))options.onError?.('Lecture interrompue. Réessaie.');options.onEnd?.()}
  stopSpeaking();window.speechSynthesis.resume();window.speechSynthesis.speak(u)
 }
 const choose=()=>{const voices=koreanVoices();return voices.find(v=>v.voiceURI===pref.voice)??voices[0]}
 const ready=choose()
 if(ready){play(ready);return}
 // La première liste peut être vide, surtout sur Chrome. On attend brièvement l'événement
 // avant de laisser le navigateur choisir sa voix par défaut, sans message d'erreur intrusif.
 let settled=false
 const finish=(voice?:SpeechSynthesisVoice)=>{if(settled)return;settled=true;window.speechSynthesis.removeEventListener('voiceschanged',onVoices);window.clearTimeout(timeout);play(voice)}
 const onVoices=()=>finish(choose())
 const timeout=window.setTimeout(()=>finish(choose()),700)
 window.speechSynthesis.addEventListener('voiceschanged',onVoices)
 prepareSpeech()
}
