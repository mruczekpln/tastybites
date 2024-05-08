export type RecipeListItem = {
  id: number;
  name: string;
  cookingTime: number;
  difficultyLevel: string;
  category: string;
  likeCount: number;
  username?: string | null;
  reviewCount: number;
  averageRating: number;
  isUserLiking?: 0 | 1;
  titleImageUrl: string;
};

export type RecipeIngredient = {
  name: string;
  amount: number;
  unit: string;
};

export type ReviewListItem = {
  id: number;
  rating: number;
  content: string;
  createdAt: Date;

  userId: string | null;
  userName: string | null;
  userAvatar: string | null;
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
