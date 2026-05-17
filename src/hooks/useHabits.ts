import { useState, useEffect } from 'react';
import { Habit } from '../types';

const STORAGE_KEY = 'habits';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = () => {
    try {
      setLoading(true);
      const stored = localStorage.getItem(STORAGE_KEY);
      const data = stored ? JSON.parse(stored) : [];
      setHabits(data.sort((a: Habit, b: Habit) => b.streak - a.streak));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const saveToStorage = (data: Habit[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const createHabit = async (habit: Omit<Habit, 'id'>) => {
    try {
      const newHabit: Habit = {
        ...habit,
        id: crypto.randomUUID(),
      };
      const updated = [...habits, newHabit].sort((a, b) => b.streak - a.streak);
      setHabits(updated);
      saveToStorage(updated);
      return { data: newHabit, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create habit' };
    }
  };

  const updateHabit = async (id: string, updates: Partial<Habit>) => {
    try {
      const updated = habits.map(h => h.id === id ? { ...h, ...updates } : h)
        .sort((a, b) => b.streak - a.streak);
      setHabits(updated);
      saveToStorage(updated);
      const updatedHabit = updated.find(h => h.id === id);
      return { data: updatedHabit, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update habit' };
    }
  };

  const completeHabit = async (id: string, date: string) => {
    try {
      const habit = habits.find(h => h.id === id);
      if (!habit) throw new Error('Habit not found');

      const completedDates = [...habit.completedDates, date];
      const streak = habit.streak + 1;

      return await updateHabit(id, { completedDates, streak });
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to complete habit' };
    }
  };

  const deleteHabit = async (id: string) => {
    try {
      const updated = habits.filter(h => h.id !== id);
      setHabits(updated);
      saveToStorage(updated);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to delete habit' };
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return {
    habits,
    loading,
    error,
    createHabit,
    updateHabit,
    completeHabit,
    deleteHabit,
    refetch: fetchHabits
  };
}
