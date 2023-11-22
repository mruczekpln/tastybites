import { createTRPCRouter } from "~/server/api/trpc";
import { accountRouter } from "./routers/auth";

export const appRouter = createTRPCRouter({
  account: accountRouter,
});

export type AppRouter = typeof appRouter;
