# Raio⚡ — Roadmap de Implementação

## Princípio guia

> Construir o mínimo que prova o valor central: **capturar uma DM e saber de onde veio.**

Tudo que não serve a isso é pós-MVP.

---

## Fase 0 — Setup (1-2 dias)

Antes de escrever uma linha de código.

- [ ] Criar conta de desenvolvedor em [developers.facebook.com](https://developers.facebook.com)
- [ ] Criar um App Meta (tipo: Business)
- [ ] Adicionar produtos: **Instagram** e **WhatsApp** ao app
- [ ] Criar conta de teste do Instagram Business (se não tiver)
- [ ] Criar número de teste do WhatsApp Business
- [ ] Anotar: `App ID`, `App Secret`, `Phone Number ID`, `WABA ID`

**Resultado esperado:** app configurado no painel da Meta, pronto para receber tokens.

---

## Fase 1 — Primeiro webhook (3-5 dias)

O coração do sistema. Tudo começa aqui.

### 1.1 Servidor básico

```bash
# Setup inicial
mkdir raio && cd raio
npm init -y
npm install express dotenv axios
```

```javascript
// server.js — mínimo funcional
const express = require('express');
const app = express();
app.use(express.json());

// Verificação do webhook (exigida pela Meta)
app.get('/webhook', (req, res) => {
  const token = req.query['hub.verify_token'];
  if (token === process.env.VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

// Receber eventos
app.post('/webhook', (req, res) => {
  const body = req.body;
  console.log('Evento recebido:', JSON.stringify(body, null, 2));
  res.sendStatus(200);
});

app.listen(3000);
```

### 1.2 Expor o servidor

```bash
# Use ngrok para desenvolvimento local
npx ngrok http 3000
# Copie a URL https gerada e cole no painel da Meta
```

### 1.3 Configurar webhook na Meta

1. Painel do App → Webhooks
2. URL: `https://sua-url.ngrok.io/webhook`
3. Verify Token: qualquer string secreta
4. Assinar: `messages` e `messaging_referrals`

**Resultado esperado:** receber o primeiro evento de DM no console.

---

## Fase 2 — Banco de dados + atribuição (3-5 dias)

Persistir o lead com a origem.

### 2.1 Setup do banco

```bash
npm install pg
# Subir PostgreSQL local com Docker
docker run --name raio-db -e POSTGRES_PASSWORD=senha -p 5432:5432 -d postgres
```

### 2.2 Schema mínimo

```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  ig_user_id VARCHAR(255) UNIQUE NOT NULL,
  origem VARCHAR(50),        -- ad | organic | bio | story
  campanha_id VARCHAR(255),  -- referral.ad_id se vier de anúncio
  estagio VARCHAR(50) DEFAULT 'dm',
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE mensagens (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id),
  canal VARCHAR(20),         -- instagram | whatsapp
  texto TEXT,
  ts TIMESTAMP DEFAULT NOW()
);
```

### 2.3 Lógica de atribuição

```javascript
// Quando chega uma mensagem
app.post('/webhook', async (req, res) => {
  const entry = req.body.entry?.[0];
  const messaging = entry?.messaging?.[0];

  if (!messaging) return res.sendStatus(200);

  const senderId = messaging.sender.id;
  const texto = messaging.message?.text;
  const referral = messaging.referral; // só existe se veio de anúncio

  const origem = referral ? 'ad' : 'organic';
  const campanhaId = referral?.ad_id || null;

  // Criar ou atualizar lead
  await db.query(`
    INSERT INTO leads (ig_user_id, origem, campanha_id)
    VALUES ($1, $2, $3)
    ON CONFLICT (ig_user_id) DO NOTHING
  `, [senderId, origem, campanhaId]);

  res.sendStatus(200);
});
```

**Resultado esperado:** leads sendo salvos no banco com origem correta.

---

## Fase 3 — Classificação por IA (2-3 dias)

Classificar intenção de cada mensagem.

### 3.1 Integrar API do Claude

```bash
npm install @anthropic-ai/sdk
```

```javascript
const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic();

async function classificarMensagem(texto) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 300,
    messages: [{
      role: 'user',
      content: `Classifique esta DM recebida por um profissional de saúde/fitness:
"${texto}"

Retorne APENAS JSON válido:
{
  "intencao": "interesse|duvida|suporte|engajamento|reativacao",
  "urgencia": "alta|media|baixa",
  "resumo": "resumo em 1 frase",
  "acao": "próxima ação sugerida"
}`
    }]
  });

  return JSON.parse(response.content[0].text);
}
```

### 3.2 Adicionar campo na tabela

```sql
ALTER TABLE leads ADD COLUMN intencao VARCHAR(50);
ALTER TABLE leads ADD COLUMN urgencia VARCHAR(20);
ALTER TABLE leads ADD COLUMN resumo TEXT;
ALTER TABLE leads ADD COLUMN acao TEXT;
```

**Resultado esperado:** cada DM chegando com intenção e urgência classificadas.

---

## Fase 4 — WhatsApp (3-4 dias)

Vincular o número do WhatsApp ao perfil do Instagram.

### 4.1 Webhook do WhatsApp

```javascript
// Mesmo servidor, rota separada
app.post('/webhook/whatsapp', async (req, res) => {
  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!message) return res.sendStatus(200);

  const waNumber = message.from; // número do WhatsApp
  const texto = message.text?.body;

  // Verificar se já existe lead com esse número
  // Se não: criar novo lead com origem whatsapp
  // Se sim: adicionar mensagem ao histórico

  res.sendStatus(200);
});
```

### 4.2 Vinculação de perfil

Quando o lead dá o número no Instagram, você vincula:

```sql
UPDATE leads SET wa_number = $1 WHERE ig_user_id = $2
```

**Resultado esperado:** um único perfil por lead, com histórico dos dois canais.

---

## Fase 5 — Painel mínimo (5-7 dias)

Ver os dados de forma utilizável.

### 5.1 API REST básica

```javascript
// Leads com intenção e origem
app.get('/api/leads', async (req, res) => {
  const leads = await db.query(`
    SELECT * FROM leads ORDER BY criado_em DESC LIMIT 50
  `);
  res.json(leads.rows);
});

// Métricas simples
app.get('/api/metricas', async (req, res) => {
  const total = await db.query('SELECT COUNT(*) FROM leads');
  const porOrigem = await db.query(`
    SELECT origem, COUNT(*) as total FROM leads GROUP BY origem
  `);
  res.json({ total: total.rows[0].count, porOrigem: porOrigem.rows });
});
```

### 5.2 Frontend

Usar o protótipo já criado (`crm-prototype.jsx`) como base — trocar os dados mockados por chamadas reais à API.

**Resultado esperado:** painel funcional mostrando leads reais com origem e intenção.

---

## Fase 6 — Deploy e primeiro cliente real (3-5 dias)

Colocar em produção e usar no próprio negócio.

- [ ] Deploy do backend no **Railway** ou **Render** (IP fixo necessário para webhook)
- [ ] Configurar domínio próprio
- [ ] Atualizar URL do webhook no painel da Meta
- [ ] Conectar sua própria conta Instagram Business
- [ ] Conectar seu próprio WhatsApp Business
- [ ] Usar por 30 dias antes de oferecer para outros

**Resultado esperado:** sistema rodando em produção com dados reais.

---

## Fase 7 — Primeiro cliente externo (após validação)

Só depois de ter usado e validado no próprio negócio.

- [ ] Submeter app para revisão da Meta (necessário para contas de terceiros)
- [ ] Implementar fluxo OAuth de onboarding
- [ ] Criar página de pricing (landing page já está pronta)
- [ ] Onboarding do primeiro cliente beta (gratuito ou desconto)
- [ ] Coletar feedback e iterar

---

## Resumo das fases

| Fase | O que entrega | Tempo estimado |
|---|---|---|
| 0 — Setup | App configurado na Meta | 1-2 dias |
| 1 — Webhook | Primeira DM capturada | 3-5 dias |
| 2 — Banco + Atribuição | Lead salvo com origem | 3-5 dias |
| 3 — IA | Intenção classificada | 2-3 dias |
| 4 — WhatsApp | Perfil unificado | 3-4 dias |
| 5 — Painel | Dados visíveis | 5-7 dias |
| 6 — Deploy | Produção com dados reais | 3-5 dias |
| 7 — 1º cliente | Validação externa | variável |

**Total estimado até MVP funcional: 3-5 semanas**

---

## Próximo passo imediato

```
Criar conta em developers.facebook.com e configurar o App Meta.
```

É o único desbloqueador. Sem isso, nada do resto funciona.
