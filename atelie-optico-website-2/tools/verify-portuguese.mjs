import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cheerio from 'cheerio'

const PROJECT = fileURLToPath(new URL('..', import.meta.url))
const SOURCE = join(PROJECT, '..')
const CONTENT = join(PROJECT, 'src', 'content')
const DIST = join(PROJECT, 'dist')
const exists = async (p) => { try { await access(p); return true } catch { return false } }
const snapshots = (await readdir(CONTENT)).filter((name) => name.endsWith('.page')).sort()
const probes = ['html', 'head', 'body', '#qodef-page-wrapper', 'header', 'footer', 'img', 'a', 'script', 'link']

let missing = 0
let mismatched = 0
for (const name of snapshots) {
  const key = name.slice(0, -5)
  const routeDir = key === 'index' ? '' : key.split('__').join(sep)
  const builtFile = join(DIST, routeDir, 'index.html')
  if (!(await exists(builtFile))) { console.error(`Missing: /${routeDir}`); missing++; continue }
  const source = cheerio.load(await readFile(join(CONTENT, name), 'utf8'))
  const built = cheerio.load(await readFile(builtFile, 'utf8'))
  const diffs = []
  for (const selector of probes) {
    const a = source(selector).length
    const b = built(selector).length
    if (a !== b) diffs.push(`${selector} ${a} -> ${b}`)
  }
  if (source('title').text() !== built('title').text()) diffs.push('title')
  if (source('html').attr('lang') !== built('html').attr('lang')) diffs.push('lang')
  if (diffs.length) { console.error(`${key}: ${diffs.join(', ')}`); mismatched++ }
}

console.log(`Portuguese pages: ${snapshots.length}`)
console.log(`Missing builds: ${missing}`)
console.log(`Structural mismatches: ${mismatched}`)
const home = await readFile(join(CONTENT, 'index.page'), 'utf8')
const centeredCtas = (home.match(/slider-9-slide-(?:13|21|22)-layer-21[^>]*data-xy="[^"]*xo:-481px,-345px,-1px,0;/g) || []).length
console.log(`Centered hero CTAs: ${centeredCtas}/3`)
if (snapshots.length !== 160 || missing || mismatched || centeredCtas !== 3) process.exit(1)
