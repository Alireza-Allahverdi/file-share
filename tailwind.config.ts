import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        "orange-500": "#ED9B28"
      },
      backgroundColor: {
        "orange-500" : "#ED9B28"
      }
    },
  },
  plugins: [],
};
export default config;
