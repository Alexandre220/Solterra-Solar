import React, { useState } from "react";
import { Home, Activity, Calculator, User } from "lucide-react";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

interface BottomNavBarProps {
  activeTab?: "home" | "monitor" | "calculate" | "profile";
  onTabChange?: (tab: "home" | "monitor" | "calculate" | "profile") => void;
}

const BottomNavBar = ({
  activeTab = "home",
  onTabChange = () => {},
}: BottomNavBarProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const navigate = useNavigate();

  const handleTabChange = (
    tab: "home" | "monitor" | "calculate" | "profile",
  ) => {
    setCurrentTab(tab);
    onTabChange(tab);

    // Navigate to the appropriate route
    switch (tab) {
      case "home":
        navigate("/");
        break;
      case "calculate":
        navigate("/calculator");
        break;
      case "monitor":
        navigate("/monitor");
        break;
      case "profile":
        navigate("/profile");
        break;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around shadow-md z-10">
      <NavItem
        icon={<Home size={24} />}
        label="Home"
        isActive={currentTab === "home"}
        onClick={() => handleTabChange("home")}
      />
      <NavItem
        icon={<Activity size={24} />}
        label="Monitor"
        isActive={currentTab === "monitor"}
        onClick={() => handleTabChange("monitor")}
      />
      <NavItem
        icon={<Calculator size={24} />}
        label="Calculate"
        isActive={currentTab === "calculate"}
        onClick={() => handleTabChange("calculate")}
      />
      <NavItem
        icon={<User size={24} />}
        label="Profile"
        isActive={currentTab === "profile"}
        onClick={() => handleTabChange("profile")}
      />
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({
  icon,
  label,
  isActive = false,
  onClick = () => {},
}: NavItemProps) => {
  return (
    <button
      className="flex flex-col items-center justify-center w-1/4 h-full"
      onClick={onClick}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          isActive ? "text-blue-600" : "text-gray-500",
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          "text-xs mt-1",
          isActive ? "text-blue-600 font-medium" : "text-gray-500",
        )}
      >
        {label}
      </span>
    </button>
  );
};

export default BottomNavBar;
