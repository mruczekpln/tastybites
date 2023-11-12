import { ChevronRight } from "lucide-react";

export default function Recipes() {
  return (
    <>
      <div className="mb-2 flex w-full max-w-screen-2xl items-center  gap-2">
        <p className="font-title text-2xl">tastybites</p>
        <ChevronRight></ChevronRight>
        <p className="text-lg font-light">recipes</p>
      </div>
      <div className="my-4">
        <h1 className="font-title text-5xl font-extrabold">
          All Recipes & Cooking Ideas
        </h1>
        <p className="py-4 text-center text-xl">
          Explore various recipes and kitchen ideas.
        </p>
      </div>
    </>
  );
}
