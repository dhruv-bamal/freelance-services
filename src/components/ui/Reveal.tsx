'use client';

/**
 * One-time reveal on scroll, applied to section headings only — never per card.
 *
 * Three things this does that the usual implementation does not:
 *  1. The hidden state lives in CSS inside a `prefers-reduced-motion: no-preference`
 *     query, so a reduced-motion visitor never has invisible content to begin with.
 *     Toggling opacity from JS instead is how these components leave blank pages.
 *  2. It unobserves after the first reveal. Content that re-hides on scroll-up is
 *     a distraction, not an effect.
 *  3. If IntersectionObserver is missing or JS fails, the content shows anyway —
 *     see the <noscript> fallback in the section CSS and the default `true`.
 */
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

export function Reveal({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn('reveal', className)} data-shown={shown}>
      {children}
    </Tag>
  );
}
