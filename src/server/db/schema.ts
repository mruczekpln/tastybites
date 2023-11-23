import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  int,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
  smallint,
  text,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

// export const sessions = mysqlTable(
//   "session",
//   {
//     sessionToken: varchar("session_token", { length: 255 })
//       .notNull()
//       .primaryKey(),
//     userId: varchar("user_id", { length: 255 }).notNull(),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
//   },
//   (session) => ({
//     userIdIdx: index("user_id_idx").on(session.userId),
//   }),
// );

// export const sessionsRelations = relations(sessions, ({ one }) => ({
//   user: one(users, { fields: [sessions.userId], references: [users.id] }),
// }));

export const mysqlTable = mysqlTableCreator((name) => `tastybites_${name}`);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  hashedPassword: varchar("hashed_password", { length: 60 }),
  emailVerified: boolean("email_verified").default(false),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  recipes: many(recipes),
  recipeLikes: many(recipeLikes),
  recipeReviews: many(recipeReviews),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const recipes = mysqlTable("recipe", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  instructions: text("instructions").notNull(),
});

export const recipesRelations = relations(recipes, ({ many }) => ({
  recipeImages: many(recipeImages),
  recipeIngredients: many(recipeIngredients),
  recipeLikes: many(recipeLikes),
}));

export const recipeImages = mysqlTable("recipe_image", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  recipeId: varchar("recipe_id", { length: 36 }).notNull(),
  link: text("link").notNull(),
});

export const recipeLikes = mysqlTable("recipe_like", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  recipeId: varchar("recipe_id", { length: 36 }).notNull(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const recipeIngredients = mysqlTable("recipe_ingredient", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  recipeId: varchar("recipe_id", { length: 36 }).notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  amount: smallint("amount").notNull(),
  // unit: varchar("unit", { length: 2 }).notNull(),
  unit: mysqlEnum("unit", ["g", "ml"]),
});

export const recipeReviews = mysqlTable("recipe_review", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  recipeId: varchar("recipe_id", { length: 36 }).notNull(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  rating: tinyint("rating").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
