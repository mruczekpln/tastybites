import { type InferSelectModel } from "drizzle-orm";
import { type recipeReviews } from "./server/db/schema";

export type RecipeListItem = {
  id: string;
  name: string;
  cookingTime: number;
  difficultyLevel: string;
  category: string;
  likeCount: number;
  username?: string | null;
  reviewCount: number;
  averageRating: number;
  isUserLiking?: 0 | 1;
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

export type PaginationSearchParams = {
  page?: number;
  perPage?: number;
};

export type SortBy = "likes" | "rating" | "latest" | "name";

export type RecipeListSearchParams = {
  searchQuery?: string;
  cookingTimeRanges?: string;
  difficultyLevels?: string;
  ratings?: string;
  sortBy?: SortBy;
} & PaginationSearchParams;
