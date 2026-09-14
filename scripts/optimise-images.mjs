/**
 * Converts the raw demo screenshots into web-weight WebP.
 *
 * The captures come off the browser as 1600x900 PNGs, which is the right format
 * to capture in and the wrong one to ship: nine of them totalled 3.8 MB, enough
 * that the work section alone outweighed the rest of the page several times over.
 * For an audience largely on Indian mobile connections that is the single most
 * expensive thing on the site.
 *
 * WebP rather than JPEG because these are interface screenshots — full of thin
 * type and hairline borders, exactly the content JPEG's DCT smears into ringing.
 *
 * Two widths, matching how each image is actually used:
 *   1600px  the primary screenshot, which fills half a row on a large display
 *    800px  the gallery thumbnails, which never render above ~200 CSS px
 *
 * Run after capturing new screenshots:  npm run images
 */
import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public/images/work',
);

/** Thumbnails are never displayed large; the primaries can be. */
const THUMBS = new Set([
  'retail-pulse-dashboard.png',
  'retail-pulse-inv.png',
  'terminal-earth-atlas.png',
]);

const files = (await readdir(DIR)).filter((f) => f.endsWith('.png'));
let before = 0;
let after = 0;

for (const file of files) {
  const src = path.join(DIR, file);
  const out = src.replace(/\.png$/, '.webp');
  const width = THUMBS.has(file) ? 800 : 1600;

  const inBytes = (await stat(src)).size;
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    // effort 6 is the slow end of the encoder — this runs once, the bytes ship forever.
    .webp({ quality: 82, effort: 6 })
    .toFile(out);
  const outBytes = (await stat(out)).size;

  before += inBytes;
  after += outBytes;
  console.log(
    `  ${file.padEnd(28)} ${(inBytes / 1024).toFixed(0).padStart(5)} KB → ` +
      `${(outBytes / 1024).toFixed(0).padStart(4)} KB  (${width}px, −${Math.round((1 - outBytes / inBytes) * 100)}%)`,
  );
  await unlink(src);
}

console.log(
  `\n  total ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB ` +
    `(−${Math.round((1 - after / before) * 100)}%)`,
);
