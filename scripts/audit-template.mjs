import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const html = fs.readFileSync(path.join(root, 'dist', 'index.html'), 'utf8');
const references = [...html.matchAll(/(?:src|href|srcset)=["']([^"']+)["']/gi)]
  .flatMap(([, value]) => value.split(',').map((part) => part.trim().split(/\s+/)[0]))
  .filter((value) => /^(?:\/?(?:images|css|fonts)\/)/i.test(value));

const missing = [...new Set(references)].filter((reference) => {
  const clean = decodeURIComponent(reference.split(/[?#]/)[0]).replace(/^\//, '');
  return !fs.existsSync(path.join(root, 'dist', clean));
});

const imageCount = fs.readdirSync(path.join(root, 'dist', 'images'), { withFileTypes: true })
  .filter((entry) => entry.isFile()).length;

if (missing.length) {
  console.error(`Missing ${missing.length} referenced asset(s):\n${missing.join('\n')}`);
  process.exit(1);
}

if (imageCount !== 225) {
  console.error(`Expected 225 images in the build, found ${imageCount}.`);
  process.exit(1);
}

console.log(`Asset audit passed: ${new Set(references).size} local references resolved; ${imageCount} images preserved.`);
