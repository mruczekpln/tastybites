import { getServerAuthSession } from "~/server/auth";
import Pagination from "../../pagination";
import RecipeReview from "./review";
import { type Review } from "~/types";

type RecipeReviewListProps = {
  reviews: Review[];
  userId?: string;
};
export default function RecipeReviewList({
  reviews,
  userId,
}: RecipeReviewListProps) {
  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review, index) => (
        <RecipeReview
          isWrittenByLoggedInUser={review.userId === userId}
          key={index}
          review={review}
        ></RecipeReview>
      ))}
      {reviews.length > 10 && <Pagination></Pagination>}
    </div>
  );
}
