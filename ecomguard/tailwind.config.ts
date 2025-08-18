import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      colors: {
        brand: {
          DEFAULT: "#5F6AF6",
          50: "#EEF0FF",
          100: "#DCE0FF",
          200: "#B9BEFF",
          300: "#969CFF",
          400: "#737AF8",
          500: "#5F6AF6",
          600: "#4650C6",
          700: "#32399A",
          800: "#22286C",
          900: "#151A48",
        },
      },
      boxShadow: {
        soft: "0 6px 24px rgba(0,0,0,0.08)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;

