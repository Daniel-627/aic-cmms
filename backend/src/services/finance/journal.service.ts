import { db } from "../../db/db";
import { journalEntries } from "../../db/schema/journalEntries";
import { journalLines } from "../../db/schema/journalLines";
import { actionLogs } from "../../db/schema/actionLogs";

export class JournalService {
  static async createEntry(data: {
    entryDate: string;
    description: string;
    reference?: string;
    createdBy: string;
    lines: Array<{
      accountId: string;
      debit?: number;
      credit?: number;
    }>;
  }) {
    // 1️⃣ Basic validation
    if (data.lines.length < 2) {
      throw new Error("Journal entry must have at least two lines");
    }

    let totalDebit = 0;
    let totalCredit = 0;

    for (const line of data.lines) {
      if (line.debit) totalDebit += Number(line.debit);
      if (line.credit) totalCredit += Number(line.credit);
    }

    if (totalDebit !== totalCredit) {
      throw new Error("Debits and credits must balance");
    }

    // 2️⃣ Transaction (all or nothing)
    return db.transaction(async (tx) => {
      // Create journal entry
      const [entry] = await tx
        .insert(journalEntries)
        .values({
          entryDate: data.entryDate,
          description: data.description,
          reference: data.reference,
          createdBy: data.createdBy,
        })
        .returning();

        if (!entry) {
          throw new Error("Failed to create journal entry");
        }

      // Create journal lines
      await tx.insert(journalLines).values(
  data.lines.map((line) => ({
    journalEntryId: entry.id,
    accountId: line.accountId,
    debit: line.debit !== undefined ? line.debit.toString() : null,
    credit: line.credit !== undefined ? line.credit.toString() : null,
  }))
);


      // Audit log
      await tx.insert(actionLogs).values({
        userId: data.createdBy,
        action: "CREATE_JOURNAL_ENTRY",
        entity: "JOURNAL_ENTRY",
        entityId: entry.id,
      });

      return entry;
    });
  }
}
