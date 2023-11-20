"use client";

import {
  Bookmark,
  GanttChart,
  Library,
  LogOut,
  Settings,
  type LucideIcon,
  Croissant,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RouteDisplay from "../recipes/path-display";
import { type ComponentProps } from "react";

type SidebarLinkProps = {
  pathname: string;
  icon?: LucideIcon;
  text: string;
} & ComponentProps<"a">;
function SidebarLink({
  pathname,
  icon: Icon,
  href = "",
  text,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 rounded-lg p-4 text-gray-100/50 duration-300 ${
        pathname === href && "bg-yellow-950/30"
      } hover:bg-yellow-950/50`}
    >
      {Icon && (
        <Icon
          size={32}
          className={`stroke-yellow-700 ${
            pathname !== href && "stroke-gray-100/50"
          }`}
        ></Icon>
      )}
      <p className={`text-xl ${pathname === href && "text-yellow-50"}`}>
        {text}
      </p>
    </Link>
  );
}

export default function AccountSidebar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <aside className="flex w-auto shrink-0 flex-col gap-4 whitespace-nowrap bg-black/90 p-8 text-gray-100">
      <div className="mb-2 flex w-full max-w-screen-2xl items-center gap-2">
        <Link href="/" className="font-title text-2xl hover:underline">
          tastybites
        </Link>
        <ChevronRight></ChevronRight>
        <p className="text-lg font-light">account</p>
      </div>
      <SidebarLink
        pathname={pathname}
        href="/account/overview"
        icon={GanttChart}
        text="Overview"
      ></SidebarLink>
      {/* <hr /> */}
      <p className="ml-8 font-bold text-gray-100/50">Recipes</p>
      <SidebarLink
        pathname={pathname}
        href="/account/recipes"
        icon={Library}
        text="Your Recipes"
      ></SidebarLink>
      <SidebarLink
        pathname={pathname}
        href="/account/favorites"
        icon={Bookmark}
        text="Favorites"
      ></SidebarLink>
      {/* <hr /> */}
      <p className="ml-8 font-bold text-gray-100/50">Other</p>
      <SidebarLink
        pathname={pathname}
        href="/account/settings"
        icon={Settings}
        text="Settings"
      ></SidebarLink>
      {/* <hr /> */}
      <p className="ml-8 font-bold text-gray-100/50">Manage</p>
      <SidebarLink
        pathname={pathname}
        href="/auth/log-out"
        icon={LogOut}
        text="Log out"
      ></SidebarLink>
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
