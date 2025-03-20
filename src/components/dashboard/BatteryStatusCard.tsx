import React from "react";
import { Battery, BatteryCharging, BatteryWarning, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { cn } from "../../lib/utils";

interface BatteryStatusCardProps {
  batteryPercentage?: number;
  isCharging?: boolean;
  estimatedTimeRemaining?: string;
  lastUpdated?: string;
}

const BatteryStatusCard = ({
  batteryPercentage = 75,
  isCharging = true,
  estimatedTimeRemaining = "8 hours 45 minutes",
  lastUpdated = "Just now",
}: BatteryStatusCardProps) => {
  // Determine battery status and styling
  const getBatteryStatus = () => {
    if (batteryPercentage <= 20) return "critical";
    if (batteryPercentage <= 40) return "low";
    if (batteryPercentage >= 80) return "high";
    return "normal";
  };

  const status = getBatteryStatus();

  const statusColors = {
    critical: "text-red-500",
    low: "text-amber-500",
    normal: "text-blue-500",
    high: "text-green-500",
  };

  const progressColors = {
    critical: "bg-red-500",
    low: "bg-amber-500",
    normal: "bg-blue-500",
    high: "bg-green-500",
  };

  const getBatteryIcon = () => {
    if (isCharging)
      return <BatteryCharging className="h-6 w-6 text-green-500" />;
    if (status === "critical")
      return <BatteryWarning className="h-6 w-6 text-red-500" />;
    return <Battery className={cn("h-6 w-6", statusColors[status])} />;
  };

  return (
    <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Battery Status</CardTitle>
        {getBatteryIcon()}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Battery percentage and visual indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Current Charge</span>
              <span className={cn("font-medium", statusColors[status])}>
                {batteryPercentage}%
              </span>
            </div>
            <Progress
              value={batteryPercentage}
              className="h-3 bg-gray-100"
              // Override the indicator style to use our status-based colors
              style={
                {
                  "--tw-progress-indicator": progressColors[status],
                } as React.CSSProperties
              }
            />
          </div>

          {/* Status information */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Status</span>
              <span className="font-medium flex items-center gap-1">
                {isCharging ? (
                  <>
                    <span className="text-green-500">Charging</span>
                    <BatteryCharging className="h-4 w-4 text-green-500" />
                  </>
                ) : (
                  <span className={statusColors[status]}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                )}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500">
                {isCharging ? "Time to Full" : "Remaining"}
              </span>
              <span className="font-medium flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                {estimatedTimeRemaining}
              </span>
            </div>
          </div>

          {/* Last updated timestamp */}
          <div className="pt-2 text-xs text-gray-400 text-right">
            Last updated: {lastUpdated}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatteryStatusCard;
