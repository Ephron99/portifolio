import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Info,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import Section from '../ui/Section';
import { profile, contactStatus } from '../../data/profile';

// Delivery endpoint configured in .env (see .env.example). Either works:
//   VITE_CONTACT_ENDPOINT  — your own backend/API accepting POST JSON
//   VITE_FORMSPREE_ENDPOINT — a Formspree form URL (no backend needed)
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || import.meta.env.VITE_FORMSPREE_ENDPOINT || '';

const validators = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).'),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
  subject: (v) => (v.trim().length >= 3 ? '' : 'Please enter a short subject.'),
  message: (v) =>
    v.trim().length >= 10 ? '' : 'Please write a message (at least 10 characters).',
};

const initialForm = { name: '', email: '', subject: '', message: '' };

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
          <AlertCircle size={12} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error | fallback
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate every field client-side
    const nextErrors = Object.fromEntries(
      Object.entries(validators).map(([key, fn]) => [key, fn(form[key])]).filter(([, msg]) => msg)
    );
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      return;
    }

    if (!ENDPOINT) {
      // No delivery service configured — be honest, don't fake success.
      // Offer a mailto handoff with the composed message instead.
      setStatus('fallback');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setStatus('success');
      setFeedback("Thanks! Your message has been sent — I'll get back to you soon.");
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setFeedback(
        `Something went wrong while sending (${err.message}). Please try again, or email me directly${
          contactStatus.emailReady ? ` at ${profile.email}` : ' once a real address is configured'
        }.`
      );
    }
  };

  const mailtoHref = () => {
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    return `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: contactStatus.emailReady ? profile.email : 'twagirimanaephron1@gmail.com',
      href: contactStatus.emailReady ? `mailto:${profile.email}` : undefined,
      muted: !contactStatus.emailReady,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactStatus.phoneReady ? profile.phone : '+250785247164',
      href: contactStatus.phoneReady ? `tel:${profile.phone.replace(/\s+/g, '')}` : undefined,
      muted: !contactStatus.phoneReady,
    },
    { icon: MapPin, label: 'Location', value: profile.location, muted: false },
    {
      icon: Github,
      label: 'GitHub',
      value: contactStatus.githubReady ? profile.github.replace('https://', '') : 'https://github.com/Ephron99',
      href: contactStatus.githubReady ? profile.github : undefined,
      muted: !contactStatus.githubReady,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: contactStatus.linkedinReady ? profile.linkedin.replace('https://', '') : 'www.linkedin.com/in/ephron-twagirimana-573158221',
      href: contactStatus.linkedinReady ? profile.linkedin : undefined,
      muted: !contactStatus.linkedinReady,
    },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Build Something Meaningful."
      intro="Open to software development opportunities, Java backend roles, freelance projects, and IoT collaborations."
      className="bg-navy-50/50 dark:bg-navy-900/30"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <ul className="space-y-3">
            {contactItems.map(({ icon: Icon, label, value, href, muted }) => (
              <li key={label} className="card flex items-center gap-4 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-accent-soft">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-500 dark:text-navy-400">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="block truncate text-sm font-medium text-navy-900 hover:text-accent-deep dark:text-white dark:hover:text-accent-soft"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className={`truncate text-sm ${muted ? 'italic text-navy-400 dark:text-navy-500' : 'text-navy-900 dark:text-white'}`}>
                      {value}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          onSubmit={handleSubmit}
          noValidate
          className="card p-6 sm:p-8"
        >
          {!ENDPOINT && (
            <p className="mb-5 flex items-start gap-2 rounded-lg border border-amber-300/60 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
              <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {/* Message delivery is not connected yet. Set{' '}
                <code className="font-mono">VITE_CONTACT_ENDPOINT</code> or{' '}
                <code className="font-mono">VITE_FORMSPREE_ENDPOINT</code> in a <code className="font-mono">.env</code>{' '}
                file (see <code className="font-mono">.env.example</code>). Until then, submitting opens your email app
                with the message prepared. */}
              </span>
            </p>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Name" error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="input-field"
              />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="input-field"
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field id="subject" label="Subject" error={errors.subject}>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="Java backend role / freelance project / IoT collaboration…"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className="input-field"
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field id="message" label="Message" error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about the opportunity or project…"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="input-field resize-y"
              />
            </Field>
          </div>

          <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-6 w-full sm:w-auto">
            {status === 'submitting' ? (
              'Sending…'
            ) : (
              <>
                <Send size={15} aria-hidden="true" />
                Send Message
              </>
            )}
          </button>

          {/* Feedback area */}
          <div aria-live="polite" className="mt-4">
            {status === 'success' && (
              <p className="flex items-center gap-2 rounded-lg border border-green-300/60 bg-green-50 p-3 text-sm text-green-800 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300">
                <CheckCircle2 size={16} aria-hidden="true" /> {feedback}
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="flex items-start gap-2 rounded-lg border border-red-300/60 bg-red-50 p-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {feedback}
              </p>
            )}
            {status === 'fallback' && (
              <p className="flex flex-wrap items-center gap-2 rounded-lg border border-navy-200 bg-navy-50 p-3 text-sm text-navy-700 dark:border-navy-700 dark:bg-navy-800/60 dark:text-navy-200">
                No delivery service is configured yet, so your message was not sent from this page.
                {contactStatus.emailReady ? (
                  <>
                    {' '}Use the{' '}
                    <a href={mailtoHref()} className="font-semibold underline hover:text-accent-deep dark:hover:text-accent-soft">
                      email handoff
                    </a>{' '}
                    — it opens your mail app with everything already filled in.
                  </>
                ) : (
                  ' Set your email and an endpoint first (see README).'
                )}
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </Section>
  );
}
