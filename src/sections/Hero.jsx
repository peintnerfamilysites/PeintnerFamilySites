import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
const StudioWorld = lazy(() => import('../components/scene/StudioWorld'));
import mainLogo from '../assets/main-logo.webp';
import brandSlotInterface from '../assets/brand-slot-interface.webp';
import brandSlotArchitecture from '../assets/brand-slot-architecture.webp';
import brandSlotGrowth from '../assets/brand-slot-growth.webp';
import { Link } from 'react-router-dom';
import { stats } from '../data/siteContent';
import { CallButton } from '../components/ui/CallButton';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__ambient" />
      <div className="hero__content shell">
        <div className="hero__panel-stage">
          <Suspense fallback={<div className="studio-world studio-world--fallback" aria-hidden="true" />}>
            <StudioWorld />
          </Suspense>

          <motion.div
            className="hero__panel"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
          <div className="eyebrow-pill">Premium web design & apps</div>
          <img className="hero__logo" src={mainLogo} alt="Peintner Family Sites" width="512" height="512" decoding="async" fetchPriority="high" />
          <h1>Websites and applications built to make your business look elite.</h1>
          <p>
            Peintner Family Sites designs and develops premium websites, landing pages, and custom web applications that feel modern, load fast, and turn visitors into real opportunities.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/contact">Start a project</Link>
            <CallButton />
            <Link className="button button--ghost" to="/work">View the vision</Link>
          </div>
          </motion.div>
        </div>

        <motion.div
          className="hero__mark-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          aria-label="Brand visuals"
        >
          {[
            { src: brandSlotInterface, alt: 'Premium website interface and user experience visual' },
            { src: brandSlotArchitecture, alt: 'Custom web application architecture visual' },
            { src: brandSlotGrowth, alt: 'Business growth and launch dashboard visual' },
          ].map((item, index) => (
            <img
              key={index}
              className="hero__mark-visual"
              src={item.src}
              alt={item.alt}
              width="768"
              height="768"
              loading="lazy"
              decoding="async"
            />
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
