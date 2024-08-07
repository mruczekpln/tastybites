import { TRPCError } from "@trpc/server";
import {
  and,
  count,
  countDistinct,
  desc,
  eq,
  exists,
  inArray,
  like,
  sql,
  between,
  or,
  type SQL,
} from "drizzle-orm";
import { PgDialect } from "drizzle-orm/pg-core";
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
import { type RecipeListItem } from "~/types/recipe";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { publicProcedure } from "../trpc";

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
          console.log("COOKING TIME RANGE", cookingTimeRangeArr);
          filters.push(
            or(
              ...cookingTimeRangeArr.map((range) => {
                const min = Number(range.split("-")[0]);
                const max = Number(range.split("-")[1]);

                return between(recipes.cookingTime, min, max);
              }),
            )!,
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
            ...(userId && {
              isUserLiking: exists(
                ctx.db
                  .select()
                  .from(recipeLikes)
                  .where(
                    and(
                      eq(recipeLikes.likedById, userId),
                      eq(recipeLikes.recipeId, recipes.id),
                    ),
                  )
                  .limit(1),
              ),
            }),
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
          ...(userId && {
            isUserLiking: exists(
              ctx.db
                .select()
                .from(recipeLikes)
                .where(
                  and(
                    eq(recipeLikes.likedById, userId),
                    eq(recipeLikes.recipeId, recipes.id),
                  ),
                )
                .limit(1),
            ),
          }),
        })
        .from(recipes)
        .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
        .leftJoin(users, eq(recipes.creatorId, users.id))
        .where(eq(recipes.id, recipeId))
        .groupBy(recipes.id, users.name)
        .limit(1);

      const ingredients = await ctx.db
        .select({
          id: recipeIngredients.id,
          name: recipeIngredients.name,
          amount: recipeIngredients.amount,
          unit: recipeIngredients.unit,
        })
        .from(recipeIngredients)
        .where(eq(recipeIngredients.recipeId, recipeId));

      return { recipeData: recipe, ingredients };
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
        .orderBy(recipeImages.order);

      return images;
    }),

  getByIdToEdit: protectedProcedure
    .input(z.object({ recipeId: z.number() }))
    .query(async ({ input: { recipeId }, ctx }) => {
      const [recipe] = await ctx.db
        .select({ creatorId: recipes.creatorId })
        .from(recipes)
        .where(eq(recipes.id, recipeId))
        .limit(1);

      if (recipe?.creatorId !== ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const [recipeData] = await ctx.db
        .select({
          id: recipes.id,
          name: recipes.name,
          description: recipes.description,
          category: recipes.category,
          cookingTime: recipes.cookingTime,
          difficultyLevel: recipes.difficultyLevel,
          instructions: recipes.instructions,
        })
        .from(recipes)
        .where(
          and(
            eq(recipes.id, recipeId),
            eq(recipes.creatorId, ctx.session.user.id),
          ),
        )
        .limit(1);

      const imageData = await ctx.db
        .select({
          key: recipeImages.key,
          url: recipeImages.url,
        })
        .from(recipeImages)
        .where(eq(recipeImages.recipeId, recipeId))
        .orderBy(recipeImages.order);

      const ingredientData = await ctx.db
        .select({
          name: recipeIngredients.name,
          amount: recipeIngredients.amount,
          unit: recipeIngredients.unit,
        })
        .from(recipeIngredients)
        .where(eq(recipeIngredients.recipeId, recipeId));

      return { recipeData, imageData, ingredientData };
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
        const insertId = await tx
          .insert(recipes)
          .values({
            creatorId: ctx.session.user.id,
            name: input.name,
            description: input.description,
            instructions: input.instructions,
            category: input.category,
            cookingTime: input.cookingTime,
            difficultyLevel: input.difficultyLevel,
          })
          .returning({ insertId: recipes.id })
          .then((returned) => returned[0]?.insertId ?? null);

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

  edit: protectedProcedure
    .input(
      z.object({
        recipeId: z.number(),
        data: z.object({
          name: z.string(),
          description: z.string(),
          ingredients: z.array(
            z.object({
              name: z.string(),
              amount: z.number(),
              unit: z.union([
                z.literal("ml"),
                z.literal("g"),
                z.literal("pcs"),
              ]),
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
        images: z.object({
          toDelete: z.array(z.string()),
          toEdit: z.array(
            z.object({
              url: z.string(),
              key: z.string(),
              isTitle: z.boolean(),
              order: z.number(),
            }),
          ),
        }),
      }),
    )
    .mutation(
      async ({
        input: {
          recipeId,
          data,
          images: { toDelete, toEdit },
        },
        ctx,
      }) => {
        const [recipe] = await ctx.db
          .select({ creatorId: recipes.creatorId })
          .from(recipes)
          .where(eq(recipes.id, recipeId))
          .limit(1);

        if (recipe?.creatorId !== ctx.session.user.id) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        const { ingredients, ...recipeData } = data;
        const result = await ctx.db.transaction(async (tx) => {
          await tx
            .update(recipes)
            .set(recipeData)
            .where(eq(recipes.id, recipeId));

          await tx
            .delete(recipeIngredients)
            .where(eq(recipeIngredients.recipeId, recipeId));

          await tx.insert(recipeIngredients).values(
            ingredients.map((ingredient) => ({
              ...ingredient,
              recipeId,
            })),
          );
        });

        for (const key of toDelete) {
          await utapi.deleteFiles([key]);
        }

        await ctx.db
          .delete(recipeImages)
          .where(and(eq(recipeImages.recipeId, recipeId)));

        if (toEdit.length > 0)
          await ctx.db.insert(recipeImages).values(
            toEdit.map(({ url, key, isTitle, order }) => ({
              url,
              key,
              recipeId,
              isTitle,
              order,
            })),
          );

        return result;
      },
    ),

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

  getRecommendations: publicProcedure
    .input(
      z.object({ type: z.union([z.literal("latest"), z.literal("liked")]) }),
    )
    .query(async ({ input: { type }, ctx }) => {
      const recipeRecommendationsBaseQuery = ctx.db
        .select({
          id: recipes.id,
          username: users.name,
          name: recipes.name,
          likeCount: countDistinct(recipeLikes.id).as("like_count"),
          titleImageUrl: recipeImages.url,
        })
        .from(recipes)
        .leftJoin(users, eq(recipes.creatorId, users.id))
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

      if (type === "latest") {
        void recipeRecommendationsBaseQuery.orderBy(desc(recipes.createdAt));
      } else {
        void recipeRecommendationsBaseQuery.orderBy(sql`like_count desc`);
      }

      void recipeRecommendationsBaseQuery.limit(3);

      const recipeRecommendations = await recipeRecommendationsBaseQuery;

      return recipeRecommendations;
    }),
});
