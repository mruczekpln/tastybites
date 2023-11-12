"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type CategoryLink = { text: string; href: string };

const categoryLinks: CategoryLink[] = [
  { text: "all.", href: "/recipes" },
  { text: "breakfast.", href: "/recipes/breakfast" },
  { text: "lunch.", href: "/recipes/lunch" },
  { text: "dinner.", href: "/recipes/dinner" },
  { text: "appetizers.", href: "/recipes/appetizers" },
  { text: "desserts.", href: "/recipes/desserts" },
  { text: "drinks.", href: "/recipes/drinks" },
];
export default function Categories() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex items-center justify-center gap-4 text-2xl [&>*]:cursor-pointer">
      {categoryLinks.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`hover:underline ${pathname === item.href && "font-bold"}`}
        >
          {item.text}
        </Link>
      ))}
    </div>
  );
}
