import { Suspense } from "react";
import CategoryList from "~/components/recipes/category/category-list";
import Filters from "~/components/recipes/category/filters";
import CategoryRecipeList from "~/components/recipes/category/recipe-list";
import SearchBar from "~/components/recipes/category/search-bar";
import SortBy from "~/components/recipes/category/sort-by";
import RouteDisplay from "~/components/recipes/path-display";
import LoadingSpinnner from "~/components/ui/loading-spinner";
import { CATEGORIES } from "~/lib/constants";
import {
  type RecipeCategory,
  type RecipeListSearchParams,
} from "~/types/recipe";
export default function Category({
  params,
  searchParams,
}: {
  params: { category: RecipeCategory };
  searchParams: RecipeListSearchParams;
}) {
  const currentCategoryDetails = CATEGORIES[params.category];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col items-center pt-32">
      <RouteDisplay
        arr={[
          { displayedName: "recipes", href: "/recipes" },
          { displayedName: currentCategoryDetails.name },
        ]}
      ></RouteDisplay>
      <div className="my-4">
        <h1 className="text-center font-title text-5xl font-extrabold">
          {currentCategoryDetails.titleText}
        </h1>
        <p className="py-4 text-center text-xl">
          {currentCategoryDetails.subtitleText}
        </p>
      </div>
      <SearchBar category={params.category}></SearchBar>
      <div className="flex w-full justify-between">
        <CategoryList></CategoryList>
        <SortBy></SortBy>
      </div>
      <div className="mb-12 mt-8 flex w-full max-w-screen-2xl gap-12">
        <Filters></Filters>
        <Suspense
          fallback={
            <div className="flex w-full justify-center pt-8">
              <LoadingSpinnner></LoadingSpinnner>
            </div>
          }
        >
          <CategoryRecipeList
            searchParams={searchParams}
            category={params.category}
          ></CategoryRecipeList>
        </Suspense>
      </div>
    </div>
  );
}
