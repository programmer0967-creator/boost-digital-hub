-- Drop the existing INSERT policy that allows any value for is_approved
DROP POLICY IF EXISTS "Anyone can insert ratings" ON public.ratings;

-- Create a new INSERT policy that enforces is_approved = false
CREATE POLICY "Anyone can insert ratings" 
ON public.ratings 
FOR INSERT 
WITH CHECK (is_approved = false);