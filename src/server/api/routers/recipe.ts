import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { recipeImages, recipeIngredients, recipes } from "~/server/db/schema";
import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";

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

      await ctx.db.insert(recipes).values({
        id: recipeId,
        userId: ctx.session.user.id,
        name: input.name,
        description: input.description,
        instructions: input.instructions,
        category: input.category,
        cookingTime: input.cookingTime,
        difficultyLevel: input.difficultyLevel,
      });

      await ctx.db.insert(recipeIngredients).values(input.ingredients.map((ingredient) => ({
        ...ingredient,
        id: randomUUID() as string,
        recipeId: recipeId as string,
      })));

      await ctx.db.insert(recipeImages).values(input.images.map(imageLink => ({
        id: randomUUID() as string,
        recipeId: recipeId as string,
        link: imageLink
      })))

      // const lastID = await ctx.db.execute(sql`select LAST_INSERT_ID()`);
      // console.log(lastID);
      // console.log("inserted id", insertedRecipe.insertId);
    }),
});
