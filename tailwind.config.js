/* eslint-disable */

const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/assets/styles/index.scss', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media',
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '10px'
			}
		},
		screens: {
			sm: '576px', //container 540px
			md: '768px', //container 720px
			lg: '992px', //container 960px
			xl: '1200px', //container 1140px
			xxl: '1400px' //container 1320px
		},
		extend: {
			backgroundSize: {
				auto: 'auto',
				cover: 'cover',
				contain: 'contain'
			},
			boxShadow: {
				xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
				sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'3xl': '0px 5px 10px 2px rgba(34, 60, 80, 0.2)'
			},
			flex: {
				auto: '1 1 auto'
			},
			fontSize: {
				DEFAULT: '1rem',
				0.7: '0.7rem',
				1.2: '1.2rem',
				1.5: '1.5rem',
				2: '2rem',
				'2lg': '1.38rem'
			},
			fontWeight: {
				inherit: 'inherit',
				'weight100': '100',
				'weight300': '300',
				'weight500': '500',
				'weight700': '700',
				'weight800': '800',
				'weight900': '900'
			},
			lineHeight: {
				DEFAULT: 'normal',
				1: '1rem',
				2: '2rem',
				3: '3rem',
				4: '4rem',
				5: '5rem'
			},
			spacing: {
				0.5: '0.12rem',
				layout: '2.75rem'
			},
			cursor: {
				DEFAULT: 'DEFAULT',
				pointer: 'pointer'
			},
			backgroundPosition: {
				bottom: 'bottom',
				center: 'center',
				left: 'left',
				right: 'right',
				top: 'top'
			},
			border: {
				solid: '1px solid black'
			},
			borderRadius: {
				max: '9999px',
				image: '0.5rem',
				layout: '0.8rem'
			},
			borderStyle: {
				DEFAULT: 'solid'
			},
			borderColor: {
				DEFAULT: 'black'
			},
			borderWidth: {
				DEFAULT: '1px',
				2: '2px'
			},
			opacity: {
				0: '0',
				0.2: '0.2',
				0.4: '0.4',
				0.6: '0.6',
				0.8: '0.8',
				1: '1'
			},
			margin: {
				'0auto': '0 auto',
				auto: 'auto'
			},
			zIndex: {
				0: '0',
				1: '1',
				2: '2',
				3: '3',
				4: '4',
				5: '5'
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out'
			},
			transitionDuration: {
				DEFAULT: '200ms'
			},
			/* eslint-disable */
			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 }
				},
				scaleIn: {
					'0%': {
						opacity: 0,
						transform: 'scale(0.9)'
					},
					'50%': {
						opacity: 0.3
					},
					'100%': {
						opacity: 1,
						transform: 'scale(1)'
					}
				}
			},
			animation: {
				fadeIn: 'fadeIn .5s ease-in-out',
				scaleIn: 'scaleIn .35s ease-in-out'
			},
			colors: {
				transparent: colors.transparent,
				current: 'currentColor',
				white: colors.white,
				black: colors.black,
				red: colors.red,
				extraRed: '#ff0000',
				firebrick: '#b22222',
				tomato: '#ff6347',
				gray: colors.gray,
				yellow: colors.yellow
			}
		},
		plugins: []
	}
}
