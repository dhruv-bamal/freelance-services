'use client';

/**
 * The project finder — five questions, then a recommendation.
 *
 * This is the site's most important interaction, so a few things are done more
 * carefully than a form usually is:
 *
 *  • Options are <button>s, not radios. Choosing one advances immediately, which
 *    is a command, not a selection — and a radio that navigates on change is a
 *    well-known screen-reader trap.
 *  • The question is an <h3 tabIndex={-1}> and receives focus on every step change,
 *    so a keyboard or screen-reader user lands on the new question rather than
 *    being silently left where the old button used to be. The step counter is in
 *    an aria-live region for the same reason.
 *  • A visitor can always go back, always restart, and the result always offers
 *    "see all packages". This is a signpost, not a funnel — a recommendation the
 *    visitor cannot escape is worse than no recommendation.
 *  • `catalog` and `summaries` arrive as props rather than imports, so the full
 *    package catalogue never enters the client bundle. See lib/recommend.ts.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { finderSteps, timelineNote, type FinderAnswers, type StepId } from '@/data/finder';
import { recommend, type Catalog } from '@/lib/recommend';
import { finderEnquiry } from '@/lib/whatsapp';
import { formatFrom } from '@/lib/format';
import { IconArrowLeft, IconCheck, IconWhatsApp } from '@/components/ui/icons';
import { cn } from '@/lib/cn';
import type { PackageId } from '@/types';

interface Summary {
  id: PackageId;
  slug: string;
  name: string;
  subtitle: string;
  startingPrice: number;
  timeline: string;
}

export function ProjectFinder({
  catalog,
  summaries,
}: {
  catalog: Catalog;
  summaries: Summary[];
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [done, setDone] = useState(false);
  /* Suppresses the focus move on first paint — otherwise loading the page yanks
     the viewport down to the finder before the visitor has read the hero. */
  const touched = useRef(false);
  const questionRef = useRef<HTMLHeadingElement>(null);

  const step = finderSteps[index];
  const total = finderSteps.length;

  useEffect(() => {
    if (!touched.current) return;
    questionRef.current?.focus({ preventScroll: false });
  }, [index, done]);

  const choose = useCallback(
    (id: StepId, value: string) => {
      touched.current = true;
      setAnswers((prev) => ({ ...prev, [id]: value }));
      if (index === total - 1) setDone(true);
      else setIndex((i) => i + 1);
    },
    [index, total],
  );

  const back = useCallback(() => {
    touched.current = true;
    if (done) setDone(false);
    else setIndex((i) => Math.max(0, i - 1));
  }, [done]);

  const restart = useCallback(() => {
    touched.current = true;
    setAnswers({});
    setIndex(0);
    setDone(false);
  }, []);

  const result = useMemo(
    () => (done ? recommend(answers, finderSteps, catalog) : null),
    [done, answers, catalog],
  );

  return (
    <div className="panel overflow-hidden">
      <Progress index={index} total={total} done={done} />

      <div className="p-5 sm:p-8">
        {done && result ? (
          <Result
            result={result}
            answers={answers}
            summaries={summaries}
            questionRef={questionRef}
            onBack={back}
            onRestart={restart}
          />
        ) : (
          /* Keyed on the step so the entrance animation replays per question. */
          <div key={step.id} className="finder-step">
            <h3
              ref={questionRef}
              tabIndex={-1}
              className="text-display-m outline-none"
              id={`finder-q-${step.id}`}
            >
              {step.question}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">{step.help}</p>

            <div
              role="group"
              aria-labelledby={`finder-q-${step.id}`}
              className="mt-6 grid gap-2.5 sm:grid-cols-2"
            >
              {step.options.map((option) => {
                const selected = answers[step.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => choose(step.id, option.value)}
                    aria-pressed={selected}
                    className={cn(
                      'group flex min-h-[3.25rem] items-center justify-between gap-3 rounded-btn border px-4 py-3 text-left text-sm',
                      '[transition:background-color_150ms_var(--ease-damp),border-color_150ms_var(--ease-damp),color_150ms_var(--ease-damp)]',
                      selected
                        ? 'border-indigo bg-indigo-tint text-ink'
                        : 'border-rule-strong/45 bg-card hover:border-indigo hover:bg-indigo-tint/40',
                    )}
                  >
                    {option.label}
                    <span
                      aria-hidden
                      className={cn(
                        'grid size-5 shrink-0 place-items-center rounded-full border transition-colors',
                        selected
                          ? 'border-indigo bg-indigo text-white'
                          : 'border-rule-strong/50 text-transparent group-hover:border-indigo',
                      )}
                    >
                      <IconCheck className="size-3" />
                    </span>
                  </button>
                );
              })}
            </div>

            {index > 0 ? (
              <button
                type="button"
                onClick={back}
                className="mt-6 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                <IconArrowLeft className="size-4" />
                Back
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ progress */

function Progress({ index, total, done }: { index: number; total: number; done: boolean }) {
  const shown = done ? total : index;
  const percent = done ? 100 : (index / total) * 100;

  return (
    <div className="border-b border-rule bg-paper px-5 py-3.5 sm:px-8">
      <div className="flex items-center justify-between gap-4">
        {/*
          Announced politely so a screen-reader user hears the step change without
          it interrupting whatever is currently being read.
        */}
        <p aria-live="polite" className="text-xs text-ink-muted">
          {done ? 'Your recommendation' : `Question ${index + 1} of ${total}`}
        </p>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={shown}
        aria-label="Project finder progress"
        className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-rule"
      >
        <div
          className="h-full rounded-full bg-indigo transition-[width] duration-400 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- result */

function Result({
  result,
  answers,
  summaries,
  questionRef,
  onBack,
  onRestart,
}: {
  result: ReturnType<typeof recommend>;
  answers: FinderAnswers;
  summaries: Summary[];
  questionRef: React.RefObject<HTMLHeadingElement | null>;
  onBack: () => void;
  onRestart: () => void;
}) {
  const pkg = summaries.find((s) => s.id === result.packageId)!;
  const alternative = summaries.find((s) => s.id === result.alternative);

  /* The visitor's own answers, in words, so the WhatsApp message that follows is
     already useful — which is the entire reason for asking five questions first. */
  const spoken = finderSteps
    .map((step) => {
      const value = answers[step.id];
      const option = step.options.find((o) => o.value === value);
      return option ? `${step.question.replace(/\?$/, '')}: ${option.label}` : null;
    })
    .filter((line): line is string => line !== null);

  return (
    <div className="finder-result">
      <h3 ref={questionRef} tabIndex={-1} className="text-display-m outline-none">
        {result.headline}
      </h3>
      <p className="mt-3 max-w-[58ch] text-ink-muted">{result.reason}</p>

      <div className="mt-6 rounded-card border border-indigo/25 bg-indigo-tint p-5 sm:p-6">
        <p className="font-display text-display-s font-medium">{pkg.name}</p>
        <p className="mt-1.5 max-w-[52ch] text-sm text-ink-muted">{pkg.subtitle}</p>
        <p className="mt-4 text-sm text-ink-muted">
          <span className="font-medium text-ink">{formatFrom(pkg.startingPrice)}</span>
          <span aria-hidden> · </span>
          <span className="sr-only">, </span>
          typically {pkg.timeline}
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <a
            href={finderEnquiry(pkg.name, spoken)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
          >
            <IconWhatsApp className="size-4" />
            Talk on WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={`/services/${pkg.slug}`} className="btn btn-outline bg-card">
            See {pkg.name}
          </a>
        </div>
      </div>

      {result.budgetNote ? (
        /*
          Shown when the recommended category starts above the stated budget.
          Saying so out loud keeps an enquiry that silence would lose at the price.
        */
        <p className="mt-4 border-l-2 border-rule-strong pl-4 text-sm text-ink-muted">
          {result.budgetNote}
        </p>
      ) : null}

      {answers.timeline && timelineNote[answers.timeline] ? (
        <p className="mt-4 text-sm text-ink-muted">{timelineNote[answers.timeline]}</p>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-5 text-sm">
        {alternative ? (
          <p className="text-ink-muted">
            Also worth a look:{' '}
            <a href={`/services/${alternative.slug}`} className="link">
              {alternative.name}
            </a>
          </p>
        ) : null}
        <a href="#services" className="text-ink-muted transition-colors hover:text-ink">
          See all packages
        </a>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-ink"
        >
          <IconArrowLeft className="size-4" />
          Change my last answer
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="text-ink-muted transition-colors hover:text-ink"
        >
          Start again
        </button>
      </div>
    </div>
  );
}
