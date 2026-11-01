import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // 静态部署用相对路径：无论挂在 Gitee Pages 的 /仓库名/ 还是根路径都能正确加载资源
  base: './',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // 本机缺 lightningcss 平台二进制、也没有 esbuild 包 → 关闭 CSS 压缩（样式体积略大，但功能完全一致）
    cssMinify: false,
  },
})
