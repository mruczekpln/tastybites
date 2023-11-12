import { type ReactNode } from "react";
import cn from "./cn";

type CheckboxProps = { name: string; children: ReactNode; className?: string };
export default function Checkbox({ name, children, className }: CheckboxProps) {
  return (
    <label htmlFor={name} className="flex w-min gap-4 text-xl">
      <input type="checkbox" name={name} id={name} className="peer hidden" />
      <span
        className={cn(
          "whitespace-nowrap peer-checked:font-bold peer-hover:underline peer-checked:[&>*]:fill-black",
          className,
        )}
      >
        {children}
      </span>
    </label>
  );
}
