import { api } from "~/trpc/server";
import RecommendationCard from "./recommendation-card";

type RecommendationListProps = {
  type: "latest" | "liked";
};

export default async function RecommendationList({
  type,
}: RecommendationListProps) {
  const recipeRecommendationList = await api.recipe.getRecommendations.query({
    type,
  });

  return (
    <>
      {recipeRecommendationList.map((recommendation, index) => (
        <RecommendationCard
          key={`${recommendation.name}_${index}`}
          data={{
            id: recommendation.id,
            name: recommendation.name,
            titleImageUrl: recommendation.titleImageUrl!,
            username: recommendation.username!,
          }}
        />
      ))}
    </>
  );
}
