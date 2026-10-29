const API = 'https://api.mercadolibre.com';
const LEVELS = {
  '5_green': 'Verde', '4_light_green': 'Verde claro', '3_yellow': 'Amarela',
  '2_orange': 'Laranja', '1_red': 'Vermelha'
};
const pct = (v) => (typeof v === 'number' ? `${(v * 100).toFixed(1).replace('.0', '')}%` : '0%');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Metodo nao permitido' });
  const { code, redirectUri } = req.body || {};
  if (!code) return res.status(400).json({ success: false, error: 'code ausente' });

  const { ML_APP_ID, ML_CLIENT_SECRET, ML_REDIRECT_URI } = process.env;
  if (!ML_APP_ID || !ML_CLIENT_SECRET) {
    return res.status(500).json({ success: false, error: 'ML_APP_ID / ML_CLIENT_SECRET nao configurados na Vercel.' });
  }

  try {
    const tokenRes = await fetch(`${API}/oauth/token`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: ML_APP_ID,
        client_secret: ML_CLIENT_SECRET,
        code,
        redirect_uri: ML_REDIRECT_URI || redirectUri
      })
    });
    const tok = await tokenRes.json();
    if (!tokenRes.ok) {
      return res.status(400).json({ success: false, error: tok.message || tok.error || 'Falha ao trocar o code por token.' });
    }

    const meRes = await fetch(`${API}/users/me`, { headers: { Authorization: `Bearer ${tok.access_token}` } });
    const me = await meRes.json();
    const rep = me.seller_reputation || {};
    const m = rep.metrics || {};

    res.status(200).json({
      success: true,
      store: {
        id: String(tok.user_id),
        nickname: me.nickname || `Vendedor ${tok.user_id}`,
        accessToken: tok.access_token,
        refreshToken: tok.refresh_token,
        expiresAt: Date.now() + (tok.expires_in || 21600) * 1000,
        reputation: LEVELS[rep.level_id] || 'Sem reputacao ainda',
        claimsRate: pct(m.claims && m.claims.rate),
        cancellationsRate: pct(m.cancellations && m.cancellations.rate),
        delayedRate: pct(m.delayed_handling_time && m.delayed_handling_time.rate),
        freeShippingThreshold: 79,
        syncedAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }
    });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}