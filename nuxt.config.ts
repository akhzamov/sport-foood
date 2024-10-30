export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  vite: {
    server: {
      proxy: {
        "/api": {
          target: "https://crm-api.autosale.pw",
          changeOrigin: true,
        },
      },
    },
  },

  // runtimeConfig: {
  //   public: {
  //     apiBaseUrl: process.env.API_BASE_URL,
  //   },
  // },

  extends: [
    "./app/modules/profile",
    "./app/modules/auth",
    "./app/modules/admin",
    //ADMIN
    "./app/modules/admin/modules/logistics",
  ],

  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
      bodyAttrs: {
        id: "body",
      },
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/google-fonts"],

  plugins: ["~/plugins/vue-datepicker.js"],

  pinia: {
    storesDirs: ["~/stores/**", "~/layers/**/stores/**"],
  },

  css: ["~/assets/css/tailwind.css"],

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "./tailwind.config.js",
    exposeConfig: true,
    viewer: true,
  },

  googleFonts: {
    families: {
      "Roboto Flex": {
        wght: [200, 300, 400, 500, 600, 700],
      },
    },
  },

  routeRules: {
    "/": { prerender: true, redirect: "/profile-dashboard" },
    "/:pathMatch(.*)*": { prerender: true },
  },

  nitro: {
    prerender: {
      routes: ["/index.html", "/404.html"],
    },
  },
});
