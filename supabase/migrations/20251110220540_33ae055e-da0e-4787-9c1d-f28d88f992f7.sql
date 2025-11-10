-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create articles table
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  icon_name TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Articles policies (public read)
CREATE POLICY "Anyone can view published articles"
  ON public.articles FOR SELECT
  USING (published = true);

-- Create quiz_questions table
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on quiz_questions
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

-- Quiz questions policies (public read)
CREATE POLICY "Anyone can view active quiz questions"
  ON public.quiz_questions FOR SELECT
  USING (active = true);

-- Create quiz_results table
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on quiz_results
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Quiz results policies
CREATE POLICY "Users can view their own quiz results"
  ON public.quiz_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results"
  ON public.quiz_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create budget_simulations table
CREATE TABLE public.budget_simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  income NUMERIC NOT NULL,
  housing NUMERIC DEFAULT 0,
  food NUMERIC DEFAULT 0,
  transport NUMERIC DEFAULT 0,
  utilities NUMERIC DEFAULT 0,
  entertainment NUMERIC DEFAULT 0,
  others NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on budget_simulations
ALTER TABLE public.budget_simulations ENABLE ROW LEVEL SECURITY;

-- Budget simulations policies
CREATE POLICY "Users can view their own budget simulations"
  ON public.budget_simulations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own budget simulations"
  ON public.budget_simulations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own budget simulations"
  ON public.budget_simulations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own budget simulations"
  ON public.budget_simulations FOR DELETE
  USING (auth.uid() = user_id);

-- Create investment_simulations table
CREATE TABLE public.investment_simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  initial_amount NUMERIC NOT NULL,
  monthly_contribution NUMERIC NOT NULL,
  time_months INTEGER NOT NULL,
  investment_type TEXT NOT NULL,
  final_value NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on investment_simulations
ALTER TABLE public.investment_simulations ENABLE ROW LEVEL SECURITY;

-- Investment simulations policies
CREATE POLICY "Users can view their own investment simulations"
  ON public.investment_simulations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own investment simulations"
  ON public.investment_simulations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own investment simulations"
  ON public.investment_simulations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own investment simulations"
  ON public.investment_simulations FOR DELETE
  USING (auth.uid() = user_id);

-- Create debt_calculations table
CREATE TABLE public.debt_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  debts JSONB NOT NULL,
  extra_payment NUMERIC DEFAULT 0,
  method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on debt_calculations
ALTER TABLE public.debt_calculations ENABLE ROW LEVEL SECURITY;

-- Debt calculations policies
CREATE POLICY "Users can view their own debt calculations"
  ON public.debt_calculations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own debt calculations"
  ON public.debt_calculations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own debt calculations"
  ON public.debt_calculations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own debt calculations"
  ON public.debt_calculations FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_budget_simulations_updated_at
  BEFORE UPDATE ON public.budget_simulations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_investment_simulations_updated_at
  BEFORE UPDATE ON public.investment_simulations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_debt_calculations_updated_at
  BEFORE UPDATE ON public.debt_calculations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();