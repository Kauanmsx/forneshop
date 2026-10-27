import React, { useState, useEffect } from 'react';
import { Flame, Handshake, Boxes, Package, Store, Settings, Search, ShieldCheck, LogOut, ShoppingCart, Wallet, GraduationCap } from 'lucide-react';
import Integracoes from './pages/integracoes.jsx';


<Route path="/app/integracoes" element={<Integracoes />} />
const API_URL = ''; // Rotas relativas para comunicar diretamente com as Serverless Functions da Vercel

const PLANS = {
  vitalicio: {
    id: 'vitalicio',
    name: 'Acesso Vitalício',
    badge: 'MAIS VANTAJOSO • PAGAMENTO ÚNICO',
    price: 'R$ 197,00',
    period: '/único',
    description: 'Pague uma única vez e tenha acesso liberado para sempre, sem mensalidades.',
    url: 'https://pay.cakto.com.br/70kkd89_1244008',
  },
  mensal: {
    id: 'mensal',
    name: 'Plano Mensal',
    badge: 'ASSINATURA RECORRENTE',
    price: 'R$ 150,00',
    period: '/mês',
    description: 'Acesso completo à plataforma e fornecedores com renovação mensal.',
    url: 'https://pay.cakto.com.br/uc8mrsx',
  }
};

const Sidenav = ({ currentTab, setCurrentTab, handleLogout }) => {
  const menuItems = [
    { id: 'home', label: 'Top Produtos', icon: Flame },
    { id: 'afiliado', label: 'Afiliado', icon: Handshake },
    { id: 'catalogo', label: 'Catálogo', icon: Boxes },
    { id: 'meus_produtos', label: 'Meus Produtos', icon: Package },
    { id: 'anuncios', label: 'Anúncios', icon: Store },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 hidden md:flex">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <ShieldCheck className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold text-white tracking-wider">FORNESHOP</span>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Sair da Conta
      </button>
    </aside>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTab, setCurrentTab] = useState('home');
  const [authView, setAuthView] = useState('checkout'); // 'checkout' ou 'login'
  
  // Estados do Checkout e Pagamento
  const [selectedPlan, setSelectedPlan] = useState('vitalicio');
  const [buyName, setBuyName] = useState('');
  const [buyEmail, setBuyEmail] = useState('');
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);

  // Estados do Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Estados dos Produtos / Catálogo vindos da API
  const [products, setProducts] = useState([]);

  const activePlan = PLANS[selectedPlan];

  // Carregar produtos da API Serverless ao iniciar ou mudar de separador
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch(err => console.error("Erro ao carregar produtos:", err));
  }, []);

  const handleSimulatePayment = async (e) => {
    e.preventDefault();
    setLoadingCheckout(true);
    setCheckoutStatus(null);
    try {
      const response = await fetch(`${API_URL}/api/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'approved',
          customer: { name: buyName, email: buyEmail },
          product: { name: activePlan.name }
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erro ao processar pagamento.');
      
      setCheckoutStatus({
        type: 'success',
        message: `Pagamento (${activePlan.name}) confirmado! Enviamos sua senha provisória para ${buyEmail}.`
      });
      setLoginEmail(buyEmail);
    } catch (err) {
      setCheckoutStatus({ type: 'error', message: err.message });
    } finally {
      setLoadingCheckout(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoadingLogin(true);
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Acesso negado.');
      
      setIsAuthenticated(true);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoadingLogin(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col justify-center py-10 px-4 sm:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
          <h2 className="text-4xl font-black text-white tracking-tight">FORNESHOP</h2>
          <p className="mt-2 text-sm text-blue-300">Plataforma exclusiva de fornecedores e automação de dropshipping</p>
          
          <div className="mt-6 inline-flex rounded-lg bg-white/5 p-1 border border-white/10">
            <button
              onClick={() => setAuthView('checkout')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${authView === 'checkout' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              1. Adquirir Acesso (Planos)
            </button>
            <button
              onClick={() => setAuthView('login')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${authView === 'login' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              2. Já Paguei (Fazer Login)
            </button>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          {authView === 'checkout' ? (
            <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">1. Escolha o seu plano</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {Object.values(PLANS).map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all ${
                      selectedPlan === plan.id ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10' : 'border-slate-800 bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase block mb-1">{plan.badge}</span>
                    <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-2xl font-black text-white">{plan.price}</span>
                      <span className="text-xs text-slate-400 ml-1">{plan.period}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSimulatePayment} className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-2">2. Onde devemos enviar seu acesso?</h3>
                <p className="text-xs text-slate-400 mb-4">Assim que o pagamento constar na Cakto, seu login e senha serão gerados e enviados imediatamente para este e-mail.</p>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Seu nome completo</label>
                  <input
                    type="text"
                    required
                    value={buyName}
                    onChange={(e) => setBuyName(e.target.value)}
                    placeholder="Ex: Kauan Marinho"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">E-mail de cadastro (receberá a senha)</label>
                  <input
                    type="email"
                    required
                    value={buyEmail}
                    onChange={(e) => setBuyEmail(e.target.value)}
                    placeholder="exemplo@gmail.com"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {checkoutStatus && (
                  <div className={`p-4 rounded-lg text-sm font-medium ${checkoutStatus.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                    {checkoutStatus.message}
                  </div>
                )}

                <a
                  href={activePlan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 transition-all shadow-lg shadow-emerald-600/20"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Finalizar Compra ({activePlan.price}) na Cakto
                </a>

                <button
                  type="submit"
                  disabled={loadingCheckout}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 px-4 transition-all border border-slate-700 text-xs"
                >
                  {loadingCheckout ? 'Processando...' : 'Simular Pagamento Confirmado (Testar E-mail + Senha)'}
                </button>
              </form>

              <div className="mt-6 text-center border-t border-slate-800 pt-4">
                <span className="text-xs text-slate-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Ambiente seguro via Cakto Pagamentos
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-2">Acesso à Plataforma</h3>
              <p className="text-xs text-slate-400 mb-6">Insira os dados enviados para o seu e-mail após a confirmação do pagamento.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">E-mail de acesso</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="seu-email@gmail.com"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Senha provisória</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {loginError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loadingLogin}
                  className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 transition-all shadow-lg shadow-blue-600/20"
                >
                  {loadingLogin ? 'A entrar...' : 'Entrar no Sistema'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidenav currentTab={currentTab} setCurrentTab={setCurrentTab} handleLogout={() => setIsAuthenticated(false)} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
              Painel Ativo
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
              KM
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full">
          {currentTab === 'home' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Top Produtos do Catálogo</h1>
                <p className="text-sm text-slate-400">Produtos com alta margem de lucro validados para dropshipping.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map(product => (
                    <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{product.category}</span>
                        <h3 className="text-lg font-bold text-white mt-2">{product.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">{product.description}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-lg font-bold text-emerald-400">R$ {product.price.toFixed(2)}</span>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                          Ver Fornecedor
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-slate-500">
                    A carregar catálogo de produtos...
                  </div>
                )}
              </div>
            </div>
          )}

          {currentTab === 'catalogo' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-white">Catálogo Geral de Fornecedores</h1>
              <p className="text-sm text-slate-400">Explore todos os fornecedores homologados na plataforma.</p>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
                Lista completa de fornecedores sincronizada com sucesso.
              </div>
            </div>
          )}

          {currentTab !== 'home' && currentTab !== 'catalogo' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-white capitalize">{currentTab.replace('_', ' ')}</h1>
              <p className="text-sm text-slate-400">Módulo operacional pronto para customização.</p>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
                Módulo em funcionamento na estrutura serverless da Vercel.
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}