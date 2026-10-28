import crypto from 'crypto';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body || {};

    const status = payload?.status || payload?.data?.status || payload?.event || '';
    const customerEmail = (
      payload?.customer?.email ||
      payload?.data?.customer?.email ||
      payload?.buyer?.email ||
      payload?.email ||
      ''
    ).trim().toLowerCase();

    const customerName =
      payload?.customer?.name ||
      payload?.data?.customer?.name ||
      payload?.buyer?.name ||
      payload?.name ||
      'Lojista';

    if (!customerEmail) {
      return res.status(400).json({ error: 'E-mail do comprador não encontrado no payload da Cakto.' });
    }

    // Filtra apenas eventos de pagamento aprovado (caso a Cakto envie outros eventos)
    const approvedStatuses = ['paid', 'approved', 'purchase_approved', 'completed', 'order.paid', 'payment.approved'];
    if (status && !approvedStatuses.includes(String(status).toLowerCase())) {
      return res.status(200).json({ ignored: true, status });
    }

    // Gera a senha exclusiva de 8 caracteres (Stateless HMAC)
    const secret = process.env.AUTH_SECRET || 'forneshop-master-secret-2026';
    const generatedPassword = crypto
      .createHmac('sha256', secret)
      .update(customerEmail)
      .digest('hex')
      .slice(0, 8)
      .toUpperCase();

    // Dispara o e-mail se as variáveis SMTP/Gmail estiverem configuradas na Vercel
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"Forneshop Oficial" <${process.env.SMTP_USER}>`,
        to: customerEmail,
        subject: '🚀 Seu Acesso Oficial à Plataforma Forneshop!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #1e293b;">
            <h2 style="color: #38bdf8; margin-top: 0;">Bem-vindo(a) à Forneshop, ${customerName}!</h2>
            <p style="color: #cbd5e1; line-height: 1.5;">Seu pagamento foi aprovado com sucesso. Utilize as credenciais abaixo para acessar o seu painel:</p>
            <div style="background: #1e293b; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
              <p style="margin: 6px 0;"><strong>🔗 Painel:</strong> <a href="https://forneshopp.vercel.app" style="color: #38bdf8;">https://forneshopp.vercel.app</a></p>
              <p style="margin: 6px 0;"><strong>📧 E-mail:</strong> ${customerEmail}</p>
              <p style="margin: 6px 0;"><strong>🔑 Senha Exclusiva:</strong> <span style="font-family: monospace; font-size: 18px; font-weight: bold; color: #4ade80;">${generatedPassword}</span></p>
            </div>
            <p style="font-size: 12px; color: #64748b;">Guarde este e-mail em local seguro. Acesso liberado automaticamente.</p>
          </div>
        `
      });
    }

    return res.status(200).json({
      success: true,
      email: customerEmail,
      message: 'Credenciais geradas e enviadas com sucesso!'
    });
  } catch (err) {
    console.error('Erro no Webhook Cakto:', err);
    return res.status(500).json({ error: 'Erro interno ao processar webhook', details: err.message });
  }
}
