
import React, { useState } from 'react';
import { Transaction } from '../types';
import { getFinancialInsights } from '../services/geminiService';

interface AIInsightsProps {
  transactions: Transaction[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ transactions }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    if (transactions.length === 0) return;
    setLoading(true);
    try {
      const result = await getFinancialInsights(transactions);
      setInsights(result);
    } catch (err) {
      setInsights("Unable to reach financial advisor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-xl font-bold">AI Financial Advisor</h2>
        </div>
        <button 
          onClick={generateReport}
          disabled={loading || transactions.length === 0}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all font-medium text-sm backdrop-blur-sm"
        >
          {loading ? 'Analyzing...' : 'Generate Tips'}
        </button>
      </div>

      {!insights && !loading && (
        <p className="text-indigo-100 text-sm opacity-80">
          Get personalized insights based on your spending habits. Add at least one transaction to start.
        </p>
      )}

      {loading && (
        <div className="space-y-2 animate-pulse">
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
          <div className="h-4 bg-white/20 rounded w-2/3"></div>
        </div>
      )}

      {insights && !loading && (
        <div className="prose prose-invert max-w-none prose-sm">
           <div className="bg-white/10 p-4 rounded-xl border border-white/10">
              <ul className="list-disc list-inside space-y-2 text-indigo-50">
                {insights.split('\n').filter(line => line.trim()).map((line, i) => (
                  <li key={i}>{line.replace(/^-\s*/, '').replace(/^\d\.\s*/, '')}</li>
                ))}
              </ul>
           </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
