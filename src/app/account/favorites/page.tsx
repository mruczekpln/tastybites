import RecipeCard from "~/components/recipes/category/recipe-card";
import Pagination from "~/components/recipes/pagination";

export default function AccountFavorites() {
  return (
    <div className="w-full">
      <h2 className="mb-2 text-4xl font-bold">Saved recipes</h2>
      <h2 className="text-2xl">Total: 12</h2>
      <hr className="my-4" />
      <div className="flex w-full flex-col gap-4">
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <Pagination></Pagination>
      </div>
    </div>
  );
}
