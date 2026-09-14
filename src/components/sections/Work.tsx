/**
 * Selected work.
 *
 * Every card carries a visible "Demo build" label. These are builds of Dhruv's own,
 * not client projects, and no card claims a client, a revenue figure or a conversion
 * rate. The honest claim — what the build demonstrates he can do — is the one a
 * prospective client actually needs, and it survives being checked.
 *
 * Both run live at their own deployments, so a client can open one and use it
 * rather than take a screenshot on trust. The links leave the site, so they open in
 * a new tab and say so to a screen reader.
 *
 * The main image is itself a link, because a large screenshot is the first thing
 * people try to click.
 */
import Image from 'next/image';

import { work } from '@/data/work';
import { site } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Disclosure } from '@/components/ui/Disclosure';
import { IconArrowUpRight } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="band bg-paper">
      <div className="shell">
        <SectionHeading
          id="work-title"
          title="Things I have built"
          lead="My own builds, not client work. Both are live — open them and try them."
        />

        <div className="mt-10 space-y-14 lg:mt-14 lg:space-y-24">
          {work.map((project, i) => (
            <Reveal key={project.slug}>
              {/*
                Three blocks in one grid, ordered differently by breakpoint.
                On a phone the source order wins — name, then imagery, then the
                detail — because a large photograph arriving before any label
                leaves the reader looking at a restaurant with no idea why.
                From `lg` the explicit row/column placement puts the imagery
                beside the copy instead, alternating side each project.
              */}
              <article className="grid items-start gap-x-11 gap-y-5 lg:grid-cols-[1.12fr_0.88fr] lg:grid-rows-[auto_1fr]">
                {/* --------------------------------------------- name badge */}
                <div className={cn('lg:row-start-1', i % 2 === 1 ? 'lg:col-start-1' : 'lg:col-start-2')}>
                  <p className="flex flex-wrap items-center gap-2.5 text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-pill bg-indigo px-2.5 py-1 font-medium text-white">
                      {/* A quiet pulse, only where it means something: this one is running. */}
                      <span aria-hidden className="live-dot size-1.5 rounded-full bg-white" />
                      Live
                    </span>
                    <span className="rounded-pill border border-rule-strong/40 px-2.5 py-1 text-ink-muted">
                      {project.label}
                    </span>
                    <span className="text-ink-muted">{project.category}</span>
                  </p>
                  <h3 className="mt-3.5 text-display-m">{project.name}</h3>
                </div>

                {/* ------------------------------------------------ imagery */}
                <div
                  className={cn(
                    'lg:row-start-1 lg:row-span-2 lg:self-start',
                    i % 2 === 1 ? 'lg:col-start-2' : 'lg:col-start-1',
                  )}
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-card border border-rule bg-paper [transition:border-color_200ms_var(--ease-damp),box-shadow_200ms_var(--ease-damp)] hover:border-rule-strong/50 hover:shadow-lift"
                  >
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      sizes="(min-width: 1024px) 38rem, 92vw"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                    <span className="sr-only">
                      Open {project.name} (opens in a new tab)
                    </span>
                  </a>

                  {project.gallery.length > 0 ? (
                    <ul className="mt-3 grid grid-cols-3 gap-3">
                      {project.gallery.map((shot) => (
                        <li key={shot.src}>
                          <a
                            href={shot.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block focus-visible:outline-offset-4"
                          >
                            <span className="block overflow-hidden rounded-btn border border-rule bg-paper transition-colors group-hover:border-indigo">
                              <Image
                                src={shot.src}
                                alt={shot.alt}
                                width={800}
                                height={450}
                                sizes="(min-width: 1024px) 12rem, 30vw"
                                className="h-auto w-full"
                              />
                            </span>
                            <span className="mt-1.5 block text-xs text-ink-muted transition-colors group-hover:text-ink">
                              {shot.caption}
                              <span className="sr-only"> (opens in a new tab)</span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {/* --------------------------------------------------- copy */}
                <div className={cn('lg:row-start-2', i % 2 === 1 ? 'lg:col-start-1' : 'lg:col-start-2')}>
                  {/* Two lines, unlabelled. The "The problem / What it does / Why it
                      is here" scaffolding was three headings' worth of chrome around
                      three sentences, with a live demo sitting right beside it. */}
                  <p className="max-w-[52ch] text-sm">{project.problem}</p>
                  <p className="mt-2.5 max-w-[52ch] text-sm">{project.solution}</p>
                  <p className="mt-2.5 max-w-[52ch] text-sm text-ink-muted">
                    {project.demonstrates}
                  </p>

                  <div className="mt-6">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-accent"
                    >
                      Open {project.name}
                      <IconArrowUpRight className="size-4" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1.5">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-pill bg-paper px-2.5 py-1 text-xs text-ink-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 border-t border-rule">
                    <Disclosure summary="Technical details" tone="quiet">
                      <ul className="space-y-2 pt-1">
                        {project.technical.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <span
                              aria-hidden
                              className="mt-2.5 h-px w-3 shrink-0 bg-rule-strong"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 border-t border-rule pt-3">
                        More of my code is on{' '}
                        <a
                          href={site.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link"
                        >
                          GitHub
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        .
                      </p>
                    </Disclosure>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
