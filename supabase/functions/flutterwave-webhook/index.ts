import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, verif-hash',
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

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Parse webhook payload
    const payload = await req.json();
    console.log('Webhook received:', JSON.stringify(payload));

    // Handle both webhook and manual verification
    const transactionId = payload.data?.id || payload.transaction_id;
    const txRef = payload.data?.tx_ref || payload.tx_ref;

    if (!transactionId && !txRef) {
      throw new Error('No transaction ID or tx_ref provided');
    }

    // Verify transaction with Flutterwave
    const verifyResponse = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verifyResponse.json();
    console.log('Verification response:', JSON.stringify(verifyData));

    if (verifyData.status !== 'success' || verifyData.data.status !== 'successful') {
      // Update subscription as failed
      if (txRef) {
        await supabase
          .from('subscriptions')
          .update({ status: 'failed' })
          .eq('flutterwave_tx_ref', txRef);
      }
      
      return new Response(
        JSON.stringify({ success: false, message: 'Payment verification failed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const transaction = verifyData.data;
    const verifiedTxRef = transaction.tx_ref;
    const userId = transaction.meta?.user_id;
    const plan = transaction.meta?.plan;

    // Calculate expiration (1 year from now)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    // Update subscription to active
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        flutterwave_transaction_id: String(transaction.id),
        expires_at: expiresAt.toISOString(),
      })
      .eq('flutterwave_tx_ref', verifiedTxRef);

    if (updateError) {
      console.error('Error updating subscription:', updateError);
      
      // Try to insert if update failed (no existing record)
      if (userId && plan) {
        await supabase.from('subscriptions').insert({
          user_id: userId,
          plan,
          status: 'active',
          flutterwave_tx_ref: verifiedTxRef,
          flutterwave_transaction_id: String(transaction.id),
          amount: transaction.amount,
          currency: transaction.currency,
          expires_at: expiresAt.toISOString(),
        });
      }
    }

    console.log(`Payment verified and subscription activated for tx_ref: ${verifiedTxRef}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Payment verified successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
