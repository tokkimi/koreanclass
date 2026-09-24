import { canSpeak, speak } from '../lib/speech'

export function SpeakButton({ text, label }: { text: string; label?: string }) {
  if (!canSpeak()) return null
  return (
    <button
      type="button"
      className="speak"
      title="Écouter la prononciation"
      aria-label={`Écouter : ${text}`}
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
      }}
    >
      🔊{label ? <span> {label}</span> : null}
    </button>
  )
}
