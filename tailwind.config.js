/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Constance Souville Vintage / Editorial Palette
        paper: {
          DEFAULT: "#f6f1ea",
          light: "#fcf9f5",
          dark: "#ebe4da",
        },
        darkwrap: {
          DEFAULT: "#1c1a17",
          card: "#262320",
          elevated: "#2d2a26",
        },
        cassette: {
          red: "#e84a3b",
          yellow: "#e5b026",
          blue: "#3b60e4",
          cream: "#ffffff",
          dark: "#1c1a17",
        },
        ink: {
          DEFAULT: "#1e1c19",
          muted: "#78716c",
          light: "#a8a29e",
        },
        hairline: {
          DEFAULT: "rgba(30, 28, 25, 0.12)",
          dark: "rgba(30, 28, 25, 0.25)",
          light: "rgba(255, 255, 255, 0.12)",
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        "editorial-xl": ["clamp(3.5rem, 8.5vw, 8.5rem)", { lineHeight: "0.88", letterSpacing: "-0.03em" }],
        "editorial-lg": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "editorial-md": ["clamp(1.8rem, 4vw, 3.2rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        card: "24px",
        "card-lg": "32px",
      },
      boxShadow: {
        cassette: "0 10px 30px -10px rgba(0, 0, 0, 0.06)",
        "cassette-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.12)",
      },
      animation: {
        "marquee-infinite": "marquee 8s linear infinite",
        "marquee-reverse": "marqueeReverse 8s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};