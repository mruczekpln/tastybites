import { asc, desc, sql } from "drizzle-orm";
import { recipes } from "./schema";
import { type PgSelect } from "drizzle-orm/pg-core";

export function withPagination<T extends PgSelect>(
  qb: T,
  page: number,
  perPage: number,
) {
  return void qb.limit(perPage + 1 || 11).offset((page - 1) * perPage);
}

export function withSorting<T extends PgSelect>(qb: T, sortBy: string) {
  if (sortBy === "likes")
    return void qb.orderBy(sql`like_count desc`, recipes.id);
  else if (sortBy === "name")
    return void qb.orderBy(asc(recipes.name), recipes.id);
  else if (sortBy === "rating")
    return void qb.orderBy(sql`average_rating desc`, recipes.id);
  else if (sortBy === "latest")
    return void qb.orderBy(desc(recipes.createdAt), recipes.id);
}
