// "use client";

import NavLink from "./link";
import Logo from "./logo";
import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="absolute z-10 w-full border-b-2 border-black bg-white text-black">
      <nav className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between font-bold">
        <Logo></Logo>

        <div className="flex items-center gap-8">
          <NavLink href="/">Home.</NavLink>
          <NavLink href="/recipes">Recipes.</NavLink>
          <NavLink
            variant="button"
            className=" border-2 px-4 py-2"
            href="/recipes/create"
          >
            Add your recipe
          </NavLink>
          <div className="h-2 w-2 rounded-full bg-black"></div>
          {session ? (
            <div className="flex items-center gap-4">
              <p className="text-xl">
                Hi,{" "}
                <Link
                  prefetch={false}
                  className="hover:underline"
                  href="/account/overview"
                >
                  {session.user.name}
                </Link>
              </p>
              <Image
                src={session.user.image! || ""}
                alt="avatar-img"
                width={48}
                height={48}
                className="rounded-full"
              ></Image>
            </div>
          ) : (
            // ) : session.status === "loading" ? (
            //   <div>loading</div>
            <NavLink
              variant="button"
              href="/auth/login"
              className="bg-yellow-500"
            >
              Sign in / up
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}
