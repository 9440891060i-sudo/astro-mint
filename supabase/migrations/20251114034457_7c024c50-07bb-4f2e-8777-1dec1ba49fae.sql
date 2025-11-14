-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('investor', 'startup', 'human');

-- Create enum for verification status
CREATE TYPE public.verification_status_enum AS ENUM ('not_started', 'in_progress', 'pending_review', 'verified', 'rejected');

-- Create enum for document types
CREATE TYPE public.document_type_enum AS ENUM ('kyc_id', 'kyc_selfie', 'incorporation_docs', 'funding_proof', 'investment_docs');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL DEFAULT 'human',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create verification_status table
CREATE TABLE public.verification_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  status public.verification_status_enum NOT NULL DEFAULT 'not_started',
  current_step INTEGER NOT NULL DEFAULT 0,
  total_steps INTEGER NOT NULL DEFAULT 3,
  kyc_completed BOOLEAN NOT NULL DEFAULT FALSE,
  documents_uploaded BOOLEAN NOT NULL DEFAULT FALSE,
  face_verification_completed BOOLEAN NOT NULL DEFAULT FALSE,
  verified_badge BOOLEAN NOT NULL DEFAULT FALSE,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create verification_documents table
CREATE TABLE public.verification_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  document_type public.document_type_enum NOT NULL,
  file_url TEXT NOT NULL,
  status public.verification_status_enum NOT NULL DEFAULT 'pending_review',
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  rejection_reason TEXT
);

-- Create startup_details table
CREATE TABLE public.startup_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  funding_raised BOOLEAN NOT NULL DEFAULT FALSE,
  funding_amount DECIMAL,
  incorporation_verified BOOLEAN NOT NULL DEFAULT FALSE,
  funding_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create investor_details table
CREATE TABLE public.investor_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  investment_count INTEGER NOT NULL DEFAULT 0,
  investment_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_details ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view all roles"
  ON public.user_roles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own role"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for verification_status
CREATE POLICY "Users can view own verification status"
  ON public.verification_status FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own verification status"
  ON public.verification_status FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own verification status"
  ON public.verification_status FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for verification_documents
CREATE POLICY "Users can view own documents"
  ON public.verification_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON public.verification_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for startup_details
CREATE POLICY "Users can view all startup details"
  ON public.startup_details FOR SELECT
  USING (true);

CREATE POLICY "Users can update own startup details"
  ON public.startup_details FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own startup details"
  ON public.startup_details FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for investor_details
CREATE POLICY "Users can view all investor details"
  ON public.investor_details FOR SELECT
  USING (true);

CREATE POLICY "Users can update own investor details"
  ON public.investor_details FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own investor details"
  ON public.investor_details FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_verification_status_updated_at
  BEFORE UPDATE ON public.verification_status
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_startup_details_updated_at
  BEFORE UPDATE ON public.startup_details
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_investor_details_updated_at
  BEFORE UPDATE ON public.investor_details
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for verification documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('verification-documents', 'verification-documents', false);

-- Storage policies for verification documents
CREATE POLICY "Users can upload own verification documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'verification-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own verification documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'verification-documents' AND auth.uid()::text = (storage.foldername(name))[1]);