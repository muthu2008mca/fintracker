
import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, FinanceStats } from './types';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import FinanceChart from './components/FinanceChart';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AIInsights from './components/AIInsights';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('fintrack_data');
    return saved ? JSON.parse(saved) : [];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<'income' | 'expense'>('expense');

  useEffect(() => {
    localStorage.setItem('fintrack_data', JSON.stringify(transactions));
  }, [transactions]);

  const stats = useMemo<FinanceStats>(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const savings = income - expenses;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;

    return {
      totalIncome: income,
      totalExpenses: expenses,
      savings: savings,
      savingsRate: Math.max(0, savingsRate)
    };
  }, [transactions]);

  const addTransaction = (t: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...t,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setIsFormOpen(false);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const openForm = (type: 'income' | 'expense') => {
    setFormType(type);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-10">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SummaryCards stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Allocation Analysis</h2>
              <div className="h-80 w-full">
                <FinanceChart stats={stats} />
              </div>
            </div>

            <AIInsights transactions={transactions} />
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">History</h2>
                <div className="flex gap-2">
                   <button 
                    onClick={() => openForm('income')}
                    className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                    title="Add Income"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => openForm('expense')}
                    className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                    title="Add Expense"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 md:hidden">
        <button 
          onClick={() => openForm('income')}
          className="flex items-center justify-center w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button 
          onClick={() => openForm('expense')}
          className="flex items-center justify-center w-14 h-14 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>

      {isFormOpen && (
        <TransactionForm 
          type={formType} 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={addTransaction} 
        />
      )}
    </div>
  );
};

export default App;
