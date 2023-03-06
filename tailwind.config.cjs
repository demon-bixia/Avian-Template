/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  darkMode: "class",

  theme: {
    screens: {
      xs: "0px",
      md: "968px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      spacing: {
        0: "0",
        1: "2px",
        2: "4px",
        3: "8px",
        4: "12px",
        5: "16px",
        6: "24px",
        7: "32px",
        8: "40px",
        9: "48px",
        10: "64px",
        11: "80px",
        12: "96px",
        13: "160px",
      },

      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        display: ["Fredoka"],
      },

      borderRadius: {
        none: "0",
        sm: "8px",
        DEFAULT: "12px",
        lg: "20px",
        full: "9999px",
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
        "shadow-sm": "0px 1px 3px 0px rgba(5,5,5,0.10)",
        shadow:
          "rgb(145 158 171 / 20%) 0px 1px 3px 0px , rgb(145 158 171 / 12%) 0px 1px 2px -4px",
        "shadow-md":
          "0px 3px 4px 0px rgba(3,3,3,0.1), 0px 2px 4px 0px rgba(3,3,3,0.1)",
        "shadow-lg":
          "0px 10px 20px 0px rgba(3,3,3,0.1), 0px 3px 6px 0px rgba(3,3,3,0.1)",
        "shadow-xl":
          "0px 15px 25px 0px rgba(3,3,3,0.1), 0px 5px 10px 0px rgba(3,3,3,0.1)",
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
        cxl: "0 2px 5px rgba(193, 202, 255, 0.5), 2px 0 5px rgba(193, 202, 255, 0.5), -2px 0 5px rgba(193, 202, 255, 0.5), 0 -2px 5px rgba(193, 202, 255, 0.5)",
      },
    },
  },

  plugins: [],
};
