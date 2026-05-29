const plans = [
  {
    name: 'Starter',
    price: 'R$97',
    leads: 'até 50 leads/mês',
    features: [
      'Caixa de DMs com IA',
      'Atribuição de origem',
      'Funil Kanban',
      'Painel de métricas',
      '1 conta Instagram + 1 WhatsApp',
    ],
    cta: 'Começar grátis',
    featured: false,
  },
  {
    name: 'Grow',
    price: 'R$197',
    leads: 'até 200 leads/mês',
    features: [
      'Tudo do Starter',
      'Classificação IA completa',
      'Alertas de leads quentes',
      'Integração Meta Ads',
      'Relatórios de atribuição',
      'Suporte prioritário',
    ],
    cta: 'Começar grátis →',
    featured: true,
  },
  {
    name: 'Pro',
    price: 'R$397',
    leads: 'até 600 leads/mês',
    features: [
      'Tudo do Grow',
      'Múltiplas contas Instagram',
      'API de webhooks própria',
      'Exportação de dados',
      'Onboarding dedicado',
    ],
    cta: 'Falar com o time',
    featured: false,
  },
  {
    name: 'Agency',
    price: 'R$797',
    leads: 'Leads ilimitados · Multi-cliente',
    features: [
      'Tudo do Pro',
      'Painel multi-cliente',
      'White-label disponível',
      'SLA garantido',
      'Gerente de conta dedicado',
    ],
    cta: 'Falar com o time',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section className="pricing" id="precos">
      <div className="container">
        <p className="features-label">Preços</p>
        <h2>Simples. Proporcional ao seu crescimento.</h2>
        <p className="pricing-sub">
          Você paga pelo que mede. Se fechar 1 cliente a mais por mês, o Trakt se paga sozinho.
        </p>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div className={`price-card${plan.featured ? ' price-card-featured' : ''}`} key={plan.name}>
              {plan.featured && <div className="price-badge">Mais popular</div>}
              <div className="price-name">{plan.name}</div>
              <div className="price-amount">
                {plan.price}<span>/mês</span>
              </div>
              <div className="price-leads">{plan.leads}</div>
              <ul className="price-features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`btn price-cta${plan.featured ? ' btn-primary' : ' btn-ghost'}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="pricing-note">14 dias grátis em todos os planos · Sem cartão de crédito · Cancele quando quiser</p>
      </div>
    </section>
  )
}
