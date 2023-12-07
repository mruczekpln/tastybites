import CategoryList from "~/components/recipes/category/category-list";
import RecipeList from "~/components/recipes/category/recipe-list";
import SearchBar from "~/components/recipes/category/search-bar";
import SortBy from "~/components/recipes/category/sort-by";
import RouteDisplay from "~/components/recipes/path-display";
import { CATEGORIES } from "~/lib/constants";
import { type RecipeCategory, type RecipeListSearchParams } from "~/types";

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
      <RecipeList
        searchParams={searchParams}
        category={params.category}
      ></RecipeList>
    </div>
  );
}
