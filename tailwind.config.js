/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        // ============================================
        // APPLE-INSPIRED PREMIUM PALETTE
        // ============================================
        
        // Light Mode
        light: {
          background: '#FBFBFD',     // Apple Background
          surface: '#F5F5F7',        // Apple Surface
          card: '#FFFFFF',
          
          text: {
            primary: '#1D1D1F',      // Apple Text Primary
            secondary: '#424245',    // Apple Text Secondary
            muted: '#86868B',        // Apple Text Muted
            disabled: '#A1A1AA',
          },
          
          border: {
            DEFAULT: '#D2D2D7',
            subtle: '#E8E8ED',
          },
          
          accent: {
            primary: '#06C167',      // Refined Emerald
            hover: '#05A658',
            light: '#F2FFF9',
            subtle: '#D1FAE5',
          },
        },
        
        // Dark Mode
        dark: {
          background: '#000000',     // Pure Black
          surface: '#1D1D1F',        // Dark Surface
          card: '#1C1C1E',           // Dark Card
          
          text: {
            primary: '#F5F5F7',
            secondary: '#A1A1AA',
            muted: '#86868B',
            disabled: '#424245',
          },
          
          border: {
            DEFAULT: '#323232',
            subtle: '#262626',
          },
          
          accent: {
            primary: '#10B981',
            hover: '#34D399',
            dark: '#064E3B',
            subtle: '#065F46',
          },
        },
        
        // Keeping zinc and indigo for some secondary uses if needed
        zinc: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          'Consolas',
          'Monaco',
          '"Courier New"',
          'monospace',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [],
}
