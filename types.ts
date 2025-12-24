
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  category: string;
}

export interface FinanceStats {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  savingsRate: number;
}
