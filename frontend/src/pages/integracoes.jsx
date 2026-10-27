import React from 'react';
import { Store, Plug, RefreshCw, Trash2, Unplug } from 'lucide-react';

export default function Integracoes() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-24 pt-7 md:px-7 lg:pb-12 lg:pt-9">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-[1.75rem] font-semibold leading-[1.15] text-balance text-foreground md:text-[2rem]">Integrações</h1>
          <p className="mt-2 text-[15px] leading-normal text-muted-foreground md:text-base">
            Conexões da sua conta com o Mercado Livre e Mercado Pago
          </p>
        </div>
      </div>

      <section aria-label="Conexões do Mercado Livre">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Lojas conectadas</h2>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            <Plug className="size-4" /> Conectar outra loja
          </button>
        </div>

        <div className="grid gap-4">
          <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:flex-row">
            
            {/* Bloco esquerdo: Detalhes da Conta */}
            <div className="flex flex-col p-5 md:w-2/5 md:border-r md:border-border/60">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                  <Store className="size-5 text-primary" />
                </div>
                <h2 className="min-w-0 flex-1 truncate font-heading text-base font-bold">KL20261021150519339</h2>
                <span className="inline-flex items-center rounded-full border bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success border-success/30">
                  Conectada
                </span>
              </div>

              <div className="mt-5">
                <label className="text-xs font-medium text-muted-foreground">Frete grátis a partir de (R$)</label>
                <input 
                  className="mt-2 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                  type="number" 
                  defaultValue="79" 
                />
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Abaixo disso, o frete padrão é aplicado.</p>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <button className="inline-flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-accent hover:text-accent-foreground">
                  <Unplug className="mr-1 size-3.5" /> Desconectar
                </button>
                <button className="inline-flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-accent hover:text-accent-foreground">
                  <RefreshCw className="mr-1 size-3.5" /> Estoque e preço
                </button>
              </div>
            </div>

            {/* Bloco direito: Métricas e Reputação */}
            <div className="flex flex-1 flex-col bg-muted/30 p-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-heading text-sm font-semibold">
                  <span className="size-2 rounded-full bg-success"></span> Reputação: Verde
                </span>
                <span className="rounded-full border bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success border-success/30">
                  MercadoLíder
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                    <span>Reclamações</span>
                    <span className="text-success">0.00% / limite 2%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                    <div className="h-full w-0 bg-success"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                    <span>Cancelamentos</span>
                    <span className="text-success">0.00% / limite 1.5%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                    <div className="h-full w-0 bg-success"></div>
                  </div>
                </div>
              </div>

              <div className="mt-auto border-t border-border/60 pt-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground flex justify-between">
                <span>Dados do Mercado Livre</span>
                <span>Sincronizado hoje</span>
              </div>
            </div>

          </article>
        </div>
      </section>
    </div>
  );
}