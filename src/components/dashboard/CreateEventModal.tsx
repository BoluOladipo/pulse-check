import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, MapPin, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Event } from '@/types';
import { toast } from '@/hooks/use-toast';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  maxAttendees: z.number().min(1, 'Must have at least 1 attendee'),
});

type EventFormData = z.infer<typeof eventSchema>;

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: Partial<Event>) => void;
  editEvent?: Event | null;
}

export const CreateEventModal = ({
  open,
  onClose,
  onSubmit,
  editEvent,
}: CreateEventModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: editEvent
      ? {
          title: editEvent.title,
          description: editEvent.description,
          date: editEvent.date,
          time: editEvent.time,
          location: editEvent.location,
          maxAttendees: editEvent.maxAttendees,
        }
      : {
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          maxAttendees: 100,
        },
  });

  const handleFormSubmit = async (data: EventFormData) => {
    try {
      const eventData: Partial<Event> = {
        ...data,
        id: editEvent?.id || `event-${Date.now()}`,
        status: 'upcoming',
        currentAttendees: editEvent?.currentAttendees || 0,
        qrCode: editEvent?.qrCode || `event-${Date.now()}`,
        createdAt: editEvent?.createdAt || new Date().toISOString(),
        organizerId: 'user-1',
      };

      onSubmit(eventData);
      toast({
        title: editEvent ? 'Event updated!' : 'Event created!',
        description: editEvent
          ? 'Your event has been updated successfully.'
          : 'Your new event has been created.',
      });
      reset();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editEvent ? 'Edit Event' : 'Create New Event'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your event"
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Date
              </Label>
              <Input id="date" type="date" {...register('date')} />
              {errors.date && (
                <p className="text-sm text-destructive">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Time
              </Label>
              <Input id="time" type="time" {...register('time')} />
              {errors.time && (
                <p className="text-sm text-destructive">{errors.time.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="Enter event location"
              {...register('location')}
            />
            {errors.location && (
              <p className="text-sm text-destructive">
                {errors.location.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxAttendees" className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Maximum Attendees
            </Label>
            <Input
              id="maxAttendees"
              type="number"
              min="1"
              {...register('maxAttendees', { valueAsNumber: true })}
            />
            {errors.maxAttendees && (
              <p className="text-sm text-destructive">
                {errors.maxAttendees.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {editEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
