import CategoryList from "~/components/recipes/category-list";
import Filters from "~/components/recipes/filters";
import Pagination from "~/components/recipes/pagination";
import RouteDisplay from "~/components/recipes/path-display";
import RecipeCard from "~/components/recipes/recipe-card";
import SearchBar from "~/components/recipes/search-bar";
import SortBy from "~/components/recipes/sort-by";
import { categories } from "~/lib/categories";
import { type RecipeCategory } from "~/types";

export default function Category({
  params,
}: {
  params: { category: RecipeCategory };
}) {
  const currentCategory = categories[params.category];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col items-center pt-32">
      <RouteDisplay
        arr={currentCategory.href.split("/").slice(1)}
      ></RouteDisplay>
      <div className="my-4">
        <h1 className="text-center font-title text-5xl font-extrabold">
          {currentCategory.titleText}
        </h1>
        <p className="py-4 text-center text-xl">
          {currentCategory.subtitleText}
        </p>
      </div>
      <SearchBar></SearchBar>
      <div className="flex w-full justify-between">
        <CategoryList></CategoryList>
        <SortBy></SortBy>
      </div>
      <div className="mb-12 mt-8 flex w-full max-w-screen-2xl gap-12">
        <Filters></Filters>
        <section className="flex w-2/3 flex-col gap-8">
          {new Array(10).fill(null).map((_, index) => (
            <RecipeCard key={index}></RecipeCard>
          ))}
          <Pagination></Pagination>
        </section>
      </div>
    </div>
  );
}
