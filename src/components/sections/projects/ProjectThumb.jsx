import { useState } from 'react';

/**
 * Project thumbnail: uses `public/images/projects/<file>.jpg` when present and
 * falls back to a generated category illustration when the image is missing —
 * so the gallery never shows broken images before you add screenshots.
 */

const FALLBACK_ART = {
  'Java Backend': { from: '#0f1e3c', to: '#2e57a3', glyph: '⌘' },
  'Web Development': { from: '#083344', to: '#0891b2', glyph: '⌁' },
  'IoT & Embedded': { from: '#134e4a', to: '#0d9488', glyph: '◈' },
  'Academic Research': { from: '#1e1b4b', to: '#4f46e5', glyph: '∿' },
};

function initials(title) {
  return title
    .replace(/[^A-Za-z0-9 -]/g, '')
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

export default function ProjectThumb({ project }) {
  const [errored, setErrored] = useState(false);
  const art = FALLBACK_ART[project.category] ?? FALLBACK_ART['Web Development'];
  const gradientId = `grad-${project.id}`;

  if (project.image && !errored) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        onError={() => setErrored(true)}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    );
  }

  // Generated illustration fallback
  return (
    <svg
      viewBox="0 0 400 220"
      role="img"
      aria-label={`Illustration representing ${project.title}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={art.from} />
          <stop offset="100%" stopColor={art.to} />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill={`url(#${gradientId})`} />
      {/* circuit-style decoration */}
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none">
        <path d="M40 190 H140 V140 H220" />
        <path d="M360 30 H280 V80 H210" />
        <circle cx="40" cy="190" r="5" fill="rgba(255,255,255,0.25)" />
        <circle cx="220" cy="140" r="5" fill="rgba(255,255,255,0.25)" />
        <circle cx="360" cy="30" r="5" fill="rgba(255,255,255,0.25)" />
        <circle cx="210" cy="80" r="5" fill="rgba(255,255,255,0.25)" />
      </g>
      <text
        x="200"
        y="105"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="42"
        fontWeight="700"
        fill="rgba(255,255,255,0.92)"
      >
        {initials(project.title)}
      </text>
      <text
        x="200"
        y="135"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="13"
        fill="rgba(255,255,255,0.65)"
      >
        {project.category}
      </text>
    </svg>
  );
}
