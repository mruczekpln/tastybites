import { type InferSelectModel } from "drizzle-orm";
import { type recipeReviews } from "./server/db/schema";

export type RecipeListItem = {
  id: string;
  name: string;
  cookingTime: number;
  difficultyLevel: string;
  likeCount: number;
  username: string | null;
  reviewCount: number;
  isUserLiking: 0 | 1;
};

export type RecipeCategory =
  | "all"
  | "breakfast"
  | "lunch"
  | "dinner"
  | "appetizers"
  | "drinks"
  | "desserts";

export type RecipeCategoryData = Record<
  RecipeCategory,
  {
    name: string;
    titleText: string;
    subtitleText: string;
    href: string;
    imagePath?: string;
    imageSize?: number;
  }
>;

type ReviewUser = {
  users: {
    image: string | null;
    name: string | null;
  };
};

export interface Review
  extends InferSelectModel<typeof recipeReviews>,
    ReviewUser {}
