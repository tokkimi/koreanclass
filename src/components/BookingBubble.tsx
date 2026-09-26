import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PAYMENT_LINK_SINGLE, PAYMENT_LINK_PACK } from '../config'

type Position = { x:number; y:number }
const bounded = (p:Position):Position => ({x:Math.max(8,Math.min(p.x,window.innerWidth-132)),y:Math.max(8,Math.min(p.y,window.innerHeight-150))})
export function BookingBubble() {
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
  {open&&<div className="booking-overlay" onClick={()=>{setOpen(false);button.current?.focus()}}><section className="booking-panel card" role="dialog" aria-modal="false" aria-labelledby="booking-title" onClick={e=>e.stopPropagation()}><div className="row between"><h2 id="booking-title">Un cours pour toi</h2><button className="btn ghost" aria-label="Fermer la réservation" onClick={()=>{setOpen(false);button.current?.focus()}}>✕</button></div><p>Choisis ton créneau ou règle directement ton cours.</p><p className="small">Avant de payer : <Link className="link" to="/cgv">conditions de vente</Link>. Pas de remboursement commercial ; droits légaux réservés.</p><Link className="btn" to="/reserver">Choisir mon créneau</Link><a className="btn ghost" href={PAYMENT_LINK_SINGLE} target="_blank" rel="noreferrer">Payer 1 heure · 15 € sur PayPal ↗</a><a className="btn ghost" href={PAYMENT_LINK_PACK} target="_blank" rel="noreferrer">Payer 10 heures · 100 € sur PayPal ↗</a><p className="small muted">Le paiement ne réserve pas un créneau. Indique ton e-mail de profil et ta référence de réservation dans le message PayPal. Le professeur confirme ensuite le paiement et le rendez-vous.</p></section></div>}
  <button ref={button} className="booking-bubble" style={{left:pos.x,top:pos.y}} aria-label="Réserver ou payer un cours. Déplaçable avec les flèches du clavier." aria-expanded={open}
   onPointerDown={e=>{if(e.button!==0)return;moved.current=false;drag.current={x:e.clientX,y:e.clientY,start:pos,moved:false};e.currentTarget.setPointerCapture(e.pointerId)}}
   onPointerMove={e=>{const d=drag.current;if(!d)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;if(Math.hypot(dx,dy)>6)d.moved=true;if(d.moved){moved.current=true;setPos(bounded({x:d.start.x+dx,y:d.start.y+dy}))}}}
   onPointerUp={()=>{drag.current=null}}
   onPointerCancel={()=>{drag.current=null;moved.current=true}}
   onClick={()=>{if(!moved.current)setOpen(v=>!v);moved.current=false}}
   onKeyDown={e=>{const delta:{[key:string]:Position}={ArrowLeft:{x:-20,y:0},ArrowRight:{x:20,y:0},ArrowUp:{x:0,y:-20},ArrowDown:{x:0,y:20}};if(delta[e.key]){e.preventDefault();const d=delta[e.key];setPos(p=>bounded({x:p.x+d.x,y:p.y+d.y}))}}}
  ><svg className="booking-contact-icon" width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M26 14.5c0 6-4.5 10-10.5 10H11l-6 4v-8c-1.3-1.7-2-3.8-2-6C3 8.7 7.8 4 14.5 4S26 8.7 26 14.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 12h10M10 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg><strong>Réserver</strong><small>Cours privé</small></button>
 </>
}
