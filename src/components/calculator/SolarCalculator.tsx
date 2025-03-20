import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calculator, Sun, DollarSign, Leaf } from "lucide-react";

interface SolarCalculatorProps {
  onSaveCalculation?: (calculation: any) => void;
}

const SolarCalculator = ({ onSaveCalculation }: SolarCalculatorProps) => {
  // Input state
  const [location, setLocation] = useState("");
  const [roofArea, setRoofArea] = useState<number>(500);
  const [monthlyBill, setMonthlyBill] = useState<number>(2500);
  const [sunlightHours, setSunlightHours] = useState<number>(5);
  const [roofType, setRoofType] = useState("flat");
  const [electricityRate, setElectricityRate] = useState<number>(2.5);

  // Results state
  const [results, setResults] = useState({
    systemSize: 0,
    installationCost: 0,
    annualProduction: 0,
    annualSavings: 0,
    paybackPeriod: 0,
    co2Reduction: 0,
    treesEquivalent: 0,
  });

  // Calculate results
  const calculateResults = () => {
    // These are simplified calculations for demonstration
    // In a real app, you would use more accurate formulas or an API

    // Calculate system size based on roof area and efficiency
    const roofEfficiency =
      roofType === "flat" ? 0.15 : roofType === "sloped_south" ? 0.18 : 0.16;
    const systemSize = (roofArea * roofEfficiency) / 100; // in kW

    // Calculate annual production based on system size and sunlight hours
    const annualProduction = systemSize * sunlightHours * 365; // in kWh

    // Calculate installation cost
    const installationCost = systemSize * 45000; // R45000 per kW is an average cost in South Africa

    // Calculate annual savings
    const annualSavings = annualProduction * electricityRate;

    // Calculate payback period
    const paybackPeriod = installationCost / annualSavings;

    // Calculate environmental impact
    const co2Reduction = annualProduction * 0.0007; // 0.7 kg CO2 per kWh
    const treesEquivalent = co2Reduction * 0.04; // 40 trees per ton of CO2

    const newResults = {
      systemSize: parseFloat(systemSize.toFixed(2)),
      installationCost: parseFloat(installationCost.toFixed(2)),
      annualProduction: parseFloat(annualProduction.toFixed(2)),
      annualSavings: parseFloat(annualSavings.toFixed(2)),
      paybackPeriod: parseFloat(paybackPeriod.toFixed(1)),
      co2Reduction: parseFloat(co2Reduction.toFixed(2)),
      treesEquivalent: parseFloat(treesEquivalent.toFixed(0)),
    };

    setResults(newResults);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="bg-blue-50 border-b">
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-600" />
          <CardTitle className="text-xl font-bold text-blue-800">
            Solar Savings Calculator (South Africa)
          </CardTitle>
        </div>
        <CardDescription>
          Estimate your potential solar system size, cost, and savings based on
          your location and energy usage.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="input">Input Parameters</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location (ZIP Code or City)</Label>
                <Input
                  id="location"
                  placeholder="e.g., 90210 or Los Angeles"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Roof Type */}
              <div className="space-y-2">
                <Label htmlFor="roofType">Roof Type</Label>
                <Select value={roofType} onValueChange={setRoofType}>
                  <SelectTrigger id="roofType">
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat Roof</SelectItem>
                    <SelectItem value="sloped_south">
                      Sloped Roof (South Facing)
                    </SelectItem>
                    <SelectItem value="sloped_other">
                      Sloped Roof (Other Direction)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Roof Area */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="roofArea">Available Roof Area (sq ft)</Label>
                <span className="text-sm font-medium">{roofArea} sq ft</span>
              </div>
              <Slider
                id="roofArea"
                min={100}
                max={2000}
                step={50}
                value={[roofArea]}
                onValueChange={(value) => setRoofArea(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>100 sq ft</span>
                <span>2000 sq ft</span>
              </div>
            </div>

            {/* Monthly Bill */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="monthlyBill">
                  Average Monthly Electricity Bill (R)
                </Label>
                <span className="text-sm font-medium">R{monthlyBill}</span>
              </div>
              <Slider
                id="monthlyBill"
                min={500}
                max={8000}
                step={100}
                value={[monthlyBill]}
                onValueChange={(value) => setMonthlyBill(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>R500</span>
                <span>R8000</span>
              </div>
            </div>

            {/* Sunlight Hours */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="sunlightHours">
                  Average Daily Sunlight Hours
                </Label>
                <span className="text-sm font-medium">
                  {sunlightHours} hours
                </span>
              </div>
              <Slider
                id="sunlightHours"
                min={3}
                max={8}
                step={0.5}
                value={[sunlightHours]}
                onValueChange={(value) => setSunlightHours(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>3 hours</span>
                <span>8 hours</span>
              </div>
            </div>

            {/* Electricity Rate */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="electricityRate">
                  Electricity Rate (R/kWh)
                </Label>
                <span className="text-sm font-medium">
                  R{electricityRate.toFixed(2)}/kWh
                </span>
              </div>
              <Slider
                id="electricityRate"
                min={1.5}
                max={6.0}
                step={0.1}
                value={[electricityRate]}
                onValueChange={(value) => setElectricityRate(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>R1.50/kWh</span>
                <span>R6.00/kWh</span>
              </div>
            </div>

            <Button
              onClick={calculateResults}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
            >
              Calculate Savings
            </Button>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* System Size */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Recommended System Size</h3>
                </div>
                <p className="text-3xl font-bold text-blue-700">
                  {results.systemSize} kW
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Based on your roof area and efficiency
                </p>
              </div>

              {/* Installation Cost */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Estimated Installation Cost</h3>
                </div>
                <p className="text-3xl font-bold text-blue-700">
                  R{results.installationCost.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Before incentives and tax credits
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Annual Production */}
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-1">Annual Production</h3>
                <p className="text-2xl font-bold text-blue-700">
                  {results.annualProduction.toLocaleString()} kWh
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Estimated yearly energy generation
                </p>
              </div>

              {/* Annual Savings */}
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-1">Annual Savings</h3>
                <p className="text-2xl font-bold text-green-600">
                  R{results.annualSavings.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Estimated yearly bill reduction
                </p>
              </div>

              {/* Payback Period */}
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-1">Payback Period</h3>
                <p className="text-2xl font-bold text-blue-700">
                  {results.paybackPeriod} years
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Time to recoup your investment
                </p>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-green-50 p-4 rounded-lg mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="h-5 w-5 text-green-600" />
                <h3 className="font-medium">Environmental Impact</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">CO₂ Reduction</p>
                  <p className="text-xl font-bold text-green-700">
                    {results.co2Reduction} tons/year
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Equivalent to Planting
                  </p>
                  <p className="text-xl font-bold text-green-700">
                    {results.treesEquivalent} trees
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => calculateResults()}>
                Recalculate
              </Button>
              <Button
                onClick={() =>
                  onSaveCalculation &&
                  onSaveCalculation({
                    ...results,
                    location,
                    roofArea,
                    monthlyBill,
                    sunlightHours,
                    roofType,
                    electricityRate,
                    date: new Date().toISOString(),
                  })
                }
                className="bg-green-600 hover:bg-green-700"
              >
                Save Calculation
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SolarCalculator;
