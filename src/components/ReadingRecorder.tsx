import { useEffect, useRef, useState } from 'react'

/** Optional local recording for comparison with the model, without pronunciation scoring. */
export function ReadingRecorder() {
  const [recording, setRecording] = useState(false)
  const [starting, setStarting] = useState(false)
  const [audio, setAudio] = useState('')
  const [error, setError] = useState('')
  const recorder = useRef<MediaRecorder | null>(null)
  const stream = useRef<MediaStream | null>(null)
  const url = useRef('')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const mounted = useRef(true)
  const busy = useRef(false)
  const supported = typeof MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      clearTimeout(timer.current)
      if (recorder.current?.state === 'recording') recorder.current.stop()
      stream.current?.getTracks().forEach((track) => track.stop())
      if (url.current) URL.revokeObjectURL(url.current)
    }
  }, [])

  function stop() {
    clearTimeout(timer.current)
    if (recorder.current?.state === 'recording') recorder.current.stop()
    stream.current?.getTracks().forEach((track) => track.stop())
    if (mounted.current) setRecording(false)
  }

  async function start() {
    if (busy.current || recording || !supported) return
    busy.current = true; setStarting(true); setError('')
    try {
      const input = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (!mounted.current) { input.getTracks().forEach((track) => track.stop()); return }
      stream.current = input
      const mimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find((type) => MediaRecorder.isTypeSupported(type))
      const media = new MediaRecorder(input, mimeType ? { mimeType } : undefined)
      recorder.current = media
      const chunks: Blob[] = []
      media.ondataavailable = (event) => { if (event.data.size > 0) chunks.push(event.data) }
      media.onstop = () => {
        input.getTracks().forEach((track) => track.stop())
        clearTimeout(timer.current)
        if (!mounted.current) return
        setRecording(false)
        if (!chunks.length) { setError('Aucun son capturé. Réessaie en vérifiant ton microphone.'); return }
        if (url.current) URL.revokeObjectURL(url.current)
        url.current = URL.createObjectURL(new Blob(chunks, { type: media.mimeType || 'audio/webm' }))
        setAudio(url.current)
      }
      media.onerror = () => { stop(); if (mounted.current) setError('L’enregistrement a été interrompu. Tu peux réessayer.') }
      media.start(); setRecording(true)
      timer.current = setTimeout(stop, 60000)
    } catch (cause) {
      stream.current?.getTracks().forEach((track) => track.stop())
      if (mounted.current) setError(cause instanceof DOMException && cause.name === 'NotAllowedError' ? 'Le microphone n’a pas été autorisé. Tu peux continuer à lire à voix haute et écouter le modèle.' : 'Le microphone est indisponible. Vérifie sa connexion ou réessaie.')
    } finally { busy.current = false; if (mounted.current) setStarting(false) }
  }

  return <div className="kr-recorder"><h4>Ma lecture à voix haute</h4><p className="small muted">Lis le texte, écoute ta prise puis compare-la au modèle. Enregistrement local de 60 secondes maximum, conservé pendant cette séance. L’écoute personnelle porte sur les syllabes, les finales et les pauses.</p>{supported ? <><button type="button" className="btn ghost small" disabled={starting} onClick={recording ? stop : start}>{starting ? 'Ouverture du microphone…' : recording ? 'Arrêter ma lecture' : 'Enregistrer ma lecture'}</button>{recording && <p role="status">Enregistrement en cours — lis le texte à voix haute.</p>}{audio && <div className="mt"><audio controls src={audio} aria-label="Écouter ma lecture enregistrée" /><button type="button" className="kr-help" onClick={() => { URL.revokeObjectURL(url.current); url.current = ''; setAudio('') }}>Effacer cette prise</button></div>}</> : <p className="small muted">L’enregistrement local n’est pas disponible dans ce navigateur. Tu peux lire à voix haute puis comparer avec l’audio du texte.</p>}{error && <p role="alert" className="small">{error}</p>}</div>
}
