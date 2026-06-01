import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  {
    icon: '📥',
    title: 'Captura automática de leads',
    desc: 'Cada DM no Instagram vira um lead rastreado em tempo real, sem precisar copiar nada manualmente.',
  },
  {
    icon: '🎯',
    title: 'Atribuição de origem',
    desc: 'Saiba quando o lead veio de um anúncio, de um post orgânico, da bio ou de um story. Veja qual conteúdo converte mais.',
  },
  {
    icon: '📊',
    title: 'Painel unificado',
    desc: 'Instagram DM e WhatsApp em um só lugar. Acompanhe o funil de cada lead do primeiro contato ao fechamento.',
  },
  {
    icon: '🔔',
    title: 'Alertas de leads quentes',
    desc: 'Notificação imediata quando chega um lead com intenção de compra alta. Responda enquanto o interesse está no pico.',
  },
]

export default function Features() {
  const headerRef  = useScrollReveal()
  const aiRef      = useScrollReveal()
  const gridRef    = useScrollReveal()

  return (
    <section className="features" id="features">
      <div className="container">

        <div ref={headerRef} className="reveal">
          <p className="features-label">Funcionalidades</p>
          <h2>Tudo que você precisa para<br />vender pelo Instagram</h2>
        </div>

        <div ref={aiRef} className="ai-card reveal">
          <div className="ai-card-left">
            <span className="ai-badge">✦ Inteligência Artificial</span>
            <h3>A IA classifica cada lead antes de você abrir a mensagem</h3>
            <p>
              Cada DM recebida é analisada automaticamente pelo modelo de linguagem e recebe uma classificação de intenção —
              <strong> interesse, dúvida, suporte ou engajamento</strong> — junto com o nível de urgência e a ação sugerida.
              Você abre a caixa e sabe exatamente quem priorizar.
            </p>
            <div className="ai-tags">
              <span className="ai-tag ai-tag-green">● Interesse</span>
              <span className="ai-tag ai-tag-blue">● Dúvida</span>
              <span className="ai-tag ai-tag-orange">● Suporte</span>
              <span className="ai-tag ai-tag-gray">● Engajamento</span>
            </div>
          </div>
          <div className="ai-card-right">
            <div className="ai-demo">
              <div className="ai-demo-header">
                <span className="ai-demo-title">Classificação em tempo real</span>
                <span className="ai-demo-live">● Ao vivo</span>
              </div>
              <div className="ai-demo-item ai-demo-item-1">
                <div className="ai-demo-avatar" style={{ background: '#dbeafe', color: '#2563eb' }}>MF</div>
                <div className="ai-demo-info">
                  <div className="ai-demo-name">@mariana.fit</div>
                  <div className="ai-demo-msg">"Quanto custa o plano anual?"</div>
                </div>
                <span className="ai-demo-tag tag-interesse">interesse · alta urgência</span>
              </div>
              <div className="ai-demo-item ai-demo-item-2">
                <div className="ai-demo-avatar" style={{ background: '#d1fae5', color: '#10b981' }}>CP</div>
                <div className="ai-demo-info">
                  <div className="ai-demo-name">@coach.pedro</div>
                  <div className="ai-demo-msg">"Como funciona a plataforma?"</div>
                </div>
                <span className="ai-demo-tag tag-duvida">dúvida · média</span>
              </div>
              <div className="ai-demo-item ai-demo-item-3">
                <div className="ai-demo-avatar" style={{ background: '#fef3c7', color: '#d97706' }}>JL</div>
                <div className="ai-demo-info">
                  <div className="ai-demo-name">@juliana.lima</div>
                  <div className="ai-demo-msg">"Adorei o post de hoje! 🔥"</div>
                </div>
                <span className="ai-demo-tag tag-engage">engajamento · baixa</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={gridRef} className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card reveal" key={f.title} style={{ '--i': i }}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
