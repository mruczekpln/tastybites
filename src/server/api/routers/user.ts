import { and, count, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { withPagination, withSorting } from "~/server/db/dynamics";
import {
  recipeImages,
  recipeLikes,
  recipeReviews,
  recipes,
  users,
} from "~/server/db/schema";
import { type RecipeListItem } from "~/types/recipe";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getCreatedRecipes: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
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
        withMostLiked: z.boolean().optional(),
      }),
    )
    .query(
      async ({
        input: { userId, page, perPage, sortBy, withMostLiked = false },
        ctx,
      }) => {
        const createdRecipeListBaseQuery = ctx.db
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
            titleImageUrl: recipeImages.url,
          })
          .from(recipes)
          .where(eq(recipes.creatorId, userId ?? ctx.session!.user.id))
          .leftJoin(recipeReviews, eq(recipes.id, recipeReviews.recipeId))
          .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
          .leftJoin(users, eq(recipes.creatorId, users.id))
          .leftJoin(
            recipeImages,
            and(
              eq(recipes.id, recipeImages.recipeId),
              eq(recipeImages.isTitle, true),
            ),
          )
          .groupBy(recipes.id, recipeImages.url)
          .orderBy(desc(recipes.createdAt))
          .$dynamic();

        withPagination(createdRecipeListBaseQuery, page, perPage);
        if (sortBy) withSorting(createdRecipeListBaseQuery, sortBy);

        const createdRecipeList =
          (await createdRecipeListBaseQuery) as RecipeListItem[];

        if (withMostLiked) {
          const [mostLiked] = await ctx.db
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
              titleImageUrl: recipeImages.url,
            })
            .from(recipes)
            .where(eq(recipes.creatorId, userId ?? ctx.session!.user.id))
            .orderBy(sql`like_count desc`)
            .leftJoin(recipeReviews, eq(recipes.id, recipeReviews.recipeId))
            .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
            .leftJoin(
              recipeImages,
              and(
                eq(recipes.id, recipeImages.recipeId),
                eq(recipeImages.isTitle, true),
              ),
            )
            .groupBy(recipes.id, recipeImages.url)
            .limit(1);

          return { createdRecipeList, mostLiked: mostLiked as RecipeListItem };
        } else return { createdRecipeList };
      },
    ),

  getLikedRecipes: protectedProcedure
    .input(
      z.object({ userId: z.string(), page: z.number(), perPage: z.number() }),
    )
    .query(async ({ input: { userId, page, perPage }, ctx }) => {
      const likedRecipeListBaseQuery = ctx.db
        .select({
          id: recipes.id,
          name: recipes.name,
          username: users.name,
          category: recipes.category,
          difficultyLevel: recipes.difficultyLevel,
          cookingTime: recipes.cookingTime,
          likeCount: count(recipeLikes.id).as("like_count"),
          reviewCount: count(recipeReviews.id),
          averageRating:
            sql<number>`COALESCE(AVG(${recipeReviews.rating}), 0)`.as(
              "average_rating",
            ),
          titleImageUrl: recipeImages.url,
        })
        .from(recipes)
        .where(eq(recipeLikes.likedById, userId))
        .leftJoin(users, eq(recipes.creatorId, users.id))
        .leftJoin(recipeReviews, eq(recipes.id, recipeReviews.recipeId))
        .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
        .leftJoin(
          recipeImages,
          and(
            eq(recipes.id, recipeImages.recipeId),
            eq(recipeImages.isTitle, true),
          ),
        )
        .groupBy(recipes.id, recipeImages.url)
        .orderBy(desc(recipes.createdAt))
        .$dynamic();

      withPagination(likedRecipeListBaseQuery, page, perPage);

      const likedRecipeList = await likedRecipeListBaseQuery;

      return likedRecipeList as RecipeListItem[];
    }),

  getData: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input: { username }, ctx }) => {
      return await ctx.db.transaction(async (tx) => {
        const [userData] = await tx
          .select()
          .from(users)
          .where(eq(users.name, username))
          .limit(1);

        if (!userData) {
          tx.rollback();
          return {
            userData: null,
            userRecipes: null,
            createdRecipesCount: null,
            createdRecipesLikesCount: null,
          };
        }

        const [createdRecipesCount] = await tx
          .select({
            createdRecipes: count(recipes.id),
          })
          .from(recipes)
          .where(eq(recipes.creatorId, userData.id));

        const [createdRecipesLikesCount] = await tx
          .select({
            createdRecipesLikes: count(recipeLikes.recipeId),
          })
          .from(recipeLikes)
          .where(eq(recipeLikes.creatorId, userData.id));

        return {
          userData,
          createdRecipesCount: createdRecipesCount?.createdRecipes,
          createdRecipesLikesCount:
            createdRecipesLikesCount?.createdRecipesLikes,
        };
      });
    }),
});
