'use client';

/**
 * Contact form.
 *
 * Delivery is WhatsApp, not an API route. v1 of this site had a POST handler that
 * validated an enquiry and then console.logged it — every enquiry was silently
 * lost. A form that appears to work and does not is worse than no form, and this
 * audience already talks to suppliers on WhatsApp, so the message simply arrives
 * on the phone with the context already written out.
 *
 * Two details that matter:
 *
 *  • `window.open` is called inside the submit handler, which runs inside the
 *    click gesture, so a popup blocker does not fire. If it returns null anyway
 *    (some in-app browsers), a visible link appears rather than nothing happening
 *    — a dead submit button is the worst possible failure here.
 *  • Validation requires a name, a message, and at least one way to reply. Email
 *    and phone are individually optional but not collectively, because an enquiry
 *    with no reply path is not an enquiry.
 */
import { useEffect, useRef, useState } from 'react';

import { Field, Select, TextArea } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { IconWhatsApp, IconMail } from '@/components/ui/icons';
import { contactMessage, mailtoUrl, whatsappUrl, type ContactFields } from '@/lib/whatsapp';

const EMPTY: ContactFields = {
  name: '',
  business: '',
  email: '',
  phone: '',
  project: '',
  budget: '',
  message: '',
};

type Errors = Partial<Record<keyof ContactFields, string>>;

export function ContactForm({
  projectOptions,
  budgetOptions,
}: {
  projectOptions: readonly string[];
  budgetOptions: readonly string[];
}) {
  const [fields, setFields] = useState<ContactFields>({
    ...EMPTY,
    project: projectOptions[0],
    budget: budgetOptions[0],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  /* Set only when window.open was blocked, so the visitor still has a way through. */
  const [blockedUrl, setBlockedUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  /* Set on a failed submit; consumed by the effect below. */
  const wantsFocus = useRef(false);

  /*
   * Focus the first invalid field AFTER the errors have rendered.
   *
   * Doing this inside the submit handler does not work: setErrors is a state
   * update, so the `aria-invalid="true"` attributes the query depends on do not
   * exist in the DOM until the next render. Querying in the same tick silently
   * matches nothing and focus stays on the submit button — which leaves a
   * keyboard user being told there are errors with no way to find them.
   */
  useEffect(() => {
    if (!wantsFocus.current) return;
    wantsFocus.current = false;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);

  const set = (key: keyof ContactFields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function validate(): Errors {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = 'Please tell me your name.';
    if (!fields.message.trim()) next.message = 'A sentence or two about the project is enough.';
    if (!fields.email.trim() && !fields.phone.trim()) {
      next.phone = 'Please leave a phone number or an email so I can reply.';
    }
    if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      next.email = 'That email address does not look right.';
    }
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      /* Ask the effect above to move focus to the first problem, so a keyboard
         user is not left hunting for which field the error text belongs to. */
      wantsFocus.current = true;
      return;
    }

    const url = whatsappUrl(contactMessage(fields));

    const opened = window.open(url, '_blank', 'noopener');
    if (!opened) setBlockedUrl(url);
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="rounded-card border border-indigo/25 bg-indigo-tint p-6">
        <h3 className="text-display-s font-display font-medium">WhatsApp should be opening.</h3>
        <p className="mt-2 text-sm text-ink-muted">
          Your message is already written out — just press send. If nothing opened, use the
          link below or message me directly.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {blockedUrl ? (
            <a
              href={blockedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              <IconWhatsApp className="size-4" />
              Open WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          <a href={mailtoUrl(fields)} className="btn btn-outline bg-card">
            <IconMail className="size-4" />
            Send it as an email instead
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setSent(false);
            setBlockedUrl(null);
          }}
          className="mt-4 text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
        >
          Edit my message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Your name"
          required
          name="name"
          autoComplete="name"
          value={fields.name}
          onChange={set('name')}
          error={errors.name}
        />
        <Field
          label="Business or organisation"
          name="organization"
          autoComplete="organization"
          value={fields.business}
          onChange={set('business')}
        />
        <Field
          label="Email"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          value={fields.email}
          onChange={set('email')}
          error={errors.email}
        />
        <Field
          label="Phone or WhatsApp"
          type="tel"
          name="tel"
          inputMode="tel"
          autoComplete="tel"
          value={fields.phone}
          onChange={set('phone')}
          error={errors.phone}
        />
        <Select
          label="What do you want to build?"
          options={projectOptions}
          value={fields.project}
          onChange={set('project')}
        />
        <Select
          label="Budget"
          options={budgetOptions}
          value={fields.budget}
          onChange={set('budget')}
        />
      </div>

      <TextArea
        label="What are you trying to do?"
        required
        value={fields.message}
        onChange={set('message')}
        error={errors.message}
        placeholder="A couple of sentences is plenty. What happens today, and what would you like to happen instead?"
      />

      <Button type="submit" className="w-full px-6 sm:w-auto">
        <IconWhatsApp className="size-4" />
        Start a conversation
      </Button>
    </form>
  );
}
