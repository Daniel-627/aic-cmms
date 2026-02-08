import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { announcementVisibilityEnum } from "./enums";
import { announcementStatusEnum } from "./enums";

/* Workflow enum */


export const announcements = pgTable("announcements", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  content: text("content").notNull(),

  visibility: announcementVisibilityEnum("visibility")
    .notNull()
    .default("PUBLIC"),

  status: announcementStatusEnum("status")
    .notNull()
    .default("DRAFT"),

  publishedAt: timestamp("published_at", { withTimezone: true }),
  expiresAt: timestamp("expires_at", { withTimezone: true }),

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
