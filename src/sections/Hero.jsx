import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
const StudioWorld = lazy(() => import('../components/scene/StudioWorld'));
import mainLogo from '../assets/main-logo.webp';
import pLogo from '../assets/p-logo.webp';
import fLogo from '../assets/f-logo.webp';
import sLogo from '../assets/s-logo.webp';
import { Link } from 'react-router-dom';
import { stats } from '../data/siteContent';
import { CallButton } from '../components/ui/CallButton';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__ambient" />
      <Suspense fallback={<div className="studio-world studio-world--fallback" aria-hidden="true" />}>
        <StudioWorld />
      </Suspense>

      <div className="hero__content shell">
        <motion.div
          className="hero__panel"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <div className="eyebrow-pill">Premium web design studio</div>
          <img className="hero__logo" src={mainLogo} alt="Peintner Family Sites" />
          <h1>Websites that make small brands feel elite.</h1>
          <p>
            Peintner Family Sites builds sharp, fast, mobile-ready websites and custom React experiences with the kind of polish that makes visitors trust you before they ever call.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/contact">Start a project</Link>
            <CallButton />
            <Link className="button button--ghost" to="/work">View the vision</Link>
          </div>
        </motion.div>

        <motion.div
          className="hero__mark-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          aria-label="PFS initials"
        >
          {[pLogo, fLogo, sLogo].map((logo, index) => (
            <img key={index} src={logo} alt="" />
          ))}
        </motion.div>

        <div className="stats-grid" aria-label="Studio highlights">
          {stats.map((item, index) => (
            <motion.div
              className="stat-card"
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 + index * 0.07, duration: 0.5 }}
            >
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
