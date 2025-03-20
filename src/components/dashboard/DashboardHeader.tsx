import React, { useState, useEffect } from "react";
import { Bell, Menu, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import { useAuth } from "../../contexts/AuthContext";
import { getNotifications } from "../../lib/api";

interface DashboardHeaderProps {
  title?: string;
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  isDarkMode?: boolean;
  onDarkModeToggle?: (isDark: boolean) => void;
  onMenuToggle?: () => void;
  onNotificationsClick?: () => void;
}

const DashboardHeader = ({
  title = "Solterra Solar",
  userName,
  userAvatar,
  notificationCount,
  isDarkMode,
  onDarkModeToggle = () => {},
  onMenuToggle = () => {},
  onNotificationsClick = () => {},
}: DashboardHeaderProps) => {
  const {
    user,
    profile,
    isDarkMode: contextDarkMode,
    setIsDarkMode,
  } = useAuth();
  const [darkMode, setDarkMode] = useState(
    isDarkMode !== undefined ? isDarkMode : contextDarkMode,
  );
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Use profile data if props are not provided
  const displayName = userName || profile?.full_name || "User";
  const avatarUrl =
    userAvatar ||
    profile?.avatar_url ||
    "https://api.dicebear.com/7.x/avataaars/svg?seed=solterra";
  const notifCount =
    notificationCount !== undefined
      ? notificationCount
      : notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    setDarkMode(contextDarkMode);
  }, [contextDarkMode]);

  const fetchNotifications = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await getNotifications(user.id);
      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setIsDarkMode(newDarkMode);
    onDarkModeToggle(newDarkMode);
  };

  return (
    <header className="w-full h-20 px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 lg:hidden"
          onClick={onMenuToggle}
        >
          <Menu size={24} />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dashboard Overview
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          {contextDarkMode ? (
            <Moon size={18} className="text-gray-500 dark:text-gray-400" />
          ) : (
            <Sun size={18} className="text-gray-500 dark:text-gray-400" />
          )}
          <Switch
            checked={contextDarkMode}
            onCheckedChange={handleDarkModeToggle}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onNotificationsClick}
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <Badge
                className={cn(
                  "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center",
                  "bg-red-500 text-white text-xs",
                )}
                variant="destructive"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback>
              {(displayName &&
                displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")) ||
                "U"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block font-medium text-sm dark:text-white">
            {displayName}
          </span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
