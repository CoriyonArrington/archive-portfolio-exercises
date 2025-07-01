import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				md: '2rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: ["SF Pro Display", "Inter", "system-ui", "sans-serif"],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				highlight: "#10b981",
				success: {
					50: "#e8f8f0",
					100: "#d0f1e0",
					200: "#a2e4c2",
					300: "#73d6a3",
					400: "#45c985",
					500: "#17bc66",
					600: "#129652",
					700: "#0d713d",
					800: "#084b29",
					900: "#042614",
				},
				warning: {
					50: "#fef6e8",
					100: "#fdedd0",
					200: "#fbdba2",
					300: "#f9c973",
					400: "#f7b645",
					500: "#f5a416",
					600: "#c48312",
					700: "#93620e",
					800: "#624209",
					900: "#312105",
				},
				danger: {
					50: "#fde8e8",
					100: "#fcd0d0",
					200: "#f9a2a2",
					300: "#f67373",
					400: "#f34545",
					500: "#f01616",
					600: "#c01212",
					700: "#900d0d",
					800: "#600909",
					900: "#300404",
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography"), require("@tailwindcss/forms")],
} satisfies Config;
