const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: false,
  publicPath: './staticVue-amis-editor-webpack/',
  chainWebpack: (config) => {
    // config.plugin('add-prefix-plugin').use( addPrefixPlugin('staticVue-amis-editor-webpack/'))
    config.plugin('monaco').use(new MonacoWebpackPlugin({
      languages: ['json'],
    }))
    config.merge({
      resolve: {
        conditionNames: ['require', 'node'],
      },
    })
  },
})
