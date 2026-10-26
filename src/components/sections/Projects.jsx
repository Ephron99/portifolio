import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, Search, FolderOpen } from 'lucide-react';
import Section from '../ui/Section';
import ProjectThumb from './projects/ProjectThumb';
import ProjectModal from './projects/ProjectModal';
import { projects, projectCategories } from '../../data/projects';

function ProjectCard({ project, onOpen, index }) {
  const { source, demo } = project.details?.links ?? {};

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      className="card flex flex-col overflow-hidden"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="relative block h-44 w-full overflow-hidden text-left focus-visible:ring-inset"
        aria-label={`Open details for ${project.title}`}
      >
        <div className="h-full w-full transition-transform duration-300 hover:scale-[1.03]">
          <ProjectThumb project={project} />
        </div>
        <span className="chip absolute left-3 top-3 !bg-navy-950/70 !text-white !border-transparent backdrop-blur-sm">
          {project.category}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h3 className="font-serif text-base font-semibold text-navy-900 dark:text-white">{project.title}</h3>
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent-deep dark:text-accent-soft">
          {project.status}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.slice(0, 4).map((t) => (
            <li key={t} className="chip">{t}</li>
          ))}
          {project.technologies.length > 4 && (
            <li className="chip">+{project.technologies.length - 4}</li>
          )}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => onOpen(project)} className="btn-primary !px-4 !py-2 !text-xs">
            View Details
          </button>
          {source ? (
            <a href={source} target="_blank" rel="noreferrer" className="btn-outline !px-3 !py-2 !text-xs" aria-label={`${project.title} source code`}>
              <Github size={14} aria-hidden="true" /> Source
            </a>
          ) : (
            <span
              className="btn-outline !px-3 !py-2 !text-xs opacity-40"
              title="Source code not published yet — add the GitHub URL in src/data/projects.js"
            >
              <Github size={14} aria-hidden="true" /> Source
            </span>
          )}
          {demo ? (
            <a href={demo} target="_blank" rel="noreferrer" className="btn-ghost !px-3 !py-2 !text-xs" aria-label={`${project.title} live demo`}>
              <ExternalLink size={14} aria-hidden="true" /> Demo
            </a>
          ) : (
            <span
              className="btn-ghost !px-3 !py-2 !text-xs opacity-40"
              title="No live demo yet — add the URL in src/data/projects.js when deployed"
            >
              <ExternalLink size={14} aria-hidden="true" /> Demo
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const inCategory =
        category === 'all' ||
        projectCategories.find((c) => c.id === category)?.name === p.category;
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return inCategory && inQuery;
    });
  }, [category, query]);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work — production systems to research prototypes."
      intro="Filter by domain or search by name and technology. Each card opens a full case study: architecture, role, challenges, and what is genuinely implemented versus planned."
    >
      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <ul className="flex flex-wrap gap-2" aria-label="Project categories">
          {projectCategories.map(({ id, name }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => setCategory(id)}
                aria-pressed={category === id}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === id
                    ? 'bg-navy-900 text-white dark:bg-accent dark:text-navy-950'
                    : 'border border-navy-200 text-navy-600 hover:border-accent hover:text-accent-deep dark:border-navy-700 dark:text-navy-300 dark:hover:text-accent-soft'
                }`}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>

        <div className="relative w-full lg:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or technologies…"
            aria-label="Search projects by name or technology"
            className="input-field !pl-9"
          />
        </div>
      </div>

      {/* Gallery */}
      {filtered.length > 0 ? (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="card flex flex-col items-center gap-3 p-12 text-center">
          <FolderOpen size={28} className="text-navy-300 dark:text-navy-600" aria-hidden="true" />
          <p className="text-sm text-navy-600 dark:text-navy-300">
            No projects match “{query}” in this category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
            className="btn-ghost !text-xs"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </Section>
  );
}
