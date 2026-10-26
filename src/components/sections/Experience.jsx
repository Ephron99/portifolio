import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, CalendarRange, ChevronDown, MapPin } from 'lucide-react';
import Section from '../ui/Section';
import { experience } from '../../data/experience';

export default function ExperienceSection() {
  // First role expanded by default; clicking headers switches the open one.
  const [openId, setOpenId] = useState(experience[0]?.id ?? null);

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked and grown."
      intro="Industry development roles and classroom training — each taught me a different side of software. Click a role to expand."
      className="bg-navy-50/50 dark:bg-navy-900/30"
    >
      <ol className="relative space-y-4 border-l-2 border-navy-200 pl-6 sm:pl-8 dark:border-navy-700">
        {experience.map(({ id, company, role, period, location, current, highlights, tags }, i) => {
          const isOpen = openId === id;
          return (
            <motion.li
              key={id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative"
            >
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className={`absolute -left-[31px] top-5 h-3.5 w-3.5 rounded-full border-2 sm:-left-[39px] ${
                  current
                    ? 'border-accent bg-accent/30 dark:bg-accent'
                    : 'border-navy-300 bg-white dark:border-navy-600 dark:bg-navy-900'
                }`}
              />

              <div className={`card overflow-hidden ${isOpen ? 'border-accent/50' : ''}`}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-base font-semibold text-navy-900 dark:text-white">{role}</h3>
                      {current && (
                        <span className="chip !border-accent/40 !bg-accent/10 !text-accent-deep dark:!text-accent-soft">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy-600 dark:text-navy-300">
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 size={14} aria-hidden="true" />
                        {company}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarRange size={14} aria-hidden="true" />
                        {period || (
                          <em className="text-navy-400 dark:text-navy-500">
                            Add dates in src/data/experience.js
                          </em>
                        )}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} aria-hidden="true" />
                        {location}
                      </span>
                    </p>
                  </div>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`mt-1 shrink-0 text-navy-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <div className="border-t border-navy-100 px-5 py-4 dark:border-navy-800">
                        <ul className="space-y-2">
                          {highlights.map((h) => (
                            <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                              {h}
                            </li>
                          ))}
                        </ul>
                        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills used">
                          {tags.map((t) => (
                            <li key={t} className="chip">{t}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
