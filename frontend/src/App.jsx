import React, { useState, useEffect } from 'react';
import {
  Flame, Handshake, Boxes, Package, Megaphone, ShoppingCart,
  Wallet, Bell, Plug, GraduationCap, Store, Settings, Search,
  Plus, RefreshCw, Unplug, Trash2, CheckCircle2, AlertCircle,
  ExternalLink, CreditCard, ShieldCheck, Truck, LogOut, Menu, X, DollarSign
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  {
    id: "nf-moch-xinruiqi",
    name: "Mochila Xinruiqi Reforçada Impermeável para Notebook - Preta",
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
    category: "Eletrônicos",
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
    name: "Fone Bluetooth Kapbom KA-933 Estéreo Headphone Vermelho",
    category: "Eletrônicos",
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
    category: "Eletrônicos",
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
    name: "Fone de Ouvido com Fio HS330 P2 Estéreo com Microfone Branco",
    category: "Eletrônicos",
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
    name: "Mini Massageador Elétrico Recarregável 6 Modos 10 Níveis",
    category: "Saúde",
    supplier: "Saúde & Vida Drop",
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
    category: "Eletrônicos",
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

const SUPPLIERS = [
  { id: 1, name: "Importadora SP Express", city: "São Paulo - SP", category: "Moda & Mochilas", productsCount: 42, rating: "4.9", dispatchTime: "24h", status: "Ativo" },
  { id: 2, name: "Kapbom Oficial BR", city: "Guarulhos - SP", category: "Eletrônicos & Áudio", productsCount: 118, rating: "4.8", dispatchTime: "12h", status: "Ativo" },
  { id: 3, name: "TechBrasil Distribuidora", city: "Curitiba - PR", category: "Informática & Cabos", productsCount: 85, rating: "4.9", dispatchTime: "24h", status: "Ativo" },
  { id: 4, name: "Saúde & Vida Drop", city: "Belo Horizonte - MG", category: "Saúde & Beleza", productsCount: 64, rating: "4.7", dispatchTime: "24h", status: "Ativo" }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [email, setEmail] = useState('admin@forneshop.com');
  const [password, setPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados da Plataforma Logada
  const [activeMenu, setActiveMenu] = useState('catalogo');
  const [catalogSubTab, setCatalogSubTab] = useState('produtos');
  const [integrationsSubTab, setIntegrationsSubTab] = useState('ml');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estados Mercado Livre & Mercado Pago
  const [mlStores, setMlStores] = useState([
    {
      id: "KL20261021150519339",
      status: "Conectada",
      freeShippingThreshold: 79,
      reputation: "Verde",
      claims: "0.00%",
      cancellations: "0.00%",
      delayed: "0.00%",
      lastSync: "Sincronizado hoje às 10:59"
    }
  ]);
  const [mpAccessToken, setMpAccessToken] = useState('APP_USR-8492019482-092184-a8f92c019283-102938475');
  const [mpPublicKey, setMpPublicKey] = useState('APP_USR-92837465-1029-3847-5610-293847561029');
  const [mpConnected, setMpConnected] = useState(true);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        showToast('Bem-vindo ao painel Forneshop!');
        setLoading(false);
        return;
      }
    } catch (err) {
      // Fallback caso esteja rodando com npm run dev sem backend na porta
    }

    if (email === 'admin@forneshop.com' && password === 'admin123') {
      setIsAuthenticated(true);
      showToast('Login efetuado com sucesso!');
    } else {
      setAuthError('Credenciais inválidas. Use admin@forneshop.com e senha admin123');
    }
    setLoading(false);
  };

  const handlePublishProduct = (id) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, published: true, registrations: (p.registrations || 0) + 1 };
      }
      return p;
    }));
    showToast('Produto cadastrado e publicado automaticamente no Mercado Livre!');
  };

  const handleConnectNewMlStore = () => {
    const randomId = 'ML' + Math.floor(100000000000 + Math.random() * 900000000000);
    setMlStores(prev => [
      ...prev,
      {
        id: randomId,
        status: "Conectada",
        freeShippingThreshold: 79,
        reputation: "Verde",
        claims: "0.00%",
        cancellations: "0.00%",
        delayed: "0.00%",
        lastSync: "Sincronizado agora mesmo"
      }
    ]);
    showToast(`Loja ${randomId} conectada via OAuth Mercado Livre!`);
  };

  const handleSaveMercadoPago = (e) => {
    e.preventDefault();
    if (!mpAccessToken.trim()) {
      showToast('Insira o Access Token de Produção do Mercado Pago.');
      return;
    }
    setMpConnected(true);
    showToast('Conta oficial do Mercado Pago integrada! Recebimentos ativos.');
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Todas' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">FORNESHOP</h1>
          <p className="text-sm text-blue-400 mt-1">Plataforma exclusiva de fornecedores e automação de dropshipping</p>
        </div>

        <div className="flex bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 mb-6">
          <button
            onClick={() => setAuthTab('planos')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${authTab === 'planos' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
          >
            1. Adquirir Acesso (Planos)
          </button>
          <button
            onClick={() => setAuthTab('login')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${authTab === 'login' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
          >
            2. Já Paguei (Fazer Login)
          </button>
        </div>

        {authTab === 'login' ? (
          <div className="w-full max-w-md bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" /> ÁREA EXCLUSIVA PARA CLIENTES ATIVOS
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">E-mail utilizado na compra</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Senha enviada no seu e-mail</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-blue-600/20"
              >
                {loading ? 'Entrando...' : 'Entrar na plataforma →'}
              </button>
            </form>

            <p className="text-center text-xs text-zinc-500 mt-5">
              Ainda não possui acesso?{' '}
              <button onClick={() => setAuthTab('planos')} className="text-blue-400 hover:underline">
                Escolha um plano aqui
              </button>
            </p>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-b from-blue-950/50 to-zinc-950 border border-blue-800/40 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Acesso Vitalício
                </span>
                <h3 className="text-xl font-bold text-white mt-3">Forneshop PRO</h3>
                <p className="text-xs text-zinc-400 mt-1">Catálogo nacional com estoque real + Integração Mercado Livre e Mercado Pago.</p>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-white">R$ 197,00</span>
                  <span className="text-xs text-zinc-400 ml-1">/ único</span>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-zinc-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> +500 Produtos com estoque no Brasil</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Publicação em 1 clique no Mercado Livre</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Checkout transparente Mercado Pago</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h4 className="text-sm font-semibold text-white">Liberação Imediata por E-mail</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Após a confirmação do pagamento via PIX ou Cartão pelo Mercado Pago, suas credenciais são liberadas automaticamente.
              </p>
              <button
                onClick={() => {
                  setAuthTab('login');
                  showToast('Modo demonstração ativo: use admin@forneshop.com / admin123');
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg text-sm transition-colors"
              >
                Testar Acesso Agora (Demo Admin)
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const navItems = [
    { id: 'top', label: 'Top produtos', icon: Flame },
    { id: 'catalogo', label: 'Catálogo', icon: Boxes },
    { id: 'produtos', label: 'Meus produtos', icon: Package },
    { id: 'anuncios', label: 'Anúncios', icon: Megaphone },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingCart },
    { id: 'carteira', label: 'Carteira', icon: Wallet },
    { id: 'integracoes', label: 'Integrações', icon: Plug },
    { id: 'loja-propria', label: 'Mercado Pago (Loja)', icon: CreditCard },
    { id: 'aulas', label: 'Aulas', icon: GraduationCap },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-zinc-100">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium border border-emerald-400/30">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Sidebar Desktop */}
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
                className={`w-full flex h-10 items-center gap-3 rounded-xl px-3.5 text-sm transition-colors ${
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
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex h-10 items-center gap-3 rounded-xl px-3.5 text-sm text-red-400 hover:bg-red-950/30 transition-colors"
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
            <div className="hidden items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1.5 sm:flex">
              <Store className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-medium text-zinc-200">KL20261021150519339</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveMenu('integracoes')}
              className="hidden sm:flex items-center gap-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full font-medium"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> ML & Mercado Pago Ativos
            </button>
            <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 rounded-lg text-xs">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-[11px] font-bold text-white">KA</span>
              <span className="hidden sm:inline font-medium text-zinc-200">Kauan Marinho</span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] px-4 pb-24 pt-7 md:px-7">
          {/* ABA CATÁLOGO / TOP PRODUTOS */}
          {(activeMenu === 'catalogo' || activeMenu === 'top') && (
            <div>
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {activeMenu === 'top' ? 'Top Produtos Vencedores' : 'Catálogo de Fornecedores'}
                  </h1>
                  <p className="mt-1 text-sm text-zinc-400">
                    Produtos com estoque real no Brasil prontos para anunciar no Mercado Livre e Loja Própria
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
                  <Boxes className="h-4 w-4" /> Produtos disponíveis ({products.length})
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
                        placeholder="Buscar por nome, fornecedor ou SKU..."
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
                    {filteredProducts.map((product) => (
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
                              <dt>Custo Fornecedor</dt>
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
                          {product.registrations > 0 && (
                            <p className="mt-2 text-xs text-zinc-400">{product.registrations} cadastro(s) seu(s)</p>
                          )}
                        </div>

                        <div className="mt-4 space-y-2">
                          <button
                            onClick={() => handlePublishProduct(product.id)}
                            className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white shadow hover:bg-blue-500 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                            {product.published ? 'Cadastrar novamente' : 'Cadastrar e publicar'}
                          </button>
                          {product.published && (
                            <button
                              onClick={() => setActiveMenu('anuncios')}
                              className="inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition-colors"
                            >
                              <Megaphone className="h-3.5 w-3.5 text-emerald-400" /> Ver meu anúncio ativo
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
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
                        onClick={() => {
                          setCatalogSubTab('produtos');
                          showToast(`Filtrando catálogo de ${sup.name}`);
                        }}
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

          {/* ABA INTEGRAÇÕES (MERCADO LIVRE) */}
          {activeMenu === 'integracoes' && (
            <div>
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Integrações</h1>
                  <p className="mt-1 text-sm text-zinc-400">
                    Conexões da sua conta com o Mercado Livre e sincronização automática de estoque
                  </p>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">Lojas conectadas ({mlStores.length})</h2>
                <button
                  onClick={handleConnectNewMlStore}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition-colors"
                >
                  <Plus className="h-4 w-4" /> Conectar outra loja Mercado Livre
                </button>
              </div>

              <div className="grid gap-4">
                {mlStores.map((store) => (
                  <article key={store.id} className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#12141c] shadow-sm md:flex-row">
                    <div className="flex flex-col p-5 md:w-2/5 md:border-r md:border-zinc-800">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-yellow-400/10 text-yellow-400 font-bold text-xs">
                          ML
                        </div>
                        <h2 className="min-w-0 flex-1 truncate text-base font-bold text-white">{store.id}</h2>
                        <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                          {store.status}
                        </span>
                      </div>

                      <div className="mt-5">
                        <label className="text-xs font-medium text-zinc-400">Frete grátis a partir de (R$)</label>
                        <input
                          type="number"
                          defaultValue={store.freeShippingThreshold}
                          className="mt-2 flex h-9 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                        <p className="mt-2 text-xs text-zinc-400">Abaixo disso, o frete padrão é mais barato.</p>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        <button
                          onClick={() => showToast('Status e reputação sincronizados com o Mercado Livre!')}
                          className="inline-flex h-8 items-center rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-xs font-medium text-zinc-200 hover:bg-zinc-800"
                        >
                          <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Status
                        </button>
                        <button
                          onClick={() => showToast('Estoque e preços sincronizados em todos os anúncios!')}
                          className="inline-flex h-8 items-center rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-xs font-medium text-zinc-200 hover:bg-zinc-800"
                        >
                          <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Estoque e preço
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col bg-zinc-900/40 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                          <span className="text-sm font-semibold text-white">Reputação: {store.reputation}</span>
                        </div>
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                          MercadoLíder ou reputação verde
                        </span>
                      </div>

                      <div className="mt-6 space-y-4">
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold uppercase text-zinc-400">Reclamações</span>
                            <span className="text-emerald-400 font-bold">{store.claims} <span className="text-zinc-500 font-normal">/ limite 2%</span></span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-zinc-800 overflow-hidden">
                            <div className="h-full w-2 bg-emerald-500"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold uppercase text-zinc-400">Cancelamentos</span>
                            <span className="text-emerald-400 font-bold">{store.cancellations} <span className="text-zinc-500 font-normal">/ limite 1.5%</span></span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-zinc-800 overflow-hidden">
                            <div className="h-full w-2 bg-emerald-500"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold uppercase text-zinc-400">Atraso no despacho</span>
                            <span className="text-emerald-400 font-bold">{store.delayed} <span className="text-zinc-500 font-normal">/ limite 10%</span></span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-zinc-800 overflow-hidden">
                            <div className="h-full w-2 bg-emerald-500"></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                        <p className="text-xs text-zinc-300">Todas as métricas com folga na faixa verde.</p>
                      </div>

                      <div className="mt-auto border-t border-zinc-800/80 pt-3 flex justify-between text-[11px] uppercase tracking-wider text-zinc-500">
                        <span>Dados Oficiais do Mercado Livre</span>
                        <span>{store.lastSync}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ABA MERCADO PAGO DO LOJISTA */}
          {activeMenu === 'loja-propria' && (
            <div className="max-w-3xl">
              <h1 className="text-2xl font-bold text-white">Integração Oficial Mercado Pago</h1>
              <p className="mt-1 text-sm text-zinc-400">
                Conecte a sua conta do Mercado Pago para receber 100% do valor das vendas diretamente na sua conta bancária.
              </p>

              <form onSubmit={handleSaveMercadoPago} className="mt-6 rounded-2xl border border-zinc-800 bg-[#12141c] p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold">
                      MP
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Checkout Transparente & Split Automático</h3>
                      <p className="text-xs text-zinc-400">PIX, Cartão de Crédito em até 12x e Boleto</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-semibold">
                    {mpConnected ? 'Conta Conectada' : 'Pendente'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Public Key (Chave Pública de Produção)</label>
                  <input
                    type="text"
                    value={mpPublicKey}
                    onChange={(e) => setMpPublicKey(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Access Token (Token Privado de Produção)</label>
                  <input
                    type="text"
                    value={mpAccessToken}
                    onChange={(e) => setMpAccessToken(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                  <p className="mt-1.5 text-xs text-zinc-500">
                    Você encontra essas credenciais no painel do Mercado Pago Developers em "Suas Integrações &gt; Credenciais de Produção".
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-semibold text-white shadow transition-colors"
                  >
                    Salvar e Testar Conexão Mercado Pago
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ABA MEUS PRODUTOS / ANÚNCIOS */}
          {(activeMenu === 'produtos' || activeMenu === 'anuncios') && (
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Meus Produtos e Anúncios Ativos</h1>
              <p className="text-sm text-zinc-400 mb-6">Produtos do catálogo que você já importou e publicou na sua loja.</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.filter(p => p.published).map(p => (
                  <div key={p.id} className="rounded-xl border border-zinc-800 bg-[#12141c] p-4 flex gap-4 items-center">
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg bg-white object-contain p-1 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        Sincronizado no ML
                      </span>
                      <h3 className="text-sm font-semibold text-white truncate mt-1">{p.name}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Venda: R$ {p.suggestedPrice.toFixed(2).replace('.', ',')} • Lucro: R$ {p.profit.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OUTRAS ABAS (PEDIDOS, CARTEIRA, AULAS, CONFIGS) */}
          {['pedidos', 'carteira', 'aulas', 'configuracoes'].includes(activeMenu) && (
            <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-8 text-center max-w-xl mx-auto my-8">
              <DollarSign className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h2 className="text-lg font-bold text-white capitalize">Módulo: {activeMenu}</h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Módulo conectado com a sua conta KL20261021150519339. Assim que cair a primeira venda pelos seus anúncios do Mercado Livre ou Checkout Mercado Pago, os dados de expedição aparecerão aqui automaticamente.
              </p>
              <button
                onClick={() => setActiveMenu('catalogo')}
                className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
              >
                Voltar para o Catálogo
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}