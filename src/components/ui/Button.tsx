/**
 * Button and link-button.
 *
 * Two components rather than one polymorphic one, because the distinction is
 * semantic: `Button` does something on this page, `LinkButton` goes somewhere.
 * Collapsing them is how sites end up with clickable divs and links that submit
 * forms.
 *
 * External links get `rel="noopener noreferrer"` and a screen-reader-only note
 * that the tab will change, which is otherwise a silent surprise.
 */
import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'accent' | 'outline' | 'on-ink';

const VARIANTS: Record<Variant, string> = {
  accent: 'btn-accent',
  outline: 'btn-outline',
  'on-ink': 'btn-on-ink',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = 'accent', className, ...props }: ButtonProps) {
  return <button className={cn('btn', VARIANTS[variant], className)} {...props} />;
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  /** Opens in a new tab and announces that it will. */
  external?: boolean;
}

export function LinkButton({
  href,
  variant = 'accent',
  external,
  className,
  children,
  ...props
}: LinkButtonProps) {
  const classes = cn('btn', VARIANTS[variant], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

/** A plain external text link, with the same new-tab announcement. */
export function ExternalLink({
  href,
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
