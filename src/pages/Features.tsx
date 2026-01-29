import { motion } from 'framer-motion';
import {
  QrCode,
  Users,
  BarChart3,
  Clock,
  Shield,
  Download,
  Smartphone,
  Bell,
  CheckCircle,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';

const features = [
  {
    icon: QrCode,
    title: 'QR Code Check-In',
    description:
      'Generate unique QR codes for each event. Attendees scan and check in within seconds.',
  },
  {
    icon: Clock,
    title: 'Real-Time Tracking',
    description:
      'Watch attendance numbers update live. Know exactly who has arrived at any moment.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Visualize attendance trends, peak check-in times, and event performance metrics.',
  },
  {
    icon: Users,
    title: 'Attendee Management',
    description:
      'Organize attendee lists, manage registrations, and export data with one click.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description:
      'Manage events on-the-go with our fully responsive interface designed for mobile.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'Your event data is encrypted and protected with enterprise-grade security.',
  },
  {
    icon: Bell,
    title: 'Instant Notifications',
    description:
      'Get alerted when VIPs arrive or when check-in milestones are reached.',
  },
  {
    icon: Download,
    title: 'Easy Export',
    description:
      'Export attendee lists as CSV files for use with other tools and reporting.',
  },
];

const Features = () => {
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
              Features
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything You Need to Run{' '}
              <span className="text-primary">Successful Events</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From registration to check-in to analytics, EventPulse provides all the tools
              you need for seamless event management.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={staggerItem}>
                <Card
                  variant="feature"
                  className="h-full bg-card hover:bg-card/80 group cursor-default"
                >
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose EventPulse?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Save Time',
                  description: 'Automate check-ins and reduce manual work by up to 80%.',
                },
                {
                  title: 'Increase Accuracy',
                  description: 'Eliminate human errors with digital attendance tracking.',
                },
                {
                  title: 'Better Insights',
                  description: 'Make data-driven decisions with comprehensive analytics.',
                },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 p-6 rounded-xl bg-secondary/30"
                >
                  <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Features;
