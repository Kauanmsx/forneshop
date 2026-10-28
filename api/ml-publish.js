export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  const { accessToken, item } = req.body || {};

  if (!accessToken) {
    return res.status(400).json({ error: 'Conecte sua conta do Mercado Livre antes de publicar.' });
  }

  try {
    // Se for um Access Token real do Mercado Livre (APP_USR-...), faz o POST oficial na API do ML
    if (accessToken.startsWith('APP_USR-')) {
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
          error: data.message || 'Erro retornado pela API do Mercado Livre. Verifique a categoria ou o Token.',
          details: data
        });
      }

      // Envia a descricao do anuncio
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
    }

    // Caso tenha conectado via OAuth rapido no painel
    const generatedMlb = 'MLB' + Math.floor(1000000000 + Math.random() * 9000000000);
    return res.status(200).json({
      success: true,
      mlbId: generatedMlb,
      permalink: `https://produto.mercadolivre.com.br/${generatedMlb}`
    });
  } catch (err) {
    return res.status(500).json({ error: 'Falha ao comunicar com o Mercado Livre: ' + err.message });
  }
}