import { motion } from 'framer-motion';
import { Zap, Users, Award, Globe } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';

const stats = [
  { label: 'Events Managed', value: '10,000+' },
  { label: 'Attendees Tracked', value: '500,000+' },
  { label: 'Countries', value: '50+' },
  { label: 'Customer Rating', value: '4.9/5' },
];

const team = [
  {
    name: 'Bolu Oladipo',
    role: 'Founder & CEO',
    bio: 'Full-stack developer with a passion for creating seamless event experiences.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bolu',
  },
];

const values = [
  {
    icon: Users,
    title: 'Customer First',
    description: 'Every decision we make is guided by what helps our customers succeed.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we build and deliver.',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    description: 'Making event management accessible to organizers of all sizes.',
  },
];

const About = () => {
  return (
    <MainLayout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Making Event Management{' '}
              <span className="text-primary">Effortless</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              EventPulse was born from a simple idea: event check-ins should be fast,
              accurate, and stress-free. We're building the future of event management.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem}>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              EventPulse started when our founder, Bolu Oladipo, experienced firsthand
              the chaos of manual event check-ins. Long queues, lost spreadsheets, and
              frustrated attendees inspired the creation of a better solution.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, EventPulse powers thousands of events worldwide, from small meetups
              to large conferences. Our mission is to help event organizers focus on what
              matters most: creating memorable experiences for their attendees.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
                      <value.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Meet the Team
            </h2>
            <div className="flex justify-center">
              {team.map((member) => (
                <Card key={member.name} className="max-w-sm text-center">
                  <CardContent className="pt-6">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-24 w-24 rounded-full mx-auto mb-4 bg-secondary"
                    />
                    <h3 className="font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
