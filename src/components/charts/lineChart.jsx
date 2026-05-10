import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const LineChartComponent = ({ data, title }) => {
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

  const chartData = data.slice(-14);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700">
      <h3 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }} angle={-45} textAnchor="end" height={50} />
          <YAxis tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: isDark ? '#1f2937' : '#fff', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: isDark ? '#fff' : '#000' }}
          />
          <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} name="Revenue ($)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;