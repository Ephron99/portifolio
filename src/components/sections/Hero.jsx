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
  const [imgError, setImgError] = useState(false);

  const fade = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  });

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden bg-navy-50/40 pt-16 dark:bg-navy-950"
    >
      <NetworkBackground />

      <div className="section-container relative z-10 grid items-center gap-12 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Text column */}
        <div>
          <motion.p {...fade(0)} className="mb-4 inline-flex items-center gap-2 font-mono text-sm text-accent-deep dark:text-accent-soft">
            <MapPin size={14} aria-hidden="true" />
            {profile.location}
          </motion.p>

          <motion.h1
            {...fade(0.1)}
            className="text-4xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            {profile.heroHeadline[0]}{' '}
            <span className="text-accent-deep dark:text-accent-soft">{profile.heroHeadline[1]}</span>
          </motion.h1>

          <motion.p {...fade(0.2)} className="mt-5 font-mono text-lg font-medium text-navy-700 dark:text-navy-200">
            <span aria-hidden="true">&gt; </span>
            {typed}
            <span className="ml-0.5 inline-block w-2 animate-pulse bg-accent text-transparent" aria-hidden="true">
              |
            </span>
            <span className="sr-only">{profile.titles.join(', ')}</span>
          </motion.p>

          <motion.p {...fade(0.3)} className="mt-4 max-w-xl text-base leading-relaxed text-navy-600 dark:text-navy-300">
            {profile.tagline}
          </motion.p>

          <motion.div {...fade(0.4)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              Explore My Projects
              <ArrowDown size={16} aria-hidden="true" />
            </a>

            {cv.ready ? (
              <a href={profile.cv.path} download={profile.cv.label} className="btn-outline">
                <Download size={16} aria-hidden="true" />
                Download CV
              </a>
            ) : (
              <button
                type="button"
                className="btn-outline"
                title={
                  cv.checking
                    ? 'Checking CV file…'
                    : 'CV not found yet — place your PDF at public/cv/ and set the path in src/data/profile.js'
                }
                onClick={() =>
                  alert(
                    'Your CV file is not in the project yet.\n\nAdd it to public/cv/Ephron_Twagirimana_CV.pdf and update the path in src/data/profile.js.'
                  )
                }
              >
                <FileWarning size={16} aria-hidden="true" />
                Download CV
              </button>
            )}

            <a href="#contact" className="btn-ghost border border-transparent hover:border-navy-200 dark:hover:border-navy-700">
              Let&apos;s Work Together
            </a>
          </motion.div>

          <motion.ul {...fade(0.5)} className="mt-8 flex items-center gap-4">
            <li>
              <a
                href={contactStatus.githubReady ? profile.github : undefined}
                aria-disabled={!contactStatus.githubReady}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                title={contactStatus.githubReady ? 'GitHub' : 'Add your GitHub URL in src/data/profile.js'}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border border-navy-200 text-navy-600 transition-colors hover:border-accent hover:text-accent-deep dark:border-navy-700 dark:text-navy-300 dark:hover:text-accent-soft ${
                  contactStatus.githubReady ? '' : 'opacity-40'
                }`}
              >
                <Github size={18} aria-hidden="true" />
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
                className={`flex h-10 w-10 items-center justify-center rounded-lg border border-navy-200 text-navy-600 transition-colors hover:border-accent hover:text-accent-deep dark:border-navy-700 dark:text-navy-300 dark:hover:text-accent-soft ${
                  contactStatus.linkedinReady ? '' : 'opacity-40'
                }`}
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={contactStatus.emailReady ? `mailto:${profile.email}` : '#contact'}
                aria-label="Contact by email"
                title={contactStatus.emailReady ? profile.email : 'Add your email in src/data/profile.js'}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy-200 text-navy-600 transition-colors hover:border-accent hover:text-accent-deep dark:border-navy-700 dark:text-navy-300 dark:hover:text-accent-soft"
              >
                <Mail size={18} aria-hidden="true" />
              </a>
            </li>
          </motion.ul>
        </div>

        {/* Photo column */}
        <motion.div {...fade(0.35)} className="relative mx-auto w-fit">
          <div
            className="absolute -inset-3 rounded-2xl border border-accent/30"
            aria-hidden="true"
          />
          <div className="h-64 w-56 overflow-hidden rounded-2xl border border-navy-200 bg-white shadow-xl sm:h-80 sm:w-72 dark:border-navy-800 dark:bg-navy-900">
            {imgError ? (
              /* Placeholder shown until you add public/images/profile.jpg */
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-navy-100/60 p-6 text-center dark:bg-navy-800/60">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-200 font-mono text-xl font-bold text-navy-600 dark:bg-navy-700 dark:text-navy-200">
                  ET
                </span>
                <p className="text-xs text-navy-500 dark:text-navy-400">
                  Profile photo placeholder
                  <br />
                  <span className="font-mono">public/images/profile.jpg</span>
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
