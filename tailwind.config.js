/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [ "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        serif: ["Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          2: "rgb(var(--bg2) / <alpha-value>)",
          3: "rgb(var(--bg3) / <alpha-value>)",
          4: "rgb(var(--bg4) / <alpha-value>)",
        },
        fg: {
          DEFAULT: "rgb(var(--fg) / <alpha-value>)",
          2: "rgb(var(--fg2) / <alpha-value>)",
          3: "rgb(var(--fg3) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          2: "rgb(var(--accent2) / <alpha-value>)",
          3: "rgb(var(--accent3) / <alpha-value>)",
        },
        brand: {
          intro: "rgb(77 163 255 / <alpha-value>)",
          core: "rgb(108 99 255 / <alpha-value>)",
          ts: "rgb(245 158 46 / <alpha-value>)",
          eco: "rgb(255 107 107 / <alpha-value>)",
          expert: "rgb(45 212 160 / <alpha-value>)",
        },
      },
      borderColor: {
        DEFAULT: "rgb(var(--border) / <alpha-value>)",
        strong: "rgb(var(--border-strong) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 0 1px rgb(var(--accent) / 0.3), 0 4px 20px -4px rgb(var(--accent) / 0.25)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
        "scale-in": "scale-in 0.18s ease-out",
      },
    },
  },
  plugins: [],
};
