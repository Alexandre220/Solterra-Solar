export type SolarSystem = {
  id: string;
  user_id: string;
  name: string;
  capacity_kw: number;
  installation_date: string;
  panels_count: number;
  inverter_model: string;
  battery_capacity_kwh: number | null;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  created_at: string;
  updated_at: string;
};

export type EnergyProduction = {
  id: string;
  system_id: string;
  timestamp: string;
  production_kwh: number;
  consumption_kwh: number;
  battery_percentage: number | null;
  weather_condition: string | null;
};

export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  preferences: {
    notifications_enabled: boolean;
    dark_mode: boolean;
    units: "metric" | "imperial";
  };
  created_at: string;
  updated_at: string;
};

export type SavingsCalculation = {
  id: string;
  user_id: string;
  system_size_kw: number;
  estimated_production_kwh_year: number;
  estimated_savings_year: number;
  co2_reduction_tons_year: number;
  installation_cost: number;
  payback_period_years: number;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  system_id: string | null;
  type: "alert" | "info" | "success";
  title: string;
  message: string;
  read: boolean;
  created_at: string;
};
