export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  const { action, code, appId, clientSecret, redirectUri, accessToken } = req.body || {};

  try {
    // 1. Trocar codigo OAuth por Access Token real no Mercado Livre
    if (action === 'exchange_code') {
      const tokenRes = await fetch('https://api.mercadolibre.com/oauth/token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: appId,
          client_secret: clientSecret,
          code: code,
          redirect_uri: redirectUri
        })
      });

      const tokenData = await tokenRes.json();
      if (!tokenRes.ok) {
        return res.status(tokenRes.status).json({
          error: tokenData.message || 'Falha ao autenticar codigo OAuth no Mercado Livre.',
          details: tokenData
        });
      }

      const userRes = await fetch('https://api.mercadolibre.com/users/me', {
        headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
      });
      const userData = await userRes.json();

      return res.status(200).json({
        success: true,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        user: userData
      });
    }

    // 2. Validar Access Token real (APP_USR-...) direto na API do Mercado Livre
    if (action === 'verify_token') {
      if (!accessToken) {
        return res.status(400).json({ error: 'Access Token obrigatorio.' });
      }

      const userRes = await fetch('https://api.mercadolibre.com/users/me', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const userData = await userRes.json();

      if (!userRes.ok) {
        return res.status(userRes.status).json({
          error: userData.message || 'Token invalido ou expirado no Mercado Livre.'
        });
      }

      return res.status(200).json({
        success: true,
        user: {
          id: userData.id,
          nickname: userData.nickname,
          email: userData.email,
          permalink: userData.permalink,
          levelId: userData.seller_reputation?.level_id || '5_green',
          powerSellerStatus: userData.seller_reputation?.power_seller_status || 'MercadoLider',
          claimsRate: ((userData.seller_reputation?.metrics?.claims?.rate || 0) * 100).toFixed(2) + '%',
          cancellationsRate: ((userData.seller_reputation?.metrics?.cancellations?.rate || 0) * 100).toFixed(2) + '%',
          delayedRate: ((userData.seller_reputation?.metrics?.delayed_handling_time?.rate || 0) * 100).toFixed(2) + '%'
        }
      });
    }

    return res.status(400).json({ error: 'Acao invalida.' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao conectar com a API do Mercado Livre: ' + err.message });
  }
}