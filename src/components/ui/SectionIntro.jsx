import { motion } from 'framer-motion';

export function SectionIntro({ eyebrow, title, text, align = 'left' }) {
  return (
    <motion.div
      className={`section-intro section-intro--${align}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </motion.div>
  );
}
