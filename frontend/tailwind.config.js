/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#10b981", // Emerald - more professional than neon
          dark: "#059669",
          light: "#d1fae5",
        },
        accent: {
          blue: "#3b82f6",
          orange: "#f59e0b",
          purple: "#8b5cf6",
        },
        background: {
          light: "#fafafa",
          dark: "#09090b", // Deep zinc
        },
        surface: {
          light: "#ffffff",
          dark: "#18181b",
        },
        neutral: {
          dark: "#0f172a",
          mid: "#475569",
          light: "#94a3b8",
        },
      },
      fontFamily: {
        display: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2.5rem",
      },
      boxShadow: {
        premium: "0 20px 50px -12px rgba(0, 0, 0, 0.08)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        "3d": "0 4px 0 0 rgba(0, 0, 0, 0.05)",
        "3d-active": "0 1px 0 0 rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  plugins: [],
};