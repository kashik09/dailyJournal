import { Habit } from '../types';

export const habits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    description: '10 minutes of mindfulness meditation',
    frequency: 'daily',
    streak: 12,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15', '2025-12-14',
      '2025-12-13', '2025-12-12', '2025-12-11', '2025-12-10', '2025-12-09',
      '2025-12-08', '2025-12-07'
    ],
    category: 'mindfulness',
    icon: '🧘'
  },
  {
    id: '2',
    name: 'Drink 8 Glasses of Water',
    description: 'Stay hydrated throughout the day',
    frequency: 'daily',
    streak: 7,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15', '2025-12-14',
      '2025-12-13', '2025-12-12'
    ],
    category: 'health',
    icon: '💧'
  },
  {
    id: '3',
    name: 'Read for 30 Minutes',
    description: 'Read books or articles before bed',
    frequency: 'daily',
    streak: 5,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15', '2025-12-14'
    ],
    category: 'personal',
    icon: '📚'
  },
  {
    id: '4',
    name: 'Workout',
    description: '30+ minutes of exercise',
    frequency: 'daily',
    streak: 15,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15', '2025-12-14',
      '2025-12-13', '2025-12-12', '2025-12-11', '2025-12-10', '2025-12-09',
      '2025-12-08', '2025-12-07', '2025-12-06', '2025-12-05', '2025-12-04'
    ],
    category: 'fitness',
    icon: '💪'
  },
  {
    id: '5',
    name: 'Practice Gratitude',
    description: 'Write down 3 things I\'m grateful for',
    frequency: 'daily',
    streak: 20,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15', '2025-12-14',
      '2025-12-13', '2025-12-12', '2025-12-11', '2025-12-10', '2025-12-09',
      '2025-12-08', '2025-12-07', '2025-12-06', '2025-12-05', '2025-12-04',
      '2025-12-03', '2025-12-02', '2025-12-01', '2025-11-30', '2025-11-29'
    ],
    category: 'mindfulness',
    icon: '🙏'
  },
  {
    id: '6',
    name: 'No Social Media After 8 PM',
    description: 'Digital detox for better sleep',
    frequency: 'daily',
    streak: 3,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16'
    ],
    category: 'health',
    icon: '📵'
  },
  {
    id: '7',
    name: 'Learn Something New',
    description: 'Study coding, language, or a new skill',
    frequency: 'daily',
    streak: 8,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15', '2025-12-14',
      '2025-12-13', '2025-12-12', '2025-12-11'
    ],
    category: 'productivity',
    icon: '🎓'
  },
  {
    id: '8',
    name: 'Clean Living Space',
    description: 'Tidy up for at least 15 minutes',
    frequency: 'daily',
    streak: 4,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15'
    ],
    category: 'personal',
    icon: '🧹'
  },
  {
    id: '9',
    name: 'Meal Prep Sunday',
    description: 'Prepare healthy meals for the week',
    frequency: 'weekly',
    streak: 6,
    completedDates: [
      '2025-12-15', '2025-12-08', '2025-12-01', '2025-11-24', '2025-11-17', '2025-11-10'
    ],
    category: 'health',
    icon: '🥗'
  },
  {
    id: '10',
    name: 'Call Family',
    description: 'Check in with family members',
    frequency: 'weekly',
    streak: 10,
    completedDates: [
      '2025-12-17', '2025-12-10', '2025-12-03', '2025-11-26', '2025-11-19',
      '2025-11-12', '2025-11-05', '2025-10-29', '2025-10-22', '2025-10-15'
    ],
    category: 'personal',
    icon: '📞'
  },
  {
    id: '11',
    name: 'Deep Work Session',
    description: '2 hours of focused, uninterrupted work',
    frequency: 'daily',
    streak: 6,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15', '2025-12-14', '2025-12-13'
    ],
    category: 'productivity',
    icon: '⚡'
  },
  {
    id: '12',
    name: 'Stretch Routine',
    description: '15 minutes of stretching',
    frequency: 'daily',
    streak: 9,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15', '2025-12-14',
      '2025-12-13', '2025-12-12', '2025-12-11', '2025-12-10'
    ],
    category: 'fitness',
    icon: '🤸'
  },
  {
    id: '13',
    name: 'No Coffee After 2 PM',
    description: 'Better sleep hygiene',
    frequency: 'daily',
    streak: 11,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15', '2025-12-14',
      '2025-12-13', '2025-12-12', '2025-12-11', '2025-12-10', '2025-12-09', '2025-12-08'
    ],
    category: 'health',
    icon: '☕'
  },
  {
    id: '14',
    name: 'Write Code Daily',
    description: 'Work on personal projects or contribute to open source',
    frequency: 'daily',
    streak: 18,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15', '2025-12-14',
      '2025-12-13', '2025-12-12', '2025-12-11', '2025-12-10', '2025-12-09',
      '2025-12-08', '2025-12-07', '2025-12-06', '2025-12-05', '2025-12-04',
      '2025-12-03', '2025-12-02', '2025-12-01'
    ],
    category: 'productivity',
    icon: '💻'
  },
  {
    id: '15',
    name: 'Evening Walk',
    description: '20-minute walk after dinner',
    frequency: 'daily',
    streak: 7,
    completedDates: [
      '2025-12-18', '2025-12-17', '2025-12-16', '2025-12-15', '2025-12-14',
      '2025-12-13', '2025-12-12'
    ],
    category: 'fitness',
    icon: '🚶'
  }
];
