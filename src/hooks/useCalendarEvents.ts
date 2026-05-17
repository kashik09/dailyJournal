import { useState, useEffect } from 'react';
import { CalendarEvent } from '../types';

const STORAGE_KEY = 'calendar_events';

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = () => {
    try {
      setLoading(true);
      const stored = localStorage.getItem(STORAGE_KEY);
      const data = stored ? JSON.parse(stored) : [];
      setEvents(data.sort((a: CalendarEvent, b: CalendarEvent) =>
        a.date.localeCompare(b.date)
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const saveToStorage = (data: CalendarEvent[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const createEvent = async (event: Omit<CalendarEvent, 'id'>) => {
    try {
      const newEvent: CalendarEvent = {
        ...event,
        id: crypto.randomUUID(),
      };
      const updated = [...events, newEvent].sort((a, b) => a.date.localeCompare(b.date));
      setEvents(updated);
      saveToStorage(updated);
      return { data: newEvent, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create event' };
    }
  };

  const updateEvent = async (id: string, updates: Partial<CalendarEvent>) => {
    try {
      const updated = events.map(e => e.id === id ? { ...e, ...updates } : e)
        .sort((a, b) => a.date.localeCompare(b.date));
      setEvents(updated);
      saveToStorage(updated);
      const updatedEvent = updated.find(e => e.id === id);
      return { data: updatedEvent, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update event' };
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const updated = events.filter(e => e.id !== id);
      setEvents(updated);
      saveToStorage(updated);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to delete event' };
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents
  };
}
