import { describe, expect, it } from 'vitest'
import { OFFERS, creditedHours, packHourly, packSaving, paypalLink, priceCents } from '../lib/pricing'
import { PAYMENT_LINK_PACK, PAYMENT_LINK_SINGLE } from '../config'

describe('prices', () => {
  it('keeps PayPal links, server amounts and displayed prices in sync', () => {
    expect(PAYMENT_LINK_SINGLE).toBe(`https://paypal.me/Siasiakorea/${OFFERS.single.price}EUR`)
    expect(PAYMENT_LINK_PACK).toBe(paypalLink('pack10'))
    expect(PAYMENT_LINK_PACK.endsWith(`/${OFFERS.pack10.price}EUR`)).toBe(true)
    expect(priceCents('pack10')).toBe(OFFERS.pack10.price * 100)
  })
  it('current grid: 15 € per hour, 130 € for ten hours', () => {
    expect(OFFERS.single.price).toBe(15)
    expect(OFFERS.pack10.price).toBe(130)
    expect(packHourly()).toBe(13)
    expect(packSaving()).toBe(20)
    expect(creditedHours(OFFERS.pack10.hours)).toBe(9)
  })
})
