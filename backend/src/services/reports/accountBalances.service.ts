import { db } from "../../db/db";
import { accounts } from "../../db/schema/accounts";
import { journalEntries } from "../../db/schema/journalEntries";
import { journalLines } from "../../db/schema/journalLines";
import { eq, sql } from "drizzle-orm";
import { AccountBalancesReport } from "../../types/reports/accountBalances";

export async function getAccountBalances(
  asOf: Date
): Promise<AccountBalancesReport> {

  const rows = await db
    .select({
      accountId: accounts.id,
      accountName: accounts.name,
      accountType: accounts.type,
      balance: sql<number>`
        CASE
          WHEN ${accounts.type} IN ('ASSET', 'EXPENSE')
            THEN COALESCE(SUM(${journalLines.debit} - ${journalLines.credit}), 0)
          ELSE
            COALESCE(SUM(${journalLines.credit} - ${journalLines.debit}), 0)
        END
      `,
    })
    .from(journalLines)
    .innerJoin(accounts, eq(journalLines.accountId, accounts.id))
    .innerJoin(
      journalEntries,
      eq(journalLines.journalEntryId, journalEntries.id)
    )
    .where(sql`${journalEntries.entryDate} <= ${asOf}`)
    .groupBy(accounts.id, accounts.name, accounts.type);

  const totals = {
    assets: 0,
    liabilities: 0,
    equity: 0,
    income: 0,
    expenses: 0,
  };

  const accountsData = rows.map(r => {
    const balance = Number(r.balance);

    switch (r.accountType) {
      case "ASSET":
        totals.assets += balance;
        break;
      case "LIABILITY":
        totals.liabilities += balance;
        break;
      case "EQUITY":
        totals.equity += balance;
        break;
      case "INCOME":
        totals.income += balance;
        break;
      case "EXPENSE":
        totals.expenses += balance;
        break;
    }

    return {
      accountId: r.accountId,
      accountName: r.accountName,
      accountType: r.accountType,
      balance,
    };
  });

  return {
    asOf: asOf.toISOString(),
    accounts: accountsData,
    totals,
  };
}
