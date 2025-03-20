import { supabase } from "./supabase";

// Function to get system status from edge function
export const getSystemStatus = async (systemId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke(
      "get-system-status",
      {
        body: { systemId },
      },
    );

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error getting system status:", error);
    return { data: null, error };
  }
};

// Function to calculate solar savings from edge function
export const calculateSolarSavings = async (params: {
  location?: string;
  roofArea: number;
  monthlyBill: number;
  sunlightHours: number;
  roofType: string;
  electricityRate: number;
  userId?: string;
}) => {
  try {
    const { data, error } = await supabase.functions.invoke(
      "calculate-solar-savings",
      {
        body: params,
      },
    );

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error calculating solar savings:", error);
    return { data: null, error };
  }
};

// Function to generate mock data from edge function
export const generateMockData = async (systemId: string, days: number = 7) => {
  try {
    const { data, error } = await supabase.functions.invoke(
      "generate-mock-data",
      {
        body: { systemId, days },
      },
    );

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error generating mock data:", error);
    return { data: null, error };
  }
};
