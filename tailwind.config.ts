import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#08090a",
        "bg-elevated": "#0d0e10",
        "bg-hover": "#131417",
        surface: "#111214",
        border: "rgba(255,255,255,0.08)",
        "border-strong": "rgba(255,255,255,0.14)",
        primary: "#edeef0",
        secondary: "#9a9ba1",
        muted: "#63646b",
        accent: "#5e6ad2",
        "accent-soft": "rgba(94,106,210,0.14)",
        "accent-hover": "#7078e0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      maxWidth: {
        content: "1240px",
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
