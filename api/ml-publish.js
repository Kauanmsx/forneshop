export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  const { accessToken, item } = req.body || {};

  if (!accessToken) {
    return res.status(400).json({ error: 'Conecte sua conta do Mercado Livre com um Access Token valido antes de publicar.' });
  }

  try {
    const mlPayload = {
      title: item.title.substring(0, 60),
      category_id: item.categoryId || 'MLB1648',
      price: Number(item.price),
      currency_id: 'BRL',
      available_quantity: Number(item.stock),
      buying_mode: 'buy_it_now',
      listing_type_id: item.listingType || 'gold_special',
      condition: 'new',
      pictures: (item.pictures || []).map(url => ({ source: url })),
      attributes: [
        { id: 'BRAND', value_name: item.brand || 'Generica' },
        { id: 'MODEL', value_name: item.model || 'Padrao' },
        { id: 'GTIN', value_name: item.ean || '7890000000000' }
      ],
      sale_terms: [
        { id: 'WARRANTY_TYPE', value_name: 'Garantia do vendedor' },
        { id: 'WARRANTY_TIME', value_name: item.warranty || '90 dias' }
      ]
    };

    const response = await fetch('https://api.mercadolibre.com/items', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mlPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || 'Erro retornado pela API do Mercado Livre.',
        cause: data.cause || []
      });
    }

    if (data.id && item.description) {
      await fetch(`https://api.mercadolibre.com/items/${data.id}/description`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plain_text: item.description })
      });
    }

    return res.status(200).json({
      success: true,
      mlbId: data.id,
      permalink: data.permalink
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erro de rede com a API do Mercado Livre: ' + err.message });
  }
}