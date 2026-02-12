/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ============================================
        // SEMANTIC COLOR SYSTEM
        // Light/Dark modes managed via CSS variables
        // ============================================
        
        // Light Mode Palette
        light: {
          background: '#FAFAFA',     // Zinc-50 cálido - base general
          surface: '#F4F4F5',        // Zinc-100 - secciones elevadas
          card: '#FFFFFF',           // Blanco puro - tarjetas con elevación máxima
          
          text: {
            primary: '#18181B',      // Zinc-900 - encabezados, énfasis
            secondary: '#3F3F46',    // Zinc-700 - cuerpo de texto
            muted: '#71717A',        // Zinc-500 - texto auxiliar
            disabled: '#A1A1AA',     // Zinc-400 - estados deshabilitados
          },
          
          border: {
            DEFAULT: '#E4E4E7',      // Zinc-200 - bordes visibles
            subtle: '#F4F4F5',       // Zinc-100 - separadores sutiles
          },
          
          accent: {
            primary: '#059669',      // Emerald-600 - botones, enlaces
            hover: '#047857',        // Emerald-700 - hover states
            light: '#ECFDF5',        // Emerald-50 - fondos de acento
            subtle: '#A7F3D0',       // Emerald-200 - badges, highlights
          },
        },
        
        // Dark Mode Palette
        dark: {
          background: '#09090B',     // Zinc-950 - base general
          surface: '#18181B',        // Zinc-900 - secciones elevadas
          card: '#27272A',           // Zinc-800 - tarjetas con elevación máxima
          
          text: {
            primary: '#FAFAFA',      // Zinc-50 - encabezados, énfasis
            secondary: '#D4D4D8',    // Zinc-300 - cuerpo de texto
            muted: '#A1A1AA',        // Zinc-400 - texto auxiliar
            disabled: '#71717A',     // Zinc-500 - estados deshabilitados
          },
          
          border: {
            DEFAULT: '#3F3F46',      // Zinc-700 - bordes visibles
            subtle: '#27272A',       // Zinc-800 - separadores sutiles
          },
          
          accent: {
            primary: '#10B981',      // Emerald-500 - botones, enlaces
            hover: '#34D399',        // Emerald-400 - hover states
            dark: '#064E3B',         // Emerald-900 - fondos de acento
            subtle: '#065F46',       // Emerald-800 - badges, highlights
          },
        },
        
        // ============================================
        // ZINC SCALE COMPLETA (para uso directo)
        // ============================================
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
        
        // ============================================
        // INDIGO SCALE COMPLETA (acento principal)
        // ============================================
        indigo: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
        
        // ============================================
        // COLORES SECUNDARIOS POR CATEGORÍA
        // Para diferenciación visual de proyectos/áreas
        // ============================================
        accent: {
          // APIs & Backend (Verde)
          api: {
            light: '#10B981',      // Emerald-500
            dark: '#34D399',       // Emerald-400
            bg: '#ECFDF5',         // Emerald-50
            'dark-bg': '#064E3B',  // Emerald-900
          },
          // Data & Databases (Azul)
          data: {
            light: '#3B82F6',      // Blue-500
            dark: '#60A5FA',       // Blue-400
            bg: '#EFF6FF',         // Blue-50
            'dark-bg': '#1E3A8A',  // Blue-900
          },
          // Performance (Ámbar/Amarillo)
          perf: {
            light: '#F59E0B',      // Amber-500
            dark: '#FBBF24',       // Amber-400
            bg: '#FFFBEB',         // Amber-50
            'dark-bg': '#78350F',  // Amber-900
          },
          // Cloud & DevOps (Púrpura)
          cloud: {
            light: '#8B5CF6',      // Violet-500
            dark: '#A78BFA',       // Violet-400
            bg: '#F5F3FF',         // Violet-50
            'dark-bg': '#4C1D95',  // Violet-900
          },
        },
        
        // ============================================
        // LEGACY SUPPORT (mantener compatibilidad)
        // Deprecar gradualmente en favor del sistema semántico
        // ============================================
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',   // Cambiado de purple a indigo
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
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
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'brutal': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        
        // Nuevas sombras adaptadas al sistema
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        'card-dark-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'bounce-subtle': 'bounceSubtle 0.3s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
