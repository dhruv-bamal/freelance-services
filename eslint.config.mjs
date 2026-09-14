/**
 * ESLint flat config.
 *
 * eslint-config-next v16 ships a flat-config array as its default export, so it is
 * spread directly. The older FlatCompat shim throws a circular-structure error
 * against this version — it is for wrapping legacy .eslintrc configs, which this
 * is no longer one of.
 */
import next from 'eslint-config-next';

const config = [
  ...next,
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
];

export default config;
