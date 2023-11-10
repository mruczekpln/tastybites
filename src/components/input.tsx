import { type ComponentProps } from "react";
import cn from "./cn";

type InputProps = ComponentProps<"input">;
export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "rounded-md border-2 border-black shadow-button outline-none",
        props.className,
      )}
    ></input>
  );
}
