import { Link } from 'react-router-dom';
import { useJournalEntries } from '../hooks/useJournalEntries';
import { useCalendarEvents } from '../hooks/useCalendarEvents';
import { useHabits } from '../hooks/useHabits';
import { useExercises } from '../hooks/useExercises';

export default function Home() {
  const { entries: journalEntries } = useJournalEntries();
  const { events: calendarEvents } = useCalendarEvents();
  const { habits } = useHabits();
  const { exercises } = useExercises();

  const today = new Date().toISOString().split('T')[0];
  const recentEntries = journalEntries.slice(0, 3);
  const todayEvents = calendarEvents.filter(e => e.date === today);
  const activeHabits = habits.filter(h => h.streak > 0).sort((a, b) => b.streak - a.streak);
  const recentExercises = exercises.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary to-secondary rounded-lg text-primary-content p-8">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Welcome to Your Journal 📓</h1>
            <p className="text-xl mb-6">
              Track your daily thoughts, habits, exercises, and schedule all in one place.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/journal" className="btn btn-lg">
                Write Entry
              </Link>
              <Link to="/habits" className="btn btn-lg btn-outline">
                Track Habits
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-primary">
            <span className="text-4xl">📝</span>
          </div>
          <div className="stat-title">Journal Entries</div>
          <div className="stat-value text-primary">{journalEntries.length}</div>
          <div className="stat-desc">Total entries written</div>
        </div>

        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-secondary">
            <span className="text-4xl">📅</span>
          </div>
          <div className="stat-title">Calendar Events</div>
          <div className="stat-value text-secondary">{calendarEvents.length}</div>
          <div className="stat-desc">Scheduled events</div>
        </div>

        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-accent">
            <span className="text-4xl">🎯</span>
          </div>
          <div className="stat-title">Active Habits</div>
          <div className="stat-value text-accent">{activeHabits.length}</div>
          <div className="stat-desc">Current streaks</div>
        </div>

        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-success">
            <span className="text-4xl">💪</span>
          </div>
          <div className="stat-title">Workouts</div>
          <div className="stat-value text-success">{exercises.length}</div>
          <div className="stat-desc">Exercises logged</div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Journal Entries */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">📝 Recent Journal Entries</h2>
            <div className="space-y-3">
              {recentEntries.map(entry => (
                <div key={entry.id} className="p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{entry.title}</span>
                    <span className="text-xs opacity-70">{entry.date}</span>
                  </div>
                  <p className="text-sm opacity-80 line-clamp-2">{entry.content}</p>
                </div>
              ))}
            </div>
            <Link to="/journal" className="btn btn-primary btn-block mt-4">
              View All Entries
            </Link>
          </div>
        </div>

        {/* Today's Events */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">📅 Today's Schedule</h2>
            {todayEvents.length === 0 ? (
              <p className="text-center py-8 opacity-50">No events scheduled for today</p>
            ) : (
              <div className="space-y-3">
                {todayEvents.slice(0, 4).map(event => (
                  <div key={event.id} className="p-3 bg-base-200 rounded-lg">
                    <div className="font-semibold">{event.title}</div>
                    <div className="text-sm opacity-70">{event.startTime} - {event.endTime}</div>
                  </div>
                ))}
              </div>
            )}
            <Link to="/calendar" className="btn btn-primary btn-block mt-4">
              View Calendar
            </Link>
          </div>
        </div>

        {/* Active Habits */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">🔥 Top Habit Streaks</h2>
            <div className="space-y-3">
              {activeHabits.slice(0, 4).map(habit => (
                <div key={habit.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{habit.icon}</span>
                    <span className="font-semibold">{habit.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl">🔥</span>
                    <span className="font-bold">{habit.streak}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/habits" className="btn btn-primary btn-block mt-4">
              View All Habits
            </Link>
          </div>
        </div>

        {/* Recent Workouts */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">💪 Recent Workouts</h2>
            <div className="space-y-3">
              {recentExercises.map(exercise => (
                <div key={exercise.id} className="p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{exercise.name}</span>
                    <span className="text-xs opacity-70">{exercise.date}</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="badge badge-sm">{exercise.duration}min</span>
                    <span className="badge badge-sm">{exercise.calories}cal</span>
                    {exercise.distance && (
                      <span className="badge badge-sm">{exercise.distance}km</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link to="/exercise" className="btn btn-primary btn-block mt-4">
              View Exercise Log
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
