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
    const {
      location,
      roofArea,
      monthlyBill,
      sunlightHours,
      roofType,
      electricityRate,
      userId,
    } = await req.json();

    // Validate required inputs
    if (
      !roofArea ||
      !monthlyBill ||
      !sunlightHours ||
      !roofType ||
      !electricityRate
    ) {
      throw new Error("Missing required parameters");
    }

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

    const results = {
      systemSize: parseFloat(systemSize.toFixed(2)),
      installationCost: parseFloat(installationCost.toFixed(2)),
      annualProduction: parseFloat(annualProduction.toFixed(2)),
      annualSavings: parseFloat(annualSavings.toFixed(2)),
      paybackPeriod: parseFloat(paybackPeriod.toFixed(1)),
      co2Reduction: parseFloat(co2Reduction.toFixed(2)),
      treesEquivalent: parseFloat(treesEquivalent.toFixed(0)),
    };

    // If userId is provided, save the calculation to the database
    if (userId) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
      const supabase = createClient(supabaseUrl, supabaseKey);

      const savingsData = {
        user_id: userId,
        system_size_kw: results.systemSize,
        estimated_production_kwh_year: results.annualProduction,
        estimated_savings_year: results.annualSavings,
        co2_reduction_tons_year: results.co2Reduction,
        installation_cost: results.installationCost,
        payback_period_years: results.paybackPeriod,
      };

      const { error } = await supabase
        .from("savings_calculations")
        .insert([savingsData]);

      if (error) throw error;
    }

    return new Response(JSON.stringify(results), {
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
