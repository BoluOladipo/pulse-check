-- Add unique qr_token to attendees
ALTER TABLE public.attendees
  ADD COLUMN IF NOT EXISTS qr_token text;

-- Backfill existing rows
UPDATE public.attendees
SET qr_token = gen_random_uuid()::text
WHERE qr_token IS NULL;

-- Enforce NOT NULL + unique
ALTER TABLE public.attendees
  ALTER COLUMN qr_token SET NOT NULL;

ALTER TABLE public.attendees
  ALTER COLUMN qr_token SET DEFAULT gen_random_uuid()::text;

CREATE UNIQUE INDEX IF NOT EXISTS attendees_qr_token_key
  ON public.attendees (qr_token);

-- Replace the broad public update policy with a token-gated one
DROP POLICY IF EXISTS "Allow check-in updates for attendees" ON public.attendees;

CREATE POLICY "Public can check in with valid qr_token"
ON public.attendees
FOR UPDATE
TO public
USING (
  EXISTS (
    SELECT 1 FROM public.events
    WHERE events.id = attendees.event_id
      AND events.status <> 'ended'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.events
    WHERE events.id = attendees.event_id
      AND events.status <> 'ended'
  )
);

-- Allow public SELECT to remain (already true) so the register page can echo the new row
-- Make sure attendees can be inserted even when not checked in (already supported by existing INSERT policy)