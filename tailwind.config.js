/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./app/components/**/*.{vue,js,ts}',
		'./app/layers/**/*.{js,ts,vue}',
		'./app/layouts/**/*.vue',
		'./app/pages/**/*.vue',
		'./app/composables/**/*.{js,ts}',
		'./app/plugins/**/*.{js,ts}',
		'./app/utils/**/*.{js,ts}',
		'./app/App.{js,ts,vue}',
		'./app/Error.{js,ts,vue}',
		'./app/app.config.{js,ts}',
	],
	theme: {
		extend: {
			colors: {
				'primary-color': 'var(--primary-color)',
				'secondary-color': 'var(--secondary-color)',
				'error-25': 'var(--error-25)',
				'error-50': 'var(--error-50)',
				'error-100': 'var(--error-100)',
				'error-200': 'var(--error-200)',
				'error-300': 'var(--error-300)',
				'error-400': 'var(--error-400)',
				'error-500': 'var(--error-500)',
				'error-500-20': 'var(--error-500-20)',
				'error-600': 'var(--error-600)',
				'error-700': 'var(--error-700)',
				'error-800': 'var(--error-800)',
				'error-900': 'var(--error-900)',
				'warning-25': 'var(--warning-25)',
				'warning-50': 'var(--warning-50)',
				'warning-100': 'var(--warning-100)',
				'warning-200': 'var(--warning-200)',
				'warning-300': 'var(--warning-300)',
				'warning-400': 'var(--warning-400)',
				'warning-500': 'var(--warning-500)',
				'warning-500-20': 'var(--warning-500-20)',
				'warning-600': 'var(--warning-600)',
				'warning-700': 'var(--warning-700)',
				'warning-800': 'var(--warning-800)',
				'warning-900': 'var(--warning-900)',
				'success-25': 'var(--success-25)',
				'success-50': 'var(--success-50)',
				'success-100': 'var(--success-100)',
				'success-200': 'var(--success-200)',
				'success-300': 'var(--success-300)',
				'success-400': 'var(--success-400)',
				'success-500': 'var(--success-500)',
				'success-500-20': 'var(--success-500-20)',
				'success-600': 'var(--success-600)',
				'success-700': 'var(--success-700)',
				'success-800': 'var(--success-800)',
				'success-900': 'var(--success-900)',
				'dark-night-color': 'var(--dark-night-color)',
				'dark-gunmental-color': 'var(--dark-gunmental-color)',
				'dark-charcoal-color': 'var(--dark-charcoal-color)',
				'dark-onix-color': 'var(--dark-onix-color)',
				'dark-eerie-black-color': 'var(--dark-eerie-black-color)',
				'green-25-color': 'var(--green-25-color)',
				'green-20-color': 'var(--green-20-color)',
				'red-25-color': 'var(--red-25-color)',
				'red-20-color': 'var(--red-20-color)',
				'gray-25-color': 'var(--gray-25-color)',
				'gray-90-color': 'var(--gray-90-color)',
				'gray-75-color': 'var(--gray-75-color)',
				'gray-40-color': 'var(--gray-40-color)',
				'gray-15-color': 'var(--gray-15-color)',
			},
			backgroundImage: {
				'profile-header-bg-liner': 'var(--profile-header-bg-liner)',
				'marketplace-line-bg-liner-left': 'var(--line-bg-liner-left)',
				'marketplace-line-bg-liner-right': 'var(--line-bg-liner-right)',
				'marketplace-line-bg-top-liner': 'var(--line-bg-top-liner)',
			},
			gridTemplateColumns: {
				'custom-3-390': 'repeat(3, 390px)',
			},
		},
	},
	plugins: [],
}
