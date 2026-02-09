export interface AccountBalanceLine {
  accountId: string;
  accountName: string;
  accountType: string;
  balance: number;
}

export interface AccountBalancesReport {
  asOf: string;
  accounts: AccountBalanceLine[];
  totals: {
    assets: number;
    liabilities: number;
    equity: number;
    income: number;
    expenses: number;
  };
}
