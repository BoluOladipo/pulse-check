import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, QrCode, Users, BarChart3, Zap, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { useAuth } from '@/hooks/useAuth';

export const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-28 lg:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Decorative elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl hidden lg:block"
      />
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl hidden lg:block"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Sparkles className="h-4 w-4" />
              Streamline Your Event Management
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Manage Events & Track{' '}
            <span className="text-primary relative">
              Attendance
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary/40"
                />
              </svg>
            </span>{' '}
            in Real Time
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Simplify check-ins with QR codes, gain insights with live analytics, 
            and create memorable events. The modern solution for event organizers.
          </motion.p>

          {/* CTA Buttons - Different for logged in vs logged out users */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="hero" size="xl" className="group">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="xl" className="group">
                    <Crown className="h-5 w-5 mr-2 text-primary" />
                    Upgrade Plan
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="hero" size="xl" className="group">
                    Get Started Free
                    <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="xl">
                    Learn More
                  </Button>
                </Link>
              </>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-border"
          >
            {[
              { value: '10K+', label: 'Events Managed' },
              { value: '500K+', label: 'Attendees Tracked' },
              { value: '99.9%', label: 'Uptime' },
              { value: '4.9/5', label: 'User Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto"
        >
          {[
            { icon: QrCode, label: 'QR Check-In' },
            { icon: Users, label: 'Attendee Management' },
            { icon: BarChart3, label: 'Live Analytics' },
            { icon: Zap, label: 'Real-Time Updates' },
          ].map((feature) => (
            <motion.div
              key={feature.label}
              variants={staggerItem}
              className="flex flex-col items-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                <feature.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-foreground text-center">
                {feature.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
