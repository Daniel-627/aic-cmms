import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { accountTypeEnum } from "./enums";
import { users } from "./users";

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),
    code: text("code").notNull(),

    type: accountTypeEnum("type").notNull(),

    parentAccountId: uuid("parent_account_id"),

    isActive: boolean("is_active").default(true).notNull(),

    createdBy: uuid("created_by")
      .references(() => users.id)
      .notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    parentAccountFk: {
      columns: [table.parentAccountId],
      foreignColumns: [table.id],
    },
  })
);
