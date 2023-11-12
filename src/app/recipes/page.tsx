import { ChevronRight } from "lucide-react";
import CategoryGrid from "~/components/recipes/category-grid";

export default function Recipes() {
  return (
    <div className="mx-auto flex h-screen min-h-screen w-full max-w-screen-2xl flex-col items-center pt-32">
      <div className="flex w-full max-w-screen-2xl items-center gap-2">
        <p className="font-title text-2xl">tastybites</p>
        <ChevronRight></ChevronRight>
        <p className="text-lg font-light">recipes</p>
      </div>
      <div className="my-4">
        <h1 className="font-title text-5xl font-extrabold">
          Recipe categories.
        </h1>
        <p className="py-4 text-center text-xl">
          Explore different recipe categories.
        </p>
      </div>
      <CategoryGrid></CategoryGrid>
    </div>
  );
}
