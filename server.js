import express from 'express'
import { readFileSync, globSync } from 'node:fs'

const app = express()
const port = process.env.PORT ?? 3000

const template = readFileSync('./template.html', 'utf-8')
const component = readFileSync('./component.html', 'utf-8')
const cssFiles = globSync('./public/bootstrap*/css/*.css')
const cssFileContents = cssFiles.map(_ => readFileSync(_, 'utf-8'))

const styleTags = cssFileContents.map(_ => `<style>${_}</style>`).join('\n')
const linkTags = cssFiles.map(_ => `<link rel=stylesheet href=${JSON.stringify(_.replace('public/', ''))}>`).join('\n')

app.get('/', (req, res) => {
  const mode = req.query.mode ?? 'shadow'
  const hoist = req.query.hoist === 'true'
  const strategy = req.query.strategy ?? 'style'
  const num = parseInt(req.query.num ?? '100', 10)

  const inlineTags = hoist ? '' : (strategy === 'style' ? styleTags : linkTags);

  const components = Array(num).fill().map(_ => {
    if (mode === 'shadow') {
      return `<x-foo><template shadowrootmode="open">${inlineTags}${component}</template></x-foo>`
    } else {
      return `<x-foo>${inlineTags}${component}</x-foo>`
    }
  }).join('\n')

  const head = hoist ? (strategy === 'style' ? styleTags : linkTags) : ''

  const html = template
    .replace('__HEAD__', head)
    .replace('__BODY__', components)

  res.send(html)
})

app.use(express.static('public', {
  maxAge: 14400000
}))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
