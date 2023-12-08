import Pagination from "~/components/recipes/pagination";
import RecipeCard from "~/components/recipes/recipe-card";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function AccountFavorites({
  searchParams,
}: {
  searchParams: { page: number; perPage: number };
}) {
  const session = await getServerAuthSession();

  const page = Number(searchParams.page ?? 1);
  const perPage = Number(searchParams.perPage ?? 10);

  const likedRecipeList = await api.user.getLikedRecipes.query({
    userId: session!.user.id,
    page,
    perPage,
  });

  return (
    <div className="w-full max-w-screen-2xl">
      <h2 className="text-5xl font-bold">Saved recipes</h2>
      <h2 className="mt-4 text-2xl">Total: 12</h2>
      <hr className="my-4" />
      <div className="flex w-full flex-col gap-4">
        {likedRecipeList.slice(0, perPage).map((recipe) => (
          <RecipeCard
            key={recipe.id}
            data={recipe}
            showCategory
            hideLikes
            higher
          ></RecipeCard>
        ))}

        {(likedRecipeList.length === perPage + 1 || page > 1) && (
          <Pagination totalRecipes={likedRecipeList.length}></Pagination>
        )}
      </div>
    </div>
  );
}
