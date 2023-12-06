import { randomUUID } from "crypto";
import {
  and,
  asc,
  count,
  desc,
  eq,
  inArray,
  like,
  sql,
  type SQL,
} from "drizzle-orm";
import { z } from "zod";
import {
  recipeImages,
  recipeIngredients,
  recipeLikes,
  recipeReviews,
  recipes,
  users,
} from "~/server/db/schema";
import { type RecipeListItem } from "~/types";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

// edit recipe
// delete recipe
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
          difficultyLevelsArr: z.array(z.string()),
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
        const recipeListWhere: SQL[] = [];

        if (category !== "all")
          recipeListWhere.push(eq(recipes.category, category));
        if (searchQuery)
          recipeListWhere.push(like(recipes.name, `%${searchQuery}%`));
        if (difficultyLevelsArr.length > 0)
          recipeListWhere.push(
            inArray(recipes.difficultyLevel, difficultyLevelsArr),
          );
        if (cookingTimeRangeArr.length > 0) {
          recipeListWhere.push(
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
            likeCount: count(recipeLikes.id).as("like_count"),
            reviewCount: count(recipeReviews.id),
            averageRating:
              sql<number>`CASE WHEN AVG(${recipeReviews.rating}) THEN AVG(${recipeReviews.rating}) ELSE 0 END`.as(
                "average_rating",
              ),
            ...(userId
              ? {
                  isUserLiking: sql.raw(
                    `MAX(CASE WHEN tastybites_recipe_like.user_id = '${userId}' THEN 1 ELSE 0 END)`,
                  ),
                }
              : {}),
          })
          .from(recipes)
          .where(and(...recipeListWhere))
          .leftJoin(users, eq(recipes.userId, users.id))
          .leftJoin(recipeReviews, eq(recipes.id, recipeReviews.recipeId))
          .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
          .groupBy(recipes.id, users.name)
          .$dynamic();

        if (ratingsArr.length > 0)
          void recipeListBaseQuery.having(
            inArray(sql`ROUND(AVG(${recipeReviews.rating}), 0)`, ratingsArr),
          );

        if (sortBy === "likes")
          void recipeListBaseQuery.orderBy(sql`like_count desc`);
        else if (sortBy === "name")
          void recipeListBaseQuery.orderBy(asc(recipes.name));
        else if (sortBy === "rating")
          void recipeListBaseQuery.orderBy(sql`average_rating desc`);
        else if (sortBy === "latest")
          void recipeListBaseQuery.orderBy(desc(recipes.createdAt));

        void recipeListBaseQuery
          .limit(perPage + 1 || 11)
          .offset((page - 1) * perPage);

        console.log(recipeListBaseQuery.toSQL());
        const recipeList = await recipeListBaseQuery;

        return recipeList as RecipeListItem[];
      },
    ),

  getById: publicProcedure
    .input(z.object({ recipeId: z.string(), userId: z.string().optional() }))
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
          username: users.name,
          like_count: sql`COUNT(${recipeLikes.id})`,
          ...(userId
            ? {
                isUserLiking: sql.raw(
                  `MAX(CASE WHEN tastybites_recipe_like.user_id = '${userId}' THEN 1 ELSE 0 END)`,
                ),
              }
            : {}),
        })
        .from(recipes)
        .leftJoin(recipeLikes, eq(recipes.id, recipeLikes.recipeId))
        .leftJoin(users, eq(recipes.userId, users.id))
        .where(eq(recipes.id, recipeId))
        .groupBy(
          recipes.id,
          recipes.instructions,
          recipes.userId,
          recipes.name,
          recipes.description,
          recipes.category,
          recipes.cookingTime,
          recipes.difficultyLevel,
          recipes.createdAt,
        )
        .limit(1);

      return recipe;
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
        difficultyLevel: z.string(),
        images: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const recipeId = randomUUID();

      await ctx.db.transaction(async (tx) => {
        await tx.insert(recipes).values({
          id: recipeId,
          userId: ctx.session.user.id,
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
            id: randomUUID() as string,
            recipeId: recipeId as string,
          })),
        );

        await tx.insert(recipeImages).values(
          input.images.map((imageLink) => ({
            id: randomUUID() as string,
            recipeId: recipeId as string,
            link: imageLink,
          })),
        );
      });

      return { id: recipeId as string };
    }),

  handleLikeRecipe: protectedProcedure
    .input(
      z.object({
        isLiked: z.boolean(),
        recipeId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.isLiked) {
        await ctx.db
          .delete(recipeLikes)
          .where(
            and(
              eq(recipeLikes.userId, ctx.session.user.id),
              eq(recipeLikes.recipeId, input.recipeId),
            ),
          );
      } else {
        await ctx.db.insert(recipeLikes).values({
          id: randomUUID(),
          recipeId: input.recipeId,
          userId: ctx.session.user.id,
        });
      }
    }),

  addReview: protectedProcedure
    .input(
      z.object({
        recipeId: z.string(),
        content: z.string(),
        rating: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(recipeReviews).values({
        id: randomUUID(),
        userId: ctx.session.user.id,
        recipeId: input.recipeId,
        content: input.content,
        rating: input.rating,
      });
    }),

  deleteReview: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
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
