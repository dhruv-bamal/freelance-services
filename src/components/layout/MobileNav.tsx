'use client';

/**
 * Mobile navigation.
 *
 * Another native <dialog>, for the same reasons as the package modal: focus trap,
 * Esc, and focus returning to the hamburger are all free and all correct. Links
 * close the dialog before navigating, because a hash link inside an open modal
 * scrolls a page the visitor cannot see.
 */
import { useCallback, useRef, useState } from 'react';

import { site, navLinks } from '@/config/site';
import { generalEnquiry } from '@/lib/whatsapp';
import {
  IconArrowUpRight,
  IconClose,
  IconMenu,
  IconWhatsApp,
} from '@/components/ui/icons';

export function MobileNav() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    ref.current?.showModal();
    setOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const hide = useCallback(() => {
    ref.current?.close();
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = '';
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-expanded={open}
        className="grid size-11 place-items-center rounded-btn border border-rule-strong/50 text-ink transition-colors hover:bg-card lg:hidden"
      >
        <IconMenu className="size-5" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={ref}
        onClose={onClose}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[var(--header-h)] items-center justify-between border-b border-rule px-[var(--gutter)]">
            <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em]">
              {site.name}
            </span>
            <button
              type="button"
              onClick={hide}
              className="grid size-11 place-items-center rounded-btn text-ink-muted hover:text-ink"
            >
              <IconClose className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Primary" className="flex-1 overflow-y-auto px-[var(--gutter)] py-4">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-rule last:border-0">
                  <a
                    href={link.href}
                    onClick={hide}
                    className="block py-4 font-display text-display-m"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="border-b border-rule last:border-0">
                <a
                  href={site.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={hide}
                  className="flex items-center gap-2.5 py-4 font-display text-display-m"
                >
                  Portfolio
                  <IconArrowUpRight className="size-4 text-ink-muted" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="space-y-3 border-t border-rule px-[var(--gutter)] py-5">
            <a
              href={generalEnquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent w-full"
            >
              <IconWhatsApp className="size-4" />
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="#contact" onClick={hide} className="btn btn-outline w-full">
              Send a message
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
