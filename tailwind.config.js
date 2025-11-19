import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 10px 30px hsla(222, 63%, 15%, 0.1)",
        "soft-lg": "0 25px 65px hsla(222, 63%, 15%, 0.12)",
        glow: "0 0 50px hsla(222, 74%, 55%, 0.35)",
      },
      backgroundImage: {
        "mesh-gradient":
          "linear-gradient(135deg, hsla(222, 90%, 65%, 0.15), hsla(199, 89%, 55%, 0.25))",
        "noise-overlay":
          "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(8,11,30,0.15))",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      transitionTimingFunction: {
        sail: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0px) scale(1)" },
        },
        "pulse-soft": {
          "0%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
          "100%": { opacity: "0.4" },
        },
        "float-slow": {
          "0%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-4px,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s var(--ease-sail) forwards",
        "pulse-soft": "pulse-soft 2.2s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

