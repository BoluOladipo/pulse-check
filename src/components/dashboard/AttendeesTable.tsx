import { motion } from 'framer-motion';
import { Check, X, Mail, Clock, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Attendee } from '@/hooks/useEvents';

interface AttendeesTableProps {
  attendees: Attendee[];
  onCheckIn?: (attendeeId: string) => void;
  onExportExcel?: () => void;
}

export const AttendeesTable = ({
  attendees,
  onCheckIn,
  onExportExcel,
}: AttendeesTableProps) => {
  const formatTime = (dateStr?: string | null) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Attendee List</CardTitle>
        <Button variant="outline" size="sm" onClick={onExportExcel} className="gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Export Excel
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attendee</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check-in Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendees.map((attendee, index) => (
                <motion.tr
                  key={attendee.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getInitials(attendee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{attendee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {attendee.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(attendee.registration_time)}
                  </TableCell>
                  <TableCell>
                    {attendee.checked_in ? (
                      <Badge variant="active" className="gap-1">
                        <Check className="h-3 w-3" />
                        Checked In
                      </Badge>
                    ) : (
                      <Badge variant="ended" className="gap-1">
                        <X className="h-3 w-3" />
                        Not Checked In
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {attendee.check_in_time ? (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {formatTime(attendee.check_in_time)}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {!attendee.checked_in && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => onCheckIn?.(attendee.id)}
                      >
                        Check In
                      </Button>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        {attendees.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No attendees registered yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
