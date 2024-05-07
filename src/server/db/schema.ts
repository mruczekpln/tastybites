import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    // userIdIdx: index("idx_account_userId").on(account.userId),
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    coupoundKey: primaryKey({
      columns: [vt.identifier, vt.token],
    }),
  }),
);

export const users = pgTable(
  "user",
  {
    id: varchar("id", { length: 36 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }).unique(),
    email: varchar("email", { length: 255 }).notNull(),
    hashedPassword: varchar("hashed_password", { length: 60 }),
    emailVerified: boolean("emailVerified").default(false),
    image: varchar("image", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  // (table) => ({
  //   idIndex: index("idx_user_id").on(table.id),
  // }),
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  recipes: many(recipes),
  recipeLikes: many(recipeLikes),
  recipeReviews: many(recipeReviews),
}));

export const difficultyLevelEnum = pgEnum("difficulty_level", [
  "easy",
  "intermediate",
  "advanced",
]);

export const recipes = pgTable(
  "recipe",
  {
    id: serial("id").primaryKey(),
    creatorId: varchar("creator_id", { length: 36 }).notNull(),
    // .references(() => users.id, {
    //   onDelete: "cascade",
    // }),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description").notNull(),
    instructions: text("instructions").notNull(),
    category: varchar("category", { length: 10 }).notNull(),
    cookingTime: smallint("cooking_time").notNull(),
    difficultyLevel: difficultyLevelEnum("difficulty_level"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  // (table) => ({
  //   // idIdx: index("idx_recipe_id").on(table.id),
  //   creatorIdIdx: index("idx_recipe_creator_id").on(table.creatorId),
  // }),
);

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  users: one(users, { fields: [recipes.creatorId], references: [users.id] }),
  recipeImages: many(recipeImages),
  recipeIngredients: many(recipeIngredients),
  recipeLikes: many(recipeLikes),
  recipeReviews: many(recipeReviews),
}));

export const recipeImages = pgTable("recipe_image", {
  id: serial("id").primaryKey(),
  recipeId: bigint("recipe_id", { mode: "number" }).notNull(),
  key: varchar("key", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  isTitle: boolean("is_title").$default(() => false),
  order: smallint("order").notNull(),
  // uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

export const recipeImagesRelations = relations(recipeImages, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeImages.recipeId],
    references: [recipes.id],
  }),
}));

export const recipeLikes = pgTable(
  "recipe_like",
  {
    id: serial("id").primaryKey(),
    recipeId: bigint("recipe_id", { mode: "number" }).notNull(),
    // .references(() => recipes.id, {
    //   onDelete: "cascade",
    // }),
    creatorId: varchar("creator_id", { length: 36 }).notNull(),
    // .references(() => users.id, {
    //   onDelete: "cascade",
    // }),
    likedById: varchar("liked_by_id", { length: 36 }).notNull(),
    // .references(() => users.id, {
    //   onDelete: "cascade",
    // }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  // (table) => ({
  //   recipeIdIdx: index("idx_recipe_like_recipe_id").on(table.recipeId),
  //   creatorIdIdx: index("idx_recipe_like_creator_id").on(table.creatorId),
  //   likedByIdIdx: index("idx_recipe_like_liked_by_id").on(table.likedById),
  // }),
);

export const recipeLikesRelations = relations(recipeLikes, ({ one }) => ({
  user: one(users, { fields: [recipeLikes.likedById], references: [users.id] }),
  recipe: one(recipes, {
    fields: [recipeLikes.recipeId],
    references: [recipes.id],
  }),
}));

export const unitEnum = pgEnum("unit", ["g", "ml", "pcs"]);

export const recipeIngredients = pgTable("recipe_ingredient", {
  id: serial("id").primaryKey(),
  recipeId: bigint("recipe_id", { mode: "number" }).notNull(),
  // .references(() => recipes.id, {
  //   onDelete: "cascade",
  // }),
  name: varchar("name", { length: 50 }).notNull(),
  amount: smallint("amount").notNull(),
  unit: unitEnum("unit"),
});

export const recipeIngredientsRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeIngredients.recipeId],
      references: [recipes.id],
    }),
  }),
);

export const recipeReviews = pgTable(
  "recipe_review",
  {
    id: serial("id").primaryKey(),
    recipeId: bigint("recipe_id", { mode: "number" }).notNull(),
    // .references(() => recipes.id, {
    //   onDelete: "cascade",
    // }),
    userId: varchar("user_id", { length: 36 }).notNull(),
    // .references(() => users.id, {
    //   onDelete: "cascade",
    // }),
    rating: smallint("rating").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  // (table) => ({
  //   recipeIdTdx: index("idx_recipe_review_recipe_id").on(table.recipeId),
  // }),
);

export const recipeReviewsRelations = relations(recipeReviews, ({ one }) => ({
  users: one(users, { fields: [recipeReviews.userId], references: [users.id] }),
  recipe: one(recipes, {
    fields: [recipeReviews.recipeId],
    references: [recipes.id],
  }),
}));
