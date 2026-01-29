import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  QrCode,
  Edit,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AttendeesTable } from '@/components/dashboard/AttendeesTable';
import { QRCodeModal } from '@/components/dashboard/QRCodeModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useEventById, Event } from '@/hooks/useEvents';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { event, attendees, loading, checkInAttendee } = useEventById(id);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (loading || authLoading) {
    return (
      <MainLayout showFooter={false}>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-64 mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <Skeleton className="h-[400px]" />
        </div>
      </MainLayout>
    );
  }

  if (!event) {
    return (
      <MainLayout showFooter={false}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Event Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The event you're looking for doesn't exist.
            </p>
            <Link to="/dashboard">
              <Button variant="default">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: typeof event.status) => {
    switch (status) {
      case 'active':
        return <Badge variant="active">Active</Badge>;
      case 'upcoming':
        return <Badge variant="upcoming">Upcoming</Badge>;
      case 'ended':
        return <Badge variant="ended">Ended</Badge>;
    }
  };

  const attendancePercentage = Math.round(
    (event.current_attendees / event.max_attendees) * 100
  );

  const checkedInCount = attendees.filter((a) => a.checked_in).length;

  const handleCheckIn = async (attendeeId: string) => {
    await checkInAttendee(attendeeId);
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Registered', 'Checked In', 'Check-in Time'];
    const csvContent = [
      headers.join(','),
      ...attendees.map((a) =>
        [
          a.name,
          a.email,
          a.registration_time,
          a.checked_in ? 'Yes' : 'No',
          a.check_in_time || '',
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '-')}-attendees.csv`;
    link.click();

    toast({
      title: 'Export successful',
      description: 'Attendee list has been downloaded as CSV.',
    });
  };

  return (
    <MainLayout showFooter={false}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link to="/dashboard">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Event Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {getStatusBadge(event.status)}
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {event.title}
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  {event.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsQRModalOpen(true)}
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Event Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">
                      {formatDate(event.date)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="font-medium text-foreground">{event.time}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{event.location}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Capacity</p>
                    <p className="font-medium text-foreground">
                      {event.current_attendees} / {event.max_attendees}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            <Card variant="stats">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Registration Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {attendancePercentage}%
                </div>
                <Progress value={attendancePercentage} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {event.max_attendees - event.current_attendees} spots remaining
                </p>
              </CardContent>
            </Card>

            <Card variant="stats">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Check-in Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {attendees.length > 0
                    ? Math.round((checkedInCount / attendees.length) * 100)
                    : 0}
                  %
                </div>
                <p className="text-sm text-muted-foreground">
                  {checkedInCount} of {attendees.length} attendees checked in
                </p>
              </CardContent>
            </Card>

            <Card variant="stats">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Real-Time Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                  <span className="text-lg font-semibold text-foreground">
                    Live Tracking Active
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Updates in real-time as attendees check in
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Attendees Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AttendeesTable
              attendees={attendees}
              onCheckIn={handleCheckIn}
              onExportCSV={handleExportCSV}
            />
          </motion.div>
        </div>
      </div>

      <QRCodeModal
        event={event}
        open={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </MainLayout>
  );
};

export default EventDetails;
