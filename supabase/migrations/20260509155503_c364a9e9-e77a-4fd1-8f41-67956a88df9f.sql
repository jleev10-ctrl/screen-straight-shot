CREATE TABLE public.page_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL,
  path text,
  label text,
  referrer text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.page_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log events"
ON public.page_events
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can read events"
ON public.page_events
FOR SELECT
TO anon, authenticated
USING (true);

CREATE INDEX idx_page_events_created_at ON public.page_events (created_at DESC);
CREATE INDEX idx_page_events_type ON public.page_events (event_type);