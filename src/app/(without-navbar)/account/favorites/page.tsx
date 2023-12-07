import { count, eq, sql } from "drizzle-orm";
import Pagination from "~/components/recipes/pagination";
import RecipeCard from "~/components/recipes/recipe-card";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { withPagination } from "~/server/db/dynamics";
import { recipeLikes, recipeReviews, recipes, users } from "~/server/db/schema";

async function getLiked(
  userId: string,
  { page, perPage }: { page: number; perPage: number },
) {
  const likedRecipeListBaseQuery = db
    .select({
      id: recipes.id,
      name: recipes.name,
      username: users.name,
      category: recipes.category,
      difficultyLevel: recipes.difficultyLevel,
      cookingTime: recipes.cookingTime,
      likeCount: count(recipeLikes.id).as("like_count"),
      reviewCount: count(recipeReviews.id),
      averageRating:
        sql<number>`CASE WHEN AVG(${recipeReviews.rating}) THEN AVG(${recipeReviews.rating}) ELSE 0 END`.as(
          "average_rating",
        ),
    })
    .from(recipes)
    .where(eq(recipeLikes.likedById, userId))
    .leftJoin(users, eq(recipes.creatorId, users.id))
    .leftJoin(recipeReviews, eq(recipes.id, recipeReviews.recipeId))
    .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
    .groupBy(recipes.id)
    .$dynamic();

  withPagination(likedRecipeListBaseQuery, page, perPage);

  const likedRecipeList = await likedRecipeListBaseQuery;

  return likedRecipeList;
}

export default async function AccountFavorites({
  searchParams,
}: {
  searchParams: { page: number; perPage: number };
}) {
  const session = await getServerAuthSession();

  const page = Number(searchParams.page ?? 1);
  const perPage = Number(searchParams.perPage ?? 10);

  const likedRecipeList = await getLiked(session!.user.id, {
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
