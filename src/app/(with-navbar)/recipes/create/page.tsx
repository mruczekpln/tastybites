import { redirect } from "next/navigation";
import CreateRecipeForm from "~/components/recipes/create/form";
import { getServerAuthSession } from "~/server/auth";

export default async function CreateRecipe() {
  const session = await getServerAuthSession();
  if (!session) redirect("/auth/login");

  return (
    <div className="w-full bg-yellow-50 pb-16 pt-32">
      <CreateRecipeForm></CreateRecipeForm>
    </div>
  );
}
