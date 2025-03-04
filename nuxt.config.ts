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

  runtimeConfig: {
    public: {
      // apiBaseUrl: "https://crm-api.autosale.pw",
      // apiBaseUrl: "https://172.31.10.4",
      apiBaseUrl: "",
    },
  },

  extends: [
    "./app/modules/admin",
    "./app/modules/auth",
    "./app/modules/profile",
    //ADMIN
    "./app/modules/admin/modules/logistic",
    "./app/modules/admin/modules/personal",
    "./app/modules/admin/modules/payment",
    "./app/modules/admin/modules/history",
    "./app/modules/admin/modules/salesReports",
    "./app/modules/admin/modules/settings",
  ],

  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
      bodyAttrs: {
        id: "body",
      },
    },
    // baseURL: "/crm",
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
  ],

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
    "/sign-in": { prerender: true },
    "/profile-dashboard": { prerender: true },
    "/profile-report": { prerender: true },
    "/profile-warehouse": { prerender: true },
    "/admin-new-tab": { prerender: true },
    "/admin-procurement-management": { prerender: true },
    "/admin-employees": { prerender: true },
    "/admin-sales-agents": { prerender: true },
    "/admin-drivers": { prerender: true },
    "/admin-history": { prerender: true },
    "/payment-archive": { prerender: true },
    "/payment-requests": { prerender: true },
    "/admin-sales-reports-archive": { prerender: true },
    "/admin-sales-reports": { prerender: true },
    "/admin-setting-cities": { prerender: true },
    "/admin-setting-districts": { prerender: true },
    "/:pathMatch(.*)*": { prerender: true },
  },

  nitro: {
    // preset: "static",
  },

  ssr: false,
});