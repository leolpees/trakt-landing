import config from '../config'

export default function Navbar() {
  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <span className="navbar-logo">
          <span className="navbar-logo-dot" />
          {config.appName}
        </span>

        <ul className="navbar-links">
          <li><a href="#how">Como funciona</a></li>
          <li><a href="#features">Recursos</a></li>
          <li><a href="#precos">Preços</a></li>
        </ul>

        <div className="navbar-actions">
          <a href="#waitlist" className="btn btn-ghost btn-sm">Entrar</a>
          <a href="#waitlist" className="btn btn-primary btn-sm">Começar grátis</a>
        </div>
      </nav>
    </header>
  )
}
