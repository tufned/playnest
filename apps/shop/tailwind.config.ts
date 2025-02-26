import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EBEBE7",
        primaryDimmed: "rgba(202,204,205,0.7)",
        secondary: "#FDFDFD",
        secondaryBorder: "#dfdee3",
        dark: "#2D355E",
        alert: "#D45058",
        alertDimmed: "rgba(193,77,84,0.7)"
      }
    }
  },
  plugins: []
} satisfies Config;
