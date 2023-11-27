import { createTRPCRouter } from "~/server/api/trpc";
import { accountRouter } from "./routers/auth";
import { recipeRouter } from "./routers/recipe";

export const appRouter = createTRPCRouter({
  account: accountRouter,
  recipe: recipeRouter,
});

export type AppRouter = typeof appRouter;
