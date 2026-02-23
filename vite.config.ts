import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 1. 设置基础路径：仅需仓库名，前后带斜杠
  base: '/Lab-website/', 

  plugins: [
    // React 和 Tailwind 插件对项目运行至关重要，请勿移除
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      // 将 @ 指向 src 目录，方便代码中引用组件
      '@': path.resolve(__dirname, './src'),
    },
  },

  // 支持原始导入的文件类型
  assetsInclude: ['**/*.svg', '**/*.csv'],
})