export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Lista de produtos/catálogos para garantir que aparecem no site
  const products = [
    { id: 1, name: "Catálogo Completo de Fornecedores", price: 197.00, category: "Dropshipping", description: "Acesso total aos melhores fornecedores de dropshipping nacional e internacional." },
    { id: 2, name: "Integração Direta com Mercado Livre", price: 150.00, category: "Automação", description: "Sincronize e publique produtos automaticamente." }
  ];

  return res.status(200).json({ success: true, products });
}