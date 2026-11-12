import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import ts from 'typescript'

const isPreview = process.argv.includes('--preview')
const source = await readFile('src/config/company.ts', 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText
const { company } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)
const errors = []
const required = ['tradeName', 'legalName', 'cnpj', 'email', 'phone', 'whatsapp', 'address', 'city', 'state', 'description']
for (const key of required) {
  if (!company[key]?.trim() || /\[|\]|a configurar|placeholder/i.test(company[key])) errors.push(`Preencha company.${key} com dados reais.`)
}
if (!/^55\d{10,11}$/.test(company.whatsapp)) errors.push('WhatsApp inválido: use 55 + DDD + número, somente dígitos.')
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(company.email)) errors.push('E-mail inválido.')
if (!/^[A-Z]{2}$/.test(company.state)) errors.push('Use uma UF com duas letras maiúsculas.')
if (!/^[\dA-Z]{2}\.?[\dA-Z]{3}\.?[\dA-Z]{3}\/?[\dA-Z]{4}-?\d{2}$/.test(company.cnpj)) errors.push('Informe o CNPJ completo; confira-o no cadastro oficial.')
if (company.siteUrl) try {
  const url = new URL(company.siteUrl)
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || /localhost|example\.|exemplo\./.test(url.hostname)) throw new Error()
} catch { errors.push('siteUrl deve ser a origem HTTPS válida do domínio real.') }
if (!isPreview && errors.length) {
  console.error(`\nPublicação bloqueada: dados reais pendentes.\n- ${errors.join('\n- ')}\n\nUse npm run dev ou npm run build:preview para revisar localmente.`)
  process.exit(1)
}
for (const args of [['node_modules/typescript/bin/tsc', '-b'], ['node_modules/vite/bin/vite.js', 'build']]) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status || 1)
}
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const origin = company.siteUrl.replace(/\/$/, '')
const indexable = !isPreview && Boolean(origin)
const template = await readFile('dist/index.html', 'utf8')
const pages = [['', 'Variedade para o seu dia a dia'], ['politica-de-privacidade', 'Política de Privacidade'], ['termos-de-uso', 'Termos de Uso']]
for (const [path, title] of pages) {
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(title)} | ${escape(company.tradeName || '[Nome da empresa]')}</title>`)
  html = html.replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(title)} | ${escape(company.tradeName || '[Nome da empresa]')}`)
  if (indexable) {
    const url = `${origin}/${path}`
    html = html.replace('noindex, nofollow', 'index, follow').replace('content="/images/papelaria.svg"', `content="${escape(origin)}/images/papelaria.svg"`)
    html = html.replace('</head>', `<link rel="canonical" href="${escape(url)}" /><meta property="og:url" content="${escape(url)}" /></head>`)
  }
  const directory = resolve('dist', path)
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), html)
}
await writeFile('dist/robots.txt', !indexable ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
const urls = !indexable ? '' : pages.map(([path]) => `<url><loc>${escape(`${origin}/${path}`)}</loc></url>`).join('')
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`)
console.log(isPreview ? '\nPrévia local gerada em dist/ (noindex).' : `\nSite institucional gerado em dist/${origin ? ` para ${origin}` : '. Preencha siteUrl para habilitar indexação, canonical e sitemap com domínio real'}.`)
