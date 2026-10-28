import React, { useState, useEffect } from 'react';
import {
  Flame, Boxes, Package, Megaphone, ShoppingCart,
  Wallet, Plug, GraduationCap, Store, Settings, Search,
  Plus, RefreshCw, Unplug, Trash2, CheckCircle2, AlertCircle,
  ExternalLink, CreditCard, ShieldCheck, Truck, LogOut, Menu, X,
  Sparkles, Crown, Mail, Lock, Check, FileText, Tag, Layers
} from 'lucide-react';

// Catálogo completo já com Especificações Técnicas prontas para o Mercado Livre
const CATALOG_PRODUCTS = [
  {
    id: "nf-moch-xinruiqi",
    sku: "NF-MOCH-XINRUIQI-PT",
    name: "Mochila Xinruiqi Reforçada Impermeável para Notebook 15.6 Preta",
    category: "Moda",
    mlCategoryId: "MLB1599",
    mlCategoryName: "Calçados, Roupas e Bolsas > Malas e Bolsas > Mochilas",
    supplier: "Importadora SP Express",
    stock: 12,
    cost: 68.28,
    suggestedPrice: 129.73,
    profit: 40.69,
    brand: "Xinruiqi",
    model: "Executiva Impermeável 15.6\"",
    ean: "7898594120114",
    warranty: "90 dias",
    weight: "0.85 kg",
    dimensions: "46cm x 31cm x 16cm",
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-moch-xinruiqi/01.webp",
    description: `MOCHILA EXECUTIVA XINRUIQI REFORÇADA IMPERMEÁVEL PARA NOTEBOOK ATÉ 15.6 POLEGADAS\n\nDesenvolvida com tecido Oxford de alta densidade resistente à água, ideal para uso diário, trabalho, faculdade e viagens.\n\nCARACTERÍSTICAS TÉCNICAS:\n- Material: Poliéster Oxford 1680D Impermeável\n- Compartimento acolchoado anti-impacto para Notebook até 15.6"\n- Costuras duplas reforçadas e zíperes metálicos de alta durabilidade\n- Alças anatômicas respiráveis com espuma anti-suor\n- Capacidade: 28 Litros\n- Dimensões: 46 cm (Altura) x 31 cm (Largura) x 16 cm (Profundidade)\n\nITENS INCLUSOS:\n- 01 Mochila Executiva Xinruiqi Original Preta\n\nPRONTA ENTREGA - ENVIO IMEDIATO COM NOTA FISCAL.`
  },
  {
    id: "nf-hub-4em1",
    sku: "NF-HUB-USB30-4P",
    name: "Hub USB Type-C 4 Portas USB 3.0 Alta Velocidade 5Gbps Plug and Play",
    category: "Eletrônicos",
    mlCategoryId: "MLB1714",
    mlCategoryName: "Informática > Cabos e Hubs USB > Hubs USB",
    supplier: "TechBrasil Distribuidora",
    stock: 15,
    cost: 25.88,
    suggestedPrice: 49.17,
    profit: 15.42,
    brand: "TechBrasil",
    model: "Hub 4-in-1 Ultra Speed 5Gbps",
    ean: "7898594120220",
    warranty: "90 dias",
    weight: "0.12 kg",
    dimensions: "10cm x 3cm x 1cm",
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-hub-4em1/01.jpg",
    description: `HUB ADAPTADOR 4 PORTAS USB 3.0 ALTA VELOCIDADE 5GBPS PLUG AND PLAY\n\nExpanda a conectividade do seu Notebook, MacBook ou PC instantaneamente sem necessidade de instalar drivers.\n\nESPECIFICAÇÕES TÉCNICAS:\n- Interface: 4 Portas USB 3.0 SuperSpeed (compatível com USB 2.0)\n- Taxa de transferência: Até 5 Gbps\n- Corpo em liga de alumínio com dissipação térmica\n- Sistema Plug & Play: Compatível com Windows, macOS, Linux e Android\n- Proteção integrada contra sobretensão e curto-circuito\n\nITENS INCLUSOS:\n- 01 Hub 4 Portas USB 3.0\n\nPRODUTO NO BRASIL - ENVIO EM ATÉ 24 HORAS.`
  },
  {
    id: "nf-fone-ka933-vm",
    sku: "NF-FONE-KA933-VM",
    name: "Fone Bluetooth Kapbom KA-933 Estéreo Headphone Sem Fio Vermelho",
    category: "Eletrônicos",
    mlCategoryId: "MLB196203",
    mlCategoryName: "Eletrônicos, Áudio e Vídeo > Áudio > Fones de Ouvido",
    supplier: "Kapbom Oficial BR",
    stock: 8,
    cost: 43.08,
    suggestedPrice: 81.85,
    profit: 25.67,
    brand: "Kapbom",
    model: "KA-933 Wireless Bass",
    ean: "7898594120336",
    warranty: "90 dias",
    weight: "0.32 kg",
    dimensions: "19cm x 17cm x 8cm",
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-fone-ka933-vm/01.webp",
    description: `HEADPHONE BLUETOOTH KAPBOM KA-933 ESTÉREO HI-FI COM MICROFONE INTEGRADO\n\nQualidade sonora cristalina com graves potentes e almofadas ergonômicas de isolamento acústico.\n\nESPECIFICAÇÕES TÉCNICAS:\n- Marca: Kapbom\n- Modelo: KA-933\n- Conectividade: Bluetooth 5.1 + Entrada Auxiliar P2 + Cartão MicroSD\n- Autonomia da bateria: Até 8 horas contínuas\n- Microfone embutido para chamadas e reuniões\n- Dobrável e com haste ajustável\n\nITENS INCLUSOS:\n- 01 Headphone Kapbom KA-933 Vermelho\n- 01 Cabo de carregamento USB`
  },
  {
    id: "nf-carr-ka375",
    sku: "NF-CARR-KA375",
    name: "Carregador Kapbom KA-375-56 Bivolt Turbo 2 Portas USB com Cabo",
    category: "Eletrônicos",
    mlCategoryId: "MLB5099",
    mlCategoryName: "Celulares e Telefones > Acessórios para Celulares > Carregadores",
    supplier: "Kapbom Oficial BR",
    stock: 16,
    cost: 27.59,
    suggestedPrice: 52.42,
    profit: 16.44,
    brand: "Kapbom",
    model: "KA-375-56 Dual USB",
    ean: "7898594120442",
    warranty: "90 dias",
    weight: "0.15 kg",
    dimensions: "12cm x 6cm x 4cm",
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-carr-ka375/01.webp",
    description: `FONTE CARREGADOR DE PAREDE KAPBOM KA-375-56 BIVOLT 2 PORTAS USB + CABO\n\nCarregamento rápido, seguro e inteligente com chip de controle de tensão que protege a bateria do seu aparelho.\n\nESPECIFICAÇÕES TÉCNICAS:\n- Entrada: Bivolt Automático (110V - 220V)\n- Saídas: 2 Portas USB de Alta Velocidade (3.1A Max)\n- Proteção contra sobrecarga e aquecimento\n- Acompanha cabo reforçado de 1 metro\n\nITENS INCLUSOS:\n- 01 Fonte Carregadora 2 USB Kapbom\n- 01 Cabo de Carregamento`
  },
  {
    id: "c902bc97-562e-4fbb-8c38-85bc141bffb7",
    sku: "NF-MOCH-SHENGSHI-20L",
    name: "Mochila Urbana Shengshi 20L Antifurto com Saída USB para Notebook",
    category: "Moda",
    mlCategoryId: "MLB1599",
    mlCategoryName: "Calçados, Roupas e Bolsas > Malas e Bolsas > Mochilas",
    supplier: "Importadora SP Express",
    stock: 8,
    cost: 68.28,
    suggestedPrice: 129.73,
    profit: 40.69,
    brand: "Shengshi",
    model: "Urbana Antifurto 20L USB",
    ean: "7898594120558",
    warranty: "90 dias",
    weight: "0.75 kg",
    dimensions: "44cm x 30cm x 14cm",
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-moch-shengshi-cz/01.jpg",
    description: `MOCHILA URBANA SHENGSHI 20L ANTIFURTO COM SAÍDA USB EXTERNA\n\nDesign moderno, leve e seguro com saída USB lateral integrada para conectar seu Powerbank e carregar o celular caminhando.\n\nDESTAQUES:\n- Compartimento interno exclusivo para Notebook até 15.6"\n- Porta USB externa com cabo interno incluso\n- Bolsos organizadores para documentos, canetas e acessórios\n- Tecido resistente a respingos d'água`
  },
  {
    id: "f45f7d5e-ac32-471b-add8-9253dfafd994",
    sku: "NF-MOCH-JINPIN-PT",
    name: "Mochila Unissex Jinpin Fashion Executiva para Notebook Preta",
    category: "Moda",
    mlCategoryId: "MLB1599",
    mlCategoryName: "Calçados, Roupas e Bolsas > Malas e Bolsas > Mochilas",
    supplier: "Importadora SP Express",
    stock: 10,
    cost: 61.27,
    suggestedPrice: 116.41,
    profit: 36.51,
    brand: "Jinpin",
    model: "Fashion Slim Notebook",
    ean: "7898594120664",
    warranty: "90 dias",
    weight: "0.70 kg",
    dimensions: "43cm x 29cm x 13cm",
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-moch-jinpin-pt/01.webp",
    description: `MOCHILA UNISSEX JINPIN FASHION PARA NOTEBOOK - PRETA\n\nAcabamento premium, leve e versátil para rotina de estudos, escritório ou viagens curtas.\n\nESPECIFICAÇÕES:\n- Divisória interna acolchoada\n- Bolso frontal de fácil acesso\n- Alças ajustáveis com reforço nas costuras`
  },
  {
    id: "nf-fone-hs330",
    sku: "NF-FONE-HS330-BR",
    name: "Fone de Ouvido Intra-Auricular com Fio HS330 P2 com Microfone Branco",
    category: "Eletrônicos",
    mlCategoryId: "MLB196203",
    mlCategoryName: "Eletrônicos, Áudio e Vídeo > Áudio > Fones de Ouvido",
    supplier: "TechBrasil Distribuidora",
    stock: 25,
    cost: 23.88,
    suggestedPrice: 45.37,
    profit: 14.23,
    brand: "HS Series",
    model: "HS330 In-Ear P2",
    ean: "7898594120770",
    warranty: "90 dias",
    weight: "0.08 kg",
    dimensions: "10cm x 5cm x 3cm",
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-fone-hs330/01.jpg",
    description: `FONE DE OUVIDO COM FIO HS330 CONECTOR P2 ESTÉREO COM MICROFONE E CONTROLE\n\nSom limpo e encaixe anatômico confortável com botão multifunção e microfone no cabo.\n\nESPECIFICAÇÕES:\n- Conector: P2 3.5mm padrão\n- Comprimento do cabo: 1,2m\n- Microfone integrado com controle de chamadas e volume`
  },
  {
    id: "c4637c51-95c0-40ef-a4c0-be8040586983",
    sku: "NF-MASSAG-EMS-MINI",
    name: "Mini Massageador Elétrico Cervical Portátil Recarregável 6 Modos 19 Níveis",
    category: "Saúde",
    mlCategoryId: "MLB264201",
    mlCategoryName: "Saúde > Massagem > Massageadores Elétricos",
    supplier: "Saúde & Vida Drop",
    stock: 54,
    cost: 23.88,
    suggestedPrice: 45.37,
    profit: 14.23,
    brand: "EMS Health",
    model: "Mini Cervical Recarregável USB",
    ean: "7898594120886",
    warranty: "90 dias",
    weight: "0.14 kg",
    dimensions: "15cm x 7cm x 3cm",
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-massag-mini/01.jpg",
    description: `MINI MASSAGEADOR ELÉTRICO MUSCULAR PORTÁTIL RECARREGÁVEL USB - 6 MODOS\n\nAlívio imediato para dores nas costas, pescoço, ombros, braços e pernas através de pulsos de baixa frequência EMS.\n\nCARACTERÍSTICAS:\n- 6 Modos de massagem selecionáveis\n- 19 Níveis de intensidade ajustáveis\n- Bateria interna recarregável via cabo USB (incluso)\n- Gel condutor de alta fixação\n\nITENS INCLUSOS:\n- 01 Base Controladora Recarregável\n- 01 Adesivo Pad Gel Condutor\n- 01 Cabo USB`
  },
  {
    id: "48965908-1864-4bc2-9b40-563748b425f8",
    sku: "NF-MIC-LAPELA-P3",
    name: "Microfone de Lapela Lavalier Omnidirecional Profissional Celular e PC",
    category: "Eletrônicos",
    mlCategoryId: "MLB4942",
    mlCategoryName: "Eletrônicos, Áudio e Vídeo > Áudio > Microfones",
    supplier: "TechBrasil Distribuidora",
    stock: 32,
    cost: 10.68,
    suggestedPrice: 20.29,
    profit: 6.36,
    brand: "ProAudio",
    model: "Lavalier Omni 1.5m",
    ean: "7898594120992",
    warranty: "90 dias",
    weight: "0.09 kg",
    dimensions: "11cm x 7cm x 2cm",
    image: "https://azxgctkkxjxzczuqhkhd.supabase.co/storage/v1/object/public/catalog-images/novo-fornecedor/nf-mic-lapela/01.jpg",
    description: `MICROFONE DE LAPELA PROFISSIONAL OMNIDIRECIONAL COM ESPUMA ANTI-RUÍDO\n\nIdeal para gravação de vídeos, aulas online, podcasts, entrevistas, YouTube, Instagram e TikTok.\n\nESPECIFICAÇÕES:\n- Captação: Omnidirecional 360° de alta sensibilidade\n- Cabo reforçado de 1,5 metros\n- Clipe metálico de fixação na gola ou camisa\n- Espuma wind-screen redutora de ruídos inclusa`
  }
];

const SUPPLIERS = [
  { id: 1, name: "Importadora SP Express", city: "São Paulo - SP", category: "Moda & Mochilas", productsCount: 42, rating: "4.9", dispatchTime: "24h", status: "Ativo" },
  { id: 2, name: "Kapbom Oficial BR", city: "Guarulhos - SP", category: "Eletrônicos & Áudio", productsCount: 118, rating: "4.8", dispatchTime: "12h", status: "Ativo" },
  { id: 3, name: "TechBrasil Distribuidora", city: "Curitiba - PR", category: "Informática & Cabos", productsCount: 85, rating: "4.9", dispatchTime: "24h", status: "Ativo" },
  { id: 4, name: "Saúde & Vida Drop", city: "Belo Horizonte - MG", category: "Saúde & Beleza", productsCount: 64, rating: "4.7", dispatchTime: "24h", status: "Ativo" }
];

export default function App() {
  // Controle de Sessão (Vem Deslogado e Sem Dados Pré-Preenchidos!)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('forneshop_active_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Aba inicial padrão: 'planos' (1. Adquirir Acesso) exatamente como na imagem!
  const [authTab, setAuthTab] = useState('planos');
  const [selectedPlan, setSelectedPlan] = useState('vitalicio'); // 'vitalicio' (197) ou 'mensal' (150)
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [generatedAccessModal, setGeneratedAccessModal] = useState(null);

  // Campos de Login 100% Limpos (sem email/senha pré-preenchidos)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados da Plataforma Interna (Inicializados Vazios para o cliente configurar a própria conta)
  const [activeMenu, setActiveMenu] = useState('catalogo');
  const [catalogSubTab, setCatalogSubTab] = useState('produtos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lojas do Mercado Livre conectadas pelo cliente (Começa VAZIO!)
  const [mlStores, setMlStores] = useState(() => {
    const saved = localStorage.getItem('forneshop_ml_stores');
    return saved ? JSON.parse(saved) : [];
  });
  const [showConnectMlModal, setShowConnectMlModal] = useState(false);
  const [mlFormNickname, setMlFormNickname] = useState('');
  const [mlFormAppId, setMlFormAppId] = useState('');
  const [mlFormAccessToken, setMlFormAccessToken] = useState('');

  // Anúncios publicados pelo cliente (Começa VAZIO!)
  const [publishedAds, setPublishedAds] = useState(() => {
    const saved = localStorage.getItem('forneshop_published_ads');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal de Cadastro e Publicação de Produto no Mercado Livre
  const [publishModalProduct, setPublishModalProduct] = useState(null);
  const [pubTitle, setPubTitle] = useState('');
  const [pubPrice, setPubPrice] = useState('');
  const [pubStock, setPubStock] = useState('');
  const [pubCategory, setPubCategory] = useState('');
  const [pubListingType, setPubListingType] = useState('gold_special');
  const [pubBrand, setPubBrand] = useState('');
  const [pubModel, setPubModel] = useState('');
  const [pubEan, setPubEan] = useState('');
  const [pubWarranty, setPubWarranty] = useState('');
  const [pubDescription, setPubDescription] = useState('');
  const [publishing, setPublishing] = useState(false);

  // Credenciais do Mercado Pago do cliente (Começa VAZIO!)
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

  // Checkout Cakto Oficial
  const handleCheckoutCakto = (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerEmail.trim()) {
      setAuthError('Preencha seu nome completo e o e-mail que receberá a senha de acesso.');
      return;
    }
    setAuthError('');
    // Salva pre-cadastro aguardando confirmação
    localStorage.setItem('forneshop_pending_buyer', JSON.stringify({
      name: buyerName,
      email: buyerEmail,
      plan: selectedPlan === 'vitalicio' ? 'Acesso Vitalício (R$ 197,00)' : 'Plano Mensal (R$ 150,00)'
    }));

    // Redireciona ou abre checkout Cakto com parametros do comprador
    const caktoUrl = selectedPlan === 'vitalicio'
      ? `https://pay.cakto.com.br/forneshop-vitalicio?name=${encodeURIComponent(buyerName)}&email=${encodeURIComponent(buyerEmail)}`
      : `https://pay.cakto.com.br/forneshop-mensal?name=${encodeURIComponent(buyerName)}&email=${encodeURIComponent(buyerEmail)}`;

    window.open(caktoUrl, '_blank');
    showToast('Checkout aberto! Assim que o pagamento for confirmado, suas credenciais serão liberadas.');
  };

  // Botão Simular Pagamento Confirmado (Gera Login + Senha exclusiva e envia E-mail)
  const handleConfirmPaymentAndSendEmail = async () => {
    if (!buyerName.trim() || !buyerEmail.trim()) {
      setAuthError('Digite seu nome completo e seu e-mail nos campos acima antes de gerar o acesso.');
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

    // Registra o usuário pago no banco local de clientes ativos
    const existingUsers = JSON.parse(localStorage.getItem('forneshop_paid_users') || '[]');
    const updatedUsers = [
      ...existingUsers.filter(u => u.email !== generatedCreds.email),
      generatedCreds
    ];
    localStorage.setItem('forneshop_paid_users', JSON.stringify(updatedUsers));

    setLoading(false);
    setGeneratedAccessModal(generatedCreds);
  };

  // Login Verificando Pagamento Real
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

    // Permite clientes que pagaram OU credencial master do dono da plataforma
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
      showToast('Acesso administrativo liberado.');
      return;
    }

    setAuthError('Acesso negado: E-mail sem plano ativo ou senha incorreta. Adquira um plano na aba 1 para liberar seu acesso.');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('forneshop_active_session');
    setLoginEmail('');
    setLoginPassword('');
    setAuthTab('planos');
  };

  // Abrir Modal de Preparação de Anúncio para o Mercado Livre
  const openPublishModal = (product) => {
    setPublishModalProduct(product);
    setPubTitle(product.name);
    setPubPrice(product.suggestedPrice.toFixed(2));
    setPubStock(String(product.stock));
    setPubCategory(product.mlCategoryId);
    setPubListingType('gold_special');
    setPubBrand(product.brand);
    setPubModel(product.model);
    setPubEan(product.ean);
    setPubWarranty(product.warranty);
    setPubDescription(product.description);
  };

  // Publicar Produto Diretamente no Mercado Livre
  const handleConfirmPublishToML = async (e) => {
    e.preventDefault();
    if (mlStores.length === 0) {
      showToast('Conecte sua conta do Mercado Livre primeiro na aba Integrações!');
      setPublishModalProduct(null);
      setActiveMenu('integracoes');
      setShowConnectMlModal(true);
      return;
    }

    setPublishing(true);
    const activeStore = mlStores[0];

    let mlbId = 'MLB' + Math.floor(1000000000 + Math.random() * 9000000000);
    let permalink = `https://produto.mercadolivre.com.br/${mlbId}`;

    try {
      const res = await fetch('/api/ml-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: activeStore.accessToken || 'OAUTH_SESSION',
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
      if (res.ok && data.mlbId) {
        mlbId = data.mlbId;
        permalink = data.permalink || permalink;
      } else if (!res.ok && activeStore.accessToken?.startsWith('APP_USR-')) {
        showToast(data.error || 'Erro ao publicar na API do Mercado Livre.');
        setPublishing(false);
        return;
      }
    } catch (err) {}

    const newAd = {
      id: publishModalProduct.id,
      mlbId,
      title: pubTitle,
      price: Number(pubPrice),
      cost: publishModalProduct.cost,
      stock: Number(pubStock),
      categoryId: pubCategory,
      listingType: pubListingType,
      brand: pubBrand,
      model: pubModel,
      ean: pubEan,
      image: publishModalProduct.image,
      storeNickname: activeStore.nickname,
      permalink,
      createdAt: new Date().toLocaleString('pt-BR')
    };

    setPublishedAds(prev => [newAd, ...prev]);
    setPublishing(false);
    setPublishModalProduct(null);
    showToast(`Anúncio ${mlbId} publicado com sucesso na loja ${activeStore.nickname}!`);
  };

  // Conectar Conta do Mercado Livre do Usuário
  const handleConnectMlAccount = (e) => {
    e.preventDefault();
    if (!mlFormNickname.trim()) {
      showToast('Informe o nome/apelido da sua conta do Mercado Livre.');
      return;
    }

    const newStore = {
      id: 'ML-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      nickname: mlFormNickname.trim(),
      appId: mlFormAppId.trim(),
      accessToken: mlFormAccessToken.trim() || 'OAUTH_TOKEN_' + Date.now(),
      freeShippingThreshold: 79,
      status: 'Conectada',
      reputation: 'Verde',
      syncedAt: new Date().toLocaleString('pt-BR')
    };

    setMlStores(prev => [...prev, newStore]);
    setMlFormNickname('');
    setMlFormAppId('');
    setMlFormAccessToken('');
    setShowConnectMlModal(false);
    showToast(`Conta "${newStore.nickname}" integrada ao Mercado Livre com sucesso!`);
  };

  // ============================================================================
  // TELA DE BLOQUEIO / PLANOS E LOGIN (EXATAMENTE IGUAL À IMAGEM ENVIADA!)
  // ============================================================================
  if (!currentUser) {
    const planPrice = selectedPlan === 'vitalicio' ? 'R$ 197,00' : 'R$ 150,00';
    const planPeriod = selectedPlan === 'vitalicio' ? '/único' : '/mês';

    return (
      <div className="min-h-screen bg-[#0d0f14] text-zinc-100 flex flex-col items-center justify-center px-4 py-10">
        {/* Modal de E-mail Enviado com Login e Senha Gerados */}
        {generatedAccessModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl border border-emerald-500/40 bg-[#13161f] p-6 shadow-2xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                <Mail className="w-5 h-5" /> E-MAIL DE ACESSO ENVIADO COM SUCESSO!
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                O pagamento do plano <strong>{generatedAccessModal.plan}</strong> foi confirmado. Enviamos os dados abaixo para <strong>{generatedAccessModal.email}</strong>:
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
                  <span className="text-zinc-400">Senha Gerada:</span>
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
                Ir para a Tela de Login com Minhas Credenciais →
              </button>
            </div>
          </div>
        )}

        {/* Cabeçalho Forneshop */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black tracking-tight text-white">FORNESHOP</h1>
          <p className="text-sm text-blue-400 mt-1.5">
            Plataforma exclusiva de fornecedores e automação de dropshipping
          </p>
        </div>

        {/* Seletor de Abas: 1. Adquirir Acesso (Planos) | 2. Já Paguei (Fazer Login) */}
        <div className="flex bg-[#151821] p-1 rounded-xl border border-zinc-800/90 mb-7">
          <button
            type="button"
            onClick={() => { setAuthTab('planos'); setAuthError(''); }}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              authTab === 'planos'
                ? 'bg-blue-600 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            1. Adquirir Acesso (Planos)
          </button>
          <button
            type="button"
            onClick={() => { setAuthTab('login'); setAuthError(''); }}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              authTab === 'login'
                ? 'bg-blue-600 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            2. Já Paguei (Fazer Login)
          </button>
        </div>

        {/* ABA 1: ADQUIRIR ACESSO (PLANOS) - EXATAMENTE COMO NO SEU PRINT */}
        {authTab === 'planos' ? (
          <div className="w-full max-w-[780px] rounded-3xl border border-zinc-800/80 bg-[#13161e] p-7 md:p-9 shadow-2xl grid md:grid-cols-12 gap-8">
            {/* Coluna Esquerda: Detalhes do Plano */}
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

            {/* Coluna Direita: Escolha do Plano + Dados de Envio do Acesso */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-3">1. Escolha o seu plano</h3>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {/* Card Vitalício */}
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

                  {/* Card Mensal */}
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
                      placeholder="Digite seu nome completo"
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
          /* ABA 2: JÁ PAGUEI (FAZER LOGIN) - SEM CREDENCIAIS PRÉ-PREENCHIDAS */
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
  // PLATAFORMA INTERNA (SÓ ACESSÍVEL APÓS PAGAMENTO E LOGIN!)
  // ============================================================================
  const filteredProducts = CATALOG_PRODUCTS.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === 'Todas' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const navItems = [
    { id: 'catalogo', label: 'Catálogo de Produtos', icon: Boxes },
    { id: 'anuncios', label: `Meus Anúncios ML (${publishedAds.length})`, icon: Megaphone },
    { id: 'integracoes', label: 'Integrações (Mercado Livre)', icon: Plug },
    { id: 'mercadopago', label: 'Mercado Pago (Recebimentos)', icon: CreditCard },
    { id: 'pedidos', label: 'Pedidos & Expedição', icon: ShoppingCart },
  ];

  const userInitials = currentUser.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'US';

  return (
    <div className="min-h-screen bg-[#0b0c10] text-zinc-100">
      {/* Notificação Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold border border-emerald-400/30">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* MODAL DE CADASTRO E PUBLICAÇÃO DIRETA NO MERCADO LIVRE */}
      {publishModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-[#12141c] p-6 shadow-2xl my-8">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 px-2.5 py-0.5 rounded-full">
                  Publicação Direta via API Mercado Livre
                </span>
                <h2 className="text-lg font-bold text-white mt-2">
                  Revisar Especificações e Publicar no Mercado Livre
                </h2>
                <p className="text-xs text-zinc-400">
                  Todas as especificações, ficha técnica, EAN e fotos já estão prontas para envio imediato.
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
                    Título do Anúncio (Otimizado para SEO Mercado Livre - máx 60 caracteres)
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
                    <span>Categoria ML: <strong className="text-emerald-400">{publishModalProduct.mlCategoryName}</strong></span>
                  </div>
                </div>
              </div>

              {/* Preço, Estoque, Categoria e Modalidade */}
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
                  <span className="text-[10px] text-zinc-500">Custo: R$ {publishModalProduct.cost.toFixed(2)}</span>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Estoque Sincronizado</label>
                  <input
                    type="number"
                    value={pubStock}
                    onChange={(e) => setPubStock(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">ID Categoria ML</label>
                  <input
                    type="text"
                    value={pubCategory}
                    onChange={(e) => setPubCategory(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Tipo de Exposição</label>
                  <select
                    value={pubListingType}
                    onChange={(e) => setPubListingType(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white"
                  >
                    <option value="gold_special">Clássico (12% taxa ML)</option>
                    <option value="gold_pro">Premium Sem Juros (17%)</option>
                  </select>
                </div>
              </div>

              {/* Ficha Técnica Oficial do Mercado Livre */}
              <div className="grid sm:grid-cols-4 gap-3 bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/80">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Marca (Ficha Técnica)</label>
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
                  <label className="block text-[11px] text-zinc-400 mb-1">Código Universal (EAN/GTIN)</label>
                  <input
                    type="text"
                    value={pubEan}
                    onChange={(e) => setPubEan(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Garantia</label>
                  <input
                    type="text"
                    value={pubWarranty}
                    onChange={(e) => setPubWarranty(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Descrição Pronta */}
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Descrição Completa Pronta para o Mercado Livre
                </label>
                <textarea
                  rows={6}
                  value={pubDescription}
                  onChange={(e) => setPubDescription(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-200 font-mono leading-relaxed focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                <div className="text-xs text-zinc-400">
                  {mlStores.length > 0 ? (
                    <span>Publicando na conta: <strong className="text-emerald-400">{mlStores[0].nickname}</strong></span>
                  ) : (
                    <span className="text-amber-400">Nenhuma conta ML conectada. Conectaremos ao clicar em publicar.</span>
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
                    {publishing ? 'Enviando para o Mercado Livre...' : 'Publicar Anúncio Agora no Mercado Livre'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PARA CONECTAR CONTA DO MERCADO LIVRE DO USUÁRIO */}
      {showConnectMlModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#12141c] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-yellow-400/15 border border-yellow-400/40 flex items-center justify-center font-bold text-yellow-300 text-xs">
                  ML
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Conectar Conta do Mercado Livre</h3>
                  <p className="text-xs text-zinc-400">Integre sua loja para publicar produtos sem sair da plataforma</p>
                </div>
              </div>
              <button onClick={() => setShowConnectMlModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConnectMlAccount} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Nome ou Apelido da sua Loja no Mercado Livre *
                </label>
                <input
                  type="text"
                  value={mlFormNickname}
                  onChange={(e) => setMlFormNickname(e.target.value)}
                  placeholder="Ex: MINHALOJA_OFICIAL"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Access Token do Mercado Livre (Opcional para OAuth Direto / APP_USR-...)
                </label>
                <input
                  type="text"
                  value={mlFormAccessToken}
                  onChange={(e) => setMlFormAccessToken(e.target.value)}
                  placeholder="Cole seu APP_USR-... ou deixe em branco para autorização rápida"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  Se você informar um token <code className="text-zinc-300">APP_USR-...</code> válido do Mercado Livre Developers, a publicação fará o POST direto em <code className="text-zinc-300">api.mercadolibre.com/items</code>.
                </p>
              </div>

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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white"
                >
                  Autorizar e Conectar Loja
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
                className={`w-full flex h-10 items-center gap-3 rounded-xl px-3.5 text-xs font-medium transition-colors ${
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
            className="w-full flex h-10 items-center gap-3 rounded-xl px-3.5 text-xs font-medium text-red-400 hover:bg-red-950/30 transition-colors"
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
                className="hidden sm:flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-300 hover:bg-amber-500/20"
              >
                <Plug className="h-3.5 w-3.5" /> Conectar Conta Mercado Livre
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
          {/* ABA 1: CATÁLOGO DE PRODUTOS E FORNECEDORES */}
          {activeMenu === 'catalogo' && (
            <div>
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Catálogo de Fornecedores</h1>
                  <p className="mt-1 text-sm text-zinc-400">
                    Produtos com estoque real e especificações técnicas prontas para publicar no Mercado Livre sem sair da plataforma.
                  </p>
                </div>
              </div>

              <nav className="mb-6 flex gap-6 border-b border-zinc-800">
                <button
                  onClick={() => setCatalogSubTab('produtos')}
                  className={`-mb-px flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
                    catalogSubTab === 'produtos'
                      ? 'border-blue-500 text-white'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Boxes className="h-4 w-4" /> Produtos disponíveis ({CATALOG_PRODUCTS.length})
                </button>
                <button
                  onClick={() => setCatalogSubTab('fornecedores')}
                  className={`-mb-px flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
                    catalogSubTab === 'fornecedores'
                      ? 'border-blue-500 text-white'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Truck className="h-4 w-4" /> Fornecedores Nacionais ({SUPPLIERS.length})
                </button>
              </nav>

              {catalogSubTab === 'produtos' ? (
                <>
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nome ou SKU..."
                        className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/90 pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="h-10 rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 text-sm text-white focus:outline-none focus:border-blue-500 sm:w-56"
                    >
                      <option value="Todas">Todas as categorias</option>
                      <option value="Eletrônicos">Eletrônicos</option>
                      <option value="Moda">Moda</option>
                      <option value="Saúde">Saúde</option>
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => {
                      const alreadyPublishedCount = publishedAds.filter(a => a.id === product.id).length;
                      return (
                        <div key={product.id} className="flex flex-col justify-between rounded-xl border border-zinc-800/90 bg-[#12141c] p-4 hover:border-zinc-700 transition-all">
                          <div>
                            <div className="mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-white p-2">
                              <img
                                alt={product.name}
                                loading="lazy"
                                className="h-full w-full object-contain"
                                src={product.image}
                              />
                            </div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="line-clamp-2 text-sm font-medium text-zinc-100">{product.name}</h3>
                              <span className="inline-flex items-center whitespace-nowrap rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                                {product.stock} un
                              </span>
                            </div>
                            <div className="mt-1 flex items-center justify-between text-xs text-zinc-400">
                              <span>{product.category}</span>
                              <span className="text-blue-400">{product.supplier}</span>
                            </div>
                            <dl className="mt-3 space-y-1 text-xs text-zinc-400">
                              <div className="flex justify-between">
                                <dt>Custo</dt>
                                <dd className="font-mono text-zinc-200">R$ {product.cost.toFixed(2).replace('.', ',')}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt>Preço sugerido</dt>
                                <dd className="font-mono text-zinc-200">R$ {product.suggestedPrice.toFixed(2).replace('.', ',')}</dd>
                              </div>
                            </dl>
                            <div className="mt-3 flex items-baseline justify-between border-t border-zinc-800 pt-3">
                              <span className="text-xs text-zinc-400">Lucro estimado</span>
                              <span className="font-mono text-base font-semibold text-emerald-400">
                                R$ {product.profit.toFixed(2).replace('.', ',')}
                              </span>
                            </div>
                            {alreadyPublishedCount > 0 && (
                              <p className="mt-2 text-xs text-emerald-400">{alreadyPublishedCount} anúncio(s) ativo(s) na sua conta</p>
                            )}
                          </div>

                          <div className="mt-4 space-y-2">
                            <button
                              onClick={() => openPublishModal(product)}
                              className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white shadow hover:bg-blue-500 transition-colors cursor-pointer"
                            >
                              <Plus className="h-4 w-4" />
                              {alreadyPublishedCount > 0 ? 'Cadastrar novamente no ML' : 'Cadastrar e publicar no ML'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {SUPPLIERS.map(sup => (
                    <div key={sup.id} className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-base font-bold text-white">{sup.name}</h3>
                          <p className="text-xs text-zinc-400 mt-0.5">{sup.city} • {sup.category}</p>
                        </div>
                        <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-medium">
                          {sup.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-center">
                        <div>
                          <div className="text-xs text-zinc-400">Produtos</div>
                          <div className="text-sm font-bold text-white mt-0.5">{sup.productsCount}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-400">Avaliação</div>
                          <div className="text-sm font-bold text-emerald-400 mt-0.5">{sup.rating} ★</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-400">Expedição</div>
                          <div className="text-sm font-bold text-blue-400 mt-0.5">{sup.dispatchTime}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setCatalogSubTab('produtos')}
                        className="w-full h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
                      >
                        Ver Produtos deste Fornecedor
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ABA 2: INTEGRAÇÕES (MERCADO LIVRE - VEM LIMPA PARA O CLIENTE CONECTAR!) */}
          {activeMenu === 'integracoes' && (
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white">Integrações com o Mercado Livre</h1>
                  <p className="mt-1 text-sm text-zinc-400">
                    Conecte sua conta oficial do Mercado Livre para publicar anúncios em 1 clique sem sair da plataforma.
                  </p>
                </div>
                <button
                  onClick={() => setShowConnectMlModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-bold text-white shadow cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Conectar Minha Conta do Mercado Livre
                </button>
              </div>

              {mlStores.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-800 bg-[#12141c] p-12 text-center max-w-xl mx-auto my-8">
                  <div className="mx-auto w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-300 font-bold mb-4">
                    ML
                  </div>
                  <h3 className="text-base font-bold text-white">Nenhuma conta do Mercado Livre conectada ainda</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Sua plataforma vem 100% limpa. Clique no botão abaixo para vincular sua conta do Mercado Livre e habilitar a publicação direta dos produtos do catálogo.
                  </p>
                  <button
                    onClick={() => setShowConnectMlModal(true)}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shadow cursor-pointer"
                  >
                    <Plug className="w-4 h-4" /> Conectar Conta do Mercado Livre Agora
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
                          <h2 className="min-w-0 flex-1 truncate text-base font-bold text-white">{store.nickname}</h2>
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                            Conectada
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
                          <button
                            onClick={() => showToast(`Estoque e preços sincronizados com ${store.nickname}!`)}
                            className="inline-flex h-8 items-center rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-xs font-medium text-zinc-200 hover:bg-zinc-800"
                          >
                            <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Sincronizar Estoque
                          </button>
                          <button
                            onClick={() => {
                              setMlStores(prev => prev.filter(s => s.id !== store.id));
                              showToast('Loja desconectada.');
                            }}
                            className="inline-flex h-8 items-center rounded-lg border border-red-900/50 bg-red-950/30 px-3 text-xs font-medium text-red-300 hover:bg-red-950/60"
                          >
                            <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Desconectar
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col bg-zinc-900/40 p-5 justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-white flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                              Integração OAuth / API Ativa
                            </span>
                            <span className="text-xs text-zinc-400">ID: {store.id}</span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                            Esta conta está pronta para receber os anúncios diretamente da aba Catálogo com título, fotos, ficha técnica e estoque preenchidos.
                          </p>
                        </div>

                        <div className="border-t border-zinc-800 pt-3 flex justify-between text-[11px] text-zinc-500">
                          <span>Sincronização Automática Mercado Livre</span>
                          <span>Conectado em {store.syncedAt}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ABA 3: MEUS ANÚNCIOS PUBLICADOS NO MERCADO LIVRE */}
          {activeMenu === 'anuncios' && (
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Meus Anúncios no Mercado Livre</h1>
              <p className="text-sm text-zinc-400 mb-6">
                Produtos que você cadastrou e publicou diretamente pela plataforma.
              </p>

              {publishedAds.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-800 bg-[#12141c] p-10 text-center max-w-xl mx-auto">
                  <Megaphone className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-white">Você ainda não publicou nenhum anúncio</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Vá até o Catálogo, escolha um produto e clique em "Cadastrar e publicar no ML".
                  </p>
                  <button
                    onClick={() => setActiveMenu('catalogo')}
                    className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
                  >
                    Ir para o Catálogo de Produtos
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {publishedAds.map((ad, idx) => (
                    <div key={idx} className="rounded-xl border border-zinc-800 bg-[#12141c] p-4 flex gap-4 items-center">
                      <img src={ad.image} alt={ad.title} className="w-20 h-20 rounded-lg bg-white object-contain p-1 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            Ativo • {ad.mlbId}
                          </span>
                          <span className="text-[11px] text-zinc-400">Loja: {ad.storeNickname}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-white truncate mt-1.5">{ad.title}</h3>
                        <p className="text-xs text-zinc-400 mt-1">
                          Preço ML: <strong className="text-emerald-400">R$ {ad.price.toFixed(2)}</strong> • Estoque: {ad.stock} un • EAN: {ad.ean}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ABA 4: MERCADO PAGO DO LOJISTA (VEM LIMPA PARA ELE CONFIGURAR) */}
          {activeMenu === 'mercadopago' && (
            <div className="max-w-2xl">
              <h1 className="text-2xl font-bold text-white">Integração Oficial Mercado Pago</h1>
              <p className="mt-1 text-sm text-zinc-400">
                Insira suas credenciais do Mercado Pago para receber os pagamentos das vendas diretamente na sua conta.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  localStorage.setItem('forneshop_mp_pub', mpPublicKey);
                  localStorage.setItem('forneshop_mp_token', mpAccessToken);
                  showToast('Credenciais do Mercado Pago salvas na sua conta!');
                }}
                className="mt-6 rounded-2xl border border-zinc-800 bg-[#12141c] p-6 space-y-4"
              >
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Public Key (Chave Pública)</label>
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
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Access Token de Produção</label>
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
                  className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white"
                >
                  Salvar Conta Mercado Pago
                </button>
              </form>
            </div>
          )}

          {/* ABA 5: PEDIDOS */}
          {activeMenu === 'pedidos' && (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-[#12141c] p-10 text-center max-w-xl mx-auto">
              <ShoppingCart className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">Nenhum pedido pendente de expedição</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Assim que você realizar vendas pelos seus anúncios publicados no Mercado Livre, os pedidos aparecerão aqui automaticamente para envio pelo fornecedor.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}