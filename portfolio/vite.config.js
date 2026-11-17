import { defineConfig } from 'vite'
import { resolve } from 'path'

// 多页面入口：首页 + 5 个项目详情页
const pages = {
  main: resolve(__dirname, 'index.html'),
  xiaohongshu: resolve(__dirname, 'projects/xiaohongshu.html'),
  feishu: resolve(__dirname, 'projects/feishu.html'),
  crossborder: resolve(__dirname, 'projects/crossborder.html'),
  ecommerce: resolve(__dirname, 'projects/ecommerce.html'),
  aiindustry: resolve(__dirname, 'projects/aiindustry.html'),
}

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: pages,
    },
  },
  server: {
    port: 5173,
    open: false,
  },
})
