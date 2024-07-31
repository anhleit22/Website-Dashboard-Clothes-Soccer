import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      backgroundPosition: {
        bottom: "bottom",
        'bottom-14': "14% 100%",
        'bottom-1': "-1% 100%"
      },
      colors: {
        primary: "#dc0021",
      darkenprimary: '#a90019',
        light: {
          'bg-icon': 'rgba(115, 220, 233, 0.18)',
          primary: '#1363DF',
          dark: '#0847AA',
          hoverPrimary: '#F5F9FF',
          secondary: '#007eff',
          tertiary: '#0037ff',
          gray: '#fafafa',
          grayDarker: '#e5e5e5',
          sectionSelected: '#E7EFFC',
          text: {
            primary: '#4C4E64',
            sencondary: 'rgba(76, 78, 100, 0.68)',
            main: '#4D92FF',
            placeholder: '#adb5bd',
            lessonContent: '#2D2D2D',
          },
          error: {
            main: '#FF4D49',
            background: '#ffe9e9',
            content: '#e64542',
          },
          warning: {
            main: '#FDB528',
          },
          border: '#ced4da',
        },
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(59, 130, 246)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(59, 130, 246))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        moveUp: {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(-10px)',
          },
        },

        moveReverse: {

          '0%': {
            transform: 'translateY(-10px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
          
        },
        scalsePhoto: {
          '100%': {
            transform: 'scale(1.1)',
          },
        },
        slideIn: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        slideOut: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(150%)",
          },
        }
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        moveUp: 'moveUp 0.3s forwards cubic-bezier(0.4, 0, 0.2, 1)',
        moveReverse: 'moveReverse 0.3s forwards cubic-bezier(0.4, 0, 0.2, 1)',
        scalsePhoto: 'scalsePhoto 0.3s forwards linear',
        slideIn: 'slideIn 0.3s linear',
        slideOut: 'slideOut 0.3s forwards linear'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
