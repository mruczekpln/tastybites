import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { recipeImages, users } from "~/server/db/schema";

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
      maxFileCount: 1,
      maxFileSize: "2MB",
    },
  })
    .input(
      z.object({
        recipeId: z.number(),
        isTitle: z.boolean().optional(),
        order: z.number(),
      }),
    )
    .middleware(async ({ input: { recipeId, isTitle, order } }) => {
      const session = await getServerAuthSession();

      if (!session) throw new Error("Not logged in!");

      return { recipeId, isTitle, order };
    })
    .onUploadComplete(
      async ({
        file: { url, key },
        metadata: { recipeId, isTitle, order },
      }) => {
        console.log(`uploaded with recipeid = ${recipeId}`);

        await db
          .insert(recipeImages)
          .values({ recipeId, url, key, isTitle, order });
      },
    ),
} satisfies FileRouter;

export type TastybitesFileRouter = typeof tastybitesFileRouter;
