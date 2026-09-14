'use client';

/**
 * Modal built on the native <dialog> element.
 *
 * The platform gives us focus trapping, Esc-to-close, the backdrop, `inert` on the
 * rest of the page, and returning focus to whatever opened it. A hand-rolled portal
 * has to reimplement all five, and the focus-return step is the one that is almost
 * always missed. So the only JavaScript here is: open it, close it, close it when
 * the backdrop is clicked, and stop the page behind from scrolling.
 *
 * `children` is rendered on the server and handed in, so the dialog's content —
 * prices, tiers, inclusions — never enters the client bundle. Only this shell does.
 */
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { IconClose } from './icons';
import { cn } from '@/lib/cn';

export function Dialog({
  trigger,
  title,
  eyebrow,
  children,
  triggerClassName,
  permalink,
}: {
  /** Label for the opening button. */
  trigger: React.ReactNode;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  triggerClassName?: string;
  /**
   * A shareable URL for the same content. Rendered at the foot of the dialog.
   *
   * It earns its place twice: someone who wants to send this to a colleague gets
   * a real link, and because a closed <dialog> still renders into the DOM, it is
   * a genuine internal link to /services/<slug> — which keeps those pages from
   * being orphans that only the sitemap knows about.
   */
  permalink?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const close = useCallback(() => ref.current?.close(), []);

  const openDialog = useCallback(() => {
    ref.current?.showModal();
    setOpen(true);
  }, []);

  /* showModal() does not stop the page behind from scrolling; without this the
     background scrolls under the modal on both iOS and desktop. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Fires for Esc and for close() alike, so state can never drift from the DOM. */
  const handleClose = useCallback(() => setOpen(false), []);

  /* A click on the backdrop lands on the <dialog> itself, never on its contents. */
  const handleClick = useCallback((event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) ref.current?.close();
  }, []);

  return (
    <>
      <button type="button" onClick={openDialog} className={triggerClassName}>
        {trigger}
      </button>

      <dialog
        ref={ref}
        onClose={handleClose}
        onClick={handleClick}
        aria-labelledby={titleId}
        className={cn(
          'w-full max-w-[46rem] bg-transparent p-0 text-ink backdrop:bg-ink/45',
          // Bottom sheet on phones, centred panel from `sm` up.
          'm-0 mt-auto max-h-[92dvh] sm:m-auto sm:max-h-[88dvh]',
        )}
      >
        <div className="flex max-h-[92dvh] flex-col overflow-hidden rounded-t-card bg-card shadow-dialog sm:max-h-[88dvh] sm:rounded-card">
          <header className="flex items-start justify-between gap-4 border-b border-rule px-5 py-4 sm:px-7 sm:py-5">
            <div className="min-w-0">
              {eyebrow ? (
                <p className="mb-1 text-xs text-ink-muted">{eyebrow}</p>
              ) : null}
              <h2 id={titleId} className="text-display-m">
                {title}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              className="-mr-1.5 -mt-0.5 grid size-10 shrink-0 place-items-center rounded-btn text-ink-muted transition-colors hover:bg-paper hover:text-ink"
            >
              <IconClose className="size-5" />
              <span className="sr-only">Close</span>
            </button>
          </header>

          <div className="overflow-y-auto overscroll-contain px-5 py-6 sm:px-7 sm:py-7">
            {children}

            {permalink ? (
              <p className="mt-8 border-t border-rule pt-5 text-sm text-ink-muted">
                <a href={permalink} className="link">
                  Open this as a page
                </a>{' '}
                if you would rather send it to someone.
              </p>
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
