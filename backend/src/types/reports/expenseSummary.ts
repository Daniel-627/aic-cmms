export interface ExpenseSummaryLine {
  accountId: string;
  accountName: string;
  amount: number;
}

export interface ExpenseSummaryReport {
  period: {
    from: string;
    to: string;
  };
  expenses: ExpenseSummaryLine[];
  totalExpenses: number;
}
