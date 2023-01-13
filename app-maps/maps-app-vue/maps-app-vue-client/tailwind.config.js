/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  jit: true,
  theme: {
    extend: {
      backgroundImage: {
        mapsBack: 'url(../assent/wallpaper/wallpaper_map1.svg)'
      }
    },
  },
  plugins: [],
}
