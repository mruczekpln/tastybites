import { eq, sql, and, type SQL, like } from "drizzle-orm";
import CategoryList from "~/components/recipes/category/category-list";
import Filters from "~/components/recipes/category/filters";
import RecipeList from "~/components/recipes/category/recipe-list";
import SearchBar from "~/components/recipes/category/search-bar";
import SortBy from "~/components/recipes/category/sort-by";
import Pagination from "~/components/recipes/pagination";
import RouteDisplay from "~/components/recipes/path-display";
import RecipeCard from "~/components/recipes/recipe-card";
import { CATEGORIES } from "~/lib/constants";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { recipeLikes, recipeReviews, recipes, users } from "~/server/db/schema";
import { type RecipeListItem, type RecipeCategory } from "~/types";

const getRecipes =
  // cache(
  async (category: RecipeCategory, userId?: string, searchParams?: string) => {
    const where: SQL[] = [];

    if (category !== "all") where.push(eq(recipes.category, category));
    if (searchParams) where.push(like(recipes.name, `%${searchParams}%`));

    const recipeList = await db
      .select({
        id: recipes.id,
        name: recipes.name,
        difficultyLevel: recipes.difficultyLevel,
        cookingTime: recipes.cookingTime,
        username: users.name,
        likeCount: sql<number>`COALESCE(COUNT(${recipeLikes.id}), 0)`,
        reviewCount: sql<number>`COALESCE(COUNT(${recipeReviews.id}), 0)`,
        ...(userId
          ? {
              isUserLiking: sql.raw(
                `MAX(CASE WHEN tastybites_recipe_like.user_id = '${userId}' THEN 1 ELSE 0 END)`,
              ),
            }
          : {}),
      })
      .from(recipes)
      .leftJoin(users, eq(recipes.userId, users.id))
      .leftJoin(recipeReviews, eq(recipes.id, recipeReviews.recipeId))
      .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
      .groupBy(recipes.id, users.name)
      .where(and(...where));

    console.log(recipeList);

    return recipeList as RecipeListItem[];
  };
//   undefined,
//   { revalidate: 5 },
// );

export default async function Category({
  params,
  searchParams,
}: {
  params: { category: RecipeCategory };
  searchParams: { searchQuery: string };
}) {
  const session = await getServerAuthSession();
  const recipeList = await getRecipes(
    params.category,
    session?.user.id,
    searchParams.searchQuery,
  );
  const currentCategoryDetails = CATEGORIES[params.category];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col items-center pt-32">
      <RouteDisplay
        arr={[
          { displayedName: "recipes", href: "/recipes" },
          { displayedName: currentCategoryDetails.name },
        ]}
      ></RouteDisplay>
      <div className="my-4">
        <h1 className="text-center font-title text-5xl font-extrabold">
          {currentCategoryDetails.titleText}
        </h1>
        <p className="py-4 text-center text-xl">
          {currentCategoryDetails.subtitleText}
        </p>
      </div>
      <SearchBar category={params.category}></SearchBar>
      <div className="flex w-full justify-between">
        <CategoryList></CategoryList>
        <SortBy></SortBy>
      </div>
      {/* <RecipeList recipeList={recipes}></RecipeList> */}
      <RecipeList recipeList={recipeList}></RecipeList>
    </div>
  );
}
