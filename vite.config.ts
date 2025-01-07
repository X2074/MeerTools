import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';
// @ts-ignore
import path from 'path'
const timeStamp = new Date().getTime()
export default ({ mode }) => defineConfig({
  base: '/',
  publicDir: 'public',
  plugins: [
    vue(),
    // visualizer({
    //   open: true, // 构建完成后自动打开分析图
    //   filename: 'stats.html', // 输出的文件名
    // })
  ],
  // 禁止解析pubblic'文件夹下的文件
  // , '**/*.json'
  assetsInclude: ['**/*.md', '**/*.txt', '**/*.sh', '**/*.sol'],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      '@env': path.resolve(__dirname, `./.env.${process.env.NODE_ENV}`),
      '@': path.resolve(__dirname, 'src')
    },
  },
  server: {
    host: "localhost",
    port: 8090,
    // host:'10.10.34.183',
    hmr: true,
    cors: true,
    open: true
  },
  build: {
    // assetsDir: 'src/assets',
    outDir: 'dist',
    cssCodeSplit: true,
    sourcemap: false,
    manifest: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].${timeStamp}.js`,
        chunkFileNames: `assets/[name].${timeStamp}.js`,
        assetFileNames: `assets/[name].${timeStamp}.[ext]`
      }
    },
    // 打包删除控制台打印
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false
})
