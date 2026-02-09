import { db } from "../../db/db";
import { accounts } from "../../db/schema/accounts";
import { journalEntries } from "../../db/schema/journalEntries";
import { journalLines } from "../../db/schema/journalLines";
import { eq, between, sql } from "drizzle-orm";
import { ExpenseSummaryReport } from "../../types/reports/expenseSummary";

export async function getExpenseSummary(
  from: Date,
  to: Date
): Promise<ExpenseSummaryReport> {

  const rows = await db
    .select({
      accountId: accounts.id,
      accountName: accounts.name,
      amount: sql<number>`
        COALESCE(SUM(${journalLines.debit} - ${journalLines.credit}), 0)
      `,
    })
    .from(journalLines)
    .innerJoin(accounts, eq(journalLines.accountId, accounts.id))
    .innerJoin(
      journalEntries,
      eq(journalLines.journalEntryId, journalEntries.id)
    )
    .where(
      sql`${accounts.type} = 'EXPENSE'
           AND ${journalEntries.entryDate} BETWEEN ${from} AND ${to}`
    )
    .groupBy(accounts.id, accounts.name);

  const expenses = rows
    .filter(r => r.amount !== 0)
    .map(r => ({
      accountId: r.accountId,
      accountName: r.accountName,
      amount: Number(r.amount),
    }));

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  return {
    period: {
      from: from.toISOString(),
      to: to.toISOString(),
    },
    expenses,
    totalExpenses,
  };
}
