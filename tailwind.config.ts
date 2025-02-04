import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bgTrans: "rgba(0, 0, 0, 0.564)",
      },
      gridTemplateColumns: {
        cardGrid: "repeat(auto-fill, minmax(300px, 1fr))",
        InfoGrid: "repeat(auto-fill, minmax(200px, 1fr))",
        mediaGrid: "repeat(auto-fill, minmax(250px, 1fr))",
      },
      fontFamily: {
        'media-sans' : ['var(--font-media-sans)'],
        'Helevetica' : ['var(--font-helevetica)'],
      },
      screens: {
        pc: { max: "906px" },
        tablet: { max: "768px" },
        mobileTab: { max: "620px" },
        mobile: { max: "450px" },
        phone: { max: "375px" },
        radio: { max: "320px" },
        mobileSm: "450px" ,
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontSize: {
        reponsiveText: "clamp(12px,2vw,14px)",
        reponsiveText2: "clamp(17px,2vw,24px)",
        reponsiveText3: "clamp(13px,2vw,16px)",
      },

    },
  },
  plugins: [],
} satisfies Config;
