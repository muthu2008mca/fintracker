
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FinanceStats } from '../types';

interface FinanceChartProps {
  stats: FinanceStats;
}

const FinanceChart: React.FC<FinanceChartProps> = ({ stats }) => {
  const data = [
    { name: 'Expenses', value: stats.totalExpenses, color: '#f43f5e' },
    { name: 'Savings', value: Math.max(0, stats.savings), color: '#10b981' },
  ];

  // If there's no data, show a placeholder
  if (stats.totalIncome === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        <p>No income recorded yet.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
          formatter={(value: number) => `$${value.toLocaleString()}`}
        />
        <Legend verticalAlign="bottom" height={36}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default FinanceChart;
