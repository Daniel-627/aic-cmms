import {
  pgTable,
  uuid,
  numeric,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import {
  paymentProviderEnum,
  paymentStatusEnum,
} from "./enums";
import { users } from "./users";
import { journalEntries } from "./journalEntries";

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id),

  amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
  currency: text("currency").notNull(),

  provider: paymentProviderEnum("provider").notNull(),
  providerReference: text("provider_reference").notNull(),

  status: paymentStatusEnum("status").notNull(),

  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),

  journalEntryId: uuid("journal_entry_id")
    .references(() => journalEntries.id),

  createdBy: uuid("created_by")
    .references(() => users.id)
    .notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
