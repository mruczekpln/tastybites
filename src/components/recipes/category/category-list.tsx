"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "~/lib/constants";

export default function CategoryList() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-4 text-2xl [&>*]:cursor-pointer">
      {Object.values(CATEGORIES).map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`hover:underline ${pathname === item.href && "font-bold"}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
