# Trakt — Landing Page

Landing page do Trakt, SaaS de rastreamento de leads para profissionais que vendem pelo Instagram.

**Stack:** React 19 · Vite 8 · CSS puro · deploy via Railway

---

## Desenvolvimento local

```bash
# instalar dependências
npm install

# rodar em modo dev (hot reload)
npm run dev
# → http://localhost:5173

# build de produção
npm run build

# testar o build localmente
npm start
# → http://localhost:3000
```

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
cp .env.example .env.local
```

| Variável | Descrição | Exemplo |
|---|---|---|
| `VITE_API_URL` | URL da API backend (waitlist) | `https://trakt-production.up.railway.app` |
| `VITE_WAITLIST_URL` | Override do link de CTA da waitlist | `#waitlist` |

> Variáveis Vite devem ter o prefixo `VITE_` para ficarem acessíveis no browser.

---

## Deploy no Railway

### 1. Criar o projeto

1. Acesse [railway.app](https://railway.app) e clique em **New Project**
2. Escolha **Deploy from GitHub repo**
3. Selecione este repositório

Railway detecta automaticamente o `railway.json` e configura o build.

### 2. Configurar variáveis de ambiente

No painel do Railway, vá em **Variables** e adicione:

```
VITE_API_URL=https://sua-api.up.railway.app
VITE_WAITLIST_URL=#waitlist
```

> ⚠️ Variáveis com prefixo `VITE_` são embebidas no bundle em build time. Toda vez que mudar uma variável, é necessário fazer um novo deploy para refletir.

### 3. Domínio

- Railway gera um domínio automático `*.up.railway.app`
- Para domínio customizado: **Settings → Networking → Custom Domain**

### 4. Deploy automático

Por padrão, qualquer push na branch `main` dispara um novo deploy. Para mudar isso, vá em **Settings → Source Repo → Branch**.

---

## Como o build funciona

```
npm ci                  # instala dependências
npm run build           # vite build → gera /dist
npm start               # serve -s dist -l $PORT
```

O `serve` sobe um servidor HTTP estático apontando para `/dist`. A flag `-s` ativa modo SPA (redireciona 404 → `index.html`).

Railway injeta a variável `PORT` automaticamente — o `start` script lê via `${PORT:-3000}` (fallback 3000 em local).

---

## Estrutura

```
src/
  components/
    Navbar.jsx      # navbar sticky com blur
    Hero.jsx        # above the fold + AI demo + mockup
    Features.jsx    # card IA em destaque + 4 features
    Pricing.jsx     # 4 planos (Starter / Grow / Pro / Agency)
    Waitlist.jsx    # formulário de captura de email
    Footer.jsx
  config/
    index.js        # variáveis de ambiente centralizadas
  index.css         # design system (branco + azul)
  App.jsx
docs/               # protótipos e documentação do produto
railway.json        # configuração de deploy
```

---

## Seções da landing

| Seção | ID | Descrição |
|---|---|---|
| Hero | — | Headline, AI demo inline, stats, mockup do dashboard |
| Features | `#features` | Card IA destacado + 4 funcionalidades |
| Pricing | `#precos` | 4 planos com destaque no Grow |
| Waitlist | `#waitlist` | Captura de email para acesso antecipado |
