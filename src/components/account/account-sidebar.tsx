"use client";

import { GanttChart, Library, Bookmark, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountSidebar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <aside className="flex w-64 shrink-0 flex-col gap-4">
      <Link
        href="/account/overview"
        className={`flex items-center gap-4 rounded-lg p-4 duration-300 ${
          pathname === "/account/overview" && "bg-gray-200"
        } hover:bg-gray-200`}
      >
        <GanttChart size={32} className="stroke-yellow-700"></GanttChart>
        <p className="text-xl">Overview</p>
      </Link>
      {/* <Link
        href="/account/me"
        className="flex items-center gap-4 rounded-lg p-4 duration-300 hover:bg-gray-200"
      >
        <User size={32} className="stroke-yellow-700"></User>
        <p className="text-xl">Account</p>
      </Link> */}
      <hr />
      <u className="ml-4 font-bold decoration-yellow-500">Recipes</u>
      <Link
        href="/account/recipes"
        className={`flex items-center gap-4 rounded-lg p-4 duration-300 ${
          pathname === "/account/recipes" && "bg-gray-200"
        } hover:bg-gray-200`}
      >
        <Library size={32} className="stroke-yellow-700"></Library>
        <p className="text-xl">Your Recipes</p>
      </Link>
      <Link
        href="/account/favorites"
        className={`flex items-center gap-4 rounded-lg p-4 duration-300 ${
          pathname === "/account/favorites" && "bg-gray-200"
        } hover:bg-gray-200`}
      >
        <Bookmark size={32} className="stroke-yellow-700"></Bookmark>
        <p className="text-xl">Favorites</p>
      </Link>
      <hr />
      <Link
        href="/account/settings"
        className={`flex items-center gap-4 rounded-lg p-4 duration-300 ${
          pathname === "/account/settings" && "bg-gray-200"
        } hover:bg-gray-200`}
      >
        <Settings size={32} className="stroke-yellow-700"></Settings>
        <p className="text-xl">Settings</p>
      </Link>
      <hr />
      <Link
        href="/auth/log-out"
        className="flex items-center gap-4 rounded-lg p-4 duration-300 hover:bg-gray-200"
      >
        <LogOut size={32} className="stroke-yellow-700"></LogOut>
        <p className=" text-xl font-bold">Log out</p>
      </Link>
      {/* <Link
        href="/"
        className="flex items-center gap-4 rounded-lg bg-red-400 p-4"
      >
        <UserX className="inline stroke-white" size={32} className="stroke-yellow-700"></UserX>
        <a className="text-xl font-bold text-white">Delete account</a>
      </Link> */}
    </aside>
  );
}
