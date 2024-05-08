import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env.mjs";

import * as schema from "./schema";

// const connection = connect({
//   host: env.DATABASE_HOST,
//   username: env.DATABASE_USERNAME,
//   password: env.DATABASE_PASSWORD,
// });

// export const db = drizzle(connection, { schema });

// export const db = drizzle(
//   new Client({
//     url: env.DATABASE_URL,
//   }).connection(),
//   { schema },
// );

export const db = drizzle(
  postgres(env.DATABASE_URL, {
    prepare: false,
    ssl: { rejectUnauthorized: false },
  }),
  { schema },
);
