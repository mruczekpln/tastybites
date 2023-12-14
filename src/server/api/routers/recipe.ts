import { TRPCError } from "@trpc/server";
import {
  and,
  count,
  countDistinct,
  eq,
  inArray,
  like,
  sql,
  type SQL,
} from "drizzle-orm";
import { z } from "zod";
import { withPagination, withSorting } from "~/server/db/dynamics";
import {
  recipeImages,
  recipeIngredients,
  recipeLikes,
  recipeReviews,
  recipes,
  users,
} from "~/server/db/schema";
import { utapi } from "~/server/uploadthing";
import { type RecipeListItem } from "~/types";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { publicProcedure } from "./../trpc";

export const recipeRouter = createTRPCRouter({
  getPage: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        category: z.string(),
        params: z.object({
          page: z.number(),
          perPage: z.number(),
          sortBy: z.string(),
          searchQuery: z.string().optional(),
          cookingTimeRangeArr: z.array(z.string()),
          difficultyLevelsArr: z.array(
            z.union([
              z.literal("easy"),
              z.literal("intermediate"),
              z.literal("advanced"),
            ]),
          ),
          ratingsArr: z.array(z.string()),
        }),
      }),
    )
    .query(
      async ({
        input: {
          userId,
          category,
          params: {
            page,
            perPage,
            sortBy,
            searchQuery,
            cookingTimeRangeArr,
            difficultyLevelsArr,
            ratingsArr,
          },
        },
        ctx,
      }) => {
        const filters: SQL[] = [];

        if (category !== "all") filters.push(eq(recipes.category, category));
        if (searchQuery) filters.push(like(recipes.name, `%${searchQuery}%`));
        if (difficultyLevelsArr.length > 0)
          filters.push(inArray(recipes.difficultyLevel, difficultyLevelsArr));
        if (cookingTimeRangeArr.length > 0) {
          filters.push(
            sql.raw(
              `(${cookingTimeRangeArr
                .map(
                  (range) =>
                    `(tastybites_recipe.cooking_time BETWEEN  ${
                      range.split("-")[0]
                    } AND ${range.split("-")[1]})`,
                )
                .join(" OR ")})`,
            ),
          );
        }

        const recipeListBaseQuery = ctx.db
          .select({
            id: recipes.id,
            name: recipes.name,
            category: recipes.category,
            difficultyLevel: recipes.difficultyLevel,
            cookingTime: recipes.cookingTime,
            username: users.name,
            likeCount: countDistinct(recipeLikes.id).as("like_count"),
            reviewCount: countDistinct(recipeReviews.id),
            averageRating:
              sql<number>`COALESCE(AVG(${recipeReviews.rating}), 0)`.as(
                "average_rating",
              ),
            ...(userId
              ? {
                  isUserLiking: sql.raw(
                    `MAX(CASE WHEN tastybites_recipe_like.liked_by_id = '${userId}' THEN 1 ELSE 0 END)`,
                  ),
                }
              : {}),
            titleImageUrl: recipeImages.url,
          })
          .from(recipes)
          .where(and(...filters))
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
          .groupBy(recipes.id, users.name, recipeImages.url)
          .$dynamic();

        if (ratingsArr.length > 0)
          void recipeListBaseQuery.having(
            inArray(sql`ROUND(AVG(${recipeReviews.rating}), 0)`, ratingsArr),
          );

        withSorting(recipeListBaseQuery, sortBy);
        withPagination(recipeListBaseQuery, page, perPage);

        const recipeList = await recipeListBaseQuery;
        console.log(recipeList);

        return recipeList as RecipeListItem[];
      },
    ),

  getById: publicProcedure
    .input(z.object({ recipeId: z.number(), userId: z.string().optional() }))
    .query(async ({ input: { recipeId, userId }, ctx }) => {
      const [recipe] = await ctx.db
        .select({
          id: recipes.id,
          instructions: recipes.instructions,
          name: recipes.name,
          description: recipes.description,
          category: recipes.category,
          cookingTime: recipes.cookingTime,
          difficultyLevel: recipes.difficultyLevel,
          createdAt: recipes.createdAt,
          ownerId: recipes.creatorId,
          username: users.name,
          like_count: count(recipeLikes.id),
          ...(userId
            ? {
                isUserLiking: sql.raw(
                  `MAX(CASE WHEN tastybites_recipe_like.liked_by_id = '${userId}' THEN 1 ELSE 0 END)`,
                ),
              }
            : {}),
        })
        .from(recipes)
        .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
        .leftJoin(users, eq(recipes.creatorId, users.id))
        .where(eq(recipes.id, recipeId))
        .groupBy(
          recipes.id,
          users.name,
          // recipes.instructions,
          // recipes.creatorId,
          // recipes.name,
          // recipes.description,
          // recipes.category,
          // recipes.cookingTime,
          // recipes.difficultyLevel,
          // recipes.createdAt,
        )
        .limit(1);

      return recipe;
    }),

  getImagesById: publicProcedure
    .input(z.object({ recipeId: z.number() }))
    .query(async ({ input: { recipeId }, ctx }) => {
      const images = await ctx.db
        .select({
          url: recipeImages.url,
        })
        .from(recipeImages)
        .where(eq(recipeImages.recipeId, recipeId))
        .orderBy(recipeImages.isTitle);

      return images;
    }),

  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        ingredients: z.array(
          z.object({
            name: z.string(),
            amount: z.number(),
            unit: z.union([z.literal("ml"), z.literal("g"), z.literal("pcs")]),
          }),
        ),
        instructions: z.string(),
        category: z.string(),
        cookingTime: z.number(),
        difficultyLevel: z.union([
          z.literal("easy"),
          z.literal("intermediate"),
          z.literal("advanced"),
        ]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const insertId = await ctx.db.transaction(async (tx) => {
        console.log(input);
        const { insertId } = await tx.insert(recipes).values({
          creatorId: ctx.session.user.id,
          name: input.name,
          description: input.description,
          instructions: input.instructions,
          category: input.category,
          cookingTime: input.cookingTime,
          difficultyLevel: input.difficultyLevel,
        });

        await tx.insert(recipeIngredients).values(
          input.ingredients.map((ingredient) => ({
            ...ingredient,
            recipeId: Number(insertId),
          })),
        );

        return insertId;
      });

      return { id: insertId };
    }),

  // edit: protectedProcedure

  delete: protectedProcedure
    .input(z.object({ recipeId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const [recipe] = await ctx.db
        .select({ creatorId: recipes.creatorId })
        .from(recipes)
        .where(eq(recipes.id, input.recipeId))
        .limit(1);

      if (recipe?.creatorId !== ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db.transaction(async (tx) => {
        const images = await tx
          .select({ key: recipeImages.key })
          .from(recipeImages)
          .where(eq(recipeImages.recipeId, input.recipeId));

        await utapi.deleteFiles(images.map(({ key }) => key));

        await tx
          .delete(recipeImages)
          .where(eq(recipeImages.recipeId, input.recipeId));

        await tx
          .delete(recipeIngredients)
          .where(eq(recipeIngredients.recipeId, input.recipeId));

        await tx
          .delete(recipeReviews)
          .where(eq(recipeReviews.recipeId, input.recipeId));

        await tx
          .delete(recipeLikes)
          .where(eq(recipeLikes.recipeId, input.recipeId));

        await tx.delete(recipes).where(eq(recipes.id, input.recipeId));
      });
    }),

  handleLikeRecipe: protectedProcedure
    .input(
      z.object({
        isLiked: z.boolean(),
        recipeId: z.number(),
        creatorId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.isLiked) {
        await ctx.db
          .delete(recipeLikes)
          .where(
            and(
              eq(recipeLikes.likedById, ctx.session.user.id),
              eq(recipeLikes.recipeId, input.recipeId),
            ),
          );
      } else {
        await ctx.db.insert(recipeLikes).values({
          recipeId: input.recipeId,
          creatorId: input.creatorId,
          likedById: ctx.session.user.id,
        });
      }
    }),

  getReviewPage: publicProcedure
    .input(
      z.object({
        recipeId: z.number(),
        page: z.number(),
        perPage: z.number(),
        // sortBy: z.string(),
      }),
    )
    .query(async ({ input: { recipeId, page, perPage }, ctx }) => {
      const reviewListBaseQuery = ctx.db
        .select({
          id: recipeReviews.id,
          userId: users.id,
          userName: users.name,
          userAvatar: users.image,
          rating: recipeReviews.rating,
          content: recipeReviews.content,
          createdAt: recipeReviews.createdAt,
        })
        .from(recipeReviews)
        .where(eq(recipeReviews.recipeId, recipeId))
        .leftJoin(users, eq(users.id, recipeReviews.userId))
        .$dynamic();

      withPagination(reviewListBaseQuery, page, perPage);

      const reviewList = await reviewListBaseQuery;

      return reviewList;
    }),

  addReview: protectedProcedure
    .input(
      z.object({
        recipeId: z.number(),
        content: z.string(),
        rating: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(recipeReviews).values({
        userId: ctx.session.user.id,
        recipeId: input.recipeId,
        content: input.content,
        rating: input.rating,
      });
    }),

  deleteReview: protectedProcedure
    .input(
      z.object({
        reviewId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input)
        await ctx.db.transaction(async (tx) => {
          const [review] = await tx
            .select({ userId: recipeReviews.userId })
            .from(recipeReviews)
            .where(eq(recipeReviews.id, input.reviewId));
          if (review?.userId !== ctx.session.user.id) {
            tx.rollback();
            return;
          }

          await tx
            .delete(recipeReviews)
            .where(eq(recipeReviews.id, input.reviewId));
        });
    }),
});
