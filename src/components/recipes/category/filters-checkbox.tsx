import { type ChangeEventHandler, type ReactNode } from "react";
import cn from "~/components/cn";

type CheckboxProps = {
  name: string;
  children: ReactNode;
  className?: string;
  checked: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
export default function FilterCheckbox({
  name,
  children,
  className,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <label htmlFor={name} className="flex w-min gap-4 text-xl">
      <input
        type="checkbox"
        onChange={onChange}
        name={name}
        id={name}
        checked={checked}
        className="peer hidden"
      />
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
