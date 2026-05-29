import config from '../config'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>{config.appName} © {new Date().getFullYear()}</span>
        <div className="footer-links">
          <a href="/privacy">Privacidade</a>
          <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
        </div>
      </div>
    </footer>
  )
}
