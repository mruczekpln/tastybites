import Link from "next/link";
import { type ComponentProps } from "react";
import cn from "./cn";

function Logo() {
  return <p className="font-title text-3xl font-extrabold">TastyBites</p>;
}

type NavLinkProps = {
  variant?: "normal" | "border";
} & ComponentProps<"a">;

function NavLink(props: NavLinkProps) {
  const variant = props.variant ?? "normal";
  const href = props.href ?? "/";

  if (variant === "normal")
    return (
      <Link
        href={href}
        className={cn("text-xl hover:underline", props.className)}
      >
        {props.children}
      </Link>
    );
  else
    return (
      <Link
        className={cn(
          "border-2 px-4 py-2 text-xl duration-300 hover:bg-gray-200",
          props.className,
        )}
        href={href}
      >
        Add your recipe.
      </Link>
    );
}

export default function Navbar() {
  return (
    <div className="absolute w-full border-b-2">
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
            className="relative bottom-0 border-0 bg-yellow-500 px-4 py-2 duration-200 hover:bottom-1 hover:bg-yellow-500 hover:shadow-xl hover:shadow-yellow-500/20"
          >
            Sign in / up.
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
