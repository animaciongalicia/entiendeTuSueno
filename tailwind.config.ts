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
        cosmos: {
          bg: "#09090f",
          surface: "#12121e",
          card: "#1a1a2e",
          border: "#2a2a4a",
          accent: "#7c6af7",
          "accent-hover": "#9580ff",
          "accent-soft": "#4a3f8a",
          text: "#e8e6f0",
          muted: "#8b87a0",
          "muted-dark": "#4a4760",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      typography: {
        cosmos: {
          css: {
            color: "#e8e6f0",
            "h1, h2, h3, h4": { color: "#e8e6f0" },
            a: { color: "#7c6af7" },
            strong: { color: "#e8e6f0" },
            blockquote: { color: "#8b87a0", borderColor: "#7c6af7" },
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
