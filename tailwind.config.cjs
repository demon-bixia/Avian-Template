/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        'indigo': {
          50: '#F5F6FF',
          100: '#C1CAFF',
          200: '#8E99F3',
          300: '#5C6BC0',
          400: '#294699',
          500: '#002380',
        },
        'gray': {
          100: '#EEEEEE',
          200: '#F8F8F9',
          300: '#C5C5C6',
          400: '#676767',
        },
        'green': {
          100: '#C8E6C9',
          200: '#80E27E',
          300: '#4CAF50',
          400: '#087F23',
          500: '#1B5E20',
        },
        'red': {
          100: '#FFC2AD',
          200: '#FF7961',
          300: '#F44336',
          400: '#BA000D',
          500: '#820000',
        },
        'yellow': {
          100: '#FFFFAD',
          200: '#FFFF72',
          300: '#FFEB3B',
          400: '#B8AA00',
          500: '#807600',
        },
        'blue': {
          100: '#ADDFFF',
          200: '#6EC6FF',
          300: '#2196F3',
          400: '#0069C0',
          500: '#004680',
        },
      },

      spacing: {
        0: '0',
        1: '2px',
        2: '4px',
        3: '8px',
        4: '12px',
        5: '16px',
        6: '24px',
        7: '32px',
        8: '40px',
        9: '48px',
        10: '64px',
        11: '80px',
        12: '96px',
        13: '160px',
      },

      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },

      borderRadius: {
        'none': '0',
        'sm': '8px',
        DEFAULT: '12px',
        'lg': '20px',
        'full': '9999px',
      },

      opacity: {
        '0': '0',
        '20': '0.20',
        '40': '0.40',
        '60': '0.63',
        '80': '0.80',
        '100': '1',
      },

      boxShadow: {
        'shadow-sm': '0px 1px 3px 0px rgba(5,5,5,0.10)',
        'shadow': 'rgb(145 158 171 / 20%) 0px 1px 3px 0px , rgb(145 158 171 / 12%) 0px 1px 2px -4px',
        'shadow-md': '0px 3px 4px 0px rgba(3,3,3,0.1), 0px 2px 4px 0px rgba(3,3,3,0.1)',
        'shadow-lg': '0px 10px 20px 0px rgba(3,3,3,0.1), 0px 3px 6px 0px rgba(3,3,3,0.1)',
        'shadow-xl': '0px 15px 25px 0px rgba(3,3,3,0.1), 0px 5px 10px 0px rgba(3,3,3,0.1)',
      },

      extend: {
        opacity: {
          '30': '0.30',
          '50': '0.54',
          '70': '0.70',
          '90': '0.90',
        },
      }
    },
  },
  plugins: [],
}
