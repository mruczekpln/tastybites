import { count, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/db";
import { withPagination, withSorting } from "~/server/db/dynamics";
import { recipeLikes, recipeReviews, recipes } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getCreatedRecipes: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        page: z.number(),
        perPage: z.number(),
        sortBy: z
          .union([
            z.literal("likes"),
            z.literal("latest"),
            z.literal("rating"),
            z.literal("name"),
          ])
          .optional(),
      }),
    )
    .query(async ({ input: { userId, page, perPage, sortBy } }) => {
      const createdRecipeListBaseQuery = db
        .select({
          id: recipes.id,
          name: recipes.name,
          category: recipes.category,
          difficultyLevel: recipes.difficultyLevel,
          cookingTime: recipes.cookingTime,
          likeCount: count(recipeLikes.id).as("like_count"),
          reviewCount: count(recipeReviews.id),
          averageRating:
            sql<number>`COALESCE(AVG(${recipeReviews.rating}), 0)`.as(
              "average_rating",
            ),
        })
        .from(recipes)
        .where(eq(recipes.creatorId, userId))
        .leftJoin(recipeReviews, eq(recipes.id, recipeReviews.recipeId))
        .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
        .groupBy(recipes.id)
        .orderBy(desc(recipes.createdAt))
        .$dynamic();

      withPagination(createdRecipeListBaseQuery, page, perPage);
      if (sortBy) withSorting(createdRecipeListBaseQuery, sortBy);

      const createdRecipeList = await createdRecipeListBaseQuery;

      return createdRecipeList;
    }),
});
