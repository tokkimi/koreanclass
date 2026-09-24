import { levels } from '../data'
import type { Progress } from './store'

export interface Badge {
  id: string
  icon: string
  name: string
  desc: string
  earned: boolean
}

export function computeBadges(p: Progress): Badge[] {
  const completed = Object.values(p.lessons).filter((l) => l.completed).length
  const perfect = Object.values(p.lessons).some((l) => l.bestScore === 100)
  return [
    { id: 'first', icon: '🌱', name: 'Premier pas', desc: 'Terminer une première leçon', earned: completed >= 1 },
    { id: 'ten', icon: '📚', name: 'Studieux', desc: 'Terminer 10 leçons', earned: completed >= 10 },
    { id: 'twentyfive', icon: '🔥', name: 'Passionné', desc: 'Terminer 25 leçons', earned: completed >= 25 },
    { id: 'perfect', icon: '💯', name: 'Sans faute', desc: 'Obtenir 100 % à une leçon', earned: perfect },
    { id: 'placement', icon: '🎯', name: 'Positionné', desc: 'Passer le test de positionnement', earned: !!p.placement },
    { id: 'streak3', icon: '⚡', name: 'Régulier', desc: '3 jours de suite', earned: p.streak.count >= 3 },
    { id: 'streak7', icon: '🏆', name: 'Assidu', desc: '7 jours de suite', earned: p.streak.count >= 7 },
    { id: 'booking', icon: '🎓', name: 'Accompagné', desc: 'Réserver un cours particulier', earned: p.bookings.some((b) => b.status !== 'annulée') },
    ...levels.map((l) => ({
      id: `level-${l.id}`,
      icon: '🏅',
      name: `Niveau ${l.index} validé`,
      desc: `Réussir le test « ${l.name.split('— ')[1]} »`,
      earned: !!p.tests[l.id]?.passed,
    })),
  ]
}
