import { type PaginationSearchParams, type ReviewListItem } from "~/types";
import Pagination from "../../pagination";
import RecipeReview from "./review";
type RecipeReviewListProps = {
  searchParams: PaginationSearchParams;
  reviewList: ReviewListItem[];
  userId?: string;
};
export default function RecipeReviewList({
  searchParams,
  reviewList,
  userId,
}: RecipeReviewListProps) {
  const page = Number(searchParams.page ?? 1);
  const perPage = Number(searchParams.perPage ?? 10);

  return (
    <div className="flex flex-col gap-4">
      {reviewList.slice(0, 10).map((review, index) => (
        <RecipeReview
          isWrittenByLoggedInUser={review.userId === userId}
          key={index}
          review={review}
        ></RecipeReview>
      ))}

      {(reviewList.length === perPage + 1 || page > 1) && (
        <Pagination totalRecipes={reviewList.length}></Pagination>
      )}
    </div>
  );
}
