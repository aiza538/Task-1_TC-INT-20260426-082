import { useState, useEffect, useCallback } from 'react';
import LineChartComponent from './components/Charts/LineChart';
import BarChartComponent from './components/Charts/BarChart';
import PieChartComponent from './components/Charts/PieChart';
import DateRangePicker from './components/Filters/DateRangePicker';
import LoadingSkeleton from './components/Layout/LoadingSkeleton';
import ExportCSV from './components/Export/ExportCSV';
import { fetchDashboardData, fetchFilteredData } from './api/mockApi';
import { Sun, Moon, TrendingUp, Users, Wallet, Clock, Activity, Zap, BarChart3, Sparkles } from 'lucide-react';

function App() {
  const [dashboardData, setDashboardData] = useState({
    revenueData: [],
    featureUsage: [],
    userSegmentation: [],
    geographicData: [],
    kpis: {},
    lastUpdated: null,
  });
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const loadData = useCallback(async (startDate, endDate) => {
    setLoading(true);
    try {
      let data;
      if (startDate && endDate) {
        data = await fetchFilteredData(startDate, endDate);
      } else {
        data = await fetchDashboardData();
      }
      setDashboardData(data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      if (dateRange.start && dateRange.end) {
        loadData(dateRange.start, dateRange.end);
      } else {
        loadData();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [loading, loadData, dateRange]);

  // Smooth theme transition
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleDateRangeChange = (start, end) => {
    setDateRange({ start, end });
    loadData(start, end);
  };

  const handleRefresh = () => {
    if (dateRange.start && dateRange.end) {
      loadData(dateRange.start, dateRange.end);
    } else {
      loadData();
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const kpiCards = [
    { key: 'totalUsers', label: 'Total Users', icon: Users, color: 'blue', value: dashboardData.kpis?.totalUsers || 0, trend: '+12%', prefix: '', suffix: '' },
    { key: 'activeUsers', label: 'Active Users', icon: Activity, color: 'green', value: dashboardData.kpis?.activeUsers || 0, trend: '+8%', prefix: '', suffix: '' },
    { key: 'totalRevenue', label: 'Total Revenue', icon: Wallet, color: 'purple', value: dashboardData.kpis?.totalRevenue || 0, trend: '+15%', prefix: '$', suffix: 'K' },
    { key: 'avgSessionTime', label: 'Avg Session', icon: Clock, color: 'orange', value: dashboardData.kpis?.avgSessionTime || 0, trend: '+5%', prefix: '', suffix: 'min' },
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
    green: 'from-green-500 to-green-600 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400',
    purple: 'from-purple-500 to-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400',
    orange: 'from-orange-500 to-orange-600 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400',
  };

  const formatValue = (key, value) => {
    if (!value && value !== 0) return '0';
    if (key === 'totalRevenue') return `${(value / 1000).toFixed(1)}`;
    if (key === 'avgSessionTime') return `${value}`;
    return value.toLocaleString();
  };

  if (loading && dashboardData.revenueData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 glass shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-60 animate-pulse-glow"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-3 shadow-xl">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Analytics Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-500" />
                  Live Real-time Metrics
                  <Zap className="w-3 h-3 text-yellow-500 ml-1" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700 dark:text-green-400">Live</span>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>
              <ExportCSV data={dashboardData} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        
        <DateRangePicker
          onRangeChange={handleDateRangeChange}
          onRefresh={handleRefresh}
          lastUpdated={dashboardData.lastUpdated}
          isLoading={loading}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((card, index) => (
            <div
              key={card.key}
              className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-5 border border-gray-100 dark:border-gray-700 animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.label}</p>
                  <p className={`text-2xl font-bold mt-1 bg-gradient-to-r ${colorClasses[card.color].split(' ')[0]} bg-clip-text text-transparent`}>
                    {card.prefix}{formatValue(card.key, card.value)}{card.suffix}
                  </p>
                  <div className="flex items-center gap-1 mt-3">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">{card.trend}</span>
                    <span className="text-xs text-gray-400">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[card.color].split(' ')[2]} group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`w-5 h-5 ${colorClasses[card.color].split(' ')[3]}`} />
                </div>
              </div>
              <div className={`mt-4 h-1 bg-gradient-to-r ${colorClasses[card.color].split(' ')[0]} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Charts Section Title */}
        <div className="flex items-center justify-between mb-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Data Visualizations</h2>
          </div>
          <div className="flex gap-2">
            <span className="px-2.5 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">Line Chart</span>
            <span className="px-2.5 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">Bar Chart</span>
            <span className="px-2.5 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">Pie Charts</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
            <LineChartComponent data={dashboardData.revenueData} title="Revenue & Orders Trends" />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
            <BarChartComponent data={dashboardData.featureUsage} title="Feature Usage Analytics" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="animate-fade-up" style={{ animationDelay: '500ms' }}>
            <PieChartComponent data={dashboardData.userSegmentation} title="User Segmentation" />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '600ms' }}>
            <PieChartComponent data={dashboardData.geographicData} title="Geographic Distribution" />
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;