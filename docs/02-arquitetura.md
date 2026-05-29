# Raio⚡ — Arquitetura Técnica

## Core do sistema

> **Webhook de DMs + Atribuição de Origem**

Tudo gira em torno de uma pergunta: *"Essa pessoa que me mandou DM veio de onde?"*

---

## Fluxo principal

```
Anúncio / Post / Story
        ↓
Pessoa manda DM
        ↓
Webhook captura em tempo real
        ↓
Sistema identifica a origem
        ↓
Lead é criado com contexto
        ↓
Você entra na conversa sabendo quem é
```

---

## As 5 camadas

### 1. Entrada
- Instagram Ads (Click-to-DM) → entrega campo `referral.ad_id`
- Posts / Reels / Stories → DM orgânica
- Link na Bio → UTM tracking

### 2. Captura
- Instagram Messaging API → webhook em tempo real
- Instagram Graph API → métricas de conteúdo
- Meta Ads API → performance de campanhas

### 3. Core — Backend
- **Webhook Handler** → processa eventos em tempo real
- **Motor de Atribuição** → cruza `referral.ad_id` com campanhas ativas
- **Unificador de Perfil** → vincula Instagram + WhatsApp num único contato

### 4. Dados
- PostgreSQL → leads, histórico, origem
- CRM próprio → funil de vendas
- WhatsApp Business API → webhook + envio de mensagens

### 5. Saída
- Painel de métricas → qual conteúdo gera venda
- Funil visual → Interessado → Fechou
- Alertas → lead quente chegou

---

## O dado mais valioso

Campo `referral.ad_id` entregue no webhook quando um lead vem de anúncio Click-to-DM.

```json
{
  "referral": {
    "ad_id": "120201234567890",
    "ads_context_data": {
      "ad_title": "Transformação 90 dias"
    }
  },
  "sender": { "id": "123456789" }
}
```

---

## Como o WhatsApp se encaixa

O ponto de conexão é o número de telefone:

```
Lead manda DM no Instagram
        ↓
Automação pede o WhatsApp
        ↓
Sistema vincula o contato IG ao número WA
        ↓
Um único perfil de lead com histórico dos dois canais
```

Arquitetura final:

```
Instagram DM ──┐
               ├──→ Backend core ──→ CRM próprio
WhatsApp DM ───┘         ↑
                         │
                    Meta Ads API
```

---

## Stack recomendada

| Camada | Tecnologia | Motivo |
|---|---|---|
| Backend | Node.js + Express | Mesmo ecossistema do Meta |
| Banco | PostgreSQL | Relacional, ideal pro funil |
| Hospedagem | Railway ou Render | IP fixo pro webhook, deploy simples |
| Painel | Next.js | Ou Google Sheets no início |

---

## Estrutura de dados principal

```sql
-- Tabela principal de leads
leads (
  id,
  ig_user_id,       -- ID único do Instagram
  wa_number,        -- Número do WhatsApp
  origem,           -- ad | organic | bio | story
  campanha_id,      -- ID do anúncio ou post
  estagio,          -- dm | qualificado | proposta | fechou
  criado_em,
  fechado_em
)

-- Histórico unificado de mensagens
mensagens (
  id,
  lead_id,
  canal,            -- instagram | whatsapp
  de,               -- lead | eu | bot
  texto,
  ts
)
```

---

## Escala multi-cliente (SaaS)

Você não cria um app por cliente. Você cria **um único app Meta** e cada cliente conecta a conta dele ao seu app via OAuth.

```
Seu app Meta (único)
        ↓
Cliente A faz login → access_token do cliente A salvo no banco
Cliente B faz login → access_token do cliente B salvo no banco
```

### O que armazenar por cliente

| Campo | Descrição |
|---|---|
| `user_id` | ID do cliente no seu sistema |
| `ig_access_token` | Token do Instagram |
| `wa_phone_number_id` | ID do número WhatsApp |
| `ad_account_id` | ID da conta de anúncios |
| `token_expiry` | Tokens expiram — renovar antes |

**Importante:** usar Long-lived tokens (60 dias, renováveis). Short-lived tokens (1h) são inúteis para SaaS.

### Fluxo de onboarding do cliente

```
Cliente entra no SaaS
        ↓
Clica em "Conectar Instagram"
        ↓
Redireciona pro OAuth da Meta
        ↓
Cliente autoriza as permissões
        ↓
Backend recebe token e salva
        ↓
Webhook começa a escutar a conta dele
        ↓
Dashboard ativo
```
