import { randomUUID, randomBytes } from 'node:crypto'
import { passwordHash, randomToken, transaction } from '../server/database.js'
import { emptyProgress } from '../src/lib/model.js'
const email=process.env.ADMIN_EMAIL?.toLowerCase()
if(!email||!email.includes('@'))throw Error('ADMIN_EMAIL required')
const secret=randomBytes(18).toString('base64url'),salt=randomToken(),hash=await passwordHash(secret,salt)
const result=await transaction(db=>{
 const existing=Object.values(db.accounts).find(a=>a.user.email===email)
 if(existing){existing.user.role='admin';existing.user.suspended=false;existing.user.archived=false;return {created:false,email}}
 const id=randomUUID(),username='admin.'+randomBytes(3).toString('hex')
 db.accounts[id]={user:{id,email,username,displayName:'Alexia',role:'admin',avatar:null,bio:'',goal:'',location:'',website:'',createdAt:new Date().toISOString()},salt,password:hash,progress:emptyProgress(),sessions:{},operations:[]}
 return {created:true,email,password:secret}
})
console.log(JSON.stringify(result))
