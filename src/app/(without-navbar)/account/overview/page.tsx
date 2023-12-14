import { formatDistanceToNowStrict } from "date-fns";
import { count, eq } from "drizzle-orm";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import OverviewCard from "~/components/account/overview-card";
import LogoutButton from "~/components/account/overview/logout-button";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { recipeLikes, recipes, users } from "~/server/db/schema";

async function getUserOverwiev(userId: string) {
  const [overview] = await db
    .select({
      createdAt: users.createdAt,
      likedRecipes: count(recipeLikes.recipeId),
      postedRecipes: count(recipes.id),
    })
    .from(users)
    .leftJoin(recipeLikes, eq(recipeLikes.likedById, users.id))
    .leftJoin(recipes, eq(recipes.creatorId, users.id))
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
      <div className="flex flex-col items-center gap-10">
        <div className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-full border-2 border-black">
          {session?.user.image && (
            <Image
              src={session.user.image}
              alt="profile"
              width={192}
              height={192}
              className="rounded-full"
            ></Image>
          )}
        </div>
        <h1 className="font-title text-5xl">Hello, {session?.user.name}!</h1>
      </div>
      <div className="flex w-full gap-8 [&>*]:w-full">
        <OverviewCard className="flex flex-wrap items-center justify-between">
          <h2 className="text-3xl font-bold">With us for</h2>
          <p className="w-1/2 text-right text-xl">
            {formatDistanceToNowStrict(overview.createdAt!, {
              unit: "day",
              roundingMethod: "ceil",
            })}
          </p>
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
      <LogoutButton></LogoutButton>
    </div>
  );
}
