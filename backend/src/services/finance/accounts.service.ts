import { db } from "../../db/db";
import { accounts } from "../../db/schema/accounts";
import { actionLogs } from "../../db/schema/actionLogs";
import { eq } from "drizzle-orm";

export class AccountsService {
  static async create(data: {
    name: string;
    code: string;
    type: "ASSET" | "LIABILITY" | "INCOME" | "EXPENSE" | "EQUITY";
    parentAccountId?: string;
    createdBy: string;
  }) {
    const [account] = await db
      .insert(accounts)
      .values(data)
      .returning();

      if (!account) {
        throw new Error("Account creation failed");
      }

    await db.insert(actionLogs).values({
      userId: data.createdBy,
      action: "CREATE_ACCOUNT",
      entity: "ACCOUNT",
      entityId: account.id,
    });

    return account;
  }

  static async list() {
    return db.select().from(accounts);
  }

  static async setActive(
    accountId: string,
    isActive: boolean,
    userId: string
  ) {
    const [account] = await db
      .update(accounts)
      .set({ isActive })
      .where(eq(accounts.id, accountId))
      .returning();

    await db.insert(actionLogs).values({
      userId,
      action: isActive ? "ACTIVATE_ACCOUNT" : "DEACTIVATE_ACCOUNT",
      entity: "ACCOUNT",
      entityId: accountId,
    });

    return account;
  }
}
