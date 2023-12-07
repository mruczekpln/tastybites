import { count, countDistinct, eq } from "drizzle-orm";
import { Heart, LogOut } from "lucide-react";
import Link from "next/link";
import { type ComponentProps } from "react";
import cn from "~/components/cn";
import Button from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { recipeLikes, recipes, users } from "~/server/db/schema";

type OverviewCardProps = ComponentProps<"div">;
function OverviewCard({ className, children }: OverviewCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 border-black bg-yellow-100 p-4 shadow-button",
        className,
      )}
    >
      {children}
    </div>
  );
}

async function getUserOverwiev(userId: string) {
  const [overview] = await db
    .select({
      createdAt: users.createdAt,
      likedRecipes: countDistinct(recipeLikes.recipeId),
      postedRecipes: countDistinct(recipes.id),
    })
    .from(users)
    .leftJoin(recipeLikes, eq(users.id, recipeLikes.likedById))
    .leftJoin(recipes, eq(recipeLikes.recipeId, recipes.id))
    .where(eq(users.id, userId))
    // .where(and(eq(users.id, userId), eq(recipeLikes.likedById, userId)));
    .limit(1);

  // console.log(overview.toSQL());

  const [totalRecipeData] = await db
    .select({
      totalRecipeLikes: count(recipeLikes.recipeId),
    })
    .from(recipeLikes)
    .where(eq(recipeLikes.creatorId, userId))
    .limit(1);

  return {
    ...overview,
    totalRecipeLikes: totalRecipeData?.totalRecipeLikes,
  };
}

export default async function AccountOverview() {
  const session = await getServerAuthSession();
  const overview = await getUserOverwiev(session!.user.id);

  return (
    <div className="flex h-auto w-full max-w-screen-2xl flex-col gap-8">
      <div className="flex flex-col items-center gap-12">
        <div className="h-48 w-48 rounded-full border-2 border-black"></div>
        <h1 className="font-title text-5xl">Hello, {session?.user.name}!</h1>
      </div>
      <div className="flex w-full gap-8 [&>*]:w-full">
        <OverviewCard className="flex flex-wrap items-center justify-between">
          <h2 className="text-3xl font-bold">With us for</h2>
          <p className="w-1/2 text-right text-2xl">X days</p>
          <p>
            since: <i>{overview.createdAt!.toDateString()}</i>
          </p>
        </OverviewCard>
        <OverviewCard className="flex flex-wrap items-center justify-between">
          <h2 className="text-3xl font-bold">Liked Recipes</h2>
          <p className="w-1/3 text-right text-2xl">{overview.likedRecipes}</p>
          <Link href="/account/favorites" className="underline">
            go to favorites
          </Link>
        </OverviewCard>
        <OverviewCard className="flex flex-wrap items-center justify-between">
          <h2 className="text-3xl font-bold">Posted recipes</h2>
          <p className="w-1/3 text-right text-2xl">{overview.postedRecipes}</p>
          <Link href="/account/recipes" className="underline">
            go to your recipes
          </Link>
        </OverviewCard>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <h2 className="text-3xl">Your recipes earned in total:</h2>
        <div className="flex items-center gap-4">
          <Heart size={48}></Heart>
          <p className="text-4xl">{overview.totalRecipeLikes} likes</p>
        </div>
      </div>
      <hr />
      <Button
        className="flex w-min items-center gap-4 bg-red-600 px-8 py-4 text-3xl font-bold text-white hover:bg-red-900"
        variant="ghost"
      >
        <LogOut className="inline" size={32}></LogOut>
        Log out
      </Button>
    </div>
  );
}
