import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14233D",
        inkSoft: "#3B4A63",
        gold: "#C89B3C",
        goldDeep: "#9C7526",
        green: "#1F5C4A",
        stamp: "#A23B2E",
        paper: "#EDEFE9",
        paper2: "#E2E5DC",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-plex)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
