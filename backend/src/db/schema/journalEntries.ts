import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const journalEntries = pgTable("journal_entries", {
  id: uuid("id").defaultRandom().primaryKey(),

  entryDate: date("entry_date").notNull(),

  description: text("description").notNull(),
  reference: text("reference"),

  createdBy: uuid("created_by")
    .references(() => users.id)
    .notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
