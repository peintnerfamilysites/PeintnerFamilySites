import { motion } from 'framer-motion';

export function PageHeader({ eyebrow, title, text }) {
  return (
    <section className="page-hero shell">
      <motion.div
        className="page-hero__panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </motion.div>
    </section>
  );
}
