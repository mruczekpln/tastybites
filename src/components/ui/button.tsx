import { type ComponentProps } from "react";
import cn from "../cn";

type ButtonProps = {
  variant?: "normal" | "ghost";
} & ComponentProps<"button">;

export default function Button({
  // more variants to be added
  variant = "normal",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const normalStyling = "border-2 border-black  hover:shadow-button";
  const ghostStyling = "hover:bg-gray-200";

  const buttonStyling = variant === "normal" ? normalStyling : ghostStyling;
  return (
    <button
      className={cn(
        "whitespace-nowrap rounded-md px-4 py-2 text-lg duration-300 hover:translate-x-[2px] hover:translate-y-[-2px] disabled:opacity-70",
        buttonStyling,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
