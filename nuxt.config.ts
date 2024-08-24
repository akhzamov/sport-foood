export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  extends: [
    'app/layers/about',
    'app/layers/profile',
    'app/layers/settings',
    'app/layers/users'
  ],


  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
      ],
      bodyAttrs: {
        id: 'body'
      }
    },

  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/google-fonts'],

  pinia: {
    storesDirs: ['~/stores/**', '~/layers/**/stores/**'],
  },

  css: ['~/assets/css/tailwind.css'],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: './tailwind.config.js',
    exposeConfig: true,
    viewer: true,
  },

  googleFonts: {
    families: {
      Roboto: {
        wght: [400, 500, 600, 700]
      }
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/:pathMatch(.*)*': { prerender: true },
  },

  nitro: {
    prerender: {
      routes: ['/index.html', '/404.html'],
    },
  },

})