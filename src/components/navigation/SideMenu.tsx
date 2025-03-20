import React, { useState, useEffect } from "react";
import {
  Settings,
  HelpCircle,
  Bell,
  User,
  LogOut,
  ChevronRight,
  Info,
  FileText,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

interface SideMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SideMenu = ({ isOpen = false, onClose = () => {} }: SideMenuProps) => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <User size={20} />, label: "My Profile", link: "/profile" },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      link: "/notifications",
    },
    { icon: <Settings size={20} />, label: "Settings", link: "/settings" },
    { icon: <FileText size={20} />, label: "System Reports", link: "/reports" },
    {
      icon: <Shield size={20} />,
      label: "Privacy & Security",
      link: "/privacy",
    },
    { icon: <HelpCircle size={20} />, label: "Help & Support", link: "/help" },
    { icon: <Info size={20} />, label: "About Solterra", link: "/about" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[300px] bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center space-x-4 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={
                profile?.avatar_url ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=solterra"
              }
              alt={profile?.full_name || "User"}
            />
            <AvatarFallback>
              {profile?.full_name
                ? profile.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "US"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{profile?.full_name || "User"}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.link)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <Separator className="my-2" />

        {/* Logout Button */}
        <button
          onClick={async () => {
            try {
              await signOut();
              navigate("/login");
              onClose();
            } catch (error) {
              console.error("Error in logout:", error);
            }
          }}
          className="flex items-center space-x-3 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-auto"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
