class HomeCtl {
    index(ctx) {
        ctx.body = `<h1 style='color:red'>首页内容</h1>`
    }
}

module.exports = new HomeCtl()