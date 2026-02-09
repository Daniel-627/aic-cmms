export interface IncomeStatementLine {
  accountId: string;
  accountName: string;
  amount: number;
}

export interface IncomeStatementReport {
  period: {
    from: string;
    to: string;
  };
  income: IncomeStatementLine[];
  expenses: IncomeStatementLine[];
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
}
