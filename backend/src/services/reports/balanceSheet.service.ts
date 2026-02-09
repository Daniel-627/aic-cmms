import { getAccountBalances } from "./accountBalances.service";
import { BalanceSheet } from "../../types/reports/balanceSheet";

export async function getBalanceSheet(
  asOf: Date
): Promise<BalanceSheet> {

  const balances = await getAccountBalances(asOf);

  const assets = balances.accounts.filter(
    a => a.accountType === "ASSET"
  );

  const liabilities = balances.accounts.filter(
    a => a.accountType === "LIABILITY"
  );

  const equity = balances.accounts.filter(
    a => a.accountType === "EQUITY"
  );

  return {
    asOf: balances.asOf,

    assets: {
      items: assets.map(a => ({
        accountId: a.accountId,
        accountName: a.accountName,
        balance: a.balance,
      })),
      total: balances.totals.assets,
    },

    liabilities: {
      items: liabilities.map(a => ({
        accountId: a.accountId,
        accountName: a.accountName,
        balance: a.balance,
      })),
      total: balances.totals.liabilities,
    },

    equity: {
      items: equity.map(a => ({
        accountId: a.accountId,
        accountName: a.accountName,
        balance: a.balance,
      })),
      total: balances.totals.equity,
    },
  };
}
