/**
 * ─── PROFILE CONFIG ──────────────────────────────────────────────────────────
 * Edit this single file to update your name, title, links, contact details,
 * CV path and photo. Every component reads from here.
 *
 * CONTACT RULE: email / phone are intentionally placeholders until you fill
 * in real values. The UI renders placeholder styling when a value still
 * contains "your-" or is left empty — never invent contact details.
 */

export const profile = {
  name: 'Ephron TWAGIRIMANA',
  // Rotating animated role titles shown in the hero typing effect.
  titles: ['Software Developer', 'Java Backend Engineer', 'IoT Developer'],

  tagline:
    'I am Ephron TWAGIRIMANA, a software developer passionate about Java backend engineering, web applications, and connected systems that solve real-world problems.',

  location: 'Kigali, Rwanda',

  // ⚠️ REPLACE with your real, public contact details when ready.
  email: 'your.email@example.com', // e.g. 'ephron.twagirimana@gmail.com'
  phone: '', // e.g. '+250 7X XXX XXXX' — left empty until provided

  // ⚠️ REPLACE with your real profile URLs.
  github: 'https://github.com/Ephron99',
  linkedin: 'www.linkedin.com/in/ephron-twagirimana-573158221',

  // CV download: put your PDF at `public/cv/Ephron_Twagirimana_CV.pdf`.
  // Update this path (or the label) if you rename the file.
  cv: {
    path: '/cv/Ephron_Twagirimana_CV.pdf',
    label: 'Ephron_Twagirimana_CV.pdf',
  },

  // Profile photo: replace `public/images/profile.jpg` with your own photo.
  photo: '/images/profile.jpg',

  // Headline shown in the hero section.
  heroHeadline: ['Building Reliable Software', 'and Intelligent IoT Solutions.'],

  site: {
    // Used by SEO tags in index.html and the footer.
    url: 'https://your-portfolio-domain.vercel.app',
    name: 'Ephron TWAGIRIMANA — Software Developer & IoT Portfolio',
    description:
      'Portfolio of Ephron TWAGIRIMANA, a software developer in Kigali, Rwanda specializing in Java backend development, web applications, and IoT embedded systems.',
  },
};

/** True once the user has replaced the default placeholder contact values. */
export const contactStatus = {
  emailReady: profile.email && !profile.email.includes('your.') && !profile.email.includes('example.com'),
  phoneReady: Boolean(profile.phone),
  githubReady: profile.github && !profile.github.includes('your-'),
  linkedinReady: profile.linkedin && !profile.linkedin.includes('your-'),
};
