export interface RemittanceSummaryReport {
  period: {
    from: string;
    to: string;
  };
  totalIncome: number;
  dccRemittance: number;
  rccRemittance: number;
  netRetained: number;
}
