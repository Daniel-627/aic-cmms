import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { eventTypeEnum } from "./enums";
import { eventStatusEnum } from "./enums";

/* Workflow enum */


export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  description: text("description"),

  eventType: eventTypeEnum("event_type").notNull(),

  startAt: timestamp("start_at", { withTimezone: true }).notNull(),
  endAt: timestamp("end_at", { withTimezone: true }),

  location: text("location"),

  status: eventStatusEnum("status")
    .notNull()
    .default("DRAFT"),

  createdBy: uuid("created_by")
    .references(() => users.id)
    .notNull(),

  publishedById: uuid("published_by_id")
    .references(() => users.id),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
