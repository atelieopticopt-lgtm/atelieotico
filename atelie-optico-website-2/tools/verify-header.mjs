import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cheerio from 'cheerio'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CONTENT = join(ROOT, 'src', 'content')
const files = (await readdir(CONTENT)).filter((file) => file.endsWith('.page'))
const failures = []

for (const file of files) {
  const markup = await readFile(join(CONTENT, file), 'utf8')
  const $ = cheerio.load(markup)
  const body = $('body')
  const header = $('#qodef-page-header')
  const mobileHeaders = $('#qodef-page-mobile-header').length
  const stickyHeaders = header.find('.qodef-header-sticky').length
  const desktopLogo = header.find('.qodef-header-logo').first()
  const menuItems = header.find('.qodef-menu-item-text').length
  const dropdowns = header.find('.qodef-drop-down-second').length
  const hasGoldHeaderLogo = desktopLogo.find('img[src="/img/atelie/logo-atelie-gold.jpeg"]').length === 1
  const footer = $('#qodef-page-footer')
  const hasGoldFooterLogo = footer.length === 0
    || footer.find('img[src="/img/atelie/logo-atelie-gold.jpeg"]').length > 0
  const valid = body.hasClass('qodef-header--standard')
    && !body.hasClass('qodef-header--vertical')
    && header.length === 1
    && mobileHeaders === 1
    && stickyHeaders === 1
    && !markup.includes("header-inner' class=")
    && desktopLogo.length === 1
    && menuItems === 26
    && dropdowns === 4
    && hasGoldHeaderLogo
    && hasGoldFooterLogo
  if (!valid) failures.push({ file, mobileHeaders, stickyHeaders, menuItems, dropdowns, hasGoldHeaderLogo, hasGoldFooterLogo, classes: body.attr('class') })
}

console.log(JSON.stringify({ pages: files.length, failures: failures.length, examples: failures.slice(0, 5) }, null, 2))
if (files.length !== 160 || failures.length) process.exitCode = 1
