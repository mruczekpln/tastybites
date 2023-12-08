import { eq } from "drizzle-orm";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { recipeImages, recipes, users } from "~/server/db/schema";

const f = createUploadthing();

export const tastybitesFileRouter = {
  accountPicture: f({
    image: {
      maxFileCount: 1,
    },
  })
    .input(z.object({ userId: z.string() }))
    .middleware(async ({ input }) => {
      const session = await getServerAuthSession();

      if (!session || input.userId !== session.user.id)
        throw new Error("Unauthorized");

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file, metadata: { userId } }) => {
      console.log(`updated profile picture for userId = ${userId}`);

      await db
        .update(users)
        .set({ image: file.url })
        .where(eq(users.id, userId));
    }),

  recipeImage: f({
    image: {
      maxFileCount: 5,
      maxFileSize: "2MB",
    },
  })
    .input(z.object({ recipeId: z.number(), isTitle: z.boolean().optional() }))
    .middleware(async ({ input: { recipeId, isTitle } }) => {
      const session = await getServerAuthSession();

      if (!session) throw new Error("Not logged in!");

      return { recipeId, isTitle };
    })
    .onUploadComplete(async ({ file, metadata: { recipeId, isTitle } }) => {
      console.log(`uploaded with recipeid = ${recipeId}`);

      await db
        .insert(recipeImages)
        .values({ recipeId, url: file.url, isTitle });
      // else
      //   await db
      //     .update(recipes)
      //     .where(eq(recipes.id, recipeId));
    }),
} satisfies FileRouter;

export type TastybitesFileRouter = typeof tastybitesFileRouter;
