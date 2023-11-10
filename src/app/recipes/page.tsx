import Input from "~/components/input";
import { Clock, Heart, Star } from "lucide-react";
import Image from "next/image";

function RecipeCard() {
  return (
    <div className="flex h-48 overflow-hidden rounded-lg border-2  border-black shadow-button">
      <div className="flex h-full w-1/2 flex-col justify-between border-r-2 border-black p-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl leading-none">Recipe name</h2>
            <p className="mt-3 w-min rounded-lg bg-yellow-500 p-1 px-2 text-sm font-bold text-yellow-900">
              DINNER
            </p>
          </div>
          <Heart></Heart>
        </div>
        <div className="flex items-end">
          <div className="flex items-center">
            <Clock></Clock>
            <p className="ml-3 text-sm">30 min</p>
            <div className="mx-4 h-1 w-1 rounded-full bg-black"></div>
            <Star className="mr-1"></Star>
            <Star className="mr-1"></Star>
            <Star className="mr-1"></Star>
          </div>
          <div className="ml-auto h-10 w-10 rounded-full border-2 border-black"></div>
        </div>
      </div>
      <div className="w-1/2 bg-yellow-100 p-4">
        <Image
          src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
          alt="recipe photo"
          className="h-full w-full rounded-md border-2 border-black object-cover"
          width={1000}
          height={666}
        ></Image>
      </div>
    </div>
  );
}

export default function Recipes() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center pt-32">
      <h1 className="font-title text-5xl font-extrabold">
        Recipes & Cooking Ideas
      </h1>
      <p className="py-4 text-xl">Explore various recipes and kitchen ideas.</p>
      <div className="mb-12 mt-4 flex w-full max-w-screen-2xl gap-12">
        <aside className="w-1/3 rounded-lg bg-gray-100"></aside>
        <section className="my-4 flex w-2/3 flex-col gap-8">
          <Input
            type="text"
            className="flex h-16 w-full items-center bg-yellow-100 pl-8 text-xl duration-300 placeholder:justify-self-center focus:bg-yellow-500 focus:placeholder:font-normal focus:placeholder:text-black"
            placeholder="what are you searching for?"
          />
          <div className="flex w-full items-center justify-center gap-16 px-20 text-xl [&>*]:cursor-pointer">
            {/* <div className="flex gap-8  [&>*]:underline-offset-4 [&>*]:duration-300"> */}
            <p className="hover:underline">breakfast.</p>
            <p className="hover:underline">lunch.</p>
            <p className="hover:underline">dinner.</p>
            <p className="hover:underline">apetizers.</p>
            <p className="hover:underline">desserts.</p>
            <p className="hover:underline">drinks.</p>
            {/* </div> */}
          </div>
          {new Array(10).fill(null).map((_, index) => (
            <RecipeCard key={index}></RecipeCard>
          ))}
        </section>
      </div>
    </div>
  );
}
