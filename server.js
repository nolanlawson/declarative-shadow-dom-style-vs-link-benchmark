import express from 'express'
import { readFileSync, globSync } from 'node:fs'

const app = express()
const port = process.env.PORT ?? 3000

const template = readFileSync('./template.html', 'utf-8')
const component = readFileSync('./component.html', 'utf-8')
const cssFiles = globSync('./public/bootstrap*/css/*.css')
const cssFileContents = cssFiles.map(_ => readFileSync(_, 'utf-8'))

const styleTags = cssFileContents.map(_ => `<style>${_}</style>`).join('\n')
const styleTagsWithIds = cssFileContents.map((_, i) => `<style id="style-${i}">${_}</style>`).join('\n')
const linkTags = cssFiles.map(_ => `<link rel=stylesheet href=${JSON.stringify(_.replace('public/', ''))}>`).join('\n')

const sharedStyleComponentSource = readFileSync('./shared-style.js', 'utf-8')

app.get('/', (req, res) => {
  const mode = req.query.mode ?? 'shadow'
  const hoist = req.query.hoist === 'true'
  const strategy = req.query.strategy ?? 'style'
  const num = parseInt(req.query.num ?? '100', 10)

  let firstInlineTags = ''
  let inlineTags = ''

  if (!hoist) {
    inlineTags = strategy === 'style' ? styleTags : linkTags;
  }

  if (strategy === 'component') {
    const sharedStyleComponents = Array(cssFiles.length).fill().map((_, i) => `<shared-style style-id="style-${i}"></shared-style>`).join('\n')
    firstInlineTags = styleTagsWithIds + sharedStyleComponents
    inlineTags = sharedStyleComponents
  }

  const body = Array(num).fill().map((_, i) => {
    const inlineTagsToUse = firstInlineTags && i === 0 ? firstInlineTags : inlineTags
    if (mode === 'shadow') {
      return `<x-foo><template shadowrootmode="open">${inlineTagsToUse}${component}</template></x-foo>`
    } else {
      return `<x-foo>${inlineTagsToUse}${component}</x-foo>`
    }
  }).join('\n')

  let head = hoist ? (strategy === 'style' ? styleTags : linkTags) : ''

  if (strategy === 'component') {
    head += `<script>${sharedStyleComponentSource}</script>`
  }
  const html = template
    .replace('__HEAD__', head)
    .replace('__BODY__', body)

  res.send(html)
})

app.use(express.static('public', {
  maxAge: 14400000
}))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
