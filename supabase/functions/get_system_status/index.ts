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
    const { systemId } = await req.json();

    if (!systemId) {
      throw new Error("System ID is required");
    }

    // Create a Supabase client with the Admin key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the solar system details
    const { data: system, error: systemError } = await supabase
      .from("solar_systems")
      .select("*")
      .eq("id", systemId)
      .single();

    if (systemError) throw systemError;

    // Get the latest energy production data
    const { data: latestProduction, error: productionError } = await supabase
      .from("energy_production")
      .select("*")
      .eq("system_id", systemId)
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    if (productionError && productionError.code !== "PGRST116") {
      throw productionError;
    }

    // Generate a system status report
    const systemStatus = {
      system,
      currentProduction: latestProduction || null,
      status: "operational",
      efficiency: Math.floor(85 + Math.random() * 15), // Simulated efficiency between 85-100%
      alerts: [],
      lastUpdated: new Date().toISOString(),
    };

    // Add some simulated alerts if efficiency is below threshold
    if (systemStatus.efficiency < 90) {
      systemStatus.alerts.push({
        type: "warning",
        message: "System efficiency is below optimal levels",
        timestamp: new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify(systemStatus), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
