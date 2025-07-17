/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'church-blue': '#2563eb',
        'church-slate': '#64748b',
      },
    },
  },
  plugins: [],
}
