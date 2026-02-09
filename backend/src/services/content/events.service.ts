import { db } from "../../db/db";
import { events } from "../../db/schema/events";
import { actionLogs } from "../../db/schema/actionLogs";
import { eq } from "drizzle-orm";

export class EventService {
  static async create(data: {
    title: string;
    description?: string;
    eventType: "SERVICE" | "MEETING" | "CONFERENCE" | "OTHER";
    startAt: Date;
    endAt?: Date;
    location?: string;
    userId: string;
  }) {
    const [event] = await db
      .insert(events)
      .values({
        title: data.title,
        description: data.description,
        eventType: data.eventType,
        startAt: data.startAt,
        endAt: data.endAt,
        location: data.location,
        createdBy: data.userId,
        status: "DRAFT",
      })
      .returning();

      if (!event) {
        throw new Error("Failed to create event");
      }

    await db.insert(actionLogs).values({
      userId: data.userId,
      action: "CREATE_EVENT",
      entity: "EVENT",
      entityId: event.id,
    });

    return event;
  }

  static async publish(eventId: string, userId: string) {
    const [event] = await db
      .update(events)
      .set({
        status: "PUBLISHED",
        publishedById: userId,
      })
      .where(eq(events.id, eventId))
      .returning();

    await db.insert(actionLogs).values({
      userId,
      action: "PUBLISH_EVENT",
      entity: "EVENT",
      entityId: eventId,
    });

    return event;
  }
}
