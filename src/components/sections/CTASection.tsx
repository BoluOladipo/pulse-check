import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export const CTASection = () => {
  const { user } = useAuth();

  return (
    <section className="py-20 lg:py-28 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 lg:p-16 text-center"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20">
                <Zap className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              {user ? 'Unlock More Features' : 'Ready to Revolutionize Your Events?'}
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              {user 
                ? 'Upgrade to Pro or Enterprise for unlimited events, advanced analytics, and priority support.'
                : 'Join thousands of event organizers who trust EventPulse for seamless check-ins and real-time attendance tracking.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Link to="/pricing">
                    <Button
                      size="xl"
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg group"
                    >
                      <Crown className="h-5 w-5 mr-2" />
                      Upgrade Now
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button
                      size="xl"
                      variant="outline"
                      className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button
                      size="xl"
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg group"
                    >
                      Start for Free
                      <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      size="xl"
                      variant="outline"
                      className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                    >
                      Contact Sales
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <p className="text-sm text-primary-foreground/60 mt-6">
              {user ? 'Flexible plans for teams of all sizes' : 'No credit card required • Free forever for small events'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
