import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D3748', // Dark Gray for the sidebar and text
        secondary: '#EDF2F7', // Light Gray for background
        accent: '#38B2AC', // Teal for buttons and highlights
      },
    },
  },
  plugins: [],
};
export default config;
