import { Star } from "lucide-react";

type RecipeReviewSummaryProps = {
  averageRating: number;
  ratings: number[];
};

function countReviewsByRating(ratings: number[]) {
  const ratingCounts = [0, 0, 0, 0, 0];

  ratings.forEach((rating) => {
    ratingCounts[rating - 1]++;
  });

  return ratingCounts;
}
export default function RecipeReviewSummary({
  averageRating,
  ratings,
}: RecipeReviewSummaryProps) {
  const countedRatings = countReviewsByRating(ratings);

  return (
    <div className="flex gap-8">
      <div className="mb-8 w-min rounded-lg border-2 border-black bg-yellow-50 px-6 py-4 shadow-button">
        {Array.from({ length: 5 }, (_, rowIndex) => (
          <div key={rowIndex} className="my-2 flex items-center">
            {Array.from({ length: 5 }, (_, starIndex) => (
              <Star
                key={starIndex}
                className={
                  starIndex >= 5 - rowIndex
                    ? "fill-gray-300 stroke-none"
                    : "fill-yellow-600 stroke-none"
                }
                size={32}
              />
            ))}
            <p className="mx-8 whitespace-nowrap text-sm">
              {5 - rowIndex} stars
            </p>
            <b className="whitespace-nowrap text-2xl">
              {countedRatings[4 - rowIndex]}
            </b>
          </div>
        ))}
      </div>
      <div>
        <h3 className="mb-4 text-4xl">
          Total Reviews: <b>{ratings.length}</b>
        </h3>
        <p className="text-2xl">
          Average rating: <b>{averageRating.toFixed(2)}</b>
        </p>
      </div>
    </div>
  );
}
