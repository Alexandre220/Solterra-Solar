import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Sun, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface CurrentProductionCardProps {
  currentProduction?: number;
  unit?: string;
  status?: "increasing" | "decreasing" | "stable";
  percentChange?: number;
  lastUpdated?: string;
  isLoading?: boolean;
}

const CurrentProductionCard = ({
  currentProduction = 5.8,
  unit = "kW",
  status = "increasing",
  percentChange = 12,
  lastUpdated = "Just now",
  isLoading = false,
}: CurrentProductionCardProps) => {
  // Determine status color
  const statusColor = {
    increasing: "text-green-500",
    decreasing: "text-red-500",
    stable: "text-blue-500",
  }[status];

  // Determine status icon
  const StatusIcon = {
    increasing: ArrowUp,
    decreasing: ArrowDown,
    stable: () => null,
  }[status];

  return (
    <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Sun className="h-5 w-5 text-yellow-500" />
          Current Production
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-24 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-4xl font-bold">{currentProduction}</span>
              <span className="text-xl mb-1 text-gray-500">{unit}</span>
              {StatusIcon && (
                <div className="flex items-center ml-4 mb-1">
                  <StatusIcon className={cn("h-5 w-5 mr-1", statusColor)} />
                  <span className={cn("text-sm font-medium", statusColor)}>
                    {percentChange}%
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${Math.min((currentProduction / 10) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <span>Max capacity: 10 {unit}</span>
              <span>Updated: {lastUpdated}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentProductionCard;
