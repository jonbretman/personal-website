import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        serif: ["Amiri", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
