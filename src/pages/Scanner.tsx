import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scanner as QrScanner } from '@yudiel/react-qr-scanner';
import { ArrowLeft, Check, AlertCircle, RotateCcw, Users } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useEventById, checkInByToken } from '@/hooks/useEvents';
import { toast } from '@/hooks/use-toast';

type ScanResult = {
  status: 'success' | 'already' | 'error';
  message: string;
  name?: string;
  email?: string;
};

const Scanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { event, attendees, loading, fetchEvent } = useEventById(id);
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<ScanResult | null>(null);
  const lastScannedRef = useRef<{ token: string; at: number } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  const handleScan = async (detected: { rawValue: string }[]) => {
    const token = detected?.[0]?.rawValue;
    if (!token || !scanning) return;

    // Debounce: ignore the same token within 3 seconds
    const now = Date.now();
    if (lastScannedRef.current && lastScannedRef.current.token === token && now - lastScannedRef.current.at < 3000) {
      return;
    }
    lastScannedRef.current = { token, at: now };

    setScanning(false);
    const { error, attendee, alreadyCheckedIn } = await checkInByToken(token);

    if (error || !attendee) {
      setResult({ status: 'error', message: error?.message ?? 'Invalid QR code' });
      toast({ title: 'Scan failed', description: error?.message ?? 'Invalid QR code', variant: 'destructive' });
    } else if (attendee.event_id !== id) {
      setResult({ status: 'error', message: 'This QR code is for a different event' });
      toast({ title: 'Wrong event', description: 'QR code belongs to another event', variant: 'destructive' });
    } else if (alreadyCheckedIn) {
      setResult({
        status: 'already',
        message: 'Already checked in',
        name: attendee.name,
        email: attendee.email,
      });
    } else {
      setResult({
        status: 'success',
        message: 'Checked in successfully',
        name: attendee.name,
        email: attendee.email,
      });
      toast({ title: '✓ Checked in', description: `${attendee.name} marked present.` });
      await fetchEvent();
    }
  };

  const resumeScanning = () => {
    setResult(null);
    setScanning(true);
  };

  if (authLoading || loading) {
    return (
      <MainLayout showFooter={false}>
        <div className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Loading scanner…</p>
        </div>
      </MainLayout>
    );
  }

  if (!event) {
    return (
      <MainLayout showFooter={false}>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link to="/dashboard"><Button>Back to Dashboard</Button></Link>
        </div>
      </MainLayout>
    );
  }

  const checkedInCount = attendees.filter((a) => a.checked_in).length;

  return (
    <MainLayout showFooter={false}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
          <div className="mb-6">
            <Link to={`/dashboard/events/${id}`}>
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Event
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Check-in Scanner</h1>
              <p className="text-muted-foreground text-sm">{event.title}</p>
            </div>
            <Badge variant="active" className="self-start sm:self-auto gap-1">
              <Users className="h-3 w-3" />
              {checkedInCount} / {attendees.length} checked in
            </Badge>
          </div>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Point camera at attendee's QR code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden bg-black">
                {scanning ? (
                  <QrScanner
                    onScan={handleScan}
                    onError={(err) => console.error('Scanner error:', err)}
                    constraints={{ facingMode: 'environment' }}
                    styles={{ container: { width: '100%', height: '100%' } }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <p className="text-muted-foreground">Scanner paused</p>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {result && (
                  <motion.div
                    key={result.status + (result.name ?? '')}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6"
                  >
                    {result.status === 'success' && (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-success/10 border border-success/30">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success">
                          <Check className="h-5 w-5 text-success-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">Checked in!</p>
                          <p className="text-sm text-foreground truncate">{result.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{result.email}</p>
                        </div>
                      </div>
                    )}

                    {result.status === 'already' && (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/30">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning">
                          <AlertCircle className="h-5 w-5 text-warning-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">Already checked in</p>
                          <p className="text-sm text-foreground truncate">{result.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{result.email}</p>
                        </div>
                      </div>
                    )}

                    {result.status === 'error' && (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive">
                          <AlertCircle className="h-5 w-5 text-destructive-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">Check-in failed</p>
                          <p className="text-sm text-muted-foreground">{result.message}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!scanning && (
                <Button onClick={resumeScanning} className="w-full mt-4" variant="default">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Scan Next Attendee
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Scanner;
