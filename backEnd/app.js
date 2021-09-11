const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const routing = require('./routes/index')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const parameter = require('koa-parameter')

// middlewares
app.use(
  koaBody({
    multipart: true,
    strict: false,
    formidable: {
      maxFileSize: 2*1024*1024 // 设置上传文件大小限制，默认2M
    }
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// parameter checking
app.use(parameter(app))

// error handler
onerror(app)

// routes
routing(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
