"use client";

import { formatDistanceToNow } from "date-fns";
import { Star, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "~/components/ui/button";
import { api } from "~/trpc/react";
import { type ReviewListItem } from "~/types/recipe";

type RecipeReviewProps = {
  review: ReviewListItem;
  isWrittenByLoggedInUser: boolean;
};
export default function RecipeReview({
  review,
  isWrittenByLoggedInUser,
}: RecipeReviewProps) {
  const router = useRouter();
  const deleteReview = api.recipe.deleteReview.useMutation();

  return (
    <div className="h-auto w-full rounded-lg border-2 border-black p-4 shadow-button">
      <div className="mb-4 flex items-center  justify-between">
        <div className="flex items-center gap-4">
          {review.userAvatar ? (
            <Image
              src={review.userAvatar}
              alt="user-avatar"
              width={32}
              height={32}
              className="rounded-full border-2 border-black"
            ></Image>
          ) : (
            <div className="h-8 w-8 rounded-full border-2 border-black"></div>
          )}
          <b>{review.userName}</b>
          <p className="font-light">
            {formatDistanceToNow(review.createdAt)} ago
          </p>
          {isWrittenByLoggedInUser && (
            <Button
              onClick={() => {
                deleteReview.mutate(
                  { reviewId: review.id },
                  {
                    onSuccess: () => {
                      console.log("refresh");
                      router.refresh();
                    },
                  },
                );
              }}
              className="px-2 text-sm"
              variant="ghost"
            >
              <Trash></Trash>
            </Button>
          )}
        </div>
        <div className="flex">
          {Array.from({ length: 5 }, (_, starIndex) => (
            <Star
              key={starIndex}
              className={
                starIndex >= review.rating
                  ? "fill-gray-300 stroke-none"
                  : "fill-yellow-600 stroke-none"
              }
              size={40}
            />
          ))}
        </div>
      </div>
      <p>{review.content}</p>
    </div>
  );
}
