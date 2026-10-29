export default function handler(req, res) {
  const appId = process.env.ML_APP_ID;
  if (!appId) return res.status(500).json({ error: 'ML_APP_ID nao configurado na Vercel.' });
  const redirectUri = process.env.ML_REDIRECT_URI || `https://${req.headers.host}/`;
  const url =
    'https://auth.mercadolivre.com.br/authorization?response_type=code' +
    `&client_id=${encodeURIComponent(appId)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  res.status(200).json({ url });
}