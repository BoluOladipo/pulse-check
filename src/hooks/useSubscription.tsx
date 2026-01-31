import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type Plan = 'free' | 'pro' | 'enterprise';

interface Subscription {
  id: string;
  user_id: string;
  plan: Plan;
  status: string;
  expires_at: string | null;
  created_at: string;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      // Check if subscription is expired
      if (data && data.expires_at) {
        const expiresAt = new Date(data.expires_at);
        if (expiresAt < new Date()) {
          setSubscription(null);
        } else {
          setSubscription(data as Subscription);
        }
      } else {
        setSubscription(data as Subscription | null);
      }
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  const currentPlan: Plan = subscription?.plan as Plan || 'free';
  
  const isPro = currentPlan === 'pro' || currentPlan === 'enterprise';
  const isEnterprise = currentPlan === 'enterprise';

  const initiatePayment = async (plan: 'pro' | 'enterprise') => {
    if (!user) {
      throw new Error('User must be logged in to upgrade');
    }

    const response = await supabase.functions.invoke('flutterwave-init', {
      body: {
        plan,
        userId: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.email?.split('@')[0],
      },
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to initialize payment');
    }

    // Redirect to Flutterwave payment page
    window.location.href = response.data.payment_link;
  };

  const verifyPayment = async (txRef: string, transactionId: string) => {
    const response = await supabase.functions.invoke('flutterwave-webhook', {
      body: {
        tx_ref: txRef,
        transaction_id: transactionId,
      },
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    // Refresh subscription data
    await fetchSubscription();
    
    return response.data;
  };

  return {
    subscription,
    currentPlan,
    isPro,
    isEnterprise,
    loading,
    error,
    initiatePayment,
    verifyPayment,
    refetch: fetchSubscription,
  };
};
