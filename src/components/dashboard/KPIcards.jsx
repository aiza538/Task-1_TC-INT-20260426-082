import React from 'react';

const KPICards = ({ data, loading }) => {
  const cards = [
    { key: 'totalUsers', label: 'Total Users', prefix: '', suffix: '' },
    { key: 'activeUsers', label: 'Active Users', prefix: '', suffix: '' },
    { key: 'totalRevenue', label: 'Total Revenue', prefix: '$', suffix: 'K' },
    { key: 'avgSessionTime', label: 'Avg Session', prefix: '', suffix: 'min' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-3"></div>
          </div>
        ))}
      </div>
    );
  }

  const formatValue = (key, value) => {
    if (key === 'totalRevenue') return `$${(value / 1000).toFixed(1)}K`;
    if (key === 'avgSessionTime') return `${value}min`;
    return value?.toLocaleString() || 0;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.key} className="card hover:scale-105 transition-transform duration-300">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.label}</p>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            {formatValue(card.key, data?.[card.key])}
          </p>
          <p className="text-xs text-green-500 mt-2">↑ 12% from last month</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;