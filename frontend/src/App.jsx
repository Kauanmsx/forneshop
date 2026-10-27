import React, { useState } from 'react';
import { Flame, Handshake, Boxes, Package, Megaphone, ShoppingCart, Wallet, Bell, Plug, GraduationCap, Store, Settings, Search, ShieldCheck, CheckCircle2, Lock, Mail, CreditCard, Sparkles, ArrowRight, Crown } from 'lucide-react';

const API_URL = 'https://forneshop-j67a-eta.vercel.app';

// Configuração oficial dos teus planos na Cakto
const PLANS = {
  vitalicio: {
    id: 'vitalicio',
    name: 'Acesso Vitalício',
    badge: 'MAIS VANTAJOSO • PAGAMENTO ÚNICO',
    price: 'R$ 197,00',
    period: '/único',
    description: 'Pague uma única vez e tenha acesso liberado para sempre, sem mensalidades.',
    url: 'https://pay.cakto.com.br/76kkd89_1244008',
  },
  mensal: {
    id: 'mensal',
    name: 'Plano Mensal',
    badge: 'ASSINATURA RECORRENTE',
    price: 'R$ 150,00',
    period: '/mês',
    description: 'Acesso completo à plataforma e fornecedores com renovação mensal.',
    url: 'https://pay.cakto.com.br/ue8mrsx',
  },
};

const Sidenav = ({ currentTab, setCurrentTab }) => {
  const menuItems = [
    { id: 'home', label: 'Top produtos', icon: Flame },
    { id: 'afiliado', label: 'Afiliado', icon: Handshake },
    { id: 'catalogo', label: 'Catálogo', icon: Boxes },
    { id: 'meus_produtos', label: 'Meus produtos', icon: Package },
    { id: 'anuncios', label: 'Anúncios', icon: Megaphone },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingCart },
    { id: 'carteira', label: 'Carteira', icon: Wallet },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'integracoes', label: 'Integrações', icon: Plug },
    { id: 'aulas', label: 'Aulas', icon: GraduationCap },
    { id: 'loja_propria', label: 'Criar minha loja', icon: Store },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-gray-200 bg-white lg:flex">
      <div className="flex h-14 items-center justify-center border-b border-gray-200 px-4">
        <h1 className="text-xl font-black text-blue-600">FORNESHOP</h1>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex w-full h-11 items-center gap-3 rounded-xl px-3.5 text-[15px] transition-colors cursor-pointer ${
                isActive ? 'bg-blue-600 font-medium text-white shadow-md shadow-blue-500/20' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="h-[19px] w-[19px] shrink-0" />
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

const Header = ({ user, setIsAuthenticated }) => (
  <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-gray-200 bg-white/95 px-4 backdrop-blur">
    <div className="flex items-center gap-3">
      <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 sm:flex">
        <Store className="h-4 w-4 text-blue-600" />
        <span className="text-xs font-medium text-gray-700">ASSINANTE ATIVO</span>
        <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 cursor-pointer">
        <Bell className="h-5 w-5" />
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">2</span>
      </button>
      <button 
        onClick={() => setIsAuthenticated(false)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
        title="Sair"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-[11px] font-bold text-white">
          {(user?.name || 'US').slice(0, 2).toUpperCase()}
        </span>
        <span className="text-sm font-medium text-gray-700">{user?.name || 'Assinante'} (Sair)</span>
      </button>
    </div>
  </header>
);

const HomeView = ({ user }) => (
  <div className="animate-in fade-in duration-300">
    <header className="mb-10">
      <h1 className="text-[1.75rem] font-bold text-gray-900 md:text-[2rem] mb-4">
        Olá, {user?.name?.split(' ')[0] || 'Parceiro'}. Como estão as vendas hoje?
      </h1>
      <form className="relative" onSubmit={(e) => e.preventDefault()}>
        <input placeholder="Pesquise por pedido ou comprador..." className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-7 pr-16 text-base shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-blue-600 p-2.5 text-white"><Search className="h-5 w-5" /></button>
      </form>
    </header>
    <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Seu saldo livre agora</h2>
          <p className="text-sm text-gray-500">Disponível para pagar fornecedores</p>
        </div>
        <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-medium transition shadow-md">Recarregar</button>
      </div>
      <p className="mb-10 text-4xl font-bold md:text-5xl text-gray-900">R$ 0,00</p>
      <div className="grid gap-3 border-t border-gray-100 pt-6 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Total na carteira</p>
          <p className="text-lg font-bold text-gray-900">R$ 0,00</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Reservado</p>
          <p className="text-lg font-bold text-gray-400">R$ 0,00</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Produtos</p>
          <p className="text-lg font-bold text-gray-900">10</p>
        </div>
      </div>
    </div>
  </div>
);

const IntegrationsView = () => (
  <div className="animate-in fade-in duration-300">
    <div className="mb-6">
      <h1 className="text-[1.75rem] font-bold text-gray-900">Integrações</h1>
      <p className="mt-2 text-gray-500">Conexões da sua conta com o Mercado Livre</p>
    </div>
    <section className="max-w-5xl">
      <article className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm md:flex-row overflow-hidden p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 font-bold text-yellow-600">ML</div>
            <h2 className="font-bold text-gray-900 text-lg">Conta Principal Mercado Livre</h2>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Conectada</span>
          </div>
          <p className="text-sm text-gray-500">Sincronização automática de pedidos, estoque e preços ativada com sucesso.</p>
        </div>
      </article>
    </section>
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('checkout'); // 'checkout' ou 'login'
  const [selectedPlan, setSelectedPlan] = useState('vitalicio'); // 'vitalicio' ou 'mensal'
  const [currentTab, setCurrentTab] = useState('home');

  // Estados do Checkout
  const [buyName, setBuyName] = useState('');
  const [buyEmail, setBuyEmail] = useState('');
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  // Estados do Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  const activePlan = PLANS[selectedPlan];

  // Simula a confirmação do pagamento no backend local e dispara o e-mail via Resend
  const handleSimulatePayment = async (e) => {
    e.preventDefault();
    setLoadingCheckout(true);
    setCheckoutStatus(null);
    try {
      const response = await fetch(`${API_URL}/api/test-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: buyName, email: buyEmail, plan: activePlan.name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erro ao processar pagamento');

      setCheckoutStatus({
        type: 'success',
        message: `Pagamento (${activePlan.name}) confirmado! Enviamos sua senha provisória para ${buyEmail}.`,
        tempPassword: data.tempPassword,
      });
      setLoginEmail(buyEmail);
    } catch (err) {
      setCheckoutStatus({
        type: 'error',
        message: 'Não foi possível conectar ao servidor backend (porta 3000). Verifique se o backend está rodando!',
      });
    } finally {
      setLoadingCheckout(false);
    }
  };

  // Abre o link oficial da Cakto do plano escolhido já com nome e e-mail do cliente
  const handleGoToCakto = () => {
    if (!buyEmail || !buyName) {
      alert('Por favor, preencha seu nome e o e-mail onde deseja receber o acesso antes de ir para o pagamento.');
      return;
    }
    const url = `${activePlan.url}?email=${encodeURIComponent(buyEmail)}&name=${encodeURIComponent(buyName)}`;
    window.open(url, '_blank');
  };

  // Valida o login no Backend
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    setLoginError('');
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        setLoginError(data.error || 'Acesso negado.');
        return;
      }
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setLoginError('Erro ao conectar com o servidor. Verifique se o backend está rodando na porta 3000.');
    } finally {
      setLoadingLogin(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center mb-6">
          <h2 className="text-4xl font-black text-white tracking-tight">FORNESHOP</h2>
          <p className="mt-2 text-sm text-blue-300">Plataforma exclusiva de fornecedores e automação de dropshipping</p>

          <div className="mt-6 inline-flex rounded-xl bg-white/5 p-1 border border-white/10">
            <button
              onClick={() => setAuthView('checkout')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                authView === 'checkout' ? 'bg-blue-600 text-white shadow' : 'text-gray-300 hover:text-white'
              }`}
            >
              1. Adquirir Acesso (Planos)
            </button>
            <button
              onClick={() => setAuthView('login')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                authView === 'login' ? 'bg-blue-600 text-white shadow' : 'text-gray-300 hover:text-white'
              }`}
            >
              2. Já Paguei (Fazer Login)
            </button>
          </div>
        </div>

        {/* ABA 1: ESCOLHA DO PLANO E PAGAMENTO */}
        {authView === 'checkout' && (
          <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
            <div className="grid md:grid-cols-5 bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
              
              {/* Coluna Esquerda: Detalhes do Plano Selecionado */}
              <div className="md:col-span-2 bg-gradient-to-b from-blue-600 to-blue-900 p-8 text-white flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" /> {activePlan.badge}
                  </span>
                  <h3 className="mt-4 text-2xl font-black">{activePlan.name}</h3>
                  <p className="mt-2 text-sm text-blue-100">{activePlan.description}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black">{activePlan.price}</span>
                    <span className="text-sm text-blue-200">{activePlan.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-blue-50">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-green-300" /> Catálogo completo de fornecedores</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-green-300" /> Integração direta com Mercado Livre</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-green-300" /> Sincronização de estoque automática</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-green-300" /> Credenciais enviadas na hora por e-mail</li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/20 flex items-center gap-2 text-xs text-blue-100">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-green-300" />
                  Ambiente seguro via Cakto Pagamentos
                </div>
              </div>

              {/* Coluna Direita: Seleção de Plano + Cadastro do E-mail */}
              <div className="md:col-span-3 p-8">
                <h4 className="text-lg font-bold text-white mb-3">1. Escolha o seu plano</h4>
                
                {/* Cards Seletores de Plano */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('vitalicio')}
                    className={`relative p-4 rounded-2xl border text-left transition cursor-pointer ${
                      selectedPlan === 'vitalicio'
                        ? 'border-blue-400 bg-blue-600/20 shadow-lg shadow-blue-500/10'
                        : 'border-white/15 bg-black/20 hover:bg-white/5'
                    }`}
                  >
                    <span className="absolute -top-2.5 right-3 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Crown className="h-3 w-3" /> VITALÍCIO
                    </span>
                    <p className="text-xs text-blue-200 font-medium">Acesso Vitalício</p>
                    <p className="text-xl font-black text-white mt-0.5">R$ 197,00</p>
                    <p className="text-[11px] text-gray-400 mt-1">Pagamento único</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan('mensal')}
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                      selectedPlan === 'mensal'
                        ? 'border-blue-400 bg-blue-600/20 shadow-lg shadow-blue-500/10'
                        : 'border-white/15 bg-black/20 hover:bg-white/5'
                    }`}
                  >
                    <p className="text-xs text-blue-200 font-medium">Plano Mensal</p>
                    <p className="text-xl font-black text-white mt-0.5">R$ 150,00</p>
                    <p className="text-[11px] text-gray-400 mt-1">Cobrado mensalmente</p>
                  </button>
                </div>

                <h4 className="text-lg font-bold text-white mb-1">2. Onde devemos enviar seu acesso?</h4>
                <p className="text-xs text-gray-300 mb-4">
                  Assim que o pagamento constar na Cakto, seu login e senha serão gerados e enviados imediatamente para este e-mail.
                </p>

                <form onSubmit={handleSimulatePayment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-200 mb-1">Seu nome completo</label>
                    <input
                      type="text"
                      required
                      value={buyName}
                      onChange={(e) => setBuyName(e.target.value)}
                      placeholder="Ex: Kauan Marinho"
                      className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-200 mb-1">E-mail de cadastro (receberá a senha)</label>
                    <input
                      type="email"
                      required
                      value={buyEmail}
                      onChange={(e) => setBuyEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-blue-500"
                    />
                  </div>

                  {checkoutStatus && (
                    <div className={`p-4 rounded-xl text-sm border ${
                      checkoutStatus.type === 'success'
                        ? 'bg-green-500/20 border-green-500/40 text-green-200'
                        : 'bg-red-500/20 border-red-500/40 text-red-200'
                    }`}>
                      <p className="font-semibold">{checkoutStatus.message}</p>
                      {checkoutStatus.tempPassword && (
                        <div className="mt-2 p-2.5 bg-black/40 rounded-lg text-xs text-white flex items-center justify-between">
                          <span>Senha gerada: <strong className="text-blue-400 font-mono text-sm">{checkoutStatus.tempPassword}</strong></span>
                          <button
                            type="button"
                            onClick={() => {
                              setLoginPassword(checkoutStatus.tempPassword);
                              setAuthView('login');
                            }}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded font-bold cursor-pointer"
                          >
                            Ir para o Login →
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-2 space-y-2.5">
                    {/* Botão Oficial Cakto */}
                    <button
                      type="button"
                      onClick={handleGoToCakto}
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-green-600 hover:bg-green-500 transition shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CreditCard className="h-5 w-5" />
                      Finalizar Compra ({activePlan.price}) na Cakto
                    </button>

                    {/* Botão de Simulação para testar geração de acesso e e-mail */}
                    <button
                      type="submit"
                      disabled={loadingCheckout}
                      className="w-full py-2.5 px-4 rounded-xl font-semibold text-blue-200 bg-white/10 hover:bg-white/20 border border-white/15 transition flex items-center justify-center gap-2 text-xs cursor-pointer"
                    >
                      <Mail className="h-4 w-4" />
                      {loadingCheckout ? 'Gerando acesso e enviando e-mail...' : 'Simular Pagamento Confirmado (Testar E-mail + Senha)'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: LOGIN RESTRITO A ASSINANTES */}
        {authView === 'login' && (
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white/10 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl border border-white/20">
              <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Lock className="h-4 w-4" /> Área exclusiva para clientes ativos
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-xs text-red-200">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">E-mail utilizado na compra</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Senha enviada no seu e-mail</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Ex: FS-A1B2C3"
                    className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingLogin}
                  className="w-full py-3 px-4 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loadingLogin ? 'Verificando pagamento...' : 'Entrar na plataforma'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-gray-400">
                Ainda não possui acesso?{' '}
                <button onClick={() => setAuthView('checkout')} className="text-blue-400 hover:underline font-semibold cursor-pointer">
                  Escolha um plano aqui
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidenav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="lg:pl-60">
        <Header user={user} setIsAuthenticated={setIsAuthenticated} />
        <main className="mx-auto max-w-[1600px] px-4 pb-24 pt-7 md:px-7">
          {currentTab === 'home' && <HomeView user={user} />}
          {currentTab === 'integracoes' && <IntegrationsView />}
          {currentTab !== 'home' && currentTab !== 'integracoes' && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Boxes className="w-16 h-16 mb-4 text-gray-300" />
              <h2 className="text-xl font-semibold text-gray-900">Seção em desenvolvimento</h2>
              <p className="text-sm text-gray-500">A aba selecionada ({currentTab}) está pronta para receber os componentes.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}