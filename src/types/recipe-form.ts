import { type Dispatch, type SetStateAction } from "react";
import { z } from "zod";

export const createEditRecipeFormSchema = z.object({
  images: z
    .array(z.object({ key: z.string() }))
    .min(1, { message: "Add at least 1 preview image!" })
    .max(5, { message: "Add at most 5 images!" })
    .default([]),
  name: z
    .string()
    .trim()
    .min(3, { message: "Title is too short!" })
    .max(50, { message: "Title should not be longer than 50 characters." }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Describe your recipe!" })
    .max(100, { message: "Don't write a letter here!" }),
  ingredients: z
    .array(
      z.object({
        // id: z.string(),
        name: z
          .string()
          .trim()
          .min(1, { message: "Ingredients must have a name!" }),
        amount: z.coerce
          .number()
          .min(1, { message: "You must provide ingredient amount!" }),
        unit: z.union([z.literal("ml"), z.literal("g"), z.literal("pcs")]),
      }),
    )
    .min(1, "You can't make a recipe without ingredients!"),
  instructions: z
    .string()
    .trim()
    .min(10, {
      message: "Don't leave your instructions empty! (at least 10 characters)",
    })
    .max(2000),
  category: z.union([
    z.literal("breakfast"),
    z.literal("lunch"),
    z.literal("dinner"),
    z.literal("appetizers"),
    z.literal("drinks"),
    z.literal("desserts"),
  ]),
  cookingTime: z.coerce.number().min(5).max(205),
  difficultyLevel: z.union([
    z.literal("easy"),
    z.literal("intermediate"),
    z.literal("advanced"),
  ]),
});

export type CreateEditRecipeFormSchema = z.infer<
  typeof createEditRecipeFormSchema
>;

// export type RecipeImageData = {
//   index: string;
//   key: string;
//   url: string;
// } & (
//   | {
//       origin: "added";
//       file: File;
//     }
//   | {
//       origin: "fetched";
//     }
// );

export type LocalImageData = {
  order: number;
  key: string;
  url: string;
  origin: "added";
  file: File;
};

export type FetchedImageData = {
  order: number;
  key: string;
  url: string;
  origin: "fetched";
};

export type TotalImageData = LocalImageData | FetchedImageData;

export type Fetched = {
  images: FetchedImageData[];
  toDelete: string[];
};

export type ImageActions = {
  setLocalImages: Dispatch<SetStateAction<LocalImageData[]>>;
  setFetched: Dispatch<SetStateAction<Fetched>>;
  // setImageKeysToDelete: Dispatch<SetStateAction<string[]>>;
};

export type CreationState = "idle" | "uploading" | "redirecting" | "error";

export type EditRecipeFormDefaultValues = Omit<
  CreateEditRecipeFormSchema,
  "images"
> & {
  images: { key: string; url: string }[];
};
