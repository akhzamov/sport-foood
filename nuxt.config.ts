export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },

	future: {
		compatibilityVersion: 4,
	},

	// vite: {
	// 	server: {
	// 		proxy: {
	// 			"/api": {
	// 				target: "https://crm-api.autosale.pw",
	// 				changeOrigin: true,
	// 			},
	// 		},
	// 	},
	// },

	extends: [
		"./app/modules/about",
		"./app/modules/profile",
		"./app/modules/settings",
		"./app/modules/users",
		"./app/modules/auth",
	],

	app: {
		head: {
			link: [
				{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
			],
			bodyAttrs: {
				id: "body",
			},
		},
	},

	modules: [
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
		"@nuxtjs/google-fonts",
	],

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
		"/": { prerender: true, redirect: "/profile" },
		"/:pathMatch(.*)*": { prerender: true },
	},

	ssr: false,

	nitro: {
		prerender: {
			routes: ["/index.html", "/404.html"],
		},
		preset: "static",
	},
});
