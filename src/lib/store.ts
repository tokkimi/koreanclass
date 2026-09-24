import { useSyncExternalStore } from 'react'
import { emptyProgress, type User, type Progress, type Booking } from './model.js'
export * from './model.js'
export const USERNAME_RE = /^[a-z0-9._]{3,20}$/
type State = { user: User | null; progress: Progress; ready: boolean; error: string; saving: boolean }
let state: State = { user: null, progress: emptyProgress(), ready: false, error: '', saving: false }
const listeners = new Set<() => void>()
const emit = (patch: Partial<State>) => { state = {...state,...patch}; listeners.forEach(l=>l()) }
function subscribe(l:()=>void) { listeners.add(l); return ()=>{listeners.delete(l)} }
export function useStore<T>(selector:(s:State)=>T) { return useSyncExternalStore(subscribe,()=>selector(state),()=>selector(state)) }
export const useCurrentUser = () => useStore(s=>s.user)
export const useProgress = () => useStore(s=>s.progress)
export const useReady = () => useStore(s=>s.ready)
export const useSyncStatus = () => useStore(s=>s.error || (s.saving ? 'Sauvegarde en cours…' : s.user ? 'Progression sauvegardée en ligne' : ''))
export const useUserByUsername = (username:string|undefined) => useStore(s=>s.user?.username === username ? s.user : null)
const EMPTY = emptyProgress()
export const useProgressOf = (id:string|undefined) => useStore(s=>id === s.user?.id ? s.progress : EMPTY)
let pending = 0
async function request(body?:Record<string,unknown>) {
  const response = await fetch('/api/account', { method: body ? 'POST':'GET', credentials:'same-origin', cache:'no-store', headers: body ? {'Content-Type':'application/json'} : {}, body: body ? JSON.stringify(body):undefined })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Connexion indisponible. Réessaie.')
  return data as {user:User|null;progress:Progress}
}
export async function refreshSession() {
  if (pending) return
  try { const data = await request(); if (!pending) emit({...data,ready:true,error:''}) }
  catch { emit({ready:true,error:'Connexion au serveur indisponible. Actualise pour réessayer.'}) }
}
export async function mutate(action:string, data:Record<string,unknown> = {}, operationId:string=crypto.randomUUID()) {
  pending++; emit({saving:true,error:''})
  try { const result = await request({action,...data,operationId}); emit({...result,ready:true,error:''}); return result }
  catch(error) { emit({error:(error as Error).message}); throw error }
  finally { pending--; emit({saving:pending>0}) }
}
export async function login(identifier:string,password:string) { return (await mutate('login',{identifier,password})).user! }
export async function register(input:{username:string;email:string;displayName:string;password:string}) { return (await mutate('register',input)).user! }
export async function logout() { await mutate('logout') }
export async function updateProfile(patch:Partial<User>) { await mutate('profile',{patch}) }
export async function changePassword(current:string,next:string) { await mutate('password',{current,next}) }
export async function resetProgress() { await mutate('reset') }
export async function deleteAccount() { await mutate('delete') }
export async function recordLesson(refId:string,_title:string,_score:number,_total:number,answers:string[],operationId:string) { await mutate('attempt',{kind:'lesson',refId,answers},operationId) }
export async function recordTest(refId:string,_title:string,_score:number,_total:number,_passMark:number,answers:string[],operationId:string) { await mutate('attempt',{kind:'test',refId,answers},operationId) }
export async function recordPlacement(_levelIndex:number,_score:number,_total:number,answers:string[],operationId:string) { await mutate('attempt',{kind:'placement',refId:'placement',answers},operationId) }
export async function addBooking(b:Omit<Booking,'id'|'status'|'createdAt'>) { const id=crypto.randomUUID(); const r=await mutate('booking',{booking:b},id); return r.progress.bookings.find(x=>x.id===id)! }
export async function bookWithCredit(b:Omit<Booking,'id'|'status'|'createdAt'|'formula'>) { const id=crypto.randomUUID(); const r=await mutate('booking',{booking:{...b,formula:'credit'}},id); return r.progress.bookings.find(x=>x.id===id)! }
export async function cancelBooking(id:string) { await mutate('cancelBooking',{id}) }
if (typeof window !== 'undefined') {
  void refreshSession()
  window.addEventListener('focus',()=>void refreshSession())
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible') void refreshSession()})
}
