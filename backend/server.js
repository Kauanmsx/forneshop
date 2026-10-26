require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

const CAKTO_WEBHOOK_SECRET = process.env.CAKTO_WEBHOOK_SECRET;
const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
}));

function verificarAssinatura(req) {
    const signature = req.headers['x-cakto-signature'];
    if (!signature) return false;
    const hmac = crypto.createHmac('sha256', CAKTO_WEBHOOK_SECRET);
    const digest = Buffer.from(hmac.update(req.rawBody).digest('hex'), 'utf8');
    const checksum = Buffer.from(signature, 'utf8');
    return checksum.length === digest.length && crypto.timingSafeEqual(digest, checksum);
}

app.post('/webhook/pagamento-aprovado', async (req, res) => {
    try {
        if (!verificarAssinatura(req)) {
            return res.status(401).send('NÃ£o autorizado');
        }
        const dados = req.body;
        if (dados.status !== 'approved') return res.status(200).send('Ignorado');

        const email = dados.customer.email;
        const nome = dados.customer.name;
        const senha = Math.random().toString(36).slice(-8) + 'Fs!';

        const { data: auth, error: authError } = await supabase.auth.admin.createUser({
          email, password: senha, email_confirm: true, user_metadata: { name: nome }
        });
        if (authError) throw authError;

        await supabase.from('subscriptions').insert({
            user_id: auth.user.id, status: 'active', plan: dados.product.name
        });

        await resend.emails.send({
            from: 'ForneShop <acesso@forneshop.com>',
            to: email,
            subject: 'Seu acesso foi liberado!',
            html: `<p>OlÃ¡ ${nome}, sua senha provisÃ³ria Ã©: <strong>${senha}</strong></p>`
        });

        res.status(200).send('Webhook processado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno');
    }
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));
