import { type ComponentProps } from "react";
import cn from "./cn";

type ButtonProps = {
  variant?: "normal";
} & ComponentProps<"button">;

export default function Button({
  // more variants to be added
  variant = "normal",
  children,
  className = "",
  ...props
}: ButtonProps) {
  if (variant === "normal")
    return (
      <button
        className={cn(
          "first-letter hover:shadow-button border-2 border-black px-4 py-2 text-xl font-bold duration-300 hover:translate-x-[2px] hover:translate-y-[-2px]",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
}
