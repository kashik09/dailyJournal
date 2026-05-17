import { useState } from 'react';
import { useHabits } from '../hooks/useHabits';
import { Habit } from '../types';

const categoryColors: Record<string, string> = {
  health: 'badge-success',
  productivity: 'badge-primary',
  personal: 'badge-secondary',
  fitness: 'badge-accent',
  mindfulness: 'badge-info'
};

type Category = 'health' | 'productivity' | 'personal' | 'fitness' | 'mindfulness';
type Frequency = 'daily' | 'weekly' | 'monthly';

export default function Habits() {
  const { habits, loading, createHabit, updateHabit, completeHabit, deleteHabit } = useHabits();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterFrequency, setFilterFrequency] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'daily' as Frequency,
    category: 'personal' as Category,
    icon: '✨'
  });

  const filteredHabits = habits.filter(habit => {
    const matchesCategory = filterCategory === 'all' || habit.category === filterCategory;
    const matchesFrequency = filterFrequency === 'all' || habit.frequency === filterFrequency;
    return matchesCategory && matchesFrequency;
  });

  const sortedHabits = [...filteredHabits].sort((a, b) => b.streak - a.streak);

  const stats = {
    totalHabits: habits.length,
    activeStreaks: habits.filter(h => h.streak > 0).length,
    longestStreak: habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0,
    totalCompletions: habits.reduce((sum, h) => sum + h.completedDates.length, 0)
  };

  const handleComplete = async (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const habit = habits.find(h => h.id === habitId);

    if (habit?.completedDates.includes(today)) {
      alert('You\'ve already completed this habit today!');
      return;
    }

    await completeHabit(habitId, today);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const habitData = {
      ...formData,
      streak: 0,
      completedDates: []
    };

    const { error } = editingId
      ? await updateHabit(editingId, formData)
      : await createHabit(habitData);

    if (!error) {
      setShowForm(false);
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        frequency: 'daily',
        category: 'personal',
        icon: '✨'
      });
    }
  };

  const handleEdit = (habit: Habit) => {
    setEditingId(habit.id);
    setFormData({
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      category: habit.category,
      icon: habit.icon
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this habit?')) {
      await deleteHabit(id);
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
    <div className="h-full flex flex-col gap-4">
      {showForm ? (
        <div className="bg-base-100 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              {editingId ? 'Edit Habit' : 'Create New Habit'}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Habit Name</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input input-bordered"
                  placeholder="e.g. Morning Meditation"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Icon</span>
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="input input-bordered"
                  placeholder="e.g. 🧘"
                  required
                />
              </div>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="textarea textarea-bordered h-24"
                placeholder="Describe your habit..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
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
                  <option value="health">Health</option>
                  <option value="productivity">Productivity</option>
                  <option value="personal">Personal</option>
                  <option value="fitness">Fitness</option>
                  <option value="mindfulness">Mindfulness</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Frequency</span>
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({...formData, frequency: e.target.value as Frequency})}
                  className="select select-bordered"
                  required
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary flex-1">
                {editingId ? 'Update Habit' : 'Create Habit'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    name: '',
                    description: '',
                    frequency: 'daily',
                    category: 'personal',
                    icon: '✨'
                  });
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-primary">
                <span className="text-4xl">🎯</span>
              </div>
              <div className="stat-title">Total Habits</div>
              <div className="stat-value text-primary">{stats.totalHabits}</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-secondary">
                <span className="text-4xl">🔥</span>
              </div>
              <div className="stat-title">Active Streaks</div>
              <div className="stat-value text-secondary">{stats.activeStreaks}</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-accent">
                <span className="text-4xl">⭐</span>
              </div>
              <div className="stat-title">Longest Streak</div>
              <div className="stat-value text-accent">{stats.longestStreak}</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-success">
                <span className="text-4xl">✅</span>
              </div>
              <div className="stat-title">Total Completions</div>
              <div className="stat-value text-success">{stats.totalCompletions}</div>
            </div>
          </div>

          {/* Filters and Add Button */}
          <div className="flex gap-4 bg-base-100 rounded-lg p-4">
            <div className="flex-1">
              <label className="label">
                <span className="label-text font-semibold">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="health">Health</option>
                <option value="productivity">Productivity</option>
                <option value="personal">Personal</option>
                <option value="fitness">Fitness</option>
                <option value="mindfulness">Mindfulness</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="label">
                <span className="label-text font-semibold">Frequency</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filterFrequency}
                onChange={(e) => setFilterFrequency(e.target.value)}
              >
                <option value="all">All Frequencies</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary"
              >
                + Add Habit
              </button>
            </div>
          </div>

          {/* Habits Grid */}
          <div className="flex-1 overflow-y-auto">
            {habits.length === 0 ? (
              <div className="text-center py-12 opacity-50">
                <p className="text-xl">No habits yet. Create one to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedHabits.map((habit) => {
                  const today = new Date().toISOString().split('T')[0];
                  const completedToday = habit.completedDates.includes(today);

                  return (
                    <div
                      key={habit.id}
                      className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="card-body">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-5xl">{habit.icon}</span>
                          <div className="flex flex-col items-end gap-2">
                            <span className={`badge ${categoryColors[habit.category]} badge-lg`}>
                              {habit.category}
                            </span>
                            <span className="badge badge-outline">
                              {habit.frequency}
                            </span>
                          </div>
                        </div>

                        <h3 className="card-title text-lg">{habit.name}</h3>
                        <p className="text-sm opacity-70">{habit.description}</p>

                        <div className="divider my-2"></div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🔥</span>
                            <div>
                              <div className="font-bold text-2xl">{habit.streak}</div>
                              <div className="text-xs opacity-70">day streak</div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-xl">{habit.completedDates.length}</div>
                            <div className="text-xs opacity-70">completions</div>
                          </div>
                        </div>

                        <div className="card-actions justify-between mt-4 gap-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(habit)}
                              className="btn btn-primary btn-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(habit.id)}
                              className="btn btn-error btn-sm"
                            >
                              Delete
                            </button>
                          </div>
                          <button
                            onClick={() => handleComplete(habit.id)}
                            className={`btn btn-sm ${completedToday ? 'btn-disabled' : 'btn-success'}`}
                            disabled={completedToday}
                          >
                            {completedToday ? '✓ Done Today' : '✓ Complete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {sortedHabits.length === 0 && habits.length > 0 && (
              <div className="text-center py-12 opacity-50">
                <p className="text-xl">No habits match your filters</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
