import { type ComponentProps } from "react";
import cn from "../cn";
import { type Path, type UseFormRegister } from "react-hook-form";
import { type FormSchema } from "../recipes/create/form";

type InputProps =
  | {
      kind?: "regular";
      border?: boolean;
    }
  | {
      kind: "rhf";
      border?: boolean;
      label: Path<FormSchema>;
      register: UseFormRegister<FormSchema>;
    };
// ComponentProps<"input">;
export default function Input({
  border = true,
  ...props
}: InputProps & ComponentProps<"input">) {
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
