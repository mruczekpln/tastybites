import { type ComponentProps } from "react";
import cn from "../cn";
import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

type InputProps<T extends FieldValues> =
  | {
      kind?: "regular";
      border?: boolean;
    }
  | {
      kind: "rhf";
      border?: boolean;
      label: Path<T>;
      register: UseFormRegister<T>;
    };
// ComponentProps<"input">;
export default function Input<Schema extends FieldValues>({
  border = true,
  ...props
}: InputProps<Schema> & ComponentProps<"input">) {
  const kind = props.kind ?? "regular";

  if (props.kind === "rhf") {
    const { register, label, ...rProps } = props;

    return (
      <input
        {...rProps}
        {...register(label)}
        className={cn(
          border &&
            "rounded-md border-2 border-black pl-4 shadow-button outline-none",
          props.className,
        )}
      >
        {props.children}
      </input>
    );
  } else if (kind === "regular") {
    return (
      <input
        {...props}
        className={cn(
          border &&
            "rounded-md border-2 border-black pl-4 shadow-button outline-none",
          props.className,
        )}
      >
        {props.children}
      </input>
    );
  }
}
