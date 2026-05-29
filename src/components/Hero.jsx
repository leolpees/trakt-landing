export default function Hero() {
  return (
    <div className="hero-wrap">
      <section className="hero">

        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Instagram + WhatsApp + Meta Ads — um painel só
        </div>

        {/* Headline */}
        <h1>
          Seu próximo cliente já está<br />
          na sua caixa de DMs.<br />
          <em>Você só não sabe quem é.</em>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub">
          Trakt usa IA para classificar cada mensagem e rastreia a origem de cada lead —
          para você saber quem priorizar antes mesmo de abrir a conversa.
        </p>

        {/* CTAs */}
        <div className="hero-actions">
          <a href="#waitlist" className="btn btn-primary btn-lg">
            Testar 14 dias grátis →
          </a>
          <a href="#how" className="btn btn-ghost btn-lg">
            Ver como funciona
          </a>
        </div>
        <p className="hero-disclaimer">Sem cartão de crédito · Cancele quando quiser</p>

        {/* AI classification inline demo */}
        <div className="hero-ai-demo">
          <div className="hero-ai-demo-label">
            <span className="hero-ai-badge">✦ IA classificando agora</span>
          </div>
          <div className="hero-ai-items">
            <div className="hero-ai-item">
              <div className="hero-ai-avatar" style={{ background: '#dbeafe', color: '#2563eb' }}>MF</div>
              <div className="hero-ai-info">
                <span className="hero-ai-name">@mariana.fit</span>
                <span className="hero-ai-origin">📢 Anúncio "Transformação 90d"</span>
              </div>
              <span className="mockup-tag tag-interesse">interesse · urgente</span>
            </div>
            <div className="hero-ai-item">
              <div className="hero-ai-avatar" style={{ background: '#d1fae5', color: '#10b981' }}>CP</div>
              <div className="hero-ai-info">
                <span className="hero-ai-name">@coach.pedro</span>
                <span className="hero-ai-origin">🎬 Reels orgânico</span>
              </div>
              <span className="mockup-tag tag-duvida">dúvida · média</span>
            </div>
            <div className="hero-ai-item">
              <div className="hero-ai-avatar" style={{ background: '#fef3c7', color: '#d97706' }}>JC</div>
              <div className="hero-ai-info">
                <span className="hero-ai-name">@julia.consultoria</span>
                <span className="hero-ai-origin">📷 Story</span>
              </div>
              <span className="mockup-tag tag-interesse">interesse · alta</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">3×</div>
            <div className="hero-stat-label">Mais conversões</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">100%</div>
            <div className="hero-stat-label">Leads rastreados</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">+200</div>
            <div className="hero-stat-label">Profissionais ativos</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">14 dias</div>
            <div className="hero-stat-label">Grátis para testar</div>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="hero-mockup-wrap">
          <div className="hero-mockup">

            {/* Browser chrome */}
            <div className="mockup-bar">
              <div className="mockup-dots">
                <div className="mockup-dot" style={{ background: '#ef4444' }} />
                <div className="mockup-dot" style={{ background: '#f59e0b' }} />
                <div className="mockup-dot" style={{ background: '#10b981' }} />
              </div>
              <div className="mockup-url">app.trakt.com.br/dashboard</div>
            </div>

            {/* Body */}
            <div className="mockup-body">

              {/* Sidebar */}
              <div className="mockup-sidebar">
                <div className="mockup-sidebar-logo">Trakt</div>
                <div className="mockup-nav-section">Principal</div>
                <div className="mockup-nav-item active">
                  <span className="mockup-nav-icon">▦</span> Dashboard
                </div>
                <div className="mockup-nav-item">
                  <span className="mockup-nav-icon">💬</span> Conversas
                  <span style={{ marginLeft: 'auto', background: '#dbeafe', color: '#2563eb', fontSize: '0.65rem', fontWeight: 700, padding: '1px 7px', borderRadius: '100px' }}>12</span>
                </div>
                <div className="mockup-nav-item">
                  <span className="mockup-nav-icon">👥</span> Leads
                </div>
                <div className="mockup-nav-item">
                  <span className="mockup-nav-icon">📢</span> Anúncios
                </div>
                <div className="mockup-nav-section">Análise</div>
                <div className="mockup-nav-item">
                  <span className="mockup-nav-icon">📈</span> Funil
                </div>
                <div className="mockup-nav-item">
                  <span className="mockup-nav-icon">🎯</span> Atribuição
                </div>
              </div>

              {/* Main content */}
              <div className="mockup-main">
                <div className="mockup-header">
                  <div>
                    <div className="mockup-title">Leads hoje</div>
                    <div className="mockup-subtitle">Atualizado em tempo real</div>
                  </div>
                  <div className="mockup-badge">● Ao vivo</div>
                </div>

                {/* Stats */}
                <div className="mockup-stats">
                  <div className="mockup-stat-card">
                    <div className="mockup-stat-label">DMs hoje</div>
                    <div className="mockup-stat-val">24</div>
                    <div className="mockup-stat-trend up">↑ 33% vs ontem</div>
                  </div>
                  <div className="mockup-stat-card">
                    <div className="mockup-stat-label">De anúncios</div>
                    <div className="mockup-stat-val" style={{ color: '#2563eb' }}>8</div>
                    <div className="mockup-stat-trend up">↑ 2 novas</div>
                  </div>
                  <div className="mockup-stat-card">
                    <div className="mockup-stat-label">Fecharam</div>
                    <div className="mockup-stat-val" style={{ color: '#10b981' }}>3</div>
                    <div className="mockup-stat-trend up">R$ 4.491</div>
                  </div>
                </div>

                {/* Leads list */}
                <div className="mockup-leads">
                  <div className="mockup-lead">
                    <div className="mockup-lead-left">
                      <div className="mockup-lead-avatar" style={{ background: '#dbeafe', color: '#2563eb' }}>MF</div>
                      <div>
                        <div className="mockup-lead-name">@mariana.fit</div>
                        <div className="mockup-lead-origin">📢 Anúncio "Transformação 90d" · há 2 min</div>
                      </div>
                    </div>
                    <div className="mockup-lead-right">
                      <span className="mockup-tag tag-interesse">interesse</span>
                      <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>●</span>
                    </div>
                  </div>

                  <div className="mockup-lead">
                    <div className="mockup-lead-left">
                      <div className="mockup-lead-avatar" style={{ background: '#eff6ff', color: '#3b82f6' }}>CP</div>
                      <div>
                        <div className="mockup-lead-name">@coach.pedro</div>
                        <div className="mockup-lead-origin">🎬 Reels orgânico · há 8 min</div>
                      </div>
                    </div>
                    <div className="mockup-lead-right">
                      <span className="mockup-tag tag-duvida">dúvida</span>
                      <span style={{ color: '#f59e0b', fontSize: '0.7rem' }}>●</span>
                    </div>
                  </div>

                  <div className="mockup-lead">
                    <div className="mockup-lead-left">
                      <div className="mockup-lead-avatar" style={{ background: '#d1fae5', color: '#10b981' }}>JC</div>
                      <div>
                        <div className="mockup-lead-name">@julia.consultoria</div>
                        <div className="mockup-lead-origin">📷 Story · há 15 min</div>
                      </div>
                    </div>
                    <div className="mockup-lead-right">
                      <span className="mockup-tag tag-interesse">interesse</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>●</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}
