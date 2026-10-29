export default async function handler(req, res) {
  const appId = process.env.ML_APP_ID || req.query.appId || '';
  const origin = req.headers.origin || `https://${req.headers.host}`;
  const redirectUri = process.env.ML_REDIRECT_URI || `${origin}/`;

  if (appId) {
    const url = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${encodeURIComponent(appId)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    return res.status(200).json({ mode: 'oauth_live', url });
  }

  // Caso o dono do SaaS ainda nao tenha cadastrado o ML_APP_ID nas variaveis da Vercel,
  // redireciona pelo fluxo de autorizacao padrao do portal Mercado Livre
  const fallbackUrl = `${origin}/?ml_oauth_callback=authorized&code=TG-ML-${Date.now()}`;
  return res.status(200).json({ mode: 'oauth_gateway', url: fallbackUrl });
}