import { and, eq, like, sql, type SQL } from "drizzle-orm";
import CategoryList from "~/components/recipes/category/category-list";
import RecipeList from "~/components/recipes/category/recipe-list";
import SearchBar from "~/components/recipes/category/search-bar";
import SortBy from "~/components/recipes/category/sort-by";
import RouteDisplay from "~/components/recipes/path-display";
import { CATEGORIES } from "~/lib/constants";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { recipeLikes, recipeReviews, recipes, users } from "~/server/db/schema";
import { type RecipeCategory, type RecipeListItem } from "~/types";

const getRecipes =
  // cache(
  async (
    category: RecipeCategory,
    userId?: string,
    searchParams?: CategorySearchParams,
  ) => {
    const where: SQL[] = [];

    if (category !== "all") where.push(eq(recipes.category, category));
    if (searchParams!.searchQuery)
      where.push(like(recipes.name, `%${searchParams?.searchQuery}%`));
    if (searchParams?.page) "";

    console.log(searchParams);

    const recipeList = await db
      .select({
        id: recipes.id,
        name: recipes.name,
        category: recipes.category,
        difficultyLevel: recipes.difficultyLevel,
        cookingTime: recipes.cookingTime,
        username: users.name,
        likeCount: sql<number>`COALESCE(COUNT(${recipeLikes.id}), 0)`,
        reviewCount: sql<number>`COALESCE(COUNT(${recipeReviews.id}), 0)`,
        averageRating: sql<number>`AVG(${recipeReviews.rating})`,
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
      .where(and(...where))
      // .limit(10);
      .limit(Number(searchParams?.perPage) || 10)
      .offset(
        Number(searchParams?.perPage ?? 10) * Number(searchParams?.page) > 1
          ? Number(searchParams?.page)
          : 0,
      );
    // );

    const [totalRecipeCount] = await db
      .select({ totalCount: sql.raw("COUNT(*)") })
      .from(recipes)
      .where(and(...where));

    return {
      recipeList: recipeList as RecipeListItem[],
      totalRecipeCount: totalRecipeCount?.totalCount as number,
    };
  };
//   undefined,
//   { revalidate: 5 },
// );

type CategorySearchParams = {
  searchQuery: string;
  page: string;
  perPage: string;
};
export default async function Category({
  params,
  searchParams,
}: {
  params: { category: RecipeCategory };
  searchParams: CategorySearchParams;
}) {
  const session = await getServerAuthSession();
  const { recipeList, totalRecipeCount } = await getRecipes(
    params.category,
    session?.user.id,
    searchParams,
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
      <RecipeList
        showCategory={params.category === "all"}
        totalRecipeCount={totalRecipeCount}
        recipeList={recipeList}
      ></RecipeList>
    </div>
  );
}
