import { Clock, Shapes, Star } from "lucide-react";

type RecipeSummaryProps = {
  description: string;
  cookingTime: number;
  reviews: {
    reviewCount: number;
    averageRating?: number;
  };
  difficultyLevel: string;
};

export default function RecipeSummary({
  description,
  cookingTime,
  reviews,
  difficultyLevel,
}: RecipeSummaryProps) {
  return (
    <div className="flex w-96 flex-col rounded-xl border-2 border-black bg-yellow-100">
      <div className="h-full border-b-2 border-dashed border-black p-6 pt-5">
        <h2 className=" text-4xl font-bold">Description</h2>
        <p className="h-16 text-lg">{description}</p>
      </div>
      <div className="pb-2 pl-6 pt-4">
        <div>
          <h3 className="text-2xl font-bold ">Cooking time</h3>
          <div className="ml-4 flex h-16 items-center gap-4">
            <Clock size={36}></Clock>
            <p className="text-xl">{cookingTime} min</p>
          </div>
          <div></div>
          <h3 className="text-2xl font-bold ">Difficulty Level</h3>
          <div className="ml-4 flex h-16 items-center gap-4">
            <Shapes size={36}></Shapes>
            <p className="text-xl">
              {difficultyLevel.charAt(0).toUpperCase() +
                difficultyLevel.slice(1)}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Average Rating</h3>
          <div className="ml-4 flex h-16 items-center">
            {reviews.reviewCount > 0 ? (
              <>
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={
                      starIndex >= Math.round(reviews.averageRating!)
                        ? "fill-gray-300 stroke-none"
                        : "fill-yellow-600 stroke-none"
                    }
                    size={36}
                  />
                ))}
              </>
            ) : (
              <Star size={36}></Star>
            )}
            {reviews.reviewCount > 0 ? (
              <a href="#reviews" className="ml-4 mt-1 text-xl underline">
                {reviews.reviewCount} reviews
              </a>
            ) : (
              <p className="ml-4 mt-1 text-xl ">
                {reviews.reviewCount} reviews
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
