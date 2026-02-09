export interface BalanceSheetSectionLine {
  accountId: string;
  accountName: string;
  balance: number;
}

export interface BalanceSheet {
  asOf: string;

  assets: {
    items: BalanceSheetSectionLine[];
    total: number;
  };

  liabilities: {
    items: BalanceSheetSectionLine[];
    total: number;
  };

  equity: {
    items: BalanceSheetSectionLine[];
    total: number;
  };
}
