import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
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
      keyframes: {
        scaleIn: {
          from: { transform: "translateY(-420px)" },
          to: { transform: "translateY(0)" },
        },
        scaleOut: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-420px)" },
        },
      },
    },
    animation: {
      scaleIn: "scaleIn 500ms ease",
      scaleOut: "scaleOut 500ms ease",
    },
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      });
    }),
  ],
}) satisfies Config;
