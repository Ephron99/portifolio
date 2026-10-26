import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile, contactStatus } from '../../data/profile';
import { navLinks } from './Navbar';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-100 bg-navy-50/50 py-10 dark:border-navy-800 dark:bg-navy-900/40">
      <div className="section-container flex flex-col items-center gap-6 text-center">
        <a
          href="#home"
          className="font-mono text-sm font-semibold text-navy-900 hover:text-accent-deep dark:text-white dark:hover:text-accent-soft"
        >
          {profile.name}
        </a>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-navy-600 transition-colors hover:text-accent-deep dark:text-navy-300 dark:hover:text-accent-soft"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-4">
          <li>
            <a
              href={contactStatus.githubReady ? profile.github : undefined}
              aria-disabled={!contactStatus.githubReady}
              title={contactStatus.githubReady ? 'GitHub profile' : 'Add your GitHub URL in src/data/profile.js'}
              target="_blank"
              rel="noreferrer"
              className={`flex h-9 w-9 items-center justify-center rounded-lg border border-navy-200 text-navy-600 transition-colors hover:border-accent hover:text-accent-deep dark:border-navy-700 dark:text-navy-300 dark:hover:text-accent-soft ${
                contactStatus.githubReady ? '' : 'pointer-events-none opacity-40'
              }`}
            >
              <Github size={16} aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </a>
          </li>
          <li>
            <a
              href={contactStatus.linkedinReady ? profile.linkedin : undefined}
              aria-disabled={!contactStatus.linkedinReady}
              title={contactStatus.linkedinReady ? 'LinkedIn profile' : 'Add your LinkedIn URL in src/data/profile.js'}
              target="_blank"
              rel="noreferrer"
              className={`flex h-9 w-9 items-center justify-center rounded-lg border border-navy-200 text-navy-600 transition-colors hover:border-accent hover:text-accent-deep dark:border-navy-700 dark:text-navy-300 dark:hover:text-accent-soft ${
                contactStatus.linkedinReady ? '' : 'pointer-events-none opacity-40'
              }`}
            >
              <Linkedin size={16} aria-hidden="true" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              href={contactStatus.emailReady ? `mailto:${profile.email}` : undefined}
              aria-disabled={!contactStatus.emailReady}
              title={contactStatus.emailReady ? profile.email : 'Add your email in src/data/profile.js'}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border border-navy-200 text-navy-600 transition-colors hover:border-accent hover:text-accent-deep dark:border-navy-700 dark:text-navy-300 dark:hover:text-accent-soft ${
                contactStatus.emailReady ? '' : 'pointer-events-none opacity-40'
              }`}
            >
              <Mail size={16} aria-hidden="true" />
              <span className="sr-only">Email</span>
            </a>
          </li>
        </ul>

        <p className="flex items-center gap-1.5 text-xs text-navy-500 dark:text-navy-400">
          <MapPin size={12} aria-hidden="true" />
          {profile.location}
        </p>

        <p className="text-xs text-navy-500 dark:text-navy-400">
          © {year} {profile.name}. Built with React, Vite &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
