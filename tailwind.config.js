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
				'success-color': 'var(--success-color)',
				'error-color': 'var(--error-color)',
				'dark-night-color': 'var(--dark-night-color)',
				'dark-gunmental-color': 'var(--dark-gunmental-color)',
				'dark-charcoal-color': 'var(--dark-charcoal-color)',
				'dark-onix-color': 'var(--dark-onix-color)',
				'dark-eerie-black-color': 'var(--dark-eerie-black-color)',
				'green-25-color': 'var(--green-25-color)',
				'red-25-color': 'var(--red-25-color)',
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
