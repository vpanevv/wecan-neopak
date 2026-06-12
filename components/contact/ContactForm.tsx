'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { EASE } from '@/lib/animations';
import { gsap, useGSAP, MM_ANY_MOTION, MM_DESKTOP } from '@/lib/gsap';

interface FormState {
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  beverageType: string;
  canSizes: string[];
  decoration: string;
  quantity: string;
  timeline: string;
  description: string;
}

const EMPTY: FormState = {
  company: '',
  contactPerson: '',
  email: '',
  phone: '',
  country: '',
  beverageType: '',
  canSizes: [],
  decoration: '',
  quantity: '',
  timeline: '',
  description: '',
};

const REQUIRED: (keyof FormState)[] = [
  'company',
  'contactPerson',
  'email',
  'country',
  'beverageType',
];

// Animated focus: the underline thickens via box-shadow (no layout shift) and
// the caret picks up the ember accent while typing.
const inputClass =
  'w-full border-b border-ink/20 bg-transparent py-2.5 text-ink caret-ember placeholder:text-muted/60 transition-[border-color,box-shadow] duration-300 focus:border-ink focus:shadow-[0_1px_0_0_#0F1011] focus:outline-none';

function FieldLabel({
  children,
  htmlFor,
  optional,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  optional?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="label block text-muted">
      {children}
      {optional && <span className="ml-2 lowercase tracking-normal">({optional})</span>}
    </label>
  );
}

export default function ContactForm() {
  const { t } = useI18n();
  const f = t.contact.form;

  const [values, setValues] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const root = useRef<HTMLFormElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const mm = gsap.matchMedia(root);

      // Sections rise in one after another as the form enters the viewport.
      mm.add(MM_ANY_MOTION, () => {
        gsap.from('.form-section', {
          y: 36,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
        });
      });

      // Magnetic submit button — follows the cursor slightly, springs back.
      mm.add(`${MM_DESKTOP} and (pointer: fine)`, () => {
        const btn = root.current!.querySelector<HTMLElement>('.form-submit');
        if (!btn) return;
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });

        const onMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const within =
            Math.abs(dx) < r.width * 0.9 && Math.abs(dy) < r.height * 1.6;
          xTo(within ? dx * 0.22 : 0);
          yTo(within ? dy * 0.3 : 0);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
      });
    },
    { scope: root, dependencies: [status] },
  );

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCanSize = (size: string) => {
    setValues((prev) => ({
      ...prev,
      canSizes: prev.canSizes.includes(size)
        ? prev.canSizes.filter((s) => s !== size)
        : [...prev.canSizes, size],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const missing = REQUIRED.some((key) => !String(values[key]).trim());
    if (missing) {
      setError(f.errorRequired);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError(f.errorEmail);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('idle');
      setError(f.errorSend);
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex min-h-[24rem] flex-col items-start justify-center rounded-2xl border border-ink/10 bg-cream p-10"
      >
        <h3 className="font-display text-2xl font-medium leading-snug tracking-tight text-ink md:text-3xl">
          {f.successTitle}
        </h3>
        <p className="mt-4 text-muted">{f.successBody}</p>
      </motion.div>
    );
  }

  return (
    <form
      ref={root}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-12 rounded-2xl bg-white/70 p-6 ring-1 ring-ink/10 shadow-[0_24px_80px_-24px_rgba(15,16,17,0.18)] backdrop-blur-sm sm:p-10"
    >
      {/* Company & Contact */}
          <fieldset className="form-section space-y-6">
            <legend className="label mb-2 text-ink">{f.sectionCompany}</legend>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="company">{f.company}</FieldLabel>
                <input
                  id="company"
                  type="text"
                  required
                  autoComplete="organization"
                  value={values.company}
                  onChange={(e) => update('company', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <FieldLabel htmlFor="contactPerson">{f.contactPerson}</FieldLabel>
                <input
                  id="contactPerson"
                  type="text"
                  required
                  autoComplete="name"
                  value={values.contactPerson}
                  onChange={(e) => update('contactPerson', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <FieldLabel htmlFor="email">{f.email}</FieldLabel>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <FieldLabel htmlFor="phone" optional={f.optional}>
                  {f.phone}
                </FieldLabel>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel htmlFor="country">{f.country}</FieldLabel>
                <input
                  id="country"
                  type="text"
                  required
                  autoComplete="country-name"
                  value={values.country}
                  onChange={(e) => update('country', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          {/* Project Details */}
          <fieldset className="form-section space-y-8">
            <legend className="label mb-2 text-ink">{f.sectionProject}</legend>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="beverageType">{f.beverageType}</FieldLabel>
                <select
                  id="beverageType"
                  required
                  value={values.beverageType}
                  onChange={(e) => update('beverageType', e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="" disabled>
                    {f.selectPlaceholder}
                  </option>
                  {f.beverageOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Can sizes — multi checkbox */}
            <div>
              <FieldLabel>{f.canSizes}</FieldLabel>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {f.canSizeOptions.map((size) => {
                  const checked = values.canSizes.includes(size);
                  return (
                    <label
                      key={size}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors duration-200 ${
                        checked
                          ? 'border-ink bg-ink text-canvas'
                          : 'border-ink/20 text-ink hover:border-ink/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCanSize(size)}
                        className="sr-only"
                      />
                      {size}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Decoration — radio */}
            <div>
              <FieldLabel>{f.decoration}</FieldLabel>
              <div className="mt-3 flex flex-wrap gap-3">
                {f.decorationOptions.map((opt) => {
                  const selected = values.decoration === opt;
                  return (
                    <label
                      key={opt}
                      className={`flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors duration-200 ${
                        selected
                          ? 'border-ink bg-ink text-canvas'
                          : 'border-ink/20 text-ink hover:border-ink/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="decoration"
                        value={opt}
                        checked={selected}
                        onChange={() => update('decoration', opt)}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="quantity">{f.quantity}</FieldLabel>
                <input
                  id="quantity"
                  type="text"
                  placeholder={f.quantityHint}
                  value={values.quantity}
                  onChange={(e) => update('quantity', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <FieldLabel htmlFor="timeline">{f.timeline}</FieldLabel>
                <input
                  id="timeline"
                  type="text"
                  placeholder={f.timelineHint}
                  value={values.timeline}
                  onChange={(e) => update('timeline', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          {/* Tell us more */}
          <fieldset className="form-section">
            <legend className="label mb-2 text-ink">{f.sectionMore}</legend>
            <FieldLabel htmlFor="description">{f.description}</FieldLabel>
            <textarea
              id="description"
              rows={5}
              placeholder={f.descriptionPlaceholder}
              value={values.description}
              onChange={(e) => update('description', e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </fieldset>

          {/* Error + submit */}
          <div className="form-section space-y-5">
            {error && (
              <p role="alert" className="text-sm text-ember">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="form-submit btn-primary w-full px-10 text-base disabled:opacity-60 sm:w-auto"
            >
              {status === 'sending' ? f.submitting : f.submit}
            </button>
          </div>
    </form>
  );
}
