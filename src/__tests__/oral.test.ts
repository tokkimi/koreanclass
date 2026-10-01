import { describe, expect, it } from 'vitest'
import { compareSpeech } from '../lib/oral'

describe('text match used by the speaking studio', () => {
  it('compares Japanese text instead of ignoring it', () => {
    expect(compareSpeech('コーヒーをください。', 'コーヒーをください').similarity).toBe(100)
    expect(compareSpeech('コーヒーをください。', 'おちゃをください').similarity).toBeLessThan(70)
  })
  it('keeps accents for Spanish and French', () => {
    expect(compareSpeech('¿Qué hora es?', 'que hora es').similarity).toBeLessThan(100)
    expect(compareSpeech('Je suis allé à Paris.', 'je suis allé à paris').similarity).toBe(100)
  })
  it('still works for Korean', () => {
    expect(compareSpeech('안녕하세요.', '안녕하세요').similarity).toBe(100)
  })
})
