import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSubscription } from '@/hooks/useSubscription';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyPayment, refetch } = useSubscription();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [error, setError] = useState<string | null>(null);

  const txRef = searchParams.get('tx_ref');
  const transactionId = searchParams.get('transaction_id');

  useEffect(() => {
    const verify = async () => {
      if (!txRef || !transactionId) {
        setStatus('failed');
        setError('Missing payment reference. Please contact support.');
        return;
      }

      try {
        const result = await verifyPayment(txRef, transactionId);
        if (result.success) {
          setStatus('success');
          await refetch();
        } else {
          setStatus('failed');
          setError(result.message || 'Payment verification failed');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setStatus('failed');
        setError(err instanceof Error ? err.message : 'Failed to verify payment');
      }
    };

    verify();
  }, [txRef, transactionId]);

  const handleRetry = async () => {
    if (!txRef || !transactionId) return;
    setStatus('verifying');
    setError(null);
    
    try {
      const result = await verifyPayment(txRef, transactionId);
      if (result.success) {
        setStatus('success');
        await refetch();
      } else {
        setStatus('failed');
        setError(result.message || 'Payment verification failed');
      }
    } catch (err) {
      setStatus('failed');
      setError(err instanceof Error ? err.message : 'Failed to verify payment');
    }
  };

  return (
    <MainLayout>
      <section className="py-20 lg:py-28 min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto"
          >
            <Card className="text-center">
              <CardContent className="py-12 px-8">
                {status === 'verifying' && (
                  <>
                    <div className="flex justify-center mb-6">
                      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <Loader2 className="h-10 w-10 text-primary animate-spin" />
                      </div>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-3">
                      Verifying Payment...
                    </h1>
                    <p className="text-muted-foreground">
                      Please wait while we confirm your payment.
                    </p>
                  </>
                )}

                {status === 'success' && (
                  <>
                    <div className="flex justify-center mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center"
                      >
                        <CheckCircle className="h-10 w-10 text-success" />
                      </motion.div>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-3">
                      Payment Successful!
                    </h1>
                    <p className="text-muted-foreground mb-8">
                      Your subscription has been activated. You now have access to all premium features.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Link to="/dashboard">
                        <Button variant="hero" className="w-full">
                          Go to Dashboard
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                      <Link to="/pricing">
                        <Button variant="outline" className="w-full">
                          View Plans
                        </Button>
                      </Link>
                    </div>
                  </>
                )}

                {status === 'failed' && (
                  <>
                    <div className="flex justify-center mb-6">
                      <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                        <XCircle className="h-10 w-10 text-destructive" />
                      </div>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-3">
                      Payment Verification Failed
                    </h1>
                    <p className="text-muted-foreground mb-4">
                      {error || 'We could not verify your payment. Please try again or contact support.'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">
                      If you completed the payment, don't worry — contact us at{' '}
                      <a href="mailto:boluemmanuel071@gmail.com" className="text-primary hover:underline">
                        boluemmanuel071@gmail.com
                      </a>{' '}
                      or{' '}
                      <a href="https://wa.me/48608863629" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        WhatsApp (+48 608 863 629)
                      </a>
                    </p>
                    <div className="flex flex-col gap-3">
                      <Button variant="hero" className="w-full" onClick={handleRetry}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry Verification
                      </Button>
                      <Link to="/pricing">
                        <Button variant="outline" className="w-full">
                          Back to Pricing
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default PaymentSuccess;
