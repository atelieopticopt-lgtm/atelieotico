// @ts-check
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Markup is injected verbatim via set:html; the theme's inline-block layouts
  // are whitespace-sensitive, so minifying it would shift the design.
  compressHTML: false,
  vite: { resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } } },
})
