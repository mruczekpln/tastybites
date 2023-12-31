import { createTRPCRouter } from "~/server/api/trpc";
import { accountRouter } from "./routers/auth";
import { recipeRouter } from "./routers/recipe";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  account: accountRouter,
  recipe: recipeRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
