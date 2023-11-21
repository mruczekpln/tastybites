import { Heart, Clock, Star } from "lucide-react";
import Image from "next/image";

export default function RecipeCard() {
  return (
    <div className="flex h-48 cursor-pointer overflow-hidden rounded-lg border-2 border-black bg-white duration-300 hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-button">
      <div className="flex h-full w-1/2 flex-col justify-between border-r-2 border-black p-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl leading-none">Recipe name</h2>
            <div className="mt-2 flex gap-[2px]">
              <Star className=" fill-yellow-600 stroke-none" size={20}></Star>
              <Star className=" fill-yellow-600 stroke-none" size={20}></Star>
              <Star className=" fill-yellow-600 stroke-none" size={20}></Star>
              <Star className="fill-gray-300 stroke-none" size={20}></Star>
              <Star className="fill-gray-300 stroke-none" size={20}></Star>
              <p className="ml-2 text-sm">3 reviews</p>
            </div>
            {/* <p className="mt-2 w-min rounded-lg bg-cyan-300 p-1 px-2 text-sm font-bold text-yellow-900">
              LUNCH
            </p> */}
          </div>
          <div className="flex items-center gap-2">
            <p>32</p>
            <Heart absoluteStrokeWidth size={32}></Heart>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center">
            <Clock></Clock>
            <p className="ml-3 text-sm">30 min</p>
            <div className="mx-4 h-1 w-1 rounded-full bg-black"></div>
            <p className="font-medium">Easy</p>
          </div>
          <p className="cursor-pointer whitespace-nowrap">
            <b className="pr-2">recipe by:</b>{" "}
            <span className="hover:underline">username 1</span>
          </p>
        </div>
      </div>
      <Image
        src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
        alt="recipe photo"
        className="h-full w-1/2 object-cover"
        width={1000}
        height={666}
      ></Image>
    </div>
  );
}
