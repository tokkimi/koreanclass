import { useEffect, useState } from 'react'
import { koreanVoices, saveSpeechPreference, speechPreference, speak } from '../lib/speech'
import { useT } from '../lib/i18n'
export function VoiceSettings(){
 const [voices,setVoices]=useState<SpeechSynthesisVoice[]>(koreanVoices)
 const [voice,setVoice]=useState(speechPreference().voice??'')
 const [rate,setRate]=useState(speechPreference().rate??.9)
 const [error,setError]=useState('')
 const t=useT()
 useEffect(()=>{if(!('speechSynthesis' in window))return;const refresh=()=>setVoices(koreanVoices());window.speechSynthesis.addEventListener('voiceschanged',refresh);refresh();return()=>window.speechSynthesis.removeEventListener('voiceschanged',refresh)},[])
 function update(v:string,r:number){setVoice(v);setRate(r);saveSpeechPreference(v,r)}
 return <details className="voice-settings"><summary>{t('Régler la voix et la vitesse','Voice and speed settings')}</summary><div className="grid-2"><label>{t('Voix coréenne','Korean voice')}<select className="input" value={voice} onChange={e=>update(e.target.value,rate)}><option value="">{t('Meilleure voix disponible','Best available voice')}</option>{voices.map(v=><option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>)}</select></label><label>{t('Vitesse','Speed')}<select className="input" value={rate} onChange={e=>update(voice,Number(e.target.value))}><option value={.65}>{t('Lente · 0,65×','Slow · 0.65×')}</option><option value={.9}>{t('Apprentissage · 0,9×','Learning · 0.9×')}</option><option value={1}>{t('Naturelle · 1×','Natural · 1×')}</option></select></label></div><button className="btn ghost small" onClick={()=>{setError('');speak('안녕하세요. 오늘도 같이 공부해요.',{onError:setError})}}>{t('Tester la voix','Test the voice')}</button>{!voices.length&&<p className="small muted">{t('Aucune voix coréenne détectée. Active une voix coréenne dans les réglages de ton appareil.','No Korean voice detected. Enable a Korean voice in your device settings.')}</p>}{error&&<p role="status">{error}</p>}<p className="small muted">{t('La qualité des voix dépend de ton appareil. Ce réglage est conservé sur ce navigateur.','Voice quality depends on your device. This setting is kept in this browser.')}</p></details>
}
