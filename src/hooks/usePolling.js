import { useEffect, useRef, useCallback } from "react";

// Mock data functions
const generateRevenueData = (days = 30) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - 1 - i) * 86400000).toLocaleDateString(),
    revenue: Math.floor(5000 + Math.random() * 3000 + Math.sin(i / 7) * 1000),
    orders: Math.floor(100 + Math.random() * 80 + Math.sin(i / 5) * 40),
  }));
};

const generateFeatureUsage = () => [
  { feature: "Authentication", usage: Math.floor(850 + Math.random() * 150) },
  { feature: "Analytics", usage: Math.floor(620 + Math.random() * 120) },
  { feature: "Reports", usage: Math.floor(480 + Math.random() * 100) },
  { feature: "Export", usage: Math.floor(320 + Math.random() * 80) },
  { feature: "API Calls", usage: Math.floor(750 + Math.random() * 130) },
];

const generateUserSegmentation = () => [
  {
    name: "Free Tier",
    value: Math.floor(4500 + Math.random() * 500),
    color: "#3B82F6",
  },
  {
    name: "Pro Tier",
    value: Math.floor(2100 + Math.random() * 300),
    color: "#10B981",
  },
  {
    name: "Enterprise",
    value: Math.floor(380 + Math.random() * 100),
    color: "#8B5CF6",
  },
  {
    name: "Trial",
    value: Math.floor(1200 + Math.random() * 200),
    color: "#F59E0B",
  },
];

const generateKPIs = () => ({
  totalUsers: Math.floor(8500 + Math.random() * 500),
  activeUsers: Math.floor(4200 + Math.random() * 300),
  totalRevenue: Math.floor(125000 + Math.random() * 15000),
  avgSessionTime: Math.floor(8 + Math.random() * 4),
});

const generateGeographicData = () => [
  { country: "United States", value: 42, color: "#3B82F6" },
  { country: "United Kingdom", value: 18, color: "#10B981" },
  { country: "Germany", value: 15, color: "#8B5CF6" },
  { country: "France", value: 12, color: "#F59E0B" },
  { country: "Canada", value: 8, color: "#EF4444" },
  { country: "Others", value: 5, color: "#6B7280" },
];

// Export functions
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

export const fetchRealTimeUpdate = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    revenueData: generateRevenueData(30),
    featureUsage: generateFeatureUsage(),
    userSegmentation: generateUserSegmentation(),
    geographicData: generateGeographicData(),
    kpis: generateKPIs(),
    lastUpdated: new Date().toISOString(),
  };
};

// Polling hook
export const usePolling = (callback, interval = 30000, enabled = true) => {
  const savedCallback = useRef();
  const intervalRef = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const startPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, interval);
  }, [interval]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      startPolling();
    } else {
      stopPolling();
    }
    return () => stopPolling();
  }, [enabled, startPolling, stopPolling]);

  return { stopPolling, startPolling };
};
