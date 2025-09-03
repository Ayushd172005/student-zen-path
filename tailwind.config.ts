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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'display': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-calm': 'var(--gradient-calm)',
				'gradient-healing': 'var(--gradient-healing)',
				'gradient-support': 'var(--gradient-support)',
				'gradient-wellness': 'var(--gradient-wellness)'
			},
			boxShadow: {
				'gentle': 'var(--shadow-gentle)',
				'warm': 'var(--shadow-warm)',
				'deep': 'var(--shadow-deep)'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'gentle': 'cubic-bezier(0.25, 0.1, 0.25, 1)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
					'50%': { transform: 'scale(1.02)', opacity: '1' }
				},
				'crisis-pulse': {
					'0%, 100%': { boxShadow: '0 0 0 0 hsl(var(--destructive) / 0.7)' },
					'50%': { boxShadow: '0 0 0 15px hsl(var(--destructive) / 0)' }
				},
				'loading-dots': {
					'0%, 80%, 100%': { transform: 'scale(0)' },
					'40%': { transform: 'scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) scale(1)' },
					'25%': { transform: 'translateY(-20px) scale(1.05)' },
					'50%': { transform: 'translateY(10px) scale(0.95)' },
					'75%': { transform: 'translateY(-15px) scale(1.02)' }
				},
				'wave': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(50%)' }
				},
				'pulse-bg': {
					'0%, 100%': { opacity: '0.3' },
					'50%': { opacity: '0.6' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'breathe': 'breathe var(--breath-duration, 4s) ease-in-out infinite',
				'crisis-pulse': 'crisis-pulse 2s ease-in-out infinite',
				'loading-dots': 'loading-dots 1.4s ease-in-out infinite both',
				'float': 'float 20s ease-in-out infinite',
				'wave': 'wave 15s linear infinite',
				'pulse-bg': 'pulse-bg 3s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
