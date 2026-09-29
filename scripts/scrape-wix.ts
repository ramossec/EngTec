/**
 * One-off migration: downloads every internal page of the legacy Wix site,
 * extracts visible text and images into /migration for content rewriting.
 */
import * as cheerio from 'cheerio'
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const ORIGIN = 'https://www.engtecnsolucoes.com.br'
const OUT = 'migration'

interface PageDump {
  url: string
  path: string
  title: string
  texts: string[]
  images: string[]
}

async function get(url: string): Promise<string> {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (migration script)' } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}

function internalLinks(html: string): string[] {
  const $ = cheerio.load(html)
  const links = new Set<string>()
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? ''
    if (href.startsWith(ORIGIN)) links.add(decodeURI(href.replace(ORIGIN, '') || '/'))
  })
  return [...links]
}

function originalImage(src: string): string | null {
  const m = src.match(/https:\/\/static\.wixstatic\.com\/media\/([^/?"\s]+)/)
  if (!m) return null
  return `https://static.wixstatic.com/media/${m[1].replace('%7E', '~')}`
}

function extract(html: string, path: string): PageDump {
  const $ = cheerio.load(html)
  const texts: string[] = []
  $('[data-testid="richTextElement"]').each((_, el) => {
    const blocks: string[] = []
    $(el).find('p, h1, h2, h3, h4, h5, h6, li').each((_, b) => {
      const t = $(b).text().replace(/\s+/g, ' ').trim()
      if (t) blocks.push(t)
    })
    texts.push(...blocks)
  })
  const images = new Set<string>()
  $('img[src]').each((_, el) => {
    const u = originalImage($(el).attr('src') ?? '')
    if (u && !/\.wix_mp$|48a2a42b19814efaa824450f23e8a253/.test(u)) images.add(u)
  })
  return { url: ORIGIN + path, path, title: $('title').text().trim(), texts, images: [...images] }
}

async function saveImage(url: string): Promise<string | null> {
  const name = url.split('/').pop()!.replace(/~mv2/, '').replace(/\.(jpe?g|png|webp)$/i, '') + '.webp'
  const file = join(OUT, 'images', name)
  if (existsSync(file)) return name
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(file)
    return name
  } catch {
    return null
  }
}

async function main() {
  await mkdir(join(OUT, 'pages'), { recursive: true })
  await mkdir(join(OUT, 'images'), { recursive: true })
  const home = await get(ORIGIN + '/')
  const paths = ['/', ...internalLinks(home).filter((p) => p !== '/')]
  const dumps: PageDump[] = []
  const failedImages: string[] = []
  for (const path of paths) {
    try {
      const html = path === '/' ? home : await get(ORIGIN + encodeURI(path))
      const dump = extract(html, path)
      const saved: string[] = []
      for (const img of dump.images) {
        const name = await saveImage(img)
        if (name) saved.push(name)
        else failedImages.push(img)
      }
      dump.images = saved
      dumps.push(dump)
      const slug = path === '/' ? 'home' : path.slice(1)
      await writeFile(join(OUT, 'pages', `${slug}.json`), JSON.stringify(dump, null, 2))
      console.log(`ok ${path} (${dump.texts.length} blocks, ${saved.length} imgs)`)
    } catch (e) {
      console.log(`FAIL ${path}: ${(e as Error).message}`)
    }
  }
  const byText = new Map<string, string[]>()
  for (const d of dumps) {
    const key = d.texts.join('|').slice(0, 400)
    byText.set(key, [...(byText.get(key) ?? []), d.path])
  }
  const lines = ['# Inventário do site Wix', '', '| URL antiga | Título | Blocos | Duplicada de |', '|---|---|---|---|']
  for (const d of dumps) {
    const dup = (byText.get(d.texts.join('|').slice(0, 400)) ?? []).filter((p) => p !== d.path)
    lines.push(`| ${d.path} | ${d.title} | ${d.texts.length} | ${dup.join(', ')} |`)
  }
  if (failedImages.length) lines.push('', '## Imagens que falharam', ...failedImages.map((u) => `- ${u}`))
  await writeFile(join(OUT, 'INVENTORY.md'), lines.join('\n') + '\n')
}

main()
