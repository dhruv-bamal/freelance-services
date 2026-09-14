/**
 * The recommendation engine's contract.
 *
 * These assert the three scenarios named in the brief, plus the failure modes that
 * would embarrass the site: recommending something above a stated budget without
 * saying so, and guessing confidently when the visitor gave nothing to go on.
 *
 * Run with `npm test`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { recommend } from '../src/lib/recommend.ts';
import { finderSteps } from '../src/data/finder.ts';
import { finderCatalog } from '../src/data/packages.ts';

const run = (answers: Parameters<typeof recommend>[0]) =>
  recommend(answers, finderSteps, finderCatalog);

test('hotel owner wanting online bookings gets Full-Stack', () => {
  const r = run({
    build: 'booking',
    goal: 'bookings',
    business: 'hotel',
    budget: '50k-1l',
    timeline: 'asap',
  });
  assert.equal(r.packageId, 'full-stack');
  assert.match(r.reason, /room booking/i);
  assert.equal(r.budgetNote, null, 'a 50k–1L budget clears the 25k starting price');
});

test('institute needing management features gets Full-Stack', () => {
  const r = run({
    build: 'system',
    goal: 'manage',
    business: 'institute',
    budget: '50k-1l',
    timeline: '1-3-months',
  });
  assert.equal(r.packageId, 'full-stack');
  assert.match(r.reason, /institute/i);
});

test('early startup launching a product gets Website Design', () => {
  const r = run({
    build: 'website',
    goal: 'customers',
    business: 'startup',
    budget: '20-50k',
    timeline: '1-month',
  });
  assert.equal(r.packageId, 'web-design');
  assert.equal(r.alternative, 'full-stack');
});

test('spreadsheet-heavy business wanting visibility gets Data & Analytics', () => {
  const r = run({ build: 'dashboard', goal: 'data', business: 'retail', budget: 'under-20k' });
  assert.equal(r.packageId, 'analytics');
});

test('someone wanting AI gets the AI package', () => {
  const r = run({ build: 'ai', goal: 'automate', business: 'startup', budget: '50k-1l' });
  assert.equal(r.packageId, 'ai-website');
});

test('a budget below the recommended starting price is flagged, not hidden', () => {
  const r = run({
    build: 'booking',
    goal: 'bookings',
    business: 'hotel',
    budget: 'under-20k',
  });
  assert.equal(r.packageId, 'full-stack');
  assert.ok(r.budgetNote, 'must say that Full-Stack starts above ₹20,000');
  assert.match(r.budgetNote!, /₹25,000/);
});

test('no usable signal returns an honest "let us talk" rather than a guess', () => {
  const r = run({
    build: 'unsure',
    goal: 'other',
    business: 'other',
    budget: 'unsure',
    timeline: 'exploring',
  });
  assert.equal(r.confident, false);
  assert.match(r.headline, /together/i);
});

test('every step/option combination produces a result and never throws', () => {
  const [s1, s2, s3, s4, s5] = finderSteps;
  let count = 0;
  for (const a of s1.options)
    for (const b of s2.options)
      for (const c of s3.options)
        for (const d of s4.options)
          for (const e of s5.options) {
            const r = run({
              build: a.value,
              goal: b.value,
              business: c.value,
              budget: d.value,
              timeline: e.value,
            });
            assert.ok(r.packageId, 'always resolves to a package');
            assert.ok(r.headline.length > 0);
            assert.notEqual(r.alternative, r.packageId, 'alternative must differ from the pick');
            count += 1;
          }
  assert.ok(count > 1000, `exercised ${count} combinations`);
});

test('partial answers (visitor abandons midway) still resolve', () => {
  const r = run({ build: 'booking' });
  assert.equal(r.packageId, 'full-stack');
});
