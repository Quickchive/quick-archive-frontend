import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'fs'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'generate-sitemap',
      closeBundle: async () => {
        const sitemap = new SitemapStream({ hostname: 'https://quickarchive.co.kr' })
        const writeStream = createWriteStream('./dist/sitemap.xml')

        sitemap.pipe(writeStream)

        const routes = [
          { url: '/', changefreq: 'monthly', priority: 1.0 },
          { url: '/login', changefreq: 'monthly', priority: 0.8 },
          { url: '/login/tester', changefreq: 'monthly', priority: 0.5 },
          { url: '/main', changefreq: 'daily', priority: 0.9 },
          { url: '/main/search', changefreq: 'daily', priority: 0.8 },
          { url: '/main/setting', changefreq: 'monthly', priority: 0.6 },
          { url: '/main/setting/myinfo', changefreq: 'monthly', priority: 0.6 }
        ]

        routes.forEach((route) => {
          sitemap.write(route)
        })

        sitemap.end()
      }
    }
  ],

  base: '/',
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/assets/scss/abstracts/_variables.scss";`
      }
    }
  }
})
