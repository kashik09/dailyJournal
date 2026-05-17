# Supabase Setup Guide

## Step 1: Create a Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new project (choose a name, password, and region)

## Step 2: Get Your API Credentials
1. In your Supabase project dashboard, click on the "Settings" icon (gear icon)
2. Click on "API" in the sidebar
3. Copy your **Project URL** and **anon public** key
4. Add them to your `.env` file:
```
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 3: Create Database Tables
1. In your Supabase dashboard, click on "SQL Editor" in the sidebar
2. Click "New query"
3. Copy and paste the SQL below
4. Click "Run" to execute

```sql
-- Create journal_entries table
CREATE TABLE journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  date DATE NOT NULL,
  mood TEXT NOT NULL CHECK (mood IN ('happy', 'sad', 'neutral', 'excited', 'anxious', 'grateful', 'tired')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}'::TEXT[]
);

-- Create calendar_events table
CREATE TABLE calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('work', 'personal', 'health', 'social', 'other')),
  color TEXT NOT NULL
);

-- Create habits table
CREATE TABLE habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  streak INTEGER DEFAULT 0,
  completed_dates DATE[] DEFAULT '{}'::DATE[],
  category TEXT NOT NULL CHECK (category IN ('health', 'productivity', 'personal', 'fitness', 'mindfulness')),
  icon TEXT NOT NULL
);

-- Create exercises table
CREATE TABLE exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('cardio', 'strength', 'flexibility', 'sports', 'other')),
  name TEXT NOT NULL,
  duration INTEGER NOT NULL,
  sets INTEGER,
  reps INTEGER,
  weight DECIMAL,
  distance DECIMAL,
  calories INTEGER,
  notes TEXT
);

-- Create indexes for better query performance
CREATE INDEX idx_journal_entries_date ON journal_entries(date DESC);
CREATE INDEX idx_calendar_events_date ON calendar_events(date);
CREATE INDEX idx_habits_category ON habits(category);
CREATE INDEX idx_exercises_date ON exercises(date DESC);
CREATE INDEX idx_exercises_type ON exercises(type);

-- Enable Row Level Security (RLS)
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for now - you can add authentication later)
CREATE POLICY "Allow all operations on journal_entries" ON journal_entries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on calendar_events" ON calendar_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on habits" ON habits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on exercises" ON exercises FOR ALL USING (true) WITH CHECK (true);
```

## Step 4: (Optional) Seed Sample Data
You can insert the placeholder data by running another SQL query with INSERT statements, or use the app's UI to create entries.

## Step 5: Test Your Connection
1. Make sure your `.env` file has the correct credentials
2. Restart your dev server (`npm run dev`)
3. The app should now connect to your Supabase database!

## Troubleshooting
- **"Supabase credentials not found"**: Check that your `.env` file exists and has the correct variable names (must start with `VITE_`)
- **Connection errors**: Verify your Project URL and anon key are correct
- **Permission errors**: Make sure you ran the RLS policies in Step 3
- **Need to restart**: Environment variables require a server restart to take effect

## Next Steps
- Add user authentication (Supabase Auth)
- Implement user-specific data filtering
- Add real-time subscriptions for live updates
- Deploy to production
