import { useState, useEffect } from 'react';
import { JournalEntry } from '../types';

const STORAGE_KEY = 'journal_entries';

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = () => {
    try {
      setLoading(true);
      const stored = localStorage.getItem(STORAGE_KEY);
      const data = stored ? JSON.parse(stored) : [];
      setEntries(data.sort((a: JournalEntry, b: JournalEntry) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const saveToStorage = (data: JournalEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const createEntry = async (entry: Omit<JournalEntry, 'id'>) => {
    try {
      const newEntry: JournalEntry = {
        ...entry,
        id: crypto.randomUUID(),
      };
      const updated = [newEntry, ...entries];
      setEntries(updated);
      saveToStorage(updated);
      return { data: newEntry, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create entry' };
    }
  };

  const updateEntry = async (id: string, updates: Partial<JournalEntry>) => {
    try {
      const updated = entries.map(e => e.id === id ? { ...e, ...updates } : e);
      setEntries(updated);
      saveToStorage(updated);
      const updatedEntry = updated.find(e => e.id === id);
      return { data: updatedEntry, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update entry' };
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const updated = entries.filter(e => e.id !== id);
      setEntries(updated);
      saveToStorage(updated);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to delete entry' };
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return {
    entries,
    loading,
    error,
    createEntry,
    updateEntry,
    deleteEntry,
    refetch: fetchEntries
  };
}
