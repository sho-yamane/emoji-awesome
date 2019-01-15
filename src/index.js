const emoji = require('emoji.json')
const fs = require('fs')
const async = require('async')

let css = `.ea {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  -webkit-font-feature-settings: normal;
  font-feature-settings: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

`

let readme = `# Emojis Awesome

気軽に絵文字を使えるCSSライブラリーです。

## Setup

\`\`\`
# npm
npm i -D emojis-awesome
# yarn
yarn add emojis-awesome
\`\`\`

\`\`\`
<link rel="stylesheet" href="css/emojis-awesome.css">
\`\`\`

## Sample

| No | アイコン | コード |
----|----|----
`

let html = `<!DOCTYPE html>

<html lang="ja">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="emojis-awesome.css">
    <title>
        Emojis Awesome
    </title>
</head>

<body>
`

// css作成
function createCss (emoji) {
  async.each(emoji, (e, callback) => {
    css += `.ea.${e.name}::before {\n`
    css += `  content: '${e.char}'\n`
    css += '}\n'
    callback()
  }, (err) => {
    if (err) throw err
    fs.writeFile('./css/emojis-awesome.css', css, (err) => {
      if (err) throw err
    })
    fs.writeFile('./sample/emojis-awesome.css', css, (err) => {
      if (err) throw err
    })
  })
}

// readme作成
function createReadMe (emoji) {
  async.each(emoji, (e, callback) => {
    readme += `| ${e.no} | ${e.char} | \`<i class="ea ${e.name}"></i>\` |`
    readme += '\n'
    callback()
  }, (err) => {
    console.log(readme)
    if (err) throw err
    fs.writeFile('./README.md', readme, (err) => {
      if (err) throw err
    })
  })
}

// html作成
function createHtml (emoji) {
  async.each(emoji, (e, callback) => {
    html += `<i class="ea ${e.name}"></i>${e.name}<br>`
    callback()
  }, (err) => {
    html += '</body></html>'
    if (err) throw err
    fs.writeFile('./sample/index.html', html, (err) => {
      if (err) throw err
    })
  })
}

!(async() => {
  try {
    const mapedEmoji = emoji.map(e => {
      return {
        no: e.no,
        char: e.char,
        name: e.name.replace(/\:\s+/g, '-').replace(/\s+/g, '-').replace(/\:/g, '-').toLowerCase().split(',')[0]
      }
    })
    createCss(mapedEmoji)
    createReadMe(mapedEmoji)
    createHtml(mapedEmoji)
  } catch(e) {
    console.error(e)
  }
})()