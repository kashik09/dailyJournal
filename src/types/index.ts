export interface JournalEntry {
  id: string;
  date: string;
  mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'anxious' | 'grateful' | 'tired';
  title: string;
  content: string;
  tags: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  category: 'work' | 'personal' | 'health' | 'social' | 'other';
  color: string;
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  completedDates: string[];
  category: 'health' | 'productivity' | 'personal' | 'fitness' | 'mindfulness';
  icon: string;
}

export interface Exercise {
  id: string;
  date: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other';
  name: string;
  duration: number;
  sets?: number;
  reps?: number;
  weight?: number;
  distance?: number;
  calories?: number;
  notes: string;
}

export interface MealEntry {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  notes: string;
}
