import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type'}
const reply = (body: unknown, status=200) => new Response(JSON.stringify(body),{status,headers:{...cors,'Content-Type':'application/json'}})
const clean = (value: unknown, max=2000) => String(value ?? '').trim().slice(0,max)
const html = (value: unknown) => clean(value).replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]!))

Deno.serve(async (req) => {
  if(req.method==='OPTIONS') return new Response('ok',{headers:cors})
  if(req.method!=='POST') return reply({error:'Método inválido.'},405)
  try{
    const body=await req.json(), fields=body.fields||{}, page=clean(body.page,300)
    if(fields.website) return reply({ok:true})
    const name=clean(fields['your-name']||fields.name,160)
    const email=clean(fields['your-email']||fields.email,254)
    const phone=clean(fields['your-phone']||fields.phone,60)
    const message=clean(fields['your-message']||fields.message)
    const date=clean(fields['qodef-date-form']||fields.date,20)||null
    if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply({error:'Introduza um email válido.'},400)
    const formType=page.includes('marcar-consulta')?'appointment':(fields['your-name']?'contact':'newsletter')
    if(formType==='appointment'&&!fields['checkbox-btn[]']) return reply({error:'É necessário aceitar os Termos e Condições.'},400)
    const client=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,{auth:{persistSession:false}})
    const {data:submission,error}=await client.from('form_submissions').insert({form_type:formType,page_path:page,name,email,phone,preferred_date:date,message,payload:fields}).select('id').single()
    if(error) throw error
    const resendKey=Deno.env.get('RESEND_API_KEY')
    if(!resendKey) return reply({ok:true,saved:true,emailed:false,id:submission.id})
    const adminEmail=Deno.env.get('CONTACT_TO_EMAIL')||'geral@atelieotico.pt'
    const from=Deno.env.get('CONTACT_FROM_EMAIL')||'Ateliê Ótico <onboarding@resend.dev>'
    const rows=[['Tipo',formType],['Nome',name],['Email',email],['Telefone',phone],['Data pretendida',date],['Mensagem',message],['Página',page]].filter(([,v])=>v).map(([k,v])=>`<tr><th style="padding:8px;text-align:left;border-bottom:1px solid #eee">${html(k)}</th><td style="padding:8px;border-bottom:1px solid #eee">${html(v)}</td></tr>`).join('')
    const mail=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${resendKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[adminEmail],reply_to:email,subject:`Novo pedido Ateliê Ótico — ${name||email}`,html:`<div style="font-family:Arial;max-width:680px"><h1 style="color:#b57b30">Novo pedido recebido</h1><table style="width:100%;border-collapse:collapse">${rows}</table><p style="color:#777">Referência: ${submission.id}</p></div>`})})
    if(!mail.ok){const detail=await mail.text();console.error(detail);return reply({ok:true,saved:true,emailed:false,id:submission.id})}
    return reply({ok:true,saved:true,emailed:true,id:submission.id})
  }catch(error){return reply({error:error instanceof Error?error.message:'Não foi possível enviar o pedido.'},400)}
})
