import { type RecipeListItem } from "~/types";
import Pagination from "../pagination";
import RecipeCard from "../recipe-card";
import Filters from "./filters";

type RecipeListProps = {
  showCategory: boolean;
  totalRecipeCount: number;
  recipeList: RecipeListItem[];
};
export default function RecipeList({
  showCategory,
  totalRecipeCount,
  recipeList,
}: RecipeListProps) {
  return (
    <div className="mb-12 mt-8 flex w-full max-w-screen-2xl gap-12">
      <Filters></Filters>
      <section className="flex w-2/3 flex-col gap-8">
        {recipeList.length > 0 ? (
          recipeList.map((recipe, index) => (
            <RecipeCard
              showCategory={showCategory}
              data={recipe}
              key={index}
            ></RecipeCard>
          ))
        ) : (
          <div className="mt-8">
            <h2 className="text-center text-4xl font-bold">
              There&apos;s no recipes matching your query
            </h2>
            <p className="mt-4 text-center text-2xl">Try something else!</p>
          </div>
        )}

        {/* {recipeList.length > 10 && <Pagination></Pagination>} */}
        <Pagination recipeCount={totalRecipeCount}></Pagination>
      </section>
    </div>
  );
}
