import { db } from "../../db/db";
import { sermons } from "../../db/schema/sermons";
import { actionLogs } from "../../db/schema/actionLogs";
import { eq } from "drizzle-orm";

export class SermonService {
  static async create(data: {
    title: string;
    scriptureReference: string;
    summary?: string;
    sermonDate: string;
    authorId: string;
  }) {
    const [sermon] = await db
      .insert(sermons)
      .values({
        ...data,
        status: "DRAFT",
      })
      .returning();

    if (!sermon) {
      throw new Error("Failed to create sermon");
    }

    await db.insert(actionLogs).values({
      userId: data.authorId,
      action: "CREATE_SERMON",
      entity: "SERMON",
      entityId: sermon.id,
    });

    return sermon;
  }

  static async submitForApproval(sermonId: string, userId: string) {
    const [sermon] = await db
      .update(sermons)
      .set({ status: "PENDING_APPROVAL" })
      .where(eq(sermons.id, sermonId))
      .returning();

    if (!sermon) {
      throw new Error("Sermon not found");
    }

    await db.insert(actionLogs).values({
      userId,
      action: "SUBMIT_SERMON",
      entity: "SERMON",
      entityId: sermon.id,
    });

    return sermon;
  }

  static async approve(sermonId: string, pastorId: string) {
    const [sermon] = await db
      .update(sermons)
      .set({
        approvedById: pastorId,
      })
      .where(eq(sermons.id, sermonId))
      .returning();

    if (!sermon) {
      throw new Error("Sermon not found");
    }

    await db.insert(actionLogs).values({
      userId: pastorId,
      action: "APPROVE_SERMON",
      entity: "SERMON",
      entityId: sermon.id,
    });

    return sermon;
  }

  static async publish(sermonId: string, secretaryId: string) {
    const [sermon] = await db
      .update(sermons)
      .set({
        status: "PUBLISHED",
        publishedById: secretaryId,
      })
      .where(eq(sermons.id, sermonId))
      .returning();

    if (!sermon) {
      throw new Error("Sermon not found");
    }

    await db.insert(actionLogs).values({
      userId: secretaryId,
      action: "PUBLISH_SERMON",
      entity: "SERMON",
      entityId: sermon.id,
    });

    return sermon;
  }
}
