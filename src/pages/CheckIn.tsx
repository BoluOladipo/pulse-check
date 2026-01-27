import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Check, Zap, Calendar, MapPin, Clock, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockEvents } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const CheckIn = () => {
  const { id } = useParams();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const event = useMemo(() => mockEvents.find((e) => e.id === id), [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Event Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The event you're trying to check in to doesn't exist.
            </p>
            <Link to="/">
              <Button variant="default">Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate check-in
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsCheckedIn(true);
    setIsSubmitting(false);

    toast({
      title: 'Check-in successful!',
      description: `You're now checked in to ${event.title}`,
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isCheckedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-success/5 to-background p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card variant="elevated" className="text-center">
            <CardContent className="pt-8 pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-success mx-auto mb-6"
              >
                <Check className="h-10 w-10 text-success-foreground" />
              </motion.div>

              <h1 className="text-2xl font-bold text-foreground mb-2">
                You're Checked In!
              </h1>
              <p className="text-muted-foreground mb-6">
                Welcome to {event.title}
              </p>

              <div className="bg-secondary/50 rounded-xl p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>

              <Link to="/">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-primary/5 to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
            <Zap className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            Event<span className="text-primary">Pulse</span>
          </span>
        </Link>

        <Card variant="elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{event.title}</CardTitle>
            <CardDescription>
              Check in to this event
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Event Info */}
            <div className="bg-secondary/50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>

            <form onSubmit={handleCheckIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="success"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Checking in...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Check In Now
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CheckIn;
