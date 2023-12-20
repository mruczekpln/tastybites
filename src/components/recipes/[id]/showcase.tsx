"use client";

import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";

type RecipeShowcaseProps = { recipeId: number };
export default function RecipeShowcase({ recipeId }: RecipeShowcaseProps) {
  const [activeImage, setActiveImage] = useState<number>(0);

  const { data: images, isSuccess } = api.recipe.getImagesById.useQuery(
    {
      recipeId,
    },
    {
      retry: false,
      staleTime: Infinity,
    },
  );

  console.log(isSuccess && images);

  return (
    <div className="flex h-full w-full justify-between gap-4">
      {isSuccess && (
        <>
          <div className="flex w-full justify-center">
            <div className="relative h-full w-auto overflow-x-hidden rounded-xl border-2 border-black shadow-button">
              <Image
                src={images[activeImage]!.url}
                alt="recipe image"
                quality={95}
                fill
                className="!relative h-full object-contain"
              ></Image>
            </div>
          </div>
          {images.length > 1 && (
            <div className="flex w-24 flex-col gap-4">
              {images.map(({ url }, index) => (
                <div
                  key={index}
                  // className="relative h-full w-auto overflow-x-hidden rounded-xl border-2 border-black shadow-button"
                  onClick={() => activeImage !== index && setActiveImage(index)}
                  className="relative aspect-square overflow-x-hidden rounded-lg border-2 border-black "
                >
                  <Image
                    src={url}
                    alt="recipe image"
                    fill
                    quality={50}
                    className={`object-cover ${
                      index !== activeImage && "opacity-50"
                    }`}
                  ></Image>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
