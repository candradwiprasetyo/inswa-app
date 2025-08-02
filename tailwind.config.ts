import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "plus-jakarta-sans": ["var(--font-plus-jakarta-sans)", "sans-serif"],
        "pathway-extreme": ["var(--font-pathway-extreme)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        action: "#4b8631",
        "action-hover": "#6abd45",
        secondary: {
          light: "#d3d8e5",
          "light-hover": "#9bd382",
        },
        primary: {
          light: "#d3d8e5",
          "light-border": "#e4e8f0",
        },
        "surface-secondary-light": "#f5f7fa",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 30s linear infinite",
      },
      backgroundImage: {
        "button-default":
          "linear-gradient(90deg, rgba(155, 211, 130, 0.8) 0%, rgba(106, 189, 69, 0.8) 100%)",
        "button-default-hover":
          "linear-gradient(90deg, #9BD382 0%, #6ABD45 100%)",
      },
    },
  },
  plugins: [],
  safelist: [
    "from-yellow-500",
    "from-green-500",
    "from-purple-500",
    "from-blue-100",
    "from-blue-500",
    "from-red-500",
    "from-neutral-300",
  ],
} satisfies Config;
