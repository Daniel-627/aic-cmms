import { db } from "../../db/db";
import { announcements } from "../../db/schema/announcements";
import { actionLogs } from "../../db/schema/actionLogs";
import { eq } from "drizzle-orm";

export class AnnouncementService {
  static async create(data: {
    title: string;
    content: string;
    visibility: "PUBLIC" | "MEMBERS";
    expiresAt?: Date;
    userId: string;
  }) {
    const [announcement] = await db
      .insert(announcements)
      .values({
        title: data.title,
        content: data.content,
        visibility: data.visibility,
        expiresAt: data.expiresAt,
        createdBy: data.userId,
        status: "DRAFT",
      })
      .returning();

    await db.insert(actionLogs).values({
      userId: data.userId,
      action: "CREATE_ANNOUNCEMENT",
      entity: "ANNOUNCEMENT",
      entityId: announcement.id,
    });

    return announcement;
  }

  static async publish(
    announcementId: string,
    adminId: string
  ) {
    const [announcement] = await db
      .update(announcements)
      .set({
        status: "PUBLISHED",
        publishedAt: new Date(),
        publishedById: adminId,
      })
      .where(eq(announcements.id, announcementId))
      .returning();

    await db.insert(actionLogs).values({
      userId: adminId,
      action: "PUBLISH_ANNOUNCEMENT",
      entity: "ANNOUNCEMENT",
      entityId: announcementId,
    });

    return announcement;
  }
}
