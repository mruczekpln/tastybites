"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Beef, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NavbarRecipes() {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className="text-xl hover:underline">
        Recipes.
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="absolute left-0 top-0 z-0 bg-white">
        <div className="grid w-[500px] grid-cols-3 gap-x-4 rounded-b-lg border-2 border-t-0 border-black p-4 shadow-md">
          <div className="row-span-2 flex items-center justify-center rounded-md border-2 bg-gray-200">
            <Image
              src="/featured/symbol2.svg"
              alt="symbol2"
              width={64}
              height={64}
            ></Image>
          </div>{" "}
          <NavigationMenu.Link
            asChild
            className="col-span-2 cursor-pointer rounded-md p-4 duration-100 hover:bg-yellow-100"
          >
            <Link href="/recipes/category/all?sortBy=likes">
              <h2 className="whitespace-nowrap text-2xl font-bold ">
                <Beef size={18} className="mb-1 mr-2 inline"></Beef>
                Top recipes
              </h2>{" "}
              <p className="text-lg font-normal">
                See recent most liked recipes!
              </p>{" "}
            </Link>
          </NavigationMenu.Link>{" "}
          <NavigationMenu.Link
            asChild
            className="col-span-2 cursor-pointer rounded-md p-4 duration-200 hover:bg-yellow-100"
          >
            <Link href="/recipes/category/all?sortBy=latest">
              <h2 className="whitespace-nowrap text-2xl font-bold ">
                <Clock size={18} className="mb-1 mr-2 inline"></Clock>
                Latest recipes
              </h2>
              <p className="text-lg font-normal">
                See the latest culinary news!
              </p>
            </Link>
          </NavigationMenu.Link>
          <hr className="col-span-3 my-4" />
          <div className="col-span-3 flex h-16 gap-4">
            <NavigationMenu.Link
              asChild
              href="/recipes/category/breakfast"
              className="flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-yellow-500 p-3 duration-100 hover:bg-yellow-200"
            >
              <Image
                src="/recipes/breakfast.png"
                alt="breakfast"
                width={500}
                height={500}
                className="object-contain"
              ></Image>
            </NavigationMenu.Link>
            <NavigationMenu.Link
              asChild
              href="/recipes/category/lunch"
              className="flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-yellow-500 p-4 duration-100 hover:bg-yellow-200"
            >
              <Image
                src="/recipes/lunch.png"
                alt="lunch"
                width={500}
                height={500}
                className="object-contain"
              ></Image>
            </NavigationMenu.Link>
            <NavigationMenu.Link
              asChild
              href="/recipes/category/dinner"
              className="flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-yellow-500 p-3 duration-100 hover:bg-yellow-200"
            >
              <Image
                src="/recipes/dinner.png"
                alt="dinner"
                width={500}
                height={500}
                className="object-contain"
              ></Image>
            </NavigationMenu.Link>
          </div>
          <NavigationMenu.Link
            href="/recipes"
            className="col-span-3 mt-2 font-bold hover:underline"
          >
            See all categories
          </NavigationMenu.Link>
        </div>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
