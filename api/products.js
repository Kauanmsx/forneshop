export default async function handler(req, res) {
  const products = [
    {
      id: "nf-moch-xinruiqi",
      name: "Mochila Xinruiqi Reforcada Impermeavel para Notebook - Preta",
      category: "Moda",
      supplier: "Importadora SP Express",
      stock: 12,
      cost: 68.28,
      suggestedPrice: 129.73,
      profit: 40.69,
      published: true,
      registrations: 2,
      image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-moch-xinruiqi/01.webp"
    },
    {
      id: "nf-hub-4em1",
      name: "Hub USB Type-C 4 Portas USB 3.0 5Gbps Plug and Play",
      category: "Eletronicos",
      supplier: "TechBrasil Distribuidora",
      stock: 1,
      cost: 25.88,
      suggestedPrice: 49.17,
      profit: 15.42,
      published: true,
      registrations: 1,
      image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-hub-4em1/01.jpg"
    },
    {
      id: "nf-fone-ka933-vm",
      name: "Fone Bluetooth Kapbom KA-933 Estereo Headphone Vermelho",
      category: "Eletronicos",
      supplier: "Kapbom Oficial BR",
      stock: 3,
      cost: 43.08,
      suggestedPrice: 81.85,
      profit: 25.67,
      published: false,
      registrations: 0,
      image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-fone-ka933-vm/01.webp"
    },
    {
      id: "nf-carr-ka375",
      name: "Carregador Kapbom KA-375-56 Bivolt 2 Portas USB com Cabo",
      category: "Eletronicos",
      supplier: "Kapbom Oficial BR",
      stock: 16,
      cost: 27.59,
      suggestedPrice: 52.42,
      profit: 16.44,
      published: false,
      registrations: 0,
      image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-carr-ka375/01.webp"
    },
    {
      id: "c902bc97-562e-4fbb-8c38-85bc141bffb7",
      name: "Mochila Urbana Shengshi 20L Antifurto USB para Notebook",
      category: "Moda",
      supplier: "Importadora SP Express",
      stock: 8,
      cost: 68.28,
      suggestedPrice: 129.73,
      profit: 40.69,
      published: true,
      registrations: 1,
      image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-moch-shengshi-cz/01.jpg"
    },
    {
      id: "f45f7d5e-ac32-471b-add8-9253dfafd994",
      name: "Mochila Unissex Jinpin Fashion para Notebook Preta",
      category: "Moda",
      supplier: "Importadora SP Express",
      stock: 1,
      cost: 61.27,
      suggestedPrice: 116.41,
      profit: 36.51,
      published: true,
      registrations: 1,
      image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-moch-jinpin-pt/01.webp"
    },
    {
      id: "nf-fone-hs330",
      name: "Fone de Ouvido com Fio HS330 P2 Estereo com Microfone Branco",
      category: "Eletronicos",
      supplier: "TechBrasil Distribuidora",
      stock: 5,
      cost: 23.88,
      suggestedPrice: 45.37,
      profit: 14.23,
      published: false,
      registrations: 0,
      image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-fone-hs330/01.jpg"
    },
    {
      id: "c4637c51-95c0-40ef-a4c0-be8040586983",
      name: "Mini Massageador Eletrico Recarregavel 6 Modos 10 Niveis",
      category: "Saude",
      supplier: "Saude & Vida Drop",
      stock: 54,
      cost: 23.88,
      suggestedPrice: 45.37,
      profit: 14.23,
      published: true,
      registrations: 1,
      image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-massag-mini/01.jpg"
    },
    {
      id: "48965908-1864-4bc2-9b40-563748b425f8",
      name: "Microfone de Lapela Lavalier Omnidirecional Celular e PC",
      category: "Eletronicos",
      supplier: "TechBrasil Distribuidora",
      stock: 32,
      cost: 10.68,
      suggestedPrice: 20.29,
      profit: 6.36,
      published: true,
      registrations: 2,
      image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-mic-lapela/01.jpg"
    }
  ];
  return res.status(200).json({ success: true, products });
}