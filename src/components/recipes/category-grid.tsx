import Image from "next/image";
import Link from "next/link";
import { categories } from "~/lib/categories";

export default function CategoryGrid() {
  return (
    <main className="max-w-screen-xl grid h-full w-full grid-cols-3 grid-rows-2 gap-8 pb-16">
      {Object.values(categories)
        .slice(1)
        .map((item, index) => (
          <Link
            className="flex cursor-pointer flex-col items-center justify-between gap-2 rounded-lg border-2 border-black bg-yellow-100 p-8 text-center shadow-button hover:translate-x-[2px] hover:translate-y-[-2px]"
            href={item.href}
            key={index}
          >
            <h2 className="text-3xl font-bold">{item.name}</h2>
            {item.name !== "drinks." ? (
              <Image
                src={item.href + ".png"}
                alt={item.titleText}
                width={item.imageSize ?? 80}
                height={100}
                // className="object-fill"h
              ></Image>
            ) : (
              "couldn't find drink symbol :("
            )}
            <p>{item.subtitleText}</p>
          </Link>
        ))}
    </main>
  );
}
