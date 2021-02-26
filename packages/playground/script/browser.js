const execa = require('execa')
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const babel = require('@babel/core')

function resolve(url) {
  return path.resolve(__dirname, '../../' + url)
}

async function tsc() {
  await execa(
    'tsc',
    // [
    // '-w'
    // ],
    {
      stdio: 'inherit'
    }
  )
}

// 模块映射
const moudleMap = {
  // vue模块使用已经打包好的，如果要动态修改vue源码查看效果， 请在vue-next下执行npm run dev
  vue: '/vue/dist/vue.esm-browser.js',
  reactivity: '/reactivity/dist/reactivity.esm-browser.js'
}

const visitor = {
  ImportDeclaration(path) {
    let oldModuleName = path.node.source.value
    if (moudleMap[oldModuleName]) {
      // 别名
      path.node.source.value = moudleMap[oldModuleName]
    } else if (!/\.js$/.test(oldModuleName) && !/\.map$/.test(oldModuleName)) {
      // 后缀省略
      path.node.source.value += '.js'
    }
  }
}

function transformCode(code) {
  const result = babel.transform(code, {
    inputSourceMap: false, // 为了使用ts的sourcemap
    plugins: [{ visitor }]
  })
  return result.code
}

app.use(function(req, res, next) {
  console.log('request time', new Date().toLocaleString(), '   ', req.path)
  // TODO: 去掉缓存
  res.setHeader('Cache-Control', 'max-age=0, no-cache')
  if (/^\/playground/.test(req.path)) {
    res.setHeader('Content-Type', 'application/javascript')
    let content = fs.readFileSync(resolve(req.path))
    let str = content.toString('utf-8', 0, content.length)
    if (/\.js$/.test(req.path)) {
      str = transformCode(str)
    }
    res.send(Buffer.alloc(str.length, str, 'utf-8'))
  } else if (/^\/(vue|reactivity)/.test(req.path)) {
    res.setHeader('Content-Type', 'application/javascript')
    let content = fs.readFileSync(resolve(req.path))
    res.send(content)
  }
  next()
})

app.get('/', (req, res) => {
  // 每次请求前都会先将ts编译成js, 编译后的js文件在dist文件夹内
  tsc()
  res.setHeader('Content-Type', 'text/html')
  const content = fs.readFileSync(path.resolve(__dirname, '../template.html'))
  res.send(content)
})

app.listen(9527, err => {
  if (!err) {
    console.log('localhost:9527')
  }
})
