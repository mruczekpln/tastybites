import { api } from "~/trpc/server";
import { type EditRecipeFormDefaultValues } from "~/types/recipe-form";
import EditRecipeForm from "./form";

export default async function EditRecipeFormWrapper({
  searchParams: { recipeId },
}: {
  searchParams: { recipeId: string };
}) {
  const { recipeData, imageData, ingredientData } =
    await api.recipe.getByIdToEdit.query({
      recipeId: Number(recipeId),
    });

  return (
    <EditRecipeForm
      defaultValues={
        {
          name: recipeData?.name,
          category: recipeData?.category,
          description: recipeData?.description,
          instructions: recipeData?.instructions,
          cookingTime: recipeData?.cookingTime,
          difficultyLevel: recipeData?.difficultyLevel,
          ingredients: ingredientData,
          images: imageData,
        } as EditRecipeFormDefaultValues
      }
      recipeId={recipeId}
    ></EditRecipeForm>
  );
}
