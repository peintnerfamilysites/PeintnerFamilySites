import { Link, NavLink } from 'react-router-dom';
import mainLogo from '../assets/main-logo.webp';
import { pfsPhone } from '../data/contactInfo';

export function Footer() {
  return (
    <footer className="footer shell">
      <Link className="footer__brand" to="/" aria-label="PFS home">
        <span className="footer__logo-shell">
          <img decoding="async" src={mainLogo} alt="" width="512" height="512" />
        </span>
        <span className="footer__wordmark">
          <small>Studio</small>
          <strong>Peintner Family Sites</strong>
        </span>
      </Link>

      <div className="footer__meta">
        <p>© 2026 PFS. Built with React, Three.js, and Tailwind.</p>
        <nav className="footer__links" aria-label="Footer navigation">
          <NavLink
            to="/services"
            className={({ isActive }) => `footer__link${isActive ? ' footer__link--active' : ''}`}
          >
            Services
          </NavLink>
          <NavLink
            to="/terms"
            className={({ isActive }) => `footer__link${isActive ? ' footer__link--active' : ''}`}
          >
            Terms of Use
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `footer__link${isActive ? ' footer__link--active' : ''}`}
          >
            Contact
          </NavLink>
        </nav>
        <a className="footer__phone" href={pfsPhone.href}>Call {pfsPhone.display}</a>
      </div>
    </footer>
  );
}
