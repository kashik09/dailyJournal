// Utility to initialize localStorage with sample data for testing
import { journalEntries } from '../data/journalEntries';
import { calendarEvents } from '../data/calendarEvents';
import { habits } from '../data/habits';
import { exercises } from '../data/exercises';

export function initializeLocalStorage() {
  // Check if data already exists
  const hasJournalData = localStorage.getItem('journal_entries');
  const hasCalendarData = localStorage.getItem('calendar_events');
  const hasHabitsData = localStorage.getItem('habits');
  const hasExercisesData = localStorage.getItem('exercises');

  // Only initialize if all stores are empty
  if (!hasJournalData && !hasCalendarData && !hasHabitsData && !hasExercisesData) {
    localStorage.setItem('journal_entries', JSON.stringify(journalEntries));
    localStorage.setItem('calendar_events', JSON.stringify(calendarEvents));
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('exercises', JSON.stringify(exercises));

    console.log('✅ localStorage initialized with sample data');
    return true;
  }

  console.log('ℹ️ localStorage already has data, skipping initialization');
  return false;
}

// Helper to clear all data (useful for testing)
export function clearLocalStorage() {
  localStorage.removeItem('journal_entries');
  localStorage.removeItem('calendar_events');
  localStorage.removeItem('habits');
  localStorage.removeItem('exercises');
  console.log('🗑️ localStorage cleared');
}

// Helper to reset data to sample data
export function resetLocalStorage() {
  clearLocalStorage();
  localStorage.setItem('journal_entries', JSON.stringify(journalEntries));
  localStorage.setItem('calendar_events', JSON.stringify(calendarEvents));
  localStorage.setItem('habits', JSON.stringify(habits));
  localStorage.setItem('exercises', JSON.stringify(exercises));
  console.log('🔄 localStorage reset to sample data');
}

// Make functions available in browser console for testing
if (typeof window !== 'undefined') {
  (window as any).initializeLocalStorage = initializeLocalStorage;
  (window as any).clearLocalStorage = clearLocalStorage;
  (window as any).resetLocalStorage = resetLocalStorage;
}
