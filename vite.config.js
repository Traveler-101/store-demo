import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'public/uploads',
          dest: '',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: '/store-demo/',
  publicDir: 'public',
  
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: {
        toplevel: true,
      },
    },
    
    cssCodeSplit: true,
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  
  server: {
    port: 5173,
    open: true,
    compress: true,
  },
})
