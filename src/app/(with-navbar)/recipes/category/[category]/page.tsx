/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { and, count, eq, inArray, like, sql, type SQL } from "drizzle-orm";
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

type CookingTimeRange = {
  min: number;
  max: number;
};

function calculateCookingTimeRange(selectedCheckboxes: string[]) {
  if (selectedCheckboxes.length > 0) {
    const ranges: CookingTimeRange[] = selectedCheckboxes.map((checkbox) => {
      const [min, max] = checkbox.split("-").map(Number);
      return { min, max } as CookingTimeRange;
    });

    ranges.sort((a, b) => a.min - b.min);

    const combinedRanges: CookingTimeRange[] = [ranges[0]!];

    for (let i = 1; i < ranges.length; i++) {
      const currentRange = ranges[i]!;
      const lastCombinedRange = combinedRanges[combinedRanges.length - 1]!;

      if (currentRange.min <= lastCombinedRange.max)
        lastCombinedRange.max = Math.max(
          lastCombinedRange.max,
          currentRange.max,
        );
      else combinedRanges.push(currentRange);
    }

    return combinedRanges.map((range) => `${range.min}-${range.max}`);
    // .join(",");
  } else return [];
}

const getRecipes =
  // cache(
  async (
    category: RecipeCategory,
    userId?: string,
    searchParams?: CategorySearchParams,
  ) => {
    const recipeListWhere: SQL[] = [];

    const page = Number(searchParams?.page) ?? 1;
    const perPage = Number(searchParams?.perPage) ?? 10;

    const searchQuery: string = searchParams?.searchQuery ?? "";
    const difficultyLevelsArr: string[] =
      searchParams?.difficultyLevels?.split(",") ?? [];
    const ratingsArr: string[] = searchParams?.ratings?.split(",") ?? [];
    const cookingTimeRanges: string[] = calculateCookingTimeRange(
      searchParams?.cookingTimeRanges?.split(",") ?? [],
    );

    if (category !== "all")
      recipeListWhere.push(eq(recipes.category, category));
    if (searchQuery.length > 0)
      recipeListWhere.push(like(recipes.name, `%${searchQuery}%`));
    if (difficultyLevelsArr.length > 0)
      recipeListWhere.push(
        inArray(recipes.difficultyLevel, difficultyLevelsArr),
      );
    if (cookingTimeRanges.length > 0) {
      recipeListWhere.push(
        sql.raw(
          `(${cookingTimeRanges
            .map(
              (range) =>
                `(tastybites_recipe.cooking_time BETWEEN  ${
                  range.split("-")[0]
                } AND ${range.split("-")[1]})`,
            )
            .join(" OR ")})`,
        ),
      );
    }

    const recipeListBaseQuery = db
      .select({
        id: recipes.id,
        name: recipes.name,
        category: recipes.category,
        difficultyLevel: recipes.difficultyLevel,
        cookingTime: recipes.cookingTime,
        username: users.name,
        likeCount: count(recipeLikes.id),
        reviewCount: count(recipeReviews.id),
        averageRating: sql<number>`CASE WHEN AVG(${recipeReviews.rating}) THEN AVG(${recipeReviews.rating}) ELSE 0 END`,
        ...(userId
          ? {
              isUserLiking: sql.raw(
                `MAX(CASE WHEN tastybites_recipe_like.user_id = '${userId}' THEN 1 ELSE 0 END)`,
              ),
            }
          : {}),
      })
      .from(recipes)
      .where(and(...recipeListWhere))
      .leftJoin(users, eq(recipes.userId, users.id))
      .leftJoin(recipeReviews, eq(recipes.id, recipeReviews.recipeId))
      .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
      .groupBy(recipes.id, users.name)
      .$dynamic();

    if (ratingsArr.length > 0)
      recipeListBaseQuery.having(
        inArray(sql`ROUND(AVG(${recipeReviews.rating}), 0)`, ratingsArr),
      );

    recipeListBaseQuery
      .limit(Number(searchParams?.perPage) + 1 || 11)
      .offset((page - 1) * perPage);

    const recipeList = await recipeListBaseQuery;
    console.log(recipeList);

    return recipeList as RecipeListItem[];
  };
//   undefined,
//   { revalidate: 5 },
// );

type CategorySearchParams = {
  searchQuery?: string;
  page?: string;
  perPage?: string;
  cookingTimeRanges?: string;
  difficultyLevels?: string;
  ratings?: string;
};

export default async function Category({
  params,
  searchParams,
}: {
  params: { category: RecipeCategory };
  searchParams: CategorySearchParams;
}) {
  const session = await getServerAuthSession();
  const recipeList = await getRecipes(
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
      <RecipeList
        showCategory={params.category === "all"}
        recipeList={recipeList}
        page={Number(searchParams.page ?? 1)}
        perPage={Number(searchParams.perPage ?? 10)}
      ></RecipeList>
    </div>
  );
}
