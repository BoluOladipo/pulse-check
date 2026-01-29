import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string;
  location: string;
  max_attendees: number;
  current_attendees: number;
  status: 'upcoming' | 'active' | 'ended';
  qr_code: string | null;
  organizer_id: string;
  created_at: string;
  updated_at: string;
}

export interface Attendee {
  id: string;
  event_id: string;
  name: string;
  email: string;
  checked_in: boolean;
  check_in_time: string | null;
  registration_time: string;
}

export const useEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    if (!user) {
      setEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('organizer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error fetching events',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setEvents((data as Event[]) || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const createEvent = async (eventData: Omit<Event, 'id' | 'current_attendees' | 'organizer_id' | 'created_at' | 'updated_at' | 'qr_code'>) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { data, error } = await supabase
      .from('events')
      .insert({
        ...eventData,
        organizer_id: user.id,
        qr_code: crypto.randomUUID(),
      })
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error creating event',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }

    toast({
      title: 'Event created!',
      description: 'Your new event has been created successfully.',
    });

    await fetchEvents();
    return { data, error: null };
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    const { error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error updating event',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }

    toast({
      title: 'Event updated!',
      description: 'Your event has been updated successfully.',
    });

    await fetchEvents();
    return { error: null };
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error deleting event',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }

    toast({
      title: 'Event deleted',
      description: 'The event has been removed.',
    });

    await fetchEvents();
    return { error: null };
  };

  return {
    events,
    loading,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};

export const useEventById = (eventId: string | undefined) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvent = useCallback(async () => {
    if (!eventId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .maybeSingle();

    if (eventError) {
      console.error('Error fetching event:', eventError);
    } else {
      setEvent(eventData as Event | null);
    }

    const { data: attendeesData, error: attendeesError } = await supabase
      .from('attendees')
      .select('*')
      .eq('event_id', eventId)
      .order('registration_time', { ascending: false });

    if (attendeesError) {
      console.error('Error fetching attendees:', attendeesError);
    } else {
      setAttendees((attendeesData as Attendee[]) || []);
    }

    setLoading(false);
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const checkInAttendee = async (attendeeId: string) => {
    const { error } = await supabase
      .from('attendees')
      .update({
        checked_in: true,
        check_in_time: new Date().toISOString(),
      })
      .eq('id', attendeeId);

    if (error) {
      toast({
        title: 'Error checking in attendee',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }

    toast({
      title: 'Attendee checked in!',
      description: 'The attendee has been marked as checked in.',
    });

    await fetchEvent();
    return { error: null };
  };

  return {
    event,
    attendees,
    loading,
    fetchEvent,
    checkInAttendee,
  };
};

export const usePublicEvent = (eventId: string | undefined) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching event:', error);
      } else {
        setEvent(data as Event | null);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [eventId]);

  const registerAndCheckIn = async (name: string, email: string) => {
    if (!eventId) return { error: new Error('No event ID') };

    // First try to find existing registration
    const { data: existingAttendee } = await supabase
      .from('attendees')
      .select('*')
      .eq('event_id', eventId)
      .eq('email', email)
      .maybeSingle();

    if (existingAttendee) {
      // Update to checked in
      const { error } = await supabase
        .from('attendees')
        .update({
          checked_in: true,
          check_in_time: new Date().toISOString(),
        })
        .eq('id', existingAttendee.id);

      if (error) {
        return { error };
      }
      return { error: null };
    }

    // New registration + check-in
    const { error } = await supabase
      .from('attendees')
      .insert({
        event_id: eventId,
        name,
        email,
        checked_in: true,
        check_in_time: new Date().toISOString(),
      });

    return { error };
  };

  return {
    event,
    loading,
    registerAndCheckIn,
  };
};
