import { RecipeListItem } from "~/types";
import Pagination from "../pagination";
import RecipeCard from "../recipe-card";
import Filters from "./filters";

type RecipeListProps = {
  recipeList: RecipeListItem[];
};
export default function RecipeList({ recipeList }: RecipeListProps) {
  return (
    <div className="mb-12 mt-8 flex w-full max-w-screen-2xl gap-12">
      <Filters></Filters>
      <section className="flex w-2/3 flex-col gap-8">
        {recipeList.map((recipe, index) => (
          <RecipeCard data={recipe} key={index}></RecipeCard>
        ))}

        {recipeList.length > 10 && <Pagination></Pagination>}
      </section>
    </div>
  );
}
