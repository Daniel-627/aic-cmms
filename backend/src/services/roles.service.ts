import { db } from "../db/db";
import { user_roles } from "../db/schema/user_roles";
import { actionLogs } from "../db/schema/actionLogs";
import { eq } from "drizzle-orm";

export class RolesService {
  static async assignRole(userId: string, role: string, assignedBy: string) {
    // Optional: check if role is valid from your ROLES enum

    const [assigned] = await db
      .insert(user_roles)
      .values({
        user_id: userId,
        role,
      })
      .onConflictDoNothing() // prevent duplicates
      .returning();

    if (!assigned) throw new Error("Role already assigned or invalid.");

    // Optional: log action in actionLogs
    await db.insert(actionLogs).values({
      userId: assignedBy,
      action: "ASSIGN_ROLE",
      entity: "USER_ROLE",
      entityId: assigned.id,
    });

    return assigned;
  }

  static async getUserRoles(userId: string) {
    return db.select().from(user_roles).where(eq(user_roles.user_id, userId));
  }

  static async updateRoleStatus(id: string, status: string) {
    const [updated] = await db
      .update(user_roles)
      .set({ status })
      .where(eq(user_roles.id, id))
      .returning();

    if (!updated) throw new Error("Role not found or invalid status");

    return updated;
  }

  static async removeRole(id: string) {
    await db.delete(user_roles).where(eq(user_roles.id, id));
  }
}
