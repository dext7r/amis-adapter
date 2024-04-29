import * as path from 'node:path'
import { defineConfig } from 'rspress/config'

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'amis-adapter',
  outDir: 'doc',
  description: '👷‍♂️旨在增强 amis 系列产品的开发体验--@baidu/amis的生态扩展',
  icon: 'https://nakoruru.h7ml.cn/proxy/avatars.githubusercontent.com/u/69443639?s=200&v=4',
  logo: {
    light: 'https://nakoruru.h7ml.cn/proxy/avatars.githubusercontent.com/u/69443639?s=200&v=4',
    dark: 'https://nakoruru.h7ml.cn/proxy/avatars.githubusercontent.com/u/69443639?s=200&v=4',
  },
  base: '/',
  builderConfig: {
    output: {
      // assetPrefix: './amis-adapter/doc/',
    },
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/dext7r/amis-adapter' },
    ],
  },
})
