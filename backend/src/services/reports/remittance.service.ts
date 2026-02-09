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
  // 🔑 Convert once, use everywhere
  const fromDate = from.toISOString();
  const toDate = to.toISOString();

  const rows = await db
    .select({
      amount: sql<number>`
        COALESCE(
          SUM(
            COALESCE(${journalLines.credit}, 0)
            - COALESCE(${journalLines.debit}, 0)
          ),
          0
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
        gte(journalEntries.entryDate, fromDate),
        lte(journalEntries.entryDate, toDate)
      )
    );

  const totalIncome = Number(rows[0]?.amount ?? 0);

  const dccRemittance = totalIncome * DCC_RATE;
  const rccRemittance = totalIncome * RCC_RATE;

  return {
    period: {
      from: fromDate,
      to: toDate,
    },
    totalIncome,
    dccRemittance,
    rccRemittance,
    netRetained: totalIncome - (dccRemittance + rccRemittance),
  };
}
