export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  const { name, email, plan } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: 'E-mail obrigatorio' });
  }

  const generatedPassword = 'FS-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  // Caso tenha RESEND_API_KEY configurada nas variaveis da Vercel, dispara o e-mail real
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Forneshop <acesso@forneshop.com>',
          to: [email],
          subject: 'Seu Acesso Liberado - Plataforma Forneshop',
          html: `<h2>Bem-vindo(a) à Forneshop, ${name || 'Lojista'}!</h2><p>Seu plano <strong>${plan}</strong> foi confirmado.</p><p><strong>E-mail de Login:</strong> ${email}<br/><strong>Sua Senha Exclusiva:</strong> ${generatedPassword}</p>`
        })
      });
    } catch (e) {}
  }

  return res.status(200).json({
    success: true,
    credentials: {
      name: name || email.split('@')[0],
      email,
      password: generatedPassword,
      plan: plan || 'Acesso Vitalicio'
    }
  });
}