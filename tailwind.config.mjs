/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: "#050505", // Más oscuro aún para contraste
				surface: "#0A0A0A", // Superficie metálica
				surfaceHighlight: "#1C1C1C",
				primary: "#FF6363", 
				secondary: "#8B5CF6",
				textMain: "#EDEDED", // Blanco no puro (menos agresivo)
				textMuted: "#A1A1AA",
				border: "#262626",
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			backgroundImage: {
				'metallic': "linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(255,255,255,0))",
				'spotlight': "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)",
			},
			animation: {
				'fade-in': 'fadeIn 1s ease-out forwards',
				'float': 'float 6s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				}
			}
		},
	},
	plugins: [],
}