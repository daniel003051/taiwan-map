import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mkcert()],
  build: {
    // minify: "esbuild",
    reportCompressedSize: false,
    sourcemap: false,
    emptyOutDir: false,
    target: 'es2021',
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        format: 'iife',
        entryFileNames: 'app.js',
        inlineDynamicImports: false,
      }

      // treeshake: true
    },
    chunkSizeWarningLimit: 1000,
  },
  
  resolve: {
    alias: {
      '@':  '/src',
    }
  },
  css: {
    // css 前處理器
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "./src/styles/main.scss";',
      },
    },
  },
})
