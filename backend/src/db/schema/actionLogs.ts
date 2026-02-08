import {
  pgTable,
  uuid,
  text,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const actionLogs = pgTable("action_logs", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  action: text("action").notNull(), 
  // CREATE / UPDATE / DELETE / APPROVE / PUBLISH

  entity: text("entity").notNull(), 
  // sermons, payments, journal_entries, etc.

  entityId: uuid("entity_id").notNull(),

  metadata: jsonb("metadata"), 
  // before/after, notes, reason

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
