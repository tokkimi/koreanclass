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
export function speak(text:string,rateOrOptions:number|Options={}) {
 const options:Options=typeof rateOrOptions==='number'?{rate:rateOrOptions}:rateOrOptions
 if(!canSpeak()){options.onError?.('La lecture audio n’est pas disponible sur ce navigateur.');return}
 const pref=speechPreference(); const voices=koreanVoices()
 const voice=voices.find(v=>v.voiceURI===pref.voice)??voices[0]
 if(!voice){options.onError?.('Aucune voix coréenne disponible. Ajoute une voix coréenne dans les réglages de ton appareil, puis recharge la page.');return}
 const u=new SpeechSynthesisUtterance(text.replace(/\[[^\]]*\]/g,'').replace(/\([^)]*\)/g,''))
 u.lang='ko-KR';u.voice=voice;u.rate=options.rate??pref.rate??.9;u.pitch=1;u.volume=1
 u.onend=()=>options.onEnd?.()
 u.onerror=e=>{if(!['interrupted','canceled'].includes(e.error))options.onError?.('Lecture interrompue. Réessaie ou choisis une autre voix.');options.onEnd?.()}
 stopSpeaking();window.speechSynthesis.resume();window.speechSynthesis.speak(u)
}
