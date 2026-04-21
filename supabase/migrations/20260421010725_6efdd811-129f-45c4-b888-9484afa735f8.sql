-- Remove the anonymous submission policy
DROP POLICY IF EXISTS "Anyone can submit a video" ON public.submissions;

-- Create new policy: only authenticated users can submit
CREATE POLICY "Authenticated users can submit videos"
ON public.submissions
FOR INSERT
TO authenticated
WITH CHECK (true);