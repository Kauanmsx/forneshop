import crypto from 'crypto';

function generateSubscriberCredentials(email, name, plan) {
  const cleanEmail = String(email).trim().toLowerCase();
  const secretSalt = process.env.SAAS_SECRET_SALT || 'FORNESHOP_ENTERPRISE_2026_KEY';
  const hash = crypto.createHmac('sha256', secretSalt).update(cleanEmail).digest('hex').toUpperCase();

  const subscriberId = 'FS-' + hash.substring(0, 6);
  const personalPassword = 'FS@' + hash.substring(6, 14);

  return {
    subscriberId,
    name: name || cleanEmail.split('@')[0],
    email: cleanEmail,
    password: personalPassword,
    plan: plan || 'Acesso Vitalício',
    createdAt: new Date().toISOString()
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  const payload = req.body || {};
  // Suporta payload direto ou formato oficial de Webhook da Cakto / Mercado Pago
  const customerEmail = payload.email || payload.customer?.email || payload.data?.customer?.email;
  const customerName = payload.name || payload.customer?.name || payload.data?.customer?.name || 'Lojista Parceiro';
  const planName = payload.plan || payload.product?.name || 'Acesso Vitalício PRO';

  if (!customerEmail) {
    return res.status(400).json({ error: 'E-mail do comprador obrigatorio.' });
  }

  const credentials = generateSubscriberCredentials(customerEmail, customerName, planName);

  // Disparo real de E-mail via Resend API (se configurado na Vercel)
  let emailSent = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'Forneshop <acesso@forneshop.com>',
          to: [credentials.email],
          subject: 'Acesso Liberado — Suas Credenciais da Plataforma Forneshop',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0d0f14; color: #f4f4f5; padding: 32px; border-radius: 16px; border: 1px solid #27272a;">
              <h1 style="color: #ffffff; margin-top: 0;">FORNESHOP</h1>
              <p style="color: #60a5fa; font-weight: bold;">Pagamento Confirmado! Bem-vindo(a), ${credentials.name}.</p>
              <p style="color: #d4d4d8; font-size: 14px; line-height: 1.6;">
                Seu plano <strong>${credentials.plan}</strong> já está ativo. Utilize suas credenciais exclusivas abaixo para acessar o catálogo de fornecedores e integrar sua conta do Mercado Livre:
              </p>
              <div style="background: #13161f; border: 1px solid #3b82f6; border-radius: 12px; padding: 18px; margin: 24px 0;">
                <p style="margin: 6px 0; font-size: 13px;"><strong>ID do Assinante:</strong> <span style="color: #93c5fd;">${credentials.subscriberId}</span></p>
                <p style="margin: 6px 0; font-size: 13px;"><strong>Login (Seu E-mail):</strong> <span style="color: #ffffff;">${credentials.email}</span></p>
                <p style="margin: 6px 0; font-size: 15px;"><strong>Senha Exclusiva:</strong> <span style="color: #34d399; font-family: monospace; font-weight: bold;">${credentials.password}</span></p>
              </div>
              <p style="color: #a1a1aa; font-size: 12px;">Guarde este e-mail com segurança. Sua senha é pessoal e intransferível.</p>
            </div>
          `
        })
      });
      emailSent = emailRes.ok;
    } catch (e) {}
  }

  return res.status(200).json({
    success: true,
    emailDispatched: emailSent,
    credentials
  });
}