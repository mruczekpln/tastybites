import { count, eq, sql } from "drizzle-orm";
import SortBy from "~/components/recipes/category/sort-by";
import Pagination from "~/components/recipes/pagination";
import RecipeCard from "~/components/recipes/recipe-card";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { recipeLikes, recipeReviews, recipes } from "~/server/db/schema";
import { api } from "~/trpc/server";
import { type RecipeListSearchParams, type SortBy as TSortBy } from "~/types";

async function getCreated(
  userId: string,
  { page, perPage, sortBy }: { page: number; perPage: number; sortBy: TSortBy },
) {
  const createdRecipeList = await api.user.getCreatedRecipes.query({
    userId,
    page,
    perPage,
    sortBy,
  });

  const [mostLiked] = await db
    .select({
      id: recipes.id,
      name: recipes.name,
      category: recipes.category,
      difficultyLevel: recipes.difficultyLevel,
      cookingTime: recipes.cookingTime,
      likeCount: count(recipeLikes.id).as("like_count"),
      reviewCount: count(recipeReviews.id),
      averageRating: sql<number>`COALESCE(AVG(${recipeReviews.rating}), 0)`.as(
        "average_rating",
      ),
    })
    .from(recipes)
    .where(eq(recipes.creatorId, userId))
    .orderBy(sql`like_count desc`)
    .leftJoin(recipeReviews, eq(recipes.id, recipeReviews.recipeId))
    .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
    .groupBy(recipes.id)
    .limit(1);

  return { createdRecipeList, mostLiked };
}

export default async function AccountRecipes({
  searchParams,
}: {
  searchParams: RecipeListSearchParams & TSortBy;
}) {
  const session = await getServerAuthSession();

  const page = Number(searchParams.page ?? 1);
  const perPage = Number(searchParams.perPage ?? 10);

  const { createdRecipeList, mostLiked } = await getCreated(session!.user.id, {
    page,
    perPage,
    sortBy: searchParams.sortBy ?? "likes",
  });

  return (
    <div className="w-full">
      <h2 className="mb-4 text-5xl font-bold ">Your recipes</h2>
      <hr />
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
    </div>
  );
}
