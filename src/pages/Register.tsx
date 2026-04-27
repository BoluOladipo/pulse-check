import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { QRCodeSVG } from 'qrcode.react';
import { Check, Zap, Calendar, MapPin, Clock, User, Mail, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { usePublicEvent, type Attendee } from '@/hooks/useEvents';
import { toast } from '@/hooks/use-toast';

const schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
});
type FormData = z.infer<typeof schema>;

const Register = () => {
  const { id } = useParams();
  const { event, loading, register: registerAttendee } = usePublicEvent(id);
  const [attendee, setAttendee] = useState<Attendee | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const onSubmit = async (data: FormData) => {
    const { data: created, error } = await registerAttendee(data.name, data.email);
    if (error || !created) {
      toast({ title: 'Registration failed', description: error?.message ?? 'Please try again.', variant: 'destructive' });
      return;
    }
    setAttendee(created);
    toast({ title: 'Registration successful!', description: 'Save your QR code — show it at the event entrance.' });
  };

  const handleDownload = () => {
    const svg = document.getElementById('attendee-qr-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = `${event?.title.replace(/\s+/g, '-')}-${attendee?.name.replace(/\s+/g, '-')}-qr.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-10 w-40 mx-auto" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">The event you're trying to register for doesn't exist.</p>
            <Link to="/"><Button>Go to Home</Button></Link>
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
            <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Event Has Ended</h1>
            <p className="text-muted-foreground mb-6">Registration is closed for this event.</p>
            <Link to="/"><Button>Go to Home</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state — show QR code
  if (attendee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-success/5 to-background p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Card variant="elevated">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-success mx-auto mb-3"
              >
                <Check className="h-8 w-8 text-success-foreground" />
              </motion.div>
              <CardTitle className="text-xl">You're Registered!</CardTitle>
              <CardDescription>Show this QR code at the event entrance</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-xl border-2 border-primary/20 shadow-sm mb-4">
                <QRCodeSVG
                  id="attendee-qr-svg"
                  value={attendee.qr_token}
                  size={220}
                  level="H"
                  includeMargin
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>

              <div className="text-center mb-4">
                <p className="font-semibold text-foreground">{attendee.name}</p>
                <p className="text-sm text-muted-foreground">{attendee.email}</p>
              </div>

              <div className="bg-secondary/50 rounded-xl p-4 mb-4 w-full text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4 w-full">
                <p className="text-xs text-muted-foreground text-center">
                  📱 <strong className="text-foreground">Save a screenshot</strong> or download this QR code.
                  The host will scan it at the event to mark your attendance.
                </p>
              </div>

              <Button onClick={handleDownload} className="w-full" variant="default">
                <Download className="h-4 w-4 mr-2" />
                Download QR Code
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Registration form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-primary/5 to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
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
            <CardDescription>Register to receive your check-in QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary/50 rounded-xl p-4 mb-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary shrink-0" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{event.location}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name" placeholder="Enter your name" className="pl-10" {...register('name')} />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-10" {...register('email')} />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <Button type="submit" variant="default" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register & Get QR Code'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
