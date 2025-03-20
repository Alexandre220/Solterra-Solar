import React from "react";
import { ArrowUp, ArrowDown, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { cn } from "../../lib/utils";

interface EnergyStatsCardProps {
  dailyEnergy?: {
    value: number;
    unit: string;
    change: number;
  };
  monthlyEnergy?: {
    value: number;
    unit: string;
    change: number;
  };
  yearlyEnergy?: {
    value: number;
    unit: string;
    change: number;
  };
}

const EnergyStatsCard = ({
  dailyEnergy = {
    value: 24.5,
    unit: "kWh",
    change: 12,
  },
  monthlyEnergy = {
    value: 720,
    unit: "kWh",
    change: -5,
  },
  yearlyEnergy = {
    value: 8760,
    unit: "kWh",
    change: 8,
  },
}: EnergyStatsCardProps) => {
  // Calculate progress values for visualization
  const dailyProgress = Math.min(
    Math.max((dailyEnergy.value / 30) * 100, 0),
    100,
  );
  const monthlyProgress = Math.min(
    Math.max((monthlyEnergy.value / 900) * 100, 0),
    100,
  );
  const yearlyProgress = Math.min(
    Math.max((yearlyEnergy.value / 10000) * 100, 0),
    100,
  );

  return (
    <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Energy Statistics</CardTitle>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-1" />
            <span>Last updated: Today, 2:30 PM</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Daily Energy */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm text-gray-600">
                Daily Energy
              </h4>
              <div className="flex items-center">
                <span className="text-lg font-bold mr-1">
                  {dailyEnergy.value} {dailyEnergy.unit}
                </span>
                <ChangeIndicator value={dailyEnergy.change} />
              </div>
            </div>
            <Progress value={dailyProgress} className="h-2" />
            <p className="text-xs text-gray-500">
              {dailyEnergy.change > 0 ? "Up" : "Down"}{" "}
              {Math.abs(dailyEnergy.change)}% from yesterday
            </p>
          </div>

          {/* Monthly Energy */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm text-gray-600">
                Monthly Energy
              </h4>
              <div className="flex items-center">
                <span className="text-lg font-bold mr-1">
                  {monthlyEnergy.value} {monthlyEnergy.unit}
                </span>
                <ChangeIndicator value={monthlyEnergy.change} />
              </div>
            </div>
            <Progress value={monthlyProgress} className="h-2" />
            <p className="text-xs text-gray-500">
              {monthlyEnergy.change > 0 ? "Up" : "Down"}{" "}
              {Math.abs(monthlyEnergy.change)}% from last month
            </p>
          </div>

          {/* Yearly Energy */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm text-gray-600">
                Yearly Energy
              </h4>
              <div className="flex items-center">
                <span className="text-lg font-bold mr-1">
                  {yearlyEnergy.value} {yearlyEnergy.unit}
                </span>
                <ChangeIndicator value={yearlyEnergy.change} />
              </div>
            </div>
            <Progress value={yearlyProgress} className="h-2" />
            <p className="text-xs text-gray-500">
              {yearlyEnergy.change > 0 ? "Up" : "Down"}{" "}
              {Math.abs(yearlyEnergy.change)}% from last year
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ChangeIndicatorProps {
  value: number;
}

const ChangeIndicator = ({ value = 0 }: ChangeIndicatorProps) => {
  if (value === 0) return null;

  const isPositive = value > 0;

  return (
    <div
      className={cn(
        "flex items-center ml-2 px-1.5 py-0.5 rounded text-xs",
        isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
      )}
    >
      {isPositive ? (
        <ArrowUp size={12} className="mr-0.5" />
      ) : (
        <ArrowDown size={12} className="mr-0.5" />
      )}
      <span>{Math.abs(value)}%</span>
    </div>
  );
};

export default EnergyStatsCard;
