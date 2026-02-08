import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { eventTypeEnum } from "./enums";
import { users } from "./users";

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  description: text("description"),

  eventType: eventTypeEnum("event_type").notNull(),

  status: text("status", {
    enum: ["DRAFT", "PUBLISHED"],
  }).notNull().default("DRAFT"),

  startAt: timestamp("start_at", { withTimezone: true }).notNull(),
  endAt: timestamp("end_at", { withTimezone: true }),

  location: text("location"),

  createdBy: uuid("created_by")
    .references(() => users.id)
    .notNull(),

  publishedBy: uuid("published_by")
    .references(() => users.id),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
