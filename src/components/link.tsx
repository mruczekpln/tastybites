import Link from "next/link";
import { type ComponentProps } from "react";
import cn from "./cn";
import Button from "./ui/button";

type NavLinkProps = {
  variant?: "normal" | "button" | "ghost";
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
        <Button
          name="link"
          variant={variant === "ghost" ? variant : "normal"}
          className={className}
        >
          {children}
        </Button>
      </Link>
    );
}
