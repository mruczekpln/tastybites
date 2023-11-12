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
    imageSize?: number;
  }
>;
