export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }
  const { email, password } = req.body || {};
  if (
    (email === 'admin@forneshop.com' && password === 'admin123') ||
    (email && password && password.length >= 4)
  ) {
    return res.status(200).json({
      success: true,
      user: {
        name: 'Kauan Marinho',
        email: email,
        storeCode: 'KL20261021150519339',
        plan: 'Vitalicio PRO'
      }
    });
  }
  return res.status(401).json({ error: 'Credenciais invalidas. Use admin@forneshop.com / admin123' });
}