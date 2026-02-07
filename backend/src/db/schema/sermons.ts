import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

export const sermons = pgTable("sermons", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  preacher: text("preacher").notNull(),

  scriptureReference: text("scripture_reference").notNull(),
  summary: text("summary"),

  audioUrl: text("audio_url"),
  videoUrl: text("video_url"),

  sermonDate: date("sermon_date").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
