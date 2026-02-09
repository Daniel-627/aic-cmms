import { db } from "../../db/db";
import { journalEntries } from "../../db/schema/journalEntries";
import { journalLines } from "../../db/schema/journalLines";
import { accounts } from "../../db/schema/accounts";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import { RemittanceSummaryReport } from "../../types/reports/remittanceSummary";

const DCC_RATE = 0.1; // 10%
const RCC_RATE = 0.05; // 5%

export async function getRemittanceSummary(
  from: Date,
  to: Date
): Promise<RemittanceSummaryReport> {
  const rows = await db
    .select({
      amount: sql<number>`
        SUM(
          COALESCE(${journalLines.credit}, 0)
          - COALESCE(${journalLines.debit}, 0)
        )
      `,
    })
    .from(journalLines)
    .innerJoin(
      journalEntries,
      eq(journalLines.journalEntryId, journalEntries.id)
    )
    .innerJoin(accounts, eq(journalLines.accountId, accounts.id))
    .where(
      and(
        eq(accounts.type, "INCOME"),
        gte(journalEntries.entryDate, from),
        lte(journalEntries.entryDate, to)
      )
    );

  const totalIncome = Number(rows[0]?.amount ?? 0);

  const dccRemittance = totalIncome * DCC_RATE;
  const rccRemittance = totalIncome * RCC_RATE;

  return {
    period: {
      from: from.toISOString().split("T")[0],
      to: to.toISOString().split("T")[0],
    },
    totalIncome,
    dccRemittance,
    rccRemittance,
    netRetained: totalIncome - (dccRemittance + rccRemittance),
  };
}
