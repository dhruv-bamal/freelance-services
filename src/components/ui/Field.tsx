'use client';

/**
 * Form field wrapper.
 *
 * Every field gets a real <label> tied by id — not a placeholder standing in for
 * one, which vanishes the moment someone starts typing and leaves a screen reader
 * with an unnamed input. Errors are wired through aria-describedby and
 * aria-invalid, and the error text is rendered where a sighted user will also see
 * it, directly under the control.
 */
import { useId } from 'react';

import { cn } from '@/lib/cn';

interface BaseProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

const controlClasses = (invalid: boolean) =>
  cn(
    'w-full rounded-btn border bg-card px-3.5 py-2.5 text-base text-ink transition-colors',
    'placeholder:text-ink-muted/70',
    invalid ? 'border-danger' : 'border-rule-strong/55 hover:border-rule-strong',
  );

export function Field({
  label,
  error,
  hint,
  required,
  ...props
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <Label htmlFor={id} label={label} required={required} />
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error && errorId, hint && hintId) || undefined}
        className={cn('mt-1.5', controlClasses(Boolean(error)))}
        {...props}
      />
      <Messages errorId={errorId} hintId={hintId} error={error} hint={hint} />
    </div>
  );
}

export function TextArea({
  label,
  error,
  hint,
  required,
  ...props
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <Label htmlFor={id} label={label} required={required} />
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error && errorId, hint && hintId) || undefined}
        className={cn('mt-1.5 resize-y', controlClasses(Boolean(error)))}
        {...props}
      />
      <Messages errorId={errorId} hintId={hintId} error={error} hint={hint} />
    </div>
  );
}

export function Select({
  label,
  error,
  hint,
  required,
  options,
  ...props
}: BaseProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[] }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      {/* A select always has a value, so it is neither required nor optional —
          marking it either way is noise, and the longer label wrapped unevenly. */}
      <Label htmlFor={id} label={label} required={required} hideOptional />
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error && errorId, hint && hintId) || undefined}
        className={cn('mt-1.5 appearance-none pr-9', controlClasses(Boolean(error)))}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%234e5360' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9.5 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.65rem center',
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Messages errorId={errorId} hintId={hintId} error={error} hint={hint} />
    </div>
  );
}

function Label({
  htmlFor,
  label,
  required,
  hideOptional,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  hideOptional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {label}
      {required ? (
        <span className="text-ink-muted">
          {' '}
          <span aria-hidden>*</span>
          <span className="sr-only">(required)</span>
        </span>
      ) : hideOptional ? null : (
        <span className="font-normal text-ink-muted"> (optional)</span>
      )}
    </label>
  );
}

function Messages({
  errorId,
  hintId,
  error,
  hint,
}: {
  errorId: string;
  hintId: string;
  error?: string;
  hint?: string;
}) {
  return (
    <>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </>
  );
}
