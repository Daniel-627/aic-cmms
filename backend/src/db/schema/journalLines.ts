import {
  pgTable,
  uuid,
  numeric,
} from "drizzle-orm/pg-core";
import { journalEntries } from "./journalEntries";
import { accounts } from "./accounts";

export const journalLines = pgTable("journal_lines", {
  id: uuid("id").defaultRandom().primaryKey(),

  journalEntryId: uuid("journal_entry_id")
    .references(() => journalEntries.id)
    .notNull(),

  accountId: uuid("account_id")
    .references(() => accounts.id)
    .notNull(),

  debit: numeric("debit", { precision: 14, scale: 2 }),
  credit: numeric("credit", { precision: 14, scale: 2 }),
});
