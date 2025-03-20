import React from "react";
import AppLayout from "../components/layout/AppLayout";
import SolarCalculator from "../components/calculator/SolarCalculator";
import {
  createSavingsCalculation,
  calculateSolarSystemSavings,
} from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../components/ui/use-toast";

const CalculatorPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSaveCalculation = async (calculation: any) => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to save your calculation",
        variant: "destructive",
      });
      return;
    }

    try {
      // Use the edge function to calculate and save the results
      const { data, error } = await calculateSolarSystemSavings({
        location: calculation.location,
        roofArea: calculation.roofArea,
        monthlyBill: calculation.monthlyBill,
        sunlightHours: calculation.sunlightHours,
        roofType: calculation.roofType,
        electricityRate: calculation.electricityRate,
        userId: user.id,
      });

      if (error) throw error;

      toast({
        title: "Calculation saved",
        description: "Your solar calculation has been saved to your profile",
      });
    } catch (error) {
      console.error("Error saving calculation:", error);
      toast({
        title: "Error saving calculation",
        description: "There was a problem saving your calculation",
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout activeTab="calculate">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Solar Savings Calculator</h1>
        <p className="text-gray-600 mb-8">
          Use this calculator to estimate the potential size, cost, and savings
          of a solar system for your home. Adjust the parameters to match your
          specific situation for a more accurate estimate.
        </p>

        <SolarCalculator onSaveCalculation={handleSaveCalculation} />

        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            How this calculator works
          </h2>
          <p className="text-sm text-gray-600">
            This calculator provides estimates based on the information you
            provide. The actual performance of a solar system depends on many
            factors including local weather patterns, shading, roof orientation,
            and the specific equipment used. For a more precise estimate, we
            recommend consulting with a solar professional who can evaluate your
            specific situation.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default CalculatorPage;
