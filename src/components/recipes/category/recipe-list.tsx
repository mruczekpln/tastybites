import shortenCookingTimeRanges from "~/lib/utils/shorten-cooking-time-ranges";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { type RecipeCategory, type RecipeListSearchParams } from "~/types";
import Pagination from "../pagination";
import RecipeCard from "../recipe-card";
import Filters from "./filters";

type RecipeListProps = {
  searchParams: RecipeListSearchParams;
  category: RecipeCategory;
};
export default async function CategoryRecipeList({
  searchParams,
  category,
}: RecipeListProps) {
  const session = await getServerAuthSession();

  const page = Number(searchParams.page ?? 1);
  const perPage = Number(searchParams.perPage ?? 10);

  const recipeList = await api.recipe.getPage.query({
    userId: session?.user.id,
    category,
    params: {
      page,
      perPage,
      sortBy: searchParams.sortBy ?? "likes",
      searchQuery: searchParams.searchQuery,
      cookingTimeRangeArr: searchParams.cookingTimeRanges
        ? shortenCookingTimeRanges(searchParams.cookingTimeRanges.split(","))
        : [],
      difficultyLevelsArr: searchParams.difficultyLevels
        ? (searchParams.difficultyLevels.split(",") as (
            | "easy"
            | "intermediate"
            | "advanced"
          )[])
        : [],
      ratingsArr: searchParams.ratings ? searchParams.ratings.split(",") : [],
    },
  });

  return (
    <div className="mb-12 mt-8 flex w-full max-w-screen-2xl gap-12">
      <Filters></Filters>
      <section className="flex w-2/3 flex-col gap-8">
        {recipeList.length > 0 ? (
          recipeList
            .slice(0, perPage ?? 10)
            .map((recipe, index) => (
              <RecipeCard
                showCategory={category === "all"}
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

        {(recipeList.length === perPage + 1 || page > 1) && (
          <Pagination totalRecipes={recipeList.length}></Pagination>
        )}
      </section>
    </div>
  );
}
