import { type ComponentProps } from "react";
import cn from "./cn";

type InputProps = { border?: boolean } & ComponentProps<"input">;
export default function Input({ border = true, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        border && "rounded-md border-2 border-black shadow-button outline-none",
        props.className,
      )}
    >
      {props.children}
    </input>
  );
}
