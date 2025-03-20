import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Activity,
  AlertTriangle,
  Battery,
  BatteryCharging,
  Calendar,
  Check,
  Clock,
  Cloud,
  Download,
  LineChart,
  Plug,
  RefreshCw,
  Sun,
  Upload,
  Zap,
} from "lucide-react";
import { cn } from "../../lib/utils";
import AppLayout from "../layout/AppLayout";
import DashboardHeader from "../dashboard/DashboardHeader";

interface MonitorDashboardProps {
  isLoading?: boolean;
}

const MonitorDashboard = ({ isLoading = false }: MonitorDashboardProps) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "panels" | "inverter" | "battery"
  >("overview");
  const [lastRefreshed, setLastRefreshed] = useState<string>("Just now");

  const handleRefresh = () => {
    // In a real app, this would fetch new data
    setLastRefreshed("Just now");
  };

  return (
    <AppLayout activeTab="monitor">
      <div className="flex flex-col space-y-6 bg-gray-50 dark:bg-gray-900">
        <DashboardHeader title="System Monitor" />

        <div className="flex items-center justify-between">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as any)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="panels">Panels</TabsTrigger>
              <TabsTrigger value="inverter">Inverter</TabsTrigger>
              <TabsTrigger value="battery">Battery</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="overview" className="space-y-6">
                <SystemOverview isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="panels" className="space-y-6">
                <SolarPanelsMonitor isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="inverter" className="space-y-6">
                <InverterMonitor isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="battery" className="space-y-6">
                <BatteryMonitor isLoading={isLoading} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Last updated: {lastRefreshed}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>

        <AlertsSection />
      </div>
    </AppLayout>
  );
};

const SystemOverview = ({ isLoading = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">System Operational</span>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Online
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">System Efficiency</span>
                  <span className="font-medium">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Sun className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>Production</span>
                  </div>
                  <div className="text-xl font-bold">5.8 kW</div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Plug className="h-4 w-4 mr-1 text-blue-500" />
                    <span>Consumption</span>
                  </div>
                  <div className="text-xl font-bold">3.2 kW</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-gray-500">Installed: Jan 15, 2023</span>
                </div>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-gray-500">Uptime: 99.8%</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Energy Flow</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="relative h-48 flex items-center justify-center">
              {/* Solar Panel */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <Sun className="h-10 w-10 text-yellow-500" />
                <div className="text-sm font-medium mt-1">Solar Panels</div>
                <div className="text-xs text-gray-500">5.8 kW</div>
                <div className="h-8 w-0.5 bg-yellow-500 mt-1"></div>
              </div>

              {/* Center Hub */}
              <div className="relative bg-gray-100 rounded-full h-20 w-20 flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-500" />
                <div className="absolute -top-6 text-xs font-medium">
                  Inverter
                </div>
              </div>

              {/* Home */}
              <div className="absolute bottom-0 left-0 transform translate-x-8 flex flex-col items-center">
                <div className="h-8 w-0.5 bg-blue-500 mb-1"></div>
                <div className="text-xs text-gray-500">3.2 kW</div>
                <div className="text-sm font-medium mb-1">Home</div>
                <Plug className="h-8 w-8 text-blue-500" />
              </div>

              {/* Battery */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className="h-8 w-0.5 bg-green-500 mb-1"></div>
                <div className="text-xs text-gray-500">1.8 kW</div>
                <div className="text-sm font-medium mb-1">Battery</div>
                <Battery className="h-8 w-8 text-green-500" />
              </div>

              {/* Grid */}
              <div className="absolute bottom-0 right-0 transform -translate-x-8 flex flex-col items-center">
                <div className="h-8 w-0.5 bg-gray-500 mb-1"></div>
                <div className="text-xs text-gray-500">0.8 kW</div>
                <div className="text-sm font-medium mb-1">Grid</div>
                <LineChart className="h-8 w-8 text-gray-500" />
              </div>

              {/* Flow Arrows */}
              <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2">
                <Download className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="absolute bottom-1/3 left-1/4 transform -translate-x-full">
                <Upload className="h-5 w-5 text-blue-500" />
              </div>
              <div className="absolute bottom-1/3 right-1/4 transform translate-x-full">
                <Download className="h-5 w-5 text-green-500" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Daily Production
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="h-64 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500 py-2">
                <div>6 kW</div>
                <div>4 kW</div>
                <div>2 kW</div>
                <div>0 kW</div>
              </div>

              {/* Chart area */}
              <div className="absolute left-10 right-0 top-0 bottom-0">
                {/* Horizontal grid lines */}
                <div className="absolute inset-0">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="absolute border-t border-gray-200 w-full"
                      style={{ top: `${(i * 100) / 3}%` }}
                    />
                  ))}
                </div>

                {/* Chart bars */}
                <div className="absolute inset-0 flex items-end justify-around">
                  {Array.from({ length: 24 }).map((_, i) => {
                    // Create a bell curve for solar production (peak at noon)
                    const hour = i;
                    let height = 0;
                    if (hour >= 6 && hour <= 18) {
                      height =
                        80 * Math.exp(-0.5 * Math.pow((hour - 12) / 3, 2));
                    }

                    return (
                      <div key={i} className="flex flex-col items-center group">
                        <div
                          className="w-3 bg-blue-500 rounded-t transition-all duration-300 group-hover:bg-blue-600"
                          style={{ height: `${height}%` }}
                        />
                        {i % 2 === 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            {i}:00
                          </div>
                        )}

                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {hour}:00 - {(height * 0.06).toFixed(2)} kW
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const SolarPanelsMonitor = ({ isLoading = false }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Solar Panel Array
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Total Capacity</div>
                  <div className="text-2xl font-bold">10 kW</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Panel Count</div>
                  <div className="text-2xl font-bold">24 panels</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Current Output</span>
                  <span className="font-medium">5.8 kW (58%)</span>
                </div>
                <Progress value={58} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 24 }).map((_, i) => {
                  // Randomly assign panel status for demo
                  const status = Math.random() > 0.9 ? "warning" : "normal";
                  const efficiency =
                    status === "normal"
                      ? 90 + Math.floor(Math.random() * 10)
                      : 70 + Math.floor(Math.random() * 20);

                  return (
                    <div
                      key={i}
                      className={cn(
                        "border rounded-lg p-2 text-center",
                        status === "normal"
                          ? "border-green-200 bg-green-50"
                          : "border-amber-200 bg-amber-50",
                      )}
                    >
                      <div className="text-xs font-medium">Panel {i + 1}</div>
                      <div
                        className={cn(
                          "text-xs",
                          status === "normal"
                            ? "text-green-600"
                            : "text-amber-600",
                        )}
                      >
                        {efficiency}%
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <div>Installation Date: Jan 15, 2023</div>
                <div>Warranty: 25 years</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Environmental Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Sun className="h-4 w-4 mr-1 text-yellow-500" />
                  <span>Solar Irradiance</span>
                </div>
                <div className="text-xl font-bold">850 W/m²</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Cloud className="h-4 w-4 mr-1 text-gray-500" />
                  <span>Cloud Cover</span>
                </div>
                <div className="text-xl font-bold">15%</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Activity className="h-4 w-4 mr-1 text-red-500" />
                  <span>Panel Temp</span>
                </div>
                <div className="text-xl font-bold">42°C</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Activity className="h-4 w-4 mr-1 text-blue-500" />
                  <span>Ambient Temp</span>
                </div>
                <div className="text-xl font-bold">28°C</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const InverterMonitor = ({ isLoading = false }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Inverter Status</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Inverter Operational</span>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Online
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Model</div>
                  <div className="font-medium">SolarEdge SE10000H</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Firmware</div>
                  <div className="font-medium">v4.12.8</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Efficiency</span>
                  <span className="font-medium">97.5%</span>
                </div>
                <Progress value={97.5} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Upload className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>DC Input</span>
                  </div>
                  <div className="text-xl font-bold">6.2 kW</div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Download className="h-4 w-4 mr-1 text-blue-500" />
                    <span>AC Output</span>
                  </div>
                  <div className="text-xl font-bold">5.8 kW</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Temperature</div>
                  <div className="font-medium">48°C</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Last Maintenance</div>
                  <div className="font-medium">3 months ago</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Power Quality</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Activity className="h-4 w-4 mr-1 text-blue-500" />
                  <span>AC Voltage</span>
                </div>
                <div className="text-xl font-bold">240V</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Activity className="h-4 w-4 mr-1 text-blue-500" />
                  <span>AC Frequency</span>
                </div>
                <div className="text-xl font-bold">60.1 Hz</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Activity className="h-4 w-4 mr-1 text-blue-500" />
                  <span>Power Factor</span>
                </div>
                <div className="text-xl font-bold">0.98</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Activity className="h-4 w-4 mr-1 text-yellow-500" />
                  <span>DC Voltage</span>
                </div>
                <div className="text-xl font-bold">380V</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Activity className="h-4 w-4 mr-1 text-yellow-500" />
                  <span>DC Current</span>
                </div>
                <div className="text-xl font-bold">16.3A</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Activity className="h-4 w-4 mr-1 text-red-500" />
                  <span>Temperature</span>
                </div>
                <div className="text-xl font-bold">48°C</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const BatteryMonitor = ({ isLoading = false }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Battery Status</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BatteryCharging className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Charging</span>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  75% Charged
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Battery Level</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Download className="h-4 w-4 mr-1 text-green-500" />
                    <span>Charging</span>
                  </div>
                  <div className="text-xl font-bold">1.8 kW</div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Clock className="h-4 w-4 mr-1 text-blue-500" />
                    <span>Time to Full</span>
                  </div>
                  <div className="text-xl font-bold">2h 15m</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Total Capacity</div>
                  <div className="font-medium">13.5 kWh</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Available Energy</div>
                  <div className="font-medium">10.1 kWh</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Temperature</div>
                  <div className="font-medium">32°C</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Cycles</div>
                  <div className="font-medium">248 cycles</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Battery Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-48 relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500 py-2">
                  <div>100%</div>
                  <div>75%</div>
                  <div>50%</div>
                  <div>25%</div>
                  <div>0%</div>
                </div>

                {/* Chart area */}
                <div className="absolute left-10 right-0 top-0 bottom-0">
                  {/* Horizontal grid lines */}
                  <div className="absolute inset-0">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="absolute border-t border-gray-200 w-full"
                        style={{ top: `${(i * 100) / 4}%` }}
                      />
                    ))}
                  </div>

                  {/* Chart line */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                      <path
                        d="M0,80 C20,70 40,60 60,50 C80,40 100,45 120,60 C140,75 160,85 180,75 C200,65 220,40 240,30 C260,20 280,25 300,40"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>

                  {/* Time labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                    <div>12 AM</div>
                    <div>6 AM</div>
                    <div>12 PM</div>
                    <div>6 PM</div>
                    <div>12 AM</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Activity className="h-4 w-4 mr-1 text-green-500" />
                    <span>Efficiency</span>
                  </div>
                  <div className="text-xl font-bold">94%</div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Activity className="h-4 w-4 mr-1 text-blue-500" />
                    <span>Health</span>
                  </div>
                  <div className="text-xl font-bold">98%</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const AlertsSection = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">System Alerts</CardTitle>
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            2 Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">
                  Panel Efficiency Warning
                </h4>
                <p className="text-sm text-amber-700 mt-1">
                  Panel #14 is operating at 72% efficiency, below the expected
                  threshold.
                </p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-xs text-amber-700">
                    Detected 2 hours ago
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">
                  Inverter Temperature High
                </h4>
                <p className="text-sm text-amber-700 mt-1">
                  Inverter temperature is 48°C, approaching the upper
                  recommended limit.
                </p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-xs text-amber-700">
                    Detected 30 minutes ago
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-800">
                  System Update Completed
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Firmware update to version 4.12.8 was successfully installed.
                </p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-xs text-gray-600">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitorDashboard;
