import { db } from "../../db/db";
import { sql } from "drizzle-orm";
import { TrialBalance } from "../../types/reports/trialBalance";

export async function getTrialBalance(
  asOf: Date
): Promise<TrialBalance> {

  const rows = await db.execute<{
    account_id: string;
    account_name: string;
    debit: string | null;
    credit: string | null;
  }>(sql`
    SELECT
      a.id AS account_id,
      a.name AS account_name,
      COALESCE(SUM(jl.debit), 0) AS debit,
      COALESCE(SUM(jl.credit), 0) AS credit
    FROM accounts a
    LEFT JOIN journal_lines jl ON jl.account_id = a.id
    LEFT JOIN journal_entries je ON je.id = jl.journal_entry_id
      AND je.entry_date <= ${asOf}
    GROUP BY a.id, a.name
    ORDER BY a.name
  `);

  const lines = rows.map(r => ({
    accountId: r.account_id,
    accountName: r.account_name,
    debit: Number(r.debit),
    credit: Number(r.credit),
  }));

  const totals = lines.reduce(
    (acc, l) => {
      acc.debit += l.debit;
      acc.credit += l.credit;
      return acc;
    },
    { debit: 0, credit: 0 }
  );

  return {
    asOf: asOf.toISOString(),
    lines,
    totals,
  };
}
