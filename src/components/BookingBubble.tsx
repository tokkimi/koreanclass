import { useT } from '../lib/i18n'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { OFFERS, euro } from '../lib/pricing'

type Position = { x:number; y:number }
const bounded = (p:Position):Position => ({x:Math.max(8,Math.min(p.x,window.innerWidth-132)),y:Math.max(8,Math.min(p.y,window.innerHeight-150))})
export function BookingBubble() {
 const t=useT()
 const [pos,setPos]=useState<Position>(()=>{
  try {const p=JSON.parse(localStorage.getItem('booking-bubble')??'null');if(p&&Number.isFinite(p.x)&&Number.isFinite(p.y))return bounded(p)} catch { /* Position is optional. */ }
  return bounded({x:window.innerWidth-148,y:window.innerHeight-180})
 })
 const [open,setOpen]=useState(false)
 const drag=useRef<{x:number;y:number;start:Position;moved:boolean}|null>(null)
 const moved=useRef(false)
 const button=useRef<HTMLButtonElement>(null)
 const location=useLocation()
 useEffect(()=>setOpen(false),[location.pathname])
 useEffect(()=>{const resize=()=>setPos(p=>bounded(p));window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize)},[])
 useEffect(()=>{try{localStorage.setItem('booking-bubble',JSON.stringify(pos))}catch{/* Optional preference. */}},[pos])
 useEffect(()=>{if(!open)return;const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);button.current?.focus()}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape)},[open])
 return <>
  {open&&<div className="booking-overlay" onClick={()=>{setOpen(false);button.current?.focus()}}><section className="booking-panel card" role="dialog" aria-modal="false" aria-labelledby="booking-title" onClick={e=>e.stopPropagation()}><div className="row between"><h2 id="booking-title">{t('Un cours pour toi','A lesson for you')}</h2><button className="btn ghost" aria-label={t('Fermer la réservation','Close booking')} onClick={()=>{setOpen(false);button.current?.focus()}}>✕</button></div><p>{t('Choisis ton créneau ou règle directement ton cours.','Choose your slot or pay for your lesson directly.')}</p><p className="small">{t('Avant de payer :','Before paying:')} <Link className="link" to="/cgv">{t('conditions de vente','terms of sale')}</Link>. {t('Pas de remboursement commercial ; droits légaux réservés.','No commercial refunds; statutory rights reserved.')}</p><Link className="btn" to="/reserver?formule=single">{t(`1 heure · ${euro(OFFERS.single.price)}`,`1 hour · ${euro(OFFERS.single.price,true)}`)}</Link><Link className="btn ghost" to="/reserver?formule=pack10">{t(`${OFFERS.pack10.hours} heures · ${euro(OFFERS.pack10.price)}`,`${OFFERS.pack10.hours} hours · ${euro(OFFERS.pack10.price,true)}`)}</Link><p className="small muted">{t('1. Tu choisis ton créneau (demande). 2. Tu paies sur PayPal avec la référence affichée. 3. Le professeur vérifie le paiement, attribue les heures et confirme le rendez-vous.','1. Choose your slot (request). 2. Pay on PayPal with the reference shown. 3. The teacher checks the payment, credits the hours and confirms the appointment.')}</p></section></div>}
  <button ref={button} className="booking-bubble" style={{left:pos.x,top:pos.y}} aria-label={t('Réserver ou payer un cours. Déplaçable avec les flèches du clavier.','Book or pay for a lesson. Movable with the arrow keys.')} aria-expanded={open}
   onPointerDown={e=>{if(e.button!==0)return;moved.current=false;drag.current={x:e.clientX,y:e.clientY,start:pos,moved:false};e.currentTarget.setPointerCapture(e.pointerId)}}
   onPointerMove={e=>{const d=drag.current;if(!d)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;if(Math.hypot(dx,dy)>6)d.moved=true;if(d.moved){moved.current=true;setPos(bounded({x:d.start.x+dx,y:d.start.y+dy}))}}}
   onPointerUp={()=>{drag.current=null}}
   onPointerCancel={()=>{drag.current=null;moved.current=true}}
   onClick={()=>{if(!moved.current)setOpen(v=>!v);moved.current=false}}
   onKeyDown={e=>{const delta:{[key:string]:Position}={ArrowLeft:{x:-20,y:0},ArrowRight:{x:20,y:0},ArrowUp:{x:0,y:-20},ArrowDown:{x:0,y:20}};if(delta[e.key]){e.preventDefault();const d=delta[e.key];setPos(p=>bounded({x:p.x+d.x,y:p.y+d.y}))}}}
  ><svg className="booking-contact-icon" width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M26 14.5c0 6-4.5 10-10.5 10H11l-6 4v-8c-1.3-1.7-2-3.8-2-6C3 8.7 7.8 4 14.5 4S26 8.7 26 14.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 12h10M10 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg><strong>{t('Réserver','Book')}</strong><small>{t('Cours privé','Private lesson')}</small></button>
 </>
}
