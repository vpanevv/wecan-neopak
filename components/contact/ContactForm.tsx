'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { EASE } from '@/lib/animations';
import { gsap, useGSAP, MM_ANY_MOTION } from '@/lib/gsap';

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

// Fields are drawn as real boxes rather than bare underlines, so each input's
// hit area is obvious before it's focused. Focus is carried by the ember
// accent — border plus ring — which is the strongest signal on the page.
const inputClass =
  'w-full rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-ink caret-ember placeholder:text-muted/60 transition-[border-color,box-shadow,background-color] duration-200 hover:border-ink/35 focus:border-ember focus:bg-white focus:outline-none focus:ring-4 focus:ring-ember/15';

// Chip shared by the can-size checkboxes and decoration radios.
const chipBase =
  'flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-center text-sm font-medium transition-all duration-200';
const chipOn = 'border-ink bg-ink text-canvas shadow-sm';
const chipOff = 'border-ink/15 bg-canvas text-ink hover:border-ink/50 hover:bg-white';

// Coloured rule + bold display type, so each section reads as a heading
// instead of another small grey label competing with the field labels.
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <legend className="mb-6">
      <span className="flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-ember" aria-hidden />
        <span className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
          {children}
        </span>
      </span>
    </legend>
  );
}

function FieldLabel({
  children,
  htmlFor,
  optional,
  required,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  optional?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block font-sans text-xs font-semibold uppercase tracking-label text-ink"
    >
      {children}
      {required && (
        <span className="ml-1 text-ember" aria-hidden>
          *
        </span>
      )}
      {optional && (
        <span className="ml-2 font-normal lowercase tracking-normal text-muted">
          ({optional})
        </span>
      )}
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

      // The submit button used to be magnetic (GSAP quickTo on x/y). That is
      // gone: it wrote an inline transform, which outranks the button's own
      // :hover/:active transforms and would kill the send animation.
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
          <fieldset className="form-section">
            <SectionHeading>{f.sectionCompany}</SectionHeading>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="company" required>
                  {f.company}
                </FieldLabel>
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
                <FieldLabel htmlFor="contactPerson" required>
                  {f.contactPerson}
                </FieldLabel>
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
                <FieldLabel htmlFor="email" required>
                  {f.email}
                </FieldLabel>
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
                <FieldLabel htmlFor="country" required>
                  {f.country}
                </FieldLabel>
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
            <SectionHeading>{f.sectionProject}</SectionHeading>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="beverageType" required>
                  {f.beverageType}
                </FieldLabel>
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
                      className={`${chipBase} ${checked ? chipOn : chipOff}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCanSize(size)}
                        className="sr-only"
                      />
                      {checked && <Check size={15} strokeWidth={3} aria-hidden />}
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
                      className={`${chipBase} !rounded-full !px-5 ${
                        selected ? chipOn : chipOff
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
            <SectionHeading>{f.sectionMore}</SectionHeading>
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
          <div className="form-section space-y-5 border-t border-ink/10 pt-8">
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-ember/30 bg-ember/10 px-4 py-3 text-sm font-medium text-ember"
              >
                {error}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="form-submit btn-send"
              >
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      aria-hidden
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      />
                    </svg>
                  </div>
                </div>
                <span>{status === 'sending' ? f.submitting : f.submit}</span>
              </button>
              <p className="text-sm text-muted">
                <span className="text-ember" aria-hidden>
                  *
                </span>{' '}
                {f.requiredNote}
              </p>
            </div>
          </div>
    </form>
  );
}
