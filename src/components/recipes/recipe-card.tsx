import { Clock, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type RecipeListItem } from "~/types";

type RecipeCardProps = {
  hideLikes?: boolean;
  hideOwner?: boolean;
  higher?: boolean;
  showCategory: boolean;
  data: RecipeListItem;
};
export default function RecipeCard({
  hideLikes = false,
  hideOwner = false,
  higher = false,
  showCategory,
  data: {
    id,
    name,
    category,
    difficultyLevel,
    cookingTime,
    username,
    likeCount,
    reviewCount,
    averageRating,
    isUserLiking,
  },
}: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${id}`}
      prefetch={false}
      className={`flex ${
        higher ? "h-64" : "h-48"
      } cursor-pointer overflow-hidden rounded-lg border-2 border-black bg-white duration-300 hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-button`}
    >
      <div className="flex h-full w-1/2 flex-col justify-between border-r-2 border-black p-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl leading-none">{name}</h2>
            {reviewCount > 0 ? (
              <div className="mt-2 flex gap-[2px]">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={
                      starIndex >= Math.round(averageRating)
                        ? "fill-gray-300 stroke-none"
                        : "fill-yellow-600 stroke-none"
                    }
                    size={18}
                  />
                ))}
                <p className="ml-2 text-sm">{reviewCount} reviews</p>
              </div>
            ) : (
              <p className="mt-1 text-sm">0 reviews</p>
            )}
            {showCategory && (
              <p className="mt-2 w-min whitespace-nowrap rounded-lg bg-yellow-500 p-1 px-2 text-sm font-bold text-yellow-900">
                {category.toUpperCase()}
              </p>
            )}
          </div>
          {!hideLikes && (
            <div className="flex items-center gap-2">
              <p>{likeCount}</p>
              <Heart
                absoluteStrokeWidth
                fill={Number(isUserLiking) === 1 ? "black" : "transparent"}
                size={32}
              ></Heart>
            </div>
          )}
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center">
            <Clock></Clock>
            <p className="ml-3 text-sm">{cookingTime} min</p>
            <div className="mx-4 h-1 w-1 rounded-full bg-black"></div>
            <p className="font-medium">
              {difficultyLevel.charAt(0).toUpperCase() +
                difficultyLevel.slice(1)}
            </p>
          </div>
          {!hideOwner && (
            <p className="cursor-pointer whitespace-nowrap">
              <b className="pr-2">recipe by:</b>{" "}
              <span className="hover:underline">{username}</span>
            </p>
          )}
        </div>
      </div>
      <Image
        src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
        alt="recipe photo"
        className="h-full w-1/2 object-cover"
        width={1000}
        height={666}
      ></Image>
    </Link>
  );
}
