import React, { useState } from "react";
import AppLayout from "./layout/AppLayout";
import DashboardHeader from "./dashboard/DashboardHeader";
import CurrentProductionCard from "./dashboard/CurrentProductionCard";
import EnergyStatsCard from "./dashboard/EnergyStatsCard";
import BatteryStatusCard from "./dashboard/BatteryStatusCard";
import UsageTrendsGraph from "./dashboard/UsageTrendsGraph";
import NotificationsPanel from "./notifications/NotificationsPanel";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] =
    useState(false);
  const { isDarkMode, setIsDarkMode } = useAuth();

  const handleDarkModeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  const handleNotificationsClick = () => {
    setIsNotificationsPanelOpen(true);
  };

  return (
    <AppLayout activeTab="home">
      <div className="flex flex-col space-y-6 bg-gray-50 dark:bg-gray-900">
        <DashboardHeader
          isDarkMode={isDarkMode}
          onDarkModeToggle={handleDarkModeToggle}
          onMenuToggle={() => setIsSideMenuOpen(true)}
          onNotificationsClick={handleNotificationsClick}
        />

        <NotificationsPanel
          isOpen={isNotificationsPanelOpen}
          onClose={() => setIsNotificationsPanelOpen(false)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CurrentProductionCard
            currentProduction={5.8}
            unit="kW"
            status="increasing"
            percentChange={12}
            lastUpdated="Just now"
          />

          <BatteryStatusCard
            batteryPercentage={75}
            isCharging={true}
            estimatedTimeRemaining="8 hours 45 minutes"
            lastUpdated="Just now"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EnergyStatsCard
            dailyEnergy={{
              value: 24.5,
              unit: "kWh",
              change: 12,
            }}
            monthlyEnergy={{
              value: 720,
              unit: "kWh",
              change: -5,
            }}
            yearlyEnergy={{
              value: 8760,
              unit: "kWh",
              change: 8,
            }}
          />

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              System Health
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Inverter Status
                </span>
                <span className="text-green-500 font-medium">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Panel Efficiency
                </span>
                <span className="text-blue-500 font-medium">98%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Last Maintenance
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  2 months ago
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Next Inspection
                </span>
                <span className="text-amber-500 font-medium">In 1 month</span>
              </div>
            </div>
          </div>
        </div>

        <UsageTrendsGraph />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Environmental Impact
            </h3>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  CO₂ Avoided
                </span>
                <span className="text-green-500 font-medium">1.2 tons</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Trees Equivalent
                </span>
                <span className="text-green-500 font-medium">52 trees</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Financial Savings
            </h3>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  This Month
                </span>
                <span className="text-blue-500 font-medium">$124.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Year to Date
                </span>
                <span className="text-blue-500 font-medium">$1,450.75</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Weather Forecast
            </h3>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Today</span>
                <span className="text-amber-500 font-medium">Sunny, 78°F</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Tomorrow
                </span>
                <span className="text-blue-500 font-medium">
                  Partly Cloudy, 72°F
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
