import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  const { email, password } = req.body || {};
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanPass = String(password || '').trim();

  if (!cleanEmail || !cleanPass) {
    return res.status(400).json({ error: 'Informe seu e-mail e a senha enviada apos a compra.' });
  }

  // Conta Master do Dono do SaaS (Kauan)
  if (cleanEmail === 'admin@forneshop.com' && cleanPass === 'admin123') {
    return res.status(200).json({
      success: true,
      user: {
        subscriberId: 'MASTER-ADMIN',
        name: 'Kauan Marinho (CEO Forneshop)',
        email: cleanEmail,
        plan: 'Master SaaS Owner',
        isAdmin: true
      }
    });
  }

  // Valida se a senha bate com a assinatura criptografica gerada pelo Webhook no momento da compra
  const secretSalt = process.env.SAAS_SECRET_SALT || 'FORNESHOP_ENTERPRISE_2026_KEY';
  const hash = crypto.createHmac('sha256', secretSalt).update(cleanEmail).digest('hex').toUpperCase();
  const expectedPassword = 'FS@' + hash.substring(6, 14);
  const subscriberId = 'FS-' + hash.substring(0, 6);

  if (cleanPass === expectedPassword) {
    return res.status(200).json({
      success: true,
      user: {
        subscriberId,
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        plan: 'Acesso Vitalício PRO',
        isAdmin: false
      }
    });
  }

  return res.status(401).json({
    error: 'Acesso negado: Nenhuma assinatura ativa encontrada para estas credenciais. Adquira seu plano para receber seu login e senha por e-mail.'
  });
}