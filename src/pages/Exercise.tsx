import { useState } from 'react';
import { useExercises } from '../hooks/useExercises';
import type { Exercise } from '../types';

const typeIcons: Record<string, string> = {
  cardio: '🏃',
  strength: '💪',
  flexibility: '🧘',
  sports: '⚽',
  other: '🏋️'
};

const typeColors: Record<string, string> = {
  cardio: 'badge-error',
  strength: 'badge-primary',
  flexibility: 'badge-success',
  sports: 'badge-warning',
  other: 'badge-info'
};

type ExerciseType = 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other';

export default function Exercise() {
  const { exercises, loading, createExercise, updateExercise, deleteExercise } = useExercises();
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(exercises[0] || null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'cardio' as ExerciseType,
    name: '',
    duration: 30,
    sets: undefined as number | undefined,
    reps: undefined as number | undefined,
    weight: undefined as number | undefined,
    distance: undefined as number | undefined,
    calories: undefined as number | undefined,
    notes: ''
  });

  const filteredExercises = filterType === 'all'
    ? exercises
    : exercises.filter(e => e.type === filterType);

  const stats = {
    totalWorkouts: exercises.length,
    totalTime: exercises.reduce((sum, e) => sum + e.duration, 0),
    totalCalories: exercises.reduce((sum, e) => sum + (e.calories || 0), 0),
    totalDistance: exercises.reduce((sum, e) => sum + (e.distance || 0), 0).toFixed(1)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const exerciseData = {
      ...formData,
      sets: formData.sets || undefined,
      reps: formData.reps || undefined,
      weight: formData.weight || undefined,
      distance: formData.distance || undefined,
      calories: formData.calories || undefined
    };

    const { data, error } = editingId
      ? await updateExercise(editingId, exerciseData)
      : await createExercise(exerciseData);

    if (!error && data) {
      setShowForm(false);
      setEditingId(null);
      setSelectedExercise(data);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        type: 'cardio',
        name: '',
        duration: 30,
        sets: undefined,
        reps: undefined,
        weight: undefined,
        distance: undefined,
        calories: undefined,
        notes: ''
      });
    }
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingId(exercise.id);
    setFormData({
      date: exercise.date,
      type: exercise.type,
      name: exercise.name,
      duration: exercise.duration,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      distance: exercise.distance,
      calories: exercise.calories,
      notes: exercise.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this exercise?')) {
      await deleteExercise(id);
      if (selectedExercise?.id === id) {
        setSelectedExercise(exercises[0] || null);
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
    <div className="h-full flex flex-col gap-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-primary">
            <span className="text-4xl">🏋️</span>
          </div>
          <div className="stat-title">Total Workouts</div>
          <div className="stat-value text-primary">{stats.totalWorkouts}</div>
        </div>

        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-secondary">
            <span className="text-4xl">⏱️</span>
          </div>
          <div className="stat-title">Total Time (min)</div>
          <div className="stat-value text-secondary">{stats.totalTime}</div>
        </div>

        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-accent">
            <span className="text-4xl">🔥</span>
          </div>
          <div className="stat-title">Calories Burned</div>
          <div className="stat-value text-accent">{stats.totalCalories}</div>
        </div>

        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-success">
            <span className="text-4xl">📏</span>
          </div>
          <div className="stat-title">Distance (km)</div>
          <div className="stat-value text-success">{stats.totalDistance}</div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-base-100 rounded-lg p-4">
        <label className="label">
          <span className="label-text font-semibold">Filter by Type</span>
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`btn ${filterType === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            All Types
          </button>
          <button
            onClick={() => setFilterType('cardio')}
            className={`btn ${filterType === 'cardio' ? 'btn-error' : 'btn-outline'}`}
          >
            🏃 Cardio
          </button>
          <button
            onClick={() => setFilterType('strength')}
            className={`btn ${filterType === 'strength' ? 'btn-primary' : 'btn-outline'}`}
          >
            💪 Strength
          </button>
          <button
            onClick={() => setFilterType('flexibility')}
            className={`btn ${filterType === 'flexibility' ? 'btn-success' : 'btn-outline'}`}
          >
            🧘 Flexibility
          </button>
          <button
            onClick={() => setFilterType('sports')}
            className={`btn ${filterType === 'sports' ? 'btn-warning' : 'btn-outline'}`}
          >
            ⚽ Sports
          </button>
        </div>
      </div>

      {/* Exercise List or Form */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {showForm ? (
          <div className="flex-1 bg-base-100 rounded-lg p-6 overflow-y-auto">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                {editingId ? 'Edit Exercise' : 'Log New Exercise'}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Exercise Name</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="input input-bordered"
                    placeholder="e.g. Morning Run"
                    required
                  />
                </div>

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
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Type</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as ExerciseType})}
                    className="select select-bordered"
                    required
                  >
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="sports">Sports</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Duration (minutes)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
                    className="input input-bordered"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Calories (optional)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.calories || ''}
                    onChange={(e) => setFormData({...formData, calories: e.target.value ? Number(e.target.value) : undefined})}
                    className="input input-bordered"
                    min="0"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Distance (km, optional)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.distance || ''}
                    onChange={(e) => setFormData({...formData, distance: e.target.value ? Number(e.target.value) : undefined})}
                    className="input input-bordered"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="divider">Strength Training (optional)</div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Sets</span>
                  </label>
                  <input
                    type="number"
                    value={formData.sets || ''}
                    onChange={(e) => setFormData({...formData, sets: e.target.value ? Number(e.target.value) : undefined})}
                    className="input input-bordered"
                    min="0"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Reps</span>
                  </label>
                  <input
                    type="number"
                    value={formData.reps || ''}
                    onChange={(e) => setFormData({...formData, reps: e.target.value ? Number(e.target.value) : undefined})}
                    className="input input-bordered"
                    min="0"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Weight (lbs)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({...formData, weight: e.target.value ? Number(e.target.value) : undefined})}
                    className="input input-bordered"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Notes (optional)</span>
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="textarea textarea-bordered h-24"
                  placeholder="Add any additional notes..."
                />
              </div>

              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary flex-1">
                  {editingId ? 'Update Exercise' : 'Log Exercise'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      date: new Date().toISOString().split('T')[0],
                      type: 'cardio',
                      name: '',
                      duration: 30,
                      sets: undefined,
                      reps: undefined,
                      weight: undefined,
                      distance: undefined,
                      calories: undefined,
                      notes: ''
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
            {/* Sidebar List */}
            <div className="w-80 bg-base-100 rounded-lg p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Exercise Log</h3>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary btn-sm"
                >
                  + Add
                </button>
              </div>

              {exercises.length === 0 ? (
                <div className="text-center py-8 opacity-50">
                  <p className="text-sm">No exercises logged yet!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      onClick={() => setSelectedExercise(exercise)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedExercise?.id === exercise.id
                          ? 'bg-primary text-primary-content'
                          : 'bg-base-200 hover:bg-base-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{typeIcons[exercise.type]}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{exercise.name}</div>
                          <div className="text-xs opacity-70">{exercise.date}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs badge badge-sm">{exercise.duration}min</span>
                        {exercise.calories && (
                          <span className="text-xs badge badge-sm">{exercise.calories}cal</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Exercise Detail */}
            <div className="flex-1 bg-base-100 rounded-lg p-6 overflow-y-auto">
              {selectedExercise ? (
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl">{typeIcons[selectedExercise.type]}</span>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2">{selectedExercise.name}</h2>
                      <div className="flex items-center gap-2">
                        <span className={`badge ${typeColors[selectedExercise.type]} badge-lg`}>
                          {selectedExercise.type}
                        </span>
                        <span className="text-sm opacity-70">{selectedExercise.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(selectedExercise)}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(selectedExercise.id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="stat bg-base-200 rounded-lg">
                      <div className="stat-title">Duration</div>
                      <div className="stat-value text-3xl">{selectedExercise.duration}</div>
                      <div className="stat-desc">minutes</div>
                    </div>

                    {selectedExercise.calories && (
                      <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Calories</div>
                        <div className="stat-value text-3xl">{selectedExercise.calories}</div>
                        <div className="stat-desc">burned</div>
                      </div>
                    )}

                    {selectedExercise.distance && (
                      <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Distance</div>
                        <div className="stat-value text-3xl">{selectedExercise.distance}</div>
                        <div className="stat-desc">kilometers</div>
                      </div>
                    )}

                    {selectedExercise.sets && selectedExercise.reps && (
                      <>
                        <div className="stat bg-base-200 rounded-lg">
                          <div className="stat-title">Sets × Reps</div>
                          <div className="stat-value text-3xl">
                            {selectedExercise.sets} × {selectedExercise.reps}
                          </div>
                        </div>

                        {selectedExercise.weight && (
                          <div className="stat bg-base-200 rounded-lg">
                            <div className="stat-title">Weight</div>
                            <div className="stat-value text-3xl">{selectedExercise.weight}</div>
                            <div className="stat-desc">lbs</div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {selectedExercise.notes && (
                    <div className="bg-base-200 rounded-lg p-4 mb-6">
                      <h3 className="font-bold mb-2">Notes</h3>
                      <p className="opacity-80">{selectedExercise.notes}</p>
                    </div>
                  )}

                  <button
                    onClick={() => setShowForm(true)}
                    className="btn btn-primary btn-block btn-lg"
                  >
                    Log New Exercise
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full opacity-50">
                  <div className="text-center">
                    <p className="text-xl mb-4">No exercise selected</p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="btn btn-primary"
                    >
                      Log Your First Exercise
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
