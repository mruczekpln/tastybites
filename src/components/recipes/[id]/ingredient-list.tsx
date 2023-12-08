import { unstable_cache } from "next/cache";
import { db } from "~/server/db";

const getRecipeIngredients = unstable_cache(
  async (id: number) => {
    const ingredients = await db.query.recipeIngredients.findMany({
      where: (recipeIngredients, { eq }) => eq(recipeIngredients.recipeId, id),
    });

    return ingredients;
  },
  ["recipe-ingredients-data"],
  { revalidate: 120 },
);

type RecipeIngredientListProps = {
  recipeId: number;
};
export default async function RecipeIngredientList({
  recipeId,
}: RecipeIngredientListProps) {
  const ingredientsData = await getRecipeIngredients(recipeId);

  return (
    <>
      <h2 className="mb-4 mt-16 text-4xl font-bold">Ingredients</h2>
      <div className="grid grid-cols-4 gap-4 text-xl">
        {ingredientsData.map((ingredient, index) => (
          <div
            key={index}
            className="rounded-lg border-2 border-black bg-gray-200 py-4 pl-8 shadow-button"
          >
            <b>
              {ingredient.amount}
              {ingredient.unit}
            </b>{" "}
            - {ingredient.name}
          </div>
        ))}
      </div>
    </>
  );
}
