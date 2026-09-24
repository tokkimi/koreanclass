import { useEffect, useState } from 'react'
import { koreanVoices, saveSpeechPreference, speechPreference, speak } from '../lib/speech'
export function VoiceSettings(){
 const [voices,setVoices]=useState<SpeechSynthesisVoice[]>(koreanVoices)
 const [voice,setVoice]=useState(speechPreference().voice??'')
 const [rate,setRate]=useState(speechPreference().rate??.9)
 const [error,setError]=useState('')
 useEffect(()=>{if(!('speechSynthesis' in window))return;const refresh=()=>setVoices(koreanVoices());window.speechSynthesis.addEventListener('voiceschanged',refresh);refresh();return()=>window.speechSynthesis.removeEventListener('voiceschanged',refresh)},[])
 function update(v:string,r:number){setVoice(v);setRate(r);saveSpeechPreference(v,r)}
 return <details className="voice-settings"><summary>Régler la voix et la vitesse</summary><div className="grid-2"><label>Voix coréenne<select className="input" value={voice} onChange={e=>update(e.target.value,rate)}><option value="">Meilleure voix disponible</option>{voices.map(v=><option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>)}</select></label><label>Vitesse<select className="input" value={rate} onChange={e=>update(voice,Number(e.target.value))}><option value={.65}>Lente · 0,65×</option><option value={.9}>Apprentissage · 0,9×</option><option value={1}>Naturelle · 1×</option></select></label></div><button className="btn ghost small" onClick={()=>{setError('');speak('안녕하세요. 오늘도 같이 공부해요.',{onError:setError})}}>Tester la voix</button>{!voices.length&&<p className="small muted">Aucune voix coréenne détectée. Active une voix coréenne dans les réglages de ton appareil.</p>}{error&&<p role="status">{error}</p>}<p className="small muted">La qualité des voix dépend de ton appareil. Ce réglage est conservé sur ce navigateur.</p></details>
}
