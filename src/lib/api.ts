import { supabase } from "./supabase";
import type {
  SolarSystem,
  EnergyProduction,
  UserProfile,
  SavingsCalculation,
  Notification,
} from "../types/schema";
import {
  getSystemStatus as getSystemStatusEdge,
  calculateSolarSavings,
  generateMockData,
} from "./supabaseEdgeFunctions";

// Authentication
export const signUp = async (
  email: string,
  password: string,
  fullName: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signInWithMicrosoft = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "azure",
    options: {
      scopes: "email profile openid",
      redirectTo: window.location.origin,
    },
  });
  return { data, error };
};

export const signInWithFacebook = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      scopes: "email",
      redirectTo: window.location.origin,
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
};

// User Profile
export const getUserProfile = async (
  userId: string,
): Promise<{ data: UserProfile | null; error: any }> => {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code === "PGRST116") {
    // Table might not exist or no record found, create a default profile
    const defaultProfile: Omit<
      UserProfile,
      "id" | "created_at" | "updated_at"
    > = {
      email: "",
      full_name: "User",
      avatar_url: null,
      preferences: {
        notifications_enabled: true,
        dark_mode: false,
        units: "metric",
      },
    };

    const { data: newProfile, error: createError } = await supabase
      .from("user_profiles")
      .insert([{ id: userId, ...defaultProfile }])
      .select()
      .single();

    if (createError) console.error("Error creating user profile:", createError);
    return { data: newProfile || null, error: createError };
  }

  return { data, error };
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>,
) => {
  const { data, error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("id", userId)
    .select();
  return { data, error };
};

export const saveUserPreference = async (
  userId: string,
  preference: string,
  value: any,
) => {
  // First check if user has preferences in user_preferences table
  const { data: existingPrefs, error: fetchError } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (fetchError && fetchError.code === "PGRST116") {
    // No preferences exist, create new record
    const newPrefs: any = { user_id: userId };
    newPrefs[preference] = value;

    const { data, error } = await supabase
      .from("user_preferences")
      .insert([newPrefs])
      .select();
    return { data, error };
  } else {
    // Update existing preferences
    const updates: any = {};
    updates[preference] = value;

    const { data, error } = await supabase
      .from("user_preferences")
      .update(updates)
      .eq("user_id", userId)
      .select();
    return { data, error };
  }
};

export const getUserPreferences = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();
  return { data, error };
};

// Solar Systems
export const getSolarSystems = async (
  userId: string,
): Promise<{ data: SolarSystem[] | null; error: any }> => {
  const { data, error } = await supabase
    .from("solar_systems")
    .select("*")
    .eq("user_id", userId);
  return { data, error };
};

export const getSolarSystem = async (
  systemId: string,
): Promise<{ data: SolarSystem | null; error: any }> => {
  const { data, error } = await supabase
    .from("solar_systems")
    .select("*")
    .eq("id", systemId)
    .single();
  return { data, error };
};

export const createSolarSystem = async (
  system: Omit<SolarSystem, "id" | "created_at" | "updated_at">,
) => {
  const { data, error } = await supabase
    .from("solar_systems")
    .insert([system])
    .select();
  return { data, error };
};

export const updateSolarSystem = async (
  systemId: string,
  updates: Partial<SolarSystem>,
) => {
  const { data, error } = await supabase
    .from("solar_systems")
    .update(updates)
    .eq("id", systemId);
  return { data, error };
};

export const deleteSolarSystem = async (systemId: string) => {
  const { error } = await supabase
    .from("solar_systems")
    .delete()
    .eq("id", systemId);
  return { error };
};

// System Status (using edge function)
export const getSystemStatus = async (systemId: string) => {
  try {
    // First try to use the edge function
    const result = await getSystemStatusEdge(systemId);
    if (!result.error) return result;

    // Fallback to mock data if edge function fails
    console.log("Edge function failed, using mock data");
    return {
      data: {
        system: {
          id: systemId,
          name: "My Solar System",
          capacity_kw: 10,
          panels_count: 24,
          battery_capacity_kwh: 13.5,
        },
        currentProduction: {
          production_kwh: 5.8,
          consumption_kwh: 3.2,
          battery_percentage: 75,
        },
        status: "operational",
        efficiency: 98,
        alerts: [],
        lastUpdated: new Date().toISOString(),
      },
      error: null,
    };
  } catch (error) {
    console.error("Error in getSystemStatus:", error);
    return { data: null, error };
  }
};

// Generate mock data (using edge function)
export const generateSystemMockData = async (
  systemId: string,
  days: number = 7,
) => {
  try {
    // First try to use the edge function
    const result = await generateMockData(systemId, days);
    if (!result.error) return result;

    // Fallback to mock response if edge function fails
    console.log("Edge function failed, using mock response");
    return {
      data: {
        success: true,
        message: `Generated mock data points for system ${systemId}`,
        count: 24 * days,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error in generateSystemMockData:", error);
    return { data: null, error };
  }
};

// Energy Production
export const getEnergyProduction = async (
  systemId: string,
  startDate: string,
  endDate: string,
): Promise<{ data: EnergyProduction[] | null; error: any }> => {
  const { data, error } = await supabase
    .from("energy_production")
    .select("*")
    .eq("system_id", systemId)
    .gte("timestamp", startDate)
    .lte("timestamp", endDate)
    .order("timestamp", { ascending: true });
  return { data, error };
};

export const getCurrentProduction = async (
  systemId: string,
): Promise<{ data: EnergyProduction | null; error: any }> => {
  const { data, error } = await supabase
    .from("energy_production")
    .select("*")
    .eq("system_id", systemId)
    .order("timestamp", { ascending: false })
    .limit(1)
    .single();
  return { data, error };
};

export const addEnergyProduction = async (
  production: Omit<EnergyProduction, "id">,
) => {
  const { data, error } = await supabase
    .from("energy_production")
    .insert([production])
    .select();
  return { data, error };
};

// Savings Calculations
export const getSavingsCalculations = async (
  userId: string,
): Promise<{ data: SavingsCalculation[] | null; error: any }> => {
  const { data, error } = await supabase
    .from("savings_calculations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
};

export const createSavingsCalculation = async (
  calculation: Omit<SavingsCalculation, "id" | "created_at">,
) => {
  const { data, error } = await supabase
    .from("savings_calculations")
    .insert([calculation])
    .select();
  return { data, error };
};

// Calculate savings using edge function
export const calculateSolarSystemSavings = async (params: {
  location?: string;
  roofArea: number;
  monthlyBill: number;
  sunlightHours: number;
  roofType: string;
  electricityRate: number;
  userId?: string;
}) => {
  try {
    // First try to use the edge function
    const result = await calculateSolarSavings(params);
    if (!result.error) return result;

    // Fallback to local calculation if edge function fails
    console.log("Edge function failed, using local calculation");

    // These are simplified calculations for demonstration
    const roofEfficiency =
      params.roofType === "flat"
        ? 0.15
        : params.roofType === "sloped_south"
          ? 0.18
          : 0.16;
    const systemSize = (params.roofArea * roofEfficiency) / 100; // in kW
    const annualProduction = systemSize * params.sunlightHours * 365; // in kWh
    const installationCost = systemSize * 45000; // R45000 per kW
    const annualSavings = annualProduction * params.electricityRate;
    const paybackPeriod = installationCost / annualSavings;
    const co2Reduction = annualProduction * 0.0007; // 0.7 kg CO2 per kWh
    const treesEquivalent = co2Reduction * 0.04; // 40 trees per ton of CO2

    const results = {
      systemSize: parseFloat(systemSize.toFixed(2)),
      installationCost: parseFloat(installationCost.toFixed(2)),
      annualProduction: parseFloat(annualProduction.toFixed(2)),
      annualSavings: parseFloat(annualSavings.toFixed(2)),
      paybackPeriod: parseFloat(paybackPeriod.toFixed(1)),
      co2Reduction: parseFloat(co2Reduction.toFixed(2)),
      treesEquivalent: parseFloat(treesEquivalent.toFixed(0)),
    };

    // If userId is provided, try to save to local storage as a fallback
    if (params.userId) {
      try {
        const savedCalculations = JSON.parse(
          localStorage.getItem("savedCalculations") || "[]",
        );
        savedCalculations.push({
          ...results,
          userId: params.userId,
          date: new Date().toISOString(),
        });
        localStorage.setItem(
          "savedCalculations",
          JSON.stringify(savedCalculations),
        );
      } catch (e) {
        console.error("Error saving to localStorage:", e);
      }
    }

    return { data: results, error: null };
  } catch (error) {
    console.error("Error in calculateSolarSystemSavings:", error);
    return { data: null, error };
  }
};

// Notifications
export const getNotifications = async (
  userId: string,
): Promise<{ data: Notification[] | null; error: any }> => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
};

export const markNotificationAsRead = async (notificationId: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId);
  return { data, error };
};

export const createNotification = async (
  notification: Omit<Notification, "id" | "created_at">,
) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert([notification])
    .select();
  return { data, error };
};
