import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withUt } from "uploadthing/tw";

export default withUt({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        title: ["var(--font-title)"],
      },
      boxShadow: {
        button: "-2px 2px #000",
      },
      maxWidth: {
        "screen-2xl": "1440px",
        "screen-3xl": "1600px",
      },
    },
  },
  plugins: [],
}) satisfies Config;
