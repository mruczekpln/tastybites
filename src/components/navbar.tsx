import Link from "next/link";
import { useEffect, useState, type ComponentProps } from "react";
import cn from "./cn";
import Button from "./button";
import Image from "next/image";
import { sign } from "crypto";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/navbar-logo.svg"
        alt="hero/photo"
        width={48}
        height={48}
        className="inline"
      ></Image>
      <p className="font-title text-4xl font-bold leading-none">TastyBites</p>
    </div>
  );
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

export default function Navbar() {
  return (
    <div className="absolute z-10 w-full border-b-2 border-black bg-white">
      <nav className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between font-bold">
        <Logo></Logo>

        <div className="flex items-center gap-8">
          <NavLink href="/">Home.</NavLink>
          <NavLink href="/recipes">Recipes.</NavLink>
          <NavLink
            variant="border"
            className=" border-2 px-4 py-2"
            href="/recipes/create"
          >
            Add your recipe
          </NavLink>
          <div className="h-2 w-2 rounded-full bg-black"></div>
          <NavLink
            variant="border"
            href="/auth/login"
            className="bg-yellow-500"
          >
            Sign in / up
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
