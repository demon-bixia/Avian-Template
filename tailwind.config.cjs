/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  darkMode: "class",

  theme: {
    screens: {
      xs: "0rem",
      md: "60.5rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
    },

    extend: {
      spacing: {
        0: "0",
        1: ".125rem",
        2: ".25rem",
        3: ".5rem",
        4: ".75rem",
        5: "1rem",
        6: "1.5rem",
        7: "2rem",
        8: "2.5rem",
        9: "3rem",
        10: "4rem",
        11: "5rem",
        12: "6rem",
        13: "10rem",
      },

      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        display: ["Fredoka"],
      },

      borderRadius: {
        none: "0",
        sm: ".5rem",
        DEFAULT: ".75rem",
        lg: "1.25rem",
        full: "624.9375rem",
      },

      opacity: {
        0: "0",
        20: "0.20",
        40: "0.40",
        60: "0.63",
        80: "0.80",
        100: "1",
      },

      boxShadow: {
        "shadow-sm": "0rem .0625rem .1875rem 0rem rgba(5,5,5,0.10)",
        shadow:
          "rgb(145 158 171 / 20%) 0rem .0625rem .1875rem 0rem , rgb(145 158 171 / 12%) 0rem .0625rem .125rem -0.25rem",
        "shadow-md":
          "0rem .1875rem .25rem 0rem rgba(3,3,3,0.1), 0rem .125rem .25rem 0rem rgba(3,3,3,0.1)",
        "shadow-lg":
          "0rem .625rem 1.25rem 0rem rgba(3,3,3,0.1), 0rem .1875rem .375rem 0rem rgba(3,3,3,0.1)",
        "shadow-xl":
          "0rem .9375rem 1.5625rem 0rem rgba(3,3,3,0.1), 0rem .3125rem .625rem 0rem rgba(3,3,3,0.1)",
      },

      keyframes: {
        gradient: {
          "0%": {
            "background-position": "0% 0%",
          },

          "50%": {
            "background-position": "0% 100%",
          },

          "100%": {
            "background-position": "0% 0%",
          },
        },
      },

      animation: {
        gradient: "gradient 15s ease infinite",
      },

      opacity: {
        30: "0.30",
        50: "0.54",
        70: "0.70",
        90: "0.90",
      },

      boxShadow: {
        cxl: "0 .125rem .3125rem rgba(193, 202, 255, 0.5), .125rem 0 .3125rem rgba(193, 202, 255, 0.5), -0.125rem 0 .3125rem rgba(193, 202, 255, 0.5), 0 -0.125rem .3125rem rgba(193, 202, 255, 0.5)",
      },
    },
  },

  plugins: [],
};
