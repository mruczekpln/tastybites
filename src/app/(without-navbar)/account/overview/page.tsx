import { Bookmark, Heart, Save } from "lucide-react";
import { type ComponentProps } from "react";
import cn from "~/components/cn";
import RecipeCard from "~/components/recipes/category/recipe-card";

type OverviewCardProps = ComponentProps<"div">;
function OverviewCard({ className, children }: OverviewCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 border-black bg-yellow-100 p-4 shadow-button",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function AccountOverview() {
  return (
    <div className="flex h-auto w-full max-w-screen-2xl flex-col gap-8">
      <h1 className="font-title text-5xl">Hello, cytryneq95</h1>
      <div className="flex w-full gap-8 [&>*]:w-full">
        <OverviewCard className="flex flex-wrap items-center justify-between">
          <h2 className="text-3xl font-bold">With us for</h2>
          <p className="w-1/2 text-right text-2xl">32 days</p>
          <p>
            since: <i>17th October</i>
          </p>
        </OverviewCard>
        <OverviewCard className="flex flex-wrap items-center justify-between">
          <h2 className="text-3xl font-bold">Saved Recipes</h2>
          <p className="w-1/3 text-right text-2xl">16</p>
          <u>
            go to favorites
            {/* <ChevronRight className="ml-2 inline" size={20}></ChevronRight> */}
          </u>
        </OverviewCard>
        <OverviewCard className="flex flex-wrap items-center justify-between">
          <h2 className="text-3xl font-bold">Posted recipes</h2>
          <p className="w-1/3 text-right text-2xl">3</p>
          <u>
            go to your recipes
            {/* <ChevronRight className="ml-2 inline" size={20}></ChevronRight> */}
          </u>
        </OverviewCard>
      </div>
      {/* <OverviewCard className="flex flex-col gap-4 bg-yellow-50"> */}
      <hr />
      {/* <div className="flex justify-between"> */}
      <h2 className="text-3xl">Your recipes earned:</h2>
      <div className="flex items-center">
        <Heart size={32}></Heart>
        <p className="mx-4 text-2xl">16</p>
        <Bookmark size={32}></Bookmark>
        <p className="ml-4 text-2xl">3</p>
      </div>
      {/* </div> */}
      <hr />
      <h2 className="text-4xl">Recently viewed recipes</h2>
      <RecipeCard></RecipeCard>
      <RecipeCard></RecipeCard>
      <RecipeCard></RecipeCard>
      {/* </OverviewCard> */}
    </div>
  );
}
