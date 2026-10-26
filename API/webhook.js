export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const eventData = req.body;
    
    // Aqui colocas a tua lógica de processamento da venda da Cakto (ex: verificar assinatura, enviar email com Resend, etc.)
    console.log('Webhook recebido da Cakto:', eventData);

    return res.status(200).json({ success: true, message: 'Webhook processado com sucesso' });
  } catch (error) {
    console.error('Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}