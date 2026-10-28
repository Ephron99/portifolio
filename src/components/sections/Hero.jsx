import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, FileWarning, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import NetworkBackground from './hero/NetworkBackground';
import { useTypingWords } from '../../hooks/useTypingWords';
import { useCvStatus } from '../../utils/useCvStatus';
import { profile, contactStatus } from '../../data/profile';


export default function Hero() {
  const typed = useTypingWords(profile.titles);
  const cv = useCvStatus();
  const [cvNotice, setCvNotice] = useState(false);
  const [imgError, setImgError] = useState(false);
  const photo = "/images/twagirimana-ephron.jpg";

  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  });

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden bg-white pt-16 dark:bg-navy-950"
    >
      <NetworkBackground />

      <div className="section-container relative z-10 grid items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Text column */}
        <div>
          <motion.p
            {...fade(0)}
            className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep dark:text-accent-soft"
          >
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <MapPin size={12} aria-hidden="true" />
            {profile.location}
          </motion.p>

          <motion.h1
            {...fade(0.1)}
            className="font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            {profile.heroHeadline[0] + ' '}
            <em className="text-accent-deep dark:text-accent-soft">{profile.heroHeadline[1]}</em>
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="mt-5 font-serif text-lg italic text-navy-700 dark:text-navy-200"
          >
            {typed}
            <span className="ml-0.5 inline-block w-2 animate-pulse text-accent" aria-hidden="true">
              |
            </span>
            <span className="sr-only">{profile.titles.join(', ')}</span>
          </motion.p>

          <motion.p
            {...fade(0.3)}
            className="mt-4 max-w-xl text-base leading-relaxed text-navy-600 dark:text-navy-300"
          >
            Java backend engineering, web applications, and connected systems that solve
            real-world problems.
          </motion.p>

          <motion.div {...fade(0.4)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              Explore My Projects
              <ArrowDown size={15} aria-hidden="true" />
            </a>

            {cv.ready ? (
              <a href={profile.cv.path} download={profile.cv.label} className="btn-outline">
                <Download size={15} aria-hidden="true" />
                Download CV
              </a>
            ) : (
              <button
                type="button"
                className="btn-outline"
                aria-expanded={cvNotice}
                onClick={() => setCvNotice((n) => !n)}
              >
                <FileWarning size={15} aria-hidden="true" />
                Download CV
              </button>
            )}

            <a href="#contact" className="btn-ghost">
              Let&apos;s Work Together
            </a>
          </motion.div>

          {/* Inline, honest CV setup notice (no blocking dialogs) */}
          {cvNotice && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 max-w-md rounded-lg border border-accent/40 bg-navy-50 p-3 text-xs leading-relaxed text-navy-600 dark:bg-navy-900 dark:text-navy-300"
            >
              The CV file isn&apos;t in the project yet. Place your PDF at{' '}
              <code className="font-mono">public/cv/Ephron_Twagirimana_CV.pdf</code> — the
              button activates automatically once the file exists.
            </motion.p>
          )}

          <motion.ul {...fade(0.5)} className="mt-8 flex items-center gap-3">
            <li>
              <a
                href={contactStatus.githubReady ? profile.github : undefined}
                aria-disabled={!contactStatus.githubReady}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                title={contactStatus.githubReady ? 'GitHub' : 'https://github.com/Ephron99'}
                className={`flex h-10 w-10 items-center justify-center rounded-md border border-navy-200 text-navy-600 transition-colors hover:border-accent hover:text-accent-deep dark:border-navy-700 dark:text-navy-300 dark:hover:text-accent-soft ${
                  contactStatus.githubReady ? '' : 'opacity-40'
                }`}
              >
                <Github size={17} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={contactStatus.linkedinReady ? profile.linkedin : undefined}
                aria-disabled={!contactStatus.linkedinReady}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                title={contactStatus.linkedinReady ? 'LinkedIn' : 'Add your LinkedIn URL in src/data/profile.js'}
                className={`flex h-10 w-10 items-center justify-center rounded-md border border-navy-200 text-navy-600 transition-colors hover:border-accent hover:text-accent-deep dark:border-navy-700 dark:text-navy-300 dark:hover:text-accent-soft ${
                  contactStatus.linkedinReady ? '' : 'opacity-40'
                }`}
              >
                <Linkedin size={17} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={contactStatus.emailReady ? `mailto:${profile.email}` : '#contact'}
                aria-label="Contact by email"
                title={contactStatus.emailReady ? profile.email : 'twagirimanaephron1@gmail.com'}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-navy-200 text-navy-600 transition-colors hover:border-accent hover:text-accent-deep dark:border-navy-700 dark:text-navy-300 dark:hover:text-accent-soft"
              >
                <Mail size={17} aria-hidden="true" />
              </a>
            </li>
          </motion.ul>
        </div>

        {/* Photo column — classic portrait frame */}
        <motion.div {...fade(0.35)} className="relative mx-auto w-fit">
          <div
            className="absolute -inset-2 rounded-lg border border-navy-200 dark:border-navy-700"
            aria-hidden="true"
          />
          <div
            className="absolute -inset-4 rounded-lg border border-accent/40"
            aria-hidden="true"
          />
          <div className="relative h-64 w-56 overflow-hidden rounded-md bg-navy-50 shadow-lg sm:h-80 sm:w-72 dark:bg-navy-900">
            {imgError ? (
              /* Placeholder shown until you add public/images/profile.jpg */
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/50 font-serif text-xl font-semibold text-navy-800 dark:text-navy-100">
                  ET
                </span>
                <p className="text-xs uppercase tracking-widest text-navy-400 dark:text-navy-500">
                  <img src={photo} alt="Twagirimana Ephron" />

                  <br />
                  <span className="font-mono normal-case tracking-normal"><img src="/images/twagirimana ephron.jpg" alt="Twagirimana Ephron" /></span>
                </p>
              </div>
            ) : (
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-navy-400 transition-colors hover:text-accent-deep dark:hover:text-accent-soft"
      >
        <ArrowDown size={20} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
