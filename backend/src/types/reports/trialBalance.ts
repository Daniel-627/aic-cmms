export interface TrialBalanceLine {
  accountId: string;
  accountName: string;
  debit: number;
  credit: number;
}

export interface TrialBalance {
  asOf: string;
  lines: TrialBalanceLine[];
  totals: {
    debit: number;
    credit: number;
  };
}
