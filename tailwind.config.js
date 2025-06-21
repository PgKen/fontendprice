/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ระบุไฟล์ใน src ที่จะใช้ Tailwind
    "./public/index.html"
  ],
  theme: {
    extend: {
       fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      fontWeight: {
        // extralight: '200',
        // light: '300',
        normal: '400',
      }
    },
  },
  plugins: [],
}