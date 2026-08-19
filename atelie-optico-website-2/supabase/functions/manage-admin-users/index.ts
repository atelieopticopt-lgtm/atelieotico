import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...cors, 'Content-Type': 'application/json' },
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  try {
    const url = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const authorization = req.headers.get('Authorization') || ''
    const callerClient = createClient(url, anonKey, { global: { headers: { Authorization: authorization } } })
    const adminClient = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })
    const { data: { user }, error: authError } = await callerClient.auth.getUser()
    if (authError || !user) return json({ error: 'Sessão inválida.' }, 401)

    const { data: caller } = await adminClient.from('profiles').select('role,is_admin').eq('id', user.id).single()
    const ownerEmail = (Deno.env.get('BOOTSTRAP_SUPER_ADMIN_EMAIL') || 'admin@atelieotico.pt').toLowerCase()
    const isSuperAdmin = caller?.is_admin && (caller.role === 'super_admin' || user.email?.toLowerCase() === ownerEmail)
    if (!isSuperAdmin) return json({ error: 'Apenas super admins podem gerir utilizadores.' }, 403)

    const body = await req.json()
    if (body.action === 'list') {
      const { data: authData, error } = await adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 })
      if (error) throw error
      const { data: profiles } = await adminClient.from('profiles').select('id,username,full_name,email,role,is_admin').eq('is_admin', true)
      const profileMap = new Map((profiles || []).map((profile) => [profile.id, profile]))
      const users = authData.users.filter((item) => profileMap.has(item.id)).map((item) => ({
        ...profileMap.get(item.id), email: item.email, created_at: item.created_at, last_sign_in_at: item.last_sign_in_at,
      }))
      return json({ users })
    }

    if (body.action === 'create') {
      if (!body.email || !body.password || !body.username || !body.full_name) return json({ error: 'Preencha todos os campos obrigatórios.' }, 400)
      const { data, error } = await adminClient.auth.admin.createUser({
        email: body.email,
        password: body.password,
        email_confirm: true,
        user_metadata: { username: body.username, full_name: body.full_name },
      })
      if (error) throw error
      const { error: profileError } = await adminClient.from('profiles').upsert({
        id: data.user.id, email: body.email, username: body.username, full_name: body.full_name,
        role: body.role === 'super_admin' ? 'super_admin' : 'admin', is_admin: true,
      })
      if (profileError) { await adminClient.auth.admin.deleteUser(data.user.id); throw profileError }
      return json({ user: data.user }, 201)
    }

    if (body.action === 'update') {
      if (!body.id) return json({ error: 'Utilizador inválido.' }, 400)
      const authUpdate: Record<string, unknown> = { user_metadata: { username: body.username, full_name: body.full_name } }
      if (body.password) authUpdate.password = body.password
      const { error } = await adminClient.auth.admin.updateUserById(body.id, authUpdate)
      if (error) throw error
      const { error: profileError } = await adminClient.from('profiles').update({ username: body.username, full_name: body.full_name, role: body.role === 'super_admin' ? 'super_admin' : 'admin', is_admin: true }).eq('id', body.id)
      if (profileError) throw profileError
      return json({ ok: true })
    }

    if (body.action === 'delete') {
      if (!body.id || body.id === user.id) return json({ error: 'Não pode eliminar a sua própria conta.' }, 400)
      const { data: target } = await adminClient.from('profiles').select('role').eq('id', body.id).single()
      if (target?.role === 'super_admin') {
        const { count } = await adminClient.from('profiles').select('id', { count: 'exact', head: true }).eq('is_admin', true).eq('role', 'super_admin')
        if ((count || 0) <= 1) return json({ error: 'É obrigatório manter pelo menos um super admin.' }, 400)
      }
      const { error } = await adminClient.auth.admin.deleteUser(body.id)
      if (error) throw error
      return json({ ok: true })
    }
    return json({ error: 'Ação desconhecida.' }, 400)
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Erro interno.' }, 400)
  }
})
