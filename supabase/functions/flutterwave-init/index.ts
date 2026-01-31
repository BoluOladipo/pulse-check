import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  plan: 'pro' | 'enterprise';
  userId: string;
  email: string;
  name: string;
}

const PLAN_PRICES = {
  pro: { amount: 29, currency: 'USD', name: 'Pro Plan' },
  enterprise: { amount: 99, currency: 'USD', name: 'Enterprise Plan' },
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const FLUTTERWAVE_SECRET_KEY = Deno.env.get('FLUTTERWAVE_SECRET_KEY');
    if (!FLUTTERWAVE_SECRET_KEY) {
      throw new Error('FLUTTERWAVE_SECRET_KEY is not configured');
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase configuration missing');
    }

    const { plan, userId, email, name } = await req.json() as PaymentRequest;

    if (!plan || !userId || !email) {
      throw new Error('Missing required fields: plan, userId, email');
    }

    const planDetails = PLAN_PRICES[plan];
    if (!planDetails) {
      throw new Error('Invalid plan selected');
    }

    const tx_ref = `EP-${plan.toUpperCase()}-${userId}-${Date.now()}`;
    
    // Get the origin for redirect URL
    const origin = req.headers.get('origin') || 'https://id-preview--55b1d61f-961e-4d81-a371-c556373c5b6d.lovable.app';

    // Initialize Flutterwave payment
    const flutterwaveResponse = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref,
        amount: planDetails.amount,
        currency: planDetails.currency,
        redirect_url: `${origin}/payment-success?tx_ref=${tx_ref}`,
        customer: {
          email,
          name: name || email.split('@')[0],
        },
        customizations: {
          title: 'EventPulse',
          description: `${planDetails.name} Subscription`,
          logo: 'https://id-preview--55b1d61f-961e-4d81-a371-c556373c5b6d.lovable.app/favicon.ico',
        },
        meta: {
          user_id: userId,
          plan,
        },
      }),
    });

    const flutterwaveData = await flutterwaveResponse.json();
    
    if (flutterwaveData.status !== 'success') {
      console.error('Flutterwave error:', flutterwaveData);
      throw new Error(flutterwaveData.message || 'Failed to initialize payment');
    }

    // Create pending subscription record
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    await supabase.from('subscriptions').insert({
      user_id: userId,
      plan,
      status: 'pending',
      flutterwave_tx_ref: tx_ref,
      amount: planDetails.amount,
      currency: planDetails.currency,
    });

    console.log(`Payment initialized for user ${userId}, plan: ${plan}, tx_ref: ${tx_ref}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        payment_link: flutterwaveData.data.link,
        tx_ref 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error initializing payment:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
