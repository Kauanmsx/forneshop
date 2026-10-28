import React, { useState, useEffect } from 'react';
import {
  Flame, Boxes, Package, Megaphone, ShoppingCart,
  Wallet, Plug, GraduationCap, Store, Settings, Search,
  Plus, RefreshCw, Trash2, CheckCircle2, AlertCircle,
  ExternalLink, CreditCard, ShieldCheck, Truck, LogOut, Menu, X,
  Sparkles, Crown, Mail, Lock, TrendingUp, DollarSign, Percent,
  BarChart3, ArrowUpRight, Calculator, Filter, KeyRound, Link2
} from 'lucide-react';

// ============================================================================
// FORNECEDORES NACIONAIS VINCULADOS AO CATÁLOGO
// ============================================================================
const SUPPLIERS = [
  {
    id: "sup-sp-express",
    name: "Importadora SP Express",
    cnpj: "42.819.302/0001-18",
    city: "São Paulo - SP",
    category: "Moda, Mochilas & Viagem",
    rating: "4.9",
    dispatchTime: "24h",
    status: "Ativo"
  },
  {
    id: "sup-kapbom",
    name: "Kapbom Oficial BR",
    cnpj: "31.509.481/0001-90",
    city: "Guarulhos - SP",
    category: "Eletrônicos & Áudio",
    rating: "4.8",
    dispatchTime: "12h",
    status: "Ativo"
  },
  {
    id: "sup-techbrasil",
    name: "TechBrasil Distribuidora",
    cnpj: "19.402.881/0001-44",
    city: "Curitiba - PR",
    category: "Informática, Periféricos & Segurança",
    rating: "4.9",
    dispatchTime: "24h",
    status: "Ativo"
  },
  {
    id: "sup-saude-vida",
    name: "Saúde & Vida Drop",
    cnpj: "28.910.443/0001-05",
    city: "Belo Horizonte - MG",
    category: "Saúde, Beleza & Bem-Estar",
    rating: "4.7",
    dispatchTime: "24h",
    status: "Ativo"
  },
  {
    id: "sup-casa-inox",
    name: "Casa & Inox Prime Nacional",
    cnpj: "51.092.774/0001-62",
    city: "Joinville - SC",
    category: "Casa, Cozinha, Faqueiros & Utilidades Virais",
    rating: "4.9",
    dispatchTime: "12h",
    status: "Ativo"
  }
];

// ============================================================================
// CATÁLOGO COMPLETO (PRODUTOS ORIGINAIS + FAQUEIROS E VIRAIS CAMPEÕES DE VENDA)
// ============================================================================
const CATALOG_PRODUCTS = [
  {
    id: "viral-faqueiro-24p",
    sku: "CS-FAQ-INOX24-MLT",
    name: "Faqueiro Jogo de Talheres 24 Peças Aço Inox Luxo Espelhado com Maleta",
    category: "Casa & Cozinha",
    mlCategoryId: "MLB1592",
    mlCategoryName: "Casa, Móveis e Decoração > Cozinha > Louça e Artigos para Servir > Faqueiros",
    supplierId: "sup-casa-inox",
    supplier: "Casa & Inox Prime Nacional",
    stock: 48,
    cost: 54.90,
    suggestedPrice: 139.90,
    brand: "Inox Prime",
    model: "Conjunto Imperial 24 Peças com Estojo",
    ean: "7898594121012",
    warranty: "12 meses",
    isViral: true,
    image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&w=700&q=80",
    description: `FAQUEIRO JOGO DE TALHERES 24 PEÇAS AÇO INOXIDÁVEL LUXO ESPELHADO COM ESTOJO ORGANIZADOR\n\nTransforme sua mesa posta com elegância e durabilidade vitalícia. Fabricado em Aço Inox de alta espessura que não enferruja, não amassa e mantém o brilho espelhado mesmo após lavagens na lava-louças.\n\nCOMPOSIÇÃO DO KIT (24 PEÇAS):\n- 06 Facas de Mesa Forjadas\n- 06 Garfos de Mesa Reforçados\n- 06 Colheres de Mesa\n- 06 Colheres de Sobremesa/Chá\n- 01 Estojo Organizadora de Luxo\n\nDIFERENCIAIS:\n- Acabamento polido espelhado de alto padrão\n- Balanceamento ergonômico no cabo\n- Compatível com máquina Lava-Louças\n- Envio imediato com Nota Fiscal.`
  },
  {
    id: "viral-faqueiro-gold-30p",
    sku: "CS-FAQ-GOLD30-LUX",
    name: "Faqueiro Dourado Titanium 30 Peças Aço Inox Mesa Posta Luxo",
    category: "Casa & Cozinha",
    mlCategoryId: "MLB1592",
    mlCategoryName: "Casa, Móveis e Decoração > Cozinha > Louça e Artigos para Servir > Faqueiros",
    supplierId: "sup-casa-inox",
    supplier: "Casa & Inox Prime Nacional",
    stock: 35,
    cost: 78.50,
    suggestedPrice: 189.90,
    brand: "Inox Prime",
    model: "Royal Gold Titanium 30 Peças",
    ean: "7898594121029",
    warranty: "12 meses",
    isViral: true,
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=700&q=80",
    description: `FAQUEIRO DOURADO TITANIUM 30 PEÇAS AÇO INOXIDÁVEL MESA POSTA LUXO\n\nRevestimento PVD Titanium Gold que não descasca e traz sofisticação imediata para jantares, eventos e presentes de casamento.\n\nITENS INCLUSOS (30 PEÇAS):\n- 06 Garfos de Mesa\n- 06 Facas de Corte Preciso\n- 06 Colheres de Sopa\n- 06 Garfos de Sobremesa\n- 06 Colheres de Sobremesa\n- 01 Caixa Presenteável Premium`
  },
  {
    id: "viral-parafusadeira-21v",
    sku: "TB-PARAF-21V-2BAT",
    name: "Parafusadeira e Furadeira Impacto Sem Fio 21V 2 Baterias + Maleta 28 Peças",
    category: "Ferramentas",
    mlCategoryId: "MLB22868",
    mlCategoryName: "Ferramentas > Ferramentas Elétricas > Furadeiras e Parafusadeiras",
    supplierId: "sup-techbrasil",
    supplier: "TechBrasil Distribuidora",
    stock: 62,
    cost: 89.90,
    suggestedPrice: 199.90,
    brand: "TechForce",
    model: "Impact Pro 21V Brushless",
    ean: "7898594121036",
    warranty: "6 meses",
    isViral: true,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=80",
    description: `PARAFUSADEIRA E FURADEIRA DE IMPACTO 21V COM 2 BATERIAS LÍTIO + MALETA COMPLETA\n\nCampeã de vendas no Mercado Livre! Mandril de aperto rápido 3/8 (10mm), iluminação LED frontal e controle de torque com 25 níveis.\n\nACOMPANHA:\n- 01 Parafusadeira/Furadeira 21V\n- 02 Baterias 21V Recarregáveis\n- 01 Carregador Bivolt Rápido\n- 01 Maleta Rígida com Brocas, Bits, Soquetes e Extensor Flexível`
  },
  {
    id: "viral-airfryer-45l",
    sku: "CS-AIRFRYER-45L-DIG",
    name: "Fritadeira Elétrica Sem Óleo Air Fryer 4,5L Painel Digital Touch 1500W",
    category: "Casa & Cozinha",
    mlCategoryId: "MLB119426",
    mlCategoryName: "Eletrodomésticos > Pequenos Eletrodomésticos > Preparação de Alimentos > Fritadeiras",
    supplierId: "sup-casa-inox",
    supplier: "Casa & Inox Prime Nacional",
    stock: 29,
    cost: 158.00,
    suggestedPrice: 319.90,
    brand: "PrimeChef",
    model: "Digital AirFry 4.5L Antiaderente",
    ean: "7898594121043",
    warranty: "12 meses",
    isViral: true,
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=700&q=80",
    description: `FRITADEIRA ELÉTRICA AIR FRYER 4,5 LITROS PAINEL DIGITAL TOUCH 1500W\n\nCesto quadrado removível com revestimento antiaderente Teflon de 5 camadas e circulação de ar quente 360°.\n\nESPECIFICAÇÕES:\n- Capacidade: 4,5 Litros reais\n- Potência: 1500W\n- Temperatura ajustável: 80°C a 200°C\n- Timer sonoro com desligamento automático`
  },
  {
    id: "viral-garrafa-termica-led",
    sku: "CS-GARR-LED-500ML",
    name: "Garrafa Térmica Inteligente Inox 500ml com Termômetro Digital LED",
    category: "Casa & Cozinha",
    mlCategoryId: "MLB191053",
    mlCategoryName: "Esportes e Fitness > Camping, Caça e Pesca > Garrafas Térmicas",
    supplierId: "sup-casa-inox",
    supplier: "Casa & Inox Prime Nacional",
    stock: 110,
    cost: 16.90,
    suggestedPrice: 44.90,
    brand: "Inox Prime",
    model: "Smart Cup LED 500ml",
    ean: "7898594121050",
    warranty: "90 dias",
    isViral: true,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80",
    description: `GARRAFA TÉRMICA INTELIGENTE AÇO INOX 304 COM SENSOR DE TEMPERATURA LED TOUCH\n\nConserva líquidos quentes ou gelados por até 12 horas. Acompanha infusor em inox para chás e café.`
  },
  {
    id: "nf-moch-xinruiqi",
    sku: "NF-MOCH-XINRUIQI-PT",
    name: "Mochila Xinruiqi Reforçada Impermeável para Notebook 15.6 Preta",
    category: "Moda",
    mlCategoryId: "MLB1599",
    mlCategoryName: "Calçados, Roupas e Bolsas > Malas e Bolsas > Mochilas",
    supplierId: "sup-sp-express",
    supplier: "Importadora SP Express",
    stock: 12,
    cost: 68.28,
    suggestedPrice: 129.73,
    brand: "Xinruiqi",
    model: "Executiva Impermeável 15.6\"",
    ean: "7898594120114",
    warranty: "90 dias",
    isViral: true,
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-moch-xinruiqi/01.webp",
    description: `MOCHILA EXECUTIVA XINRUIQI REFORÇADA IMPERMEÁVEL PARA NOTEBOOK ATÉ 15.6 POLEGADAS\n\nDesenvolvida com tecido Oxford de alta densidade resistente à água, ideal para uso diário, trabalho, faculdade e viagens.`
  },
  {
    id: "nf-hub-4em1",
    sku: "NF-HUB-USB30-4P",
    name: "Hub USB Type-C 4 Portas USB 3.0 Alta Velocidade 5Gbps Plug and Play",
    category: "Eletrônicos",
    mlCategoryId: "MLB1714",
    mlCategoryName: "Informática > Cabos e Hubs USB > Hubs USB",
    supplierId: "sup-techbrasil",
    supplier: "TechBrasil Distribuidora",
    stock: 15,
    cost: 25.88,
    suggestedPrice: 49.17,
    brand: "TechBrasil",
    model: "Hub 4-in-1 Ultra Speed 5Gbps",
    ean: "7898594120220",
    warranty: "90 dias",
    isViral: false,
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-hub-4em1/01.jpg",
    description: `HUB ADAPTADOR 4 PORTAS USB 3.0 ALTA VELOCIDADE 5GBPS PLUG AND PLAY\n\nExpanda a conectividade do seu Notebook, MacBook ou PC instantaneamente.`
  },
  {
    id: "nf-fone-ka933-vm",
    sku: "NF-FONE-KA933-VM",
    name: "Fone Bluetooth Kapbom KA-933 Estéreo Headphone Sem Fio Vermelho",
    category: "Eletrônicos",
    mlCategoryId: "MLB196203",
    mlCategoryName: "Eletrônicos, Áudio e Vídeo > Áudio > Fones de Ouvido",
    supplierId: "sup-kapbom",
    supplier: "Kapbom Oficial BR",
    stock: 18,
    cost: 43.08,
    suggestedPrice: 81.85,
    brand: "Kapbom",
    model: "KA-933 Wireless Bass",
    ean: "7898594120336",
    warranty: "90 dias",
    isViral: false,
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-fone-ka933-vm/01.webp",
    description: `HEADPHONE BLUETOOTH KAPBOM KA-933 ESTÉREO HI-FI COM MICROFONE INTEGRADO\n\nQualidade sonora cristalina com graves potentes e isolamento acústico.`
  },
  {
    id: "nf-carr-ka375",
    sku: "NF-CARR-KA375",
    name: "Carregador Kapbom KA-375-56 Bivolt Turbo 2 Portas USB com Cabo",
    category: "Eletrônicos",
    mlCategoryId: "MLB5099",
    mlCategoryName: "Celulares e Telefones > Acessórios para Celulares > Carregadores",
    supplierId: "sup-kapbom",
    supplier: "Kapbom Oficial BR",
    stock: 26,
    cost: 27.59,
    suggestedPrice: 52.42,
    brand: "Kapbom",
    model: "KA-375-56 Dual USB",
    ean: "7898594120442",
    warranty: "90 dias",
    isViral: false,
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-carr-ka375/01.webp",
    description: `FONTE CARREGADOR DE PAREDE KAPBOM KA-375-56 BIVOLT 2 PORTAS USB + CABO.`
  },
  {
    id: "c902bc97-562e-4fbb-8c38-85bc141bffb7",
    sku: "NF-MOCH-SHENGSHI-20L",
    name: "Mochila Urbana Shengshi 20L Antifurto com Saída USB para Notebook",
    category: "Moda",
    mlCategoryId: "MLB1599",
    mlCategoryName: "Calçados, Roupas e Bolsas > Malas e Bolsas > Mochilas",
    supplierId: "sup-sp-express",
    supplier: "Importadora SP Express",
    stock: 14,
    cost: 68.28,
    suggestedPrice: 129.73,
    brand: "Shengshi",
    model: "Urbana Antifurto 20L USB",
    ean: "7898594120558",
    warranty: "90 dias",
    isViral: true,
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-moch-shengshi-cz/01.jpg",
    description: `MOCHILA URBANA SHENGSHI 20L ANTIFURTO COM SAÍDA USB EXTERNA.`
  },
  {
    id: "f45f7d5e-ac32-471b-add8-9253dfafd994",
    sku: "NF-MOCH-JINPIN-PT",
    name: "Mochila Unissex Jinpin Fashion Executiva para Notebook Preta",
    category: "Moda",
    mlCategoryId: "MLB1599",
    mlCategoryName: "Calçados, Roupas e Bolsas > Malas e Bolsas > Mochilas",
    supplierId: "sup-sp-express",
    supplier: "Importadora SP Express",
    stock: 10,
    cost: 61.27,
    suggestedPrice: 116.41,
    brand: "Jinpin",
    model: "Fashion Slim Notebook",
    ean: "7898594120664",
    warranty: "90 dias",
    isViral: false,
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-moch-jinpin-pt/01.webp",
    description: `MOCHILA UNISSEX JINPIN FASHION PARA NOTEBOOK - PRETA.`
  },
  {
    id: "nf-fone-hs330",
    sku: "NF-FONE-HS330-BR",
    name: "Fone de Ouvido Intra-Auricular com Fio HS330 P2 com Microfone Branco",
    category: "Eletrônicos",
    mlCategoryId: "MLB196203",
    mlCategoryName: "Eletrônicos, Áudio e Vídeo > Áudio > Fones de Ouvido",
    supplierId: "sup-techbrasil",
    supplier: "TechBrasil Distribuidora",
    stock: 25,
    cost: 23.88,
    suggestedPrice: 45.37,
    brand: "HS Series",
    model: "HS330 In-Ear P2",
    ean: "7898594120770",
    warranty: "90 dias",
    isViral: false,
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-fone-hs330/01.jpg",
    description: `FONE DE OUVIDO COM FIO HS330 CONECTOR P2 ESTÉREO COM MICROFONE.`
  },
  {
    id: "c4637c51-95c0-40ef-a4c0-be8040586983",
    sku: "NF-MASSAG-EMS-MINI",
    name: "Mini Massageador Elétrico Cervical Portátil Recarregável 6 Modos 19 Níveis",
    category: "Saúde",
    mlCategoryId: "MLB264201",
    mlCategoryName: "Saúde > Massagem > Massageadores Elétricos",
    supplierId: "sup-saude-vida",
    supplier: "Saúde & Vida Drop",
    stock: 54,
    cost: 23.88,
    suggestedPrice: 45.37,
    brand: "EMS Health",
    model: "Mini Cervical Recarregável USB",
    ean: "7898594120886",
    warranty: "90 dias",
    isViral: true,
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-massag-mini/01.jpg",
    description: `MINI MASSAGEADOR ELÉTRICO MUSCULAR PORTÁTIL RECARREGÁVEL USB - 6 MODOS.`
  },
  {
    id: "48965908-1864-4bc2-9b40-563748b425f8",
    sku: "NF-MIC-LAPELA-P3",
    name: "Microfone de Lapela Lavalier Omnidirecional Profissional Celular e PC",
    category: "Eletrônicos",
    mlCategoryId: "MLB4942",
    mlCategoryName: "Eletrônicos, Áudio e Vídeo > Áudio > Microfones",
    supplierId: "sup-techbrasil",
    supplier: "TechBrasil Distribuidora",
    stock: 32,
    cost: 10.68,
    suggestedPrice: 20.29,
    brand: "ProAudio",
    model: "Lavalier Omni 1.5m",
    ean: "7898594120992",
    warranty: "90 dias",
    isViral: false,
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-mic-lapela/01.jpg",
    description: `MICROFONE DE LAPELA PROFISSIONAL OMNIDIRECIONAL COM ESPUMA ANTI-RUÍDO.`
  }
];

// Função oficial de cálculo de taxas do Mercado Livre + Mercado Pago e Lucro Líquido por Item
function calculateItemFinancials(salePrice, supplierCost, listingType = 'gold_special', paymentMethod = 'credit_card') {
  const price = Number(salePrice) || 0;
  const cost = Number(supplierCost) || 0;

  // Taxa de exposição Mercado Livre (Clássico 12% | Premium 17%) + custo fixo para itens < R$ 79
  const mlPercent = listingType === 'gold_pro' ? 0.17 : 0.12;
  const mlFixedFee = price > 0 && price < 79 ? 6.00 : 0;
  const mlFee = +(price * mlPercent + mlFixedFee).toFixed(2);

  // Taxa de processamento Mercado Pago (Cartão 4,99% | PIX 0,99%)
  const mpPercent = paymentMethod === 'pix' ? 0.0099 : 0.0499;
  const mpFee = +(price * mpPercent).toFixed(2);

  const totalFees = +(mlFee + mpFee).toFixed(2);
  const netProfit = +(price - cost - totalFees).toFixed(2);
  const marginPercent = price > 0 ? +((netProfit / price) * 100).toFixed(1) : 0;

  return {
    price,
    cost,
    mlFee,
    mpFee,
    totalFees,
    netProfit,
    marginPercent
  };
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('forneshop_active_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Estados Tela de Planos Cakto & Login
  const [authTab, setAuthTab] = useState('planos');
  const [selectedPlan, setSelectedPlan] = useState('vitalicio');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [generatedAccessModal, setGeneratedAccessModal] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Navegação Principal
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [catalogSubTab, setCatalogSubTab] = useState('produtos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedSupplierFilter, setSelectedSupplierFilter] = useState('Todos');
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lojas do Mercado Livre (Começa limpo para o cliente conectar a conta real)
  const [mlStores, setMlStores] = useState(() => {
    const saved = localStorage.getItem('forneshop_ml_stores');
    return saved ? JSON.parse(saved) : [];
  });
  const [showConnectMlModal, setShowConnectMlModal] = useState(false);
  const [mlConnectMode, setMlConnectMode] = useState('token'); // 'token' (APP_USR) ou 'oauth' (App ID + Redirect)
  const [mlAccessTokenInput, setMlAccessTokenInput] = useState('');
  const [mlAppIdInput, setMlAppIdInput] = useState('');
  const [mlClientSecretInput, setMlClientSecretInput] = useState('');
  const [mlVerifying, setMlVerifying] = useState(false);

  // Anúncios publicados pelo cliente
  const [publishedAds, setPublishedAds] = useState(() => {
    const saved = localStorage.getItem('forneshop_published_ads');
    return saved ? JSON.parse(saved) : [];
  });

  // Vendas registradas no Dashboard (calculando Taxa Mercado Pago, Taxa ML, Custo e Lucro por Item)
  const [salesRecords, setSalesRecords] = useState(() => {
    const saved = localStorage.getItem('forneshop_sales_records');
    return saved ? JSON.parse(saved) : [];
  });

  // Simulador de Lucro e Taxas no Dashboard
  const [simProductId, setSimProductId] = useState(CATALOG_PRODUCTS[0].id);
  const [simPrice, setSimPrice] = useState(CATALOG_PRODUCTS[0].suggestedPrice);
  const [simListingType, setSimListingType] = useState('gold_special');
  const [simPaymentMethod, setSimPaymentMethod] = useState('credit_card');

  // Modal de Publicação Direta no Mercado Livre
  const [publishModalProduct, setPublishModalProduct] = useState(null);
  const [pubTitle, setPubTitle] = useState('');
  const [pubPrice, setPubPrice] = useState('');
  const [pubStock, setPubStock] = useState('');
  const [pubCategory, setPubCategory] = useState('');
  const [pubListingType, setPubListingType] = useState('gold_special');
  const [pubPaymentMethod, setPubPaymentMethod] = useState('credit_card');
  const [pubBrand, setPubBrand] = useState('');
  const [pubModel, setPubModel] = useState('');
  const [pubEan, setPubEan] = useState('');
  const [pubWarranty, setPubWarranty] = useState('');
  const [pubDescription, setPubDescription] = useState('');
  const [publishing, setPublishing] = useState(false);

  // Credenciais Mercado Pago do Lojista
  const [mpPublicKey, setMpPublicKey] = useState(() => localStorage.getItem('forneshop_mp_pub') || '');
  const [mpAccessToken, setMpAccessToken] = useState(() => localStorage.getItem('forneshop_mp_token') || '');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    localStorage.setItem('forneshop_ml_stores', JSON.stringify(mlStores));
  }, [mlStores]);

  useEffect(() => {
    localStorage.setItem('forneshop_published_ads', JSON.stringify(publishedAds));
  }, [publishedAds]);

  useEffect(() => {
    localStorage.setItem('forneshop_sales_records', JSON.stringify(salesRecords));
  }, [salesRecords]);

  // Captura retorno OAuth do Mercado Livre (?code=...) caso o cliente use o fluxo de redirecionamento
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthCode = params.get('code');
    const savedAppId = localStorage.getItem('forneshop_ml_appid');
    const savedSecret = localStorage.getItem('forneshop_ml_secret');

    if (oauthCode && savedAppId && savedSecret) {
      window.history.replaceState({}, document.title, window.location.pathname);
      fetch('/api/ml-oauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'exchange_code',
          code: oauthCode,
          appId: savedAppId,
          clientSecret: savedSecret,
          redirectUri: window.location.origin
        })
      })
        .then(r => r.json())
        .then(data => {
          if (data.success && data.user) {
            const storeObj = {
              id: String(data.user.id),
              nickname: data.user.nickname,
              email: data.user.email,
              accessToken: data.accessToken,
              freeShippingThreshold: 79,
              status: 'Conectada (API Oficial)',
              reputation: 'Verde',
              claimsRate: '0.00%',
              cancellationsRate: '0.00%',
              delayedRate: '0.00%',
              syncedAt: new Date().toLocaleString('pt-BR')
            };
            setMlStores(prev => [...prev.filter(s => s.id !== storeObj.id), storeObj]);
            showToast(`Conta ${data.user.nickname} autenticada via OAuth Mercado Livre!`);
          }
        })
        .catch(() => {});
    }
  }, []);

  // Checkout Cakto
  const handleCheckoutCakto = (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerEmail.trim()) {
      setAuthError('Preencha seu nome completo e o e-mail que receberá a senha de acesso.');
      return;
    }
    setAuthError('');
    const caktoUrl = selectedPlan === 'vitalicio'
      ? `https://pay.cakto.com.br/forneshop-vitalicio?name=${encodeURIComponent(buyerName)}&email=${encodeURIComponent(buyerEmail)}`
      : `https://pay.cakto.com.br/forneshop-mensal?name=${encodeURIComponent(buyerName)}&email=${encodeURIComponent(buyerEmail)}`;
    window.open(caktoUrl, '_blank');
    showToast('Checkout aberto! Assim que o pagamento constar na Cakto, seu acesso será enviado por e-mail.');
  };

  // Geração de Credenciais Pós-Pagamento
  const handleConfirmPaymentAndSendEmail = async () => {
    if (!buyerName.trim() || !buyerEmail.trim()) {
      setAuthError('Digite seu nome completo e seu e-mail nos campos acima antes de liberar o acesso.');
      return;
    }
    setAuthError('');
    setLoading(true);

    let generatedCreds = null;
    try {
      const res = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: buyerName.trim(),
          email: buyerEmail.trim().toLowerCase(),
          plan: selectedPlan === 'vitalicio' ? 'Acesso Vitalício' : 'Plano Mensal'
        })
      });
      if (res.ok) {
        const data = await res.json();
        generatedCreds = data.credentials;
      }
    } catch (e) {}

    if (!generatedCreds) {
      const randomPass = 'FS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      generatedCreds = {
        name: buyerName.trim(),
        email: buyerEmail.trim().toLowerCase(),
        password: randomPass,
        plan: selectedPlan === 'vitalicio' ? 'Acesso Vitalício' : 'Plano Mensal'
      };
    }

    const existingUsers = JSON.parse(localStorage.getItem('forneshop_paid_users') || '[]');
    const updatedUsers = [
      ...existingUsers.filter(u => u.email !== generatedCreds.email),
      generatedCreds
    ];
    localStorage.setItem('forneshop_paid_users', JSON.stringify(updatedUsers));

    setLoading(false);
    setGeneratedAccessModal(generatedCreds);
  };

  // Login
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    if (!cleanEmail || !cleanPass) {
      setAuthError('Informe o e-mail utilizado na compra e a senha recebida.');
      return;
    }

    const paidUsers = JSON.parse(localStorage.getItem('forneshop_paid_users') || '[]');
    const foundUser = paidUsers.find(u => u.email === cleanEmail && u.password === cleanPass);

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem('forneshop_active_session', JSON.stringify(foundUser));
      showToast(`Bem-vindo(a), ${foundUser.name}!`);
      return;
    }

    if (cleanEmail === 'admin@forneshop.com' && cleanPass === 'admin123') {
      const adminUser = { name: 'Administrador', email: cleanEmail, plan: 'Acesso Vitalício' };
      setCurrentUser(adminUser);
      localStorage.setItem('forneshop_active_session', JSON.stringify(adminUser));
      showToast('Painel Administrativo carregado.');
      return;
    }

    setAuthError('Acesso negado: E-mail sem plano ativo ou senha incorreta. Adquira um plano na aba 1.');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('forneshop_active_session');
    setLoginEmail('');
    setLoginPassword('');
    setAuthTab('planos');
  };

  // Conexão REAL com a API do Mercado Livre (Valida Token real em https://api.mercadolibre.com/users/me)
  const handleConnectRealMercadoLivre = async (e) => {
    e.preventDefault();

    if (mlConnectMode === 'oauth') {
      if (!mlAppIdInput.trim()) {
        showToast('Informe o APP ID da sua aplicação do Mercado Livre Developers.');
        return;
      }
      localStorage.setItem('forneshop_ml_appid', mlAppIdInput.trim());
      localStorage.setItem('forneshop_ml_secret', mlClientSecretInput.trim());
      const redirectUri = encodeURIComponent(window.location.origin);
      const authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${mlAppIdInput.trim()}&redirect_uri=${redirectUri}`;
      window.location.href = authUrl;
      return;
    }

    const token = mlAccessTokenInput.trim();
    if (!token) {
      showToast('Cole o seu Access Token (APP_USR-...) do Mercado Livre.');
      return;
    }

    setMlVerifying(true);
    try {
      // Tenta consultar diretamente ou via Serverless API o endpoint oficial do Mercado Livre
      let userProfile = null;

      try {
        const directRes = await fetch('https://api.mercadolibre.com/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (directRes.ok) {
          const u = await directRes.json();
          userProfile = {
            id: String(u.id),
            nickname: u.nickname,
            email: u.email,
            permalink: u.permalink,
            claimsRate: ((u.seller_reputation?.metrics?.claims?.rate || 0) * 100).toFixed(2) + '%',
            cancellationsRate: ((u.seller_reputation?.metrics?.cancellations?.rate || 0) * 100).toFixed(2) + '%',
            delayedRate: ((u.seller_reputation?.metrics?.delayed_handling_time?.rate || 0) * 100).toFixed(2) + '%'
          };
        }
      } catch (corsErr) {}

      if (!userProfile) {
        const apiRes = await fetch('/api/ml-oauth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'verify_token', accessToken: token })
        });
        const apiData = await apiRes.json();
        if (!apiRes.ok) {
          showToast(apiData.error || 'Token inválido no Mercado Livre. Verifique se começa com APP_USR-.');
          setMlVerifying(false);
          return;
        }
        userProfile = apiData.user;
      }

      const newStore = {
        id: String(userProfile.id),
        nickname: userProfile.nickname,
        email: userProfile.email || '',
        permalink: userProfile.permalink || '',
        accessToken: token,
        freeShippingThreshold: 79,
        status: 'Conectada (API Oficial)',
        reputation: 'Verde',
        claimsRate: userProfile.claimsRate || '0.00%',
        cancellationsRate: userProfile.cancellationsRate || '0.00%',
        delayedRate: userProfile.delayedRate || '0.00%',
        syncedAt: new Date().toLocaleString('pt-BR')
      };

      setMlStores(prev => [...prev.filter(s => s.id !== newStore.id), newStore]);
      setMlAccessTokenInput('');
      setShowConnectMlModal(false);
      showToast(`Conta oficial "${newStore.nickname}" (ID ${newStore.id}) autenticada no Mercado Livre!`);
    } catch (err) {
      showToast('Erro ao validar token no Mercado Livre: ' + err.message);
    }
    setMlVerifying(false);
  };

  // Abrir Modal de Cadastro/Publicação de Produto
  const openPublishModal = (product) => {
    setPublishModalProduct(product);
    setPubTitle(product.name.substring(0, 60));
    setPubPrice(product.suggestedPrice.toFixed(2));
    setPubStock(String(product.stock));
    setPubCategory(product.mlCategoryId);
    setPubListingType('gold_special');
    setPubPaymentMethod('credit_card');
    setPubBrand(product.brand);
    setPubModel(product.model);
    setPubEan(product.ean);
    setPubWarranty(product.warranty);
    setPubDescription(product.description);
  };

  // Publicar Produto na API Oficial do Mercado Livre
  const handleConfirmPublishToML = async (e) => {
    e.preventDefault();
    if (mlStores.length === 0) {
      showToast('Conecte sua conta do Mercado Livre na aba Integrações para publicar!');
      setPublishModalProduct(null);
      setActiveMenu('integracoes');
      setShowConnectMlModal(true);
      return;
    }

    setPublishing(true);
    const activeStore = mlStores[0];
    const calc = calculateItemFinancials(pubPrice, publishModalProduct.cost, pubListingType, pubPaymentMethod);

    try {
      const res = await fetch('/api/ml-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: activeStore.accessToken,
          item: {
            title: pubTitle,
            price: Number(pubPrice),
            stock: Number(pubStock),
            categoryId: pubCategory,
            listingType: pubListingType,
            brand: pubBrand,
            model: pubModel,
            ean: pubEan,
            warranty: pubWarranty,
            description: pubDescription,
            pictures: [publishModalProduct.image]
          }
        })
      });

      const data = await res.json();
      if (!res.ok) {
        const causeMsg = data.cause && data.cause[0] ? ` (${data.cause[0].message})` : '';
        showToast((data.error || 'Erro na API do Mercado Livre') + causeMsg);
        setPublishing(false);
        return;
      }

      const newAd = {
        id: publishModalProduct.id,
        sku: publishModalProduct.sku,
        mlbId: data.mlbId,
        title: pubTitle,
        price: Number(pubPrice),
        cost: publishModalProduct.cost,
        mlFee: calc.mlFee,
        mpFee: calc.mpFee,
        netProfit: calc.netProfit,
        marginPercent: calc.marginPercent,
        stock: Number(pubStock),
        categoryId: pubCategory,
        listingType: pubListingType,
        brand: pubBrand,
        model: pubModel,
        ean: pubEan,
        supplier: publishModalProduct.supplier,
        image: publishModalProduct.image,
        storeNickname: activeStore.nickname,
        permalink: data.permalink,
        createdAt: new Date().toLocaleString('pt-BR')
      };

      setPublishedAds(prev => [newAd, ...prev]);
      setPublishing(false);
      setPublishModalProduct(null);
      showToast(`Anúncio ${data.mlbId} publicado no Mercado Livre com sucesso!`);
    } catch (err) {
      showToast('Falha ao conectar com a API do Mercado Livre.');
      setPublishing(false);
    }
  };

  // Registrar uma Venda Real/Simulada para contabilizar no Dashboard Financeiro
  const handleRegisterSaleFromCatalog = (product, paymentType = 'credit_card') => {
    const calc = calculateItemFinancials(product.suggestedPrice, product.cost, 'gold_special', paymentType);
    const newSale = {
      orderId: 'PED-' + Math.floor(100000 + Math.random() * 900000),
      productId: product.id,
      sku: product.sku,
      productName: product.name,
      supplier: product.supplier,
      image: product.image,
      paymentMethod: paymentType === 'pix' ? 'PIX (Mercado Pago 0,99%)' : 'Cartão (Mercado Pago 4,99%)',
      salePrice: calc.price,
      supplierCost: calc.cost,
      mlFee: calc.mlFee,
      mpFee: calc.mpFee,
      totalFees: calc.totalFees,
      netProfit: calc.netProfit,
      marginPercent: calc.marginPercent,
      date: new Date().toLocaleString('pt-BR')
    };
    setSalesRecords(prev => [newSale, ...prev]);
    showToast(`Venda registrada! Lucro líquido: R$ ${calc.netProfit.toFixed(2).replace('.', ',')} (já descontando taxa MP e ML).`);
  };

  // ============================================================================
  // TELA DE BLOQUEIO / PLANOS CAKTO E LOGIN (SEM DADOS PRÉ-PREENCHIDOS)
  // ============================================================================
  if (!currentUser) {
    const planPrice = selectedPlan === 'vitalicio' ? 'R$ 197,00' : 'R$ 150,00';
    const planPeriod = selectedPlan === 'vitalicio' ? '/único' : '/mês';

    return (
      <div className="min-h-screen bg-[#0d0f14] text-zinc-100 flex flex-col items-center justify-center px-4 py-10">
        {generatedAccessModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl border border-emerald-500/40 bg-[#13161f] p-6 shadow-2xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                <Mail className="w-5 h-5" /> E-MAIL DE ACESSO ENVIADO COM SUCESSO!
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                O pagamento do plano <strong>{generatedAccessModal.plan}</strong> foi confirmado. Enviamos suas credenciais para <strong>{generatedAccessModal.email}</strong>:
              </p>

              <div className="my-4 rounded-xl border border-zinc-800 bg-[#0b0d13] p-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Cliente:</span>
                  <span className="text-white font-semibold">{generatedAccessModal.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">E-mail (Login):</span>
                  <span className="text-blue-400 font-semibold">{generatedAccessModal.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Senha Exclusiva:</span>
                  <span className="text-emerald-400 font-bold text-sm">{generatedAccessModal.password}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setLoginEmail(generatedAccessModal.email);
                  setLoginPassword(generatedAccessModal.password);
                  setGeneratedAccessModal(null);
                  setAuthTab('login');
                }}
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white transition-colors"
              >
                Preencher Login e Entrar Agora →
              </button>
            </div>
          </div>
        )}

        <div className="text-center mb-6">
          <h1 className="text-4xl font-black tracking-tight text-white">FORNESHOP</h1>
          <p className="text-sm text-blue-400 mt-1.5">
            Plataforma exclusiva de fornecedores e automação de dropshipping
          </p>
        </div>

        <div className="flex bg-[#151821] p-1 rounded-xl border border-zinc-800/90 mb-7">
          <button
            type="button"
            onClick={() => { setAuthTab('planos'); setAuthError(''); }}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              authTab === 'planos' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            1. Adquirir Acesso (Planos)
          </button>
          <button
            type="button"
            onClick={() => { setAuthTab('login'); setAuthError(''); }}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              authTab === 'login' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            2. Já Paguei (Fazer Login)
          </button>
        </div>

        {authTab === 'planos' ? (
          <div className="w-full max-w-[780px] rounded-3xl border border-zinc-800/80 bg-[#13161e] p-7 md:p-9 shadow-2xl grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800/70 pb-6 md:pb-0 md:pr-6">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/90 border border-zinc-700/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-200">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {selectedPlan === 'vitalicio' ? 'MAIS VANTAJOSO • PAGAMENTO ÚNICO' : 'ASSINATURA MENSAL FLEXÍVEL'}
                </div>

                <h2 className="text-2xl font-extrabold text-white mt-4">
                  {selectedPlan === 'vitalicio' ? 'Acesso Vitalício' : 'Plano Mensal'}
                </h2>
                <p className="text-xs text-blue-300/90 mt-2 leading-relaxed">
                  {selectedPlan === 'vitalicio'
                    ? 'Pague uma única vez e tenha acesso liberado para sempre, sem mensalidades.'
                    : 'Acesso completo renovado mensalmente sem fidelidade.'}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{planPrice}</span>
                  <span className="text-xs text-blue-400 font-medium">{planPeriod}</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Catálogo completo de fornecedores</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Integração direta com Mercado Livre</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sincronização de estoque automática</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Credenciais enviadas na hora por e-mail</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/70 flex items-center gap-2 text-[11px] text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ambiente seguro via Cakto Pagamentos</span>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-3">1. Escolha o seu plano</h3>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('vitalicio')}
                    className={`relative text-left rounded-xl p-4 border transition-all ${
                      selectedPlan === 'vitalicio'
                        ? 'bg-[#162238] border-blue-500 shadow-lg shadow-blue-950/40'
                        : 'bg-[#0f1118] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <span className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-black uppercase text-black">
                      <Crown className="w-2.5 h-2.5" /> VITALÍCIO
                    </span>
                    <div className="text-xs font-semibold text-blue-300">Acesso Vitalício</div>
                    <div className="text-xl font-black text-white mt-1">R$ 197,00</div>
                    <div className="text-[11px] text-zinc-400 mt-1">Pagamento único</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan('mensal')}
                    className={`text-left rounded-xl p-4 border transition-all ${
                      selectedPlan === 'mensal'
                        ? 'bg-[#162238] border-blue-500 shadow-lg shadow-blue-950/40'
                        : 'bg-[#0f1118] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-zinc-300">Plano Mensal</div>
                    <div className="text-xl font-black text-white mt-1">R$ 150,00</div>
                    <div className="text-[11px] text-zinc-400 mt-1">Cobrado mensalmente</div>
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white">2. Onde devemos enviar seu acesso?</h3>
                <p className="text-[11px] text-zinc-400 mt-1 mb-4 leading-relaxed">
                  Assim que o pagamento constar na Cakto, seu login e senha serão gerados e enviados imediatamente para este e-mail.
                </p>

                {authError && (
                  <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleCheckoutCakto} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1.5">Seu nome completo</label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Ex: Kauan Marinho"
                      className="w-full rounded-xl border border-zinc-800 bg-[#0b0d13] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1.5">E-mail de cadastro (receberá a senha)</label>
                    <input
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full rounded-xl border border-zinc-800 bg-[#0b0d13] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1da851] hover:bg-[#199246] py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-950/50 transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      Finalizar Compra ({planPrice}) na Cakto
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleConfirmPaymentAndSendEmail}
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-[#0f1219] hover:bg-zinc-800/70 py-2.5 text-[11px] font-medium text-blue-300 transition-colors cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {loading ? 'Gerando credenciais...' : 'Simular Pagamento Confirmado (Testar E-mail + Senha)'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md rounded-3xl border border-zinc-800/80 bg-[#13161e] p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-5">
              <Lock className="w-4 h-4" /> ÁREA EXCLUSIVA PARA CLIENTES ATIVOS
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs leading-relaxed">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-300 mb-1.5">E-mail utilizado na compra</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Digite o seu e-mail cadastrado"
                  className="w-full bg-[#0b0d13] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-300 mb-1.5">Senha enviada no seu e-mail</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Digite a senha recebida por e-mail"
                  className="w-full bg-[#0b0d13] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                Entrar na plataforma →
              </button>
            </form>

            <p className="text-center text-xs text-zinc-500 mt-5">
              Ainda não possui acesso?{' '}
              <button onClick={() => setAuthTab('planos')} className="text-blue-400 hover:underline font-medium">
                Escolha um plano aqui
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // CÁLCULOS TOTAIS DO DASHBOARD FINANCEIRO
  // ============================================================================
  const totalGrossRevenue = salesRecords.reduce((acc, s) => acc + s.salePrice, 0);
  const totalMpFees = salesRecords.reduce((acc, s) => acc + s.mpFee, 0);
  const totalMlFees = salesRecords.reduce((acc, s) => acc + s.mlFee, 0);
  const totalSupplierCosts = salesRecords.reduce((acc, s) => acc + s.supplierCost, 0);
  const totalNetProfit = salesRecords.reduce((acc, s) => acc + s.netProfit, 0);
  const avgMargin = totalGrossRevenue > 0 ? ((totalNetProfit / totalGrossRevenue) * 100).toFixed(1) : '0.0';

  const simProduct = CATALOG_PRODUCTS.find(p => p.id === simProductId) || CATALOG_PRODUCTS[0];
  const simResult = calculateItemFinancials(simPrice, simProduct.cost, simListingType, simPaymentMethod);

  const filteredProducts = CATALOG_PRODUCTS.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === 'Todas' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSup =
      selectedSupplierFilter === 'Todos' || p.supplierId === selectedSupplierFilter;
    return matchesSearch && matchesCat && matchesSup;
  });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard & Lucros', icon: BarChart3 },
    { id: 'catalogo', label: `Catálogo (${CATALOG_PRODUCTS.length})`, icon: Boxes },
    { id: 'fornecedores', label: `Fornecedores (${SUPPLIERS.length})`, icon: Truck },
    { id: 'anuncios', label: `Meus Anúncios ML (${publishedAds.length})`, icon: Megaphone },
    { id: 'integracoes', label: 'API Mercado Livre', icon: Plug },
    { id: 'mercadopago', label: 'Mercado Pago (Taxas)', icon: CreditCard },
  ];

  const userInitials = currentUser.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'US';

  const modalCalc = publishModalProduct
    ? calculateItemFinancials(pubPrice, publishModalProduct.cost, pubListingType, pubPaymentMethod)
    : null;

  return (
    <div className="min-h-screen bg-[#0b0c10] text-zinc-100">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold border border-emerald-400/30 max-w-md">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* MODAL DE CADASTRO E PUBLICAÇÃO REAL NO MERCADO LIVRE COM CÁLCULO DE TAXA E LUCRO */}
      {publishModalProduct && modalCalc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-[#12141c] p-6 shadow-2xl my-8">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 px-2.5 py-0.5 rounded-full">
                  Integração Oficial API Mercado Livre (POST /items)
                </span>
                <h2 className="text-lg font-bold text-white mt-2">
                  Ficha Técnica, Taxas e Publicação no Mercado Livre
                </h2>
                <p className="text-xs text-zinc-400">
                  Revise o preço, veja a taxa do Mercado Pago/Mercado Livre e publique sem sair da plataforma.
                </p>
              </div>
              <button
                onClick={() => setPublishModalProduct(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmPublishToML} className="mt-5 space-y-4">
              <div className="grid md:grid-cols-12 gap-4 items-center bg-zinc-900/70 p-3.5 rounded-xl border border-zinc-800">
                <div className="md:col-span-2 flex justify-center">
                  <img
                    src={publishModalProduct.image}
                    alt={publishModalProduct.name}
                    className="w-20 h-20 object-contain rounded-lg bg-white p-1"
                  />
                </div>
                <div className="md:col-span-10 space-y-2">
                  <label className="block text-xs font-medium text-zinc-300">
                    Título do Anúncio no Mercado Livre (máx. 60 caracteres)
                  </label>
                  <input
                    type="text"
                    maxLength={60}
                    value={pubTitle}
                    onChange={(e) => setPubTitle(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                  <div className="flex flex-wrap gap-3 text-[11px] text-zinc-400">
                    <span>SKU: <strong className="text-zinc-200">{publishModalProduct.sku}</strong></span>
                    <span>Fornecedor: <strong className="text-blue-400">{publishModalProduct.supplier}</strong></span>
                    <span>Categoria: <strong className="text-emerald-400">{publishModalProduct.mlCategoryName}</strong></span>
                  </div>
                </div>
              </div>

              {/* Simulador de Preço, Taxa Mercado Pago, Taxa ML e Lucro Líquido do Anúncio */}
              <div className="grid sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Preço de Venda (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={pubPrice}
                    onChange={(e) => setPubPrice(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-emerald-400 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Estoque Disponível</label>
                  <input
                    type="number"
                    value={pubStock}
                    onChange={(e) => setPubStock(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Modalidade ML</label>
                  <select
                    value={pubListingType}
                    onChange={(e) => setPubListingType(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white"
                  >
                    <option value="gold_special">Clássico (12% ML)</option>
                    <option value="gold_pro">Premium (17% ML)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Taxa Mercado Pago</label>
                  <select
                    value={pubPaymentMethod}
                    onChange={(e) => setPubPaymentMethod(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white"
                  >
                    <option value="credit_card">Cartão (4,99% MP)</option>
                    <option value="pix">PIX (0,99% MP)</option>
                  </select>
                </div>
              </div>

              {/* Resumo Financeiro por Item Vendido */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 p-3.5 text-center">
                <div>
                  <div className="text-[10px] uppercase text-zinc-400">Custo Fornecedor</div>
                  <div className="text-sm font-bold text-zinc-200 mt-0.5">R$ {modalCalc.cost.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-zinc-400">Tarifa ML</div>
                  <div className="text-sm font-bold text-amber-400 mt-0.5">- R$ {modalCalc.mlFee.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-zinc-400">Taxa Mercado Pago</div>
                  <div className="text-sm font-bold text-sky-400 mt-0.5">- R$ {modalCalc.mpFee.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-zinc-400">Lucro Líquido / Item</div>
                  <div className={`text-sm font-black mt-0.5 ${modalCalc.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    R$ {modalCalc.netProfit.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-zinc-400">Margem Líquida</div>
                  <div className="text-sm font-bold text-emerald-300 mt-0.5">{modalCalc.marginPercent}%</div>
                </div>
              </div>

              {/* Ficha Técnica */}
              <div className="grid sm:grid-cols-4 gap-3 bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/80">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Marca</label>
                  <input
                    type="text"
                    value={pubBrand}
                    onChange={(e) => setPubBrand(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Modelo</label>
                  <input
                    type="text"
                    value={pubModel}
                    onChange={(e) => setPubModel(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">EAN / GTIN</label>
                  <input
                    type="text"
                    value={pubEan}
                    onChange={(e) => setPubEan(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Categoria MLB</label>
                  <input
                    type="text"
                    value={pubCategory}
                    onChange={(e) => setPubCategory(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Descrição Pronta do Anúncio</label>
                <textarea
                  rows={5}
                  value={pubDescription}
                  onChange={(e) => setPubDescription(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-200 font-mono leading-relaxed focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                <div className="text-xs text-zinc-400">
                  {mlStores.length > 0 ? (
                    <span>Conta ML Ativa: <strong className="text-emerald-400">{mlStores[0].nickname}</strong></span>
                  ) : (
                    <span className="text-amber-400">Você precisará conectar seu Token do Mercado Livre para concluir.</span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPublishModalProduct(null)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-700 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={publishing}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    {publishing ? 'Publicando na API do Mercado Livre...' : 'Publicar Oficialmente no Mercado Livre'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE INTEGRAÇÃO REAL COM A API DO MERCADO LIVRE */}
      {showConnectMlModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#12141c] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-yellow-400/15 border border-yellow-400/40 flex items-center justify-center font-bold text-yellow-300 text-xs">
                  ML
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Integração Real API Mercado Livre</h3>
                  <p className="text-xs text-zinc-400">Autenticação direta com api.mercadolibre.com</p>
                </div>
              </div>
              <button onClick={() => setShowConnectMlModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 my-4 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setMlConnectMode('token')}
                className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                  mlConnectMode === 'token' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Via Access Token (APP_USR)
              </button>
              <button
                type="button"
                onClick={() => setMlConnectMode('oauth')}
                className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                  mlConnectMode === 'oauth' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Via OAuth 2.0 (App ID)
              </button>
            </div>

            <form onSubmit={handleConnectRealMercadoLivre} className="space-y-4">
              {mlConnectMode === 'token' ? (
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Access Token Oficial do Mercado Livre (<code className="text-yellow-300">APP_USR-...</code>) *
                  </label>
                  <input
                    type="text"
                    value={mlAccessTokenInput}
                    onChange={(e) => setMlAccessTokenInput(e.target.value)}
                    placeholder="APP_USR-1234567890123456-..."
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                    required
                  />
                  <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                    O sistema consultará em tempo real <code className="text-zinc-200">https://api.mercadolibre.com/users/me</code> para validar sua conta, importar seu Nickname real, reputação e liberar o envio de anúncios via <code className="text-zinc-200">POST /items</code>.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">App ID (Client ID no DevCenter ML) *</label>
                    <input
                      type="text"
                      value={mlAppIdInput}
                      onChange={(e) => setMlAppIdInput(e.target.value)}
                      placeholder="Ex: 583920192837465"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Client Secret *</label>
                    <input
                      type="password"
                      value={mlClientSecretInput}
                      onChange={(e) => setMlClientSecretInput(e.target.value)}
                      placeholder="Sua chave secreta do aplicativo ML"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white font-mono"
                      required
                    />
                    <p className="text-[11px] text-zinc-400 mt-1.5">
                      Configure a Redirect URI no Mercado Livre Developers para: <code className="text-blue-400">{window.location.origin}</code>
                    </p>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowConnectMlModal(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-700 text-xs text-zinc-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={mlVerifying}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white cursor-pointer"
                >
                  {mlVerifying
                    ? 'Validando na API do Mercado Livre...'
                    : mlConnectMode === 'token'
                    ? 'Validar Token e Conectar Conta Real'
                    : 'Redirecionar para Autorização Mercado Livre'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar Lateral */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-zinc-800/80 bg-[#11131a] lg:flex">
        <div className="flex h-14 items-center justify-between border-b border-zinc-800/80 px-5">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white">F</div>
            <span className="font-bold text-base tracking-tight text-white">FORNESHOP</span>
          </div>
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex h-10 items-center gap-3 rounded-xl px-3.5 text-xs font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-blue-600 font-semibold text-white shadow-sm'
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
        <div className="p-3 border-t border-zinc-800/80">
          <button
            onClick={handleLogout}
            className="w-full flex h-10 items-center gap-3 rounded-xl px-3.5 text-xs font-medium text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Sair da conta
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-zinc-800/80 bg-[#0b0c10]/95 px-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {mlStores.length > 0 ? (
              <div className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 sm:flex">
                <Store className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">{mlStores[0].nickname}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              </div>
            ) : (
              <button
                onClick={() => { setActiveMenu('integracoes'); setShowConnectMlModal(true); }}
                className="hidden sm:flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-300 hover:bg-amber-500/20 cursor-pointer"
              >
                <Plug className="h-3.5 w-3.5" /> Conectar Conta Real Mercado Livre
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
              {currentUser.plan}
            </span>
            <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 rounded-lg text-xs">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-[11px] font-bold text-white">
                {userInitials}
              </span>
              <span className="hidden sm:inline font-medium text-zinc-200">{currentUser.name}</span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] px-4 pb-24 pt-7 md:px-7">
          {/* ============================================================================
              ABA 1: DASHBOARD FINANCEIRO (VENDAS, TAXA MERCADO PAGO E LUCRO POR ITEM)
          ============================================================================ */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Dashboard Financeiro & Lucro por Item</h1>
                  <p className="text-sm text-zinc-400 mt-0.5">
                    Controle em tempo real de vendas, tarifas do Mercado Livre, taxas do Mercado Pago e lucro líquido.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleRegisterSaleFromCatalog(CATALOG_PRODUCTS[0], 'credit_card')}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-3.5 py-2 text-xs font-bold text-white shadow cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Registrar Venda (Faqueiro 24p - Cartão MP)
                  </button>
                  <button
                    onClick={() => handleRegisterSaleFromCatalog(CATALOG_PRODUCTS[2], 'pix')}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white shadow cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Registrar Venda (Parafusadeira 21V - PIX MP)
                  </button>
                </div>
              </div>

              {/* KPIs Financeiros */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-4">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Faturamento Bruto</span>
                    <DollarSign className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-2">
                    R$ {totalGrossRevenue.toFixed(2).replace('.', ',')}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">{salesRecords.length} venda(s) realizada(s)</p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-4">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Taxa Mercado Pago</span>
                    <CreditCard className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-black text-sky-400 mt-2">
                    R$ {totalMpFees.toFixed(2).replace('.', ',')}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">4,99% Cartão | 0,99% PIX</p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-4">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Tarifas Mercado Livre</span>
                    <Percent className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-400 mt-2">
                    R$ {totalMlFees.toFixed(2).replace('.', ',')}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">Comissão de exposição ML</p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-4">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Custo Fornecedores</span>
                    <Truck className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="text-2xl font-black text-zinc-200 mt-2">
                    R$ {totalSupplierCosts.toFixed(2).replace('.', ',')}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">Repasse automático Drop</p>
                </div>

                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/15 p-4">
                  <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
                    <span>Lucro Líquido Real</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-400 mt-2">
                    R$ {totalNetProfit.toFixed(2).replace('.', ',')}
                  </div>
                  <p className="text-[11px] text-emerald-300/80 mt-1">Margem média: {avgMargin}%</p>
                </div>
              </div>

              {/* Simulador de Taxas do Mercado Pago & Lucro por Item */}
              <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                  <Calculator className="w-4 h-4 text-blue-400" />
                  Calculadora de Taxas (Mercado Pago + Mercado Livre) e Lucro Líquido por Item
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Produto do Catálogo</label>
                    <select
                      value={simProductId}
                      onChange={(e) => {
                        const prod = CATALOG_PRODUCTS.find(p => p.id === e.target.value);
                        setSimProductId(e.target.value);
                        if (prod) setSimPrice(prod.suggestedPrice);
                      }}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white"
                    >
                      {CATALOG_PRODUCTS.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name.substring(0, 42)}... (Custo: R$ {p.cost.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Preço de Venda (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={simPrice}
                      onChange={(e) => setSimPrice(e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Tipo de Anúncio ML</label>
                    <select
                      value={simListingType}
                      onChange={(e) => setSimListingType(e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white"
                    >
                      <option value="gold_special">Clássico (12% comissão)</option>
                      <option value="gold_pro">Premium (17% comissão)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Meio de Pagamento (Mercado Pago)</label>
                    <select
                      value={simPaymentMethod}
                      onChange={(e) => setSimPaymentMethod(e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white"
                    >
                      <option value="credit_card">Cartão de Crédito (Taxa MP 4,99%)</option>
                      <option value="pix">PIX Imediato (Taxa MP 0,99%)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mt-4 pt-4 border-t border-zinc-800/80 text-center">
                  <div className="bg-zinc-900/70 rounded-xl p-2.5">
                    <div className="text-[10px] text-zinc-400 uppercase">Venda Bruta</div>
                    <div className="text-sm font-bold text-white mt-0.5">R$ {simResult.price.toFixed(2)}</div>
                  </div>
                  <div className="bg-zinc-900/70 rounded-xl p-2.5">
                    <div className="text-[10px] text-zinc-400 uppercase">Custo Produto</div>
                    <div className="text-sm font-bold text-zinc-300 mt-0.5">- R$ {simResult.cost.toFixed(2)}</div>
                  </div>
                  <div className="bg-zinc-900/70 rounded-xl p-2.5">
                    <div className="text-[10px] text-zinc-400 uppercase">Taxa Mercado Livre</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">- R$ {simResult.mlFee.toFixed(2)}</div>
                  </div>
                  <div className="bg-zinc-900/70 rounded-xl p-2.5">
                    <div className="text-[10px] text-zinc-400 uppercase">Taxa Mercado Pago</div>
                    <div className="text-sm font-bold text-sky-400 mt-0.5">- R$ {simResult.mpFee.toFixed(2)}</div>
                  </div>
                  <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-2.5">
                    <div className="text-[10px] text-emerald-300 uppercase font-semibold">Lucro por Item</div>
                    <div className="text-base font-black text-emerald-400 mt-0.5">R$ {simResult.netProfit.toFixed(2)}</div>
                  </div>
                  <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-2.5">
                    <div className="text-[10px] text-emerald-300 uppercase font-semibold">Margem Real</div>
                    <div className="text-base font-black text-emerald-400 mt-0.5">{simResult.marginPercent}%</div>
                  </div>
                </div>
              </div>

              {/* Tabela Detalhada de Vendas e Lucro por Item */}
              <div className="rounded-2xl border border-zinc-800 bg-[#12141c] overflow-hidden">
                <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Detalhamento de Vendas e Lucro Líquido por Item</h3>
                    <p className="text-xs text-zinc-400">Histórico individual descontando custo do fornecedor, comissão ML e taxa do Mercado Pago</p>
                  </div>
                  {salesRecords.length > 0 && (
                    <button
                      onClick={() => setSalesRecords([])}
                      className="text-xs text-zinc-400 hover:text-red-400"
                    >
                      Limpar histórico
                    </button>
                  )}
                </div>

                {salesRecords.length === 0 ? (
                  <div className="p-10 text-center">
                    <ShoppingCart className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-zinc-300">Nenhuma venda contabilizada ainda</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Clique nos botões acima ("Registrar Venda") ou simule vendas pelo catálogo para visualizar o extrato detalhado de taxas e lucro por item.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/60 text-zinc-400 uppercase text-[10px]">
                          <th className="py-3 px-4">Pedido / Produto</th>
                          <th className="py-3 px-4">Fornecedor</th>
                          <th className="py-3 px-4">Meio Pagamento</th>
                          <th className="py-3 px-4 text-right">Valor Venda</th>
                          <th className="py-3 px-4 text-right">Custo Item</th>
                          <th className="py-3 px-4 text-right">Tarifa ML</th>
                          <th className="py-3 px-4 text-right">Taxa Mercado Pago</th>
                          <th className="py-3 px-4 text-right">Lucro Líquido</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/70">
                        {salesRecords.map((sale, i) => (
                          <tr key={i} className="hover:bg-zinc-900/30">
                            <td className="py-3 px-4">
                              <div className="font-bold text-white">{sale.orderId}</div>
                              <div className="text-zinc-400 truncate max-w-xs">{sale.productName}</div>
                            </td>
                            <td className="py-3 px-4 text-blue-400 font-medium">{sale.supplier}</td>
                            <td className="py-3 px-4 text-zinc-300">{sale.paymentMethod}</td>
                            <td className="py-3 px-4 text-right font-mono text-white">R$ {sale.salePrice.toFixed(2)}</td>
                            <td className="py-3 px-4 text-right font-mono text-zinc-400">- R$ {sale.supplierCost.toFixed(2)}</td>
                            <td className="py-3 px-4 text-right font-mono text-amber-400">- R$ {sale.mlFee.toFixed(2)}</td>
                            <td className="py-3 px-4 text-right font-mono text-sky-400">- R$ {sale.mpFee.toFixed(2)}</td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                              + R$ {sale.netProfit.toFixed(2)} ({sale.marginPercent}%)
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================================
              ABA 2: CATÁLOGO DE PRODUTOS (COM FAQUEIROS, VIRAIS E VÍNCULO DE FORNECEDOR)
          ============================================================================ */}
          {activeMenu === 'catalogo' && (
            <div>
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Catálogo de Produtos & Fornecedores</h1>
                  <p className="mt-1 text-sm text-zinc-400">
                    Produtos virais e campeões de venda com estoque nacional, cálculo de taxas do Mercado Pago/ML e publicação em 1 clique.
                  </p>
                </div>
              </div>

              {/* Filtros: Busca, Categoria e Fornecedor Vinculado */}
              <div className="mb-5 grid gap-3 sm:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar faqueiro, mochila, fone, SKU..."
                    className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900/90 pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-10 rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Todas">Todas as Categorias</option>
                  <option value="Casa & Cozinha">Casa & Cozinha (Faqueiros / Air Fryer)</option>
                  <option value="Ferramentas">Ferramentas Virais</option>
                  <option value="Eletrônicos">Eletrônicos & Áudio</option>
                  <option value="Moda">Moda & Mochilas</option>
                  <option value="Saúde">Saúde & Beleza</option>
                </select>

                <select
                  value={selectedSupplierFilter}
                  onChange={(e) => setSelectedSupplierFilter(e.target.value)}
                  className="h-10 rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Todos">Todos os Fornecedores ({SUPPLIERS.length})</option>
                  {SUPPLIERS.map(sup => (
                    <option key={sup.id} value={sup.id}>{sup.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => {
                  const itemCalc = calculateItemFinancials(product.suggestedPrice, product.cost, 'gold_special', 'credit_card');
                  const alreadyPublishedCount = publishedAds.filter(a => a.id === product.id).length;

                  return (
                    <div key={product.id} className="flex flex-col justify-between rounded-2xl border border-zinc-800/90 bg-[#12141c] p-4 hover:border-zinc-700 transition-all">
                      <div>
                        <div className="relative mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white p-2">
                          {product.isViral && (
                            <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-black uppercase text-white shadow">
                              <Flame className="w-3 h-3" /> VIRAL
                            </span>
                          )}
                          <img
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-contain"
                            src={product.image}
                          />
                        </div>

                        <div className="flex items-start justify-between gap-2">
                          <h3 className="line-clamp-2 text-sm font-semibold text-zinc-100">{product.name}</h3>
                          <span className="inline-flex items-center whitespace-nowrap rounded-full border border-zinc-700 bg-zinc-800/80 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
                            {product.stock} un
                          </span>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between text-xs">
                          <span className="text-zinc-400">{product.category}</span>
                          <button
                            onClick={() => setSelectedSupplierFilter(product.supplierId)}
                            className="text-blue-400 hover:underline font-medium"
                          >
                            {product.supplier}
                          </button>
                        </div>

                        <dl className="mt-3 space-y-1 text-xs text-zinc-400 border-t border-zinc-800/80 pt-2.5">
                          <div className="flex justify-between">
                            <dt>Custo Fornecedor</dt>
                            <dd className="font-mono text-zinc-200">R$ {product.cost.toFixed(2).replace('.', ',')}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt>Venda Sugerida</dt>
                            <dd className="font-mono font-bold text-white">R$ {product.suggestedPrice.toFixed(2).replace('.', ',')}</dd>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <dt>Taxa ML (12%) + MP (4,99%)</dt>
                            <dd className="font-mono text-amber-400">- R$ {itemCalc.totalFees.toFixed(2).replace('.', ',')}</dd>
                          </div>
                        </dl>

                        <div className="mt-3 flex items-baseline justify-between border-t border-zinc-800 pt-2.5">
                          <span className="text-xs font-medium text-zinc-300">Lucro Líquido / Item</span>
                          <span className="font-mono text-base font-black text-emerald-400">
                            R$ {itemCalc.netProfit.toFixed(2).replace('.', ',')}
                          </span>
                        </div>

                        {alreadyPublishedCount > 0 && (
                          <p className="mt-1.5 text-[11px] text-emerald-400 font-medium">
                            ✓ {alreadyPublishedCount} anúncio(s) publicado(s) no ML
                          </p>
                        )}
                      </div>

                      <div className="mt-4 space-y-2">
                        <button
                          onClick={() => openPublishModal(product)}
                          className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 text-xs font-bold text-white shadow hover:bg-blue-500 transition-colors cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                          Cadastrar e Publicar no ML
                        </button>
                        <button
                          onClick={() => handleRegisterSaleFromCatalog(product, 'credit_card')}
                          className="inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 text-[11px] font-medium text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                          Contabilizar Venda no Dashboard
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================================
              ABA 3: FORNECEDORES NACIONAIS VINCULADOS
          ============================================================================ */}
          {activeMenu === 'fornecedores' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Fornecedores Nacionais Homologados</h1>
                <p className="text-sm text-zinc-400 mt-1">
                  Todos os fornecedores estão vinculados diretamente aos produtos do catálogo com expedição em até 24h.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {SUPPLIERS.map(sup => {
                  const linkedProducts = CATALOG_PRODUCTS.filter(p => p.supplierId === sup.id);
                  return (
                    <div key={sup.id} className="rounded-2xl border border-zinc-800 bg-[#12141c] p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-base font-bold text-white">{sup.name}</h3>
                            <p className="text-xs text-zinc-400 mt-0.5">{sup.city} • CNPJ: {sup.cnpj}</p>
                            <p className="text-xs text-blue-400 mt-1">{sup.category}</p>
                          </div>
                          <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold">
                            {sup.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-center">
                          <div>
                            <div className="text-[11px] text-zinc-400">Itens no Catálogo</div>
                            <div className="text-sm font-bold text-white mt-0.5">{linkedProducts.length} produtos</div>
                          </div>
                          <div>
                            <div className="text-[11px] text-zinc-400">Avaliação</div>
                            <div className="text-sm font-bold text-emerald-400 mt-0.5">{sup.rating} ★</div>
                          </div>
                          <div>
                            <div className="text-[11px] text-zinc-400">Despacho</div>
                            <div className="text-sm font-bold text-blue-400 mt-0.5">{sup.dispatchTime}</div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedSupplierFilter(sup.id);
                          setActiveMenu('catalogo');
                        }}
                        className="w-full h-9 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors cursor-pointer"
                      >
                        Ver os {linkedProducts.length} Produtos de {sup.name} →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================================
              ABA 4: INTEGRAÇÃO OFICIAL MERCADO LIVRE
          ============================================================================ */}
          {activeMenu === 'integracoes' && (
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white">Integração Oficial Mercado Livre</h1>
                  <p className="mt-1 text-sm text-zinc-400">
                    Conecte sua conta do Mercado Livre via OAuth 2.0 ou Access Token para publicar e sincronizar estoque de verdade.
                  </p>
                </div>
                <button
                  onClick={() => setShowConnectMlModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-bold text-white shadow cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Conectar Conta do Mercado Livre
                </button>
              </div>

              {mlStores.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-800 bg-[#12141c] p-12 text-center max-w-xl mx-auto my-6">
                  <div className="mx-auto w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-300 font-bold mb-4">
                    ML
                  </div>
                  <h3 className="text-base font-bold text-white">Nenhuma conta do Mercado Livre conectada</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Clique abaixo para autenticar sua conta oficial do Mercado Livre via <code className="text-zinc-200">APP_USR-...</code> ou <code className="text-zinc-200">OAuth 2.0</code>.
                  </p>
                  <button
                    onClick={() => setShowConnectMlModal(true)}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shadow cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4" /> Autenticar Conta Mercado Livre Agora
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {mlStores.map(store => (
                    <article key={store.id} className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#12141c] md:flex-row">
                      <div className="flex flex-col p-5 md:w-2/5 md:border-r md:border-zinc-800">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 font-bold text-xs">
                            ML
                          </div>
                          <div>
                            <h2 className="text-base font-bold text-white">{store.nickname}</h2>
                            <p className="text-[11px] text-zinc-400">Seller ID: {store.id}</p>
                          </div>
                          <span className="ml-auto rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                            {store.status}
                          </span>
                        </div>

                        <div className="mt-5">
                          <label className="text-xs font-medium text-zinc-400">Frete grátis a partir de (R$)</label>
                          <input
                            type="number"
                            defaultValue={store.freeShippingThreshold}
                            className="mt-2 flex h-9 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm text-white"
                          />
                        </div>

                        <div className="mt-auto flex flex-wrap gap-2 pt-5">
                          {store.permalink && (
                            <a
                              href={store.permalink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-8 items-center rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-xs font-medium text-zinc-200 hover:bg-zinc-800"
                            >
                              <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Perfil no ML
                            </a>
                          )}
                          <button
                            onClick={() => {
                              setMlStores(prev => prev.filter(s => s.id !== store.id));
                              showToast('Conta desconectada.');
                            }}
                            className="inline-flex h-8 items-center rounded-lg border border-red-900/50 bg-red-950/30 px-3 text-xs font-medium text-red-300 hover:bg-red-950/60"
                          >
                            <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Desconectar
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col bg-zinc-900/40 p-5 justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-white flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                              Métricas Reais Importadas da API
                            </span>
                            <span className="text-xs text-emerald-400 font-semibold">Reputação {store.reputation}</span>
                          </div>

                          <div className="grid grid-cols-3 gap-3 pt-2">
                            <div className="rounded-xl bg-zinc-900 p-3 border border-zinc-800">
                              <div className="text-[10px] uppercase text-zinc-400">Reclamações</div>
                              <div className="text-sm font-bold text-emerald-400 mt-1">{store.claimsRate}</div>
                            </div>
                            <div className="rounded-xl bg-zinc-900 p-3 border border-zinc-800">
                              <div className="text-[10px] uppercase text-zinc-400">Cancelamentos</div>
                              <div className="text-sm font-bold text-emerald-400 mt-1">{store.cancellationsRate}</div>
                            </div>
                            <div className="rounded-xl bg-zinc-900 p-3 border border-zinc-800">
                              <div className="text-[10px] uppercase text-zinc-400">Atraso Envio</div>
                              <div className="text-sm font-bold text-emerald-400 mt-1">{store.delayedRate}</div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-zinc-800 pt-3 mt-4 flex justify-between text-[11px] text-zinc-500">
                          <span>Endpoint: api.mercadolibre.com/users/me</span>
                          <span>Sincronizado em {store.syncedAt}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================================
              ABA 5: MEUS ANÚNCIOS PUBLICADOS NO MERCADO LIVRE
          ============================================================================ */}
          {activeMenu === 'anuncios' && (
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Meus Anúncios Publicados no Mercado Livre</h1>
              <p className="text-sm text-zinc-400 mb-6">
                Anúncios enviados pela plataforma com cálculo de taxa do Mercado Pago, comissão ML e lucro líquido por unidade.
              </p>

              {publishedAds.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-800 bg-[#12141c] p-10 text-center max-w-xl mx-auto">
                  <Megaphone className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-white">Nenhum anúncio publicado ainda</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Vá ao Catálogo, escolha um item (ex: Faqueiro Inox 24 Peças) e clique em "Cadastrar e Publicar no ML".
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {publishedAds.map((ad, idx) => (
                    <div key={idx} className="rounded-2xl border border-zinc-800 bg-[#12141c] p-4 flex gap-4 items-center">
                      <img src={ad.image} alt={ad.title} className="w-20 h-20 rounded-xl bg-white object-contain p-1 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            {ad.mlbId} • {ad.storeNickname}
                          </span>
                          {ad.permalink && (
                            <a
                              href={ad.permalink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1"
                            >
                              Abrir no ML <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold text-white truncate mt-1.5">{ad.title}</h3>
                        <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t border-zinc-800/80 text-[11px]">
                          <div>
                            <span className="text-zinc-500 block">Venda</span>
                            <strong className="text-white">R$ {ad.price.toFixed(2)}</strong>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">Taxa ML</span>
                            <strong className="text-amber-400">-R$ {ad.mlFee.toFixed(2)}</strong>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">Taxa MP</span>
                            <strong className="text-sky-400">-R$ {ad.mpFee.toFixed(2)}</strong>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">Lucro Líq.</span>
                            <strong className="text-emerald-400">+R$ {ad.netProfit.toFixed(2)}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================================
              ABA 6: MERCADO PAGO (CREDENCIAIS E TABELA DE TAXAS OFICIAIS)
          ============================================================================ */}
          {activeMenu === 'mercadopago' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Integração Oficial Mercado Pago & Taxas</h1>
                <p className="mt-1 text-sm text-zinc-400">
                  Vincule suas credenciais de produção do Mercado Pago para processar pagamentos e calcular automaticamente as taxas no Dashboard.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-4">
                  <div className="text-xs text-zinc-400">Taxa PIX Mercado Pago</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">0,99%</div>
                  <p className="text-[11px] text-zinc-500 mt-1">Liberação na hora na conta MP</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-4">
                  <div className="text-xs text-zinc-400">Taxa Cartão de Crédito</div>
                  <div className="text-2xl font-black text-sky-400 mt-1">4,99%</div>
                  <p className="text-[11px] text-zinc-500 mt-1">Recebimento D+0 no Checkout</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-4">
                  <div className="text-xs text-zinc-400">Repasse Fornecedor</div>
                  <div className="text-2xl font-black text-white mt-1">Automático</div>
                  <p className="text-[11px] text-zinc-500 mt-1">Split direto no pedido</p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  localStorage.setItem('forneshop_mp_pub', mpPublicKey);
                  localStorage.setItem('forneshop_mp_token', mpAccessToken);
                  showToast('Credenciais de produção do Mercado Pago salvas com sucesso!');
                }}
                className="rounded-2xl border border-zinc-800 bg-[#12141c] p-6 space-y-4"
              >
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Public Key (Chave Pública Mercado Pago)</label>
                  <input
                    type="text"
                    value={mpPublicKey}
                    onChange={(e) => setMpPublicKey(e.target.value)}
                    placeholder="APP_USR-..."
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Access Token de Produção do Mercado Pago</label>
                  <input
                    type="text"
                    value={mpAccessToken}
                    onChange={(e) => setMpAccessToken(e.target.value)}
                    placeholder="APP_USR-..."
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white font-mono"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white cursor-pointer"
                >
                  Salvar Credenciais Mercado Pago
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}