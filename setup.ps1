Write-Host "Montando arquitetura do ForneShop..." -ForegroundColor Cyan

# 1. Criação dos diretórios
$directories = @("backend", "frontend/src")
foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# 2. Arquivos de Configuração da Raiz
Set-Content -Path ".gitignore" -Value @'
node_modules/
.env
dist/
build/
.DS_Store
'@ -Encoding UTF8

# 3. Backend (Webhook e Automação de E-mail)
Set-Content -Path "backend/package.json" -Value @'
{
  "name": "forneshop-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.38.4",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "resend": "^2.0.0"
  }
}
'@ -Encoding UTF8

Set-Content -Path "backend/.env.example" -Value @'
PORT=3000
CAKTO_WEBHOOK_SECRET=sua_chave_secreta_cakto
RESEND_API_KEY=re_sua_chave_do_resend
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_anonima_supabase
'@ -Encoding UTF8

Set-Content -Path "backend/server.js" -Value @'
require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

const CAKTO_WEBHOOK_SECRET = process.env.CAKTO_WEBHOOK_SECRET;
const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
}));

function verificarAssinatura(req) {
    const signature = req.headers['x-cakto-signature'];
    if (!signature) return false;
    const hmac = crypto.createHmac('sha256', CAKTO_WEBHOOK_SECRET);
    const digest = Buffer.from(hmac.update(req.rawBody).digest('hex'), 'utf8');
    const checksum = Buffer.from(signature, 'utf8');
    return checksum.length === digest.length && crypto.timingSafeEqual(digest, checksum);
}

app.post('/webhook/pagamento-aprovado', async (req, res) => {
    try {
        if (!verificarAssinatura(req)) {
            return res.status(401).send('Não autorizado');
        }
        const dados = req.body;
        if (dados.status !== 'approved') return res.status(200).send('Ignorado');

        const email = dados.customer.email;
        const nome = dados.customer.name;
        const senha = Math.random().toString(36).slice(-8) + 'Fs!';

        const { data: auth, error: authError } = await supabase.auth.admin.createUser({
          email, password: senha, email_confirm: true, user_metadata: { name: nome }
        });
        if (authError) throw authError;

        await supabase.from('subscriptions').insert({
            user_id: auth.user.id, status: 'active', plan: dados.product.name
        });

        await resend.emails.send({
            from: 'ForneShop <acesso@forneshop.com>',
            to: email,
            subject: 'Seu acesso foi liberado!',
            html: `<p>Olá ${nome}, sua senha provisória é: <strong>${senha}</strong></p>`
        });

        res.status(200).send('Webhook processado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno');
    }
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));
'@ -Encoding UTF8

# 4. Frontend (React + Vite + Tailwind)
Set-Content -Path "frontend/package.json" -Value @'
{
  "name": "forneshop-frontend",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.4"
  }
}
'@ -Encoding UTF8

Set-Content -Path "frontend/vite.config.js" -Value @'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
'@ -Encoding UTF8

Set-Content -Path "frontend/tailwind.config.js" -Value @'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
'@ -Encoding UTF8

Set-Content -Path "frontend/postcss.config.js" -Value @'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
'@ -Encoding UTF8

Set-Content -Path "frontend/index.html" -Value @'
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ForneShop</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
'@ -Encoding UTF8

Set-Content -Path "frontend/src/main.jsx" -Value @'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
'@ -Encoding UTF8

Set-Content -Path "frontend/src/index.css" -Value @'
@tailwind base;
@tailwind components;
@tailwind utilities;
'@ -Encoding UTF8

Set-Content -Path "frontend/src/App.jsx" -Value @'
import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600">ForneShop Dashboard</h1>
      {/* 
         Cole aqui todo o código do App.jsx (Painel completo com o menu lateral e as abas) 
         que desenvolvemos nas mensagens anteriores.
      */}
    </div>
  );
}
'@ -Encoding UTF8

Write-Host "Extração e montagem concluídas com sucesso!" -ForegroundColor Green