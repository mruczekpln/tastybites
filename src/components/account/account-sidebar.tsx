"use client";

import {
  Bookmark,
  ChevronRight,
  GanttChart,
  Library,
  LogOut,
  Settings,
  Shell,
  type LucideIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useState,
  type ComponentProps,
  type Dispatch,
  type SetStateAction,
} from "react";

type SidebarLinkProps = {
  pathname: string;
  icon: LucideIcon;
  text: string;
  isRedirectingTo: boolean;
  setRedirectingTo: Dispatch<SetStateAction<RedirectingTo>>;
} & ComponentProps<"a">;
function SidebarLink({
  pathname,
  icon: Icon,
  href = "",
  text,
  isRedirectingTo,
  setRedirectingTo,
}: SidebarLinkProps) {
  return (
    <Link
      prefetch={false}
      href={href}
      className={`flex items-center gap-4 rounded-lg p-4 text-gray-100/50 duration-300 ${
        pathname === href && "bg-yellow-950/30"
      } hover:bg-yellow-950/50`}
      onClick={() =>
        setRedirectingTo(
          href === pathname ? null : (href.split("/")[2] as RedirectingTo),
        )
      }
    >
      {isRedirectingTo ? (
        <Shell className="animate-spin stroke-yellow-700" size={32}></Shell>
      ) : (
        <>
          <Icon
            size={32}
            className={`stroke-yellow-700 ${
              pathname !== href && "stroke-gray-100/50"
            }`}
          ></Icon>
        </>
      )}

      <p className={`text-xl ${pathname === href && "text-yellow-50"}`}>
        {text}
      </p>
    </Link>
  );
}

type RedirectingTo = "overview" | "recipes" | "favorites" | "settings" | null;

export default function AccountSidebar() {
  const pathname = usePathname();

  const [redirectingTo, setRedirectingTo] = useState<RedirectingTo>(null);

  useEffect(() => {
    if (pathname.split("/")[2] === redirectingTo) setRedirectingTo(null);
  }, [pathname, redirectingTo]);

  return (
    <aside className="flex w-auto shrink-0 flex-col gap-4 whitespace-nowrap bg-black/90 p-8 text-gray-100">
      <div className="mb-2 flex w-full max-w-screen-2xl items-center gap-2">
        <Link
          prefetch={false}
          href="/"
          className="font-title text-2xl hover:underline"
        >
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
        isRedirectingTo={redirectingTo === "overview"}
        setRedirectingTo={setRedirectingTo}
      ></SidebarLink>
      {/* <hr /> */}
      <p className="ml-8 font-bold text-gray-100/50">Recipes</p>
      <SidebarLink
        pathname={pathname}
        href="/account/recipes"
        icon={Library}
        text="Your Recipes"
        isRedirectingTo={redirectingTo === "recipes"}
        setRedirectingTo={setRedirectingTo}
      ></SidebarLink>
      <SidebarLink
        pathname={pathname}
        href="/account/favorites"
        icon={Bookmark}
        text="Favorites"
        isRedirectingTo={redirectingTo === "favorites"}
        setRedirectingTo={setRedirectingTo}
      ></SidebarLink>
      {/* <hr /> */}
      <p className="ml-8 font-bold text-gray-100/50">Other</p>
      <SidebarLink
        pathname={pathname}
        href="/account/settings"
        icon={Settings}
        text="Settings"
        isRedirectingTo={redirectingTo === "settings"}
        setRedirectingTo={setRedirectingTo}
      ></SidebarLink>
      {/* <hr /> */}
      <p className="ml-8 font-bold text-gray-100/50">Manage</p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-4 rounded-lg p-4 text-gray-100/50 duration-300 hover:bg-yellow-950/50"
      >
        <LogOut size={32} className="stroke-yellow-700"></LogOut>
        <p className={'text-yellow-50"} text-xl'}>Log Out</p>
      </button>
    </aside>
  );
}
