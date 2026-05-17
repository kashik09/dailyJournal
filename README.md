# Daily Journal 📓

A modern, feature-rich personal journaling application built with React, TypeScript, and Tailwind CSS. Track your daily thoughts, habits, exercises, and schedule all in one place.

## ✨ Features

### 📝 Journal
- Write and manage daily journal entries
- Mood tracking with emoji indicators
- Search and filter entries
- Tag organization
- Full CRUD operations (Create, Read, Update, Delete)

### 🎯 Habits
- Track daily, weekly, and monthly habits
- Streak tracking and completion history
- Category and frequency filtering
- Visual statistics and progress indicators
- One-click habit completion

### 💪 Exercise
- Log workouts with detailed metrics
- Support for cardio, strength, flexibility, and sports activities
- Track duration, calories, distance, sets, reps, and weight
- Filter by exercise type
- Comprehensive statistics dashboard

### 📅 Calendar
- Schedule and manage events
- Color-coded categories (work, personal, health, social)
- Time-based scheduling
- Filter and organize events by date and category

### 🏠 Dashboard
- Overview of all activities
- Quick stats and recent items
- Direct navigation to all sections

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + DaisyUI
- **Build Tool**: Vite
- **Data Storage**: localStorage
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd dailyJournal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to http://localhost:5173

## 🏗️ Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📦 Project Structure

```
dailyJournal/
├── src/
│   ├── components/          # Reusable components (if any)
│   ├── data/               # Sample/initial data
│   ├── hooks/              # Custom React hooks
│   │   ├── useJournalEntries.ts
│   │   ├── useCalendarEvents.ts
│   │   ├── useHabits.ts
│   │   └── useExercises.ts
│   ├── lib/                # Utility libraries
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Journal.tsx
│   │   ├── Calendar.tsx
│   │   ├── Habits.tsx
│   │   └── Exercise.tsx
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── README.md              # This file
```

## 🗃️ Data Storage

This application uses **localStorage** for data persistence. Data includes:
- Journal entries (`journal_entries`)
- Calendar events (`calendar_events`)
- Habits (`habits`)
- Exercises (`exercises`)

### Initial Data

On first load, the app automatically initializes localStorage with sample data. You can manage this using the browser console:

```javascript
// Initialize with sample data (if empty)
initializeLocalStorage()

// Clear all data
clearLocalStorage()

// Reset to sample data
resetLocalStorage()
```

## 🧪 Testing

Refer to `TESTING.md` for the comprehensive testing guide and checklist.

Quick test:
```bash
npm run dev
```
Then follow the test plan in `TEST_PLAN.md`.

## 🚀 Deployment

Refer to `DEPLOYMENT.md` for detailed deployment instructions to Vercel.

Quick deploy:
```bash
npm install -g vercel
vercel --prod
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Customization

### Themes

The app uses DaisyUI themes. You can change the theme in `tailwind.config.js`:

```javascript
daisyui: {
  themes: ["light", "dark", "cupcake", ...],
}
```

### Colors and Styling

Customize colors in your Tailwind config or use DaisyUI's built-in color system.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Known Issues

- Home page statistics update in real-time (fixed in latest version)
- localStorage is browser-specific and won't sync across devices

## 🔮 Future Enhancements

- [ ] Cloud sync (Firebase/Supabase integration)
- [ ] Data export/import (JSON/CSV)
- [ ] Dark mode toggle
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and charts
- [ ] Reminder notifications
- [ ] Multi-user support with authentication
- [ ] Collaborative features

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/)
- Icons and emojis for visual enhancement

---

Made with ❤️ by kashiCoding
