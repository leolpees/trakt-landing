import { useState } from 'react'
import config from '../config'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      await fetch(`${config.apiUrl}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="waitlist" id="waitlist">
      <div className="container container-sm">
        <h2>Seja um dos primeiros</h2>
        <p>Trakt está em acesso antecipado. Deixe seu email e avisamos quando abrir.</p>
        {status === 'success' ? (
          <p className="waitlist-success">✓ Recebemos seu email! Te avisamos em breve.</p>
        ) : (
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Enviando...' : 'Garantir minha vaga'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="waitlist-error">Algo deu errado. Tente novamente ou entre em contato: {config.contactEmail}</p>
        )}
      </div>
    </section>
  )
}
