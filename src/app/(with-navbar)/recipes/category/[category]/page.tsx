import { eq, sql, type SQL } from "drizzle-orm";
import CategoryList from "~/components/recipes/category/category-list";
import Filters from "~/components/recipes/category/filters";
import SearchBar from "~/components/recipes/category/search-bar";
import SortBy from "~/components/recipes/category/sort-by";
import Pagination from "~/components/recipes/pagination";
import RouteDisplay from "~/components/recipes/path-display";
import RecipeCard from "~/components/recipes/recipe-card";
import { CATEGORIES } from "~/lib/constants";
import { db } from "~/server/db";
import { recipeLikes, recipeReviews, recipes, users } from "~/server/db/schema";
import { type RecipeCategory } from "~/types";

const getRecipes =
  // cache(
  async (category: RecipeCategory) => {
    const where: SQL[] = [];

    if (category !== "all") where.push(eq(recipes.category, category));

    const recipeList = await db
      .select({
        id: recipes.id,
        name: recipes.name,
        difficultyLevel: recipes.difficultyLevel,
        cookingTime: recipes.cookingTime,
        username: users.name,
        like_count: sql`COALESCE(COUNT(${recipeLikes.id}), 0)`,
        review_count: sql`COALESCE(COUNT(${recipeReviews.id}), 0)`,
      })
      .from(recipes)
      .leftJoin(users, eq(recipes.userId, users.id))
      .leftJoin(recipeReviews, eq(recipes.id, recipeReviews.recipeId))
      .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
      .groupBy(recipes.id, users.name);

    // .from(recipes)
    // .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
    // .leftJoin(recipeReviews, eq(recipes.id, recipeReviews.recipeId))
    // .leftJoin(users, eq(recipes.userId, users.id))
    // .where(and(...where))
    // .groupBy(
    //   recipes.id,
    //   // recipeLikes.id,
    //   // recipeReviews.id,
    //   // recipes.instructions,
    //   // recipes.userId,
    //   // recipes.name,
    //   // recipes.description,
    //   // recipes.category,
    //   // recipes.cookingTime,
    //   // recipes.difficultyLevel,
    //   // recipes.createdAt,
    // );

    console.log(recipeList);

    return recipeList;
  };
//   undefined,
//   { revalidate: 5 },
// );

export default async function Category({
  params,
}: {
  params: { category: RecipeCategory };
}) {
  const recipeList = await getRecipes(params.category);
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
      <SearchBar></SearchBar>
      <div className="flex w-full justify-between">
        <CategoryList></CategoryList>
        <SortBy></SortBy>
      </div>
      <div className="mb-12 mt-8 flex w-full max-w-screen-2xl gap-12">
        <Filters></Filters>
        <section className="flex w-2/3 flex-col gap-8">
          {recipeList.map((recipe, index) => (
            <RecipeCard data={recipe} key={index}></RecipeCard>
          ))}
          <Pagination></Pagination>
        </section>
      </div>
    </div>
  );
}
