import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, packageName, successUrl, cancelUrl, failureUrl } = await req.json();

    console.log('Creating Ziina payment intent...', { 
      amount, 
      packageName 
    });

    // Create payment intent with Ziina
    const paymentResponse = await fetch('https://api-v2.ziina.com/api/payment_intent', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ACFplIm28AkdUUD2L7IoZhPJKVNcYj7Ih2tezeRib+E4wWdBMo9P9mKPxahv9M8F',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to fils (AED * 100)
        currency_code: 'AED',
        message: `Premium Desert Safari - ${packageName}`,
        success_url: successUrl,
        cancel_url: cancelUrl,
        failure_url: failureUrl,
        test: true, // Set to false for production
        allow_tips: false,
      }),
    });

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      console.error('Ziina API Error:', errorText);
      throw new Error(`Payment initialization failed: ${errorText}`);
    }

    const paymentData = await paymentResponse.json();

    console.log('Payment intent created successfully:', paymentData.id);

    return new Response(
      JSON.stringify(paymentData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error creating payment intent:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
