import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, CreditCard, Building2, Phone, Mail, Copy, CheckCircle } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const plans = [
  {
    name: 'Free',
    price: '₦0',
    priceUSD: '$0',
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
    priceAmount: 0,
  },
  {
    name: 'Pro',
    price: '₦25,000',
    priceUSD: '$29',
    period: 'per month',
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
    priceAmount: 25000,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceUSD: 'Custom',
    period: 'contact us',
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
    cta: 'Contact Sales',
    popular: false,
    priceAmount: null,
  },
];

const bankDetails = {
  bankName: 'UBA (United Bank for Africa)',
  accountNumber: '2239431200',
  accountName: 'Bolu Emmanuel',
  phone: '07075800632',
  email: 'boluemmanuel071@gmail.com',
};

const Pricing = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handlePlanSelect = (plan: typeof plans[0]) => {
    if (plan.name === 'Free') {
      // Redirect to auth/dashboard
      return;
    }
    if (plan.name === 'Enterprise') {
      // Redirect to contact
      return;
    }
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: 'Copied!',
        description: `${field} copied to clipboard`,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast({
        title: 'Failed to copy',
        description: 'Please copy manually',
        variant: 'destructive',
      });
    }
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
              No hidden fees.
            </p>
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
                  }`}
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
                      {plan.priceUSD !== plan.price && (
                        <span className="text-sm text-muted-foreground ml-2">
                          ({plan.priceUSD})
                        </span>
                      )}
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
                    {plan.name === 'Free' ? (
                      <Link to={user ? '/dashboard' : '/auth'}>
                        <Button variant="outline" className="w-full">
                          {user ? 'Go to Dashboard' : plan.cta}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    ) : plan.name === 'Enterprise' ? (
                      <Link to="/contact">
                        <Button variant="outline" className="w-full">
                          {plan.cta}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant={plan.popular ? 'hero' : 'outline'}
                        className="w-full"
                        onClick={() => handlePlanSelect(plan)}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        {plan.cta}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground">
              All plans include a 14-day free trial. Secure payment via bank transfer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Upgrade to {selectedPlan?.name}
            </DialogTitle>
            <DialogDescription>
              Complete your payment via bank transfer to activate your {selectedPlan?.name} plan.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Amount */}
            <div className="bg-primary/5 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
              <p className="text-3xl font-bold text-primary">{selectedPlan?.price}</p>
              <p className="text-sm text-muted-foreground">{selectedPlan?.priceUSD} USD equivalent</p>
            </div>

            {/* Bank Details */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Bank Transfer Details
              </h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Bank Name</p>
                    <p className="font-medium text-foreground">{bankDetails.bankName}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Account Number</p>
                    <p className="font-medium text-foreground font-mono">{bankDetails.accountNumber}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account number')}
                  >
                    {copiedField === 'Account number' ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Account Name</p>
                    <p className="font-medium text-foreground">{bankDetails.accountName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">After Payment</h4>
              <p className="text-sm text-muted-foreground">
                Send your payment confirmation to activate your account:
              </p>
              
              <div className="flex flex-col gap-2">
                <a 
                  href={`tel:${bankDetails.phone}`}
                  className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{bankDetails.phone}</span>
                </a>
                
                <a 
                  href={`mailto:${bankDetails.email}?subject=EventPulse ${selectedPlan?.name} Plan Payment`}
                  className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{bankDetails.email}</span>
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/234${bankDetails.phone.slice(1)}?text=${encodeURIComponent(
                `Hello, I just made a payment for the EventPulse ${selectedPlan?.name} plan (${selectedPlan?.price}). Please activate my account. My email is: `
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="hero" className="w-full">
                Send Payment Confirmation via WhatsApp
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Pricing;
