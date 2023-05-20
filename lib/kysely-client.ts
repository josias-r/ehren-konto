import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { DB } from "@/prisma/generated/types";

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,

      ssl: {
        timeout: 15,
      },
    }),
  }),
});
