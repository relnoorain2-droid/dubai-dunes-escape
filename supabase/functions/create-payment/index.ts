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

    const apiKey = Deno.env.get('ZIINA_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Missing ZIINA_API_KEY' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Validate and normalize inputs
    const amountAed = Number(amount);
    if (!Number.isFinite(amountAed) || amountAed <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    const amountFils = Math.max(200, Math.round(amountAed * 100)); // min 2 AED

    // Short, safe message to satisfy Ziina constraints
    const baseMsg = `Desert Safari - ${String(packageName || '').slice(0, 30)}`.trim();
    const message = baseMsg.length < 3 ? 'Desert Safari' : baseMsg;

    const operation_id = crypto.randomUUID();

    console.log('Creating Ziina payment intent...', { 
      amount: amountAed, 
      packageName 
    });

    // Create payment intent with Ziina
    const paymentResponse = await fetch('https://api-v2.ziina.com/api/payment_intent', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountFils,
        currency_code: 'AED',
        message,
        success_url: successUrl,
        cancel_url: cancelUrl,
        failure_url: failureUrl,
        test: true, // Set to false for production
        allow_tips: false,
        operation_id,
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
