import { type RecipeIngredient } from "~/types/recipe";

type RecipeIngredientListProps = {
  ingredients: RecipeIngredient[];
};

export default function RecipeIngredientList({
  ingredients,
}: RecipeIngredientListProps) {
  return (
    <>
      <h2 className="mb-4 mt-16 text-4xl font-bold">Ingredients</h2>
      <div className="grid grid-cols-4 gap-4 text-xl">
        {ingredients.map((ingredient) => (
          <div
            key={"ingredient-" + ingredient.name}
            className="flex items-center justify-center rounded-lg border-2 border-black bg-gray-200 p-4 shadow-button"
          >
            <p>
              <b>
                {ingredient.amount}
                {ingredient.unit}
              </b>{" "}
              - {ingredient.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
