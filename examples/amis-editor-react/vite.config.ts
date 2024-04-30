import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function addPrefixPlugin(prefix) {
  return {
    name: 'add-prefix-plugin',
    async transformIndexHtml(html) {
      return html.replace(/(href|src)="(?!http|\/\/)/g, `$1="${prefix}`)
    },
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 在这里修改静态资源路径
        chunkFileNames: 'static-amis-editor-react/js/[name]-[hash].js',
        entryFileNames: 'static-amis-editor-react/js/[name]-[hash].js',
        assetFileNames: 'static-amis-editor-react/[ext]/[name]-[hash].[ext]',
      },
    },
    sourcemap: false,
  },
  plugins: [
    react(),
    process.env.PUBLIC_PATH_PREFIX
      ? addPrefixPlugin('/amis-editor-react')
      : null,
  ],
})
