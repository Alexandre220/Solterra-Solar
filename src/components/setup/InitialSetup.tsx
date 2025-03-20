import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { createSolarSystem, generateSystemMockData } from "../../lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Progress } from "../ui/progress";

interface InitialSetupProps {
  onComplete?: () => void;
}

const InitialSetup = ({ onComplete }: InitialSetupProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  // System details
  const [systemName, setSystemName] = useState("My Solar System");
  const [capacity, setCapacity] = useState(10);
  const [panelsCount, setPanelsCount] = useState(24);
  const [batteryCapacity, setBatteryCapacity] = useState(13.5);
  const [installationDate, setInstallationDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [location, setLocation] = useState({
    address: "Cape Town, South Africa",
    latitude: -33.9249,
    longitude: 18.4241,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to set up your system");
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      // Step 1: Create the solar system
      setProgress(20);
      const { data: system, error: systemError } = await createSolarSystem({
        user_id: user.id,
        name: systemName,
        capacity_kw: capacity,
        installation_date: installationDate,
        panels_count: panelsCount,
        inverter_model: "SolarEdge SE10000H",
        battery_capacity_kwh: batteryCapacity,
        location,
      });

      if (systemError) throw systemError;
      if (!system || !system[0]) throw new Error("Failed to create system");

      // Step 2: Generate mock data for the system
      setProgress(50);
      const { error: mockDataError } = await generateSystemMockData(
        system[0].id,
        30, // Generate 30 days of data
      );

      if (mockDataError) throw mockDataError;

      // Step 3: Complete setup
      setProgress(100);
      setSuccess(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
    } catch (error: any) {
      setError(error.message || "Failed to set up your solar system");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Card className="w-full max-w-lg mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Set Up Your System</CardTitle>
        <CardDescription>
          Let's set up your solar system to start monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success ? (
          <div className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Your solar system has been set up successfully!
              </AlertDescription>
            </Alert>
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">
                You can now start monitoring your solar system's performance.
              </p>
              {onComplete && (
                <Button onClick={onComplete}>Go to Dashboard</Button>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    id="systemName"
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installationDate">Installation Date</Label>
                  <Input
                    id="installationDate"
                    type="date"
                    value={installationDate}
                    onChange={(e) => setInstallationDate(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location.address}
                    onChange={(e) =>
                      setLocation({ ...location, address: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="capacity">System Capacity (kW)</Label>
                    <span className="text-sm font-medium">{capacity} kW</span>
                  </div>
                  <Slider
                    id="capacity"
                    min={1}
                    max={20}
                    step={0.5}
                    value={[capacity]}
                    onValueChange={(value) => setCapacity(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="panelsCount">Number of Panels</Label>
                    <span className="text-sm font-medium">
                      {panelsCount} panels
                    </span>
                  </div>
                  <Slider
                    id="panelsCount"
                    min={4}
                    max={50}
                    step={1}
                    value={[panelsCount]}
                    onValueChange={(value) => setPanelsCount(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="batteryCapacity">
                      Battery Capacity (kWh)
                    </Label>
                    <span className="text-sm font-medium">
                      {batteryCapacity} kWh
                    </span>
                  </div>
                  <Slider
                    id="batteryCapacity"
                    min={0}
                    max={30}
                    step={0.5}
                    value={[batteryCapacity]}
                    onValueChange={(value) => setBatteryCapacity(value[0])}
                  />
                  <p className="text-xs text-gray-500">
                    Set to 0 if you don't have a battery
                  </p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="space-y-2 py-4">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <span>Setting up your system...</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </form>
        )}
      </CardContent>

      {!success && !isLoading && (
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <div></div>
          )}

          {step < 2 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}>
              Complete Setup
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default InitialSetup;
