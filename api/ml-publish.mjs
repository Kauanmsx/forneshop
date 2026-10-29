const API = 'https://api.mercadolibre.com';

const validGtin = (value) => {
  const d = String(value || '').replace(/\D/g, '');
  if (![8, 12, 13, 14].includes(d.length)) return false;
  const nums = d.split('').map(Number);
  const check = nums.pop();
  const sum = nums.reverse().reduce((acc, v, i) => acc + v * (i % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === check;
};

async function refreshAccessToken(refreshToken) {
  const r = await fetch(`${API}/oauth/token`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.ML_APP_ID,
      client_secret: process.env.ML_CLIENT_SECRET,
      refresh_token: refreshToken
    })
  });
  return r.ok ? r.json() : null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo nao permitido' });
  const { accessToken, refreshToken, item } = req.body || {};
  if (!accessToken || !item) return res.status(400).json({ error: 'accessToken e item sao obrigatorios' });

  let token = accessToken;
  let tokens = null;

  const ml = async (path, init = {}) => {
    const run = () => fetch(`${API}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });
    let r = await run();
    if (r.status === 401 && refreshToken && !tokens) {
      const t = await refreshAccessToken(refreshToken);
      if (t) {
        token = t.access_token;
        tokens = {
          accessToken: t.access_token,
          refreshToken: t.refresh_token,
          expiresAt: Date.now() + t.expires_in * 1000
        };
        r = await run();
      }
    }
    return r;
  };

  try {
    // Categoria "folha" descoberta pelo titulo
    let categoryId = item.categoryId;
    try {
      const d = await ml(`/sites/MLB/domain_discovery/search?limit=1&q=${encodeURIComponent(item.title)}`);
      const list = await d.json();
      if (Array.isArray(list) && list[0] && list[0].category_id) categoryId = list[0].category_id;
    } catch (e) {}

    const attributes = [];
    if (item.brand) attributes.push({ id: 'BRAND', value_name: item.brand });
    if (item.model) attributes.push({ id: 'MODEL', value_name: item.model });
    if (validGtin(item.ean)) attributes.push({ id: 'GTIN', value_name: String(item.ean).replace(/\D/g, '') });

    const baseBody = {
      category_id: categoryId,
      price: Number(item.price),
      currency_id: 'BRL',
      available_quantity: Number(item.stock),
      buying_mode: 'buy_it_now',
      condition: 'new',
      listing_type_id: item.listingType || 'gold_special',
      pictures: (item.pictures || []).map((source) => ({ source })),
      attributes,
      sale_terms: [
        { id: 'WARRANTY_TYPE', value_name: 'Garantia do vendedor' },
        { id: 'WARRANTY_TIME', value_name: item.warranty || '90 dias' }
      ]
    };

    const name = String(item.title).slice(0, 60);
    const send = (extra) => ml('/items', { method: 'POST', body: JSON.stringify({ ...baseBody, ...extra }) });

    // Modelo novo (User Products): family_name, sem title
    let created = await send({ family_name: name });
    let data = await created.json();

    // Conta ainda no modelo antigo: tenta com title
    if (!created.ok) {
      const txt = JSON.stringify(data);
      if (/title/i.test(txt) && !/family_name/i.test(txt)) {
        created = await send({ title: name });
        data = await created.json();
      }
    }

    if (!created.ok) {
      const causes = (data.cause || []).map((c) => c.message).filter(Boolean).join(' | ');
      return res.status(400).json({
        error: `${data.message || 'Erro ao publicar'}${causes ? ': ' + causes : ''}`,
        tokens
      });
    }

    if (item.description) {
      await ml(`/items/${data.id}/description`, {
        method: 'POST',
        body: JSON.stringify({ plain_text: String(item.description).slice(0, 50000) })
      });
    }

    return res.status(200).json({
      success: true,
      mlbId: data.id,
      title: data.title,
      permalink: data.permalink,
      status: data.status,
      tokens
    });
  } catch (e) {
    return res.status(500).json({ error: e.message, tokens });
  }
}