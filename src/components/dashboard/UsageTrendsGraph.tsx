import React, { useState } from "react";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "../../lib/utils";
import { ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";

interface UsageData {
  timestamp: string;
  production: number;
  consumption: number;
}

interface UsageTrendsGraphProps {
  data?: UsageData[];
  period?: "day" | "week" | "month" | "year";
  onPeriodChange?: (period: "day" | "week" | "month" | "year") => void;
}

const UsageTrendsGraph = ({
  data = generateMockData(),
  period = "day",
  onPeriodChange = () => {},
}: UsageTrendsGraphProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "day" | "week" | "month" | "year"
  >(period);

  const handlePeriodChange = (newPeriod: "day" | "week" | "month" | "year") => {
    setSelectedPeriod(newPeriod);
    onPeriodChange(newPeriod);
  };

  // Find max value for scaling the graph
  const maxValue = Math.max(
    ...data.map((item) => Math.max(item.production, item.consumption)),
  );

  return (
    <Card className="w-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Energy Usage Trends</h3>
          <p className="text-gray-500 text-sm">
            Compare your production and consumption
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      <Tabs
        defaultValue={selectedPeriod}
        onValueChange={(value) => handlePeriodChange(value as any)}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>

        {["day", "week", "month", "year"].map((p) => (
          <TabsContent key={p} value={p} className="h-[250px] relative">
            <div className="flex h-full">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between pr-2 text-xs text-gray-500 py-2">
                <div>{maxValue.toFixed(1)} kWh</div>
                <div>{(maxValue * 0.75).toFixed(1)} kWh</div>
                <div>{(maxValue * 0.5).toFixed(1)} kWh</div>
                <div>{(maxValue * 0.25).toFixed(1)} kWh</div>
                <div>0 kWh</div>
              </div>

              {/* Graph */}
              <div className="flex-1 relative">
                {/* Horizontal grid lines */}
                <div className="absolute w-full h-full">
                  {[0.25, 0.5, 0.75, 1].map((line, i) => (
                    <div
                      key={i}
                      className="absolute border-t border-gray-200 w-full"
                      style={{ top: `${100 - line * 100}%` }}
                    />
                  ))}
                </div>

                {/* Bars */}
                <div className="flex h-full items-end justify-between relative z-10">
                  {data
                    .slice(0, getDataPointsForPeriod(p as any))
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center group"
                        style={{
                          width: `${100 / getDataPointsForPeriod(p as any)}%`,
                        }}
                      >
                        <div className="w-full flex justify-center space-x-1">
                          {/* Production bar */}
                          <div
                            className="w-3 bg-green-500 rounded-t transition-all duration-300 group-hover:opacity-90"
                            style={{
                              height: `${(item.production / maxValue) * 100}%`,
                            }}
                          />
                          {/* Consumption bar */}
                          <div
                            className="w-3 bg-blue-500 rounded-t transition-all duration-300 group-hover:opacity-90"
                            style={{
                              height: `${(item.consumption / maxValue) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          {getTimeLabel(item.timestamp, p as any, index)}
                        </div>

                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Production: {item.production.toFixed(2)} kWh
                          <br />
                          Consumption: {item.consumption.toFixed(2)} kWh
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between mt-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
          <span className="text-sm">Solar Production</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
          <span className="text-sm">Home Consumption</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <ArrowUpRight className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm font-medium">Production Trend</span>
          </div>
          <p className="text-lg font-bold mt-1">
            +12.5% vs last {selectedPeriod}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <ArrowDownRight className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm font-medium">Consumption Trend</span>
          </div>
          <p className="text-lg font-bold mt-1">
            -8.3% vs last {selectedPeriod}
          </p>
        </div>
      </div>
    </Card>
  );
};

// Helper functions
function getDataPointsForPeriod(
  period: "day" | "week" | "month" | "year",
): number {
  switch (period) {
    case "day":
      return 24; // 24 hours
    case "week":
      return 7; // 7 days
    case "month":
      return 30; // 30 days
    case "year":
      return 12; // 12 months
    default:
      return 24;
  }
}

function getTimeLabel(
  timestamp: string,
  period: "day" | "week" | "month" | "year",
  index: number,
): string {
  switch (period) {
    case "day":
      return `${index}:00`;
    case "week":
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index];
    case "month":
      return `${index + 1}`;
    case "year":
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][index];
    default:
      return "";
  }
}

function generateMockData(): UsageData[] {
  const data: UsageData[] = [];

  // Generate 24 hours of data for a day view
  for (let i = 0; i < 24; i++) {
    // Solar production is higher during daylight hours
    let production = 0;
    if (i >= 6 && i <= 18) {
      // Bell curve for solar production (peak at noon)
      production = 5 * Math.exp(-0.5 * Math.pow((i - 12) / 3, 2));
    }

    // Consumption has morning and evening peaks
    let consumption = 1 + Math.random() * 0.5;
    if ((i >= 6 && i <= 9) || (i >= 17 && i <= 21)) {
      consumption += 2 + Math.random() * 1.5;
    }

    data.push({
      timestamp: new Date(2023, 0, 1, i).toISOString(),
      production,
      consumption,
    });
  }

  // Generate data for week, month, and year views
  for (let i = 0; i < 30; i++) {
    if (i < 24) continue; // Skip first 24 entries as they're already populated

    data.push({
      timestamp: new Date(
        2023,
        0,
        1 + Math.floor((i - 24) / 7),
        12,
      ).toISOString(),
      production: 2 + Math.random() * 4,
      consumption: 2 + Math.random() * 3,
    });
  }

  return data;
}

export default UsageTrendsGraph;
