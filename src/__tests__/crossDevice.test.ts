import { describe, expect, it } from 'vitest'
import { allLessons } from '../data'
import { allCourseLessons } from '../data/courses'
import { emptyProgress, pushNotification } from '../lib/model'
import { recordAttempt } from '../../server/progress'
import { applyPrefs, reviewCard } from '../../server/learning'
import { correctAnswer } from '../components/ExerciseRunner'
import { cardKey } from '../lib/srs'

/** Le compte est stocké sur le serveur (JSON) : un second appareil relit exactement le même état. */
const viaServer = <T,>(x: T): T => JSON.parse(JSON.stringify(x))

describe('switching device keeps everything', () => {
  it('progress, reviews, mistakes, notifications, preferences and lesson steps survive a device change', () => {
    const deviceA = emptyProgress()
    const ko = allLessons[2].lesson, ja = allCourseLessons.find((x) => x.lang === 'japonais')!.lesson
    recordAttempt(deviceA, { kind: 'lesson', refId: ko.id, answers: ko.exercises.map(correctAnswer), id: 'op-a1' })
    recordAttempt(deviceA, { kind: 'lesson', refId: ja.id, answers: ja.exercises.map((e, i) => (i === 1 ? 'faux' : correctAnswer(e))), id: 'op-a2' })
    reviewCard(deviceA, cardKey(ko.id, ko.vocab[0].ko), 3)
    applyPrefs(deviceA, { lang: 'japonais', ui: 'en', step: { lesson: ja.id, step: 'parler' } })
    deviceA.bookings.push({ id: 'b1', formula: 'pack10', date: '2026-11-02', time: '18:00', topic: 'Oral', message: '', status: 'confirmée', createdAt: 'x', language: 'japonais' })
    deviceA.packCredits = 7
    pushNotification(deviceA, { kind: 'badge', title: 'Badge' })

    const deviceB = viaServer(deviceA)
    expect(deviceB).toEqual(deviceA)
    expect(deviceB.lessons[ko.id].completed).toBe(true)
    expect(deviceB.srs![cardKey(ko.id, ko.vocab[0].ko)].interval).toBeGreaterThan(0)
    expect(deviceB.mistakes![`${ja.id}#1`].resolved).toBe(false)
    expect(deviceB.prefs).toEqual({ lang: 'japonais', ui: 'en' })
    expect(deviceB.steps![ja.id]).toBe('parler')
    expect(deviceB.xp).toBeGreaterThan(0)
    expect(deviceB.history).toHaveLength(2)
  })
  it('rejects unknown preferences', () => {
    const p = emptyProgress()
    applyPrefs(p, { lang: 'klingon', ui: 'de', step: { lesson: 'inconnue', step: 'parler' } })
    expect(p.prefs).toEqual({})
    expect(p.steps).toBeUndefined()
  })
})
