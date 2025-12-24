
import React from 'react';
import { FinanceStats } from '../types';

interface SummaryCardsProps {
  stats: FinanceStats;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ stats }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </div>
          <span className="text-sm font-medium text-slate-500">Total Income</span>
        </div>
        <div className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalIncome)}</div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          </div>
          <span className="text-sm font-medium text-slate-500">Total Expenses</span>
        </div>
        <div className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalExpenses)}</div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-slate-500">Net Savings</span>
        </div>
        <div className={`text-2xl font-bold ${stats.savings >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
          {formatCurrency(stats.savings)}
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-slate-500">Savings Rate</span>
        </div>
        <div className="text-2xl font-bold text-slate-900">{stats.savingsRate.toFixed(1)}%</div>
      </div>
    </div>
  );
};

export default SummaryCards;
