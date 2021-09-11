const fs = require('fs')

module.exports = (app) => {
  // 读取目录下面每一个路由，并将其添加到总路由中暴露出去
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') {
      return
    }
    const route = require(`./${file}`)
    app.use(route.routes()).use(route.allowedMethods())
  })
}