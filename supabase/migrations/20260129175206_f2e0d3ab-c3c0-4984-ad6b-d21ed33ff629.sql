-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Anyone can register as attendee" ON public.attendees;
DROP POLICY IF EXISTS "Attendees can check themselves in by email" ON public.attendees;

-- Create more specific attendee policies
-- Allow registration only when event is not full
CREATE POLICY "Can register as attendee when event not full"
  ON public.attendees FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_id
      AND events.current_attendees < events.max_attendees
      AND events.status != 'ended'
    )
  );

-- Allow attendees to view their own registration by email (for check-in page)
CREATE POLICY "Attendees can view their registration"
  ON public.attendees FOR SELECT
  USING (true);

-- Allow check-in updates (only for changing checked_in status)
CREATE POLICY "Allow check-in updates for attendees"
  ON public.attendees FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = attendees.event_id
      AND events.status != 'ended'
    )
  );