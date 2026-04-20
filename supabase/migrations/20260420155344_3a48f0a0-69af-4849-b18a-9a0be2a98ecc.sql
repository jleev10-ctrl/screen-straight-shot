-- Create now_watching table for Bucket 11
CREATE TABLE public.now_watching (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_url TEXT NOT NULL,
  title TEXT,
  note TEXT,
  added_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for fast "latest" lookups
CREATE INDEX idx_now_watching_created_at ON public.now_watching (created_at DESC);

-- Enable RLS
ALTER TABLE public.now_watching ENABLE ROW LEVEL SECURITY;

-- Public read (homepage Bucket 11 needs this for anon visitors)
CREATE POLICY "Anyone can view now_watching entries"
  ON public.now_watching
  FOR SELECT
  USING (true);

-- Admin-only writes
CREATE POLICY "Admins can insert now_watching entries"
  ON public.now_watching
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update now_watching entries"
  ON public.now_watching
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete now_watching entries"
  ON public.now_watching
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Auto-update updated_at
CREATE TRIGGER update_now_watching_updated_at
  BEFORE UPDATE ON public.now_watching
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();