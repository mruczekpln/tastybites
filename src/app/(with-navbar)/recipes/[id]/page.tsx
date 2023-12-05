import { eq, sql } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import RecipeStats from "~/components/recipes/[id]/RecipeStats";
import RecipeIngredientList from "~/components/recipes/[id]/ingredient-list";
import RecipeReviewForm from "~/components/recipes/[id]/review/form";
import RecipeReviewList from "~/components/recipes/[id]/review/list";
import RecipeReviewSummary from "~/components/recipes/[id]/review/summary";
import RecipeShowcase from "~/components/recipes/[id]/showcase";
import RecipeSummary from "~/components/recipes/[id]/summary";
import RouteDisplay from "~/components/recipes/path-display";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { recipeLikes, recipes, users } from "~/server/db/schema";

const getRecipe = cache(
  async (recipeId: string, userId?: string) => {
    const [recipe] = await db
      .select({
        id: recipes.id,
        instructions: recipes.instructions,
        // userId: recipes.userId,
        name: recipes.name,
        description: recipes.description,
        category: recipes.category,
        cookingTime: recipes.cookingTime,
        difficultyLevel: recipes.difficultyLevel,
        createdAt: recipes.createdAt,
        username: users.name,
        like_count: sql`COUNT(${recipeLikes.id})`,
        ...(userId
          ? {
              isUserLiking: sql.raw(
                `MAX(CASE WHEN tastybites_recipe_like.user_id = '${userId}' THEN 1 ELSE 0 END)`,
              ),
            }
          : {}),
      })
      .from(recipes)
      .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
      .leftJoin(users, eq(recipes.userId, users.id))
      .where(eq(recipes.id, recipeId))
      .groupBy(
        recipes.id,
        recipes.instructions,
        recipes.userId,
        recipes.name,
        recipes.description,
        recipes.category,
        recipes.cookingTime,
        recipes.difficultyLevel,
        recipes.createdAt,
      )
      .limit(1);

    return recipe;
  },
  undefined,
  { revalidate: 5 },
);

const getReviews = cache(
  async (recipeId: string) => {
    const reviews = await db.query.recipeReviews.findMany({
      where: (recipeReviews, { eq }) => eq(recipeReviews.recipeId, recipeId),
      with: {
        users: {
          columns: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      limit: 10,
    });

    return reviews;
  },
  undefined,
  { revalidate: 5 },
);

export default async function Recipe({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  const recipeData = await getRecipe(params.id, session?.user.id);
  const reviewsData = await getReviews(params.id);

  const averageRating =
    reviewsData.map(({ rating }) => rating).reduce((sum, num) => sum + num, 0) /
    (reviewsData.length || 1);

  return (
    <div className="min-h-screen w-full">
      <main className="mx-auto h-auto w-full max-w-screen-2xl pb-16 pt-32">
        <RouteDisplay
          arr={[
            { displayedName: "recipes", href: "/recipes" },
            {
              displayedName: recipeData?.category ?? "",
              href: `/recipes/category/${recipeData?.category ?? "dinner"}`,
            },
            { displayedName: recipeData?.name ?? "" },
          ]}
        ></RouteDisplay>
        <h1 className="mt-8 font-title text-6xl">{recipeData?.name}</h1>
        <div className="flex w-full justify-between">
          <h2 className="mb-4 mt-2 text-2xl">
            <b>by: </b>
            {recipeData?.username}
          </h2>
          <RecipeStats
            isLoggedIn={!!session}
            likeCount={Number(recipeData?.like_count)}
            isUserLiking={Number(recipeData?.isUserLiking) === 1 ? true : false}
            recipeId={recipeData!.id}
          ></RecipeStats>
        </div>

        <div className="flex h-[512px] w-full gap-4">
          <RecipeShowcase></RecipeShowcase>
          <RecipeSummary
            reviews={{
              reviewCount: reviewsData.length,
              averageRating,
            }}
            cookingTime={recipeData!.cookingTime}
            description={recipeData!.description}
            difficultyLevel={recipeData!.difficultyLevel}
          ></RecipeSummary>
        </div>

        <RecipeIngredientList recipeId={params.id}></RecipeIngredientList>

        <h2 className="mb-4 mt-16 text-4xl font-bold">Instructions</h2>
        <p className="text-xl">{recipeData?.instructions}</p>

        <div className="mt-16 flex gap-16">
          <div className="w-2/3">
            <h2 className="text-4xl font-bold">Write your review</h2>
            {session ? (
              <RecipeReviewForm recipeId={params.id}></RecipeReviewForm>
            ) : (
              <p className="mt-4 text-2xl">
                You must be logged in to leave a review!
              </p>
            )}
            <h2 id="reviews" className="mb-6 mt-10 text-4xl font-bold">
              Reviews
            </h2>
            <RecipeReviewSummary
              averageRating={averageRating}
              ratings={reviewsData.map(({ rating }) => rating)}
            ></RecipeReviewSummary>
            <RecipeReviewList
              userId={session?.user.id}
              reviews={reviewsData}
            ></RecipeReviewList>
          </div>

          <div className="flex w-1/3 flex-col gap-4">
            <h2 className="mb-2 text-4xl font-bold">You might also like:</h2>
            <div className="h-48 w-full rounded-xl border-2 border-black shadow-button"></div>
            <div className="h-48 w-full rounded-xl border-2 border-black shadow-button"></div>
            <div className="h-48 w-full rounded-xl border-2 border-black shadow-button"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
