import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ valid: false, error: 'Informe e-mail e senha.' });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPass = String(password).trim().toUpperCase();

  const secret = process.env.AUTH_SECRET || 'forneshop-master-secret-2026';
  const expectedPassword = crypto
    .createHmac('sha256', secret)
    .update(cleanEmail)
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();

  if (cleanPass === expectedPassword) {
    return res.status(200).json({
      valid: true,
      user: {
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        role: 'subscriber',
        plan: 'active'
      }
    });
  }

  return res.status(401).json({ valid: false, error: 'Credenciais inválidas.' });
}
