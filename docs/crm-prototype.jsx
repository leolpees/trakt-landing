import { useState } from "react";

const COLORS = {
  bg: "#080810",
  surface: "#0e0e1a",
  border: "#16162a",
  accent: "#6C63FF",
  green: "#00D9A3",
  yellow: "#FFB547",
  red: "#FF5C7A",
  blue: "#4DA3FF",
  text: "#E8E8F4",
  muted: "#4a4a6a",
  dim: "#1e1e32",
  orange: "#FF8C42",
};

const INTENCOES = {
  interesse: { label: "🔥 Interesse", color: "#FF5C7A", desc: "Quer comprar ou saber preço" },
  duvida: { label: "❓ Dúvida", color: "#4DA3FF", desc: "Pergunta sobre o serviço" },
  suporte: { label: "🛠 Suporte", color: "#FFB547", desc: "Precisa de ajuda técnica" },
  engajamento: { label: "💬 Engajamento", color: "#6C63FF", desc: "Curtiu o conteúdo" },
  reativacao: { label: "🔁 Reativação", color: "#00D9A3", desc: "Cliente antigo voltando" },
};

const URGENCIAS = {
  alta: { label: "Urgência Alta", color: "#FF5C7A" },
  media: { label: "Urgência Média", color: "#FFB547" },
  baixa: { label: "Urgência Baixa", color: "#4a4a6a" },
};

const leads = [
  {
    id: 1, name: "Carla Mendes", avatar: "CM", canal: "instagram",
    origem: "Anúncio — Transformação 90d", estagio: "fechou",
    wa: "+55 11 99999-1111", valor: 1200, tempo: "3 dias",
    ts: "há 2h", msgs: 14,
    intencao: "interesse", urgencia: "alta",
    resumo: "Perguntou sobre o programa de 90 dias e preço",
    acao: "Enviar proposta personalizada",
    ultimaMsg: "Quanto custa o programa de 90 dias? Vi seu anúncio e me interessei muito",
  },
  {
    id: 2, name: "Rafael Torres", avatar: "RT", canal: "instagram",
    origem: "Reels — Treino em casa", estagio: "proposta",
    wa: "+55 21 98888-2222", valor: 800, tempo: "1 dia",
    ts: "há 4h", msgs: 7,
    intencao: "interesse", urgencia: "media",
    resumo: "Quer treinar em casa, perguntou sobre plano online",
    acao: "Follow-up da proposta enviada ontem",
    ultimaMsg: "Você atende online? Não tenho como ir à academia",
  },
  {
    id: 3, name: "Ana Souza", avatar: "AS", canal: "whatsapp",
    origem: "Story — Antes/Depois", estagio: "qualificado",
    wa: "+55 31 97777-3333", valor: null, tempo: "—",
    ts: "há 6h", msgs: 5,
    intencao: "duvida", urgencia: "media",
    resumo: "Dúvida sobre alimentação durante o programa",
    acao: "Responder dúvida e qualificar mais",
    ultimaMsg: "No programa você também ajuda com alimentação ou é só treino?",
  },
  {
    id: 4, name: "Marcos Lima", avatar: "ML", canal: "instagram",
    origem: "Anúncio — Transformação 90d", estagio: "dm",
    wa: null, valor: null, tempo: "—",
    ts: "há 8h", msgs: 2,
    intencao: "engajamento", urgencia: "baixa",
    resumo: "Curtiu o resultado do antes/depois de um aluno",
    acao: "Nurturing — ainda não está pronto pra comprar",
    ultimaMsg: "Nossa que transformação incrível!! Parabéns pro seu aluno",
  },
  {
    id: 5, name: "Julia Costa", avatar: "JC", canal: "instagram",
    origem: "Post — Dica de proteína", estagio: "qualificado",
    wa: "+55 41 96666-4444", valor: null, tempo: "—",
    ts: "há 12h", msgs: 9,
    intencao: "duvida", urgencia: "media",
    resumo: "Perguntou sobre proteína pós-treino e suplementação",
    acao: "Responder e oferecer consultoria nutricional",
    ultimaMsg: "Qual proteína você indica pra quem tá começando agora?",
  },
  {
    id: 6, name: "Pedro Alves", avatar: "PA", canal: "whatsapp",
    origem: "Bio — Link UTM promo", estagio: "fechou",
    wa: "+55 51 95555-5555", valor: 1500, tempo: "5 dias",
    ts: "há 1d", msgs: 21,
    intencao: "reativacao", urgencia: "alta",
    resumo: "Ex-aluno querendo retomar o programa premium",
    acao: "Oferecer plano de retorno com desconto fidelidade",
    ultimaMsg: "Oi! Fiz o programa com você ano passado, quero voltar!",
  },
  {
    id: 7, name: "Beatriz Nunes", avatar: "BN", canal: "instagram",
    origem: "Reels — Treino em casa", estagio: "dm",
    wa: null, valor: null, tempo: "—",
    ts: "há 3h", msgs: 1,
    intencao: "suporte", urgencia: "alta",
    resumo: "Não consegue acessar o material do programa",
    acao: "Resolver acesso urgente — cliente pagante",
    ultimaMsg: "Oi! Comprei o programa mas não consigo abrir os vídeos, me ajuda?",
  },
];

const estagios = [
  { id: "dm", label: "DM Recebida", color: COLORS.blue },
  { id: "qualificado", label: "Qualificado", color: COLORS.yellow },
  { id: "proposta", label: "Proposta", color: COLORS.accent },
  { id: "fechou", label: "Fechou", color: COLORS.green },
];

const metricas = [
  { label: "Leads este mês", value: "47", delta: "+18%", up: true },
  { label: "Taxa de conversão", value: "12,7%", delta: "+3,2pp", up: true },
  { label: "Ticket médio", value: "R$1.150", delta: "+R$200", up: true },
  { label: "Tempo médio fechamento", value: "3,4 dias", delta: "-1,2d", up: true },
];

const origens = [
  { nome: "Anúncio — Transformação 90d", leads: 18, fechados: 5, receita: 6000, cor: COLORS.accent },
  { nome: "Reels — Treino em casa", leads: 12, fechados: 2, receita: 1600, cor: COLORS.blue },
  { nome: "Story — Antes/Depois", leads: 9, fechados: 2, receita: 2400, cor: COLORS.yellow },
  { nome: "Post — Dica de proteína", leads: 5, fechados: 1, receita: 800, cor: COLORS.green },
  { nome: "Bio — Link UTM promo", leads: 3, fechados: 2, receita: 3000, cor: COLORS.red },
];

const conversas = {
  1: [
    { de: "lead", texto: "Quanto custa o programa de 90 dias? Vi seu anúncio e me interessei muito", ts: "14:32" },
    { de: "bot", texto: "Olá Carla! 😊 Que bom que chegou aqui. Me conta: qual é seu principal objetivo agora?", ts: "14:32", classificou: true },
    { de: "lead", texto: "Quero emagrecer uns 10kg e ganhar disposição", ts: "14:35" },
    { de: "bot", texto: "Perfeito! Você já treina atualmente ou seria do zero?", ts: "14:35" },
    { de: "lead", texto: "Do zero, nunca mexi com academia", ts: "14:38" },
    { de: "eu", texto: "Carla, você é exatamente o perfil que atendo. Posso te chamar amanhã às 10h?", ts: "14:45" },
    { de: "lead", texto: "Pode sim! Vai ser pelo WhatsApp?", ts: "14:47" },
  ],
  7: [
    { de: "lead", texto: "Oi! Comprei o programa mas não consigo abrir os vídeos, me ajuda?", ts: "09:12" },
    { de: "bot", texto: "Oi Beatriz! Já identifiquei sua compra aqui. Qual dispositivo você está usando?", ts: "09:12", classificou: true },
  ],
};

function Avatar({ initials, size = 36, color = COLORS.accent }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "22", border: `1.5px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.33, color, fontWeight: 700, flexShrink: 0,
      fontFamily: "monospace",
    }}>{initials}</div>
  );
}

function Tag({ label, color = COLORS.muted }) {
  return (
    <span style={{
      fontSize: 10, padding: "2px 8px", borderRadius: 20,
      background: color + "18", color, border: `1px solid ${color}33`,
      letterSpacing: 0.5, whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function IntencaoTag({ intencao }) {
  const i = INTENCOES[intencao];
  if (!i) return null;
  return <Tag label={i.label} color={i.color} />;
}

function EstagioTag({ estagio }) {
  const e = estagios.find(x => x.id === estagio);
  if (!e) return null;
  return <Tag label={e.label} color={e.color} />;
}

function AIBadge() {
  return (
    <span style={{
      fontSize: 9, padding: "1px 6px", borderRadius: 4,
      background: "#6C63FF18", color: "#6C63FF",
      border: "1px solid #6C63FF33", letterSpacing: 1,
      fontWeight: 700,
    }}>IA</span>
  );
}

export default function App() {
  const [view, setView] = useState("dashboard");
  const [selectedLead, setSelectedLead] = useState(null);
  const [filtroIntencao, setFiltroIntencao] = useState(null);
  const [caixaAberta, setCaixaAberta] = useState(false);

  const nav = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "caixa", icon: "✉", label: "Caixa de Entrada" },
    { id: "leads", icon: "◈", label: "Leads" },
    { id: "kanban", icon: "⊞", label: "Funil" },
    { id: "atribuicao", icon: "◎", label: "Atribuição" },
  ];

  const leadsUrgentes = leads.filter(l => l.urgencia === "alta" && l.intencao === "interesse");
  const leadsFiltrados = filtroIntencao ? leads.filter(l => l.intencao === filtroIntencao) : leads;

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg, color: COLORS.text,
      fontFamily: "'DM Mono', 'Courier New', monospace", display: "flex",
    }}>
      {/* Sidebar */}
      <div style={{
        width: 56, background: COLORS.surface,
        borderRight: `1px solid ${COLORS.border}`,
        display: "flex", flexDirection: "column",
        alignItems: "center", paddingTop: 20, gap: 4, flexShrink: 0,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: COLORS.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, marginBottom: 20, fontWeight: 900, color: "#fff",
        }}>⚡</div>
        {nav.map(n => (
          <button key={n.id} onClick={() => { setView(n.id); setSelectedLead(null); }}
            title={n.label}
            style={{
              width: 40, height: 40, borderRadius: 10, position: "relative",
              background: view === n.id ? COLORS.accent + "22" : "none",
              border: view === n.id ? `1px solid ${COLORS.accent}44` : "1px solid transparent",
              color: view === n.id ? COLORS.accent : COLORS.muted,
              fontSize: 16, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", transition: "all 0.15s",
            }}>
            {n.icon}
            {n.id === "caixa" && leadsUrgentes.length > 0 && (
              <span style={{
                position: "absolute", top: 6, right: 6,
                width: 8, height: 8, borderRadius: "50%",
                background: COLORS.red, border: `2px solid ${COLORS.bg}`,
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: "auto", padding: "28px 28px" }}>

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 3, marginBottom: 6 }}>VISÃO GERAL</div>
              <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Dashboard</h1>
            </div>

            {/* Alerta leads urgentes */}
            {leadsUrgentes.length > 0 && (
              <div onClick={() => setView("caixa")} style={{
                background: COLORS.red + "0f", border: `1px solid ${COLORS.red}44`,
                borderRadius: 10, padding: "12px 16px", marginBottom: 20,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ fontSize: 18 }}>🔥</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, color: COLORS.red, fontWeight: 700 }}>
                    {leadsUrgentes.length} lead{leadsUrgentes.length > 1 ? "s" : ""} com interesse alto aguardando resposta
                  </span>
                  <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>
                    {leadsUrgentes.map(l => l.name).join(", ")}
                  </div>
                </div>
                <span style={{ color: COLORS.muted, fontSize: 12 }}>→</span>
              </div>
            )}

            {/* Intenções do dia */}
            <div style={{
              background: COLORS.surface, border: `1px solid ${COLORS.border}`,
              borderRadius: 12, padding: "20px", marginBottom: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 2 }}>DMs CLASSIFICADAS HOJE</div>
                <AIBadge />
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {Object.entries(INTENCOES).map(([key, val]) => {
                  const count = leads.filter(l => l.intencao === key).length;
                  return (
                    <div key={key} style={{
                      flex: "1 1 120px", background: val.color + "0f",
                      border: `1px solid ${val.color}33`, borderRadius: 10,
                      padding: "12px 14px", textAlign: "center",
                    }}>
                      <div style={{ fontSize: 18, marginBottom: 4 }}>{val.label.split(" ")[0]}</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: val.color }}>{count}</div>
                      <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}>
                        {val.label.split(" ").slice(1).join(" ")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Métricas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 20 }}>
              {metricas.map((m, i) => (
                <div key={i} style={{
                  background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                  borderRadius: 12, padding: "16px 18px",
                }}>
                  <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 1, marginBottom: 10 }}>{m.label.toUpperCase()}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: m.up ? COLORS.green : COLORS.red }}>
                    {m.up ? "↑" : "↓"} {m.delta}
                  </div>
                </div>
              ))}
            </div>

            {/* Funil */}
            <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "20px" }}>
              <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 2, marginBottom: 16 }}>FUNIL DO MÊS</div>
              {[
                { label: "DM Recebida", n: 47, color: COLORS.blue },
                { label: "Qualificado", n: 28, color: COLORS.yellow },
                { label: "Proposta Enviada", n: 12, color: COLORS.accent },
                { label: "Fechou", n: 6, color: COLORS.green },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12 }}>{f.label}</span>
                    <span style={{ fontSize: 12, color: f.color, fontWeight: 700 }}>{f.n}</span>
                  </div>
                  <div style={{ background: COLORS.dim, borderRadius: 4, height: 5 }}>
                    <div style={{ width: `${(f.n / 47) * 100}%`, height: "100%", background: f.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAIXA DE ENTRADA */}
        {view === "caixa" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 3, marginBottom: 6 }}>INTELIGÊNCIA</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Caixa de Entrada</h1>
                <AIBadge />
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>
                Cada DM classificada automaticamente por intenção e urgência
              </div>
            </div>

            {/* Filtros */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              <button onClick={() => setFiltroIntencao(null)} style={{
                background: !filtroIntencao ? COLORS.accent + "22" : "none",
                border: `1px solid ${!filtroIntencao ? COLORS.accent + "66" : COLORS.border}`,
                color: !filtroIntencao ? COLORS.accent : COLORS.muted,
                borderRadius: 20, padding: "4px 14px", fontSize: 11,
                cursor: "pointer", letterSpacing: 1,
              }}>TODAS</button>
              {Object.entries(INTENCOES).map(([key, val]) => (
                <button key={key} onClick={() => setFiltroIntencao(filtroIntencao === key ? null : key)} style={{
                  background: filtroIntencao === key ? val.color + "22" : "none",
                  border: `1px solid ${filtroIntencao === key ? val.color + "66" : COLORS.border}`,
                  color: filtroIntencao === key ? val.color : COLORS.muted,
                  borderRadius: 20, padding: "4px 14px", fontSize: 11,
                  cursor: "pointer",
                }}>{val.label}</button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {leadsFiltrados.map(lead => {
                const intencao = INTENCOES[lead.intencao];
                const urgencia = URGENCIAS[lead.urgencia];
                return (
                  <div key={lead.id}
                    onClick={() => { setSelectedLead(lead); setView("leads"); }}
                    style={{
                      background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                      borderRadius: 10, padding: "14px 16px", cursor: "pointer",
                      borderLeft: `3px solid ${intencao.color}`,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = COLORS.dim}
                    onMouseLeave={e => e.currentTarget.style.background = COLORS.surface}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <Avatar initials={lead.avatar} size={38} color={intencao.color} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 14, fontWeight: 700 }}>{lead.name}</span>
                          <IntencaoTag intencao={lead.intencao} />
                          <Tag label={urgencia.label} color={urgencia.color} />
                        </div>
                        {/* Mensagem */}
                        <div style={{
                          fontSize: 12, color: COLORS.muted, marginBottom: 8,
                          fontStyle: "italic", lineHeight: 1.5,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          "{lead.ultimaMsg}"
                        </div>
                        {/* IA insights */}
                        <div style={{
                          background: intencao.color + "0a", border: `1px solid ${intencao.color}22`,
                          borderRadius: 8, padding: "8px 12px", display: "flex", gap: 12, flexWrap: "wrap",
                        }}>
                          <div>
                            <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 1, marginBottom: 2 }}>RESUMO IA</div>
                            <div style={{ fontSize: 11, color: COLORS.text }}>{lead.resumo}</div>
                          </div>
                          <div style={{ borderLeft: `1px solid ${COLORS.border}`, paddingLeft: 12 }}>
                            <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 1, marginBottom: 2 }}>AÇÃO SUGERIDA</div>
                            <div style={{ fontSize: 11, color: intencao.color, fontWeight: 600 }}>{lead.acao}</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: 10, color: COLORS.muted, flexShrink: 0 }}>{lead.ts}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LEADS */}
        {view === "leads" && !selectedLead && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 3, marginBottom: 6 }}>CRM</div>
              <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Leads</h1>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {leads.map(lead => (
                <div key={lead.id} onClick={() => setSelectedLead(lead)} style={{
                  background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                  borderRadius: 10, padding: "14px 16px",
                  display: "flex", alignItems: "center", gap: 14,
                  cursor: "pointer", transition: "border-color 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.accent + "55"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
                >
                  <Avatar initials={lead.avatar} size={38} color={INTENCOES[lead.intencao]?.color} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{lead.name}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <IntencaoTag intencao={lead.intencao} />
                      <EstagioTag estagio={lead.estagio} />
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>{lead.ts}</div>
                    <Tag label={URGENCIAS[lead.urgencia].label} color={URGENCIAS[lead.urgencia].color} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEAD DETALHE */}
        {view === "leads" && selectedLead && (
          <div>
            <button onClick={() => setSelectedLead(null)} style={{
              background: "none", border: "none", color: COLORS.muted,
              cursor: "pointer", fontSize: 12, marginBottom: 20, padding: 0, letterSpacing: 1,
            }}>← VOLTAR</button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16 }}>
              <div>
                {/* Perfil */}
                <div style={{
                  background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                  borderRadius: 12, padding: 20, marginBottom: 12,
                }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
                    <Avatar initials={selectedLead.avatar} size={48} color={INTENCOES[selectedLead.intencao]?.color} />
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 6 }}>{selectedLead.name}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <IntencaoTag intencao={selectedLead.intencao} />
                        <EstagioTag estagio={selectedLead.estagio} />
                      </div>
                    </div>
                  </div>
                  {[
                    { label: "Origem", value: selectedLead.origem, color: COLORS.accent },
                    { label: "Canal", value: selectedLead.canal === "instagram" ? "📸 Instagram DM" : "📱 WhatsApp" },
                    { label: "WhatsApp", value: selectedLead.wa || "Não coletado" },
                    { label: "Valor", value: selectedLead.valor ? `R$ ${selectedLead.valor.toLocaleString()}` : "—" },
                    { label: "Tempo p/ fechar", value: selectedLead.tempo },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between",
                      padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12,
                    }}>
                      <span style={{ color: COLORS.muted }}>{item.label}</span>
                      <span style={{ color: item.color || COLORS.text, fontWeight: 600 }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* IA Card */}
                <div style={{
                  background: COLORS.accent + "08", border: `1px solid ${COLORS.accent}33`,
                  borderRadius: 12, padding: 20, marginBottom: 12,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ fontSize: 10, color: COLORS.accent, letterSpacing: 2 }}>ANÁLISE DA IA</div>
                    <AIBadge />
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 10 }}>
                    <span style={{ color: COLORS.text, fontWeight: 600 }}>Resumo: </span>{selectedLead.resumo}
                  </div>
                  <div style={{
                    background: INTENCOES[selectedLead.intencao]?.color + "15",
                    border: `1px solid ${INTENCOES[selectedLead.intencao]?.color}33`,
                    borderRadius: 8, padding: "10px 12px",
                  }}>
                    <div style={{ fontSize: 9, color: COLORS.muted, letterSpacing: 1, marginBottom: 4 }}>PRÓXIMA AÇÃO SUGERIDA</div>
                    <div style={{ fontSize: 12, color: INTENCOES[selectedLead.intencao]?.color, fontWeight: 700 }}>
                      {selectedLead.acao}
                    </div>
                  </div>
                </div>

                {/* Estágio */}
                <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 2, marginBottom: 14 }}>MOVER ESTÁGIO</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {estagios.map(e => (
                      <div key={e.id} style={{
                        padding: "10px 14px", borderRadius: 8,
                        background: selectedLead.estagio === e.id ? e.color + "22" : COLORS.dim,
                        border: `1px solid ${selectedLead.estagio === e.id ? e.color + "66" : "transparent"}`,
                        fontSize: 12, color: selectedLead.estagio === e.id ? e.color : COLORS.muted,
                        cursor: "pointer", fontWeight: selectedLead.estagio === e.id ? 700 : 400,
                      }}>{e.label}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Conversa */}
              <div style={{
                background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                borderRadius: 12, padding: 20, display: "flex", flexDirection: "column",
              }}>
                <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 2, marginBottom: 16 }}>HISTÓRICO</div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto", maxHeight: 500 }}>
                  {(conversas[selectedLead.id] || [
                    { de: "lead", texto: selectedLead.ultimaMsg, ts: "recente" },
                    { de: "bot", texto: "Mensagem recebida e classificada automaticamente.", ts: "recente", classificou: true },
                  ]).map((msg, i) => (
                    <div key={i}>
                      {msg.classificou && (
                        <div style={{
                          textAlign: "center", fontSize: 10, color: COLORS.accent,
                          margin: "4px 0 8px", display: "flex", alignItems: "center",
                          justifyContent: "center", gap: 6,
                        }}>
                          <span style={{ flex: 1, height: 1, background: COLORS.border }} />
                          <span>⚡ IA classificou: <strong>{INTENCOES[selectedLead.intencao]?.label}</strong></span>
                          <span style={{ flex: 1, height: 1, background: COLORS.border }} />
                        </div>
                      )}
                      <div style={{ display: "flex", justifyContent: msg.de === "eu" ? "flex-end" : "flex-start" }}>
                        <div style={{
                          maxWidth: "80%",
                          background: msg.de === "eu" ? COLORS.accent + "22" : msg.de === "bot" ? COLORS.yellow + "11" : COLORS.dim,
                          border: `1px solid ${msg.de === "eu" ? COLORS.accent + "44" : msg.de === "bot" ? COLORS.yellow + "33" : COLORS.border}`,
                          borderRadius: msg.de === "eu" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                          padding: "10px 14px",
                        }}>
                          {msg.de === "bot" && <div style={{ fontSize: 9, color: COLORS.yellow, marginBottom: 4, letterSpacing: 1 }}>AUTO-RESPOSTA</div>}
                          <div style={{ fontSize: 12, lineHeight: 1.6 }}>{msg.texto}</div>
                          <div style={{ fontSize: 9, color: COLORS.muted, marginTop: 4, textAlign: "right" }}>{msg.ts}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KANBAN */}
        {view === "kanban" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 3, marginBottom: 6 }}>PIPELINE</div>
              <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Funil de Vendas</h1>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {estagios.map(estagio => {
                const cols = leads.filter(l => l.estagio === estagio.id);
                return (
                  <div key={estagio.id} style={{
                    background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                    borderTop: `3px solid ${estagio.color}`, borderRadius: 10, padding: 14,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <span style={{ fontSize: 10, color: estagio.color, fontWeight: 700, letterSpacing: 1 }}>{estagio.label.toUpperCase()}</span>
                      <span style={{ fontSize: 11, background: estagio.color + "22", color: estagio.color, padding: "2px 8px", borderRadius: 20 }}>{cols.length}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {cols.map(lead => (
                        <div key={lead.id}
                          onClick={() => { setSelectedLead(lead); setView("leads"); }}
                          style={{
                            background: COLORS.dim, borderRadius: 8, padding: "12px",
                            cursor: "pointer", border: "1px solid transparent", transition: "all 0.15s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = estagio.color + "44"}
                          onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
                        >
                          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                            <Avatar initials={lead.avatar} size={26} color={INTENCOES[lead.intencao]?.color} />
                            <span style={{ fontSize: 12, fontWeight: 700 }}>{lead.name}</span>
                          </div>
                          <div style={{ marginBottom: 6 }}>
                            <IntencaoTag intencao={lead.intencao} />
                          </div>
                          <div style={{ fontSize: 10, color: COLORS.muted, lineHeight: 1.4 }}>
                            {lead.origem.length > 26 ? lead.origem.slice(0, 26) + "…" : lead.origem}
                          </div>
                          {lead.valor && (
                            <div style={{ fontSize: 11, color: COLORS.green, fontWeight: 700, marginTop: 6 }}>
                              R$ {lead.valor.toLocaleString()}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ATRIBUIÇÃO */}
        {view === "atribuicao" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 3, marginBottom: 6 }}>ANÁLISE</div>
              <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Atribuição de Origem</h1>
            </div>
            <div style={{
              background: COLORS.surface, border: `1px solid ${COLORS.accent}33`,
              borderRadius: 12, padding: "16px 20px", marginBottom: 20,
              borderLeft: `3px solid ${COLORS.accent}`,
            }}>
              <div style={{ fontSize: 11, color: COLORS.accent, letterSpacing: 2, marginBottom: 6 }}>PERGUNTA QUE ISSO RESPONDE</div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Qual conteúdo gerou cada cliente que fechou?</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {origens.map((o, i) => {
                const conv = ((o.fechados / o.leads) * 100).toFixed(0);
                return (
                  <div key={i} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{o.nome}</div>
                        <div style={{ fontSize: 11, color: COLORS.muted }}>{o.leads} leads · {o.fechados} fecharam</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.green }}>R$ {o.receita.toLocaleString()}</div>
                        <div style={{ fontSize: 10, color: COLORS.muted }}>receita gerada</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1, background: COLORS.dim, borderRadius: 4, height: 5 }}>
                        <div style={{ width: `${conv}%`, height: "100%", background: o.cor, borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 11, color: o.cor, fontWeight: 700, flexShrink: 0 }}>{conv}% conv.</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{
              marginTop: 20, background: COLORS.green + "08",
              border: `1px solid ${COLORS.green}33`, borderRadius: 12, padding: "16px 20px",
            }}>
              <div style={{ fontSize: 10, color: COLORS.green, letterSpacing: 2, marginBottom: 8 }}>💡 INSIGHT AUTOMÁTICO</div>
              <div style={{ fontSize: 13, lineHeight: 1.7 }}>
                O <strong>Link na Bio (UTM promo)</strong> tem a maior taxa de conversão (67%) e maior ticket médio. Mas gera poucos leads. Vale testar um anúncio apontando diretamente pra essa oferta.
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e1e32; border-radius: 4px; }
      `}</style>
    </div>
  );
}
