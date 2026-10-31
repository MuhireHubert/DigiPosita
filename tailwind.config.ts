import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10254B",
        inkSoft: "#52627A",
        brandBlue: "#003DA5",
        brandYellow: "#FFB600",
        gold: "#FFB600",
        goldDeep: "#755300",
        green: "#003DA5",
        stamp: "#A23B2E",
        paper: "#F6F8FC",
        paper2: "#EAF0FA",
      },
      fontFamily: {
        display: ["system-ui", "sans-serif"],
        body: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
