import { get, put } from '@vercel/blob'
import { randomUUID } from 'node:crypto'
import { passwordHash, randomToken, DB_PATH, type Database } from '../server/database'
import { emptyProgress } from '../src/lib/model'
const existing = await get(DB_PATH, { access:'private', useCache:false })
const db:Database = existing?.stream ? JSON.parse(await new Response(existing.stream).text()) : {version:1,accounts:{},limits:{}}
if (!Object.values(db.accounts).some(a=>a.user.email==='mai.linh@example.com')) {
 const id=randomUUID(), salt=randomToken()
 const secret=process.env.DEMO_PASSWORD
 if(!secret) throw new Error('DEMO_PASSWORD required')
 db.accounts[id]={ user:{id,username:'mai.linh',email:'mai.linh@example.com',displayName:'Mai-Linh',isDemo:true,avatar:null,bio:'Un peu de coréen, chaque jour ✨',goal:'Apprendre en m’amusant',website:'',location:'',createdAt:new Date().toISOString()}, password:await passwordHash(secret,salt),salt,progress:emptyProgress(),sessions:{},operations:[] }
 await put(DB_PATH,JSON.stringify(db),{access:'private',addRandomSuffix:false,allowOverwrite:!!existing,...(existing?{ifMatch:existing.blob.etag.replace(/^W\//, '')}:{}),contentType:'application/json'})
 console.log('Mai-Linh: account created; unlimited learning/test access.')
} else console.log('Mai-Linh already exists; preserved.')

