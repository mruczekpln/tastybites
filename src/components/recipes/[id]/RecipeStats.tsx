"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import Button from "~/components/ui/button";
import { api } from "~/trpc/react";

type RecipeStatsProps = {
  isLoggedIn: boolean;
  recipeId: number;
  ownerId: string;
  isUserLiking: boolean;
  likeCount: number;
};
export default function RecipeStats({
  isLoggedIn,
  recipeId,
  ownerId,
  isUserLiking,
  likeCount,
}: RecipeStatsProps) {
  // const router = useRouter();
  const [liked, setLiked] = useState<boolean>(isUserLiking);
  let tempLikeCount;
  if (liked && !isUserLiking) tempLikeCount = likeCount + 1;
  else if (!liked && isUserLiking) tempLikeCount = likeCount - 1;
  else tempLikeCount = likeCount;

  const likeRecipe = api.recipe.handleLikeRecipe.useMutation();

  function onLikeClick() {
    likeRecipe.mutate(
      {
        isLiked: liked,
        recipeId,
        creatorId: ownerId,
      },
      {
        onSuccess: () => {
          setLiked((prev) => !prev);
          // router.refresh()
        },
      },
    );
  }

  return (
    <div className="flex items-center">
      {/* <u>add to favorites</u> */}
      <p className="text-xl">
        <b>{tempLikeCount}</b> likes
      </p>
      {isLoggedIn ? (
        <Button
          onClick={onLikeClick}
          variant="ghost"
          name="like-recipe"
          className={"ml-2 px-2 py-1"}
        >
          <Heart
            className="p-0"
            size={32}
            fill={liked ? "black" : "transparent"}
          ></Heart>
        </Button>
      ) : (
        <p className="ml-4">log in to be able to save recipes!</p>
      )}
      {/* <p className="text-xl">{recipeData} likes</p> */}
    </div>
  );
}
