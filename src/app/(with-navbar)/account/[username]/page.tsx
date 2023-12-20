import { ChefHat, Heart } from "lucide-react";
import Image from "next/image";
import OverviewCard from "~/components/account/overview-card";
import Pagination from "~/components/recipes/pagination";
import RecipeCard from "~/components/recipes/recipe-card";
import { api } from "~/trpc/server";
import { type PaginationSearchParams } from "~/types/recipe";

export default async function UserAccount({
  params,
  searchParams,
}: {
  params: {
    username: string;
  };
  searchParams: PaginationSearchParams;
}) {
  const decodedUsername = decodeURI(params.username);

  const page = Number(searchParams.page ?? 1);
  const perPage = Number(searchParams.perPage ?? 10);

  const { userData, createdRecipesCount, createdRecipesLikesCount } =
    await api.user.getData.query({ username: decodedUsername });

  if (!userData)
    return (
      <div className="mx-auto flex h-screen w-full max-w-screen-2xl items-center justify-center">
        <main className="flex flex-col items-center gap-8">
          <Image
            src="/hero/illustration.svg"
            alt="illustration"
            height={400}
            width={400}
            objectFit="cover"
          ></Image>
          <h1 className="font-title text-6xl">Oops, an error occurred!</h1>
          <p className="text-2xl">User with name {decodedUsername} not found</p>
        </main>
      </div>
    );

  const { createdRecipeList } = await api.user.getCreatedRecipes.query({
    userId: userData.id,
    page,
    perPage,
  });

  return (
    <div className="mx-auto h-screen w-full max-w-screen-xl pt-32">
      <div className="flex justify-between">
        <div className="flex items-center gap-8">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-black">
            {userData.image && (
              <Image
                src={userData.image}
                alt="profile"
                width={100}
                height={100}
                className="rounded-full"
              ></Image>
            )}
          </div>
          <div>
            <h1 className="font-title text-4xl">{userData.name}</h1>
            {/* <p>joined {formatRelative(userData.createdAt, new Date())}</p> */}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <OverviewCard className="flex items-center justify-between gap-4">
            {/* <h2 className="whitespace-nowrap text-3xl font-bold">
              Posted recipes
            </h2> */}
            <ChefHat size={48}></ChefHat>
            <p className="w-1/3 text-right text-2xl">{createdRecipesCount}</p>
          </OverviewCard>
          <OverviewCard className="flex items-center justify-between gap-4">
            {/* <h2 className="whitespace-nowrap text-3xl font-bold">
              Total likes
            </h2> */}
            <Heart size={48}></Heart>
            <p className="w-1/3 text-right text-2xl">
              {createdRecipesLikesCount}
            </p>
          </OverviewCard>
        </div>
      </div>
      <hr className="mt-8" />
      <h2 className="my-4 text-2xl font-bold">
        {userData.name}&apos;s recipes
      </h2>
      <div className="flex flex-col gap-8">
        {createdRecipeList.slice(0, perPage).map((recipe) => (
          <RecipeCard
            key={recipe.id}
            data={recipe}
            showCategory
            hideOwner
            hideLikes
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
