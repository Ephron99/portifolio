import { motion } from 'framer-motion';
import { Award, BookOpen, CalendarDays, GraduationCap, ShieldCheck } from 'lucide-react';
import Section from '../ui/Section';
import { education, certifications } from '../../data/education';

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="05 · Education & Certifications"
      title="Academic foundation and professional credentials."
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Education timeline */}
        <div>
          <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-navy-700 dark:text-navy-200">
            <BookOpen size={16} className="text-accent-deep dark:text-accent-soft" aria-hidden="true" />
            Education
          </h3>
          <ol className="relative space-y-5 border-l-2 border-navy-200 pl-6 dark:border-navy-700">
            {education.map(({ id, degree, school, period, status, note }, i) => (
              <motion.li
                key={id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[31px] top-5 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    status === 'Currently enrolled'
                      ? 'border-accent bg-accent/15 text-accent-deep dark:text-accent-soft'
                      : 'border-navy-300 bg-white dark:border-navy-600 dark:bg-navy-900'
                  }`}
                >
                  <GraduationCap size={12} aria-hidden="true" />
                </span>
                <div className="card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="text-base font-semibold text-navy-900 dark:text-white">{degree}</h4>
                    <span className="chip whitespace-nowrap">
                      {period || (
                        <em className="not-italic opacity-70">Year optional</em>
                      )}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-navy-600 dark:text-navy-300">{school}</p>
                  <p className="mt-2 text-xs leading-relaxed text-navy-500 dark:text-navy-400">{note}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-accent-deep dark:text-accent-soft">
                    <CalendarDays size={12} aria-hidden="true" />
                    {status}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-navy-700 dark:text-navy-200">
            <Award size={16} className="text-accent-deep dark:text-accent-soft" aria-hidden="true" />
            Certifications
          </h3>
          {certifications.map(({ id, name, issuer, issued, credential }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card relative overflow-hidden p-6"
            >
              <span
                aria-hidden="true"
                className="absolute right-4 top-4 text-navy-100 dark:text-navy-800"
              >
                <ShieldCheck size={64} strokeWidth={1} />
              </span>
              <div className="relative">
                <span className="chip mb-3 inline-flex !border-accent/40 !bg-accent/10 !text-accent-deep dark:!text-accent-soft">
                  Certified
                </span>
                <h4 className="text-base font-semibold text-navy-900 dark:text-white">{name}</h4>
                <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">{issuer}</p>
                <dl className="mt-4 space-y-1.5 text-xs text-navy-500 dark:text-navy-400">
                  <div className="flex gap-2">
                    <dt className="font-semibold text-navy-700 dark:text-navy-200">Issued:</dt>
                    <dd>{issued}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold text-navy-700 dark:text-navy-200">Credential:</dt>
                    <dd className="font-mono">{credential}</dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
