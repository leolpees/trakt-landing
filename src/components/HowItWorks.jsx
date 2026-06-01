import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    number: '01',
    icon: '🔗',
    title: 'Conecte em 2 minutos',
    desc: 'Integre Instagram, WhatsApp e Meta Ads em um único painel. Sem código, sem agência — você mesmo configura.',
    benefit: 'Zero configuração técnica',
    benefitColor: 'blue',
    visual: (
      <div className="hiw-visual-connect">
        <div className="hiw-channel hiw-ch-1">
          <span className="hiw-channel-icon" style={{ background: 'linear-gradient(135deg,#e1306c,#fd1d1d,#f56040)' }}>📷</span>
          <span className="hiw-channel-label">Instagram</span>
          <span className="hiw-channel-status connected">●</span>
        </div>
        <div className="hiw-channel hiw-ch-2">
          <span className="hiw-channel-icon" style={{ background: '#25d366' }}>💬</span>
          <span className="hiw-channel-label">WhatsApp</span>
          <span className="hiw-channel-status connected">●</span>
        </div>
        <div className="hiw-channel hiw-ch-3">
          <span className="hiw-channel-icon" style={{ background: '#1877f2' }}>📢</span>
          <span className="hiw-channel-label">Meta Ads</span>
          <span className="hiw-channel-status connected">●</span>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    icon: '✦',
    title: 'IA classifica cada DM',
    desc: 'Toda mensagem nova é lida pela nossa IA. Ela identifica intenção, urgência e temperatura do lead antes de você abrir.',
    benefit: 'Nunca mais perde lead quente',
    benefitColor: 'green',
    visual: (
      <div className="hiw-visual-ai">
        <div className="hiw-ai-msg">
          <div className="hiw-ai-bubble">"Oi! Vi o anúncio do curso, ainda tem vaga?"</div>
          <div className="hiw-ai-arrow">↓ IA analisando</div>
          <div className="hiw-ai-result">
            <span className="hiw-ai-tag urgente">🔥 Urgente</span>
            <span className="hiw-ai-tag interesse">Interesse alto</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    icon: '🎯',
    title: 'Rastreie a origem exata',
    desc: 'Saiba se o lead veio do anúncio "Transformação 90d", do Reels de terça ou do Story de ontem. Cada clique rastreado.',
    benefit: 'ROI de cada anúncio visível',
    benefitColor: 'orange',
    visual: (
      <div className="hiw-visual-track">
        <div className="hiw-track-row hiw-tr-1">
          <span className="hiw-track-source" style={{ background: '#fee2e2', color: '#dc2626' }}>📢 Anúncio "Oferta Mai"</span>
          <span className="hiw-track-arrow">→</span>
          <span className="hiw-track-count blue">8 leads</span>
        </div>
        <div className="hiw-track-row hiw-tr-2">
          <span className="hiw-track-source" style={{ background: '#fef3c7', color: '#d97706' }}>🎬 Reels · Terça</span>
          <span className="hiw-track-arrow">→</span>
          <span className="hiw-track-count green">5 leads</span>
        </div>
        <div className="hiw-track-row hiw-tr-3">
          <span className="hiw-track-source" style={{ background: '#eff6ff', color: '#2563eb' }}>📷 Story · Ontem</span>
          <span className="hiw-track-arrow">→</span>
          <span className="hiw-track-count muted">3 leads</span>
        </div>
      </div>
    ),
  },
  {
    number: '04',
    icon: '💰',
    title: 'Feche. Registre. Repita.',
    desc: 'Marque o lead como convertido, veja o valor gerado e descubra qual canal está pagando mais. Funil de vendas completo.',
    benefit: 'Mais vendas, menos esforço',
    benefitColor: 'green',
    visual: (
      <div className="hiw-visual-close">
        <div className="hiw-close-card">
          <div className="hiw-close-top">
            <div className="hiw-close-avatar" style={{ background: '#d1fae5', color: '#10b981' }}>MF</div>
            <div>
              <div className="hiw-close-name">@mariana.fit</div>
              <div className="hiw-close-origin">📢 Anúncio "Transformação 90d"</div>
            </div>
          </div>
          <div className="hiw-close-status">
            <span className="hiw-close-badge">✓ Convertido</span>
            <span className="hiw-close-value">R$ 1.497</span>
          </div>
        </div>
      </div>
    ),
  },
]

const benefitColors = {
  blue:   { bg: 'var(--blue-pale2)', color: 'var(--blue)' },
  green:  { bg: 'var(--green-pale)', color: 'var(--green)' },
  orange: { bg: 'var(--orange-pale)', color: '#d97706' },
}

export default function HowItWorks() {
  const headerRef = useScrollReveal()
  const stepsRef  = useScrollReveal(0.08)
  const ctaRef    = useScrollReveal()

  return (
    <section className="hiw" id="how">
      <div className="container">

        <div ref={headerRef} className="hiw-header reveal">
          <span className="hiw-label">Como funciona</span>
          <h2>Do primeiro DM ao cliente fechado</h2>
          <p className="hiw-sub">
            Quatro etapas simples que transformam sua caixa de mensagens
            em uma máquina de vendas rastreável.
          </p>
        </div>

        <div ref={stepsRef} className="hiw-steps">
          {steps.map((step, i) => {
            const bc = benefitColors[step.benefitColor]
            return (
              <div key={i} className="hiw-step reveal">
                {i < steps.length - 1 && <div className="hiw-connector" />}
                <div className="hiw-step-number">{step.number}</div>
                <div className="hiw-step-card">
                  <div className="hiw-step-visual">{step.visual}</div>
                  <div className="hiw-step-body">
                    <div className="hiw-step-icon">{step.icon}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                    <span
                      className="hiw-benefit"
                      style={{ background: bc.bg, color: bc.color }}
                    >
                      ✓ {step.benefit}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div ref={ctaRef} className="hiw-cta reveal">
          <div className="hiw-cta-inner">
            <div className="hiw-cta-left">
              <div className="hiw-cta-result">
                <span className="hiw-cta-num">3×</span>
                <span className="hiw-cta-text">mais conversões em média nos primeiros 30 dias</span>
              </div>
              <div className="hiw-cta-result">
                <span className="hiw-cta-num">100%</span>
                <span className="hiw-cta-text">dos leads com origem rastreada automaticamente</span>
              </div>
            </div>
            <div className="hiw-cta-right">
              <a href="#waitlist" className="btn btn-primary btn-lg">
                Começar agora — 14 dias grátis →
              </a>
              <p className="hiw-cta-disclaimer">Sem cartão de crédito · Cancele quando quiser</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
