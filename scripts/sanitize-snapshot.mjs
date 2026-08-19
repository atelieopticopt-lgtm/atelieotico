import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const inputPath = path.join(root, 'index.html');
const outputPath = path.join(root, 'src', 'template', 'home.html');
let html = fs.readFileSync(inputPath, 'utf8');

// Captured scripts contain live commerce, analytics, advertising, chat, account,
// and storefront identifiers. The Astro template is intentionally presentation-only.
html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '');
html = html.replace(/<script\b[^>]*\/\s*>/gi, '');
html = html.replace(/<link\b[^>]*rel=["'](?:preconnect|dns-prefetch)["'][^>]*>/gi, '');
html = html.replace(/<meta\b[^>]*(?:facebook-domain-verification|google-site-verification)[^>]*>/gi, '');
html = html.replace(/\s(?:data-(?:api-client-id|shop-id|theme-id|event-metadata-id|instance-id)|nonce)=["'][^"']*["']/gi, '');
html = html.replace(/\s(?:integrity|crossorigin)=["'][^"']*["']/gi, '');
html = html.replace(/\b(?:https?:)?\/\/[^"'\s<>)]+/gi, (url) => {
  // Keep ordinary outbound links and canonical metadata, but eliminate remote
  // executable/API endpoints accidentally captured in inline attributes.
  return /(?:\.js(?:\?|$)|\/api\/|\/collect(?:\?|$)|\/track(?:ing)?(?:\/|\?|$))/i.test(url) ? '#' : url;
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html, 'utf8');
// Keep the supplied root HTML safe as well; Astro uses the copy above as source.
fs.writeFileSync(inputPath, html, 'utf8');

const possibleSecrets = [
  /(?:api[_-]?key|client[_-]?secret|access[_-]?token|private[_-]?key|authorization)\s*[:=]\s*["'][^"']{8,}/i,
  /\b(?:sk|pk)_(?:live|test)_[A-Za-z0-9]{12,}\b/,
  /\bgh[pousr]_[A-Za-z0-9]{20,}\b/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];

const findings = possibleSecrets.filter((pattern) => pattern.test(html));
if (findings.length) {
  throw new Error(`Sanitization failed: ${findings.length} possible secret pattern(s) remain.`);
}

console.log(`Sanitized ${inputPath} -> ${outputPath}`);
