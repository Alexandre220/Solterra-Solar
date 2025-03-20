-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{"notifications_enabled": true, "dark_mode": false, "units": "metric"}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_preferences table (for more granular preference management)
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  dark_mode BOOLEAN DEFAULT false,
  notifications_enabled BOOLEAN DEFAULT true,
  units TEXT DEFAULT 'metric',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create solar_systems table
CREATE TABLE IF NOT EXISTS solar_systems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name TEXT NOT NULL,
  capacity_kw NUMERIC NOT NULL,
  installation_date DATE,
  panels_count INTEGER,
  inverter_model TEXT,
  battery_capacity_kwh NUMERIC,
  location JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create energy_production table
CREATE TABLE IF NOT EXISTS energy_production (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  system_id UUID NOT NULL REFERENCES solar_systems(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  production_kwh NUMERIC NOT NULL,
  consumption_kwh NUMERIC,
  battery_percentage NUMERIC,
  weather_condition TEXT
);

-- Create savings_calculations table
CREATE TABLE IF NOT EXISTS savings_calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  system_size_kw NUMERIC NOT NULL,
  estimated_production_kwh_year NUMERIC NOT NULL,
  estimated_savings_year NUMERIC NOT NULL,
  co2_reduction_tons_year NUMERIC NOT NULL,
  installation_cost NUMERIC NOT NULL,
  payback_period_years NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  system_id UUID REFERENCES solar_systems(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE solar_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_production ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view their own preferences" ON user_preferences;
CREATE POLICY "Users can view their own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own preferences" ON user_preferences;
CREATE POLICY "Users can update their own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own preferences" ON user_preferences;
CREATE POLICY "Users can insert their own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own solar systems" ON solar_systems;
CREATE POLICY "Users can view their own solar systems"
  ON solar_systems FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own solar systems" ON solar_systems;
CREATE POLICY "Users can insert their own solar systems"
  ON solar_systems FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own solar systems" ON solar_systems;
CREATE POLICY "Users can update their own solar systems"
  ON solar_systems FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own solar systems" ON solar_systems;
CREATE POLICY "Users can delete their own solar systems"
  ON solar_systems FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view energy production for their systems" ON energy_production;
CREATE POLICY "Users can view energy production for their systems"
  ON energy_production FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM solar_systems WHERE id = energy_production.system_id
  ));

DROP POLICY IF EXISTS "Users can insert energy production for their systems" ON energy_production;
CREATE POLICY "Users can insert energy production for their systems"
  ON energy_production FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM solar_systems WHERE id = energy_production.system_id
  ));

DROP POLICY IF EXISTS "Users can view their own savings calculations" ON savings_calculations;
CREATE POLICY "Users can view their own savings calculations"
  ON savings_calculations FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own savings calculations" ON savings_calculations;
CREATE POLICY "Users can insert their own savings calculations"
  ON savings_calculations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Enable realtime for relevant tables
ALTER PUBLICATION supabase_realtime ADD TABLE energy_production;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
