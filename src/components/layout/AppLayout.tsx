import React, { useState, useEffect } from "react";
import BottomNavBar from "../navigation/BottomNavBar";
import SideMenu from "../navigation/SideMenu";
import { Menu } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface AppLayoutProps {
  children?: React.ReactNode;
  activeTab?: "home" | "monitor" | "calculate" | "profile";
}

const AppLayout = ({ children, activeTab = "home" }: AppLayoutProps) => {
  const { isDarkMode } = useAuth();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleTabChange = (
    tab: "home" | "monitor" | "calculate" | "profile",
  ) => {
    setCurrentTab(tab);
    // In a real app, this would likely navigate to a different route
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* App Header */}
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1559302995-f1d7e5b82fe9?w=100&q=80"
              alt="Solterra Logo"
              className="h-8 w-8 mr-2 rounded-full bg-blue-500 p-1"
            />
            <h1 className="text-lg font-semibold">Solterra Solar</h1>
          </div>
          <button
            onClick={toggleSideMenu}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto pb-20">
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavBar activeTab={currentTab} onTabChange={handleTabChange} />

      {/* Side Menu (hidden by default) */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />

      {/* Overlay when side menu is open */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSideMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;
