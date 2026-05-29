# Raio⚡ — Master Reference

> Use este arquivo como contexto completo do projeto em qualquer prompt futuro.

---

## Produto em 1 parágrafo

**Raio** é um SaaS que transforma o Instagram em canal de vendas rastreável. Conecta Instagram DM, WhatsApp Business e Meta Ads em um único painel. A pergunta central que resolve: *"Qual conteúdo gerou cada cliente que fechou?"* — algo que nenhuma ferramenta nativa da Meta responde.

---

## Mercado-alvo

Profissionais que vendem serviço de ticket médio/alto pelo Instagram e fecham no WhatsApp:
- Personal trainers, nutricionistas, psicólogos, coaches, advogados, consultores, designers
- Usam ou querem usar Meta Ads (Click-to-DM)

**Founder = cliente ideal.** Usar o produto no próprio negócio antes de vender é a prova mais crível.

---

## As 4 dores resolvidas

1. **DMs misturadas** — interesse, dúvida, suporte e spam na mesma caixa
2. **Anúncio no escuro** — sabe quantos clicaram, não quantos viraram clientes
3. **Instagram desconectado do WhatsApp** — perde histórico de origem na migração de canal
4. **Métricas sem receita** — curtidas e alcance não mostram dinheiro real

---

## Posicionamento

> *"Descubra qual conteúdo está gerando seus clientes — e pare de desperdiçar dinheiro em anúncio que não converte."*

---

## Arquitetura — Fluxo principal

```
Anúncio / Post / Story
        ↓
Pessoa manda DM
        ↓
Webhook captura em tempo real
        ↓
Motor de Atribuição identifica origem (referral.ad_id)
        ↓
Lead criado com contexto (canal, campanha, intenção via IA)
        ↓
Painel mostra: quem chegou, de onde, e qual a intenção
```

---

## Stack técnica

| Camada | Tecnologia |
|---|---|
| Backend | **Go** + **Echo** framework |
| Banco | PostgreSQL |
| Hospedagem | Railway ou Render (IP fixo para webhook) |
| Frontend | **React** (Vite) — protótipo em `crm-prototype.jsx` |
| IA | Claude API (`claude-sonnet-4-6`) via HTTP client Go |

### Decisões de stack

**Go no backend:**
- Binário único, sem runtime externo — deploy simples
- Alta performance para webhook com alto volume de eventos
- Goroutines para processar múltiplos webhooks de clientes em paralelo
- **Echo** como framework HTTP (`github.com/labstack/echo/v4`) — roteamento, middleware, bind/validate embutidos
- Driver PostgreSQL: `pgx` (recomendado) ou `database/sql` + `lib/pq`
- HTTP client nativo para chamadas à API da Meta e Claude

**React no frontend:**
- Vite como bundler (build rápido, HMR)
- Protótipo existente em `crm-prototype.jsx` serve como base direta
- Sem framework SSR (Next.js) no MVP — SPA pura é suficiente
- Fetch nativo ou `axios` para consumir a API REST Go

---

## Schema do banco (MVP)

```sql
leads (
  id, ig_user_id, wa_number,
  origem,       -- ad | organic | bio | story
  campanha_id,  -- referral.ad_id do anúncio
  estagio,      -- dm | qualificado | proposta | fechou
  intencao,     -- interesse | duvida | suporte | engajamento | reativacao
  urgencia,     -- alta | media | baixa
  resumo, acao,
  criado_em, fechado_em
)

mensagens (
  id, lead_id, canal,  -- instagram | whatsapp
  de,                  -- lead | eu | bot
  texto, ts
)
```

---

## APIs integradas

### Instagram (Meta Graph API)
- `POST /webhook` + subscription `messages` + `messaging_referrals` → captura DMs e o `referral.ad_id`
- `GET /{media_id}/insights` → métricas de post/Reels/Story
- `POST /{ig-user-id}/messages` → enviar mensagem

### WhatsApp Business API
- Mesmo app Meta, mesmo token OAuth
- `POST /webhook` subscription `messages` → captura número, texto
- `POST /{phone-number-id}/messages` → enviar (template obrigatório no 1º contato; livre na janela de 24h)

### Meta Ads API
- `GET /act_{ad_account_id}/campaigns` → listar campanhas
- `GET /{ad_id}` → cruzar com `referral.ad_id` para atribuição

### Permissões necessárias no app Meta
`instagram_manage_messages`, `instagram_basic`, `instagram_manage_insights`, `whatsapp_business_messaging`, `whatsapp_business_management`, `ads_read`

---

## O dado mais valioso

```json
{
  "referral": {
    "ad_id": "120201234567890",
    "ads_context_data": { "ad_title": "Transformação 90 dias" }
  },
  "sender": { "id": "123456789" }
}
```

Campo `referral.ad_id` entregue no webhook quando lead vem de anúncio Click-to-DM. É o núcleo da atribuição.

---

## Classificação de intenção por IA (Claude)

```go
// Go — chamada à API do Claude
type ClaudeRequest struct {
    Model     string    `json:"model"`
    MaxTokens int       `json:"max_tokens"`
    Messages  []Message `json:"messages"`
}

func classificarMensagem(texto string) (Classificacao, error) {
    payload := ClaudeRequest{
        Model:     "claude-sonnet-4-6",
        MaxTokens: 300,
        Messages: []Message{{
            Role:    "user",
            Content: fmt.Sprintf(`Classifique esta DM: "%s"
Retorne APENAS JSON: {"intencao":"...","urgencia":"...","resumo":"...","acao":"..."}`, texto),
        }},
    }
    // POST https://api.anthropic.com/v1/messages
    // Header: x-api-key, anthropic-version
}

// Resposta esperada
// { "intencao": "interesse|duvida|suporte|engajamento|reativacao",
//   "urgencia": "alta|media|baixa",
//   "resumo": "...", "acao": "..." }
```

---

## Modelo de negócio

**Cobrança por volume de leads rastreados/mês.**

| Plano | Leads/mês | Preço |
|---|---|---|
| Starter | até 50 | R$ 97/mês |
| Grow | até 200 | R$ 197/mês |
| Pro | até 600 | R$ 397/mês |
| Agency | ilimitado | R$ 797/mês |

**14 dias grátis. Sem cartão de crédito.**

Estratégia de lançamento: começar com 2 planos (Starter + Pro) para reduzir fricção.

---

## Roadmap — status das fases

| Fase | Entrega | Tempo | Status |
|---|---|---|---|
| 0 — Setup | App Meta configurado | 1-2 dias | Próximo passo |
| 1 — Webhook | Primeira DM capturada | 3-5 dias | — |
| 2 — Banco + Atribuição | Lead salvo com origem | 3-5 dias | — |
| 3 — IA | Intenção classificada | 2-3 dias | — |
| 4 — WhatsApp | Perfil unificado | 3-4 dias | — |
| 5 — Painel | Dados visíveis | 5-7 dias | Protótipo existe |
| 6 — Deploy | Produção com dados reais | 3-5 dias | — |
| 7 — 1º cliente | Validação externa | variável | — |

**Desbloqueador imediato:** criar conta em developers.facebook.com e configurar o App Meta.

---

## Arquivos do projeto

| Arquivo | Conteúdo |
|---|---|
| `01-visao-geral.md` | Produto, problema, mercado |
| `02-arquitetura.md` | Fluxo técnico, stack, schema SQL, SaaS multi-cliente |
| `03-apis.md` | Endpoints, permissões, limitações da Meta |
| `04-modelo-negocio.md` | Preços, riscos, produtos derivados |
| `05-roadmap.md` | Fases com código de exemplo |
| `crm-prototype.jsx` | Protótipo do painel (dados mockados) |
| `arquitetura-canal-vendas.jsx` | Diagrama visual da arquitetura |
| `landing-page.html` | Landing page do produto |

---

## Riscos e limitações

- **Risco estrutural:** Meta pode fechar/restringir a API a qualquer momento
- Rate limit da Graph API: **200 req/hora**
- Histórico retroativo de DMs: **não existe** — só captura a partir do webhook ativado
- App precisa passar por **revisão da Meta** para funcionar em contas de terceiros em produção
- Em modo desenvolvimento: até **5 contas** para teste
- WhatsApp requer **template aprovado** para primeiro contato

---

## Produtos derivados (pós-validação)

1. **Raio Core** — SaaS para profissionais solo (validar primeiro)
2. **Raio Agency** — painel multi-cliente para agências
3. **Raio API** — acesso programático para devs

---

## SaaS multi-cliente — como funciona

Um único app Meta. Cada cliente conecta a própria conta via OAuth. O backend armazena por cliente:
`ig_access_token`, `wa_phone_number_id`, `ad_account_id`, `token_expiry` (Long-lived tokens, 60 dias renováveis).
