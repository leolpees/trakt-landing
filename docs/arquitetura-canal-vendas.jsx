import { useState } from "react";

const data = {
  layers: [
    {
      id: "entrada",
      label: "ENTRADA",
      color: "#FF6B35",
      nodes: [
        { id: "ig_ads", label: "Instagram Ads", sub: "Click-to-DM", icon: "📣" },
        { id: "ig_organic", label: "Post / Story / Reels", sub: "Conteúdo orgânico", icon: "📸" },
        { id: "bio", label: "Link na Bio", sub: "UTM tracking", icon: "🔗" },
      ],
    },
    {
      id: "captura",
      label: "CAPTURA",
      color: "#F7B731",
      nodes: [
        { id: "ig_dm", label: "Instagram DM", sub: "Webhook em tempo real", icon: "💬" },
        { id: "ig_api", label: "Graph API", sub: "Métricas de conteúdo", icon: "📊" },
        { id: "ads_api", label: "Meta Ads API", sub: "Performance de campanhas", icon: "💰" },
      ],
    },
    {
      id: "core",
      label: "CORE — BACKEND",
      color: "#26de81",
      highlight: true,
      nodes: [
        { id: "webhook", label: "Webhook Handler", sub: "Processa eventos em tempo real", icon: "⚡" },
        { id: "atribuicao", label: "Motor de Atribuição", sub: "Origem do lead (anúncio / post)", icon: "🎯" },
        { id: "perfil", label: "Unificador de Perfil", sub: "Instagram + WhatsApp = 1 contato", icon: "🔀" },
      ],
    },
    {
      id: "banco",
      label: "DADOS",
      color: "#45AAF2",
      nodes: [
        { id: "db", label: "PostgreSQL", sub: "Leads, histórico, origem", icon: "🗄️" },
        { id: "crm", label: "CRM Próprio", sub: "Funil de vendas", icon: "📋" },
        { id: "wa_api", label: "WhatsApp Business API", sub: "Webhook + envio de msgs", icon: "📱" },
      ],
    },
    {
      id: "saida",
      label: "SAÍDA",
      color: "#A55EEA",
      nodes: [
        { id: "painel", label: "Painel de Métricas", sub: "Qual conteúdo gera venda", icon: "📈" },
        { id: "funil", label: "Funil Visual", sub: "Interessado → Fechou", icon: "🏆" },
        { id: "alerta", label: "Alertas", sub: "Lead quente chegou", icon: "🔔" },
      ],
    },
  ],
  flows: [
    { from: "ig_ads", to: "ig_dm", label: "referral field" },
    { from: "ig_organic", to: "ig_dm", label: "DM orgânica" },
    { from: "bio", to: "ig_dm", label: "UTM" },
    { from: "ig_dm", to: "webhook", label: "" },
    { from: "ig_api", to: "webhook", label: "" },
    { from: "ads_api", to: "webhook", label: "" },
    { from: "webhook", to: "atribuicao", label: "" },
    { from: "atribuicao", to: "perfil", label: "" },
    { from: "perfil", to: "db", label: "" },
    { from: "perfil", to: "wa_api", label: "pede WhatsApp" },
    { from: "wa_api", to: "db", label: "histórico unificado" },
    { from: "db", to: "crm", label: "" },
    { from: "crm", to: "painel", label: "" },
    { from: "crm", to: "funil", label: "" },
    { from: "crm", to: "alerta", label: "" },
  ],
};

const coreQuestion = {
  question: "Qual criativo gerou esse cliente?",
  answer: "Saber a origem de cada lead que fechou.",
};

const funnelStages = [
  { label: "DM recebida", color: "#FF6B35", desc: "Lead capturado com origem" },
  { label: "Qualificado", color: "#F7B731", desc: "Respondeu as perguntas-chave" },
  { label: "Proposta enviada", color: "#45AAF2", desc: "Oferta feita no WhatsApp" },
  { label: "Fechou", color: "#26de81", desc: "Virou cliente" },
];

export default function App() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [tab, setTab] = useState("arquitetura");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e8e8f0",
      fontFamily: "'Courier New', monospace",
      padding: "32px 24px",
    }}>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 4,
        }}>
          <div style={{
            width: 10, height: 10,
            background: "#26de81",
            borderRadius: "50%",
            boxShadow: "0 0 8px #26de81",
            animation: "pulse 2s infinite",
          }} />
          <span style={{ color: "#26de81", fontSize: 11, letterSpacing: 3, textTransform: "uppercase" }}>
            sistema de vendas via API
          </span>
        </div>
        <h1 style={{
          fontSize: "clamp(22px, 4vw, 36px)",
          fontWeight: 900,
          letterSpacing: -1,
          margin: "8px 0 4px",
          color: "#fff",
        }}>
          Instagram + WhatsApp
        </h1>
        <p style={{ color: "#666", fontSize: 13, marginBottom: 32 }}>
          Arquitetura técnica do seu canal de vendas
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 32, borderBottom: "1px solid #1a1a2e" }}>
          {["arquitetura", "funil", "dados-chave"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: tab === t ? "#26de81" : "#444",
                borderBottom: tab === t ? "2px solid #26de81" : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ARQUITETURA TAB */}
        {tab === "arquitetura" && (
          <div>
            {/* Core question banner */}
            <div style={{
              border: "1px solid #26de8133",
              background: "#26de8108",
              borderRadius: 8,
              padding: "16px 20px",
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}>
              <span style={{ fontSize: 20 }}>🎯</span>
              <div>
                <div style={{ fontSize: 11, color: "#26de81", letterSpacing: 2, marginBottom: 4 }}>PERGUNTA CENTRAL</div>
                <div style={{ fontSize: 15, color: "#fff", fontWeight: 700 }}>{coreQuestion.question}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{coreQuestion.answer}</div>
              </div>
            </div>

            {/* Layers */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {data.layers.map((layer, li) => (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                  style={{
                    border: `1px solid ${layer.highlight ? layer.color + "66" : "#1a1a2e"}`,
                    background: layer.highlight ? layer.color + "08" : "#0f0f1a",
                    borderRadius: 10,
                    padding: "16px 20px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Layer accent bar */}
                  <div style={{
                    position: "absolute",
                    left: 0, top: 0, bottom: 0,
                    width: 3,
                    background: layer.color,
                    borderRadius: "10px 0 0 10px",
                  }} />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{
                      fontSize: 10,
                      letterSpacing: 3,
                      color: layer.color,
                      fontWeight: 700,
                    }}>
                      {li + 1}. {layer.label}
                    </span>
                    <span style={{ color: "#333", fontSize: 12 }}>
                      {activeLayer === layer.id ? "▲" : "▼"}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {layer.nodes.map(node => (
                      <div
                        key={node.id}
                        style={{
                          flex: "1 1 200px",
                          background: "#0a0a14",
                          border: "1px solid #1a1a2e",
                          borderRadius: 8,
                          padding: "12px 14px",
                        }}
                      >
                        <div style={{ fontSize: 18, marginBottom: 6 }}>{node.icon}</div>
                        <div style={{ fontSize: 13, color: "#e0e0f0", fontWeight: 700, marginBottom: 2 }}>
                          {node.label}
                        </div>
                        <div style={{ fontSize: 11, color: "#555" }}>{node.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Expanded detail */}
                  {activeLayer === layer.id && (
                    <div style={{
                      marginTop: 16,
                      padding: "12px 14px",
                      background: "#07070f",
                      borderRadius: 6,
                      borderLeft: `2px solid ${layer.color}`,
                    }}>
                      {layer.id === "entrada" && (
                        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>
                          <div style={{ color: layer.color, marginBottom: 8, fontWeight: 700 }}>Como a atribuição começa aqui:</div>
                          <div>• <strong style={{ color: "#ccc" }}>Ads Click-to-DM:</strong> API entrega campo <code style={{ color: "#F7B731" }}>referral.ad_id</code> na mensagem</div>
                          <div>• <strong style={{ color: "#ccc" }}>Orgânico:</strong> UTM no link da bio identifica a campanha</div>
                          <div>• <strong style={{ color: "#ccc" }}>Stories:</strong> Link com parâmetro rastreável</div>
                        </div>
                      )}
                      {layer.id === "captura" && (
                        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>
                          <div style={{ color: layer.color, marginBottom: 8, fontWeight: 700 }}>APIs utilizadas:</div>
                          <div>• <strong style={{ color: "#ccc" }}>Messaging API:</strong> webhook <code style={{ color: "#F7B731" }}>POST /webhook</code> em tempo real</div>
                          <div>• <strong style={{ color: "#ccc" }}>Graph API:</strong> <code style={{ color: "#F7B731" }}>GET /{"{"}media_id{"}"}/insights</code> a cada X horas</div>
                          <div>• <strong style={{ color: "#ccc" }}>Ads API:</strong> <code style={{ color: "#F7B731" }}>GET /act_{"{"}ad_account_id{"}"}/insights</code></div>
                        </div>
                      )}
                      {layer.id === "core" && (
                        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>
                          <div style={{ color: layer.color, marginBottom: 8, fontWeight: 700 }}>⚡ Este é o coração do sistema:</div>
                          <div>• Webhook recebe evento → extrai origem → cria lead</div>
                          <div>• Motor de atribuição cruza <code style={{ color: "#F7B731" }}>referral.ad_id</code> com campanhas ativas</div>
                          <div>• Quando lead dá o WhatsApp → vincula os dois perfis num único registro</div>
                        </div>
                      )}
                      {layer.id === "banco" && (
                        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>
                          <div style={{ color: layer.color, marginBottom: 8, fontWeight: 700 }}>Estrutura de dados principal:</div>
                          <div>• Tabela <code style={{ color: "#F7B731" }}>leads</code>: ig_user_id, wa_number, origem, campanha</div>
                          <div>• Tabela <code style={{ color: "#F7B731" }}>mensagens</code>: histórico unificado IG + WA</div>
                          <div>• Tabela <code style={{ color: "#F7B731" }}>funil</code>: estágio atual, data de cada mudança</div>
                        </div>
                      )}
                      {layer.id === "saida" && (
                        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>
                          <div style={{ color: layer.color, marginBottom: 8, fontWeight: 700 }}>O que você vai ver no painel:</div>
                          <div>• Qual anúncio gerou mais leads que <em>fecharam</em> (não só clicaram)</div>
                          <div>• Qual post orgânico converte mais em DM</div>
                          <div>• Tempo médio entre DM e fechamento</div>
                          <div>• Alerta em tempo real quando lead quente chega</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Arrow down */}
                  {li < data.layers.length - 1 && (
                    <div style={{
                      textAlign: "center",
                      marginTop: 4,
                      color: "#222",
                      fontSize: 16,
                    }}>▼</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FUNIL TAB */}
        {tab === "funil" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, marginBottom: 16 }}>ESTÁGIOS DO FUNIL</div>
              {funnelStages.map((stage, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 12,
                }}>
                  <div style={{
                    width: `${100 - i * 18}%`,
                    background: stage.color + "22",
                    border: `1px solid ${stage.color}44`,
                    borderRadius: 6,
                    padding: "14px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.3s",
                  }}>
                    <div>
                      <div style={{ fontSize: 13, color: stage.color, fontWeight: 700 }}>{stage.label}</div>
                      <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{stage.desc}</div>
                    </div>
                    <div style={{
                      fontSize: 10,
                      color: "#333",
                      letterSpacing: 2,
                    }}>
                      ETAPA {i + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              border: "1px solid #1a1a2e",
              borderRadius: 10,
              padding: "20px",
              background: "#0f0f1a",
            }}>
              <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, marginBottom: 16 }}>CAMPOS DO LEAD NO BANCO</div>
              {[
                { field: "ig_user_id", type: "string", desc: "ID único do Instagram" },
                { field: "wa_number", type: "string", desc: "Número do WhatsApp" },
                { field: "origem", type: "enum", desc: "ad | organic | bio | story" },
                { field: "campanha_id", type: "string", desc: "ID do anúncio ou post" },
                { field: "estagio", type: "enum", desc: "dm | qualificado | proposta | fechou" },
                { field: "criado_em", type: "timestamp", desc: "Quando entrou no funil" },
                { field: "fechado_em", type: "timestamp", desc: "Quando virou cliente" },
              ].map((f, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: 12,
                  padding: "8px 0",
                  borderBottom: "1px solid #111",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}>
                  <code style={{ color: "#F7B731", fontSize: 12, flex: "0 0 140px" }}>{f.field}</code>
                  <span style={{
                    fontSize: 10,
                    color: "#45AAF2",
                    background: "#45AAF211",
                    padding: "2px 8px",
                    borderRadius: 4,
                    flex: "0 0 80px",
                  }}>{f.type}</span>
                  <span style={{ fontSize: 11, color: "#555" }}>{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DADOS-CHAVE TAB */}
        {tab === "dados-chave" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                title: "O dado mais valioso",
                color: "#26de81",
                icon: "🏆",
                content: "Campo referral.ad_id que chega no webhook quando um lead vem de anúncio Click-to-DM. É o único dado que conecta um cliente que fechou a um anúncio específico.",
                code: `// Webhook payload exemplo\n{\n  "referral": {\n    "ad_id": "120201234567890",\n    "ads_context_data": {\n      "ad_title": "Transformação 90 dias"\n    }\n  },\n  "sender": { "id": "123456789" }\n}`,
              },
              {
                title: "Stack recomendada",
                color: "#45AAF2",
                icon: "🛠️",
                items: [
                  { layer: "Backend", tech: "Node.js + Express", why: "Mesma linguagem do ecossistema Meta" },
                  { layer: "Banco", tech: "PostgreSQL", why: "Relacional, ideal pro funil" },
                  { layer: "Hospedagem", tech: "Railway ou Render", why: "IP fixo pro webhook, deploy simples" },
                  { layer: "Painel", tech: "Next.js", why: "Ou até Google Sheets no início" },
                ],
              },
              {
                title: "Ordem de construção",
                color: "#F7B731",
                icon: "📅",
                steps: [
                  "Configurar app na Meta e obter tokens",
                  "Servidor com webhook de DMs do Instagram",
                  "Capturar origem (referral) e salvar no banco",
                  "Webhook do WhatsApp + vinculação de perfil",
                  "CRM básico com estágios do funil",
                  "Painel de métricas e atribuição",
                ],
              },
            ].map((card, i) => (
              <div key={i} style={{
                border: `1px solid ${card.color}33`,
                background: "#0f0f1a",
                borderRadius: 10,
                padding: "20px",
                borderLeft: `3px solid ${card.color}`,
              }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 18 }}>{card.icon}</span>
                  <span style={{ color: card.color, fontSize: 11, letterSpacing: 2, fontWeight: 700 }}>
                    {card.title.toUpperCase()}
                  </span>
                </div>

                {card.content && (
                  <>
                    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, marginBottom: 16 }}>{card.content}</p>
                    <pre style={{
                      background: "#07070f",
                      border: "1px solid #1a1a2e",
                      borderRadius: 6,
                      padding: 16,
                      fontSize: 11,
                      color: "#26de81",
                      overflow: "auto",
                      lineHeight: 1.6,
                    }}>{card.code}</pre>
                  </>
                )}

                {card.items && card.items.map((item, j) => (
                  <div key={j} style={{
                    display: "flex",
                    gap: 12,
                    padding: "10px 0",
                    borderBottom: "1px solid #111",
                    flexWrap: "wrap",
                  }}>
                    <span style={{ color: "#555", fontSize: 11, flex: "0 0 80px" }}>{item.layer}</span>
                    <code style={{ color: card.color, fontSize: 12, flex: "0 0 160px" }}>{item.tech}</code>
                    <span style={{ fontSize: 11, color: "#555" }}>{item.why}</span>
                  </div>
                ))}

                {card.steps && card.steps.map((step, j) => (
                  <div key={j} style={{
                    display: "flex",
                    gap: 12,
                    padding: "10px 0",
                    borderBottom: "1px solid #111",
                    alignItems: "center",
                  }}>
                    <span style={{
                      width: 24, height: 24,
                      background: card.color + "22",
                      border: `1px solid ${card.color}44`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      color: card.color,
                      flexShrink: 0,
                    }}>{j + 1}</span>
                    <span style={{ fontSize: 12, color: "#888" }}>{step}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
      </div>
    </div>
  );
}
