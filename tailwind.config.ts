import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#1a56db",
          700: "#1e429f",
          800: "#1e3a8a",
          900: "#003fb1",
        },
        success: {
          50: "#f3faf7",
          500: "#0e9f6e",
          600: "#057a55",
          700: "#046c4e",
        },
        warning: {
          50: "#fdf6b2",
          500: "#e3a008",
          600: "#c27803",
        },
        danger: {
          50: "#fde8e8",
          500: "#f05252",
          600: "#e02424",
        }
      },
    },
  },
  plugins: [],
};
export default config;
