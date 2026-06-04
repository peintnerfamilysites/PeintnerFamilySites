import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../../data/siteContent';
import { useScrollLock } from '../../hooks/useScrollLock';
import mobileNav from '../../assets/mobile-nav.webp';
import mainLogo from '../../assets/main-logo.webp';
import pLogo from '../../assets/p-logo-cropped.webp';
import fLogo from '../../assets/f-logo-cropped.webp';
import sLogo from '../../assets/s-logo-cropped.webp';
import { CallButton } from '../ui/CallButton';

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.36,
      ease: [0.7, 0, 0.84, 0],
      when: 'afterChildren',
      staggerChildren: 0.035,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.34,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.075,
      delayChildren: 0.08,
    },
  },
};

const mobilePanelVariants = {
  closed: {
    scale: 1.04,
    filter: 'blur(10px)',
    transition: { duration: 0.36, ease: [0.7, 0, 0.84, 0] },
  },
  open: {
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.56, ease: [0.16, 1, 0.3, 1] },
  },
};

const mobileItemVariants = {
  closed: {
    opacity: 0,
    y: 28,
    scale: 0.96,
    transition: { duration: 0.24, ease: [0.7, 0, 0.84, 0] },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
  },
};

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useScrollLock(open);

  useEffect(() => {
    let frame = 0;

    const updateScrolled = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const nextScrolled = window.scrollY > 24;
        setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
      });
    };

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrolled);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        className="nav-shell"
        aria-label="Primary navigation"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="desktop-art-nav">
          <Link className="desktop-art-nav__brand" to="/" aria-label="Peintner Family Sites home">
            <img className="desktop-art-nav__main-logo" src={mainLogo} alt="" decoding="async" />
            <span className="desktop-art-nav__wordmark">
              <span className="desktop-art-nav__letters" aria-label="PFS">
                <img src={pLogo} alt="" decoding="async" />
                <img src={fLogo} alt="" decoding="async" />
                <img src={sLogo} alt="" decoding="async" />
              </span>
              <small>Peintner Family Sites</small>
            </span>
          </Link>

          <nav className="desktop-art-nav__links" aria-label="Desktop navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                end={link.path === '/'}
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="desktop-art-nav__actions">
            <CallButton compact className="nav-call" />
            <Link className="desktop-art-nav__cta" to="/contact">
              <span>Start build</span>
            </Link>
          </div>
        </div>

        <Link
          className={`nav-brand mobile-brand ${scrolled ? 'mobile-brand--scrolled' : ''}`}
          to="/"
          aria-label="Peintner Family Sites home"
        >
          <img src={mainLogo} alt="" decoding="async" />
          <span>
            <strong>PFS</strong>
            <small>Peintner Family Sites</small>
          </span>
        </Link>

        <button
          className="mobile-trigger"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </motion.header>

      <AnimatePresence mode="wait">
        {open ? (
          <motion.aside
            className="mobile-menu"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            aria-modal="true"
            role="dialog"
            onClick={close}
          >
            <motion.div
              className="mobile-menu__art"
              style={{ backgroundImage: `url(${mobileNav})` }}
              variants={mobilePanelVariants}
            >
              <div className="mobile-menu__scrim" />
              <div className="mobile-menu__content" onClick={(event) => event.stopPropagation()}>
                <motion.button
                  className="mobile-menu__close"
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  variants={mobileItemVariants}
                >
                  ×
                </motion.button>

                <motion.div className="mobile-menu__brand" variants={mobileItemVariants}>
                  <Link className="mobile-menu__logo-wrap" to="/" onClick={close} aria-label="PFS home">
                    <img className="mobile-menu__logo" src={mainLogo} alt="Peintner Family Sites" decoding="async" />
                  </Link>
                  <div className="mobile-menu__wordmark" aria-label="Peintner Family Sites">
                    <strong>PFS</strong>
                    <span>Peintner Family Sites</span>
                  </div>
                </motion.div>

                <nav className="mobile-menu__links" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <motion.div key={link.path} variants={mobileItemVariants}>
                      <NavLink
                        to={link.path}
                        onClick={close}
                        className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                        end={link.path === '/'}
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>

                <motion.div className="mobile-menu__actions" variants={mobileItemVariants}>
                  <a className="mobile-menu__call" href="tel:+19034177043" onClick={close}>
                    <small>Call me</small>
                    <strong>(903) 417-7043</strong>
                  </a>
                  <Link className="mobile-menu__cta" to="/contact" onClick={close}>
                    Start a project
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
