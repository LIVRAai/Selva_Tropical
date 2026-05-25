import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        oliveDeep: "#5A5A3A",
        oliveMid: "#727256",
        mossSoft: "#8A8A6A",
        blushBeige: "#E9DFDA",
        ivoryWarm: "#F5F0EB",
        earthCoffee: "#8A735D",
        macawOrange: "#C96B2C",
        macawBlue: "#2E5D7B"
      },
      boxShadow: {
        boutique: "0 18px 40px -20px rgba(90,90,58,0.35)"
      },
      animation: {
        floatIn: "floatIn .5s ease-out"
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
