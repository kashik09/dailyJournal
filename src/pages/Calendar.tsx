import { useState } from 'react';
import { useCalendarEvents } from '../hooks/useCalendarEvents';
import { CalendarEvent } from '../types';

const categoryIcons: Record<string, string> = {
  work: '💼',
  personal: '🏠',
  health: '🏥',
  social: '👥',
  other: '📌'
};

const categoryColors: Record<string, string> = {
  work: '#3b82f6',
  personal: '#10b981',
  health: '#ef4444',
  social: '#f59e0b',
  other: '#8b5cf6'
};

type Category = 'work' | 'personal' | 'health' | 'social' | 'other';

export default function Calendar() {
  const { events, loading, createEvent, updateEvent, deleteEvent } = useCalendarEvents();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filter, setFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    category: 'personal' as Category,
    color: categoryColors.personal
  });

  const eventsForDate = events.filter(event => {
    const matchesDate = event.date === selectedDate;
    const matchesFilter = filter === 'all' || event.category === filter;
    return matchesDate && matchesFilter;
  });

  const uniqueDates = Array.from(new Set(events.map(e => e.date))).sort();

  const allEvents = filter === 'all'
    ? events
    : events.filter(e => e.category === filter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      ...formData,
      color: categoryColors[formData.category]
    };

    const { error } = editingId
      ? await updateEvent(editingId, eventData)
      : await createEvent(eventData);

    if (!error) {
      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '10:00',
        description: '',
        category: 'personal',
        color: categoryColors.personal
      });
    }
  };

  const handleEdit = (event: CalendarEvent) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description || '',
      category: event.category as Category,
      color: event.color
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="h-full flex gap-4">
      {/* Sidebar */}
      <div className="w-80 bg-base-100 rounded-lg p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Calendar</h2>

        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary btn-block mb-4"
        >
          + Add Event
        </button>

        <div className="mb-6">
          <label className="label">
            <span className="label-text font-semibold">Filter by Category</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="health">Health</option>
            <option value="social">Social</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="label">
            <span className="label-text font-semibold">Select Date</span>
          </label>
          {events.length === 0 ? (
            <div className="text-center py-4 opacity-50 text-sm">
              <p>No events yet. Add one!</p>
            </div>
          ) : (
            uniqueDates.map(date => {
              const dateEvents = events.filter(e => e.date === date);
              const hasFilteredEvents = filter === 'all' || dateEvents.some(e => e.category === filter);

              if (!hasFilteredEvents) return null;

              return (
                <div
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedDate === date
                      ? 'bg-primary text-primary-content'
                      : 'bg-base-200 hover:bg-base-300'
                  }`}
                >
                  <div className="font-semibold">{date}</div>
                  <div className="text-xs opacity-70">
                    {dateEvents.length} event{dateEvents.length !== 1 ? 's' : ''}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-base-100 rounded-lg p-6 overflow-y-auto">
        {showForm ? (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              {editingId ? 'Edit Event' : 'Add New Event'}
            </h2>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Event Title</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="input input-bordered"
                placeholder="e.g. Team Meeting"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                  className="select select-bordered"
                  required
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="health">Health</option>
                  <option value="social">Social</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Start Time</span>
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">End Time</span>
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Description (optional)</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="textarea textarea-bordered h-24"
                placeholder="Add event details..."
              />
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary flex-1">
                {editingId ? 'Update Event' : 'Add Event'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    title: '',
                    date: new Date().toISOString().split('T')[0],
                    startTime: '09:00',
                    endTime: '10:00',
                    description: '',
                    category: 'personal',
                    color: categoryColors.personal
                  });
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">
                {selectedDate}
              </h2>
              <p className="text-sm opacity-70">
                {eventsForDate.length} event{eventsForDate.length !== 1 ? 's' : ''} scheduled
              </p>
            </div>

            {eventsForDate.length === 0 ? (
              <div className="text-center py-12 opacity-50">
                <p className="text-xl">No events for this date</p>
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {eventsForDate.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((event) => (
                  <div
                    key={event.id}
                    className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="card-body">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{categoryIcons[event.category]}</span>
                          <div>
                            <h3 className="card-title">{event.title}</h3>
                            <div className="flex items-center gap-2 text-sm opacity-70 mt-1">
                              <span>{event.startTime} - {event.endTime}</span>
                              <span className="badge badge-sm capitalize" style={{ backgroundColor: event.color, color: 'white' }}>
                                {event.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="btn btn-error btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {event.description && (
                        <p className="mt-2 opacity-80">{event.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {events.length > 0 && (
              <>
                <div className="divider my-8"></div>

                <div>
                  <h3 className="text-xl font-bold mb-4">All Upcoming Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {allEvents.slice(0, 10).map((event) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg bg-base-200 hover:bg-base-300 cursor-pointer transition-colors"
                        onClick={() => setSelectedDate(event.date)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{categoryIcons[event.category]}</span>
                          <span className="font-semibold text-sm">{event.title}</span>
                        </div>
                        <div className="text-xs opacity-70">
                          {event.date} • {event.startTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
