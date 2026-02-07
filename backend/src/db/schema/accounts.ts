import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { accountTypeEnum } from "./enums";

export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),
  code: text("code").notNull(),

  type: accountTypeEnum("type").notNull(),

  parentAccountId: uuid("parent_account_id")
    .references(() => accounts.id),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
