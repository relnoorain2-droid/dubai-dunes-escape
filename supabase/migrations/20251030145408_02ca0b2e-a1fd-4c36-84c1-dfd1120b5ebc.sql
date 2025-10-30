-- Create bookings table for desert safari
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT NOT NULL,
  number_of_guests INTEGER NOT NULL CHECK (number_of_guests > 0),
  safari_type TEXT NOT NULL CHECK (safari_type IN ('premium', 'premium_shisha', 'premium_polaris', 'premium_vip')),
  price_per_person DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  booking_date DATE NOT NULL DEFAULT CURRENT_DATE,
  pickup_time TEXT NOT NULL DEFAULT '2:30 PM - 3:00 PM',
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert bookings (public booking form)
CREATE POLICY "Allow public booking insertions"
ON public.bookings
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow users to view their own bookings
CREATE POLICY "Users can view all bookings"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_bookings_email ON public.bookings(email);
CREATE INDEX idx_bookings_created_at ON public.bookings(created_at DESC);