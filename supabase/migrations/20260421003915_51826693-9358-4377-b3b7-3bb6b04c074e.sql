-- Fans table: public email capture for "Join the Locker"
CREATE TABLE public.fans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.fans ENABLE ROW LEVEL SECURITY;

-- Anyone (anon or authenticated) can sign up
CREATE POLICY "Anyone can join the locker"
ON public.fans
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view the fan list
CREATE POLICY "Admins can view all fans"
ON public.fans
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete fans
CREATE POLICY "Admins can delete fans"
ON public.fans
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Index for fast lookup by email
CREATE INDEX idx_fans_email ON public.fans(email);