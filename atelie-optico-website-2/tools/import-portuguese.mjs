import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cheerio from 'cheerio'

const PROJECT = fileURLToPath(new URL('..', import.meta.url))
const SOURCE = join(PROJECT, '..')
const SRC = join(PROJECT, 'src')
const CONTENT = join(SRC, 'content')
const PAGES = join(SRC, 'pages')
const PUBLIC = join(PROJECT, 'public')

const appointmentStyles = `
<style id="atelie-appointment-link-styles">
  rs-layer[id^="slider-9-slide-"][id$="-layer-21"] { text-align:center!important; }
  rs-layer[id^="slider-9-slide-"][id$="-layer-21"] .atelie-appointment-link { box-sizing:border-box; width:100%; min-height:42px; display:flex!important; align-items:center; justify-content:center; color:#111!important; text-align:center!important; text-decoration:none; text-transform:uppercase; letter-spacing:.18em; font-family:Arial,sans-serif; font-size:15px; line-height:1.2; }
  rs-layer[id^="slider-9-slide-"][id$="-layer-21"] .atelie-appointment-link span { position:relative; display:inline-block; padding:0 0 8px; }
  rs-layer[id^="slider-9-slide-"][id$="-layer-21"] .atelie-appointment-link span::after { content:""; position:absolute; left:0; right:0; bottom:0; height:1px; background:#111; }
</style>`

const heroPreloads = `
<link rel="preload" as="image" href="/wp-content/uploads/2021/10/main-rev-img1.jpg" fetchpriority="high">
<link rel="preload" as="image" href="/wp-content/uploads/2021/10/main-rev-img-2.jpg" fetchpriority="high">
<link rel="preload" as="image" href="/wp-content/uploads/2021/08/main-home-rev-img-19.png" fetchpriority="high">`

const standardHeaderStyles = `
<style id="atelie-standard-header-visibility">
  #qodef-top-area { display:block!important; background-color:#000!important; }
  #qodef-page-header { display:block!important; }
  .qodef-header--standard #qodef-page-header { height:70px!important; background:#fff!important; }
  .qodef-header--standard #qodef-page-header-inner { box-sizing:border-box; height:70px!important; padding:0 45px!important; }
  .qodef-header--standard #qodef-page-header .qodef-header-wrapper { position:relative; display:flex; align-items:center; width:100%; height:100%; }
  .qodef-header--standard #qodef-page-header .qodef-header-logo { display:flex; align-items:center; height:100%; }
  .qodef-header--standard #qodef-page-header .qodef-header-logo-link { height:44px!important; }
  .qodef-header--standard #qodef-page-header .qodef-header-navigation { position:absolute; top:0; left:50%; height:100%; transform:translateX(-50%); }
  .qodef-header--standard #qodef-page-header .qodef-header-navigation > ul { height:100%; }
  .qodef-header--standard #qodef-page-header .qodef-widget-holder { margin-left:auto; }
  @media only screen and (max-width:1024px) {
    #qodef-top-area, #qodef-page-header { display:none!important; }
    #qodef-page-mobile-header { display:block!important; }
  }
</style>`

function exactElement(markup, selector) {
  const $ = cheerio.load(markup, { sourceCodeLocationInfo: true })
  const node = $(selector).first()[0]
  const location = node?.sourceCodeLocation
  return location ? markup.slice(location.startOffset, location.endOffset) : null
}

function replaceExactElements(markup, replacements) {
  const $ = cheerio.load(markup, { sourceCodeLocationInfo: true })
  const edits = []
  for (const [selector, replacement] of replacements) {
    const node = $(selector).first()[0]
    const location = node?.sourceCodeLocation
    if (location) edits.push({ start: location.startOffset, end: location.endOffset, replacement })
  }
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    markup = markup.slice(0, edit.start) + edit.replacement + markup.slice(edit.end)
  }
  return markup
}

function enforceStandardHeaderClasses(markup) {
  return markup.replace(/(<body[^>]*class=")([^"]*)(")/i, (_, before, classes, after) => {
    const normalized = classes
      .replace(/\bqodef-header--(?!standard\b)[^\s"]+/g, 'qodef-header--standard')
      .replace(/\bqodef-header-(?:vertical|minimal|centered)--[^\s"]+/g, '')
    const withAlignment = /\bqodef-header-standard--center\b/.test(normalized)
      ? normalized
      : `${normalized} qodef-header-standard--center`
    const uniqueClasses = [...new Set(withAlignment.replace(/\s+/g, ' ').trim().split(' '))].join(' ')
    return `${before}${uniqueClasses}${after}`
  })
}

const EXCLUDED_TOP_LEVEL = new Set([
  'atelie-optico-website-2', 'neoocular-astro', 'site-pt',
  'css', 'fonts', 'images', 'img', 'js', 'wp-content', 'wp-includes',
  '.git', '.agents', '.codex', '.vercel', '.vscode',
])

async function findPortuguesePages(dir, depth = 0) {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (depth === 0 && EXCLUDED_TOP_LEVEL.has(entry.name)) continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) found.push(...await findPortuguesePages(path, depth + 1))
    else if (entry.isFile() && entry.name === 'index.html') found.push(path)
  }
  return found
}

async function emptyDirectory(dir) {
  await mkdir(dir, { recursive: true })
  for (const entry of await readdir(dir)) {
    await rm(join(dir, entry), { recursive: true, force: true })
  }
}

const adminPagePath = join(PAGES, 'admin', 'index.astro')
const adminPage = await readFile(adminPagePath, 'utf8').catch(() => null)
await emptyDirectory(CONTENT)
await emptyDirectory(PAGES)
await rm(PUBLIC, { recursive: true, force: true })
await mkdir(PUBLIC, { recursive: true })
if (adminPage) {
  await mkdir(dirname(adminPagePath), { recursive: true })
  await writeFile(adminPagePath, adminPage)
}

const canonicalSource = await readFile(join(SOURCE, 'loja', 'index.html'), 'utf8')
const canonicalRegions = [
  ['#qodef-top-area', exactElement(canonicalSource, '#qodef-top-area')],
  ['#qodef-page-header', exactElement(canonicalSource, '#qodef-page-header')],
  ['#qodef-page-mobile-header', exactElement(canonicalSource, '#qodef-page-mobile-header')],
].filter(([, fragment]) => fragment)

const sourcePages = (await findPortuguesePages(SOURCE)).sort()
for (const sourceFile of sourcePages) {
  const sourceDir = dirname(sourceFile)
  const routeDir = relative(SOURCE, sourceDir)
  const route = routeDir ? `/${routeDir.split(sep).join('/')}/` : '/'
  const key = routeDir ? routeDir.split(sep).join('__') : 'index'
  const snapshot = join(CONTENT, `${key}.page`)
  let markup = await readFile(sourceFile, 'utf8')
  // Use the exact original Portuguese standard header everywhere. This retains
  // its desktop dropdowns, sticky header, mobile menu, social links and actions.
  markup = enforceStandardHeaderClasses(replaceExactElements(markup, canonicalRegions))
  // Only swap the monochrome logo used by the original header/footer components.
  markup = markup.replace(/(?:\.\.\/)*img\/atelie\/atelie-logo-dark\.png/g,
    '/img/atelie/logo-atelie-gold.jpeg')
  markup = markup.replace('</head>', `${standardHeaderStyles}</head>`)
  if (!routeDir) {
    // Keep the appointment CTA centered on the white slider card at every
    // Revolution Slider breakpoint. The card and CTA must share the same x offset.
    markup = markup
      .replace('</head>', `${heroPreloads}${appointmentStyles}</head>`)
      // Serve every hero asset locally instead of waiting for the old remote
      // WordPress host. Revolution Slider may still lazy-load later slides.
      .replaceAll('//neoocular.qodeinteractive.com/wp-content/', '/wp-content/')
      // The first visible slide is above the fold: give its three real images
      // directly to the browser instead of starting with dummy placeholders.
      .replace(/(<rs-slide[^>]*data-key="rs-13"[\s\S]*?<\/rs-slide>)/, (slide) => slide
        .replace(/\sloading="lazy"/g, '')
        .replace(/src="images\/dummy\.png"([^>]*?)class="([^"]*)\brs-lazyload\b([^"]*)"([^>]*?)data-lazyload="(\/wp-content\/(?:uploads\/2021\/(?:08\/main-home-rev-img-19\.png|10\/main-rev-img1\.jpg|10\/main-rev-img-2\.jpg)|plugins\/revslider\/sr6\/assets\/assets\/transparent\.png))"/g,
          'src="$5"$1class="$2$3"$4fetchpriority="high"'))
      .replaceAll('xo:-425px,-289px,55px,57px;', 'xo:-481px,-345px,-1px,0;')
      .replace(/(slider-9-slide-(?:13|21|22)-layer-21[\s\S]*?font-family:'Heebo';)(?!text-align:center;)/g,
        '$1text-align:center;')
      .replace(/(<rs-layer id="slider-9-slide-(?:13|21|22)-layer-21"[^>]*>)[\s\S]*?(<\/rs-layer>)/g,
        '$1<a class="atelie-appointment-link" href="/marcar-consulta/"><span>Marcar Consulta</span></a>$2')
  }
  await writeFile(snapshot, markup)

  const astroFile = routeDir
    ? join(PAGES, routeDir, 'index.astro')
    : join(PAGES, 'index.astro')
  await mkdir(dirname(astroFile), { recursive: true })
  await writeFile(astroFile, `---\nimport pageHtml from '~/content/${key}.page?raw'\n---\n<Fragment set:html={pageHtml} />\n`)
}

const assetDirs = ['css', 'fonts', 'images', 'img', 'js', 'wp-content', 'wp-includes']
for (const name of assetDirs) await cp(join(SOURCE, name), join(PUBLIC, name), { recursive: true })
await cp(join(SOURCE, 'atelie-products', 'logo-atelie.jpeg'), join(PUBLIC, 'img', 'atelie', 'logo-atelie-gold.jpeg'))
for (const name of ['openhand.cur', 'closedhand.cur']) {
  await cp(join(SOURCE, name), join(PUBLIC, name))
}

console.log(`Imported ${sourcePages.length} Portuguese pages.`)
console.log(`Copied ${assetDirs.length} Portuguese asset trees.`)
