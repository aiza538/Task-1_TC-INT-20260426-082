import React, { useState } from 'react';
import { Download, Sun, Moon, Bell } from 'lucide-react';

const Header = ({ dashboardData, onThemeToggle, isDarkMode }) => {
  const [showExport, setShowExport] = useState(false);

  const exportCSV = () => {
    const data = dashboardData.revenueData || [];
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csv = [headers.join(','), ...data.map(row => headers.map(h => row[h]).join(','))].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-data-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
      <div className="px-4 py-4 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500">Real-time metrics</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <button 
              onClick={() => setShowExport(!showExport)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2"
            >
              <Download size={16} /> Export
            </button>
            {showExport && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border">
                <button onClick={exportCSV} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Export CSV
                </button>
              </div>
            )}
          </div>
          <button onClick={onThemeToggle} className="p-2 rounded-lg hover:bg-gray-100">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;