import Link from "next/link";
import RecipeIngredientList from "~/components/recipes/[id]/ingredient-list";
import RecipeStats from "~/components/recipes/[id]/recipe-stats";
import RecipeReviewForm from "~/components/recipes/[id]/review/form";
import RecipeReviewList from "~/components/recipes/[id]/review/list";
import RecipeReviewSummary from "~/components/recipes/[id]/review/summary";
import RecipeShowcase from "~/components/recipes/[id]/showcase";
import RecipeSummary from "~/components/recipes/[id]/summary";
import RouteDisplay from "~/components/recipes/path-display";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { type PaginationSearchParams } from "~/types";

export default async function Recipe({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: PaginationSearchParams;
}) {
  const session = await getServerAuthSession();
  const recipeId = Number(params.id);

  const recipeData = await api.recipe.getById.query({
    recipeId,
    userId: session?.user?.id,
  });

  const reviewList = await api.recipe.getReviewPage.query({
    recipeId,
    page: Number(searchParams.page ?? 1),
    perPage: Number(searchParams.perPage ?? 10),
  });

  const averageRating =
    reviewList
      .map(({ rating }: { rating: number }) => rating)
      .reduce((sum, num) => sum + num, 0) / (reviewList.length || 1);

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
            <Link
              className="hover:underline"
              href={`/account/${recipeData?.username}`}
            >
              {recipeData?.username}
            </Link>
          </h2>
          <RecipeStats
            isLoggedIn={!!session}
            likeCount={Number(recipeData?.like_count)}
            isUserLiking={Number(recipeData?.isUserLiking) === 1 ? true : false}
            recipeId={recipeData!.id}
            ownerId={recipeData!.ownerId}
          ></RecipeStats>
        </div>

        <div className="flex h-[512px] w-full gap-4">
          <RecipeShowcase recipeId={recipeId}></RecipeShowcase>
          <RecipeSummary
            reviews={{
              reviewCount: reviewList.length,
              averageRating,
            }}
            cookingTime={recipeData!.cookingTime}
            description={recipeData!.description}
            difficultyLevel={recipeData!.difficultyLevel}
          ></RecipeSummary>
        </div>

        <RecipeIngredientList
          recipeId={Number(params.id)}
        ></RecipeIngredientList>

        <h2 className="mb-4 mt-16 text-4xl font-bold">Instructions</h2>
        <p className="text-xl">{recipeData?.instructions}</p>

        <div className="mt-16 flex gap-16">
          <div className="w-2/3">
            <h2 className="text-4xl font-bold">Write your review</h2>
            {session ? (
              <RecipeReviewForm recipeId={Number(params.id)}></RecipeReviewForm>
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
              ratings={reviewList.map(({ rating }) => rating)}
            ></RecipeReviewSummary>
            <RecipeReviewList
              userId={session?.user.id}
              reviewList={reviewList}
              searchParams={searchParams}
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
