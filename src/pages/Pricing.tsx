import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, CreditCard, Loader2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from '@/hooks/use-toast';

const plans = [
  {
    id: 'free' as const,
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for small events and getting started.',
    features: [
      'Up to 3 events',
      '50 attendees per event',
      'Basic QR code check-in',
      'Email support',
      'CSV export',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    price: '$29',
    period: 'per year',
    description: 'For growing organizations with regular events.',
    features: [
      'Unlimited events',
      'Up to 500 attendees per event',
      'Custom QR codes',
      'Real-time analytics',
      'Priority support',
      'Custom branding',
      'API access',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    id: 'enterprise' as const,
    name: 'Enterprise',
    price: '$99',
    period: 'per year',
    description: 'For large organizations with complex needs.',
    features: [
      'Everything in Pro',
      'Unlimited attendees',
      'Dedicated account manager',
      'Custom integrations',
      'SSO & advanced security',
      'On-premise deployment',
      'SLA guarantee',
    ],
    cta: 'Upgrade to Enterprise',
    popular: false,
  },
];

const Pricing = () => {
  const { user } = useAuth();
  const { currentPlan, initiatePayment, loading: subscriptionLoading } = useSubscription();
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpgrade = async (planId: 'pro' | 'enterprise') => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be logged in to upgrade your plan.',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    setProcessingPlan(planId);
    try {
      await initiatePayment(planId);
      // User will be redirected to Flutterwave
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Failed',
        description: error instanceof Error ? error.message : 'Failed to initialize payment',
        variant: 'destructive',
      });
      setProcessingPlan(null);
    }
  };

  const getPlanButton = (plan: typeof plans[0]) => {
    const isCurrentPlan = currentPlan === plan.id;
    const isProcessing = processingPlan === plan.id;
    
    if (isCurrentPlan) {
      return (
        <Button variant="outline" className="w-full" disabled>
          <Check className="h-4 w-4 mr-2" />
          Current Plan
        </Button>
      );
    }

    if (plan.id === 'free') {
      return (
        <Link to={user ? '/dashboard' : '/auth'} className="w-full block">
          <Button variant="outline" className="w-full">
            {user ? 'Go to Dashboard' : plan.cta}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      );
    }

    return (
      <Button
        variant={plan.popular ? 'hero' : 'outline'}
        className="w-full"
        onClick={() => handleUpgrade(plan.id as 'pro' | 'enterprise')}
        disabled={isProcessing || subscriptionLoading}
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4 mr-2" />
            {plan.cta}
          </>
        )}
      </Button>
    );
  };

  return (
    <MainLayout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Pricing
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Simple, Transparent{' '}
              <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include core features.
              No hidden fees. Secure payment via Flutterwave.
            </p>
            {currentPlan !== 'free' && (
              <Badge variant="active" className="mt-4">
                You're on the {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} plan
              </Badge>
            )}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {plans.map((plan) => (
              <motion.div key={plan.name} variants={staggerItem}>
                <Card
                  className={`h-full relative ${
                    plan.popular
                      ? 'border-primary shadow-lg shadow-primary/10'
                      : ''
                  } ${currentPlan === plan.id ? 'ring-2 ring-success' : ''}`}
                >
                  {plan.popular && (
                    <Badge
                      variant="active"
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                    >
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        /{plan.period}
                      </span>
                    </div>
                    <CardDescription className="mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-success flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {getPlanButton(plan)}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 space-y-4"
          >
            <p className="text-muted-foreground">
              Secure payments powered by Flutterwave. Cancel anytime.
            </p>
            <p className="text-sm text-muted-foreground">
              Questions? Contact us at{' '}
              <a href="mailto:boluemmanuel071@gmail.com" className="text-primary hover:underline">
                boluemmanuel071@gmail.com
              </a>{' '}
              or{' '}
              <a href="https://wa.me/48608863629" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                WhatsApp
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Pricing;
