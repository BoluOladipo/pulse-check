import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
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
import { Event } from '@/hooks/useEvents';

const eventSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().trim().min(10, 'Description must be at least 10 characters').max(500),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().trim().min(3, 'Location must be at least 3 characters').max(200),
  max_attendees: z.number().min(1, 'Must have at least 1 attendee').max(10000),
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
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      max_attendees: 100,
    },
  });

  useEffect(() => {
    if (editEvent) {
      reset({
        title: editEvent.title,
        description: editEvent.description || '',
        date: editEvent.date,
        time: editEvent.time,
        location: editEvent.location,
        max_attendees: editEvent.max_attendees,
      });
    } else {
      reset({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        max_attendees: 100,
      });
    }
  }, [editEvent, reset, open]);

  const handleFormSubmit = async (data: EventFormData) => {
    const eventData: Partial<Event> = {
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      location: data.location,
      max_attendees: data.max_attendees,
      status: 'upcoming',
    };

    onSubmit(eventData);
    reset();
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
            <Label htmlFor="max_attendees" className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Maximum Attendees
            </Label>
            <Input
              id="max_attendees"
              type="number"
              min="1"
              {...register('max_attendees', { valueAsNumber: true })}
            />
            {errors.max_attendees && (
              <p className="text-sm text-destructive">
                {errors.max_attendees.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
