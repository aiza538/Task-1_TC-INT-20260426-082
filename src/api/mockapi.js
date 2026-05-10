const generateRevenueData = (days = 30) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - 1 - i) * 86400000).toLocaleDateString(
      "en-GB",
    ),
    revenue: Math.floor(5000 + Math.random() * 3000),
    orders: Math.floor(100 + Math.random() * 80),
  }));
};

const generateFeatureUsage = () => [
  { name: "Authentication", value: 983 },
  { name: "Analytics", value: 725 },
  { name: "Reports", value: 541 },
  { name: "Export", value: 389 },
];

const generateUserSegmentation = () => [
  { name: "Free Tier", value: 4850, color: "#3B82F6" },
  { name: "Pro Tier", value: 2250, color: "#10B981" },
  { name: "Enterprise", value: 420, color: "#8B5CF6" },
];

const generateKPIs = () => ({
  totalUsers: 8945,
  activeUsers: 4286,
  totalRevenue: 125600,
  avgSessionTime: 8,
});

const generateGeographicData = () => [
  { name: "USA", value: 42, color: "#3B82F6" },
  { name: "UK", value: 18, color: "#10B981" },
  { name: "Germany", value: 15, color: "#8B5CF6" },
  { name: "France", value: 12, color: "#F59E0B" },
  { name: "Canada", value: 8, color: "#EF4444" },
];

export const fetchDashboardData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    revenueData: generateRevenueData(30),
    featureUsage: generateFeatureUsage(),
    userSegmentation: generateUserSegmentation(),
    geographicData: generateGeographicData(),
    kpis: generateKPIs(),
    lastUpdated: new Date().toISOString(),
  };
};

export const fetchFilteredData = async (startDate, endDate) => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const days = Math.ceil((endDate - startDate) / 86400000);
  const validDays = Math.min(Math.max(days, 7), 90);

  return {
    revenueData: generateRevenueData(validDays),
    featureUsage: generateFeatureUsage(),
    userSegmentation: generateUserSegmentation(),
    geographicData: generateGeographicData(),
    kpis: generateKPIs(),
    lastUpdated: new Date().toISOString(),
  };
};
