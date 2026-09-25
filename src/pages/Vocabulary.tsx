import { Link } from 'react-router-dom'
import { extraWords, vocabularyThemes } from '../data/vocabulary'
import { useState } from 'react'
import { SpeakButton } from '../components/Speak'
const words = [...extraWords,
 ['Manger & boire','사과','sagwa','pomme','사과를 먹어요.','Je mange une pomme.','photo-1560806887-1e4cd0b6cbd6'],
 ['Manger & boire','바나나','banana','banane','바나나가 있어요.','Il y a une banane.','photo-1571771894821-ce9b6c11b08e'],
 ['Manger & boire','딸기','ttalgi','fraise','딸기를 좋아해요.','J’aime les fraises.','photo-1464965911861-746a04b4bca6'],
 ['Manger & boire','커피','keopi','café','커피 한 잔 주세요.','Un café, s’il vous plaît.','photo-1509042239860-f550ce710b93'],
 ['Manger & boire','빵','ppang','pain','빵을 먹어요.','Je mange du pain.','photo-1509440159596-0249088772ff'],
 ['Manger & boire','물','mul','eau','물을 마셔요.','Je bois de l’eau.','photo-1548839140-29a749e1cf4d'],
 ['Animaux & nature','고양이','goyangi','chat','고양이가 귀여워요.','Le chat est mignon.','photo-1514888286974-6c03e2ca1dba'],
 ['Animaux & nature','개','gae','chien','개가 있어요.','Il y a un chien.','photo-1552053831-71594a27632d'],
 ['Animaux & nature','나무','namu','arbre','나무가 커요.','L’arbre est grand.','photo-1441974231531-c6227db76b6e'],
 ['Animaux & nature','바다','bada','mer','바다가 예뻐요.','La mer est belle.','photo-1507525428034-b723cf961d3e'],
 ['Au quotidien','책','chaek','livre','책을 읽어요.','Je lis un livre.','photo-1495446815901-a7297e633e8d'],
 ['Au quotidien','자전거','jajeongeo','vélo','자전거를 타요.','Je fais du vélo.','photo-1485965120184-e220f721d03e'],
]
export default function Vocabulary() {
 const [limit,setLimit] = useState(24)
 const [category,setCategory] = useState('Tout')
 const [query,setQuery] = useState('')
 const [hidden,setHidden] = useState(false)
 const [revealed,setRevealed] = useState<string[]>([])
 const visible = words.filter(w=>(category==='Tout'||w[0]===category)&&w.slice(1,4).join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase()))
 return <div className="container page"><div className="page-head"><h1>Le vocabulaire en photos</h1><p className="muted">132 mots répartis par thèmes, avec audio et phrases simples. Les photos de thèmes servent de repères ; les 12 cartes illustrées associent directement une photo à un mot. Cache les traductions pour tester ta mémoire.</p></div>
 <Link to="/couleurs" className="btn">Apprendre les couleurs →</Link><h2>Choisis ton univers</h2><div className="level-grid">{vocabularyThemes.map(t=><button key={t.name} className="card" aria-pressed={category===t.name} onClick={()=>{setCategory(t.name);setLimit(24);document.getElementById('vocab-list')?.scrollIntoView({behavior:'smooth'})}}><img src={`https://images.unsplash.com/${t.photo}?auto=format&fit=crop&w=400&q=75`} alt={`Photo du thème ${t.name}`} loading="lazy" style={{width:'100%',height:110,objectFit:'cover',borderRadius:14}}/><h3>{t.name}</h3><span>12 mots · écouter et réviser</span></button>)}</div><h2 id="vocab-list">Les mots à apprendre</h2><section className="card"><div className="row" style={{flexWrap:'wrap'}}><label>Thème <select className="input" value={category} onChange={e=>{setCategory(e.target.value);setLimit(24)}}>{['Tout',...new Set(words.map(w=>w[0]))].map(c=><option key={c}>{c}</option>)}</select></label><label>Rechercher <input className="input" value={query} onChange={e=>{setQuery(e.target.value);setLimit(24)}} placeholder="Français, coréen ou romanisation" /></label><button className="btn ghost" aria-pressed={hidden} onClick={()=>{setHidden(!hidden);setRevealed([])}}>{hidden?'Afficher les traductions':'Cacher les traductions'}</button></div></section>
 <p className="muted">{visible.length} mots · Photos : Unsplash</p><div className="level-grid">{visible.slice(0,limit).map(([cat,ko,rom,fr,sentence,translation,photo])=><article className="card" key={cat+ko}>{photo && <img src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=640&q=80`} alt={hidden?`Illustration à reconnaître : ${cat}`:fr} loading="lazy" style={{width:'100%',height:210,objectFit:'cover',borderRadius:18}}/>}<p className="small muted">{cat}</p><h2 lang="ko">{ko} <SpeakButton text={ko}/></h2><p className="muted">{rom}</p>{!hidden||revealed.includes(ko)?<p><strong>{fr}</strong></p>:<button className="btn ghost" onClick={()=>setRevealed([...revealed,ko])}>Révéler le sens</button>}<p lang="ko">{sentence} <SpeakButton text={sentence}/></p>{(!hidden||revealed.includes(ko))&&<p>{translation}</p>}</article>)}</div>{visible.length>limit&&<button className="btn mt" onClick={()=>setLimit(limit+24)}>Voir 24 mots de plus</button>}{!visible.length&&<p>Aucun mot trouvé. Essaie un autre mot ou un autre thème.</p>}</div>
}
