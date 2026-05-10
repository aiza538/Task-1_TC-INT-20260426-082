import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const BarChartComponent = ({ data, title }) => {
  const isDark = document.documentElement.classList.contains('dark');
  
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">{title}</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <p className="text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700">
      <h3 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }} />
          <YAxis tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: isDark ? '#1f2937' : '#fff', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: isDark ? '#fff' : '#000' }}
          />
          <Bar dataKey="value" fill="#10B981" name="Usage Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;