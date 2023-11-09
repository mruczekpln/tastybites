import Link from "next/link";
import { type ComponentProps } from "react";
import cn from "./cn";
import Button from "./button";

type NavLinkProps = {
  variant?: "normal" | "border";
} & ComponentProps<"a">;

export default function NavLink({
  variant = "normal",
  href = "",
  className,
  children,
}: NavLinkProps) {
  if (variant === "normal")
    return (
      <Link href={href} className={cn("text-xl hover:underline", className)}>
        {children}
      </Link>
    );
  else
    return (
      <Link href={href}>
        <Button className={className}>{children}</Button>
      </Link>
    );
}
