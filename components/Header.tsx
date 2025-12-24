
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              F
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">FinTrack <span className="text-indigo-600">AI</span></h1>
          </div>
          <div className="text-sm font-medium text-slate-500">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
