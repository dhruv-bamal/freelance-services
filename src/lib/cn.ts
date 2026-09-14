/** Join class names, dropping anything falsy. Small enough not to warrant a dependency. */
export const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');
