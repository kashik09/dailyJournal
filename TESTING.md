# Testing Guide

## Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to http://localhost:5173/

3. **Sample Data:**
   - The app will automatically initialize localStorage with sample data on first load
   - You can reset the data at any time using the browser console

## Browser Console Commands

The following commands are available in the browser console for testing:

```javascript
// Initialize localStorage with sample data (only if empty)
initializeLocalStorage()

// Clear all localStorage data
clearLocalStorage()

// Reset localStorage to sample data
resetLocalStorage()
```

## Manual Testing

Refer to `TEST_PLAN.md` for a comprehensive testing checklist.

### Quick Test Flow

1. **Journal Page:**
   - Create a new entry
   - Edit an existing entry
   - Delete an entry
   - Search for entries

2. **Calendar Page:**
   - Add a new event
   - Edit an event
   - Delete an event
   - Filter by category

3. **Habits Page:**
   - Create a new habit
   - Complete a habit (check that streak increases)
   - Edit a habit
   - Delete a habit
   - Filter by category and frequency

4. **Exercise Page:**
   - Log a new exercise
   - Edit an exercise
   - Delete an exercise
   - Filter by type

5. **Data Persistence:**
   - Make changes in any section
   - Refresh the page
   - Verify all changes are preserved

6. **Home Page:**
   - Verify stats update after making changes
   - Check that recent items display correctly

## Known Issues

### Fixed Issues
- ✅ Home page now uses hooks instead of static data (fixed in latest update)
- ✅ localStorage initialization added for easier testing

### Outstanding Issues
- None currently identified

## Testing localStorage

You can inspect localStorage directly in your browser:

1. Open DevTools (F12)
2. Go to Application/Storage tab
3. Select Local Storage
4. View the following keys:
   - `journal_entries`
   - `calendar_events`
   - `habits`
   - `exercises`

## Automated Testing

Currently, the app uses manual testing. Automated tests can be added in the future using:
- Unit tests: Vitest
- Component tests: React Testing Library
- E2E tests: Playwright or Cypress
