import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
