import Input from "~/components/input";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Search,
  Star,
} from "lucide-react";
import Image from "next/image";
import { type ReactNode, type ComponentProps } from "react";
import cn from "~/components/cn";
import { Chilanka } from "next/font/google";

function RecipeCard() {
  return (
    <div className="flex h-64 overflow-hidden rounded-lg border-2  border-black duration-300 hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-button">
      <div className="flex h-full w-1/2 flex-col justify-between border-r-2 border-black p-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl leading-none">Recipe name</h2>
            <p className="mt-3 w-min rounded-lg bg-yellow-500 p-1 px-2 text-sm font-bold text-yellow-900">
              DINNER
            </p>
          </div>
          <Heart absoluteStrokeWidth size={32}></Heart>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center">
            <Clock></Clock>
            <p className="ml-3 text-sm">30 min</p>
            <div className="mx-4 h-1 w-1 rounded-full bg-black"></div>
            <Star className="mr-1"></Star>
            <Star className="mr-1"></Star>
            <Star className="mr-1"></Star>
          </div>
          {/* <div className="ml-auto flex h-auto w-min items-center gap-4"> */}
          <p className="cursor-pointer whitespace-nowrap">
            <b className="pr-2">recipe by:</b>{" "}
            <span className="hover:underline">username 1</span>
          </p>
          {/* </div> */}
        </div>
      </div>
      {/* <div className="w-1/2 bg-yellow-100 p-4"> */}
      <Image
        src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
        alt="recipe photo"
        className="h-full w-1/2 object-cover"
        width={1000}
        height={666}
      ></Image>
      {/* </div> */}
    </div>
  );
}

function Paginator() {
  return (
    <div className="flex w-full justify-between">
      <div className="flex h-16 items-center">
        <div className="flex h-full w-16 items-center justify-center hover:bg-gray-100">
          <ChevronFirst className="rounded-lg hover:bg-gray-100"></ChevronFirst>
        </div>
        <div className="flex h-full w-16 items-center justify-center hover:bg-gray-100">
          <ChevronLeft className="rounded-lg hover:bg-gray-100"></ChevronLeft>
        </div>
        <p className="mx-8 text-3xl font-bold">1</p>
        <div className="flex h-full w-16 items-center justify-center hover:bg-gray-100">
          <ChevronRight className="rounded-lg hover:bg-gray-100"></ChevronRight>
        </div>
        <div className="flex h-full w-16 items-center justify-center hover:bg-gray-100">
          <ChevronLast className="rounded-lg hover:bg-gray-100"></ChevronLast>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-2xl">Showing</p>
        <select
          className="rounded-lg  bg-gray-100 px-2 text-xl"
          name="per-page"
          defaultValue={10}
          id="per-page"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <p className="text-2xl">per page</p>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex h-16 items-center rounded-md border-2 border-black bg-yellow-100 px-8 shadow-button">
      <Search size={32}></Search>
      <Input
        // className="flex h-16 w-full items-center bg-yellow-100 pl-8 text-xl duration-300 placeholder:justify-self-center focus:bg-yellow-500 focus:placeholder:font-normal focus:placeholder:text-black"
        border={false}
        className="h-full w-full border-none bg-yellow-100 pl-8 outline-none placeholder:font-bold placeholder:text-black/50"
        placeholder="what are you searching for?"
      ></Input>
    </div>
  );
}

function Separator({ className }: ComponentProps<"div">) {
  return (
    <div className={cn(className, "h-0 border-t-[1px] border-black")}></div>
  );
}
type CheckboxProps = { name: string; children: ReactNode; className?: string };
function Checkbox({ name, children, className }: CheckboxProps) {
  return (
    <label htmlFor={name} className="flex w-min gap-4 text-xl">
      <input type="checkbox" name={name} id={name} className="peer hidden" />
      <span
        className={cn(
          "whitespace-nowrap peer-checked:underline peer-checked:[&>*]:fill-black",
          className,
        )}
      >
        {children}
      </span>
    </label>
  );
}

function Filters() {
  return (
    <aside className="sticky top-24 h-min w-1/3 rounded-lg p-8">
      <h2 className="mb-4 text-4xl font-bold">
        <Image
          src="/hero/arrow1.svg"
          alt="->"
          width={64}
          height={64}
          className="inline rotate-90"
        ></Image>{" "}
        Cooking Time
      </h2>
      <ul className="ml-2 flex flex-col gap-2 [&>*]:flex [&>*]:gap-4">
        <Checkbox name="<10">less than 10 mins</Checkbox>
        <Checkbox name="10-20">10 to 20 mins</Checkbox>
        <Checkbox name="20-40">20 to 40 mins</Checkbox>
        <Checkbox name="40-60">40 mins to a hour</Checkbox>
        <Checkbox name="60-120">1 to 2 hours</Checkbox>
        <Checkbox name=">120">more than 2 hours</Checkbox>
      </ul>
      <h2 className="my-4 text-4xl font-bold">
        <Image
          src="/hero/arrow1.svg"
          alt="->"
          width={64}
          height={64}
          className="inline rotate-90"
        ></Image>{" "}
        Rating
      </h2>
      <ul className="ml-2 flex flex-col gap-2 [&>*]:flex [&>*]:gap-4">
        <Checkbox name="1-star" className="flex">
          1 star
        </Checkbox>
        <Checkbox name="2-star" className="flex">
          2 stars
        </Checkbox>
        <Checkbox name="3-star" className="flex">
          3 stars
        </Checkbox>
        <Checkbox name="4-star" className="flex">
          4 stars
        </Checkbox>
        <Checkbox name="5-star" className="flex">
          5 stars
        </Checkbox>
      </ul>
      <h2 className="my-4 text-4xl font-bold">
        <Image
          src="/hero/arrow1.svg"
          alt="->"
          width={64}
          height={64}
          className="inline rotate-90"
        ></Image>{" "}
        Additional
      </h2>
      <ul className="ml-2 flex flex-col gap-2 [&>*]:flex [&>*]:gap-4">
        <Checkbox name="high-protein">high in protein</Checkbox>
        <Checkbox name="low-calorie">low calorie</Checkbox>
      </ul>
    </aside>
  );
}

export default function Recipes() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center pt-32">
      <h1 className="font-title text-5xl font-extrabold">
        All Recipes & Cooking Ideas
      </h1>
      <p className="py-4 text-xl">Explore various recipes and kitchen ideas.</p>
      <div className="mb-12 mt-4 flex w-full max-w-screen-2xl gap-12">
        <Filters></Filters>
        <section className="my-4 flex w-2/3 flex-col gap-8">
          <SearchBar></SearchBar>
          <div className="flex w-full justify-between">
            <div className="flex items-center justify-center gap-4 text-2xl [&>*]:cursor-pointer">
              {/* <div className="flex gap-8  [&>*]:underline-offset-4 [&>*]:duration-300"> */}
              <p className="hover:underline">breakfast.</p>
              <p className="hover:underline">lunch.</p>
              <p className="hover:underline">dinner.</p>
              <p className="hover:underline">apetizers.</p>
              <p className="hover:underline">desserts.</p>
              <p className="hover:underline">drinks.</p>
              {/* </div> */}
            </div>
            <div className="flex w-min items-center gap-4">
              <b className="whitespace-nowrap">sort by</b>
              <select name="sort-by" id="sort-by">
                <option value="views">most views</option>
                <option value="rating">rating</option>
                <option value="latest">latest</option>
                <option value="name">by name</option>
              </select>
            </div>
          </div>
          {new Array(10).fill(null).map((_, index) => (
            <RecipeCard key={index}></RecipeCard>
          ))}
          <Paginator></Paginator>
        </section>
      </div>
    </div>
  );
}
