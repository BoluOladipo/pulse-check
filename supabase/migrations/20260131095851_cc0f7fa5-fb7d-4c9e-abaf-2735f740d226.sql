-- Create subscriptions table to track user plans
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  flutterwave_tx_ref TEXT,
  flutterwave_transaction_id TEXT,
  amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'NGN',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own subscriptions
CREATE POLICY "Users can view their own subscriptions"
ON public.subscriptions
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own subscriptions (for webhook/edge function use)
CREATE POLICY "Service can insert subscriptions"
ON public.subscriptions
FOR INSERT
WITH CHECK (true);

-- Service can update subscriptions
CREATE POLICY "Service can update subscriptions"
ON public.subscriptions
FOR UPDATE
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();