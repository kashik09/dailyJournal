import { useState } from 'react';
import { useJournalEntries } from '../hooks/useJournalEntries';
import { JournalEntry } from '../types';

const moodEmojis: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  neutral: '😐',
  excited: '🤩',
  anxious: '😰',
  grateful: '🙏',
  tired: '😴'
};

const moodColors: Record<string, string> = {
  happy: 'bg-yellow-100 border-yellow-300',
  sad: 'bg-blue-100 border-blue-300',
  neutral: 'bg-gray-100 border-gray-300',
  excited: 'bg-pink-100 border-pink-300',
  anxious: 'bg-purple-100 border-purple-300',
  grateful: 'bg-green-100 border-green-300',
  tired: 'bg-indigo-100 border-indigo-300'
};

type Mood = 'happy' | 'sad' | 'neutral' | 'excited' | 'anxious' | 'grateful' | 'tired';

export default function Journal() {
  const { entries, loading, createEntry, updateEntry, deleteEntry } = useJournalEntries();
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 'neutral' as Mood,
    title: '',
    content: '',
    tags: ''
  });

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

    const entryData = {
      date: formData.date,
      mood: formData.mood,
      title: formData.title,
      content: formData.content,
      tags: tagsArray
    };

    const { error } = editingId
      ? await updateEntry(editingId, entryData)
      : await createEntry(entryData);

    if (!error) {
      setShowForm(false);
      setEditingId(null);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        mood: 'neutral',
        title: '',
        content: '',
        tags: ''
      });
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setFormData({
      date: entry.date,
      mood: entry.mood as Mood,
      title: entry.title,
      content: entry.content,
      tags: entry.tags.join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      await deleteEntry(id);
      if (selectedEntry?.id === id) {
        setSelectedEntry(null);
      }
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
    <div className="flex h-full gap-4">
      {/* Sidebar with entry list */}
      <div className="w-80 bg-base-100 rounded-lg p-4 overflow-y-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search entries..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary btn-block mb-4"
        >
          + Write New Entry
        </button>

        {entries.length === 0 ? (
          <div className="text-center py-8 opacity-50">
            <p>No entries yet. Start writing!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className={`p-3 rounded-lg cursor-pointer transition-all border-2 ${
                  selectedEntry?.id === entry.id
                    ? 'bg-primary text-primary-content'
                    : `${moodColors[entry.mood]} hover:shadow-md`
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                  <span className="text-xs opacity-70">{entry.date}</span>
                </div>
                <h3 className="font-semibold text-sm truncate">{entry.title}</h3>
                <p className="text-xs opacity-70 truncate mt-1">{entry.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-base-100 rounded-lg p-6 overflow-y-auto">
        {showForm ? (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              {editingId ? 'Edit Entry' : 'Write New Entry'}
            </h2>

            <div className="form-control mb-4">
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

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">How are you feeling?</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {(['happy', 'sad', 'neutral', 'excited', 'anxious', 'grateful', 'tired'] as Mood[]).map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setFormData({...formData, mood})}
                    className={`btn ${formData.mood === mood ? 'btn-primary' : 'btn-outline'}`}
                  >
                    <span className="text-2xl">{moodEmojis[mood]}</span>
                    <span className="capitalize">{mood}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="input input-bordered"
                placeholder="Give your entry a title"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="textarea textarea-bordered h-48"
                placeholder="Write your thoughts..."
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Tags (comma-separated)</span>
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="input input-bordered"
                placeholder="e.g. work, gratitude, coding"
              />
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary flex-1">
                {editingId ? 'Update Entry' : 'Save Entry'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    date: new Date().toISOString().split('T')[0],
                    mood: 'neutral',
                    title: '',
                    content: '',
                    tags: ''
                  });
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : selectedEntry ? (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">{moodEmojis[selectedEntry.mood]}</span>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{selectedEntry.title}</h1>
                <div className="flex items-center gap-4 text-sm opacity-70">
                  <span>{selectedEntry.date}</span>
                  <span className="badge badge-lg capitalize">{selectedEntry.mood}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(selectedEntry)}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(selectedEntry.id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                {selectedEntry.content}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedEntry.tags.map((tag) => (
                <span key={tag} className="badge badge-outline badge-lg">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full opacity-50">
            <p className="text-xl">Select an entry or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}
