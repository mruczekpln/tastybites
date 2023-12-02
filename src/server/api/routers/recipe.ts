import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import {
  recipeImages,
  recipeIngredients,
  recipeLikes,
  recipeReviews,
  recipes,
} from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// edit recipe
// delete recipe
export const recipeRouter = createTRPCRouter({
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
