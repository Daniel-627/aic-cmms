import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const sermons = pgTable("sermons", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  preacher: text("preacher").notNull(),

  scriptureReference: text("scripture_reference").notNull(),
  summary: text("summary"),

  audioUrl: text("audio_url"),
  videoUrl: text("video_url"),

  sermonDate: date("sermon_date").notNull(),

  status: text("status", {
    enum: ["DRAFT", "PENDING_APPROVAL", "PUBLISHED"],
  }).notNull().default("DRAFT"),

  authorId: uuid("author_id")
    .references(() => users.id)
    .notNull(),

  approvedBy: uuid("approved_by")
    .references(() => users.id),

  publishedBy: uuid("published_by")
    .references(() => users.id),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
