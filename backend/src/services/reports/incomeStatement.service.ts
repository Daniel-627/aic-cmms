import { db } from "../../db/db";
import { accounts } from "../../db/schema/accounts";
import { journalEntries } from "../../db/schema/journalEntries";
import { journalLines } from "../../db/schema/journalLines";
import { eq, between, sql } from "drizzle-orm";
import { IncomeStatementReport } from "../../reports/incomeStatement";

export async function getIncomeStatement(
  from: Date,
  to: Date
): Promise<IncomeStatementReport> {

  const rows = await db
    .select({
      accountId: accounts.id,
      accountName: accounts.name,
      accountType: accounts.type,
      amount: sql<number>`
        COALESCE(SUM(
          CASE
            WHEN ${accounts.type} = 'INCOME'
              THEN ${journalLines.credit} - ${journalLines.debit}
            WHEN ${accounts.type} = 'EXPENSE'
              THEN ${journalLines.debit} - ${journalLines.credit}
            ELSE 0
          END
        ), 0)
      `,
    })
    .from(journalLines)
    .innerJoin(accounts, eq(journalLines.accountId, accounts.id))
    .innerJoin(
      journalEntries,
      eq(journalLines.journalEntryId, journalEntries.id)
    )
    .where(between(journalEntries.entryDate, from, to))
    .groupBy(accounts.id, accounts.name, accounts.type);

  const income = rows
    .filter(r => r.accountType === "INCOME" && r.amount !== 0)
    .map(r => ({
      accountId: r.accountId,
      accountName: r.accountName,
      amount: Number(r.amount),
    }));

  const expenses = rows
    .filter(r => r.accountType === "EXPENSE" && r.amount !== 0)
    .map(r => ({
      accountId: r.accountId,
      accountName: r.accountName,
      amount: Number(r.amount),
    }));

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return {
    period: {
      from: from.toISOString(),
      to: to.toISOString(),
    },
    income,
    expenses,
    totalIncome,
    totalExpenses,
    netIncome: totalIncome - totalExpenses,
  };
}
