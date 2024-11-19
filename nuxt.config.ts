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
    "./app/modules/profile",
    "./app/modules/auth",
    "./app/modules/admin",
    //ADMIN
    "./app/modules/admin/modules/logistics",
    "./app/modules/admin/modules/personal",
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
    // "/about": { prerender: true },
    // "/admin-new-tab": { prerender: true },
    // "/admin-procurement-management": { prerender: true },
    // "/sign-in": { prerender: true },
    // "/profile-dashboard": { prerender: true },
    // "/profile-report": { prerender: true },
    // "/profile-warehouse": { prerender: true },
    // "/settings": { prerender: true },
    // "/users": { prerender: true },
    "/:pathMatch(.*)*": { prerender: true },
  },

  nitro: {
    prerender: {
      routes: ["/index.html", "/404.html"],
    },
    // preset: "static",
  },

  // ssr: false,
});
