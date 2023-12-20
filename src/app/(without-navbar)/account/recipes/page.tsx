import SortBy from "~/components/recipes/category/sort-by";
import Pagination from "~/components/recipes/pagination";
import RecipeCard from "~/components/recipes/recipe-card";
import { api } from "~/trpc/server";
import {
  type RecipeListSearchParams,
  type SortBy as TSortBy,
} from "~/types/recipe";

export default async function AccountRecipes({
  searchParams,
}: {
  searchParams: RecipeListSearchParams & TSortBy;
}) {
  const page = Number(searchParams.page ?? 1);
  const perPage = Number(searchParams.perPage ?? 10);

  const { createdRecipeList, mostLiked } =
    await api.user.getCreatedRecipes.query({
      page,
      perPage,
      sortBy: searchParams.sortBy ?? "likes",
      withMostLiked: true,
    });

  return (
    <div className="w-full">
      <h2 className="mb-4 text-5xl font-bold ">Your recipes</h2>
      <hr />
      {createdRecipeList.length > 0 ? (
        <>
          <div className="mt-4 rounded-lg border-2 border-black bg-yellow-100 p-4">
            <h3 className="mb-4 text-2xl">Most liked</h3>
            <RecipeCard data={mostLiked!} showCategory hideOwner></RecipeCard>
          </div>
          <hr className="my-4" />
          <div className="mb-4 flex justify-between">
            <h3 className=" text-2xl">All recipes</h3>
            <SortBy></SortBy>
          </div>
          <div className="flex flex-col gap-4">
            {createdRecipeList.slice(0, perPage).map((recipe) => (
              <RecipeCard
                key={recipe.id}
                data={recipe}
                showCategory
                hideOwner
                higher
              ></RecipeCard>
            ))}

            {(createdRecipeList.length === perPage + 1 || page > 1) && (
              <Pagination totalRecipes={createdRecipeList.length}></Pagination>
            )}
          </div>
        </>
      ) : (
        <p className="mt-4 text-2xl">No recipes created yet</p>
      )}
    </div>
  );
}
