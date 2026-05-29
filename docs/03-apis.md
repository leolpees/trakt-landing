# Raio⚡ — APIs e Integrações

## Instagram (Meta Graph API)

### Autenticação
| Endpoint | Função |
|---|---|
| `GET /oauth/authorize` | Login OAuth, pedir permissões |
| `POST /oauth/access_token` | Trocar code por access token |

### Webhook (core)
| Endpoint | Função |
|---|---|
| `POST /webhook` | Receber DMs em tempo real (no seu servidor) |
| Subscription: `messages` | Captura mensagens recebidas |
| Subscription: `messaging_referrals` | Captura o `referral.ad_id` |

### Métricas de conteúdo
| Endpoint | Função |
|---|---|
| `GET /{media_id}/insights` | Métricas de post / Reels / Story |
| `GET /{ig-user-id}/media` | Listar posts |
| `GET /{ig-user-id}/insights` | Métricas gerais do perfil |

### Mensagens
| Endpoint | Função |
|---|---|
| `POST /{ig-user-id}/messages` | Enviar mensagem via API |

---

## WhatsApp Business API

> Mesma conta Meta / mesmo app — reaproveita o token OAuth.

### Webhook (core)
| Endpoint | Função |
|---|---|
| `POST /webhook` | Receber mensagens em tempo real |
| Subscription: `messages` | Captura número, texto, mídia |

### Mensagens
| Endpoint | Função |
|---|---|
| `POST /{phone-number-id}/messages` | Enviar mensagem |

**Atenção:**
- Requer **template aprovado** pela Meta para primeiro contato
- Mensagem livre apenas dentro da janela de **24h** após o lead falar primeiro

---

## Meta Ads API

| Endpoint | Função |
|---|---|
| `GET /act_{ad_account_id}/campaigns` | Listar campanhas |
| `GET /act_{ad_account_id}/insights` | Métricas de performance |
| `GET /{ad_id}` | Detalhes de um anúncio (cruzar com `referral.ad_id`) |

---

## Permissões necessárias no app Meta

| Permissão | Para quê |
|---|---|
| `instagram_manage_messages` | Ler e enviar DMs |
| `instagram_basic` | Dados do perfil |
| `instagram_manage_insights` | Métricas de conteúdo |
| `whatsapp_business_messaging` | Enviar/receber no WhatsApp |
| `whatsapp_business_management` | Gerenciar conta WA |
| `ads_read` | Métricas de campanhas |

---

## Classificação de intenção por IA

Cada DM passa pela API do Claude antes de chegar ao painel:

```javascript
// Payload enviado pra API
{
  model: "claude-sonnet-4-20250514",
  messages: [{
    role: "user",
    content: `Classifique esta DM: "${textoDaMensagem}"
    Retorne JSON: { intencao, urgencia, resumo, acao_sugerida }`
  }]
}

// Resposta esperada
{
  "intencao": "interesse",       // interesse | duvida | suporte | engajamento | reativacao
  "urgencia": "alta",            // alta | media | baixa
  "resumo": "Perguntou sobre preço do programa de 90 dias",
  "acao_sugerida": "Enviar proposta personalizada"
}
```

---

## Limitações importantes

- Rate limit da Graph API: **200 requisições/hora**
- Histórico retroativo de DMs: **não existe** — só captura a partir do webhook ativado
- Identidade individual de quem curtiu/salvou: **não disponível** (só agregado)
- Seguir/desseguir, dar likes, ver lista de seguidores: **depreciado** pela Meta
- App precisa passar por **revisão da Meta** para funcionar em contas de terceiros em produção
- Em modo desenvolvimento: até **5 contas** para teste
