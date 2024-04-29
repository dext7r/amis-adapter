const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// eslint-disable-next-line unused-imports/no-unused-vars
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { name } = require('./package')

module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`
    config.output.libraryTarget = 'umd'
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`
    config.output.globalObject = 'window'
    config.resolve.conditionNames = ['require', 'node']

    // 作为子应用时字体文件路径加载错误，改为inline模式
    config.module.rules.push({
      test: /\.(woff2?|eot|ttf|otf)$/i,
      type: 'asset/inline',
    })

    config.module.rules.push({
      test: /\.(svg?|png)$/i,
      type: 'asset/inline',
    })

    config.plugins.push(new MonacoWebpackPlugin({
      languages: ['json', 'javascript', 'typescript'],
    }))

    return config
  },

  devServer: (_) => {
    const config = _

    config.headers = {
      'Access-Control-Allow-Origin': '*',
    }
    config.historyApiFallback = true

    config.hot = false
    // config.watchContentBase = false;
    config.liveReload = false

    return config
  },
}
