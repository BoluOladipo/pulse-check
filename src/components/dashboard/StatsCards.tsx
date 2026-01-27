import { motion } from 'framer-motion';
import { Calendar, Users, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { mockAnalytics } from '@/data/mockData';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';

const stats = [
  {
    label: 'Total Events',
    value: mockAnalytics.totalEvents,
    change: '+12%',
    trend: 'up',
    icon: Calendar,
    color: 'primary',
  },
  {
    label: 'Active Events',
    value: mockAnalytics.activeEvents,
    change: '+1',
    trend: 'up',
    icon: Activity,
    color: 'success',
  },
  {
    label: 'Total Attendees',
    value: mockAnalytics.totalAttendees,
    change: '+23%',
    trend: 'up',
    icon: Users,
    color: 'accent',
  },
  {
    label: 'Check-In Rate',
    value: `${mockAnalytics.checkInRate}%`,
    change: '+5%',
    trend: 'up',
    icon: TrendingUp,
    color: 'primary',
  },
];

export const StatsCards = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={staggerItem}>
          <Card variant="stats" className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm font-medium text-success">
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      vs last month
                    </span>
                  </div>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    stat.color === 'primary'
                      ? 'bg-primary/10 text-primary'
                      : stat.color === 'success'
                      ? 'bg-success/10 text-success'
                      : 'bg-accent/10 text-accent'
                  }`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
