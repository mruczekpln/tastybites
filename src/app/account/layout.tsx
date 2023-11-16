import Link from "next/link";
import { type ReactNode } from "react";
import {
  GanttChart,
  Bookmark,
  Library,
  Settings,
  LogOut,
  UserX,
  User,
} from "lucide-react";

function AccountSidebar() {
  return (
    <aside className="flex h-full w-64 flex-col gap-4">
      <div className="mb-8 flex items-center gap-6">
        <div className="h-16  w-16 rounded-full border-2 border-black"></div>
        <p className="text-2xl font-bold">cytryneq95</p>
      </div>
      <Link
        href="/"
        className="flex items-center gap-4 rounded-lg p-4 duration-300 hover:bg-gray-200"
      >
        <GanttChart className="inline" size={32}></GanttChart>
        <a className="text-xl">Overview</a>
      </Link>
      <Link
        href="/"
        className="flex items-center gap-4 rounded-lg p-4 duration-300 hover:bg-gray-200"
      >
        <User className="inline" size={32}></User>
        <a className="text-xl">Account</a>
      </Link>
      <hr />
      <u className="ml-4 font-bold decoration-yellow-500">Recipes</u>
      <Link
        href="/"
        className="flex items-center gap-4 rounded-lg p-4 duration-300 hover:bg-gray-200"
      >
        <Library className="inline" size={32}></Library>
        <a className="text-xl">Your Recipes</a>
      </Link>
      <Link
        href="/"
        className="flex items-center gap-4 rounded-lg p-4 duration-300 hover:bg-gray-200"
      >
        <Bookmark className="inline" size={32}></Bookmark>
        <a className="text-xl">Favorites</a>
      </Link>
      <hr />
      <Link
        href="/"
        className="flex items-center gap-4 rounded-lg p-4 duration-300 hover:bg-gray-200"
      >
        <Settings className="inline" size={32}></Settings>
        <a className="text-xl">Settings</a>
      </Link>
      <hr />
      <Link
        href="/"
        className="flex items-center gap-4 rounded-lg p-4 duration-300 hover:bg-gray-200"
      >
        <LogOut className="inline" size={32}></LogOut>
        <a className=" text-xl font-bold">Log out</a>
      </Link>
      {/* <Link
        href="/"
        className="flex items-center gap-4 rounded-lg bg-red-400 p-4"
      >
        <UserX className="inline stroke-white" size={32}></UserX>
        <a className="text-xl font-bold text-white">Delete account</a>
      </Link> */}
    </aside>
  );
}

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto h-screen w-full max-w-screen-2xl pb-8 pt-32">
      <AccountSidebar></AccountSidebar>
      {children}
    </div>
  );
}
