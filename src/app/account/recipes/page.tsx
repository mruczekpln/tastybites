import { Heart, Bookmark } from "lucide-react";
import RecipeCard from "~/components/recipes/category/recipe-card";
import SortBy from "~/components/recipes/category/sort-by";
import Pagination from "~/components/recipes/pagination";

export default function AccountRecipes() {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-5xl font-bold">Your recipes</h2>
      <hr />
      <div className="my-4 flex justify-between">
        <div className="flex items-center">
          <p className="mr-4 text-xl">All time stats:</p>
          <Heart size={32}></Heart>
          <p className="mx-4 text-2xl">16</p>
          <Bookmark size={32}></Bookmark>
          <p className="ml-4 text-2xl">3</p>
        </div>
      </div>
      <hr />
      <div className="mt-4 rounded-lg border-2 border-black bg-yellow-100 p-4">
        <h3 className="mb-4 text-2xl">Most liked</h3>
        <RecipeCard></RecipeCard>
        <h3 className="my-4 text-2xl">Most saved</h3>
        <RecipeCard></RecipeCard>
      </div>
      <hr className="my-4" />
      <div className="mb-4 flex justify-between">
        <h3 className=" text-2xl">All recipes</h3>
        <SortBy></SortBy>
      </div>
      <div className="flex flex-col gap-4">
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <Pagination></Pagination>
      </div>
    </div>
  );
}
