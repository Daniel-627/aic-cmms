import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { announcementVisibilityEnum } from "./enums";
import { users } from "./users";

export const announcements = pgTable("announcements", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  content: text("content").notNull(),

  visibility: announcementVisibilityEnum("visibility")
    .notNull()
    .default("PUBLIC"),

  status: text("status", {
    enum: ["DRAFT", "PUBLISHED"],
  }).notNull().default("DRAFT"),

  publishedAt: timestamp("published_at", { withTimezone: true }),

  expiresAt: timestamp("expires_at", { withTimezone: true }),

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
