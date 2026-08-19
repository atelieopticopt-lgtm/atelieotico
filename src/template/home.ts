import snapshot from './home.html?raw';

const headMatch = snapshot.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
const bodyMatch = snapshot.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);

if (!headMatch || !bodyMatch) {
  throw new Error('The sanitized template snapshot is not a complete HTML document.');
}

export const headMarkup = headMatch[1];
export const bodyMarkup = bodyMatch[2];

const attributes = Object.fromEntries(
  [...bodyMatch[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]),
);

export const bodyAttributes = attributes;
