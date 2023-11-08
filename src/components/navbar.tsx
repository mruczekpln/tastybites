import Link from "next/link";
import { type ComponentProps } from "react";
import cn from "./cn";
import Button from "./button";

function Logo() {
  return <p className="font-title text-3xl font-extrabold">TastyBites</p>;
}

type NavLinkProps = {
  variant?: "normal" | "border";
} & ComponentProps<"a"> &
  ComponentProps<"button">;

function NavLink({
  variant = "normal",
  href = "",
  className,
  children,
  ...props
}: NavLinkProps) {
  if (variant === "normal")
    return (
      <Link
        href={href}
        className={cn("text-xl font-bold hover:underline", className)}
      >
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

export default function Navbar() {
  return (
    <div className="absolute w-full border-b-2 border-black">
      <nav className="mx-auto flex h-20 w-full max-w-screen-xl items-center justify-between">
        <Logo></Logo>

        <div className="flex items-center gap-8">
          <NavLink href="/">Home.</NavLink>
          <NavLink href="/recipes">Recipes.</NavLink>
          <NavLink
            variant="border"
            className="border-2 px-4 py-2"
            href="/recipes/create"
          >
            Add your recipe.
          </NavLink>
          <div className="h-2 w-2 rounded-full bg-black/50"></div>
          <NavLink
            variant="border"
            href="/auth/login"
            className="rounded-md bg-yellow-500"
          >
            Sign in / up.
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
