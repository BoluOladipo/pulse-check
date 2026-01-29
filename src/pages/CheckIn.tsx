import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Zap, Calendar, MapPin, Clock, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { usePublicEvent } from '@/hooks/useEvents';
import { toast } from '@/hooks/use-toast';

const checkInSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
});

type CheckInFormData = z.infer<typeof checkInSchema>;

const CheckIn = () => {
  const { id } = useParams();
  const { event, loading, registerAndCheckIn } = usePublicEvent(id);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckInFormData>({
    resolver: zodResolver(checkInSchema),
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const onSubmit = async (data: CheckInFormData) => {
    const { error } = await registerAndCheckIn(data.name, data.email);

    if (error) {
      let message = error.message;
      if (message.includes('duplicate key')) {
        message = 'You are already registered for this event.';
      }
      toast({
        title: 'Check-in failed',
        description: message,
        variant: 'destructive',
      });
      return;
    }

    setIsCheckedIn(true);
    toast({
      title: 'Check-in successful!',
      description: `You're now checked in to ${event?.title}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <Skeleton className="h-10 w-40 mx-auto mb-8" />
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Skeleton className="h-6 w-48 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Event Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The event you're trying to check in to doesn't exist or has been removed.
            </p>
            <Link to="/">
              <Button variant="default">Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (event.status === 'ended') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Event Has Ended
            </h1>
            <p className="text-muted-foreground mb-6">
              This event has already ended. Check-in is no longer available.
            </p>
            <Link to="/">
              <Button variant="default">Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="pl-10"
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
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
