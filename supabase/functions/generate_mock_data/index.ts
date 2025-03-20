import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { systemId, days = 7 } = await req.json();

    if (!systemId) {
      throw new Error("System ID is required");
    }

    // Create a Supabase client with the Admin key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the solar system details to use capacity for realistic data
    const { data: system, error: systemError } = await supabase
      .from("solar_systems")
      .select("*")
      .eq("id", systemId)
      .single();

    if (systemError) throw systemError;

    const capacity = system.capacity_kw || 10; // Default to 10kW if not specified
    const mockData = [];

    // Generate hourly data for the specified number of days
    const now = new Date();
    for (let day = 0; day < days; day++) {
      for (let hour = 0; hour < 24; hour++) {
        const timestamp = new Date(now);
        timestamp.setDate(timestamp.getDate() - day);
        timestamp.setHours(hour, 0, 0, 0);

        // Solar production is higher during daylight hours
        let production = 0;
        if (hour >= 6 && hour <= 18) {
          // Bell curve for solar production (peak at noon)
          production = capacity * Math.exp(-0.5 * Math.pow((hour - 12) / 3, 2));
        }

        // Consumption has morning and evening peaks
        let consumption = 1 + Math.random() * 0.5;
        if ((hour >= 6 && hour <= 9) || (hour >= 17 && hour <= 21)) {
          consumption += 2 + Math.random() * 1.5;
        }

        // Battery percentage (simulated)
        let batteryPercentage = null;
        if (system.battery_capacity_kwh) {
          // Simple simulation: battery charges during high production and discharges during high consumption
          const previousBattery =
            mockData.length > 0
              ? mockData[mockData.length - 1].battery_percentage
              : 50;
          const batteryChange =
            ((production - consumption) * 10) / system.battery_capacity_kwh;
          batteryPercentage = Math.min(
            100,
            Math.max(0, previousBattery + batteryChange),
          );
        }

        mockData.push({
          system_id: systemId,
          timestamp: timestamp.toISOString(),
          production_kwh: parseFloat(production.toFixed(2)),
          consumption_kwh: parseFloat(consumption.toFixed(2)),
          battery_percentage: batteryPercentage
            ? parseFloat(batteryPercentage.toFixed(1))
            : null,
          weather_condition: hour >= 6 && hour <= 18 ? "sunny" : "clear",
        });
      }
    }

    // Insert the mock data into the energy_production table
    const { error } = await supabase.from("energy_production").insert(mockData);

    if (error) throw error;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Generated ${mockData.length} data points for system ${systemId}`,
        count: mockData.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
