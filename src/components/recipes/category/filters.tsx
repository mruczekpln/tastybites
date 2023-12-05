"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import getNewParams from "~/lib/get-new-params";
import FilterCheckbox from "./filters-checkbox";

type SearchFilters = {
  cookingTimeRanges: string[];
  difficultyLevels: string[];
  ratings: string[];
};

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cookingTimeRanges =
    searchParams.get("cookingTimeRanges")?.split(",") ?? [];
  const difficultyLevels =
    searchParams.get("difficultyLevels")?.split(",") ?? [];
  const ratings = searchParams.get("ratings")?.split(",") ?? [];

  const searchParamsObject = {
    ...Object.fromEntries(searchParams.entries()),
    cookingTimeRanges,
    difficultyLevels,
    ratings,
  };

  function handleChecbkoxChange(
    filterGroupKey: keyof typeof searchParamsObject,
    checkboxValue: string,
  ) {
    console.log(searchParamsObject);

    const newSearchParamsObject = {
      ...searchParamsObject,
      [filterGroupKey]: searchParamsObject[filterGroupKey].includes(
        checkboxValue,
      )
        ? searchParamsObject[filterGroupKey]
            .filter((value) => value !== checkboxValue)
            .join(",")
        : [...searchParamsObject[filterGroupKey]!, checkboxValue].join(","),
      page: "1",
    } as SearchFilters;

    console.log(newSearchParamsObject);

    router.replace(getNewParams(pathname, newSearchParamsObject), {
      scroll: false,
    });
  }

  return (
    <aside className="h-min w-1/3 rounded-lg">
      <h1 className="mb-8 text-5xl font-extrabold">Filters</h1>
      <h2 className="mb-4 text-3xl font-semibold">
        <Image
          src="/hero/arrow1.svg"
          alt="->"
          width={48}
          height={48}
          className="inline rotate-90"
        ></Image>{" "}
        Cooking Time
      </h2>
      <ul className="ml-8 flex flex-col gap-2  [&>*]:flex [&>*]:gap-4">
        <FilterCheckbox
          name="<10"
          onChange={() => handleChecbkoxChange("cookingTimeRanges", "5-10")}
          checked={cookingTimeRanges.includes("5-10")}
        >
          less than 10 mins
        </FilterCheckbox>
        <FilterCheckbox
          name="10-20"
          onChange={() => handleChecbkoxChange("cookingTimeRanges", "10-20")}
          checked={cookingTimeRanges.includes("10-20")}
        >
          10 to 20 mins
        </FilterCheckbox>
        <FilterCheckbox
          name="20-40"
          onChange={() => handleChecbkoxChange("cookingTimeRanges", "20-40")}
          checked={cookingTimeRanges.includes("20-40")}
        >
          20 to 40 mins
        </FilterCheckbox>
        <FilterCheckbox
          name="40-60"
          onChange={() => handleChecbkoxChange("cookingTimeRanges", "40-60")}
          checked={cookingTimeRanges.includes("40-60")}
        >
          40 mins to a hour
        </FilterCheckbox>
        <FilterCheckbox
          name="60-120"
          onChange={() => handleChecbkoxChange("cookingTimeRanges", "60-120")}
          checked={cookingTimeRanges.includes("60-120")}
        >
          1 to 2 hours
        </FilterCheckbox>
        <FilterCheckbox
          name=">120"
          onChange={() => handleChecbkoxChange("cookingTimeRanges", "120-130")}
          checked={cookingTimeRanges.includes("120-130")}
        >
          more than 2 hours
        </FilterCheckbox>
      </ul>
      <h2 className="my-4 text-3xl font-semibold">
        <Image
          src="/hero/arrow1.svg"
          alt="->"
          width={48}
          height={48}
          className="inline rotate-90"
        ></Image>{" "}
        Difficulty Level
      </h2>
      <ul className="ml-8 flex flex-col gap-2 [&>*]:flex [&>*]:gap-4">
        <FilterCheckbox
          name="easy"
          className="flex"
          onChange={() => handleChecbkoxChange("difficultyLevels", "easy")}
          checked={difficultyLevels.includes("easy")}
        >
          Easy
        </FilterCheckbox>
        <FilterCheckbox
          name="intermediate"
          className="flex"
          onChange={() =>
            handleChecbkoxChange("difficultyLevels", "intermediate")
          }
          checked={difficultyLevels.includes("intermediate")}
        >
          Intermediate
        </FilterCheckbox>
        <FilterCheckbox
          name="advanced"
          className="flex"
          onChange={() => handleChecbkoxChange("difficultyLevels", "advanced")}
          checked={difficultyLevels.includes("advanced")}
        >
          Advanced
        </FilterCheckbox>
      </ul>
      <h2 className="my-4 text-3xl font-semibold">
        <Image
          src="/hero/arrow1.svg"
          alt="->"
          width={48}
          height={48}
          className="inline rotate-90"
        ></Image>{" "}
        Rating
      </h2>
      <ul className="ml-8 flex flex-col gap-2 [&>*]:flex [&>*]:gap-4">
        <FilterCheckbox
          name="1-star"
          className="flex"
          onChange={() => handleChecbkoxChange("ratings", "1")}
          checked={ratings.includes("1")}
        >
          1 star
        </FilterCheckbox>
        <FilterCheckbox
          name="2-star"
          className="flex"
          onChange={() => handleChecbkoxChange("ratings", "2")}
          checked={ratings.includes("2")}
        >
          2 stars
        </FilterCheckbox>
        <FilterCheckbox
          name="3-star"
          className="flex"
          onChange={() => handleChecbkoxChange("ratings", "3")}
          checked={ratings.includes("3")}
        >
          3 stars
        </FilterCheckbox>
        <FilterCheckbox
          name="4-star"
          className="flex"
          onChange={() => handleChecbkoxChange("ratings", "4")}
          checked={ratings.includes("4")}
        >
          4 stars
        </FilterCheckbox>
        <FilterCheckbox
          name="5-star"
          className="flex"
          onChange={() => handleChecbkoxChange("ratings", "5")}
          checked={ratings.includes("5")}
        >
          5 stars
        </FilterCheckbox>
      </ul>
    </aside>
  );
}
