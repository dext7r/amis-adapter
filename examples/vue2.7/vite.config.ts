import path from 'node:path'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { createVuePlugin } from 'vite-plugin-vue2'
import viteCompression from 'vite-plugin-compression'
import { viteStaticCopy } from 'vite-plugin-static-copy'

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
          chunkFileNames: 'static/assets/js/[name]-[hash].js',
          entryFileNames: 'static/assets/js/[name]-[hash].js',
          assetFileNames: 'static/assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    // base: './',
    resolve: {
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
      process.env.PUBLIC_PATH_PREFIX ?
      addPrefixPlugin('/vue2.7')
       : null,
      viteStaticCopy({
        targets: [
          {
            src: `${path.resolve(__dirname, './node_modules/amis/sdk')}/[!.]*`,
            dest: 'amis/sdk',
          },
        ],
      }),
      createVuePlugin(/* options */),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      viteCompression(),
    ],
  })
}
