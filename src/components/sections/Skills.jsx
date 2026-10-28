import { motion } from 'framer-motion';
import Section from '../ui/Section';
import { skillCategories } from '../../data/skills';

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="The technologies I work with."
      intro="Grouped by domain, everything here is something I can discuss in depth and demonstrate in code."
      className="bg-navy-50/50 dark:bg-navy-900/30"
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map(({ id, name, icon: Icon, blurb, skills }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            className="card p-6"
          >
            <div className="mb-1 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-accent/40 text-accent-deep dark:text-accent-soft">
                <Icon size={18} aria-hidden="true" />
              </span>
              <h3 className="font-serif text-base font-semibold text-navy-900 dark:text-white">{name}</h3>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-navy-500 dark:text-navy-400">{blurb}</p>

            {/* Accessible skill list; level shown as a subtle bar */}
            <ul className="space-y-2.5" aria-label={`${name} technologies`}>
              {skills.map(({ name, level }) => (
                <li key={name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-navy-800 dark:text-navy-100">{name}</span>
                  </div>
                  <div
                    role="meter"
                    aria-valuenow={level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${name} proficiency`}
                    className="h-1.5 overflow-hidden rounded-full bg-navy-100 dark:bg-navy-800"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                      className="h-full rounded-full bg-accent/70"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
