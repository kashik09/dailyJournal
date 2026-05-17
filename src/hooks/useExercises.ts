import { useState, useEffect } from 'react';
import { Exercise } from '../types';

const STORAGE_KEY = 'exercises';

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExercises = () => {
    try {
      setLoading(true);
      const stored = localStorage.getItem(STORAGE_KEY);
      const data = stored ? JSON.parse(stored) : [];
      setExercises(data.sort((a: Exercise, b: Exercise) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const saveToStorage = (data: Exercise[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const createExercise = async (exercise: Omit<Exercise, 'id'>) => {
    try {
      const newExercise: Exercise = {
        ...exercise,
        id: crypto.randomUUID(),
      };
      const updated = [newExercise, ...exercises];
      setExercises(updated);
      saveToStorage(updated);
      return { data: newExercise, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create exercise' };
    }
  };

  const updateExercise = async (id: string, updates: Partial<Exercise>) => {
    try {
      const updated = exercises.map(e => e.id === id ? { ...e, ...updates } : e);
      setExercises(updated);
      saveToStorage(updated);
      const updatedExercise = updated.find(e => e.id === id);
      return { data: updatedExercise, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update exercise' };
    }
  };

  const deleteExercise = async (id: string) => {
    try {
      const updated = exercises.filter(e => e.id !== id);
      setExercises(updated);
      saveToStorage(updated);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to delete exercise' };
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return {
    exercises,
    loading,
    error,
    createExercise,
    updateExercise,
    deleteExercise,
    refetch: fetchExercises
  };
}
