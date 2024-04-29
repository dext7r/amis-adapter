const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/webdis', {
    target: 'https://127.0.0.1:7379',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/webdis': '',
    },
  }))
}
