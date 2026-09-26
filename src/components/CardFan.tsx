import { useState, type CSSProperties } from 'react'
import type { OrbitCard } from './OrbitGallery3D'
export function CardFan({cards,onSelect}:{cards:OrbitCard[];onSelect:(card:OrbitCard)=>void}) {
 const [center,setCenter]=useState(0)
 const cycle=(n:number)=>setCenter(x=>(x+n+cards.length)%cards.length)
 return <div className="category-fan" aria-label="Catégories de vocabulaire" onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();cycle(1)}if(e.key==='ArrowLeft'){e.preventDefault();cycle(-1)}}}>
 <div className="category-fan-stage">{cards.map((c,i)=>{let d=(i-center+cards.length)%cards.length;if(d>cards.length/2)d-=cards.length;return <button key={c.id} className="category-fan-card" hidden={Math.abs(d)>3} tabIndex={d===0?0:-1} style={{'--slot':d,'--distance':Math.abs(d),zIndex:10-Math.abs(d)} as CSSProperties} onClick={()=>d===0?onSelect(c):setCenter(i)} aria-label={d===0?`Ouvrir ${c.title}`:`Afficher ${c.title}`}><img src={c.image} alt="" loading="lazy"/><span className="category-fan-caption"><small>{c.badge}</small><strong>{c.title}</strong><span lang="ko">{c.ko}</span></span></button>})}</div>
 <div className="row center"><button className="btn ghost" onClick={()=>cycle(-1)} aria-label="Catégorie précédente">←</button><span aria-live="polite">{center+1} / {cards.length} · {cards[center]?.title}</span><button className="btn ghost" onClick={()=>cycle(1)} aria-label="Catégorie suivante">→</button></div><div className="row center mt"><button className="btn" onClick={()=>onSelect(cards[center])}>Explorer {cards[center]?.title} →</button></div></div>
}
