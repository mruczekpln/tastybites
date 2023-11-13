import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function RouteDisplay({ arr }: { arr: string[] }) {
  return (
    <div className="mb-2 flex w-full max-w-screen-2xl items-center gap-2">
      <p className="font-title text-2xl">tastybites</p>
      <ChevronRight></ChevronRight>
      {arr
        .slice(0, -1)
        .filter((item) => item !== "category")
        .map((item, index) => (
          <>
            <Link
              href={"/" + item}
              key={index}
              className="text-lg font-light hover:underline"
            >
              {item}
            </Link>
            <ChevronRight key={index}></ChevronRight>
          </>
        ))}
      <p className="text-lg font-light">{arr[arr.length - 1]}</p>
    </div>
  );
}
