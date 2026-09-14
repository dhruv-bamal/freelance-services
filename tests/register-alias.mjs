/**
 * Teaches `node --test` the same "@/*" -> "src/*" alias that tsconfig gives the
 * bundler, so the test file can import the real modules rather than a copy.
 *
 * Node's ESM resolver also wants an explicit extension, which TypeScript source
 * does not write, so this appends one. Using `module.registerHooks` keeps it a
 * dozen lines and no dependency — the alternative is a test-only build step.
 */
import { registerHooks } from 'node:module';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const SRC = path.resolve(import.meta.dirname, '..', 'src');

function resolveAlias(specifier) {
  const base = path.join(SRC, specifier.slice(2));
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts')]) {
    if (existsSync(candidate) && !candidate.endsWith(path.sep)) return pathToFileURL(candidate).href;
  }
  return null;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
      const resolved = resolveAlias(specifier);
      if (resolved) return { url: resolved, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
});
