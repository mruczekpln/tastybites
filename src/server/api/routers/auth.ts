import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { randomUUID } from "crypto";
import { TRPCError } from "@trpc/server";

export const accountRouter = createTRPCRouter({
  protected: protectedProcedure.query(() => ({
    message: "Hello from a protected procedure!",
  })),
  create: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const existingUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, input.email),
      });

      if (existingUser)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Account with this email already exists.",
        });

      const hashedPassword = await bcrypt.hash(input.password, 10);
      await db.insert(users).values({
        id: randomUUID(),
        email: input.email,
        name: input.username,
        hashedPassword,
      });

      return {
        success: true,
      };
    }),
});
