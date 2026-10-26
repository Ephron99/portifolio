import { motion } from 'framer-motion';

/**
 * Shared section shell: consistent id, spacing, heading and intro so every
 * section of the portfolio follows the same design rhythm.
 */
export default function Section({ id, eyebrow, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`section-padding ${className}`} aria-labelledby={`${id}-title`}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 max-w-2xl"
        >
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep dark:text-accent-soft">
              {eyebrow}
            </p>
          )}
          <h2
            id={`${id}-title`}
            className="font-serif text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl dark:text-white"
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-4 border-l-2 border-accent/40 pl-4 text-base leading-relaxed text-navy-600 dark:text-navy-300">
              {intro}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
