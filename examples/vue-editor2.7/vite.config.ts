import path from 'node:path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import viteCompression from 'vite-plugin-compression'
// import monaco from '@tomjs/vite-plugin-monaco-editor'

const REPLACEMENT = `${path.resolve(__dirname, './src')}/`
function addPrefixPlugin(prefix) {
  return {
    name: 'add-prefix-plugin',
    async transformIndexHtml(html) {
      return html.replace(/(href|src)="(?!http|\/\/)/g, `$1="${prefix}`)
    },
  }
}
export default (/** if you want to use mode : { mode } */) => {
  return defineConfig({
    build: {
      rollupOptions: {
        output: {
          // 在这里修改静态资源路径
          chunkFileNames: 'https://amis-adapter.h7ml.cn/vue-editor2.7/static/assets/js/[name]-[hash].js',
          entryFileNames: 'https://amis-adapter.h7ml.cn/vue-editor2.7/static/assets/js/[name]-[hash].js',
          assetFileNames: 'https://amis-adapter.h7ml.cn/vue-editor2.7/static/assets/[ext]/[name]-[hash].[ext]',
        },
      },
      sourcemap: true,
    },
    // base: './',
    resolve: {
      conditions: ['require'],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'], // .vue added
      alias: [
        {
          find: '@/',
          replacement: REPLACEMENT,
        },
        {
          find: 'src/',
          replacement: REPLACEMENT,
        },
      ],
    },
    plugins: [
      process.env.PUBLIC_PATH_PREFIX
        ? addPrefixPlugin('/vue-editor2.7')
        : null,
      createVuePlugin(/* options */),
      viteCompression(),
      // monaco({ local: true })
    ],
  })
}
