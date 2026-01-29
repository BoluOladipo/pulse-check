import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface AnalyticsData {
  totalEvents: number;
  activeEvents: number;
  totalAttendees: number;
  checkInRate: number;
}

export const useAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalEvents: 0,
    activeEvents: 0,
    totalAttendees: 0,
    checkInRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);

      // Fetch events
      const { data: events } = await supabase
        .from('events')
        .select('id, status, current_attendees')
        .eq('organizer_id', user.id);

      if (events) {
        const totalEvents = events.length;
        const activeEvents = events.filter(e => e.status === 'active').length;
        const totalAttendees = events.reduce((sum, e) => sum + (e.current_attendees || 0), 0);

        // Fetch check-in data
        const eventIds = events.map(e => e.id);
        let checkInRate = 0;

        if (eventIds.length > 0) {
          const { data: attendees } = await supabase
            .from('attendees')
            .select('checked_in')
            .in('event_id', eventIds);

          if (attendees && attendees.length > 0) {
            const checkedIn = attendees.filter(a => a.checked_in).length;
            checkInRate = Math.round((checkedIn / attendees.length) * 100);
          }
        }

        setAnalytics({
          totalEvents,
          activeEvents,
          totalAttendees,
          checkInRate,
        });
      }

      setLoading(false);
    };

    fetchAnalytics();
  }, [user]);

  return { analytics, loading };
};
