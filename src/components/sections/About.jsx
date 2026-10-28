import { motion } from 'framer-motion';
import {
  BookOpen,
  Bug,
  Code2,
  GraduationCap,
  Handshake,
  Lightbulb,
  Target,
  Wifi,
} from 'lucide-react';
import Section from '../ui/Section';

const values = [
  {
    icon: BookOpen,
    title: 'Continuous learning',
    text: 'Postgraduate IoT studies alongside active backend practice.',
  },
  {
    icon: Bug,
    title: 'Problem-solving',
    text: 'Reproduce, isolate, fix, verify, from gate systems to sensor networks.',
  },
  {
    icon: Code2,
    title: 'Clean, maintainable code',
    text: 'Readable structure and documented decisions; software is read more than written.',
  },
  {
    icon: Handshake,
    title: 'Collaboration & accountability',
    text: 'Shipping in teams and teaching classes taught me to own my work and lift others up.',
  },
  {
    icon: Lightbulb,
    title: 'Practical innovation',
    text: 'Prototype small, test early, iterate, ideas count once they run in the real world.',
  },
];

const stats = [
  { icon: GraduationCap, label: 'MSc in IoT Embedded Computing Systems', sub: 'ACEIoT, University of Rwanda — in progress' },
  { icon: Code2, label: 'Software Developer', sub: 'Java desktop & web applications at SANTECH Ltd' },
  { icon: Wifi, label: 'IoT Builder', sub: 'ESP8266 / ESP32 / Raspberry Pi prototypes' },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About Me"
      title="Backend engineer by practice, IoT explorer by curiosity."
      intro={
        <>
          I build software businesses rely on: Java desktop and web applications with
          MySQL-backed data layers, like the E-Visitors platform I develop at{' '}
          <strong className="font-semibold text-navy-900 dark:text-white">SANTECH Ltd</strong>.
          My <strong className="font-semibold text-navy-900 dark:text-white">MSc in IoT Embedded
          Computing Systems</strong> at the University of Rwanda (ACEIoT) extends that work to
          connected devices: sensors, MQTT, fog computing and TinyML research.
        </>
      }
    >
      {/* Snapshot cards */}
      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, sub }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="card p-5"
          >
            <Icon size={20} className="mb-3 text-accent-deep dark:text-accent-soft" aria-hidden="true" />
            <p className="text-sm font-semibold text-navy-900 dark:text-white">{label}</p>
            <p className="mt-1 text-xs leading-relaxed text-navy-500 dark:text-navy-400">{sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* Values */}
        <div>
          <h3 className="mb-5 font-serif text-lg font-semibold text-navy-900 dark:text-white">
            Professional values
          </h3>
          <ul className="space-y-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-4"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-accent-soft">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900 dark:text-white">{title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
                    {text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Objective + teaching note */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="card border-l-4 !border-l-accent p-6"
          >
            <div className="mb-2 flex items-center gap-2">
              <Target size={16} className="text-accent-deep dark:text-accent-soft" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-navy-700 dark:text-navy-200">
                Career objective
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-navy-600 dark:text-navy-300">
              To grow as a Java backend engineer designing reliable, maintainable services,
              while applying my IoT knowledge to bring intelligent, connected solutions from
              prototype to production.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card p-6"
          >
            <div className="mb-2 flex items-center gap-2">
              <GraduationCap size={16} className="text-accent-deep dark:text-accent-soft" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-navy-700 dark:text-navy-200">
                A teacher&apos;s foundation
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-navy-600 dark:text-navy-300">
              As a Certified TVET Trainer at Kivu Hills Academy (2023–2024), I taught programming
              fundamentals and guided students through real applications. Explaining code to others
              sharpened how I write it: clear structure, honest comments, solutions people can
              follow.
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
