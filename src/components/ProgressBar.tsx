export function ProgressBar({ value, color, label, threshold }: { value: number; color?: string; label?: string; threshold?: number }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="progress" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div style={{ width: `${v}%`, background: color }} />
      {threshold !== undefined && <span className="progress-threshold" style={{ left: `${Math.max(0, Math.min(100, threshold))}%` }} aria-hidden="true" />}
    </div>
  )
}
