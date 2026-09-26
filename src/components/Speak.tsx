import { useEffect, useState } from 'react'
import { canSpeak, prepareSpeech, speak, stopSpeaking } from '../lib/speech'
export function SpeakButton({text,label}:{text:string;label?:string}) {
 const [playing,setPlaying]=useState(false)
 useEffect(()=>{prepareSpeech();return()=>{stopSpeaking()}},[])
 return <span className="speech-control"><button type="button" className={`speak ${playing?'speaking':''}`} title={playing?'Arrêter':'Écouter la prononciation'} aria-label={`${playing?'Arrêter':'Écouter'} : ${text}`} aria-pressed={playing} onClick={e=>{e.stopPropagation();if(playing){stopSpeaking();setPlaying(false);return}setPlaying(true);speak(text,{onEnd:()=>setPlaying(false)})}} disabled={!canSpeak()}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d={playing?'M8 5v14M16 5v14':'M11 4 5 9H2v6h3l6 5ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14'} /></svg>{label&&<span>{label}</span>}</button></span>
}
