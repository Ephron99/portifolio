import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import ProjectThumb from './ProjectThumb';

/**
 * Reusable project detail modal covering overview, problem, role,
 * architecture, features, challenges, technologies and links.
 * Handles Escape close, backdrop click and focus restore.
 */
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Simple focus trap: keep Tab cycling inside the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const d = project.details;

  const Block = ({ title, children }) => (
    <div>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-navy-700 dark:text-navy-200">
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        ref={dialogRef}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-navy-100 bg-white shadow-2xl sm:rounded-2xl dark:border-navy-800 dark:bg-navy-900"
      >
        {/* Header image */}
        <div className="relative h-44 sm:h-52">
          <ProjectThumb project={project} />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy-950/60 text-white transition-colors hover:bg-navy-950/90"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="chip">{project.category}</span>
            <span className="chip !border-accent/40 !bg-accent/10 !text-accent-deep dark:!text-accent-soft">
              {project.status}
            </span>
          </div>
          <h2 id="project-modal-title" className="font-serif text-2xl font-semibold text-navy-900 dark:text-white">
            {project.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
            {d.problem ? `Problem — ${d.problem}` : project.summary}
          </p>

          {/* Links row (only when available) */}
          {(d.links?.source || d.links?.demo) && (
            <div className="mt-4 flex flex-wrap gap-3">
              {d.links.source && (
                <a href={d.links.source} target="_blank" rel="noreferrer" className="btn-outline !py-2">
                  <Github size={15} aria-hidden="true" /> Source Code
                </a>
              )}
              {d.links.demo && (
                <a href={d.links.demo} target="_blank" rel="noreferrer" className="btn-primary !py-2">
                  <ExternalLink size={15} aria-hidden="true" /> Live Demo
                </a>
              )}
            </div>
          )}

          <div className="mt-6 space-y-6">
            {project.implemented?.length > 0 && (
              <Block title="What is implemented">
                <ul className="space-y-1.5 text-sm text-navy-600 dark:text-navy-300">
                  {project.implemented.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {project.planned?.length > 0 && (
              <Block title="Research objectives / planned work">
                <ul className="space-y-1.5 text-sm text-navy-500 dark:text-navy-400">
                  {project.planned.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-navy-300 dark:border-navy-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {d.role && (
              <Block title="My role & contributions">
                <p className="text-sm leading-relaxed text-navy-600 dark:text-navy-300">{d.role}</p>
              </Block>
            )}

            {d.architecture && (
              <Block title="Technical architecture">
                <p className="text-sm leading-relaxed text-navy-600 dark:text-navy-300">{d.architecture}</p>
              </Block>
            )}

            {d.features?.length > 0 && (
              <Block title="Key features">
                <ul className="grid gap-1.5 text-sm text-navy-600 sm:grid-cols-2 dark:text-navy-300">
                  {d.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {d.challenges?.length > 0 && (
              <Block title="Challenges & solutions">
                <ul className="space-y-3">
                  {d.challenges.map(({ challenge, solution }) => (
                    <li key={challenge} className="rounded-lg border border-navy-100 p-3 text-sm dark:border-navy-800">
                      <p className="font-medium text-navy-800 dark:text-navy-100">{challenge}</p>
                      <p className="mt-1 text-navy-500 dark:text-navy-400">
                        <span className="font-semibold text-accent-deep dark:text-accent-soft">Solution: </span>
                        {solution}
                      </p>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block title="Technologies used">
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
