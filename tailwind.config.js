/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      animation: {
        loading_open_anim: "loading_open_anim 0.2s 1 linear"
      },
      keyframes: {
        loading_open_anim: {
          "0%": {
            transform: "translateY(-100%) translateX(-50%)"
          },
          "100%": {
            transform: "translateY(0) translateX(-50%)"
          }
        }
      }
    },
  },
  plugins: [],
}

