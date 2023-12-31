import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "~/lib/constants";

export default function CategoryGrid() {
  return (
    <main className="grid h-full w-full max-w-screen-xl grid-cols-3 grid-rows-2 gap-8 pb-16">
      {Object.values(CATEGORIES)
        .slice(1)
        .map((item, index) => (
          <Link
            className="flex cursor-pointer flex-col items-center justify-between gap-2 rounded-lg border-2 border-black bg-yellow-100 p-8 text-center shadow-button hover:translate-x-[2px] hover:translate-y-[-2px]"
            href={item.href}
            key={index}
            prefetch={false}
          >
            <h2 className="text-3xl font-bold">{item.name}</h2>
            {item.imagePath && (
              <Image
                src={item.imagePath}
                alt={item.titleText}
                width={item.imageSize ?? 80}
                height={100}
              ></Image>
            )}
            <p>{item.subtitleText}</p>
          </Link>
        ))}
    </main>
  );
}
