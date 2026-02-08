import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { sermonStatusEnum } from "./enums";

/* Workflow enum */


export const sermons = pgTable("sermons", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  scriptureReference: text("scripture_reference").notNull(),
  summary: text("summary"),

  audioUrl: text("audio_url"),
  videoUrl: text("video_url"),

  sermonDate: date("sermon_date").notNull(),

  status: sermonStatusEnum("status")
    .notNull()
    .default("DRAFT"),

  authorId: uuid("author_id")
    .references(() => users.id)
    .notNull(),

  approvedById: uuid("approved_by_id")
    .references(() => users.id),

  publishedById: uuid("published_by_id")
    .references(() => users.id),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
